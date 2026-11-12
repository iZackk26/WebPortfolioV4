import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { LanguageTransition } from './components/LanguageTransition';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
// About va en la carga principal (~3 KB): como chunk aparte sumaba un viaje de red más en móvil
import { About } from './pages/About';
import { SectionSkeleton } from './components/ui/SectionSkeleton';
import { ChunkErrorBoundary } from './components/ui/ChunkErrorBoundary';
import { retryImport } from './utils/retryImport';
import { useEffect, lazy, Suspense, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load pages that aren't immediately needed
// Projects y Certificates se están rediseñando para la V5: mientras tanto muestran la página en construcción
const UnderConstruction = lazy(() => retryImport(() => import('./pages/UnderConstruction')).then(m => ({ default: m.UnderConstruction })));
const AppraisalDetail = lazy(() => retryImport(() => import('./pages/projects/AppraisalDetail')).then(m => ({ default: m.AppraisalDetail })));
const FaceAntiSpoofingDetail = lazy(() => retryImport(() => import('./pages/projects/FaceAntiSpoofingDetail')).then(m => ({ default: m.FaceAntiSpoofingDetail })));
const StateDetectionDetail = lazy(() => retryImport(() => import('./pages/projects/StateDetectionDetail')).then(m => ({ default: m.StateDetectionDetail })));
const VectorDBDetail = lazy(() => retryImport(() => import('./pages/projects/VectorDBDetail')).then(m => ({ default: m.VectorDBDetail })));
const IFixItDetail = lazy(() => retryImport(() => import('./pages/projects/IFixItDetail')).then(m => ({ default: m.IFixItDetail })));
const PuraCompraDetail = lazy(() => retryImport(() => import('./pages/projects/PuraCompraDetail')).then(m => ({ default: m.PuraCompraDetail })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/** Al cambiar de ruta se limpia el error de un chunk que no cargó */
function RouteBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <ChunkErrorBoundary key={pathname} fallback={<SectionSkeleton size="page" />}>
      {children}
    </ChunkErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <LanguageTransition>
          <RouteBoundary>
            <Suspense fallback={<SectionSkeleton size="page" windows={2} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
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
          </RouteBoundary>
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
