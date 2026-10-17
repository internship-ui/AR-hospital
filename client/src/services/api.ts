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
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return handleResponse<{ success: boolean; message: string; booking: Appointment }>(res);
  },

  // Look up Appointment by Reference
  async getAppointmentByReference(reference: string): Promise<Appointment> {
    const res = await fetch(`${API_BASE_URL}/appointments/reference/${encodeURIComponent(reference)}`);
    const data = await handleResponse<{ success: boolean; appointment: Appointment }>(res);
    return data.appointment;
  },

  // Search Appointments by Phone
  async searchAppointmentsByPhone(phone: string): Promise<Appointment[]> {
    const res = await fetch(`${API_BASE_URL}/appointments/search?phone=${encodeURIComponent(phone)}`);
    const data = await handleResponse<{ success: boolean; count: number; appointments: Appointment[] }>(res);
    return data.appointments;
  },

  // Admin: Get all appointments
  async getAllAppointments(): Promise<Appointment[]> {
    const res = await fetch(`${API_BASE_URL}/appointments`);
    const data = await handleResponse<{ success: boolean; count: number; appointments: Appointment[] }>(res);
    return data.appointments;
  },

  // Admin: Update appointment status
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    const data = await handleResponse<{ success: boolean; message: string; appointment: Appointment }>(res);
    return data.appointment;
  },

  // Submit Contact Enquiry
  async submitContact(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  // Admin: Get all contact inquiries
  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    const res = await fetch(`${API_BASE_URL}/contact`);
    const data = await handleResponse<{ success: boolean; count: number; inquiries: ContactInquiry[] }>(res);
    return data.inquiries;
  }
};
