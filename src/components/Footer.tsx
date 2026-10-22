import React from 'react';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from 'lucide-react';
import { PageRoute, HospitalInfo } from '../types';
import hospitalLogo from '../assets/ar-hospital-logo.png';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  hospitalInfo: HospitalInfo;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, hospitalInfo }) => {
  const emergencyPhone = hospitalInfo.contact.emergencyNumberPlaceholder.replace(/[^0-9+]/g, '') || '+18002746774';
  const officialPhone = hospitalInfo.contact.officialPhonePlaceholder.replace(/[^0-9+]/g, '') || '+15550192834';

  const departmentsList = [
    'General Medicine',
    'Cardiology',
    'Orthopaedics',
    'Paediatrics',
    'Gynaecology & Obstetrics',
    'Dermatology',
    'ENT',
    'General Surgery',
    'Intensive Care Unit (ICU)',
    'OMFS Surgery',
    'Neurosurgery',
    'Physiotherapy',
    'Virology & Infections',
    'Pulmonology'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-hospital-maroon-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Hospital Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-13 h-13 rounded-full overflow-hidden bg-white border border-slate-600 shadow-sm flex items-center justify-center flex-shrink-0" style={{width:'52px',height:'52px',boxShadow:'0 0 0 2px rgba(130,1,65,0.3)'}}>
                <img 
                  src={hospitalLogo} 
                  alt="AR Hospital Logo - Healing Hands" 
                  className="w-[140%] h-[140%] object-cover object-top"
                  style={{marginTop:'-10%'}}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './ar-hospital-logo.png';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-xl font-black text-white tracking-tight">AR </span>
                  <span className="text-xl font-black text-rose-300 ml-1.5">HOSPITAL</span>
                </div>
                <span className="text-[10px] font-bold text-hospital-pink-300 uppercase tracking-widest block">
                  HEALING HANDS • ಎ ಆರ್ ಆಸ್ಪತ್ರೆ
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              AR Hospital is committed to delivering state-of-the-art medical excellence, clinical compassion, and patient-first healthcare across specialized inpatient and outpatient care units.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-1">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                24/7 Immediate Emergency Service
              </span>
              <a 
                href={`tel:${emergencyPhone}`}
                className="text-lg font-black text-white hover:text-red-300 transition-colors flex items-center"
              >
                <Phone className="w-4 h-4 mr-2 text-red-400" />
                {hospitalInfo.contact.emergencyNumberPlaceholder}
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('appointments')}
                className="inline-flex items-center text-xs font-bold text-white bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 px-4 py-2.5 rounded-xl transition-all shadow-soft-maroon"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Book Consultation Online
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home Page', page: 'home' as PageRoute },
                { label: 'About AR Hospital', page: 'about' as PageRoute },
                { label: 'Clinical Departments', page: 'departments' as PageRoute },
                { label: 'Medical Specialists & Doctors', page: 'doctors' as PageRoute },
                { label: 'Hospital Services & Facilities', page: 'services' as PageRoute },
                { label: 'Book an Appointment', page: 'appointments' as PageRoute },
                { label: 'Contact Us & Directions', page: 'contact' as PageRoute },
                { label: 'Staff & Admin Portal', page: 'admin' as PageRoute },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center text-slate-400 hover:text-hospital-pink-300 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-hospital-maroon-400" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Departments */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Departments & Specialities
            </h3>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
              {departmentsList.map((dept) => (
                <li key={dept} className="flex items-center truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-hospital-maroon-400 mr-2 flex-shrink-0"></span>
                  <button 
                    onClick={() => {
                      onNavigate('departments');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors truncate text-left"
                  >
                    {dept}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Hospital Contact & Hours
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-hospital-maroon-400 mt-0.5 flex-shrink-0" />
                <a
                  href={hospitalInfo.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {hospitalInfo.address.streetPlaceholder}, {hospitalInfo.address.cityStatePlaceholder}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-hospital-maroon-400 flex-shrink-0" />
                <a 
                  href={`tel:${officialPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {hospitalInfo.contact.officialPhonePlaceholder}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-hospital-maroon-400 flex-shrink-0" />
                <a 
                  href={`mailto:${hospitalInfo.contact.emailPlaceholder}`}
                  className="hover:text-white transition-colors"
                >
                  {hospitalInfo.contact.emailPlaceholder}
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <div className="flex items-center text-slate-400">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span className="font-semibold text-slate-200">OPD: Mon - Sat 08:30 - 19:00</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Emergency, ICU & Pharmacy open 24/7 round-the-clock.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} AR Hospital. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Notice: Information, doctor schedules, and department availability are subject to verified administrative confirmation.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button 
              onClick={() => onNavigate('contact')}
              className="hover:text-hospital-pink-300 transition-colors"
            >
              Emergency Helpline
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('appointments')}
              className="hover:text-hospital-pink-300 transition-colors"
            >
              Online Consultation
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('admin')}
              className="hover:text-hospital-pink-300 transition-colors flex items-center"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
