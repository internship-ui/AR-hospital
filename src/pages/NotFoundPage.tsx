import React from 'react';
import { Stethoscope, ArrowLeft, Home, Calendar } from 'lucide-react';
import { PageRoute } from '../types';

interface NotFoundPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-hospital-pink-50 text-hospital-maroon-600 flex items-center justify-center mx-auto shadow-soft-maroon border border-hospital-pink-200">
            <Stethoscope className="w-12 h-12 stroke-[1.5]" />
          </div>
          <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 text-white text-xs font-bold rounded-full shadow-sm">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The healthcare service, clinical page, or resource you are looking for is unavailable or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-hospital-maroon-600 to-hospital-maroon-700 hover:from-hospital-maroon-700 hover:to-hospital-maroon-800 text-white font-bold text-xs shadow-soft-maroon flex items-center justify-center space-x-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('appointments')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-hospital-maroon-600" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
