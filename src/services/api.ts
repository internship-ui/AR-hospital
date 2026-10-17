import { 
  Department, 
  Doctor, 
  Appointment, 
  AppointmentFormData, 
  ContactFormData, 
  ContactInquiry,
  HospitalInfo, 
  HospitalService 
} from '../types';
import { 
  FALLBACK_DEPARTMENTS, 
  FALLBACK_DOCTORS, 
  FALLBACK_HOSPITAL_INFO,
  FALLBACK_SERVICES
} from '../data/fallbackData';

// Helper to get stored items
function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem('ar_appointments');
    if (!raw) {
      // Seed with initial realistic bookings for demonstration
      const initial: Appointment[] = [
        {
          id: 1,
          booking_reference: 'ARH-2026-8921',
          patient_name: 'Anita Sharma',
          phone_number: '+91 98450 12345',
          email: 'anita.sharma@example.com',
          department: 'cardiology',
          doctor_id: 'doc-cardio-01',
          doctor_name: 'Dr. Madhuram Chowdry (Cardiologist)',
          appointment_date: '2026-10-20',
          time_slot: '10:00 AM - 11:00 AM',
          reason: 'Routine cardiac health review and ECG follow-up',
          status: 'Confirmed',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          booking_reference: 'ARH-2026-4412',
          patient_name: 'Rajesh Kumar',
          phone_number: '+91 98860 54321',
          email: 'rajesh.k@example.com',
          department: 'orthopaedics',
          doctor_id: 'doc-ortho-01',
          doctor_name: 'Dr. Rajeshwari Gowda (Orthopaedic Surgeon)',
          appointment_date: '2026-10-22',
          time_slot: '02:00 PM - 03:00 PM',
          reason: 'Right knee joint pain consultation',
          status: 'Confirmed',
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      localStorage.setItem('ar_appointments', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveAppointments(items: Appointment[]) {
  try {
    localStorage.setItem('ar_appointments', JSON.stringify(items));
  } catch (e) {
    console.warn('Could not save appointments to localStorage', e);
  }
}

function getStoredInquiries(): ContactInquiry[] {
  try {
    const raw = localStorage.getItem('ar_contact_inquiries');
    if (!raw) {
      const initial: ContactInquiry[] = [
        {
          id: 1,
          name: 'Sunil Rao',
          email: 'sunil.rao@example.com',
          phone: '+91 99000 11223',
          subject: 'Health Checkup Packages',
          message: 'Could you please share details on the Executive Full Body Health Checkup packages available?',
          status: 'Read',
          created_at: new Date(Date.now() - 43200000).toISOString()
        }
      ];
      localStorage.setItem('ar_contact_inquiries', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveInquiries(items: ContactInquiry[]) {
  try {
    localStorage.setItem('ar_contact_inquiries', JSON.stringify(items));
  } catch (e) {
    console.warn('Could not save inquiries to localStorage', e);
  }
}

export const apiService = {
  // Health check
  async getHealth() {
    return {
      status: 'healthy',
      hospital: 'AR Hospital Healthcare Portal',
      database: 'Client Storage'
    };
  },

  // Get Hospital Info
  async getHospitalInfo(): Promise<HospitalInfo> {
    return FALLBACK_HOSPITAL_INFO;
  },

  // Get Departments
  async getDepartments(): Promise<Department[]> {
    return FALLBACK_DEPARTMENTS;
  },

  // Get Doctors with optional filter
  async getDoctors(departmentId?: string, search?: string): Promise<Doctor[]> {
    let results = [...FALLBACK_DOCTORS];

    if (departmentId && departmentId !== 'all') {
      results = results.filter((doc) => doc.departmentId === departmentId);
    }

    if (search && search.trim() !== '') {
      const term = search.toLowerCase().trim();
      results = results.filter(
        (doc) =>
          doc.name.toLowerCase().includes(term) ||
          doc.speciality.toLowerCase().includes(term) ||
          doc.departmentName.toLowerCase().includes(term)
      );
    }

    return results;
  },

  // Get Services
  async getServices(): Promise<HospitalService[]> {
    return FALLBACK_SERVICES;
  },

  // Submit Appointment
  async submitAppointment(formData: AppointmentFormData): Promise<{ success: boolean; message: string; booking: Appointment }> {
    const doctors = await this.getDoctors();
    const doc = doctors.find((d) => d.id === formData.doctorId);
    const doctorName = doc ? doc.name : 'Hospital Specialist';

    const depts = await this.getDepartments();
    const dept = depts.find((d) => d.id === formData.departmentId);
    const departmentName = dept ? dept.name : formData.departmentId;

    const booking: Appointment = {
      id: Date.now(),
      booking_reference: `ARH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patient_name: formData.patientName.trim(),
      phone_number: formData.phoneNumber.trim(),
      email: formData.email.trim() || undefined,
      department: departmentName,
      doctor_id: formData.doctorId,
      doctor_name: doctorName,
      appointment_date: formData.appointmentDate,
      time_slot: formData.timeSlot,
      reason: formData.reason?.trim() || undefined,
      status: 'Confirmed',
      created_at: new Date().toISOString()
    };

    const stored = getStoredAppointments();
    stored.unshift(booking);
    saveAppointments(stored);

    return {
      success: true,
      message: 'Appointment scheduled successfully.',
      booking
    };
  },

  // Look up Appointment by Reference
  async getAppointmentByReference(reference: string): Promise<Appointment> {
    const cleanRef = reference.trim().toLowerCase();
    const stored = getStoredAppointments();
    const match = stored.find((a) => a.booking_reference.toLowerCase() === cleanRef);
    if (match) return match;
    throw new Error(`No appointment found with booking reference "${reference}".`);
  },

  // Search Appointments by Phone
  async searchAppointmentsByPhone(phone: string): Promise<Appointment[]> {
    const cleanSearch = phone.replace(/[\s\-\(\)]/g, '');
    const stored = getStoredAppointments();
    return stored.filter((a) => a.phone_number.replace(/[\s\-\(\)]/g, '').includes(cleanSearch));
  },

  // Admin: Get all appointments
  async getAllAppointments(): Promise<Appointment[]> {
    return getStoredAppointments();
  },

  // Admin: Update appointment status
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    const stored = getStoredAppointments();
    const item = stored.find((a) => a.id === id);
    if (item) {
      item.status = status as any;
      saveAppointments(stored);
      return item;
    }
    throw new Error('Appointment not found.');
  },

  // Submit Contact Enquiry
  async submitContact(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    const inquiry: ContactInquiry = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || undefined,
      subject: formData.subject?.trim() || 'General Inquiry',
      message: formData.message.trim(),
      status: 'Unread',
      created_at: new Date().toISOString()
    };

    const stored = getStoredInquiries();
    stored.unshift(inquiry);
    saveInquiries(stored);

    return {
      success: true,
      message: 'Your inquiry has been submitted successfully! Our hospital administration team will get back to you shortly.'
    };
  },

  // Admin: Get all contact inquiries
  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return getStoredInquiries();
  }
};
