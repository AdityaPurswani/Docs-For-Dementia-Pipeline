// src/components/NiftiViewer/niftiUtils.js
import * as nifti from 'nifti-reader-js';

export const processNiftiData = async (fileData) => {
  try {
    // Convert to ArrayBuffer if needed
    const buffer = fileData instanceof ArrayBuffer ? fileData : await fileData.arrayBuffer();

    // First, try to read as a NIFTI file
    if (!nifti.isNIFTI(buffer)) {
      throw new Error('Not a valid NIFTI file');
    }

    // Read the header and image data
    const header = nifti.readHeader(buffer);
    console.log('NIFTI Header:', header);

    const image = nifti.readImage(header, buffer);
    console.log('Image loaded, size:', image.byteLength);

    // Get dimensions from header
    const dims = header.dims;
    console.log('Image dimensions:', dims);

    // Convert image data to Float32Array
    const data = new Float32Array(image);

    // Calculate total slices based on dimensions
    const totalSlices = Math.max(dims[2], dims[3] || 0);
    console.log('Total slices:', totalSlices);

    return {
      data: {
        header,
        data,
        dimensions: dims
      },
      totalSlices
    };
  } catch (error) {
    console.error('Error in processNiftiData:', error);
    throw new Error(`Failed to process NIFTI file: ${error.message}`);
  }
};

export const renderSlice = (canvas, sliceData, sliceIndex, plane) => {
  try {
    const ctx = canvas.getContext('2d');
    const dims = sliceData.dimensions;
    
    // Get slice data based on viewing plane
    let sliceArray;
    let width, height;

    switch(plane) {
      case 'axial':
        width = dims[1];
        height = dims[2];
        sliceArray = getAxialSlice(sliceData.data, dims, sliceIndex);
        break;
      case 'sagittal':
        width = dims[2];
        height = dims[3] || dims[2];
        sliceArray = getSagittalSlice(sliceData.data, dims, sliceIndex);
        break;
      case 'coronal':
        width = dims[1];
        height = dims[3] || dims[2];
        sliceArray = getCoronalSlice(sliceData.data, dims, sliceIndex);
        break;
    }

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Create and fill image data
    const imageData = ctx.createImageData(width, height);
    const normalized = normalizeData(sliceArray);

    const rotatedData = normalized.reverse();

    for (let i = 0; i < rotatedData.length; i++) {
      const value = Math.floor(rotatedData[i] * 255);
      const idx = i * 4;
      imageData.data[idx] = value;     // R
      imageData.data[idx + 1] = value; // G
      imageData.data[idx + 2] = value; // B
      imageData.data[idx + 3] = 255;   // A
    }

    ctx.putImageData(imageData, 0, 0);
  } catch (error) {
    console.error('Error in renderSlice:', error);
    throw error;
  }
};

const getAxialSlice = (data, dims, index) => {
  try {
    const sliceSize = dims[1] * dims[2];
    const startIndex = index * sliceSize;
    return data.slice(startIndex, startIndex + sliceSize);
  } catch (error) {
    console.error('Error in getAxialSlice:', error);
    throw error;
  }
};

const getSagittalSlice = (data, dims, index) => {
  try {
    const result = new Float32Array(dims[2] * (dims[3] || dims[2]));
    for (let i = 0; i < dims[2]; i++) {
      for (let j = 0; j < (dims[3] || dims[2]); j++) {
        result[i + j * dims[2]] = data[index + i * dims[1] + j * dims[1] * dims[2]];
      }
    }
    return result;
  } catch (error) {
    console.error('Error in getSagittalSlice:', error);
    throw error;
  }
};

const getCoronalSlice = (data, dims, index) => {
  try {
    const result = new Float32Array(dims[1] * (dims[3] || dims[2]));
    for (let i = 0; i < dims[1]; i++) {
      for (let j = 0; j < (dims[3] || dims[2]); j++) {
        result[i + j * dims[1]] = data[i + index * dims[1] + j * dims[1] * dims[2]];
      }
    }
    return result;
  } catch (error) {
    console.error('Error in getCoronalSlice:', error);
    throw error;
  }
};

const normalizeData = (data) => {
  try {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    return data.map(v => range === 0 ? 0.5 : (v - min) / range);
  } catch (error) {
    console.error('Error in normalizeData:', error);
    throw error;
  }
};