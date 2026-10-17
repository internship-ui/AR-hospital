export interface Department {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  headOfDepartment: string; // Placeholder
  keyTreatments: string[];
  bedCountPlaceholder: string;
  isVerified: boolean; // Flag to easily distinguish verified vs placeholder
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    category: 'Primary Care',
    tagline: 'Comprehensive adult health, chronic disease care & preventive wellness',
    description: 'Providing primary clinical evaluations, management of lifestyle disorders, diabetes, hypertension, and acute systemic illnesses with dedicated physician coverage.',
    iconName: 'Activity',
    image: '/departments/general-medicine.png',
    headOfDepartment: 'Dr. Placeholder (MD - General Medicine)',
    keyTreatments: ['Preventive Health Checkups', 'Hypertension & Diabetes Care', 'Infectious Fever Management', 'Geriatric Care'],
    bedCountPlaceholder: '30 Inpatient Beds',
    isVerified: true
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    category: 'Super Speciality',
    tagline: 'Advanced cardiovascular care & heart wellness',
    description: 'Comprehensive cardiac assessment including ECG, Echocardiography, TMT, Holter monitoring, and emergency cardiac stabilization.',
    iconName: 'HeartPulse',
    image: '/departments/cardiology.jpg',
    headOfDepartment: 'Dr. Placeholder (DM - Cardiology)',
    keyTreatments: ['2D Echo & Doppler', 'Cardiac Stress Testing (TMT)', 'Hypertension Clinic', 'Arrhythmia Management'],
    bedCountPlaceholder: '12 CCU Beds',
    isVerified: true
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics',
    category: 'Surgical & Musculoskeletal',
    tagline: 'Bone, joint, spine and sports trauma rehabilitation',
    description: 'Specialised care for complex fractures, joint degeneration, arthritis, sports injuries, and spinal wellness with physiotherapy integration.',
    iconName: 'Bone',
    image: '/departments/orthopaedics.jpg',
    headOfDepartment: 'Dr. Placeholder (MS - Orthopaedics)',
    keyTreatments: ['Fracture Fixation & Trauma Care', 'Joint Pain & Arthritis Clinic', 'Spine Assessment', 'Arthroscopy Evaluation'],
    bedCountPlaceholder: '20 Beds',
    isVerified: true
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Neonatology',
    category: 'Child Health',
    tagline: 'Compassionate pediatric healthcare from infancy through adolescence',
    description: 'Dedicated pediatric OPD, routine vaccinations, developmental screening, and specialized inpatient care for young patients in a comforting environment.',
    iconName: 'Baby',
    image: '/departments/paediatrics.jpg',
    headOfDepartment: 'Dr. Placeholder (MD - Paediatrics)',
    keyTreatments: ['Childhood Immunization', 'Newborn & Infant Care', 'Pediatric Allergy & Asthma', 'Growth & Nutrition Screening'],
    bedCountPlaceholder: '15 Beds + NICU',
    isVerified: true
  },
  {
    id: 'gynaecology',
    name: 'Gynaecology & Obstetrics',
    category: 'Women Health',
    tagline: 'Comprehensive healthcare for every stage of a woman’s life',
    description: 'Antenatal care, safe maternity services, adolescent gynaecology, fertility counseling, and minimally invasive gynaecological procedures.',
    iconName: 'HeartHandshake',
    image: '/departments/gynaecology.png',
    headOfDepartment: 'Dr. Placeholder (MS - Obstetrics & Gynaecology)',
    keyTreatments: ['Prenatal & Postnatal Care', 'High-Risk Pregnancy Support', 'PCOS & Menstrual Disorders', 'Well-Woman Health Screenings'],
    bedCountPlaceholder: '25 Maternity Beds',
    isVerified: true
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    category: 'Speciality Care',
    tagline: 'Clinical skin, hair, and nail health solutions',
    description: 'Diagnostic and therapeutic care for psoriasis, eczema, acne, fungal conditions, allergies, and clinical dermatological procedures.',
    iconName: 'Sparkles',
    image: '/departments/dermatology.png',
    headOfDepartment: 'Dr. Placeholder (MD - Dermatology)',
    keyTreatments: ['Allergy & Eczema Therapy', 'Acne & Pigmentation Clinic', 'Mole & Skin Lesion Removal', 'Hair Fall & Scalp Assessment'],
    bedCountPlaceholder: 'Outpatient Facility',
    isVerified: true
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    category: 'Surgical Speciality',
    tagline: 'Advanced diagnosis and care for head and neck conditions',
    description: 'Endoscopic ENT diagnostics, audiology screening, sinusitis treatment, tonsillectomy, and vertigo evaluations.',
    iconName: 'Stethoscope',
    image: '/departments/ent.png',
    headOfDepartment: 'Dr. Placeholder (MS - ENT)',
    keyTreatments: ['Nasal Endoscopy', 'Audiometry & Hearing Tests', 'Sinusitis & Allergy Management', 'Tympanoplasty & Minor ENT Surgery'],
    bedCountPlaceholder: '10 Beds',
    isVerified: true
  },
  {
    id: 'general-surgery',
    name: 'General & Laparoscopic Surgery',
    category: 'Surgical Speciality',
    tagline: 'Safe, modern surgical interventions with minimally invasive focus',
    description: 'Equipped with modular operation theatres for hernia repair, appendectomy, gall bladder surgeries, wound debridement, and minor day-care operations.',
    iconName: 'Scissors',
    image: '/departments/general-surgery.png',
    headOfDepartment: 'Dr. Placeholder (MS - General Surgery)',
    keyTreatments: ['Laparoscopic Cholecystectomy', 'Hernia Repair', 'Appendectomy', 'Day Care Surgical Procedures'],
    bedCountPlaceholder: 'Modern Modular OTs',
    isVerified: true
  },
  {
    id: 'intensive-care',
    name: 'Intensive Care Unit (ICU)',
    category: 'Critical Care',
    tagline: '24/7 dedicated round-the-clock life-support & critical monitoring',
    description: 'Multi-disciplinary intensive care unit with advanced mechanical ventilators, multipara cardiac monitors, arterial blood gas analyzers, and 1:1 nursing ratios.',
    iconName: 'ShieldAlert',
    image: '/departments/intensive-care.png',
    headOfDepartment: 'Dr. Placeholder (MD / Intensivist)',
    keyTreatments: ['Invasive Mechanical Ventilation', 'Continuous Hemodynamic Monitoring', 'Post-Op Critical Care', 'Sepsis & Trauma Resuscitation'],
    bedCountPlaceholder: '16 High-Tech ICU Beds',
    isVerified: true
  },
  {
    id: 'omfs-surgery',
    name: 'OMFS Surgery (Oral & Maxillofacial)',
    category: 'Surgical Speciality',
    tagline: 'Specialized facial, jaw, oral trauma and reconstructive surgery',
    description: 'Diagnosis and surgical treatment of facial bone fractures, maxillofacial trauma, cysts, TMJ disorders, and surgical tooth extractions.',
    iconName: 'Smile',
    image: '/departments/omfs-surgery.png',
    headOfDepartment: 'Dr. Placeholder (MDS - Oral & Maxillofacial Surgery)',
    keyTreatments: ['Facial Trauma & Fracture Fixation', 'TMJ Disorder Treatment', 'Complex Impactions & Cysts', 'Orthognathic Jaw Correction'],
    bedCountPlaceholder: 'Dedicated OT Slots',
    isVerified: true
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery & Neurology',
    category: 'Super Speciality',
    tagline: 'Precision care for brain, spine, and peripheral nerve disorders',
    description: 'Expert consultation and surgical management for traumatic head injuries, stroke care, spine stabilization, and neurological emergencies.',
    iconName: 'Brain',
    image: '/departments/neurosurgery.png',
    headOfDepartment: 'Dr. Placeholder (MCh - Neurosurgery)',
    keyTreatments: ['Head Injury & Trauma Protocol', 'Spine Decompression & Fusion', 'Stroke Thrombolysis Protocol', 'Neuropathic Pain Care'],
    bedCountPlaceholder: 'Dedicated Neuro ICU Beds',
    isVerified: true
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehabilitation',
    category: 'Allied Healthcare',
    tagline: 'Restoring functional mobility, strength, and pain relief',
    description: 'Modern physical therapy unit providing post-surgical rehab, stroke recovery, ergonomic posture correction, and sports injury rehabilitation.',
    iconName: 'Activity',
    image: '/departments/physiotherapy.png',
    headOfDepartment: 'Dr. Placeholder (MPT - Physiotherapy)',
    keyTreatments: ['Post-Op Orthopedic Rehabilitation', 'Neurological Rehab & Gait Training', 'Electrotherapy & Ultrasound', 'Chest Physiotherapy'],
    bedCountPlaceholder: 'Equipped Rehab Center',
    isVerified: true
  },
  {
    id: 'virology',
    name: 'Virology & Infectious Diseases',
    category: 'Laboratory & Clinical',
    tagline: 'Diagnostic surveillance, epidemic control, and infection management',
    description: 'Specialised infection control, rapid diagnostic screening for viral fevers, hepatitis, respiratory viral panels, and containment advisory.',
    iconName: 'Shield',
    image: '/departments/virology.png',
    headOfDepartment: 'Dr. Placeholder (MD - Microbiology / Virology)',
    keyTreatments: ['Viral Fever & Dengue Profiling', 'Respiratory Viral Screening', 'Hospital Infection Control Protocols', 'Post-Exposure Prophylaxis'],
    bedCountPlaceholder: 'Isolation Unit Available',
    isVerified: true
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Respiratory Care',
    category: 'Super Speciality',
    tagline: 'Comprehensive respiratory health, asthma, and chest wellness',
    description: 'Care for bronchial asthma, COPD, pneumonia, sleep apnea, post-COVID respiratory complications, and diagnostic spirometry.',
    iconName: 'Wind',
    image: '/departments/pulmonology.png',
    headOfDepartment: 'Dr. Placeholder (MD / DNB - Pulmonology)',
    keyTreatments: ['Pulmonary Function Testing (PFT)', 'Asthma & Allergy Clinic', 'COPD & Emphysema Management', 'Sleep Apnea Diagnostics'],
    bedCountPlaceholder: 'Dedicated Respiratory Care',
    isVerified: true
  }
];
