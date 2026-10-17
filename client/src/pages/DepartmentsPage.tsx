import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Stethoscope, 
  User, 
  Bed, 
  CheckCircle2, 
  ChevronRight, 
  Filter,
  X,
  Calendar,
  Building2
} from 'lucide-react';
import { Department, PageRoute } from '../types';

interface DepartmentsPageProps {
  departments: Department[];
  onSelectDepartmentForBooking: (departmentId: string) => void;
  onNavigate?: (page: PageRoute) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  departments,
  onSelectDepartmentForBooking,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDepartment, setActiveModalDepartment] = useState<Department | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(departments.map(d => d.category)))];

  // Filter departments based on search and category
  const filteredDepartments = departments.filter((dept) => {
    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.keyTreatments.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-hospital-maroon-950 via-hospital-maroon-900 to-hospital-maroon-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-hospital-pink-200 border border-white/20 shadow-sm">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Specialities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Medical & Surgical Departments
          </h1>
          <p className="text-sm sm:text-base text-hospital-pink-100 max-w-2xl mx-auto leading-relaxed">
            Explore our 14 specialized medical and surgical departments equipped with modern clinical technology and dedicated specialists.
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
                placeholder="Search departments, treatments, illnesses..."
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

            {/* Department count indicator */}
            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="text-hospital-maroon-700 font-bold">{filteredDepartments.length}</span> of {departments.length} departments
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 text-white shadow-soft-maroon font-bold scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Transparency Notice */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-800 text-xs flex items-center justify-between">
          <span>
            <strong>Editorial Transparency:</strong> All departments and specialities listed here are fully editable. In accordance with hospital policy, doctors and exact facilities remain transparent sample placeholders until verified by the hospital management.
          </span>
        </div>
      </section>

      {/* 3. Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-base font-bold text-slate-700">No departments found matching your search</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filters or using different keywords</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-hospital-maroon-600 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="group bg-white rounded-3xl border border-slate-200/80 hover:border-hospital-pink-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Department Image & Category Badge */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-hospital-maroon-800 shadow-sm border border-hospital-pink-200">
                    {dept.category}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{dept.name}</h3>
                    <p className="text-[11px] text-hospital-pink-200 font-medium truncate mt-0.5">{dept.tagline}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Treatments list */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Common Conditions & Procedures:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.keyTreatments.map((treatment, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-hospital-pink-50/80 text-hospital-maroon-800 px-2.5 py-0.5 rounded-md font-medium border border-hospital-pink-200"
                        >
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Head of department & capacity placeholder */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-hospital-maroon-600 flex-shrink-0" />
                      <span className="truncate" title={dept.headOfDepartment}>
                        {dept.headOfDepartment}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-end">
                      <Bed className="w-3.5 h-3.5 text-hospital-maroon-700 flex-shrink-0" />
                      <span>{dept.bedCountPlaceholder}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectDepartmentForBooking(dept.id)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon hover:shadow-card-hover transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>

                    <button
                      onClick={() => setActiveModalDepartment(dept)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                      title="View full department details"
                    >
                      Overview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Department Detail Modal */}
      {activeModalDepartment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-hospital-maroon-100 overflow-hidden animate-fadeIn">
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={activeModalDepartment.image}
                alt={activeModalDepartment.name}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveModalDepartment(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-hospital-pink-300">
                  {activeModalDepartment.category}
                </span>
                <h3 className="text-2xl font-bold mt-0.5">{activeModalDepartment.name}</h3>
                <p className="text-xs text-slate-200">{activeModalDepartment.tagline}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Clinical Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeModalDepartment.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Treatments & Diagnostic Procedures
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalDepartment.keyTreatments.map((t, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-hospital-maroon-600 flex-shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-hospital-pink-50/60 border border-hospital-pink-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultant In Charge</span>
                  <span className="font-semibold text-slate-800">{activeModalDepartment.headOfDepartment}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Bed / Facility Allocation</span>
                  <span className="font-semibold text-hospital-maroon-800">{activeModalDepartment.bedCountPlaceholder}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveModalDepartment(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const deptId = activeModalDepartment.id;
                    setActiveModalDepartment(null);
                    onSelectDepartmentForBooking(deptId);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 shadow-soft-maroon flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment in {activeModalDepartment.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
