import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Check, 
  FileText,
  Printer
} from 'lucide-react';
import { Appointment } from '../types';
import { apiService } from '../services/api';

interface TrackAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackAppointmentModal: React.FC<TrackAppointmentModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a booking reference code or registered phone number.');
      return;
    }

    setLoading(true);
    setError(null);
    setAppointments([]);

    try {
      const query = searchQuery.trim();
      if (query.toUpperCase().startsWith('ARH-')) {
        // Query by Reference Code
        const appt = await apiService.getAppointmentByReference(query);
        setAppointments([appt]);
      } else {
        // Query by Phone number
        const results = await apiService.searchAppointmentsByPhone(query);
        if (results.length === 0) {
          setError(`No appointment found for phone "${query}". Please check the number.`);
        } else {
          setAppointments(results);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Could not find appointment record. Please verify your reference.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-hospital-maroon-100 overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-hospital-maroon-700 to-hospital-maroon-800 p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <Search className="w-5 h-5 mr-2 text-hospital-pink-300" />
              Track Your Appointment
            </h3>
            <p className="text-xs text-hospital-pink-100 mt-1">
              Enter your booking reference (e.g. ARH-2026-XXXX) or registered phone number
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. ARH-2026-1234 or +1 555 123..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none text-sm font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-hospital-maroon-600 hover:bg-hospital-maroon-700 text-white font-bold text-sm rounded-xl transition-colors shadow-soft-maroon disabled:opacity-50 flex items-center"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Results List */}
          {appointments.length > 0 && (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Found {appointments.length} Appointment Record(s)
              </h4>

              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-5 rounded-2xl border border-hospital-pink-200 bg-hospital-pink-50/40 space-y-3 relative group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hospital-pink-100/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-black text-hospital-maroon-800 bg-white px-2.5 py-1 rounded-lg border border-hospital-pink-200">
                        {appt.booking_reference}
                      </span>
                      <button
                        onClick={() => copyToClipboard(appt.booking_reference)}
                        className="text-slate-400 hover:text-hospital-maroon-600 p-1 rounded"
                        title="Copy reference"
                      >
                        {copiedRef === appt.booking_reference ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        appt.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : appt.status === 'Completed'
                          ? 'bg-hospital-pink-100 text-hospital-maroon-800 border border-hospital-pink-200'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                      <span className="font-semibold text-slate-800">{appt.patient_name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
                      <span className="font-semibold text-hospital-maroon-700">{appt.department}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Doctor / Specialist</span>
                      <span className="font-semibold text-slate-800">{appt.doctor_name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Time</span>
                      <div className="flex items-center text-slate-800 font-semibold">
                        <Calendar className="w-3 h-3 mr-1 text-hospital-maroon-600" />
                        <span>{appt.appointment_date}</span>
                        <span className="mx-1">•</span>
                        <span>{appt.time_slot}</span>
                      </div>
                    </div>
                  </div>

                  {appt.reason && (
                    <div className="pt-2 border-t border-hospital-pink-100/60 text-xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Reason for Visit</span>
                      <p className="text-slate-600 italic">"{appt.reason}"</p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center text-xs font-semibold text-hospital-maroon-700 hover:text-hospital-maroon-800 bg-white px-3 py-1.5 rounded-lg border border-hospital-pink-200 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5 mr-1" />
                      Print Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Guidance */}
          <div className="p-4 rounded-xl bg-hospital-pink-50/60 border border-hospital-pink-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-hospital-pink-700 flex items-center">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-hospital-pink-600" />
              Patient Verification Note
            </span>
            <p>
              Please report to the AR Hospital Outpatient Reception Desk at least 15 minutes before your scheduled slot with your booking reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
