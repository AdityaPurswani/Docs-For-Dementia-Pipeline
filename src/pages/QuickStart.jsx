// src/pages/getting-started/QuickStart.jsx
import React from 'react';
import CodeBlock from '../components/CodeBlock';  // Move CodeBlock to a separate component

const QuickStart = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Quick Start Guide</h1>
  
        {/* Basic Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Concepts</h2>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Core Components</h3>
            <p className="text-blue-800 mb-4">
              The system operates through two main pipelines:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-800">
              <li><strong>MRI Analysis Pipeline:</strong> Processes structural brain images</li>
              <li><strong>Risk Assessment System:</strong> Analyzes medical reports</li>
            </ul>
          </div>
        </section>
  
        {/* Quick Start Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          
          {/* MRI Processing Example */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">MRI Processing</h3>
            <CodeBlock language="python">
  {`from mri_analysis import MRIScansPipeline
  
  # Initialize pipeline
  pipeline = MRIScansPipeline(
      input_dir='input/',
      output_dir='output/'
  )
  
  # Process a single MRI scan
  mri_data, mri_scan = pipeline.display_mri_image('patient001.nii.gz')
  
  # Extract brain region
  brain_extracted = pipeline.extract_brain_part(
      'patient001.nii.gz',
      'brain_extracted.nii.gz'
  )
  
  # Perform normalization
  normalized_data = pipeline.intensity_normalisation(mri_data)`}
            </CodeBlock>
          </div>
  
          {/* Risk Analysis Example */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Risk Analysis</h3>
            <CodeBlock language="python">
  {`from risk_analysis import DementiaRiskAnalyzer
  
  # Initialize analyzer
  analyzer = DementiaRiskAnalyzer()
  
  # Analyze a single report
  result = analyzer.analyze_report(medical_report_text)
  print(f"Risk Score: {result['risk_score']}")
  print(f"Risk Level: {result['risk_level']}")
  
  # Batch processing
  results = analyzer.analyze_batch(medical_reports, batch_size=8)`}
            </CodeBlock>
          </div>
        </section>
  
        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Data Preparation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Ensure MRI scans are in NIfTI format (.nii/.nii.gz)</li>
                <li>Verify file permissions and directory structure</li>
                <li>Back up original data before processing</li>
                <li>Check image dimensions and orientation</li>
              </ul>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Processing Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Use GPU acceleration for large datasets</li>
                <li>Monitor memory usage during batch processing</li>
                <li>Implement error handling for robust pipelines</li>
                <li>Validate results at each processing step</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default QuickStart;
  