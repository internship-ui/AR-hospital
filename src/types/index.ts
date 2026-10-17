export interface Department {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  headOfDepartment: string;
  keyTreatments: string[];
  bedCountPlaceholder: string;
  isVerified: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  experience: string;
  availableDays: string[];
  timing: string;
  roomNumberPlaceholder: string;
  image: string;
  about: string;
  isVerifiedPlaceholder: boolean;
  languages: string[];
}

export interface Appointment {
  id: number;
  booking_reference: string;
  patient_name: string;
  phone_number: string;
  email?: string;
  department: string;
  doctor_id: string;
  doctor_name: string;
  appointment_date: string;
  time_slot: string;
  reason?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  email: string;
  departmentId: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
}

export interface HospitalService {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  timing: string;
}

export interface HospitalInfo {
  name: string;
  tagline: string;
  establishedPlaceholder: string;
  address: {
    streetPlaceholder: string;
    cityStatePlaceholder: string;
    countryPlaceholder: string;
    googleMapsEmbedUrl: string;
    directionsUrl: string;
  };
  contact: {
    emergencyNumberPlaceholder: string;
    officialPhonePlaceholder: string;
    emailPlaceholder: string;
    whatsAppNumberPlaceholder: string;
    whatsAppEnabled: boolean;
  };
  hours: {
    emergency: string;
    opdConsultations: string;
    diagnosticLab: string;
    pharmacy: string;
    visitingHours: string;
  };
  statisticsPlaceholders: {
    beds: string;
    specialities: string;
    verifiedDoctors: string;
    satisfactionRatePlaceholder: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export type PageRoute = 
  | 'home'
  | 'about'
  | 'departments'
  | 'doctors'
  | 'services'
  | 'appointments'
  | 'contact'
  | 'admin'
  | 'not-found';
