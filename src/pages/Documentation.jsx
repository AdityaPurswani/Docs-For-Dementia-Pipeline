// src/pages/Documentation.jsx
import React from 'react';
import Sidebar from '../components/layout/Sidebar';

const Documentation = () => {
  return (
    <div className="flex-1 p-8">
      {/* Introduction Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Medical Analysis Tools Documentation
        </h1>
        <p className="text-gray-600 mb-6">
          This documentation explains the functionality and usage of our medical image analysis and risk assessment tools 
          designed specifically for analyzing Alzheimer's Disease through MRI scans and medical reports.
        </p>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Purpose and Scope</h3>
          <p className="text-blue-800">
            Our tools are designed to assist medical professionals in:
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Early detection of Alzheimer's Disease markers in MRI scans</li>
              <li>Quantitative assessment of brain structural changes</li>
              <li>Risk assessment based on medical reports and imaging data</li>
              <li>Longitudinal tracking of disease progression</li>
            </ul>
          </p>
        </div>
      </section>

      {/* System Overview Section with Detailed Theory */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">System Overview</h2>
        <p className="text-gray-600 mb-6">
          Our system integrates two powerful components that work together to provide comprehensive 
          Alzheimer's Disease analysis:
        </p>

        {/* MRI Analysis Pipeline Theory */}
        <div className="border border-gray-200 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">1. MRI Analysis Pipeline</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Theoretical Foundation</h4>
              <p className="text-gray-600">
                The MRI analysis pipeline is based on established neuroimaging principles and 
                incorporates state-of-the-art processing techniques. It follows a systematic 
                approach to extract meaningful information from structural MRI scans.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Processing Steps</h4>
              <ul className="space-y-4">
                <li>
                  <strong className="text-indigo-600">Image Loading and Visualization</strong>
                  <p className="text-gray-600 mt-1">
                    Utilizes NiBabel library for NIFTI format handling, enabling multi-planar 
                    visualization of brain structures in three orthogonal planes.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Brain Extraction</strong>
                  <p className="text-gray-600 mt-1">
                    Implements FSL's BET (Brain Extraction Tool) algorithm, using surface model 
                    fitting to separate brain tissue from non-brain regions.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Intensity Normalization</strong>
                  <p className="text-gray-600 mt-1">
                    Applies statistical normalization techniques to standardize image intensities, 
                    crucial for cross-subject comparisons.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">MNI Registration</strong>
                  <p className="text-gray-600 mt-1">
                    Uses ANTs (Advanced Normalization Tools) for deformable registration to 
                    standard MNI space, enabling anatomical standardization.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Segmentation</strong>
                  <p className="text-gray-600 mt-1">
                    Performs tissue segmentation using probabilistic atlases and intensity-based 
                    classification methods.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medical Risk Assessment Theory */}
        <div className="border border-gray-200 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">2. Medical Risk Assessment</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Theoretical Foundation</h4>
              <p className="text-gray-600">
                The risk assessment system combines natural language processing with deep learning 
                techniques to analyze medical reports and predict Alzheimer's Disease risk factors.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Core Technologies</h4>
              <ul className="space-y-4">
                <li>
                  <strong className="text-indigo-600">Natural Language Processing</strong>
                  <p className="text-gray-600 mt-1">
                    Employs transformer-based models (PubMedBERT) specifically fine-tuned on 
                    medical text for understanding clinical narratives.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Contextual Embeddings</strong>
                  <p className="text-gray-600 mt-1">
                    Uses advanced embedding techniques to capture medical context and 
                    relationships between clinical findings.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Risk Scoring Models</strong>
                  <p className="text-gray-600 mt-1">
                    Implements custom transformer architectures with attention mechanisms 
                    for risk factor identification and severity assessment.
                  </p>
                </li>
                <li>
                  <strong className="text-indigo-600">Batch Processing</strong>
                  <p className="text-gray-600 mt-1">
                    Utilizes parallel processing and GPU acceleration for efficient 
                    analysis of large datasets.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features with Detailed Theory */}
<section className="mb-16">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
  <p className="text-gray-600 mb-8">
    Our system provides comprehensive analysis capabilities through specialized features 
    designed for both MRI processing and risk assessment.
  </p>

  <div className="grid grid-cols-2 gap-8">
    {/* MRI Processing Features */}
    <div className="border border-gray-200 rounded-lg p-8">
      <h3 className="text-xl font-semibold mb-4">MRI Processing Features</h3>
      
      {/* Multi-view Visualization */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Multi-view Visualization
        </h4>
        <p className="text-gray-600 mb-3">
          Provides comprehensive viewing of brain structures through three standard planes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            <span className="font-medium">Axial View:</span> Top-down view showing horizontal 
            slices, ideal for examining ventricle size and cortical atrophy
          </li>
          <li>
            <span className="font-medium">Sagittal View:</span> Side view revealing anterior-posterior 
            relationships, crucial for examining hippocampal structures
          </li>
          <li>
            <span className="font-medium">Coronal View:</span> Front-to-back view essential for 
            analyzing symmetry and temporal lobe structures
          </li>
        </ul>
      </div>

      {/* Automated Skull Stripping */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Automated Skull Stripping
        </h4>
        <p className="text-gray-600 mb-3">
          Employs advanced algorithms for isolating brain tissue:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Surface modeling for boundary detection</li>
          <li>Intensity thresholding with morphological operations</li>
          <li>Atlas-guided refinement for accuracy</li>
          <li>Quality control metrics for validation</li>
        </ul>
      </div>

      {/* Bias Field Correction */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Bias Field Correction
        </h4>
        <p className="text-gray-600 mb-3">
          Corrects intensity inhomogeneities using:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>N3 bias field correction algorithm</li>
          <li>Iterative optimization for field estimation</li>
          <li>B-spline modeling of intensity variations</li>
          <li>Adaptive histogram equalization</li>
        </ul>
      </div>

      {/* Standardized Space Registration */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Standardized Space Registration
        </h4>
        <p className="text-gray-600 mb-3">
          Implements advanced registration techniques:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Affine transformation for initial alignment</li>
          <li>Deformable registration using SyN algorithm</li>
          <li>Multi-resolution optimization</li>
          <li>Mutual information-based similarity metrics</li>
        </ul>
      </div>
    </div>

    {/* Risk Analysis Features */}
    <div className="border border-gray-200 rounded-lg p-8">
      <h3 className="text-xl font-semibold mb-4">Risk Analysis Features</h3>
      
      {/* Deep Learning Text Analysis */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Deep Learning Text Analysis
        </h4>
        <p className="text-gray-600 mb-3">
          Utilizes state-of-the-art NLP techniques:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            <span className="font-medium">Transformer Architecture:</span> Based on PubMedBERT 
            for medical domain understanding
          </li>
          <li>
            <span className="font-medium">Attention Mechanisms:</span> Multi-head attention for 
            capturing complex relationships
          </li>
          <li>
            <span className="font-medium">Domain Adaptation:</span> Fine-tuned on Alzheimer's-specific 
            medical reports
          </li>
        </ul>
      </div>

      {/* Severity Analysis */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Automated Severity Scoring
        </h4>
        <p className="text-gray-600 mb-3">
          Implements comprehensive severity assessment:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Multi-factor risk evaluation</li>
          <li>Temporal progression analysis</li>
          <li>Symptom severity quantification</li>
          <li>Comparative population analysis</li>
        </ul>
      </div>

      {/* Context-aware Classification */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Context-aware Classification
        </h4>
        <p className="text-gray-600 mb-3">
          Advanced contextual understanding:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Medical term disambiguation</li>
          <li>Relationship extraction between findings</li>
          <li>Temporal context understanding</li>
          <li>Negation and uncertainty handling</li>
        </ul>
      </div>

      {/* Processing Capabilities */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-indigo-600 mb-2">
          Processing Capabilities
        </h4>
        <p className="text-gray-600 mb-3">
          Optimized for performance:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Parallel processing of multiple reports</li>
          <li>GPU acceleration for deep learning models</li>
          <li>Mixed-precision training optimization</li>
          <li>Efficient memory management</li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Continue with other sections... */}
    </div>
  );
};

export default Documentation;