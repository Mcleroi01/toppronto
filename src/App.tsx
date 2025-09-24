import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import Services from './pages/Services';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Drivers from './pages/Drivers';
import WhatsAppButton from './components/common/WhatsAppButton';
import './i18n';
import Survey from './pages/Survey';

function AppRoutes() {
  const location = useLocation();
  const isSurvey = location.pathname.startsWith('/survey');

  if (isSurvey) {
    // Standalone Survey page without Layout (no Header/Footer)
    return (
      <Routes>
        <Route path="/survey" element={<Survey />} />
      </Routes>
    );
  }

  // All other routes wrapped with Layout
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
      <WhatsAppButton />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;