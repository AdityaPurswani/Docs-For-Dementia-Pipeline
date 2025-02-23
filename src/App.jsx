import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Documentation from './pages/Documentation';
import Installation from './pages/Installation'
import QuickStart from './pages/QuickStart';
import Requirements from './pages/Requirements';
import LoadingImages from './pages/mri/LoadingImages';
import Preprocessing from './pages/mri/Preprocessing';
import Segmentation from './pages/mri/Segmentation';
import Visualization from './pages/mri/Visualisation';
import TextProcessing from './pages/risk/TextProcessing';
import SeverityAnalysis from './pages/risk/SeverityAnalysis';
import ContactForm from './components/ContactForm';
import ModelArchitecture from './pages/risk/ModelArchitechture';
import TrainingProcess from './pages/risk/TrainingProcess';
import InferenceExplainability from './pages/risk/InferenceExplainability';
import FeatureExtraction from './pages/mri/FeatureExtraction';
import BatchProcessing from './pages/advanced/BatchProcessing';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Documentation route */}
          <Route path="/docs" element={<Documentation />} />

          {/* Getting Started routes */}
          <Route path="/installation" element={<Installation />} />
          <Route path="/quick-start" element={<QuickStart />} />
          {/* <Route path="/requirements" element={<Requirements />} /> */}

          {/* MRI Analysis routes */}
          <Route path="/mri/loading" element={<LoadingImages />} />
          <Route path="/mri/preprocessing" element={<Preprocessing />} />
          <Route path="/mri/segmentation" element={<Segmentation />} />
          <Route path="/mri/visualization" element={<Visualization />} />
          <Route path="/mri/feature" element={<FeatureExtraction />} />

          {/* Risk Analysis routes */}
          <Route path="/risk/text-processing" element={<TextProcessing />} />
          <Route path="/risk/severity" element={<SeverityAnalysis />} />
          <Route path="/risk/architecture" element={<ModelArchitecture />} />
          <Route path="/risk/training" element={<TrainingProcess />} />
          <Route path="/risk/inference" element={<InferenceExplainability />} />

          <Route path="/advanced/batch" element={<BatchProcessing />} />

          <Route path="/contact" element={<ContactForm />}/>

          {/* Redirect root to docs */}
          <Route path="/" element={<Documentation />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;