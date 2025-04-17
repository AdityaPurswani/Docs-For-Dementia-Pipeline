// src/pages/mri/Visualization.jsx
import React from 'react';
import NiftiViewer from '../../components/NiftiViewer';

const Visualization = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 ml-80">MRI Visualization</h1>
      <div className="max-w-4xl mx-auto">
        <NiftiViewer />
      </div>
      <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Notes:</h3>
          <div className="bg-red-50 rounded-lg p-6">
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">File types supported:</p>
                  <p> Currently the only file type supported is .nii (NIFTI uncompressed filetype)</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium"></p>
                  <p>Don't upload the images only with segmentation data.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Visualization;