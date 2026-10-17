import { Router, Request, Response } from 'express';
import { DEPARTMENTS } from '../data/departmentsData';
import { DOCTORS } from '../data/doctorsData';
import { HOSPITAL_INFO } from '../data/hospitalInfo';

const router = Router();

// GET /api/departments - All departments
router.get('/departments', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    count: DEPARTMENTS.length,
    departments: DEPARTMENTS
  });
});

// GET /api/doctors - All doctors with optional department filter
router.get('/doctors', (req: Request, res: Response) => {
  const { departmentId, search } = req.query;
  let results = [...DOCTORS];

  if (departmentId && typeof departmentId === 'string' && departmentId !== 'all') {
    results = results.filter(doc => doc.departmentId === departmentId);
  }

  if (search && typeof search === 'string') {
    const term = search.toLowerCase();
    results = results.filter(
      doc =>
        doc.name.toLowerCase().includes(term) ||
        doc.speciality.toLowerCase().includes(term) ||
        doc.departmentName.toLowerCase().includes(term)
    );
  }

  return res.json({
    success: true,
    count: results.length,
    doctors: results
  });
});

// GET /api/hospital-info - Hospital branding & contact details
router.get('/hospital-info', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    info: HOSPITAL_INFO
  });
});

// GET /api/services - Hospital core services & facilities
router.get('/services', (_req: Request, res: Response) => {
  const services = [
    {
      id: 'opd',
      title: 'Outpatient Consultation (OPD)',
      category: 'Primary & Specialist Consultation',
      description: 'Daily specialist outpatient clinics across 14 departments with modern digital consultation rooms and minimal waiting times.',
      features: ['Prior appointment booking', 'Senior consultant access', 'Digital prescription archives', 'Senior citizen priority desk'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      timing: 'Monday - Saturday: 08:30 AM - 07:00 PM'
    },
    {
      id: 'emergency',
      title: '24/7 Emergency & Trauma Centre',
      category: 'Emergency Care',
      description: 'Dedicated rapid-response trauma bays, triage stations, crash carts, defibrillators, and on-duty emergency physicians 24 hours a day.',
      features: ['Immediate medical stabilization', 'Red-code alert system', 'Direct ICU transfer pathway', 'Dedicated ambulance bay'],
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      timing: '24 Hours / 365 Days Continuous Service'
    },
    {
      id: 'inpatient',
      title: 'Inpatient Care (IPD) & Wards',
      category: 'Inpatient Facilities',
      description: 'Compassionate inpatient hospitalization offering deluxe private rooms, semi-private rooms, and well-ventilated general medical wards.',
      features: ['24/7 dedicated nursing station', 'Centrally piped oxygen & suction', 'Hygienic dietetics meal service', 'Attendant rest areas'],
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80',
      timing: 'Round-the-clock inpatient nursing and monitoring'
    },
    {
      id: 'diagnostics',
      title: 'Comprehensive Diagnostic Services',
      category: 'Imaging & Diagnostics',
      description: 'Cutting-edge non-invasive diagnostics including Digital X-Ray, High-Resolution Ultrasound, 2D Echocardiography, and ECG.',
      features: ['Digital picture archiving (PACS)', 'Quick online report access', 'Accredited diagnostic protocols', 'Female technician support for ultrasound'],
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      timing: 'Routine: 08:00 AM - 08:00 PM | Emergency: 24/7'
    },
    {
      id: 'laboratory',
      title: 'Automated Pathology & Clinical Lab',
      category: 'Laboratory Services',
      description: 'Fully automated biochemistry, hematology, microbiology, and clinical pathology analyzers with strict quality control.',
      features: ['Home blood sample collection', 'Rapid turnaround on emergency panels', 'Barcoded sample tracking', 'NABL standard protocols'],
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      timing: '24/7 Emergency Lab & Routine Testing'
    },
    {
      id: 'pharmacy',
      title: '24/7 In-House Central Pharmacy',
      category: 'Pharmacy Services',
      description: 'Stocked with 100% genuine pharmaceuticals, critical life-saving medications, surgical disposables, and healthcare consumables.',
      features: ['Controlled cold-chain storage', 'Computerized batch billing', 'Doctor prescription verification', 'Bedside delivery for inpatients'],
      image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80',
      timing: 'Open 24 Hours, 7 Days a Week'
    },
    {
      id: 'icu',
      title: 'Intensive Care Units (ICU & CCU)',
      category: 'Critical Care',
      description: 'Advanced critical care unit with multi-parameter bedside monitors, high-end ventilators, and dedicated intensivist coverage.',
      features: ['1:1 nurse-to-patient ratio', 'HEPA filtered positive-pressure environment', 'Continuous arterial pressure monitoring', 'Integrated emergency defibrillators'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      timing: '24/7 Round-the-clock intensive care'
    },
    {
      id: 'daycare',
      title: 'Day Care Surgery & Dialysis Unit',
      category: 'Speciality Care',
      description: 'Short-stay medical procedures, minor surgeries, chemotherapy administration, and hemodialysis allowing same-day discharge.',
      features: ['Comfortable recliner and day-beds', 'Dedicated recovery room', 'Express discharge processing', 'Post-procedure discharge care plan'],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      timing: 'Monday - Saturday: 07:00 AM - 08:00 PM'
    }
  ];

  return res.json({
    success: true,
    count: services.length,
    services
  });
});

export default router;
