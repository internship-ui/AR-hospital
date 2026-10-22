import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  MapPin, 
  Calendar, 
  X, 
  ChevronRight,
  Filter,
  CheckCircle,
  Users
} from 'lucide-react';
import { Doctor, Department, PageRoute } from '../types';
import { getAssetUrl } from '../utils/assets';

interface DoctorsPageProps {
  doctors: Doctor[];
  departments: Department[];
  onSelectDoctorForBooking: (doctorId: string, departmentId: string) => void;
  onNavigate?: (page: PageRoute) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  doctors,
  departments,
  onSelectDoctorForBooking,
  onNavigate,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctorModal, setActiveDoctorModal] = useState<Doctor | null>(null);

  // Filter doctors based on department dropdown and text search
  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDepartment === 'all' || doc.departmentId === selectedDepartment;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-hospital-maroon-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-200 border border-white/20 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            <span>Consultant Faculty</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Doctors & Specialists
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Meet our multidisciplinary medical faculty dedicated to clinical excellence, evidence-based care, and patient wellbeing.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors by name, speciality, qualification..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-hospital-maroon-500 focus:ring-2 focus:ring-hospital-pink-100 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Dropdown / Count */}
            <div className="w-full md:w-auto flex items-center space-x-3">
              <label htmlFor="dept-filter" className="text-xs font-bold text-slate-500 whitespace-nowrap">
                Department:
              </label>
              <select
                id="dept-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full md:w-64 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-hospital-maroon-500 outline-none bg-white"
              >
                <option value="all">All Departments ({departments.length})</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Department Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 text-white shadow-soft-maroon font-bold scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Specialists ({doctors.length})
            </button>
            {departments.slice(0, 7).map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedDepartment === dept.id
                    ? 'bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 text-white shadow-soft-maroon font-bold scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Notice on Doctor Schedules */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-800 text-xs flex items-center justify-between">
          <span>
            <strong>Editorial Policy Note:</strong> Doctor designations, qualifications, and OPD timings are editable placeholders designed to showcase institutional capability. Final verification is handled at the AR Hospital reception desk.
          </span>
        </div>
      </section>

      {/* 3. Doctors Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-base font-bold text-slate-700">No doctors match your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the department filter or changing your search phrase</p>
            <button
              onClick={() => {
                setSelectedDepartment('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-hospital-maroon-600 hover:underline mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-3xl border border-slate-200/80 hover:border-hospital-pink-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image and Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={getAssetUrl(doc.image)}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-hospital-maroon-800 shadow-sm border border-hospital-pink-200">
                    {doc.departmentName}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold">{doc.name}</h3>
                    <p className="text-xs text-hospital-pink-200 font-medium">{doc.speciality}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Qualification */}
                    <div className="flex items-start space-x-2 text-xs">
                      <GraduationCap className="w-4 h-4 text-hospital-maroon-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-mono text-[11px] leading-relaxed">
                        {doc.qualification}
                      </span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center space-x-2 text-xs">
                      <Briefcase className="w-4 h-4 text-hospital-maroon-700 flex-shrink-0" />
                      <span className="font-semibold text-slate-700">{doc.experience}</span>
                    </div>

                    {/* OPD Timing */}
                    <div className="flex items-center space-x-2 text-xs">
                      <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-600 font-medium">{doc.timing}</span>
                    </div>

                    {/* Location Suite */}
                    <div className="flex items-center space-x-2 text-xs">
                      <MapPin className="w-4 h-4 text-hospital-maroon-700 flex-shrink-0" />
                      <span className="text-slate-500">{doc.roomNumberPlaceholder}</span>
                    </div>
                  </div>

                  {/* Available Days Pills */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Consultation Days:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {doc.availableDays.map((day, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectDoctorForBooking(doc.id, doc.departmentId)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon hover:shadow-card-hover transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Appointment</span>
                    </button>

                    <button
                      onClick={() => setActiveDoctorModal(doc)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                      title="View doctor biography and profile"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Doctor Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-hospital-maroon-100 overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-hospital-maroon-800 to-hospital-maroon-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-100">
                  <img
                    src={getAssetUrl(activeDoctorModal.image)}
                    alt={activeDoctorModal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{activeDoctorModal.name}</h3>
                  <p className="text-xs text-hospital-pink-200">{activeDoctorModal.speciality}</p>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold">
                    {activeDoctorModal.departmentName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveDoctorModal(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  About Specialist
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeDoctorModal.about}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-hospital-pink-50/50 border border-hospital-pink-100 space-y-2 text-xs">
                <div className="flex items-start space-x-2">
                  <GraduationCap className="w-4 h-4 text-hospital-maroon-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 block">Verified Qualifications & Degrees</span>
                    <span className="text-slate-600 font-mono text-[11px]">{activeDoctorModal.qualification}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1 border-t border-hospital-pink-100">
                  <Briefcase className="w-4 h-4 text-hospital-maroon-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700">Experience: </span>
                    <span className="text-slate-600">{activeDoctorModal.experience}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1 border-t border-hospital-pink-100">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700">OPD Consultation Hours: </span>
                    <span className="text-slate-600">{activeDoctorModal.timing}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1 border-t border-hospital-pink-100">
                  <MapPin className="w-4 h-4 text-hospital-maroon-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700">Hospital Clinic: </span>
                    <span className="text-slate-600">{activeDoctorModal.roomNumberPlaceholder}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Languages Spoken:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDoctorModal.languages.map((lang, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveDoctorModal(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const docId = activeDoctorModal.id;
                    const deptId = activeDoctorModal.departmentId;
                    setActiveDoctorModal(null);
                    onSelectDoctorForBooking(docId, deptId);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 shadow-soft-maroon flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment with Specialist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
