import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import Services from './pages/Services';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Drivers from './pages/Drivers';
import './i18n';

function App() {
  return (
    <Router>
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
      </Layout>
    </Router>
  );
}

export default App;