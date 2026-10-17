import { Router, Request, Response } from 'express';
import { queryAll, queryOne, execute } from '../db';
import { DOCTORS } from '../data/doctorsData';
import { DEPARTMENTS } from '../data/departmentsData';

const router = Router();

// Helper to generate unique booking reference: e.g. ARH-2026-8341
function generateReference(): string {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ARH-${currentYear}-${randomNum}`;
}

// Phone validator (accepts 10-15 digit phone with optional + prefix)
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

// Email validator
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Is date in the past validator
function isPastDate(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appointmentDate = new Date(dateString);
  appointmentDate.setHours(0, 0, 0, 0);
  return appointmentDate < today;
}

// POST /api/appointments - Submit an appointment request
router.post('/', (req: Request, res: Response) => {
  try {
    const {
      patientName,
      phoneNumber,
      email,
      departmentId,
      doctorId,
      appointmentDate,
      timeSlot,
      reason
    } = req.body;

    // 1. Mandatory Field Validation
    if (!patientName || typeof patientName !== 'string' || patientName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid patient full name (at least 2 characters).'
      });
    }

    if (!phoneNumber || !isValidPhone(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid contact phone number (at least 7 to 15 digits).'
      });
    }

    if (email && email.trim() !== '' && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address or leave the field blank.'
      });
    }

    if (!departmentId) {
      return res.status(400).json({
        success: false,
        error: 'Please select a hospital department.'
      });
    }

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        error: 'Please select an available doctor or specialist.'
      });
    }

    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        error: 'Please select a preferred appointment date.'
      });
    }

    if (isPastDate(appointmentDate)) {
      return res.status(400).json({
        success: false,
        error: 'Appointments cannot be booked for past dates. Please choose today or a future date.'
      });
    }

    if (!timeSlot || timeSlot.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Please select a preferred consultation time slot.'
      });
    }

    // 2. Validate department and doctor exist
    const department = DEPARTMENTS.find(d => d.id === departmentId);
    const doctor = DOCTORS.find(d => d.id === doctorId);

    const departmentName = department ? department.name : departmentId;
    const doctorName = doctor ? doctor.name : 'Consultant On Duty';

    // 3. Prevent Duplicate Submissions for same patient, doctor, and date
    const cleanPhone = phoneNumber.trim();
    const existingBooking = queryOne(
      `SELECT id, booking_reference FROM appointments 
       WHERE phone_number = ? AND doctor_id = ? AND appointment_date = ? AND status != 'Cancelled'`,
      [cleanPhone, doctorId, appointmentDate]
    );

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        error: `An appointment is already scheduled for this patient with this specialist on ${appointmentDate}. Reference: ${existingBooking.booking_reference}.`,
        existingReference: existingBooking.booking_reference
      });
    }

    // 4. Generate unique Reference
    let bookingReference = generateReference();
    let collisionCheck = queryOne('SELECT id FROM appointments WHERE booking_reference = ?', [bookingReference]);
    while (collisionCheck) {
      bookingReference = generateReference();
      collisionCheck = queryOne('SELECT id FROM appointments WHERE booking_reference = ?', [bookingReference]);
    }

    // 5. Secure database insertion with prepared statement
    execute(
      `INSERT INTO appointments (
        booking_reference, patient_name, phone_number, email, 
        department, doctor_id, doctor_name, appointment_date, 
        time_slot, reason, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingReference,
        patientName.trim(),
        cleanPhone,
        email ? email.trim() : null,
        departmentName,
        doctorId,
        doctorName,
        appointmentDate,
        timeSlot.trim(),
        reason ? reason.trim() : null,
        'Confirmed'
      ]
    );

    const createdAppointment = queryOne(
      'SELECT * FROM appointments WHERE booking_reference = ?',
      [bookingReference]
    );

    console.log(`🏥 New appointment booked: ${bookingReference} for ${patientName} (${doctorName})`);

    return res.status(201).json({
      success: true,
      message: 'Your appointment request has been accepted and confirmed by the AR Hospital system.',
      booking: createdAppointment
    });
  } catch (error: any) {
    console.error('Error saving appointment:', error);
    return res.status(500).json({
      success: false,
      error: 'A server error occurred while processing your appointment. Please try again or contact our helpline.'
    });
  }
});

// GET /api/appointments/:reference - Patient Appointment Lookup by Reference
router.get('/reference/:reference', (req: Request, res: Response) => {
  try {
    const rawRef = Array.isArray(req.params.reference) ? req.params.reference[0] : req.params.reference;
    const reference = (rawRef || '').trim().toUpperCase();
    const appointment = queryOne(
      'SELECT * FROM appointments WHERE UPPER(booking_reference) = ?',
      [reference]
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: `No appointment record found matching reference "${reference}". Please double-check your code.`
      });
    }

    return res.json({
      success: true,
      appointment
    });
  } catch (error: any) {
    console.error('Error looking up appointment:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to look up appointment record.'
    });
  }
});

// GET /api/appointments/search - Lookup by Phone Number
router.get('/search', (req: Request, res: Response) => {
  try {
    const phone = req.query.phone as string;
    if (!phone || phone.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number to search.'
      });
    }

    const cleaned = phone.trim();
    const appointments = queryAll(
      'SELECT * FROM appointments WHERE phone_number LIKE ? ORDER BY id DESC',
      [`%${cleaned}%`]
    );

    return res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error: any) {
    console.error('Error searching appointments:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to search appointments.'
    });
  }
});

// GET /api/appointments - List all appointments (Admin portal)
router.get('/', (req: Request, res: Response) => {
  try {
    const appointments = queryAll('SELECT * FROM appointments ORDER BY id DESC');
    return res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error: any) {
    console.error('Error fetching appointments list:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve appointments.'
    });
  }
});

// PATCH /api/appointments/:id/status - Update appointment status
router.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(rawId, 10);
    const { status } = req.body;

    const validStatuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const existing = queryOne('SELECT id FROM appointments WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found.'
      });
    }

    execute('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);

    const updated = queryOne('SELECT * FROM appointments WHERE id = ?', [id]);
    return res.json({
      success: true,
      message: `Appointment status updated to ${status}.`,
      appointment: updated
    });
  } catch (error: any) {
    console.error('Error updating appointment status:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update appointment status.'
    });
  }
});

export default router;
