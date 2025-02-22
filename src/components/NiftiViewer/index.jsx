// src/components/NiftiViewer/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { processNiftiData, renderSlice } from './niftiUtils.js';

const NiftiViewer = () => {
  const [currentSlice, setCurrentSlice] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliceData, setSliceData] = useState(null);
  const [totalSlices, setTotalSlices] = useState(0);
  const [viewPlane, setViewPlane] = useState('axial');
  const [playbackSpeed, setPlaybackSpeed] = useState(200);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      setLoading(true);
      setError(null);
      
      try {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          console.log('File loaded into memory');
          try {
            const result = await processNiftiData(e.target.result);
            console.log('NIFTI data processed successfully:', result);
            setSliceData(result.data);
            setTotalSlices(result.totalSlices);
            setCurrentSlice(0);
          } catch (error) {
            console.error('Error processing NIFTI:', error);
            setError(error.message);
          }
          setLoading(false);
        };
  
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          setError('Failed to read file');
          setLoading(false);
        };
  
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('File handling error:', error);
        setError('Error handling file');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying && sliceData) {
      interval = setInterval(() => {
        setCurrentSlice(prev => 
          prev === totalSlices - 1 ? 0 : prev + 1
        );
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSlices, playbackSpeed]);

  useEffect(() => {
    if (sliceData && canvasRef.current) {
      renderSlice(canvasRef.current, sliceData, currentSlice, viewPlane);
    }
  }, [currentSlice, viewPlane, sliceData]);

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
          ) : !sliceData ? (
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
              disabled={loading || !sliceData}
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={loading || !sliceData}
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
              disabled={loading || !sliceData}
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
            disabled={loading || !sliceData}
          />

          <span className="text-sm text-gray-500 min-w-[60px]">
            {sliceData ? `${currentSlice + 1} / ${totalSlices}` : '0 / 0'}
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
            disabled={loading || !sliceData}
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