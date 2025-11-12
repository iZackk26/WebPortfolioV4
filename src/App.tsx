import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LanguageTransition } from './components/LanguageTransition';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Certificates } from './pages/Certificates';
import { AppraisalDetail } from './pages/projects/AppraisalDetail';
import { FaceAntiSpoofingDetail } from './pages/projects/FaceAntiSpoofingDetail';
import { StateDetectionDetail } from './pages/projects/StateDetectionDetail';
import { VectorDBDetail } from './pages/projects/VectorDBDetail';
import { IFixItDetail } from './pages/projects/IFixItDetail';
import { PuraCompraDetail } from './pages/projects/PuraCompraDetail';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <LanguageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/appraisal" element={<AppraisalDetail />} />
            <Route path="/projects/faceAntiSpoofing" element={<FaceAntiSpoofingDetail />} />
            <Route path="/projects/stateDetection" element={<StateDetectionDetail />} />
            <Route path="/projects/vectorDB" element={<VectorDBDetail />} />
            <Route path="/projects/iFixIt" element={<IFixItDetail />} />
            <Route path="/projects/puraCompra" element={<PuraCompraDetail />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </LanguageTransition>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
