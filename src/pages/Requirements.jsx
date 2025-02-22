// src/pages/getting-started/Requirements.jsx
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const Requirements = () => {
  return (
    <div className="p-8 ml-80">
      <h1 className="text-3xl font-bold mb-6">System Requirements</h1>
      
      <div className="space-y-8">
        {/* Hardware Requirements */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hardware Requirements</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-3">Minimum Specifications</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• CPU: Multi-core processor (4+ cores recommended)</li>
              <li>• RAM: 8GB minimum, 32GB recommended</li>
              <li>• Storage: 20GB free space for installation and data</li>
              <li>• GPU: NVIDIA GPU with 6GB VRAM (for GPU acceleration)</li>
            </ul>
          </div>
        </section>

        {/* Software Requirements */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Software Requirements</h2>
          <CodeBlock language="bash">
{`# Operating System
- Linux (Ubuntu 20.04 or later recommended)
- Windows 10/11 with WSL2
- macOS 11 or later

# Required Software
- Python 3.8 or later
- CUDA Toolkit 11.0+ (for GPU support)
- Git version control
- FSL Software Library
- ANTs (Advanced Normalization Tools)`}</CodeBlock>
        </section>

        {/* Python Dependencies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Python Dependencies</h2>
          <CodeBlock language="python">
{`# Core Dependencies
nibabel>=5.0.0    # Medical image I/O
numpy>=1.20.0     # Numerical computations
pandas>=1.4.0     # Data manipulation
matplotlib>=3.4.0 # Visualization
antspyx>=0.3.0    # Image registration
torch>=1.9.0      # Deep learning framework
transformers>=4.0 # NLP models
scikit-learn>=1.0 # Machine learning utilities

# Optional Dependencies
scipy>=1.7.0      # Scientific computing
pillow>=8.0.0     # Image processing
pydicom>=2.2.0    # DICOM file handling
`}</CodeBlock>
        </section>

        {/* GPU Support */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">GPU Support</h2>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Supported NVIDIA GPUs</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• NVIDIA RTX 2000 series or newer</li>
              <li>• NVIDIA GTX 1660 or better</li>
              <li>• Any NVIDIA GPU with Compute Capability 7.0+</li>
            </ul>
            <div className="mt-4 text-sm text-blue-700">
              Note: While the software can run on CPU only, GPU is highly recommended for optimal performance.
            </div>
          </div>
        </section>

        {/* Installation Verification */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Verify Installation</h2>
          <CodeBlock language="python">
{`# Run this code to verify your installation
import torch
import nibabel
import ants
import numpy as np

# Check CUDA availability
print(f"CUDA Available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU Device: {torch.cuda.get_device_name(0)}")
    print(f"CUDA Version: {torch.version.cuda}")

# Check other dependencies
print(f"NumPy Version: {np.__version__}")
print(f"NiBabel Version: {nibabel.__version__}")
print(f"ANTs Version: {ants.__version__}")
`}</CodeBlock>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Issues</h2>
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-yellow-900 mb-3">Troubleshooting Tips</h3>
            <ul className="space-y-3 text-yellow-800">
              <li>• <strong>CUDA errors:</strong> Ensure NVIDIA drivers are up to date</li>
              <li>• <strong>Memory issues:</strong> Try reducing batch sizes or using CPU mode</li>
              <li>• <strong>Library conflicts:</strong> Use virtual environments to manage dependencies</li>
              <li>• <strong>Installation failures:</strong> Check system architecture compatibility</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Requirements;