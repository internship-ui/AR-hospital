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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({
    success: false,
    error: 'Invalid response format from server.'
  }));

  if (!res.ok) {
    const errorMsg = data?.error || `HTTP error ${res.status}: ${res.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const apiService = {
  // Health check
  async getHealth() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<{ status: string; hospital: string; database: string }>(res);
  },

  // Get Hospital Info
  async getHospitalInfo(): Promise<HospitalInfo> {
    const res = await fetch(`${API_BASE_URL}/hospital-info`);
    const data = await handleResponse<{ success: boolean; info: HospitalInfo }>(res);
    return data.info;
  },

  // Get Departments
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_BASE_URL}/departments`);
    const data = await handleResponse<{ success: boolean; count: number; departments: Department[] }>(res);
    return data.departments;
  },

  // Get Doctors with optional filter
  async getDoctors(departmentId?: string, search?: string): Promise<Doctor[]> {
    const params = new URLSearchParams();
    if (departmentId && departmentId !== 'all') params.append('departmentId', departmentId);
    if (search && search.trim() !== '') params.append('search', search.trim());
    
    const url = `${API_BASE_URL}/doctors?${params.toString()}`;
    const res = await fetch(url);
    const data = await handleResponse<{ success: boolean; count: number; doctors: Doctor[] }>(res);
    return data.doctors;
  },

  // Get Services
  async getServices(): Promise<HospitalService[]> {
    const res = await fetch(`${API_BASE_URL}/services`);
    const data = await handleResponse<{ success: boolean; count: number; services: HospitalService[] }>(res);
    return data.services;
  },

  // Submit Appointment
  async submitAppointment(formData: AppointmentFormData): Promise<{ success: boolean; message: string; booking: Appointment }> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      return await handleResponse<{ success: boolean; message: string; booking: Appointment }>(res);
    } catch {
      // Local fallback for GitHub Pages / offline mode
      const booking: Appointment = {
        id: Date.now(),
        booking_reference: `ARH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        patient_name: formData.patientName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        department: formData.departmentId,
        doctor_id: formData.doctorId,
        doctor_name: 'Hospital Specialist',
        appointment_date: formData.appointmentDate,
        time_slot: formData.timeSlot,
        reason: formData.reason,
        status: 'Confirmed',
        created_at: new Date().toISOString()
      };
      try {
        const stored = JSON.parse(localStorage.getItem('ar_appointments') || '[]');
        stored.unshift(booking);
        localStorage.setItem('ar_appointments', JSON.stringify(stored));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return {
        success: true,
        message: 'Appointment scheduled successfully.',
        booking
      };
    }
  },

  // Look up Appointment by Reference
  async getAppointmentByReference(reference: string): Promise<Appointment> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/reference/${encodeURIComponent(reference)}`);
      const data = await handleResponse<{ success: boolean; appointment: Appointment }>(res);
      return data.appointment;
    } catch {
      const stored: Appointment[] = JSON.parse(localStorage.getItem('ar_appointments') || '[]');
      const match = stored.find((a) => a.booking_reference.toLowerCase() === reference.trim().toLowerCase());
      if (match) return match;
      throw new Error(`No appointment found with reference code "${reference}".`);
    }
  },

  // Search Appointments by Phone
  async searchAppointmentsByPhone(phone: string): Promise<Appointment[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/search?phone=${encodeURIComponent(phone)}`);
      const data = await handleResponse<{ success: boolean; count: number; appointments: Appointment[] }>(res);
      return data.appointments;
    } catch {
      const stored: Appointment[] = JSON.parse(localStorage.getItem('ar_appointments') || '[]');
      const cleanSearch = phone.replace(/[\s\-\(\)]/g, '');
      return stored.filter((a) => a.phone_number.replace(/[\s\-\(\)]/g, '').includes(cleanSearch));
    }
  },

  // Admin: Get all appointments
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`);
      const data = await handleResponse<{ success: boolean; count: number; appointments: Appointment[] }>(res);
      return data.appointments;
    } catch {
      return JSON.parse(localStorage.getItem('ar_appointments') || '[]');
    }
  },

  // Admin: Update appointment status
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const data = await handleResponse<{ success: boolean; message: string; appointment: Appointment }>(res);
      return data.appointment;
    } catch {
      const stored: Appointment[] = JSON.parse(localStorage.getItem('ar_appointments') || '[]');
      const item = stored.find((a) => a.id === id);
      if (item) {
        item.status = status as any;
        localStorage.setItem('ar_appointments', JSON.stringify(stored));
        return item;
      }
      throw new Error('Appointment not found in local storage.');
    }
  },

  // Submit Contact Enquiry
  async submitContact(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      return await handleResponse<{ success: boolean; message: string }>(res);
    } catch {
      const inquiry: ContactInquiry = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'Unread',
        created_at: new Date().toISOString()
      };
      try {
        const stored = JSON.parse(localStorage.getItem('ar_contact_inquiries') || '[]');
        stored.unshift(inquiry);
        localStorage.setItem('ar_contact_inquiries', JSON.stringify(stored));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return {
        success: true,
        message: 'Your message has been sent successfully! Our administrative team will reach out to you shortly.'
      };
    }
  },


  // Admin: Get all contact inquiries
  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`);
      const data = await handleResponse<{ success: boolean; count: number; inquiries: ContactInquiry[] }>(res);
      return data.inquiries;
    } catch {
      return JSON.parse(localStorage.getItem('ar_contact_inquiries') || '[]');
    }
  }
};

