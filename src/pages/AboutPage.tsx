import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Heart,
  Activity,
  Sparkles
} from 'lucide-react';
import { HospitalInfo, PageRoute } from '../types';
import hospitalBuilding from '../assets/ar-hospital-building.jpg';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  hospitalInfo: HospitalInfo;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, hospitalInfo }) => {
  const values = [
    {
      title: 'Clinical Excellence',
      description: 'Adhering to high medical standards, evidence-based treatment protocols, and rigorous infection control guidelines.',
      icon: ShieldCheck,
      color: 'bg-hospital-pink-50 text-hospital-maroon-600 border border-hospital-pink-200'
    },
    {
      title: 'Compassionate Care',
      description: 'Treating each patient and family with empathy, active listening, dignity, and personalized emotional support.',
      icon: Heart,
      color: 'bg-hospital-pink-50 text-hospital-maroon-700 border border-hospital-pink-200'
    },
    {
      title: 'Integrity & Transparency',
      description: 'Honest medical advice, transparent billing practices, and open communication regarding clinical options and outcomes.',
      icon: Award,
      color: 'bg-slate-50 text-slate-700 border border-slate-200'
    },
    {
      title: 'Patient Safety First',
      description: 'Uncompromising adherence to sanitization, sterile modular operation theatres, and continuous patient vital monitoring.',
      icon: Activity,
      color: 'bg-hospital-pink-50 text-hospital-maroon-800 border border-hospital-pink-200'
    }
  ];

  const milestones = [
    {
      year: '[Inception Year Placeholder]',
      title: 'Establishment of AR Hospital',
      description: 'Founded with a core commitment to serve the local community with dedicated general outpatient, trauma care, and inpatient facilities.'
    },
    {
      year: '[Milestone Year Placeholder]',
      title: 'Expansion of Super-Specialities',
      description: 'Addition of dedicated Cardiology, Neurosurgery, Pulmonology, and High-Tech Intensive Care Units (ICU & CCU).'
    },
    {
      year: '[Infrastructure Year Placeholder]',
      title: 'Modern Modular Theatres & Diagnostics',
      description: 'Commissioned laminar airflow modular operating suites and automated pathology diagnostic laboratories.'
    },
    {
      year: '[Present Day / 2026]',
      title: 'Digital Patient Portal & Continuous Care',
      description: 'Launched seamless digital appointment booking, real-time reference tracking, and electronic health record coordination.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-hospital-maroon-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-200 border border-white/20 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>Official Hospital Overview</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About AR Hospital
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Delivering trusted, modern, and compassionate healthcare to individuals and families.
          </p>
        </div>
      </section>

      {/* 2. Hospital Overview & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3.5 py-1 rounded-full uppercase tracking-wider border border-hospital-pink-200/60 shadow-sm">
              <span>Patient-Care Philosophy</span>
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Committed to Modern Medicine, Grounded in Compassion
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              AR Hospital is established with a vision to provide multi-speciality tertiary care and 24/7 emergency response. We believe that true healthcare combines medical acumen with transparent human touch.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              From our fully equipped critical care unit and operation theatres to outpatient consultations across 14 specialties, our focus is singular: delivering optimal patient outcomes in an environment where families feel cared for and respected.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl font-black text-hospital-maroon-600 block">14+</span>
                <span className="text-xs font-semibold text-slate-600">Medical Departments</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-2xl font-black text-hospital-maroon-600 block">24/7</span>
                <span className="text-xs font-semibold text-slate-600">Emergency & Trauma</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src={hospitalBuilding}
                alt="AR Hospital Building Campus"
                className="w-full h-96 object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './ar-hospital-building.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-hospital-pink-300">Campus Facility</p>
                <p className="text-sm font-semibold">AR Hospital Main Healthcare Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section className="bg-hospital-pink-50/40 py-16 border-y border-hospital-pink-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mission */}
            <div className="p-8 rounded-3xl bg-white border border-hospital-pink-200/80 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-hospital-pink-100 flex items-center justify-center text-hospital-maroon-700">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide patient-centered, accessible, and high-quality healthcare services that alleviate illness, protect community health, and nurture healing through advanced medicine and heartfelt compassion.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-3xl bg-white border border-hospital-pink-200/80 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-hospital-pink-100 flex items-center justify-center text-hospital-maroon-600">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To stand as a recognized benchmark in healthcare by consistently modernizing clinical protocols, fostering clinical trust, and improving the quality of life for every individual entrusted to our care.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 text-center">Core Healthcare Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const IconComp = v.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:shadow-card transition-shadow space-y-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.color}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{v.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Timeline / Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-hospital-pink-200/60 shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>Progress & Evolution</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Institutional Milestones
          </h2>
          <p className="text-xs text-slate-500 mt-1 italic">
            Timeline highlights with editable placeholders ready for official institutional history.
          </p>
        </div>

        <div className="relative border-l-2 border-hospital-pink-200 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on line */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-hospital-maroon-600 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300">
                <span className="text-xs font-mono font-bold text-hospital-maroon-700 bg-hospital-pink-50 px-3 py-1 rounded-full inline-block mb-2 border border-hospital-pink-100">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Infrastructure & Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-hospital-pink-400 uppercase tracking-wider">
              Infrastructure & Equipment
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Purpose-Built for Safety & Cleanliness
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Our campus maintains comprehensive clinical standards to ensure zero cross-contamination and optimal patient recovery times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Modular Operation Theatres', desc: 'Positive pressure, HEPA filtered air, automated surgical tables' },
              { label: 'Intensive Care Units (ICU)', desc: '16 High-tech beds with continuous multi-parameter telemetry' },
              { label: 'Diagnostic Radiology', desc: 'Low-dose digital X-Ray & high-resolution 4D ultrasonography' },
              { label: 'Inpatient Suites', desc: 'Private air-conditioned rooms, attached bathrooms, attendant couches' },
              { label: '24/7 Power & Oxygen Backup', desc: 'Uninterrupted power supply with liquid medical oxygen tank' },
              { label: 'Central Sterile Supply (CSSD)', desc: 'Automated autoclaves and strict biological indicator testing' }
            ].map((fac, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <CheckCircle className="w-5 h-5 text-hospital-pink-300" />
                <h4 className="text-sm font-bold text-white">{fac.label}</h4>
                <p className="text-xs text-slate-400">{fac.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800 gap-4">
            <span className="text-xs text-slate-400">
              Have questions about inpatient admissions or facilities?
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 rounded-xl bg-hospital-maroon-600 hover:bg-hospital-maroon-700 text-white font-bold text-xs transition-colors shadow-soft-maroon"
            >
              Contact Hospital Reception
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
