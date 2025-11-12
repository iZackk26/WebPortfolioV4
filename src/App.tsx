import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Certificates } from './pages/Certificates';
import {
  AppraisalDetail,
  FaceAntiSpoofingDetail,
  StateDetectionDetail,
  VectorDBDetail,
  IFixItDetail,
  PuraCompraDetail
} from './pages/projects';

function App() {
  return (
    <Router>
      <SEO />
      <div className="min-h-screen">
        <Navbar />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
