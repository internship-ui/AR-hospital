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
    emergencyNumberPlaceholder: string; // tel: link placeholder
    officialPhonePlaceholder: string; // tel: link placeholder
    emailPlaceholder: string; // mailto: link placeholder
    whatsAppNumberPlaceholder: string; // WhatsApp chat placeholder
    whatsAppEnabled: boolean; // flag as requested
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

export const HOSPITAL_INFO: HospitalInfo = {
  name: 'AR Hospital',
  tagline: 'Healing Hands',
  establishedPlaceholder: '24x7 Multi-Speciality Hospital & Emergency Care',
  address: {
    streetPlaceholder: '22, New Kantharaj Urs Rd, CFTRI layout, Sharadadevi Nagar',
    cityStatePlaceholder: 'Mysuru, Karnataka 570022',
    countryPlaceholder: 'India',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.987623!2d76.6081352!3d12.295517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b4efeac7085%3A0x36d66538722173d9!2sA%20R%20Hospital!5e0!3m2!1sen!2sin!4v1735319593000!5m2!1sen!2sin',
    directionsUrl: 'https://share.google/LZD3FGErlVkl5B2fj'
  },
  contact: {
    emergencyNumberPlaceholder: '+1 (800) 274-6774 [Verified 24/7 Helpline Placeholder]',
    officialPhonePlaceholder: '+1 (555) 019-2834 [Official Reception Placeholder]',
    emailPlaceholder: 'appointments@arhospital.placeholder',
    whatsAppNumberPlaceholder: '+15550192834',
    whatsAppEnabled: true // Set to false if official WhatsApp is not verified
  },
  hours: {
    emergency: '24 Hours / 7 Days a Week (Trauma & Critical Care)',
    opdConsultations: 'Monday - Saturday: 08:30 AM - 07:00 PM',
    diagnosticLab: '24 Hours Sample Collection & Automated Testing',
    pharmacy: '24/7 In-House Central Pharmacy',
    visitingHours: '11:00 AM - 01:00 PM & 05:00 PM - 07:00 PM Daily'
  },
  statisticsPlaceholders: {
    beds: '150+ Inpatient Beds [Capacity Placeholder]',
    specialities: '14 Clinical Departments',
    verifiedDoctors: '25+ Medical Specialists [Staffing Placeholder]',
    satisfactionRatePlaceholder: 'Patient-First Quality Healthcare [Rating Placeholder]'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  }
};
