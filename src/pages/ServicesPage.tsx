import React from 'react';
import { 
  Activity, 
  HeartPulse, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { HospitalService, HospitalInfo, PageRoute } from '../types';

interface ServicesPageProps {
  services: HospitalService[];
  hospitalInfo: HospitalInfo;
  onNavigate: (page: PageRoute) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  hospitalInfo,
  onNavigate
}) => {
  const emergencyPhone = hospitalInfo.contact.emergencyNumberPlaceholder.replace(/[^0-9+]/g, '') || '+18002746774';

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-hospital-maroon-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-200 border border-white/20 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            <span>Healthcare Services & Facilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Clinical Services & Facilities
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Delivering rounded, high-standard medical care through dedicated consultation clinics, modern surgical suites, automated laboratories, and 24/7 emergency response.
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-hospital-pink-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-hospital-maroon-800 shadow-sm border border-hospital-pink-200">
                  {service.category}
                </div>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              </div>

              {/* Service Description & Features */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Clinical Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-hospital-maroon-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing & CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{service.timing}</span>
                  </div>

                  <button
                    onClick={() => onNavigate('appointments')}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white text-xs font-bold shadow-soft-maroon hover:shadow-card-hover transition-all"
                  >
                    <span>Inquire / Book</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Emergency & Diagnostic Support Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-hospital-maroon-800/60">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-hospital-pink-300 uppercase tracking-wider">
                Support Facilities
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Round-the-Clock Critical Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you require diagnostic blood work at midnight, urgent emergency prescription dispensing from our pharmacy, or continuous telemetry in the ICU, AR Hospital staff is permanently on-duty.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 text-hospital-pink-200 border border-white/15">
                  ✓ 24/7 Emergency Pharmacy
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 text-hospital-pink-200 border border-white/15">
                  ✓ 24/7 Automated Blood Bank & Lab
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 text-hospital-pink-200 border border-white/15">
                  ✓ Emergency Ambulance Dispatch
                </span>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700/80 space-y-4 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start">
                <HeartPulse className="w-5 h-5 mr-2 text-rose-400 animate-heart-pulse" />
                Emergency Hotline & Dispatch
              </h3>
              <p className="text-xs text-slate-300">
                Call our direct emergency line for instant medical guidance or ambulance coordination:
              </p>
              <a
                href={`tel:${emergencyPhone}`}
                className="inline-block text-2xl font-black text-rose-300 hover:text-white transition-colors"
              >
                {hospitalInfo.contact.emergencyNumberPlaceholder}
              </a>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon transition-all"
                >
                  View Campus Map & Reception Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
