import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Heart, 
  Search, 
  ShieldCheck, 
  MessageCircle,
  Activity
} from 'lucide-react';
import { PageRoute, HospitalInfo } from '../types';
import hospitalLogo from '../assets/ar-hospital-logo.png';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  hospitalInfo: HospitalInfo;
  onOpenTrackModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  hospitalInfo,
  onOpenTrackModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Departments', page: 'departments' },
    { label: 'Doctors', page: 'doctors' },
    { label: 'Services & Facilities', page: 'services' },
    { label: 'Appointments', page: 'appointments' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emergencyPhone = hospitalInfo.contact.emergencyNumberPlaceholder.replace(/[^0-9+]/g, '') || '+18002746774';
  const officialPhone = hospitalInfo.contact.officialPhonePlaceholder.replace(/[^0-9+]/g, '') || '+15550192834';

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm glass-nav border-b border-hospital-pink-100/70">
      {/* 1. Top Announcement & Emergency Bar */}
      <div className="bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-hospital-maroon-800 text-white text-xs py-2 px-4 sm:px-8 border-b border-hospital-maroon-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          {/* Emergency Alert & Hotline */}
          <div className="flex items-center space-x-4">
            <span className="flex items-center bg-rose-500/25 text-rose-200 border border-rose-400/50 px-2.5 py-0.5 rounded-full font-bold text-[11px] uppercase tracking-wider animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-1.5 inline-block animate-ping"></span>
              24/7 Emergency Hotline
            </span>
            <a 
              href={`tel:${emergencyPhone}`}
              className="flex items-center text-hospital-pink-200 hover:text-white font-bold transition-colors"
              title="Click to dial emergency care"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-hospital-pink-300" />
              <span>{hospitalInfo.contact.emergencyNumberPlaceholder}</span>
            </a>
          </div>

          {/* Quick Info & Action Badges */}
          <div className="hidden lg:flex items-center space-x-6 text-slate-300">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-hospital-pink-200" />
              <span>OPD: 08:30 AM - 07:00 PM</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-hospital-pink-200" />
              <a
                href={hospitalInfo.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View AR Hospital Location on Google Maps"
                className="truncate max-w-xs hover:text-white transition-colors"
              >
                {hospitalInfo.address.streetPlaceholder}
              </a>
            </div>
            {hospitalInfo.contact.whatsAppEnabled && (
              <a
                href={`https://wa.me/${hospitalInfo.contact.whatsAppNumberPlaceholder}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-emerald-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>WhatsApp Enquiry</span>
              </a>
            )}
            <button
              onClick={onOpenTrackModal}
              className="flex items-center bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors text-[11px] font-medium"
            >
              <Search className="w-3 h-3 mr-1 text-hospital-pink-200" />
              Track Appointment
            </button>
            <button
              onClick={() => handleLinkClick('admin')}
              className="text-slate-400 hover:text-white text-[11px] flex items-center transition-colors"
              title="Staff & Administration Dashboard"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              Staff Desk
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center cursor-pointer group select-none"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-rose-300/80 shadow-soft-pink flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{boxShadow: '0 0 0 3px rgba(130,1,65,0.12), 0 4px 12px rgba(130,1,65,0.15)'}}>
            <img 
              src={hospitalLogo} 
              alt="AR Hospital Logo - Healing Hands" 
              className="w-[140%] h-[140%] object-cover object-top"
              style={{marginTop: '-10%'}}
              onError={(e) => {
                (e.target as HTMLImageElement).src = './ar-hospital-logo.png';
              }}
            />
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-hospital-maroon-700 transition-colors">
                AR
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-hospital-maroon-600 ml-1.5">
                HOSPITAL
              </span>
              <span className="ml-2 px-2 py-0.5 text-[10px] uppercase font-extrabold tracking-wider bg-hospital-pink-50 text-hospital-maroon-700 rounded-full border border-hospital-pink-200">
                24x7
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-hospital-maroon-700 tracking-widest uppercase">
              Healing Hands
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-hospital-maroon-700 bg-hospital-pink-50 font-bold'
                    : 'text-slate-600 hover:text-hospital-maroon-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-hospital-maroon-600 via-hospital-maroon-500 to-hospital-pink-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action: Book Appointment CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleLinkClick('appointments')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-hospital-maroon-600 via-hospital-maroon-700 to-hospital-maroon-800 hover:from-hospital-maroon-700 hover:to-hospital-maroon-900 text-white text-sm font-bold shadow-soft-maroon hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 group"
          >
            <Calendar className="w-4 h-4 mr-2 text-hospital-pink-200 group-hover:scale-110 transition-transform" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-hospital-maroon-600 hover:bg-hospital-pink-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-hospital-pink-100 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation Menu</span>
            <button
              onClick={onOpenTrackModal}
              className="text-xs text-hospital-maroon-600 font-bold flex items-center bg-hospital-pink-50 px-2.5 py-1 rounded-lg"
            >
              <Search className="w-3.5 h-3.5 mr-1" />
              Track Appointment
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-hospital-maroon-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleLinkClick('appointments')}
              className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 via-hospital-maroon-700 to-hospital-maroon-800 text-white font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4 mr-2 text-hospital-pink-200" />
              Book Appointment
            </button>

            <a
              href={`tel:${emergencyPhone}`}
              className="w-full flex items-center justify-center py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
              Emergency Call: {hospitalInfo.contact.emergencyNumberPlaceholder}
            </a>

            <button
              onClick={() => handleLinkClick('admin')}
              className="w-full text-center py-2 text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Hospital Staff & Administration Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
