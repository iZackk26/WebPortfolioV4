import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { LanguageTransition } from './components/LanguageTransition';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load pages that aren't immediately needed
// About, Projects y Certificates se están rediseñando para la V5: mientras tanto muestran la página en construcción
const UnderConstruction = lazy(() => import('./pages/UnderConstruction').then(m => ({ default: m.UnderConstruction })));
const AppraisalDetail = lazy(() => import('./pages/projects/AppraisalDetail').then(m => ({ default: m.AppraisalDetail })));
const FaceAntiSpoofingDetail = lazy(() => import('./pages/projects/FaceAntiSpoofingDetail').then(m => ({ default: m.FaceAntiSpoofingDetail })));
const StateDetectionDetail = lazy(() => import('./pages/projects/StateDetectionDetail').then(m => ({ default: m.StateDetectionDetail })));
const VectorDBDetail = lazy(() => import('./pages/projects/VectorDBDetail').then(m => ({ default: m.VectorDBDetail })));
const IFixItDetail = lazy(() => import('./pages/projects/IFixItDetail').then(m => ({ default: m.IFixItDetail })));
const PuraCompraDetail = lazy(() => import('./pages/projects/PuraCompraDetail').then(m => ({ default: m.PuraCompraDetail })));

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
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-accent))]"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<UnderConstruction section="about" />} />
              <Route path="/projects" element={<UnderConstruction section="projects" />} />
              <Route path="/projects/appraisal" element={<AppraisalDetail />} />
              <Route path="/projects/faceAntiSpoofing" element={<FaceAntiSpoofingDetail />} />
              <Route path="/projects/stateDetection" element={<StateDetectionDetail />} />
              <Route path="/projects/vectorDB" element={<VectorDBDetail />} />
              <Route path="/projects/iFixIt" element={<IFixItDetail />} />
              <Route path="/projects/puraCompra" element={<PuraCompraDetail />} />
              <Route path="/certificates" element={<UnderConstruction section="certificates" />} />
            </Routes>
          </Suspense>
        </LanguageTransition>
        <Footer />
        <Chatbot />
      </div>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
