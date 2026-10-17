import React, { useState, useEffect } from 'react';
import { 
  PageRoute, 
  Department, 
  Doctor, 
  HospitalInfo, 
  HospitalService 
} from './types';
import { apiService } from './services/api';
import { 
  FALLBACK_DEPARTMENTS, 
  FALLBACK_DOCTORS, 
  FALLBACK_HOSPITAL_INFO 
} from './data/fallbackData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { TrackAppointmentModal } from './components/TrackAppointmentModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Cross-page booking selection state
  const [bookingDepartmentId, setBookingDepartmentId] = useState<string | undefined>(undefined);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>(undefined);

  // Hospital Data State
  const [departments, setDepartments] = useState<Department[]>(FALLBACK_DEPARTMENTS);
  const [doctors, setDoctors] = useState<Doctor[]>(FALLBACK_DOCTORS);
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>(FALLBACK_HOSPITAL_INFO);
  const [services, setServices] = useState<HospitalService[]>([]);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  // Initial Data Fetching from Backend API
  useEffect(() => {
    async function initData() {
      try {
        const [deptData, docData, infoData, servData] = await Promise.all([
          apiService.getDepartments().catch(() => FALLBACK_DEPARTMENTS),
          apiService.getDoctors().catch(() => FALLBACK_DOCTORS),
          apiService.getHospitalInfo().catch(() => FALLBACK_HOSPITAL_INFO),
          apiService.getServices().catch(() => [])
        ]);

        if (deptData && deptData.length > 0) setDepartments(deptData);
        if (docData && docData.length > 0) setDoctors(docData);
        if (infoData) setHospitalInfo(infoData);
        if (servData) setServices(servData);
        setServerOnline(true);
      } catch (err) {
        console.warn('Backend server offline, running with certified fallback data:', err);
        setServerOnline(false);
      }
    }

    initData();
  }, []);

  // Dynamic SEO Title updates
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      'home': 'AR Hospital | Your Health, Our Priority - Modern Healthcare Portal',
      'about': 'About Us | AR Hospital - Clinical Vision, Mission & Values',
      'departments': 'Medical & Surgical Departments | AR Hospital',
      'doctors': 'Specialist Doctors & OPD Schedule | AR Hospital',
      'services': 'Hospital Services & Critical Care Facilities | AR Hospital',
      'appointments': 'Book an Appointment Online | AR Hospital Patient Desk',
      'contact': 'Contact Us & Emergency Directions | AR Hospital',
      'admin': 'Hospital Staff & Administration Desk | AR Hospital',
      'not-found': '404 - Page Not Found | AR Hospital'
    };

    document.title = titles[currentPage] || 'AR Hospital';
  }, [currentPage]);

  // Navigation Handlers
  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDepartmentForBooking = (departmentId: string) => {
    setBookingDepartmentId(departmentId);
    setBookingDoctorId(undefined);
    setCurrentPage('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorForBooking = (doctorId: string, departmentId: string) => {
    setBookingDoctorId(doctorId);
    setBookingDepartmentId(departmentId);
    setCurrentPage('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-hospital-pink-200 selection:text-hospital-maroon-900 relative">
      {/* Ambient AR Hospital Building Background Watermark */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-end select-none opacity-[0.04]"
        aria-hidden="true"
      >
        <img
          src="/ar-hospital-building.jpg"
          alt=""
          className="h-[120vh] max-w-none object-cover object-center filter contrast-125 grayscale"
        />
      </div>

      {/* Responsive Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        hospitalInfo={hospitalInfo}
        onOpenTrackModal={() => setTrackModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            departments={departments}
            doctors={doctors}
            hospitalInfo={hospitalInfo}
            onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            hospitalInfo={hospitalInfo}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            departments={departments}
            onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            doctors={doctors}
            departments={departments}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            hospitalInfo={hospitalInfo}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'appointments' && (
          <AppointmentsPage
            departments={departments}
            doctors={doctors}
            initialDepartmentId={bookingDepartmentId}
            initialDoctorId={bookingDoctorId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            hospitalInfo={hospitalInfo}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'not-found' && (
          <NotFoundPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Hospital Footer */}
      <Footer
        onNavigate={handleNavigate}
        hospitalInfo={hospitalInfo}
      />

      {/* Back to Top Smooth Scroll */}
      <BackToTop />

      {/* Track Appointment Status Modal */}
      <TrackAppointmentModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
      />
    </div>
  );
}

export default App;
