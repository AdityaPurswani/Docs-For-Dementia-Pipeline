import React from "react";
import CodeBlock from "../../components/CodeBlock";

const LoadingImages = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Loading MRI Images</h1>
  
        <div className="space-y-8">
          {/* Introduction with Theory */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Understanding MRI Image Loading</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Theoretical Background</h3>
              <div className="text-blue-800">
                <p className="mb-4">
                  MRI images are stored in specialized formats that preserve the three-dimensional 
                  nature of brain scans. The NIfTI (Neuroimaging Informatics Technology Initiative) 
                  format is a standard that includes both image data and essential metadata about 
                  the scan's properties.
                </p>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Key Concepts:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Voxels:</strong> 3D pixels that represent discrete points in the brain volume</li>
                    <li><strong>Affine Transform:</strong> Matrix that maps voxel coordinates to real-world space</li>
                    <li><strong>Orientation:</strong> Radiological convention for viewing brain images</li>
                    <li><strong>Metadata:</strong> Additional information about scan parameters and conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  
          {/* Viewing Planes Theory */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding MRI Viewing Planes</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Axial Plane</h3>
                  <p className="text-gray-600">
                    Divides the brain into superior and inferior portions. Ideal for viewing:
                  </p>
                  <ul className="list-disc pl-4 mt-2 text-gray-600">
                    <li>Ventricle size</li>
                    <li>Basal ganglia</li>
                    <li>Cortical atrophy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sagittal Plane</h3>
                  <p className="text-gray-600">
                    Divides the brain into left and right portions. Best for viewing:
                  </p>
                  <ul className="list-disc pl-4 mt-2 text-gray-600">
                    <li>Corpus callosum</li>
                    <li>Brain stem</li>
                    <li>Cerebellum</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coronal Plane</h3>
                  <p className="text-gray-600">
                    Divides the brain into anterior and posterior portions. Optimal for:
                  </p>
                  <ul className="list-disc pl-4 mt-2 text-gray-600">
                    <li>Hippocampus</li>
                    <li>Temporal lobes</li>
                    <li>Lateral ventricles</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  
          {/* Basic Image Loading with Parameter Explanation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic Image Loading</h2>
            <CodeBlock language="python">
            {`def display_mri_image(self, input_image_path):
    """Load and display slices from an MRI scan (NIfTI format)
    
    Args:
        input_image_path (str): Path to the input MRI scan
    Returns:
        tuple: (image_data, mri_scan_object)
        
    Example:
        >>> mri_data, mri_scan = pipeline.display_mri_image('patient001.nii.gz')
        Image Dimensions: (256, 256, 170)
        Voxel Dimensions: (1.0, 1.0, 1.0)
    """
    # Load the MRI scan using NiBabel
    print("Loading MRI scan...")
    mri_scan = nib.load(input_image_path)
    mri_data = mri_scan.get_fdata()
    
    # Get and display basic image information
    print(f"Image Dimensions: {mri_scan.shape}")
    print(f"Voxel Dimensions: {mri_scan.header.get_zooms()}")
    print(f"Data Type: {mri_data.dtype}")
    
    # Additional image properties
    print("Image Properties:")
    print(f"Number of Dimensions: {len(mri_scan.shape)}")
    print(f"Total Voxels: {np.prod(mri_scan.shape)}")
    print(f"Memory Usage: {mri_data.nbytes / 1024 / 1024:.2f} MB")
    
    # Check for data validity
    print("Data Validation:")
    print(f"Value Range: [{np.min(mri_data):.2f}, {np.max(mri_data):.2f}]")
    print(f"Mean Intensity: {np.mean(mri_data):.2f}")
    print(f"Standard Deviation: {np.std(mri_data):.2f}")
    
    # Get orientation information
    orientation = nib.aff2axcodes(mri_scan.affine)
    print(f"Image Orientation: {orientation}")
    
    return mri_data, mri_scan`}
            </CodeBlock>
            
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">mri_scan.shape</p>
                  <p className="text-gray-600">Three-dimensional tuple representing the number of voxels in each dimension (x, y, z).</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">mri_scan.header.get_zooms()</p>
                  <p className="text-gray-600">Physical size of voxels in millimeters for each dimension.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">mri_scan.affine</p>
                  <p className="text-gray-600">4x4 matrix defining the mapping from voxel indices to real-world coordinates.</p>
                </div>
              </div>
            </div>
          </section>
  
          {/* Image Visualization Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Visualizing Different Planes</h2>
  <CodeBlock language="python">
{`# Get middle slices for each plane
axial_slice = mri_data.shape[2] // 2    # Top view
sagittal_slice = mri_data.shape[0] // 2  # Side view
coronal_slice = mri_data.shape[1] // 2   # Front view

# Create a figure with three subplots
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Display views
axes[0].imshow(np.rot90(mri_data[:, :, axial_slice]), cmap="gray")
axes[0].set_title("Axial View")`}
  </CodeBlock>

  <div className="mt-6 bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">mri_data.shape[2] // 2</p>
        <p className="text-gray-600">Calculates the middle slice index along each axis. The // operator performs integer division to ensure a valid slice index.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">np.rot90()</p>
        <p className="text-gray-600">Rotates the image 90 degrees counterclockwise to maintain proper anatomical orientation in display.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">cmap="gray"</p>
        <p className="text-gray-600">Specifies grayscale colormap for visualization, standard in medical imaging for better contrast perception.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">figsize=(15, 5)</p>
        <p className="text-gray-600">Sets figure dimensions in inches - width: 15 inches, height: 5 inches, ensuring proper display of all three views.</p>
      </div>
    </div>
  </div>
</section>

{/* Advanced Usage Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>
  <CodeBlock language="python">
{`def get_image_info(self, mri_scan):
    """Extract detailed information about the MRI scan"""
    info = {
        'dimensions': mri_scan.shape,
        'voxel_sizes': mri_scan.header.get_zooms(),
        'affine': mri_scan.affine,
        'datatype': mri_scan.header.get_data_dtype(),
        'orientation': nib.aff2axcodes(mri_scan.affine)
    }
    return info`}
  </CodeBlock>

  <div className="mt-6 bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">mri_scan.header.get_zooms()</p>
        <p className="text-gray-600">Returns the voxel dimensions in millimeters (mm) for each axis (x, y, z). Important for spatial measurements.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">mri_scan.affine</p>
        <p className="text-gray-600">4x4 transformation matrix that maps voxel indices to real-world coordinates in millimeters.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">get_data_dtype()</p>
        <p className="text-gray-600">Returns the data type of the image (e.g., uint8, int16, float32), crucial for memory management and precision.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">nib.aff2axcodes()</p>
        <p className="text-gray-600">Converts affine matrix to orientation codes (e.g., 'RAS', 'LPI'), indicating image orientation in scanner space.</p>
      </div>
    </div>
  </div>
</section>

{/* Slice Series Display Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Displaying Slice Series</h2>
  <CodeBlock language="python">
{`def display_slice_series(self, mri_data, axis=2, start_slice=None, num_slices=5):
    """Display a series of slices along specified axis"""
    if start_slice is None:
        start_slice = mri_data.shape[axis] // 2 - num_slices // 2`}
  </CodeBlock>

  <div className="mt-6 bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">axis</p>
        <p className="text-gray-600">Specifies the viewing plane: 
          0 = Sagittal (left-right), 
          1 = Coronal (front-back), 
          2 = Axial (top-bottom)</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">start_slice</p>
        <p className="text-gray-600">Starting slice index. If None, automatically calculates to center the display window around the middle slice.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">num_slices</p>
        <p className="text-gray-600">Number of consecutive slices to display. Default is 5, providing a good balance between context and detail.</p>
      </div>
    </div>

    <div className="mt-6">
      <h4 className="font-medium text-gray-900 mb-2">Slice Selection Logic</h4>
      <p className="text-gray-600">The slice centering calculation:</p>
      <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
        <li>Takes the middle slice of the chosen axis (shape[axis] // 2)</li>
        <li>Subtracts half the number of slices to display (num_slices // 2)</li>
        <li>Results in a series centered on the middle of the brain</li>
      </ul>
    </div>
  </div>
</section>
  
          {/* Technical Considerations */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Considerations</h2>
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Technical Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Memory Management</h4>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Typical MRI size: 256x256x170 voxels</li>
                    <li>• Memory usage: ~25MB per volume</li>
                    <li>• Consider chunked loading for large datasets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Performance Tips</h4>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Use memory mapping for large files</li>
                    <li>• Implement parallel processing for batch operations</li>
                    <li>• Cache frequently accessed slices</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  export default LoadingImages;