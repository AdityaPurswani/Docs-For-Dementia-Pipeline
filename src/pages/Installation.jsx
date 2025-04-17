import React from 'react';
import CodeBlock from '../components/CodeBlock';

const Installation = () => {
  return (
    <div className="p-8">
      {/* Introduction */}
      <h1 className="text-3xl font-bold mb-6">Installation Guide</h1>
      
      {/* System Architecture Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Component Structure</h3>
          <p className="text-blue-800 mb-4">
            Our medical analysis system is built on a modular architecture consisting of:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            <li><strong>Core Processing Engine:</strong> Python-based MRI analysis modules</li>
            <li><strong>Neural Network Models:</strong> Deep learning components for risk assessment</li>
            <li><strong>Interface Layer:</strong> API and visualization tools</li>
            <li><strong>Data Management:</strong> File handling and preprocessing utilities</li>
          </ul>
        </div>
      </section>

      {/* System Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Hardware Requirements</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>CPU:</strong> Multi-core processor (4+ cores recommended)</li>
              <li><strong>RAM:</strong> 16GB minimum, 32GB recommended</li>
              <li><strong>GPU:</strong> NVIDIA GPU with 6GB+ VRAM for GPU acceleration</li>
              <li><strong>Storage:</strong> 20GB free space for installation and data</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Software Requirements</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>OS:</strong> Linux (Ubuntu 20.04+), Windows 10/11, macOS 11+</li>
              <li><strong>Python:</strong> Version 3.8 or higher</li>
              <li><strong>CUDA:</strong> Version 11.0+ for GPU support</li>
              <li><strong>Additional:</strong> FSL, ANTs toolkits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation Process</h2>
        <CodeBlock language="bash">
{`# Clone the repository
git clone https://github.com/your-repo/medical-analysis-tools.git

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\\Scripts\\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Install additional packages
pip install torch torchvision --extra-index-url https://download.pytorch.org/whl/cu116`}
        </CodeBlock>

        <div className="mt-6 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Installation Verification</h3>
          <CodeBlock language="python">
{`import torch
import nibabel
import ants
import numpy as np

# Check CUDA availability
print(f"CUDA Available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU Device: {torch.cuda.get_device_name(0)}")

# Check other dependencies
print(f"NumPy Version: {np.__version__}")
print(f"NiBabel Version: {nibabel.__version__}")
print(f"ANTs Version: {ants.__version__}")`}
          </CodeBlock>
        </div>
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
  );
};

export default Installation;
