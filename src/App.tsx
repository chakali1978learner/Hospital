import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, ScreenId } from './components/Navigation';
import { CommandCenterScreen } from './components/screens/CommandCenterScreen';
import { PrescriptionScribeScreen } from './components/screens/PrescriptionScribeScreen';
import { RadiologyScreen } from './components/screens/RadiologyScreen';
import { PatientPortalScreen } from './components/screens/PatientPortalScreen';
import { EmergencyScreen } from './components/screens/EmergencyScreen';
import { IntegrativeCareScreen } from './components/screens/IntegrativeCareScreen';
import { EmergencyStickyBar } from './components/EmergencyStickyBar';
import { CodeBlueModal } from './components/Modals/CodeBlueModal';
import { BookAppointmentModal } from './components/Modals/BookAppointmentModal';
import { mockPatients, mockDoctors } from './data/mockData';
import { SpecialistDoctor, LanguageMode } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('command-center');
  const [language, setLanguage] = useState<LanguageMode>('dual');
  const [selectedHospital, setSelectedHospital] = useState('All Connected Nodes');
  const [selectedPatientId, setSelectedPatientId] = useState('pt-1');

  // Modal States
  const [isCodeBlueOpen, setIsCodeBlueOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<SpecialistDoctor | null>(null);

  // Total active alerts across patients
  const totalAlerts = mockPatients.reduce((sum, p) => sum + p.alerts.length, 0);

  return (
    <div className="min-h-screen bg-[#F5F9FC] text-[#243447] flex flex-col font-sans pb-20">
      {/* Top Clinical Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        selectedHospital={selectedHospital}
        setSelectedHospital={setSelectedHospital}
        onOpenEmergency={() => setIsCodeBlueOpen(true)}
        activePatientCount={mockPatients.length}
        criticalAlertCount={totalAlerts}
      />

      {/* Primary Module Navigation Tabs */}
      <Navigation
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        language={language}
        criticalAlertCount={totalAlerts}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeScreen === 'command-center' && (
          <CommandCenterScreen
            patients={mockPatients}
            selectedPatientId={selectedPatientId}
            setSelectedPatientId={setSelectedPatientId}
            language={language}
            onNavigateToScribe={() => setActiveScreen('prescription-scribe')}
            onNavigateToRadiology={() => setActiveScreen('radiology')}
          />
        )}

        {activeScreen === 'prescription-scribe' && (
          <PrescriptionScribeScreen language={language} />
        )}

        {activeScreen === 'radiology' && (
          <RadiologyScreen language={language} />
        )}

        {activeScreen === 'patient-portal' && (
          <PatientPortalScreen
            language={language}
            onBookDoctor={(doc) => setBookingDoctor(doc)}
            onTriggerEmergency={() => setIsCodeBlueOpen(true)}
          />
        )}

        {activeScreen === 'emergency' && (
          <EmergencyScreen
            language={language}
            onTriggerCodeBlue={() => setIsCodeBlueOpen(true)}
          />
        )}

        {activeScreen === 'integrative' && (
          <IntegrativeCareScreen language={language} />
        )}
      </main>

      {/* Emergency Sticky Bar pinned to bottom viewport (Design System Constraint: z-50) */}
      <EmergencyStickyBar
        language={language}
        onCallAmbulance={() => {
          setActiveScreen('emergency');
          setIsCodeBlueOpen(true);
        }}
        onInstantTeleConsult={() => {
          setBookingDoctor(mockDoctors[0]);
        }}
        onTraumaTriage={() => {
          setActiveScreen('emergency');
        }}
      />

      {/* Emergency Code Blue & Trauma Escalation Modal */}
      <CodeBlueModal
        isOpen={isCodeBlueOpen}
        onClose={() => setIsCodeBlueOpen(false)}
        language={language}
      />

      {/* Doctor Consultation Booking Modal */}
      <BookAppointmentModal
        doctor={bookingDoctor}
        isOpen={!!bookingDoctor}
        onClose={() => setBookingDoctor(null)}
        language={language}
      />
    </div>
  );
}
