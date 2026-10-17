import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Mail, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';
import { Appointment, ContactInquiry, PageRoute } from '../types';
import { apiService } from '../services/api';

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Demo mode allowed, with optional lock
  const [passkey, setPasskey] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);

  const [activeTab, setActiveTab] = useState<'appointments' | 'inquiries'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appts, inqs] = await Promise.all([
        apiService.getAllAppointments().catch(() => []),
        apiService.getAllContactInquiries().catch(() => [])
      ]);
      setAppointments(appts);
      setInquiries(inqs);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const updated = await apiService.updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch (err) {
      alert('Failed to update status on server');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = statusFilter === 'ALL' || appt.status === statusFilter;
    const term = searchFilter.toLowerCase();
    const matchesSearch = 
      appt.booking_reference.toLowerCase().includes(term) ||
      appt.patient_name.toLowerCase().includes(term) ||
      appt.phone_number.toLowerCase().includes(term) ||
      appt.department.toLowerCase().includes(term) ||
      appt.doctor_name.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-hospital-maroon-950 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-hospital-pink-500/20 px-3 py-1 rounded-full text-xs font-bold text-hospital-pink-300 border border-hospital-pink-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AR Hospital Internal Administrative Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hospital Registry & Management Portal
            </h1>
            <p className="text-xs text-slate-400">
              Manage patient appointment bookings, check records, and review contact desk inquiries from SQLite.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Records</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Exit to Website
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Desk Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Tabs & KPI Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'appointments'
                  ? 'bg-hospital-maroon-600 text-white shadow-soft-maroon'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointment Bookings ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'inquiries'
                  ? 'bg-hospital-maroon-600 text-white shadow-soft-maroon'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Enquiries ({inquiries.length})</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Storage Engine: <span className="font-mono font-bold text-hospital-maroon-700">SQLite (Persistent)</span>
          </div>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {/* Search & Status Filters */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by ref, name, phone, dept..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-hospital-maroon-500 outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                {['ALL', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Ref Code</th>
                      <th className="py-3.5 px-4">Patient Info</th>
                      <th className="py-3.5 px-4">Department & Doctor</th>
                      <th className="py-3.5 px-4">Date & Slot</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          No appointments found matching current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-hospital-pink-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-hospital-maroon-800">
                            {appt.booking_reference}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{appt.patient_name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{appt.phone_number}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-hospital-maroon-700 block">{appt.department}</span>
                            <span className="text-[11px] text-slate-500">{appt.doctor_name}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">{appt.appointment_date}</span>
                            <span className="text-[11px] text-slate-500">{appt.time_slot}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                appt.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : appt.status === 'Completed'
                                  ? 'bg-hospital-pink-100 text-hospital-maroon-800 border border-hospital-pink-200'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            {appt.status !== 'Completed' && (
                              <button
                                disabled={updatingId === appt.id}
                                onClick={() => handleStatusUpdate(appt.id, 'Completed')}
                                className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-colors"
                                title="Mark as Completed"
                              >
                                Complete
                              </button>
                            )}
                            {appt.status !== 'Cancelled' && (
                              <button
                                disabled={updatingId === appt.id}
                                onClick={() => handleStatusUpdate(appt.id, 'Cancelled')}
                                className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] transition-colors"
                                title="Cancel appointment"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Sender Details</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4">Received Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No contact enquiries recorded yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-slate-400">#{inq.id}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{inq.name}</span>
                          <span className="text-[11px] text-hospital-maroon-600 block">{inq.email}</span>
                          {inq.phone && <span className="text-[10px] text-slate-400 font-mono">{inq.phone}</span>}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {inq.subject || 'General Enquiry'}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                          {inq.message}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {inq.created_at}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};
