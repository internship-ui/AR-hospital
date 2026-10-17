export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  departmentId: string;
  departmentName: string;
  qualification: string; // Clearly identified verified/placeholder qualification
  experience: string;
  availableDays: string[];
  timing: string;
  roomNumberPlaceholder: string;
  image: string;
  about: string;
  isVerifiedPlaceholder: boolean; // Clearly indicated as placeholder until official records provided
  languages: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-gm-01',
    name: 'Dr. John Mitchell (Consultant Physician)',
    speciality: 'General Medicine & Diabetology',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    qualification: 'MBBS, MD (Internal Medicine) [Verified Credential Placeholder]',
    experience: '14+ Years Clinical Experience',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timing: '09:00 AM - 01:00 PM',
    roomNumberPlaceholder: 'Consultation Suite 101',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    about: 'Experienced clinical internist dedicated to evidence-based management of adult acute and chronic systemic conditions, diabetes, and preventive medicine.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-cardio-01',
    name: 'Dr. Sarah Al-Rashid (Cardiologist)',
    speciality: 'Non-Invasive Cardiology & Heart Health',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    qualification: 'MBBS, MD, DM (Cardiology), FACC [Credential Placeholder]',
    experience: '16+ Years Experience',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timing: '10:00 AM - 02:00 PM',
    roomNumberPlaceholder: 'Cardiac Wing Suite 204',
    image: 'https://images.unsplash.com/photo-1594824813576-0f723689408b?auto=format&fit=crop&w=800&q=80',
    about: 'Specialises in preventive cardiovascular assessments, cardiac ultrasound, arrhythmia screening, and comprehensive post-cardiac rehabilitation management.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-ortho-01',
    name: 'Dr. David Chen (Orthopaedic Surgeon)',
    speciality: 'Trauma & Joint Reconstruction',
    departmentId: 'orthopaedics',
    departmentName: 'Orthopaedics',
    qualification: 'MBBS, MS (Orthopaedics), MCh (Ortho) [Credential Placeholder]',
    experience: '12+ Years Experience',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timing: '11:00 AM - 04:00 PM',
    roomNumberPlaceholder: 'Ortho Care Suite 108',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    about: 'Focuses on complex fracture care, arthritic joint management, sports injuries, and conservative orthopedic rehabilitation programs.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-paed-01',
    name: 'Dr. Emily Vance (Paediatrician)',
    speciality: 'Child Healthcare & Immunization',
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Neonatology',
    qualification: 'MBBS, DCH, MD (Paediatrics) [Credential Placeholder]',
    experience: '10+ Years Experience',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timing: '09:30 AM - 01:30 PM',
    roomNumberPlaceholder: 'Paediatric Clinic 105',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    about: 'Gentle and dedicated paediatrician focusing on infant nutrition, immunization schedules, childhood allergic disorders, and developmental milestones.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-gyn-01',
    name: 'Dr. Priya Sharma (Obstetrician & Gynaecologist)',
    speciality: 'Maternal Care & Women Wellness',
    departmentId: 'gynaecology',
    departmentName: 'Gynaecology & Obstetrics',
    qualification: 'MBBS, MS (Obstetrics & Gynaecology), DGO [Credential Placeholder]',
    experience: '15+ Years Experience',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    timing: '10:00 AM - 03:00 PM',
    roomNumberPlaceholder: 'Maternity Wing Suite 301',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    about: 'Expert in high-risk pregnancy management, routine antenatal wellness, adolescent gynaecology, and menopausal health counseling.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-derm-01',
    name: 'Dr. Marcus Reynolds (Dermatologist)',
    speciality: 'Clinical Dermatology & Cutaneous Medicine',
    departmentId: 'dermatology',
    departmentName: 'Dermatology & Cosmetology',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy) [Credential Placeholder]',
    experience: '9+ Years Experience',
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    timing: '02:00 PM - 06:00 PM',
    roomNumberPlaceholder: 'Dermatology OPD 112',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    about: 'Specialised focus on inflammatory dermatoses, chronic eczema, psoriasis, cutaneous allergies, and non-invasive laser treatments.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-ent-01',
    name: 'Dr. Alan Ross (ENT Surgeon)',
    speciality: 'Otolaryngology & Head-Neck Surgery',
    departmentId: 'ent',
    departmentName: 'ENT',
    qualification: 'MBBS, MS (ENT), DLO [Credential Placeholder]',
    experience: '13+ Years Experience',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timing: '01:00 PM - 05:00 PM',
    roomNumberPlaceholder: 'ENT Clinic 114',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80',
    about: 'Expert in endoscopic sinus assessment, microsurgical ear procedures, balance and hearing assessments, and pediatric ENT.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-surg-01',
    name: 'Dr. Robert Sterling (General Surgeon)',
    speciality: 'General & Minimally Invasive Laparoscopy',
    departmentId: 'general-surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualification: 'MBBS, MS (General Surgery), FMAS, FIAGES [Credential Placeholder]',
    experience: '18+ Years Experience',
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    timing: '09:00 AM - 01:00 PM',
    roomNumberPlaceholder: 'Surgical Consult Suite 202',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    about: 'Senior surgeon proficient in laparoscopic abdominal surgeries, abdominal wall hernia repair, trauma surgery, and day-care surgical interventions.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-icu-01',
    name: 'Dr. Karen Walker (Critical Care Specialist)',
    speciality: 'Intensive Care & Emergency Medicine',
    departmentId: 'intensive-care',
    departmentName: 'Intensive Care Unit (ICU)',
    qualification: 'MBBS, MD (Anaesthesiology), IDCCM, EDIC [Credential Placeholder]',
    experience: '11+ Years Experience',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timing: '24/7 On-Duty Rotational ICU Coverage',
    roomNumberPlaceholder: 'Critical Care Operations 2nd Floor',
    image: 'https://images.unsplash.com/photo-1594824813576-0f723689408b?auto=format&fit=crop&w=800&q=80',
    about: 'Head of ICU team dedicated to multi-organ failure management, ventilator optimization, sepsis resuscitation protocols, and emergency cardiac life support.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-omfs-01',
    name: 'Dr. Tariq Mansoor (OMFS Surgeon)',
    speciality: 'Oral & Maxillofacial Facial Trauma',
    departmentId: 'omfs-surgery',
    departmentName: 'OMFS Surgery (Oral & Maxillofacial)',
    qualification: 'BDS, MDS (Oral & Maxillofacial Surgery), FIBOMS [Credential Placeholder]',
    experience: '12+ Years Experience',
    availableDays: ['Monday', 'Thursday', 'Saturday'],
    timing: '11:00 AM - 03:00 PM',
    roomNumberPlaceholder: 'OMFS Center Suite 120',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    about: 'Specialized in facial reconstruction, maxillofacial trauma repair, jaw cyst enucleations, and temporomandibular joint surgery.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-neuro-01',
    name: 'Dr. Jonathan Blake (Neurosurgeon)',
    speciality: 'Spine & Cranial Neurosurgery',
    departmentId: 'neurosurgery',
    departmentName: 'Neurosurgery & Neurology',
    qualification: 'MBBS, MS, MCh (Neurosurgery) [Credential Placeholder]',
    experience: '17+ Years Experience',
    availableDays: ['Tuesday', 'Thursday'],
    timing: '10:00 AM - 02:00 PM',
    roomNumberPlaceholder: 'Neuroscience Wing Suite 210',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    about: 'Expert neurosurgical consultation for spinal cord decompression, head trauma protocols, neurovascular emergencies, and peripheral nerve disorders.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-physio-01',
    name: 'Dr. Samantha Green (Chief Physiotherapist)',
    speciality: 'Neuro-Musculoskeletal Rehabilitation',
    departmentId: 'physiotherapy',
    departmentName: 'Physiotherapy & Rehabilitation',
    qualification: 'BPT, MPT (Orthopaedics & Sports Rehab) [Credential Placeholder]',
    experience: '8+ Years Experience',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timing: '08:30 AM - 04:30 PM',
    roomNumberPlaceholder: 'Rehabilitation Ground Floor',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    about: 'Dedicated physiotherapist delivering patient-tailored mobility recovery plans, spine stabilization protocols, and pre/post-operative physical conditioning.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-viro-01',
    name: 'Dr. Arthur Campbell (Infectious Disease Consultant)',
    speciality: 'Clinical Virology & Infectious Illnesses',
    departmentId: 'virology',
    departmentName: 'Virology & Infectious Diseases',
    qualification: 'MBBS, MD (Microbiology), Fellowship in Infectious Diseases [Credential Placeholder]',
    experience: '13+ Years Experience',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timing: '09:00 AM - 01:00 PM',
    roomNumberPlaceholder: 'Infection Control Unit Suite 118',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    about: 'Provides diagnostic expertise and clinical therapeutics for complex infectious syndromes, persistent viral infections, and antimicrobial stewardship.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  },
  {
    id: 'doc-pulm-01',
    name: 'Dr. Fiona Campbell (Pulmonologist)',
    speciality: 'Chest & Respiratory Medicine',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology & Respiratory Care',
    qualification: 'MBBS, MD (Pulmonary Medicine), FCCP [Credential Placeholder]',
    experience: '15+ Years Experience',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timing: '10:30 AM - 02:30 PM',
    roomNumberPlaceholder: 'Pulmonology Suite 206',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    about: 'Focused on chronic airway disease management, asthma diagnostics, sleep apnea treatment, and comprehensive pulmonary rehabilitation.',
    isVerifiedPlaceholder: true,
    languages: ['English', 'Regional Languages']
  }
];
