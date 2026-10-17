import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  ArrowLeft,
  Sparkles,
  FileText
} from 'lucide-react';
import { Department, Doctor, Appointment, AppointmentFormData, PageRoute } from '../types';
import { apiService } from '../services/api';

interface AppointmentsPageProps {
  departments: Department[];
  doctors: Doctor[];
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onNavigate: (page: PageRoute) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  departments,
  doctors,
  initialDepartmentId,
  initialDoctorId,
  onNavigate
}) => {
  // Today's date in YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phoneNumber: '',
    email: '',
    departmentId: initialDepartmentId || (departments[0]?.id || ''),
    doctorId: initialDoctorId || '',
    appointmentDate: todayStr,
    timeSlot: '09:30 AM - 10:30 AM',
    reason: ''
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Available Time Slots
  const availableSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:30 PM'
  ];

  // Doctors filtered by selected department
  const filteredDoctors = doctors.filter(
    (doc) => doc.departmentId === formData.departmentId
  );

  // Sync initial department and doctor if passed
  useEffect(() => {
    if (initialDepartmentId) {
      setFormData((prev) => ({
        ...prev,
        departmentId: initialDepartmentId,
        doctorId: initialDoctorId || ''
      }));
    }
  }, [initialDepartmentId, initialDoctorId]);

  // If selected department changes and current doctor doesn't belong to it, reset doctor
  useEffect(() => {
    const validDoctor = filteredDoctors.some((d) => d.id === formData.doctorId);
    if (!validDoctor && filteredDoctors.length > 0) {
      setFormData((prev) => ({ ...prev, doctorId: filteredDoctors[0].id }));
    } else if (filteredDoctors.length === 0) {
      setFormData((prev) => ({ ...prev, doctorId: '' }));
    }
  }, [formData.departmentId, filteredDoctors]);

  // Client Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.patientName.trim() || formData.patientName.trim().length < 2) {
      errors.patientName = 'Please enter patient full name (at least 2 characters).';
    }

    const cleanPhone = formData.phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      errors.phoneNumber = 'Please enter a valid phone number (7 to 15 digits).';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g., patient@example.com).';
    }

    if (!formData.departmentId) {
      errors.departmentId = 'Please select a clinical department.';
    }

    if (!formData.doctorId) {
      errors.doctorId = 'Please select a consulting doctor or specialist.';
    }

    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Please pick a preferred appointment date.';
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      selectedDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.appointmentDate = 'Appointments cannot be scheduled in the past. Please select today or a future date.';
      }
    }

    if (!formData.timeSlot) {
      errors.timeSlot = 'Please select an appointment time slot.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.submitAppointment(formData);

      if (response && response.success && response.booking) {
        setConfirmedBooking(response.booking);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        throw new Error(response.message || 'Server did not return booking confirmation.');
      }
    } catch (err: any) {
      console.error('Booking failed:', err);
      setServerError(
        err.message || 'Failed to submit appointment to hospital server. Please check your network or call our helpline.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleBookAnother = () => {
    setConfirmedBooking(null);
    setFormData({
      patientName: '',
      phoneNumber: '',
      email: '',
      departmentId: departments[0]?.id || '',
      doctorId: '',
      appointmentDate: todayStr,
      timeSlot: '09:30 AM - 10:30 AM',
      reason: ''
    });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-900 via-hospital-maroon-800 to-slate-900 text-white py-14 lg:py-16 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-hospital-pink-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-hospital-maroon-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-hospital-pink-500/15 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-300 border border-hospital-pink-400/30 shadow-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>Digital Patient Desk • Instant Confirmation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Schedule an Appointment
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Reserve your consultation with our experienced clinical specialists. Instant confirmed reference code provided upon server verification.
          </p>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SUCCESS CONFIRMATION WORKFLOW CARD */}
        {confirmedBooking ? (
          <div className="bg-white rounded-3xl border-2 border-hospital-maroon-400 shadow-2xl p-6 sm:p-10 space-y-8 animate-fadeIn">
            {/* Top Badge */}
            <div className="text-center space-y-3 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Booking Accepted & Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Appointment Successfully Scheduled
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Your consultation request has been validated and recorded in the AR Hospital registry.
              </p>
            </div>

            {/* Reference Badge Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-hospital-pink-50/90 via-rose-50/50 to-hospital-pink-100/60 border border-hospital-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Your Booking Reference Code
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-hospital-maroon-900 tracking-wide">
                  {confirmedBooking.booking_reference}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Quote this reference code at the hospital reception desk on arrival.
                </p>
              </div>

              <button
                onClick={() => copyReference(confirmedBooking.booking_reference)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-hospital-maroon-300 hover:border-hospital-maroon-500 text-hospital-maroon-700 font-bold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Reference</span>
                  </>
                )}
              </button>
            </div>

            {/* Appointment Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Patient Full Name
                </span>
                <span className="font-bold text-slate-800 text-base">{confirmedBooking.patient_name}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Contact Mobile Number
                </span>
                <span className="font-semibold text-slate-800">{confirmedBooking.phone_number}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Department
                </span>
                <span className="font-semibold text-hospital-maroon-700">{confirmedBooking.department}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Consulting Doctor / Specialist
                </span>
                <span className="font-semibold text-slate-800">{confirmedBooking.doctor_name}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Scheduled Date
                </span>
                <span className="font-bold text-slate-900 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-hospital-maroon-600" />
                  {confirmedBooking.appointment_date}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Consultation Time Slot
                </span>
                <span className="font-bold text-emerald-700 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  {confirmedBooking.time_slot}
                </span>
              </div>
            </div>

            {/* Visit Instructions Notice */}
            <div className="p-5 rounded-2xl bg-hospital-pink-50/60 border border-hospital-pink-100 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-hospital-maroon-900 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-hospital-maroon-600" />
                Hospital Guidelines for Your Visit:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>Please arrive 15 minutes before your time slot to complete quick vitals recording at the OPD triage.</li>
                <li>Bring your previous medical reports, prescriptions, or imaging files if applicable.</li>
                <li>In case of emergency symptoms prior to your slot, please report directly to the 24/7 Emergency Wing.</li>
              </ul>
            </div>

            {/* Workflow Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Receipt</span>
              </button>

              <button
                onClick={handleBookAnother}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon flex items-center justify-center space-x-2 transition-all"
              >
                <span>Book Another Appointment</span>
              </button>
            </div>
          </div>
        ) : (
          /* APPOINTMENT FORM */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10 space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Patient & Consultation Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please complete the required fields below. Your information is processed securely through our protected database.
              </p>
            </div>

            {/* Server Error Message Alert */}
            {serverError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <div>
                  <span className="font-bold block">Submission Error:</span>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Patient Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Patient Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                        formErrors.patientName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                      }`}
                    />
                  </div>
                  {formErrors.patientName && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.patientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="e.g. +1 555 123 4567"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                        formErrors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                      }`}
                    />
                  </div>
                  {formErrors.phoneNumber && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(Optional for confirmation receipt)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. patient@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                      formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.email}</p>
                )}
              </div>

              {/* Row 3: Department & Doctor Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Medical Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none bg-white font-medium transition-all"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.departmentId && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.departmentId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Consultant / Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none bg-white font-medium transition-all"
                  >
                    {filteredDoctors.length === 0 ? (
                      <option value="">No specialists registered in this department</option>
                    ) : (
                      filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} - {doc.speciality}
                        </option>
                      ))
                    )}
                  </select>
                  {formErrors.doctorId && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.doctorId}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Preferred Date (Past Date Prevented) & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all ${
                        formErrors.appointmentDate ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-hospital-maroon-500'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Note: Dates in the past are strictly disabled.
                  </span>
                  {formErrors.appointmentDate && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.appointmentDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Consultation Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none bg-white font-medium transition-all"
                  >
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {formErrors.timeSlot && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.timeSlot}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Reason for Visit / Symptoms (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Symptoms or Reason for Consultation <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Describe your health symptoms, ongoing medications, or reason for requesting consultation..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600 flex-shrink-0" />
                  <span>256-bit encrypted medical booking</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-sm shadow-soft-maroon hover:shadow-card transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying with Server...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Submit Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};
