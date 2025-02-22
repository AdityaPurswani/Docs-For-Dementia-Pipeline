import React from 'react';
// MRIDisplay.jsx
const MRIDisplay = () => (
    <div className="w-full pl-8 justify-center items-center">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src="/api/placeholder/800/800"
          alt="MRI Scan"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
   
  
  export default MRIDisplay;
  