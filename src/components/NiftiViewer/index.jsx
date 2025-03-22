// src/components/NiftiViewer/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const NiftiViewer = () => {
  const [currentSlice, setCurrentSlice] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalSlices, setTotalSlices] = useState(0);
  const [viewPlane, setViewPlane] = useState('axial');
  const [playbackSpeed, setPlaybackSpeed] = useState(200);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const canvasRef = useRef(null);

  // More robust NIFTI header parser
  const parseNiftiHeader = (buffer) => {
    const view = new DataView(buffer);
    let isNifti = false;
    let headerSize = 348; // Default size
    
    // NIFTI-1 magic code can be at byte 344 or 0 (for Analyze 7.5 format)
    let magicString = '';
    
    // Try standard offset
    try {
      magicString = String.fromCharCode(
        view.getUint8(344), 
        view.getUint8(345), 
        view.getUint8(346), 
        view.getUint8(347)
      );
      
      if (magicString === 'n+1' || magicString === 'ni1') {
        isNifti = true;
        // Get header size
        const vox_offset = view.getFloat32(108, true);
        headerSize = vox_offset > 0 ? vox_offset : 352;
      }
    } catch (e) {
      console.log('Error reading at offset 344, trying alternative offsets');
    }
    
    // Try beginning of file (Analyze 7.5 format)
    if (!isNifti) {
      try {
        // Look at the size fields to validate
        const sizeof_hdr = view.getInt32(0, true);
        
        if (sizeof_hdr === 348) {
          isNifti = true;
          headerSize = 348;
          console.log('Found Analyze 7.5 format');
        }
      } catch (e) {
        console.log('Error reading header size');
      }
    }
    
    // If no valid magic code, try to check other signatures
    if (!isNifti) {
      try {
        // Check dim fields which should be reasonable
        const dim0 = view.getInt16(40, true);
        
        // Dimensions should be between 1 and 7
        if (dim0 >= 1 && dim0 <= 7) {
          // Check that dimensions are reasonable (not huge)
          const dim1 = view.getInt16(42, true);
          const dim2 = view.getInt16(44, true);
          const dim3 = view.getInt16(46, true);
          
          if (dim1 > 0 && dim1 < 1000 && 
              dim2 > 0 && dim2 < 1000 && 
              dim3 > 0 && dim3 < 1000) {
            console.log('File appears to be NIFTI based on dimension checks');
            isNifti = true;
            headerSize = 352; // Standard size for NIFTI-1
          }
        }
      } catch (e) {
        console.log('Error checking dimensions');
      }
    }
    
    if (!isNifti) {
      throw new Error('Not a valid NIFTI file or unsupported format');
    }
    
    // Get dimensions - be more robust and handle byte order issues
    let dims = [0, 0, 0, 0];
    try {
      dims = [
        view.getInt16(40, true), // Number of dimensions
        view.getInt16(42, true), // X dimension
        view.getInt16(44, true), // Y dimension
        view.getInt16(46, true)  // Z dimension (slices)
      ];
      
      // If dimensions look unreasonable, try opposite endianness
      if (dims[0] < 0 || dims[0] > 7 || dims[1] <= 0 || dims[2] <= 0 || dims[3] <= 0) {
        dims = [
          view.getInt16(40, false), // Number of dimensions
          view.getInt16(42, false), // X dimension
          view.getInt16(44, false), // Y dimension
          view.getInt16(46, false)  // Z dimension (slices)
        ];
      }
      
      // If still unreasonable, use defaults
      if (dims[0] < 0 || dims[0] > 7 || dims[1] <= 0 || dims[2] <= 0 || dims[3] <= 0) {
        console.log('Dimensions look suspicious, using defaults');
        dims = [3, 64, 64, 64]; // Default 3D volume of 64³
      }
    } catch (e) {
      console.error('Error reading dimensions, using defaults', e);
      dims = [3, 64, 64, 64]; // Default 3D volume
    }
    
    // Get voxel data type - default to unsigned char (2) if reading fails
    let datatype = 2; // Default to UCHAR
    try {
      datatype = view.getInt16(70, true);
    } catch (e) {
      console.log('Error reading datatype, defaulting to UCHAR');
    }
    
    console.log('Header info:', { dims, headerSize, datatype, magicString });
    
    return {
      dims,
      headerSize,
      datatype
    };
  };

  // Function to extract and normalize a slice from the data
  const extractSlice = (buffer, header, sliceIndex, orientation = 'axial') => {
    // Skip header
    const dataOffset = header.headerSize;
    
    // Get dimensions
    const nx = header.dims[1];
    const ny = header.dims[2];
    const nz = header.dims[3];
    
    // Bounds check the slice index
    sliceIndex = Math.max(0, Math.min(sliceIndex, nz - 1));
    
    // Determine slice dimensions based on orientation
    let width, height, getVoxelIndex;
    
    switch (orientation) {
      case 'sagittal':
        // X slice (YZ plane)
        width = ny;
        height = nz;
        getVoxelIndex = (x, y) => sliceIndex + (ny - 1 - x) * nx + (nz - 1 - y) * nx * ny; // Rotated 180°
        break;
      case 'coronal':
        // Y slice (XZ plane)
        width = nx;
        height = nz;
        getVoxelIndex = (x, y) => (nx - 1 - x) + sliceIndex * nx + (nz - 1 - y) * nx * ny; // Rotated 180°
        break;
      case 'axial':
      default:
        // Z slice (XY plane)
        width = nx;
        height = ny;
        getVoxelIndex = (x, y) => x + y * nx + sliceIndex * nx * ny;
        break;
    }
    
    // Create image data for the slice
    const sliceData = new Uint8Array(width * height * 4); // RGBA
    
    // Determine data type and create appropriate array view
    let rawData;
    let getValue;
    
    try {
      switch (header.datatype) {
        case 2: // UCHAR
          rawData = new Uint8Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 4: // SHORT
          rawData = new Int16Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 8: // INT
          rawData = new Int32Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 16: // FLOAT
          rawData = new Float32Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 64: // DOUBLE
          rawData = new Float64Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 256: // INT8
          rawData = new Int8Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 512: // UINT16
          rawData = new Uint16Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        case 768: // UINT32
          rawData = new Uint32Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
          break;
        default:
          // Default to unsigned byte if type is unknown
          console.log('Unknown datatype, defaulting to UCHAR');
          rawData = new Uint8Array(buffer, dataOffset);
          getValue = (idx) => rawData[idx];
      }
    } catch (e) {
      console.error('Error creating typed array, falling back to Uint8Array', e);
      rawData = new Uint8Array(buffer, dataOffset);
      getValue = (idx) => rawData[idx];
    }
    
    // Find min and max for intensity scaling
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let valuesRead = 0;
    
    // First pass to find range - sample every 10th pixel for performance
    for (let y = 0; y < height; y += 10) {
      for (let x = 0; x < width; x += 10) {
        try {
          const idx = getVoxelIndex(x, y);
          if (idx < rawData.length && idx >= 0) {
            const val = getValue(idx);
            if (!isNaN(val)) {
              if (val < min) min = val;
              if (val > max) max = val;
              valuesRead++;
            }
          }
        } catch (e) {
          // Skip invalid indices
        }
      }
    }
    
    // If we didn't get enough samples, try more pixels
    if (valuesRead < 10) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          try {
            const idx = getVoxelIndex(x, y);
            if (idx < rawData.length && idx >= 0) {
              const val = getValue(idx);
              if (!isNaN(val)) {
                if (val < min) min = val;
                if (val > max) max = val;
                valuesRead++;
              }
            }
          } catch (e) {
            // Skip invalid indices
          }
        }
      }
    }
    
    // If we still have no valid range, use defaults
    if (min === Number.MAX_VALUE || max === Number.MIN_VALUE || min === max) {
      min = 0;
      max = 255;
    }
    
    console.log('Value range:', min, max, 'from', valuesRead, 'samples');
    
    // Normalize and fill the slice data
    const range = max - min || 1;
    
    // Fill the slice with pixel data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        try {
          const idx = getVoxelIndex(x, y);
          const pixelIndex = (y * width + x) * 4;
          
          if (idx < rawData.length && idx >= 0) {
            // Normalize to 0-255
            let val = getValue(idx);
            if (isNaN(val)) val = min;
            
            const normalizedVal = Math.floor(((val - min) / range) * 255);
            const clampedVal = Math.max(0, Math.min(255, normalizedVal));
            
            sliceData[pixelIndex] = clampedVal;     // R
            sliceData[pixelIndex + 1] = clampedVal; // G
            sliceData[pixelIndex + 2] = clampedVal; // B
            sliceData[pixelIndex + 3] = 255;        // A
          } else {
            // Out of bounds, make transparent
            sliceData[pixelIndex] = 0;
            sliceData[pixelIndex + 1] = 0;
            sliceData[pixelIndex + 2] = 0;
            sliceData[pixelIndex + 3] = 0;
          }
        } catch (e) {
          // If there's an error for this pixel, skip it
          const pixelIndex = (y * width + x) * 4;
          sliceData[pixelIndex] = 0;
          sliceData[pixelIndex + 1] = 0;
          sliceData[pixelIndex + 2] = 0;
          sliceData[pixelIndex + 3] = 0;
        }
      }
    }
    
    return {
      data: sliceData,
      width,
      height
    };
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log('File selected:', file.name, file.type, file.size);
    setLoading(true);
    setError(null);
    
    try {
      // Check for .gz files
      if (file.name.endsWith('.gz')) {
        setError('Compressed NIFTI files (.nii.gz) are not supported in this basic viewer. Please use an uncompressed .nii file.');
        setLoading(false);
        return;
      }
      
      // Read file as ArrayBuffer
      const buffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error(`Failed to read file: ${e.message || 'Unknown error'}`));
        reader.readAsArrayBuffer(file);
      });
      
      console.log('File loaded as ArrayBuffer, size:', buffer.byteLength);
      
      // Check if the file is too small to be a valid NIFTI
      if (buffer.byteLength < 348) {
        throw new Error('File is too small to be a valid NIFTI file');
      }
      
      try {
        // Parse NIFTI header
        const header = parseNiftiHeader(buffer);
        console.log('NIFTI header detected:', header);
        
        // Validate dimensions
        if (header.dims[1] <= 0 || header.dims[2] <= 0 || header.dims[3] <= 0) {
          throw new Error('Invalid dimensions in NIFTI header');
        }
        
        // Validate that the file contains enough data for header + at least one voxel
        const expectedMinSize = header.headerSize + (header.dims[1] * header.dims[2] * header.dims[3]);
        if (buffer.byteLength < expectedMinSize) {
          console.warn(`File may be truncated. Expected at least ${expectedMinSize} bytes, but got ${buffer.byteLength}`);
        }
        
        // Set total slices based on current orientation
        let totalSlices;
        switch (viewPlane) {
          case 'sagittal':
            totalSlices = header.dims[1]; // X dimension
            break;
          case 'coronal':
            totalSlices = header.dims[2]; // Y dimension
            break;
          case 'axial':
          default:
            totalSlices = header.dims[3]; // Z dimension
            break;
        }
        
        setTotalSlices(totalSlices);
        setCurrentSlice(Math.floor(totalSlices / 2)); // Start in the middle
        
        // Store the data for rendering
        setImageData({
          buffer,
          header
        });
        
        console.log('NIFTI data processed successfully');
      } catch (headerError) {
        console.error('Error parsing NIFTI header:', headerError);
        
        // If header parsing fails, try a more lenient approach
        console.log('Attempting data recovery with default parameters...');
        
        // Create a default header
        const defaultHeader = {
          dims: [3, 64, 64, Math.floor(buffer.byteLength / (64 * 64))], // Guess dimensions
          headerSize: 352, // Standard NIFTI-1 header size
          datatype: 2 // UCHAR
        };
        
        console.log('Using default header:', defaultHeader);
        
        // Set total slices based on guessed dimensions
        let totalSlices;
        switch (viewPlane) {
          case 'sagittal':
            totalSlices = defaultHeader.dims[1];
            break;
          case 'coronal':
            totalSlices = defaultHeader.dims[2];
            break;
          case 'axial':
          default:
            totalSlices = defaultHeader.dims[3];
            break;
        }
        
        setTotalSlices(totalSlices);
        setCurrentSlice(Math.floor(totalSlices / 2));
        
        // Store the data with default header
        setImageData({
          buffer,
          header: defaultHeader
        });
        
        setError('Warning: File format not fully recognized. Using best-guess parameters.');
      }
    } catch (error) {
      console.error('Error processing NIFTI:', error);
      setError(`Failed to process NIFTI file: ${error.message || 'Unknown error'}`);
      setImageData(null);
    } finally {
      setLoading(false);
    }
  };

  // Update orientation
  useEffect(() => {
    if (imageData) {
      // Update total slices when orientation changes
      let totalSlices;
      switch (viewPlane) {
        case 'sagittal':
          totalSlices = imageData.header.dims[1]; // X dimension
          break;
        case 'coronal':
          totalSlices = imageData.header.dims[2]; // Y dimension
          break;
        case 'axial':
        default:
          totalSlices = imageData.header.dims[3]; // Z dimension
          break;
      }
      
      setTotalSlices(totalSlices);
      setCurrentSlice(Math.min(currentSlice, totalSlices - 1));
    }
  }, [viewPlane, imageData, currentSlice]);

  // Render slice when needed
  useEffect(() => {
    if (imageData && canvasRef.current) {
      try {
        // Extract and render the current slice
        const slice = extractSlice(
          imageData.buffer,
          imageData.header,
          currentSlice,
          viewPlane
        );
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match slice
        canvas.width = slice.width;
        canvas.height = slice.height;
        
        // Create ImageData and render
        const imageData2 = new ImageData(
          new Uint8ClampedArray(slice.data), 
          slice.width, 
          slice.height
        );
        
        ctx.putImageData(imageData2, 0, 0);
      } catch (error) {
        console.error('Error rendering slice:', error);
        setError('Failed to render slice: ' + error.message);
      }
    }
  }, [currentSlice, viewPlane, imageData]);

  // Handle playback
  useEffect(() => {
    let interval;
    if (isPlaying && imageData) {
      interval = setInterval(() => {
        setCurrentSlice(prev => 
          prev === totalSlices - 1 ? 0 : prev + 1
        );
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSlices, playbackSpeed, imageData]);

  return (
    <div className="border rounded-lg shadow-lg bg-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">NIFTI Viewer</h3>
          <input
            type="file"
            accept=".nii"
            onChange={handleFileUpload}
            className="hidden"
            id="nifti-file-input"
          />
          <label
            htmlFor="nifti-file-input"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
          >
            Upload NIFTI File
          </label>
        </div>

        {/* View Plane Selection */}
        <div className="flex gap-2 mb-4">
          {['axial', 'sagittal', 'coronal'].map(plane => (
            <button
              key={plane}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewPlane === plane 
                  ? 'bg-blue-500 text-black' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setViewPlane(plane)}
            >
              {plane}
            </button>
          ))}
        </div>

        {/* Image Display */}
        <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
          {loading ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-2"></div>
                <p>Loading NIFTI file...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : !imageData ? (
            <div className="flex items-center justify-center h-full text-white">
              Upload a NIFTI file to view
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentSlice(prev => Math.max(0, prev - 1))}
              disabled={loading || !imageData}
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={loading || !imageData}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <button
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentSlice(prev => Math.min(totalSlices - 1, prev + 1))}
              disabled={loading || !imageData}
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={Math.max(0, totalSlices - 1)}
            value={currentSlice}
            onChange={(e) => setCurrentSlice(Number(e.target.value))}
            className="flex-1"
            disabled={loading || !imageData}
          />

          <span className="text-sm text-gray-500 min-w-[60px]">
            {imageData ? `${currentSlice + 1} / ${totalSlices}` : '0 / 0'}
          </span>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Speed:</span>
          <input
            type="range"
            min={50}
            max={500}
            step={50}
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="w-32"
            disabled={loading || !imageData}
          />
          <span className="text-sm text-gray-500 min-w-[60px]">
            {playbackSpeed}ms
          </span>
        </div>
      </div>
    </div>
  );
};

export default NiftiViewer;