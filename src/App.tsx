import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Simulator from '@/components/Simulator';
import Triage from '@/components/Triage';
import Comparison from '@/components/Comparison';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import PatientDashboard from '@/pages/PatientDashboard';
import ExerciseLibrary from '@/pages/ExerciseLibrary';
import TherapistProfile from '@/pages/TherapistProfile';
import About from '@/pages/About';
import TherapistsJoin from '@/pages/TherapistsJoin';
import PatientGuide from '@/pages/PatientGuide';
import Privacy from '@/pages/Privacy';
import Support from '@/pages/Support';
import ScrollToHash from '@/components/ScrollToHash';

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Simulator />
        <Triage />
        <Comparison />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ScrollToHash>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient/dashboard" element={<AppShell><PatientDashboard /></AppShell>} />
        <Route path="/patient/exercises" element={<AppShell><ExerciseLibrary /></AppShell>} />
        <Route path="/therapist/:id" element={<AppShell><TherapistProfile /></AppShell>} />
        <Route path="/therapist/portal" element={<AppShell><TherapistsJoin /></AppShell>} />
        <Route path="/about" element={<AppShell><About /></AppShell>} />
        <Route path="/therapists-join" element={<AppShell><TherapistsJoin /></AppShell>} />
        <Route path="/patient-guide" element={<AppShell><PatientGuide /></AppShell>} />
        <Route path="/privacy" element={<AppShell><Privacy /></AppShell>} />
        <Route path="/support" element={<AppShell><Support /></AppShell>} />
      </Routes>
    </ScrollToHash>
  );
}

export default App;
