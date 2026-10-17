import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Navigation,
  HeartPulse,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { HospitalInfo, ContactFormData, PageRoute } from '../types';
import { apiService } from '../services/api';

interface ContactPageProps {
  hospitalInfo: HospitalInfo;
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ hospitalInfo, onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const emergencyPhone = hospitalInfo.contact.emergencyNumberPlaceholder.replace(/[^0-9+]/g, '') || '+18002746774';
  const officialPhone = hospitalInfo.contact.officialPhonePlaceholder.replace(/[^0-9+]/g, '') || '+15550192834';

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please enter your message or inquiry (at least 5 characters).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await apiService.submitContact(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(res.message || 'Failed to submit contact enquiry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-900 via-hospital-maroon-800 to-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-hospital-pink-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-hospital-maroon-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-hospital-pink-500/15 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-300 border border-hospital-pink-400/30 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>Connect with AR Hospital • 24/7 Available</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Us & Hospital Directions
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Reach out to our patient relations desk, emergency triage, or hospital admissions. We are here to assist you 24 hours a day.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Hospital Contact Details & Emergency Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Hospital Contact Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Physical Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-hospital-pink-50 text-hospital-maroon-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Hospital Campus</span>
                    <p className="font-semibold text-slate-800 leading-snug">
                      {hospitalInfo.address.streetPlaceholder}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {hospitalInfo.address.cityStatePlaceholder}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-hospital-pink-100 text-hospital-maroon-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">General Enquiries (Click to Call)</span>
                    <a
                      href={`tel:${officialPhone}`}
                      className="font-bold text-hospital-maroon-700 hover:text-hospital-maroon-900 transition-colors"
                    >
                      {hospitalInfo.contact.officialPhonePlaceholder}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-hospital-pink-50 text-hospital-maroon-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Desk (Click to Mail)</span>
                    <a
                      href={`mailto:${hospitalInfo.contact.emailPlaceholder}`}
                      className="font-bold text-hospital-maroon-700 hover:text-hospital-maroon-900 transition-colors"
                    >
                      {hospitalInfo.contact.emailPlaceholder}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                {hospitalInfo.contact.whatsAppEnabled && (
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">WhatsApp Desk</span>
                      <a
                        href={`https://wa.me/${hospitalInfo.contact.whatsAppNumberPlaceholder}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:underline flex items-center"
                      >
                        <span>Chat with Reception</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Working Hours Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <span className="font-bold text-slate-700 block flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-hospital-maroon-600" />
                  Operating Hours
                </span>
                <div className="space-y-1 text-slate-600">
                  <p><strong>Emergency & Trauma:</strong> {hospitalInfo.hours.emergency}</p>
                  <p><strong>Outpatient OPD:</strong> {hospitalInfo.hours.opdConsultations}</p>
                  <p><strong>Central Pharmacy:</strong> {hospitalInfo.hours.pharmacy}</p>
                  <p><strong>Patient Visiting:</strong> {hospitalInfo.hours.visitingHours}</p>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-hospital-maroon-950 via-hospital-maroon-900 to-slate-950 text-white space-y-4 shadow-xl border border-hospital-maroon-800/80">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded-full inline-block border border-red-500/30">
                Immediate Critical Support
              </span>
              <h3 className="text-xl font-bold flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-red-400 animate-pulse" />
                24/7 Emergency Care
              </h3>
              <p className="text-xs text-hospital-pink-100 leading-relaxed">
                Need acute emergency resuscitation, trauma ambulance, or critical intensive care bed confirmation?
              </p>
              <a
                href={`tel:${emergencyPhone}`}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Helpline: {hospitalInfo.contact.emergencyNumberPlaceholder}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Send an Enquiry to AR Hospital
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in the form below and our patient relations desk will reply within standard working hours.
                </p>
              </div>

              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Message Sent:</span>
                    <span>{successMsg}</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Submission Error:</span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Mitchell"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                        formErrors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                        formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Enquiry Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. OPD Consultation / Health Checkup"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your healthcare inquiry, consultation question, or feedback..."
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none resize-none transition-all ${
                      formErrors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon hover:shadow-card transition-all disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Google Maps Embed Placeholder & Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-hospital-maroon-600">
                Hospital Location & Campus Map
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                How to Reach AR Hospital
              </h3>
              <p className="text-xs font-medium text-slate-600 mt-1">
                22, New Kantharaj Urs Rd, CFTRI layout, Sharadadevi Nagar, Mysuru, Karnataka 570022
              </p>
            </div>

            <a
              href={hospitalInfo.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon transition-all space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Interactive Map Iframe */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/7] min-h-[320px] sm:min-h-[420px] relative bg-slate-100">
            <iframe
              title="AR Hospital Location Map"
              src={hospitalInfo.address.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px] sm:min-h-[420px]"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
