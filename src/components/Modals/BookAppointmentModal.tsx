import React, { useState } from 'react';
import { SpecialistDoctor, LanguageMode } from '../../types';
import {
  Calendar,
  Clock,
  CheckCircle,
  X,
  CreditCard,
  Building,
  User,
  ShieldCheck,
  Video
} from 'lucide-react';

interface BookAppointmentModalProps {
  doctor: SpecialistDoctor | null;
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  doctor,
  isOpen,
  onClose,
  language
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 30 Oct 2026');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM IST');
  const [consultMode, setConsultMode] = useState<'video' | 'hospital'>('video');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen || !doctor) return null;

  const handleConfirm = () => {
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1769AA] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-white" />
            <h3 className="font-bold text-base font-heading">
              {language === 'hi' ? 'विशेषज्ञ परामर्श अपॉइंटमेंट' : 'Book Specialist Consultation'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {!isBooked ? (
            <>
              {/* Doctor Details Summary */}
              <div className="flex items-center gap-3 p-3 bg-[#F5F9FC] rounded-xl border border-[#E2E8F0]">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-300"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1C2E] font-heading">
                    {doctor.name}
                  </h4>
                  <span className="text-xs text-slate-600 block">
                    {language === 'hi' ? doctor.specialtyHi : doctor.specialty}
                  </span>
                  <span className="text-[11px] text-[#1769AA] font-semibold block">
                    {doctor.hospital}
                  </span>
                </div>
              </div>

              {/* Consultation Format (Video Tele-Consult vs In-Hospital OPD) */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Consultation Format:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setConsultMode('video')}
                    className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      consultMode === 'video'
                        ? 'bg-[#1769AA] text-white border-[#1769AA]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    Video Tele-Consult
                  </button>
                  <button
                    onClick={() => setConsultMode('hospital')}
                    className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      consultMode === 'hospital'
                        ? 'bg-[#1769AA] text-white border-[#1769AA]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    In-Hospital OPD
                  </button>
                </div>
              </div>

              {/* Date & Slot Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Available Slots:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Today 18:30', 'Tomorrow 10:00', 'Tomorrow 11:30', 'Tomorrow 15:00', '31 Oct 09:30', '31 Oct 14:00'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-lg border text-center font-medium ${
                        selectedSlot === slot
                          ? 'bg-sky-100 text-[#005087] border-[#1769AA] font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* ABHA & PM-JAY Cashless Badge */}
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="font-bold text-emerald-900 block">PM-JAY Gold Card Linked</span>
                    <span className="text-[10px] text-emerald-700">100% Cashless Coverage Applied</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-800 text-sm">₹0 (Free)</span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2.5 bg-[#1769AA] hover:bg-[#005087] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </>
          ) : (
            /* Confirmation Ticket */
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#0B1C2E] font-heading">
                Appointment Confirmed!
              </h4>
              <p className="text-xs text-slate-600">
                A confirmation SMS and ABHA Health Locker link have been sent to your registered mobile.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg text-left text-xs space-y-1">
                <div><strong>Doctor:</strong> {doctor.name}</div>
                <div><strong>Slot:</strong> {selectedSlot} ({consultMode.toUpperCase()})</div>
                <div><strong>Hospital:</strong> {doctor.hospital}</div>
                <div><strong>Token ID:</strong> #OPD-2026-{Math.floor(1000 + Math.random() * 9000)}</div>
              </div>
              <button
                onClick={handleReset}
                className="mt-3 px-6 py-2 bg-[#1769AA] text-white text-xs font-bold rounded-lg hover:bg-[#005087]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
