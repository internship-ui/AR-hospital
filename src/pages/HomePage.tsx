import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  HeartPulse, 
  Activity, 
  Users, 
  Phone, 
  CheckCircle2, 
  Stethoscope, 
  Building2, 
  Award,
  Sparkles,
  ChevronRight,
  Star,
  Quote,
  GraduationCap,
  MapPin,
  BadgeCheck
} from 'lucide-react';
import { Department, Doctor, HospitalInfo, PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  departments: Department[];
  doctors: Doctor[];
  hospitalInfo: HospitalInfo;
  onSelectDepartmentForBooking: (departmentId: string) => void;
  onSelectDoctorForBooking: (doctorId: string, departmentId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  departments,
  doctors,
  hospitalInfo,
  onSelectDepartmentForBooking,
  onSelectDoctorForBooking
}) => {
  const emergencyPhone = hospitalInfo.contact.emergencyNumberPlaceholder.replace(/[^0-9+]/g, '') || '+18002746774';
  const featuredDepartments = departments.slice(0, 6);
  const featuredDoctors = doctors.slice(0, 4);

  // Sample patient testimonials with explicit transparent labelling as required by prompt
  const sampleTestimonials = [
    {
      id: 1,
      name: 'Sample Patient: Michael D. [Sample Content]',
      department: 'Cardiology Care',
      text: 'The emergency stabilization and cardiology team were exceptional. Clear communication and compassionate nursing care throughout my treatment.',
      rating: 5,
      datePlaceholder: 'Recent Patient Visit'
    },
    {
      id: 2,
      name: 'Sample Patient: Eleanor S. [Sample Content]',
      department: 'Orthopaedics & Joint Care',
      text: 'From the outpatient consultation to physical therapy rehabilitation, the doctors were thorough, attentive, and very professional.',
      rating: 5,
      datePlaceholder: 'Recent Patient Visit'
    },
    {
      id: 3,
      name: 'Sample Patient: David K. [Sample Content]',
      department: 'Paediatrics & Family Health',
      text: 'The paediatric wing is gentle and welcoming. Booking an appointment online was seamless and our consultation was right on time.',
      rating: 5,
      datePlaceholder: 'Recent Patient Visit'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION WITH OFFICIAL HOSPITAL PHOTO WATERMARK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hospital-pink-50/80 via-white to-rose-50/30 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-hospital-pink-100/70">
        {/* Official AR Hospital Building Background Watermark */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img
            src="/ar-hospital-building.jpg"
            alt="AR Hospital Building Background Watermark"
            className="w-full h-full object-cover object-top opacity-[0.12] filter contrast-125 mix-blend-multiply scale-105 transform translate-y-[-5%]"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-hospital-pink-50/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white"></div>
        </div>

        {/* Floating Decorative Medical Elements & Subtle Glows */}
        <div className="absolute top-10 left-8 w-32 h-32 bg-hospital-maroon-300/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute top-44 right-12 w-40 h-40 bg-hospital-pink-300/25 rounded-full blur-3xl animate-float-slow pointer-events-none" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-rose-100/30 rounded-full blur-2xl pointer-events-none"></div>

        {/* Subtle Background Heartbeat SVG wave */}
        <div className="absolute -bottom-6 left-0 right-0 opacity-10 pointer-events-none overflow-hidden flex justify-center">
          <svg className="w-full max-w-5xl h-24 text-hospital-maroon-600" viewBox="0 0 900 120" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M0,60 L200,60 L230,20 L250,100 L270,40 L290,75 L310,60 L500,60 L530,15 L550,105 L570,35 L590,70 L610,60 L900,60" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge with Kannada Script & Healing Hands */}
              <div className="inline-flex flex-wrap items-center gap-2 bg-white/95 px-4 py-2 rounded-full border border-hospital-pink-200/80 shadow-sm text-xs font-semibold text-hospital-maroon-900">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping"></span>
                <span className="font-bold text-rose-800 tracking-wide uppercase">ಎ ಆರ್ ಆಸ್ಪತ್ರೆ</span>
                <span className="text-hospital-maroon-300">|</span>
                <span className="text-slate-800 font-bold">AR Hospital</span>
                <span className="text-hospital-maroon-300">|</span>
                <span className="text-rose-700 font-extrabold uppercase tracking-widest text-[11px]">Healing Hands</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Compassionate Care, <br />
                <span className="bg-gradient-to-r from-hospital-maroon-700 via-hospital-maroon-600 to-rose-600 bg-clip-text text-transparent">
                  Advanced Medicine.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Welcome to <strong>AR Hospital (Healing Hands)</strong>. Delivering round-the-clock clinical excellence, 24/7 Emergency & Trauma, Intensive Care (ICU), automated laboratory, in-house pharmacy, and dedicated specialists across 14 departments.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-hospital-maroon-600 via-hospital-maroon-700 to-hospital-maroon-800 hover:from-hospital-maroon-700 hover:to-hospital-maroon-900 text-white font-bold text-base shadow-soft-maroon hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group"
                >
                  <Calendar className="w-5 h-5 mr-2.5 text-hospital-pink-200 group-hover:scale-110 transition-transform" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-hospital-pink-50/60 text-hospital-maroon-800 font-bold text-base border-2 border-hospital-maroon-200/90 shadow-sm transition-all duration-200 flex items-center justify-center hover:border-hospital-maroon-400"
                >
                  <Activity className="w-5 h-5 mr-2 text-hospital-maroon-600" />
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Key Trust Highlights Row */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80">
                <div className="p-3 bg-white/90 rounded-2xl border border-hospital-pink-100 shadow-sm text-center lg:text-left hover:shadow-card transition-shadow">
                  <div className="text-2xl font-black text-hospital-maroon-700">14+</div>
                  <div className="text-xs font-semibold text-slate-500">Specialities</div>
                </div>
                <div className="p-3 bg-white/90 rounded-2xl border border-rose-100 shadow-sm text-center lg:text-left hover:shadow-card transition-shadow">
                  <div className="text-2xl font-black text-rose-600">24/7</div>
                  <div className="text-xs font-semibold text-slate-500">Emergency & ICU</div>
                </div>
                <div className="p-3 bg-white/90 rounded-2xl border border-hospital-pink-100 shadow-sm text-center lg:text-left hover:shadow-card transition-shadow">
                  <div className="text-2xl font-black text-hospital-maroon-700">150+</div>
                  <div className="text-xs font-semibold text-slate-500">Beds Capacity</div>
                </div>
                <div className="p-3 bg-white/90 rounded-2xl border border-emerald-100 shadow-sm text-center lg:text-left hover:shadow-card transition-shadow">
                  <div className="text-2xl font-black text-emerald-600">100%</div>
                  <div className="text-xs font-semibold text-slate-500">Care Quality</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Column - Featuring Real AR Hospital Building */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Official AR Hospital Building Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] sm:aspect-[4/5] group bg-slate-900">
                  <img
                    src="/ar-hospital-building.jpg"
                    alt="AR Hospital Building, 22, New Kantharaj Urs Rd, CFTRI layout, Sharadadevi Nagar, Mysuru, 24x7 Emergency and Ambulance"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Caption inside image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-300">AR Hospital • 24x7 Facility</span>
                    </div>
                    <p className="text-xs text-slate-200">
                      CFTRI layout, Sharadadevi Nagar, Mysuru • Laboratory, Radiology, Pharmacy 24x7, ICU, Trauma Emergency & Ambulance.
                    </p>
                  </div>
                </div>

                {/* Floating Official Logo Badge Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-hospital-pink-100 hidden sm:flex items-center space-x-3 animate-float max-w-xs">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-rose-200 flex-shrink-0" style={{boxShadow:'0 0 0 2px rgba(159,18,57,0.15)'}}>
                    <img 
                      src="/ar-hospital-logo.png" 
                      alt="AR Hospital Healing Hands"
                      className="w-[140%] h-[140%] object-cover object-top"
                      style={{marginTop:'-10%'}}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">AR HOSPITAL</span>
                    <span className="text-[10px] font-bold text-rose-700 tracking-wider uppercase">HEALING HANDS</span>
                  </div>
                </div>

                {/* Floating 24/7 Care Pill */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white px-4 py-2 rounded-2xl shadow-soft-pink border-2 border-white flex items-center space-x-2 text-xs font-bold">
                  <HeartPulse className="w-4 h-4 text-white animate-pulse" />
                  <span>24/7 Emergency Care</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EMERGENCY CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-slate-950 text-white p-6 sm:p-8 shadow-2xl border border-hospital-maroon-700/60 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-hospital-pink-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0 text-rose-300 shadow-soft-pink">
                <HeartPulse className="w-8 h-8 animate-heart-pulse" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                  24/7 Emergency Medical Response
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Need Immediate Emergency or Trauma Care?
                </h3>
                <p className="text-xs sm:text-sm text-hospital-pink-100/90 max-w-xl">
                  Our emergency triage and critical care ambulance fleet are active 24 hours a day, 7 days a week. Rapid medical intervention is one phone call away.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href={`tel:${emergencyPhone}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-soft-pink hover:scale-105 transition-all flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Call Emergency Helpline</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 hover:border-hospital-pink-300 transition-colors"
              >
                Hospital Location & Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRIEF INTRODUCTION TO AR HOSPITAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3.5 py-1 rounded-full uppercase tracking-wider border border-hospital-pink-200/60 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>About AR Hospital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Compassionate Care, Clinical Rigour & Modern Medical Standards
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              AR Hospital is established with a clear mission: to provide dependable, ethical, and high-quality healthcare to every patient. Our hospital integrates primary care, surgical disciplines, super-speciality departments, and 24/7 critical intensive care under one roof.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                '14 Full-Fledged Medical Departments',
                'Round-the-clock Emergency & Trauma Bay',
                'Advanced Modular Operation Theatres',
                'NABL Standard Automated Pathology',
                '24/7 In-House Dedicated Pharmacy',
                'Transparent Billing & Patient Privacy'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-hospital-maroon-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center text-sm font-bold text-hospital-maroon-700 hover:text-hospital-maroon-900 transition-colors group"
              >
                <span>Read our full hospital history, mission & philosophy</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Intro Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-card aspect-[3/4] border border-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80" 
                  alt="Doctor consultation room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div className="p-4 rounded-2xl bg-hospital-pink-50/80 border border-hospital-pink-100 text-center shadow-sm">
                <span className="text-2xl font-black text-hospital-maroon-700">100%</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Sterilized Clinical Environment</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-hospital-pink-50/80 border border-hospital-pink-100 text-center shadow-sm">
                <span className="text-2xl font-black text-hospital-maroon-700">24 / 7</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Specialist On-Call Coverage</p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-card aspect-[3/4] border border-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80" 
                  alt="Medical diagnostic equipment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MEDICAL DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-hospital-pink-200/60 shadow-sm">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Specialised Healthcare</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Clinical Departments
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Providing specialist consultation and evidence-based interventions across all major medical disciplines.
            </p>
          </div>

          <button
            onClick={() => onNavigate('departments')}
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-hospital-maroon-600 hover:text-hospital-maroon-800 transition-colors group"
          >
            <span>View All 14 Departments</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white rounded-3xl border border-slate-200/80 hover:border-hospital-maroon-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Department Image Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-hospital-maroon-800 shadow-sm">
                  {dept.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold">{dept.name}</h3>
                </div>
              </div>

              {/* Department Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                {/* Key Treatments */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Procedures & Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.keyTreatments.slice(0, 3).map((treatment, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-hospital-pink-50/80 text-hospital-maroon-800 px-2.5 py-0.5 rounded-md font-medium border border-hospital-pink-100"
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectDepartmentForBooking(dept.id);
                    }}
                    className="text-xs font-bold text-white bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow"
                  >
                    Book Consultation
                  </button>

                  <button
                    onClick={() => onNavigate('departments')}
                    className="text-xs font-semibold text-slate-500 hover:text-hospital-maroon-600 flex items-center transition-colors"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="bg-gradient-to-b from-hospital-pink-50/60 via-rose-50/20 to-white py-16 border-y border-hospital-pink-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-white px-3.5 py-1 rounded-full uppercase tracking-wider border border-hospital-pink-200/80 shadow-sm mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Healthcare Excellence</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Patients Trust AR Hospital
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our clinical care pathways combine medical acumen, patient transparency, and empathetic nursing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HeartPulse,
                title: '24/7 Dedicated Emergency & Trauma',
                desc: 'Round-the-clock emergency room with trained intensivists, acute resuscitation bays, and rapid hospital admission protocols.',
                color: 'text-rose-600 bg-rose-50 border border-rose-100'
              },
              {
                icon: Stethoscope,
                title: 'Experienced Medical Specialists',
                desc: 'Qualified consultants with years of specialized practice across medicine, surgery, obstetrics, cardiology, and orthopaedics.',
                color: 'text-hospital-maroon-600 bg-hospital-pink-50 border border-hospital-pink-100'
              },
              {
                icon: Activity,
                title: 'Precision Diagnostics & Imaging',
                desc: 'Digital X-Rays, high-resolution ultrasound, automated pathology, and prompt report delivery for accurate diagnosis.',
                color: 'text-hospital-maroon-700 bg-hospital-pink-50 border border-hospital-pink-100'
              },
              {
                icon: ShieldCheck,
                title: 'Compassionate Patient-Centric Care',
                desc: 'Empathetic nursing team, patient counsellors, and clear guidance every step of your outpatient or inpatient stay.',
                color: 'text-hospital-maroon-600 bg-hospital-pink-50 border border-hospital-pink-100'
              },
              {
                icon: Building2,
                title: 'Modern Modular Operating Theatres',
                desc: 'Equipped with laminar air flow, HEPA filtration, and advanced laparoscopic equipment to support safe surgical outcomes.',
                color: 'text-hospital-maroon-700 bg-hospital-pink-50 border border-hospital-pink-100'
              },
              {
                icon: Clock,
                title: 'Streamlined Online Appointments',
                desc: 'Direct digital slot selection with real booking references, minimal waiting times, and easy appointment status verification.',
                color: 'text-hospital-maroon-600 bg-hospital-pink-50 border border-hospital-pink-100'
              }
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-hospital-maroon-200 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-4 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pillar.color}`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FEATURED DOCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Medical Team</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Doctors & Specialists
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Consult with board-certified physicians, surgeons, and specialists dedicated to your wellbeing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('doctors')}
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-hospital-maroon-600 hover:text-hospital-maroon-800 group"
          >
            <span>View All Doctors & OPD Schedules</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-hospital-maroon-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-hospital-maroon-800 shadow-sm border border-hospital-pink-100">
                  {doc.departmentName}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-xs font-semibold text-hospital-maroon-600 mt-0.5">{doc.speciality}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{doc.qualification}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>{doc.experience}</span>
                  <span className="inline-flex items-center text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                    Available
                  </span>
                </div>

                <button
                  onClick={() => onSelectDoctorForBooking(doc.id, doc.departmentId)}
                  className="w-full py-2.5 rounded-xl bg-hospital-pink-50 hover:bg-gradient-to-r hover:from-hospital-maroon-600 hover:to-hospital-maroon-700 hover:text-white text-hospital-maroon-700 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS (Clearly labelled sample content) */}
      <section className="bg-gradient-to-b from-hospital-pink-50/50 via-white to-rose-50/30 py-16 border-y border-hospital-pink-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-white px-3.5 py-1 rounded-full uppercase tracking-wider border border-hospital-pink-200/70 shadow-sm mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>Sample Patient Experiences</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Patient Care Experiences
            </h2>
            <p className="text-xs text-slate-500 mt-1 italic">
              Notice: The following testimonials represent sample patient feedback demonstrations until verified hospital patient reviews are incorporated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-hospital-maroon-200 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-2 py-0.5 rounded border border-hospital-pink-100">
                      {item.department}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.datePlaceholder}</span>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                    Sample Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7B. MEET OUR FOUNDER — DR. MADHURAM CHOWDRY */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf6f8] via-white to-[#f8f0f4] py-20 border-y border-rose-100/60">
        {/* Subtle decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#820141]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#820141] bg-white px-4 py-1.5 rounded-full uppercase tracking-widest border border-rose-200/80 shadow-sm mb-3">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>Leadership &amp; Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet Our <span className="text-[#820141]">Founder</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#820141] to-rose-400 mx-auto mt-3 rounded-full" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Biography & credentials */}
            <div className="space-y-7 order-2 lg:order-1">

              {/* Name & credentials block */}
              <div className="space-y-2">
                <span className="inline-flex items-center text-[11px] font-extrabold text-white bg-[#820141] px-3 py-1 rounded-full uppercase tracking-widest shadow">
                  Founder of AR Hospital
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mt-2">
                  Dr. Madhuram
                  <span className="block text-[#820141]">Chowdry</span>
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <GraduationCap className="w-4 h-4 text-[#820141]" />
                  <span className="text-sm font-bold text-slate-600 tracking-wide">M.B.B.S., M.S. (Orthopaedics)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-[#820141]" />
                  <span className="text-sm font-semibold text-[#820141] uppercase tracking-wider">Department of Orthopaedics</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent" />
                <div className="w-2 h-2 rounded-full bg-[#820141]" />
                <div className="flex-1 h-px bg-gradient-to-l from-rose-200 to-transparent" />
              </div>

              {/* Biography */}
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  Dr. Madhuram Chowdry is the founder of AR Hospital and an orthopaedic specialist committed to providing compassionate, patient-focused healthcare. With qualifications in medicine and orthopaedics, he focuses on supporting patients with bone, joint, and musculoskeletal conditions.
                </p>
                <p>
                  His approach emphasizes understanding each patient's needs, providing appropriate medical guidance, and creating a comfortable and reassuring consultation experience. Through AR Hospital, he aims to promote quality healthcare built on compassion, trust, and a commitment to patient well-being.
                </p>
                <p>
                  Guided by the belief that every patient deserves attentive care, Dr. Madhuram Chowdry strives to make healthcare more personal, accessible, and patient-centred.
                </p>
              </div>


              {/* Signature Quote */}
              <div className="relative bg-white border-l-4 border-[#820141] rounded-r-2xl rounded-tl-2xl px-6 py-5 shadow-md">
                <Quote className="absolute top-3 right-4 w-8 h-8 text-rose-100" />
                <p className="text-base sm:text-lg font-bold text-[#820141] italic leading-snug pr-8">
                  "Compassion in every consultation,<br />care in every cure."
                </p>
                <span className="mt-2 block text-xs font-semibold text-slate-400 tracking-wider">— Dr. Madhuram Chowdry, Founder</span>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-[#820141] flex-shrink-0 mt-0.5" />
                <a
                  href={hospitalInfo.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#820141] transition-colors"
                >
                  22, New Kantharaj Urs Rd, CFTRI layout, Sharadadevi Nagar, Mysuru, Karnataka 570022
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="group inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#820141] hover:bg-[#680134] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Book an Appointment
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="group inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white hover:bg-rose-50 text-[#820141] text-sm font-bold border-2 border-[#820141]/30 hover:border-[#820141] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Contact Hospital
                </button>
              </div>

            </div>

            {/* RIGHT — Doctor portrait */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Soft glow */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#820141]/20 via-rose-200/30 to-[#820141]/10 scale-105 blur-sm group-hover:scale-110 transition-transform duration-500" />
                {/* Corner accent — top-left */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#820141] rounded-tl-2xl" />
                {/* Corner accent — bottom-right */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#820141] rounded-br-2xl" />

                {/* Portrait */}
                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl w-72 sm:w-80 lg:w-[380px] aspect-[3/4] bg-gradient-to-b from-rose-50 to-rose-100 group-hover:shadow-[0_30px_60px_rgba(130,1,65,0.25)] transition-shadow duration-500">
                  <img
                    src="/dr-madhuram-chowdry.png"
                    alt="Dr. Madhuram Chowdry — Founder & Orthopaedic Specialist, AR Hospital"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Bottom name overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#4a0b22]/90 via-[#820141]/60 to-transparent px-5 py-5">
                    <p className="text-white font-black text-lg leading-tight">Dr. Madhuram Chowdry</p>
                    <p className="text-rose-200 text-xs font-semibold tracking-wide">M.B.B.S., M.S. (Orthopaedics)</p>
                    <span className="mt-1 inline-block text-[10px] font-extrabold text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full uppercase tracking-widest">Founder · AR Hospital</span>
                  </div>
                </div>

                {/* Floating credential badge */}
                <div className="absolute -left-6 top-10 bg-white rounded-2xl shadow-xl border border-rose-100 px-4 py-3 flex items-center space-x-2 animate-float">
                  <div className="w-9 h-9 rounded-full bg-[#820141]/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#820141]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-800 leading-tight">M.B.B.S. · M.S.</p>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Orthopaedics</p>
                  </div>
                </div>

                {/* Floating stars badge */}
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 bg-[#820141] text-white rounded-2xl shadow-xl px-4 py-3 flex flex-col items-center animate-float" style={{animationDelay:'1.5s'}}>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-rose-300 text-rose-300" />)}
                  </div>
                  <p className="text-[10px] font-bold text-rose-100 mt-1 uppercase tracking-wider">Specialist</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-hospital-maroon-800 via-hospital-maroon-700 to-slate-900 text-white shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-hospital-pink-400/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 text-rose-200 border border-rose-300/30 text-xs font-bold uppercase tracking-wider shadow-sm">
                Priority Healthcare Scheduling
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Schedule Your Medical Consultation?
              </h2>
              <p className="text-xs sm:text-sm text-hospital-pink-100 max-w-xl">
                Choose your department, select an experienced doctor, and pick a convenient date and time slot. Our reception team will confirm your visit instantly.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('appointments')}
                className="px-8 py-4 rounded-2xl bg-white text-hospital-maroon-800 hover:bg-hospital-pink-50 font-bold text-sm shadow-lg hover:shadow-card-hover transition-all flex items-center justify-center hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 mr-2 text-hospital-maroon-600" />
                <span>Book Appointment Online</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 hover:border-hospital-pink-300 transition-colors flex items-center justify-center"
              >
                <span>Contact Hospital Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
