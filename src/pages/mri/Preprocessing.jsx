// src/pages/mri/Preprocessing.jsx
import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const Preprocessing = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">MRI Preprocessing</h1>
      
      {/* Introduction Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is MRI Preprocessing?</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            MRI preprocessing is like preparing a photograph for detailed analysis. Just as you might adjust 
            brightness, remove unwanted backgrounds, and ensure proper sizing before analyzing a photo, we 
            need to prepare MRI brain scans for accurate analysis.
          </p>
          <p>
            The preprocessing pipeline includes several key steps:
          </p>
          <ul className="mt-4 space-y-2">
            <li>1. <strong>Skull Stripping:</strong> Removing non-brain tissue from the image</li>
            <li>2. <strong>Intensity Normalization:</strong> Adjusting image brightness for consistency</li>
            <li>3. <strong>Bias Field Correction:</strong> Removing image artifacts and inconsistencies</li>
            <li>4. <strong>Image Registration:</strong> Aligning images to a standard template</li>
          </ul>
        </div>
      </section>

      {/* Skull Stripping Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Non-brain tissue Removal</h2>
        
        {/* Theory Explanation */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Non-brain tissue Removal</h3>
          <div className="text-blue-800">
            <p className="mb-4">
              Imagine taking a photo of a person wearing a hat. If you want to study just their facial features, 
              you'd need to remove the hat from the image. Skull stripping works similarly - it removes everything 
              that isn't brain tissue (like the skull, scalp, and other surrounding tissues) from the MRI image.
            </p>
            <p className="font-medium mt-4">Why is it important?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Improves accuracy of brain analysis</li>
              <li>Reduces interference from non-brain tissues</li>
              <li>Makes it easier to compare different brain scans</li>
            </ul>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`def extract_brain_part(self, input_image_path, output_path):
    """Performs skull stripping using FSL BET with improved error handling.
    
    Args:   
        input_image_path: Path to the input MRI scans
        output_path: Path where the extracted brain will be saved
    """
    output_path = os.path.join(self.output, output_path)
    
    # Run FSL BET command
    bet_cmd = f"../../ll/bin/bet {input_image_path} {output_path} -R"
    process_run = subprocess.run(bet_cmd, shell=True, capture_output=True, text=True)
`}</CodeBlock>
        </div>

        {/* Parameter Explanation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">input_image_path</p>
              <p className="text-gray-600">The location of your original MRI scan file. This should be in NIfTI format (.nii or .nii.gz).</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">output_path</p>
              <p className="text-gray-600">Where you want to save the brain-extracted image. The function will create a new file at this location.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">-R flag</p>
              <p className="text-gray-600">This is a "robust" option that improves the brain extraction, particularly useful for images with unusual contrast or noise.</p>
            </div>
          </div>
        </div>

        {/* Common Issues and Solutions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Common Issues and Solutions</h3>
          <div className="bg-yellow-50 rounded-lg p-6">
            <ul className="space-y-3 text-yellow-800">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Over-extraction:</p>
                  <p>If too much brain tissue is removed, try adjusting the fractional intensity threshold (-f flag) to a lower value (e.g., 0.3).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Under-extraction:</p>
                  <p>If too much non-brain tissue remains, increase the fractional intensity threshold (-f flag) or use the robust (-R) option.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continue with other sections... */}
      {/* Intensity Normalization Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Intensity Normalization</h2>
  
  {/* Theory Explanation */}
  <div className="bg-blue-50 rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Intensity Normalization</h3>
    <div className="text-blue-800">
      <p className="mb-4">
        Imagine taking photos with different cameras or in different lighting conditions. Each photo might be 
        brighter or darker than others, making it difficult to compare them directly. Intensity normalization 
        is like adjusting all these photos to have the same brightness range, making them easier to compare.
      </p>
      <p className="font-medium mt-4">Why is it important?</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Makes different MRI scans comparable</li>
        <li>Reduces variations between different scanning machines</li>
        <li>Improves the reliability of analysis</li>
      </ul>
    </div>
  </div>

  {/* Code Section */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">Implementation</h3>
    <CodeBlock language="python">
{`def intensity_normalisation(self, image_data):
    """Normalize the intensity values of MRI data.
    
    Args:
        image_data: Input image data from MRI scan
    Returns:
        numpy.ndarray: Normalized image data with values between 0 and 1
    """
    # Calculate minimum and maximum values
    min_val = np.min(image_data)
    max_val = np.max(image_data)
    
    # Perform min-max normalization
    normalised_image_data = (image_data - min_val) / (max_val - min_val)
    
    # Additional standardization if needed
    mean_val = np.mean(normalised_image_data)
    std_val = np.std(normalised_image_data)
    
    # Print statistics for verification
    print(f"Normalized Image Statistics:")
    print(f"Mean: {mean_val:.3f}")
    print(f"Std Dev: {std_val:.3f}")
    print(f"Min: {np.min(normalised_image_data):.3f}")
    print(f"Max: {np.max(normalised_image_data):.3f}")
    
    return normalised_image_data`}</CodeBlock>
    </div><div>
<CodeBlock language='python'>
{`def visualize_normalization(self, original_data, normalized_data, slice_idx=None):
    """Visualize the effects of normalization.
    
    Args:
        original_data: Original image data
        normalized_data: Normalized image data
        slice_idx: Index of slice to visualize (default: middle slice)
    """
    if slice_idx is None:
        slice_idx = original_data.shape[2] // 2
        
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Plot original image
    im1 = ax1.imshow(original_data[:, :, slice_idx], cmap='gray')
    ax1.set_title('Original Image')
    plt.colorbar(im1, ax=ax1)
    
    # Plot normalized image
    im2 = ax2.imshow(normalized_data[:, :, slice_idx], cmap='gray')
    ax2.set_title('Normalized Image')
    plt.colorbar(im2, ax=ax2)
    
    plt.tight_layout()
    plt.show()`}</CodeBlock>
  </div>
  

  {/* Parameter Explanation */}
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">image_data</p>
        <p className="text-gray-600">The raw MRI image data as a numpy array. This is typically obtained from nib.load().get_fdata().</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">min_val and max_val</p>
        <p className="text-gray-600">The minimum and maximum intensity values in the original image. Used to scale all values to the range [0,1].</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">mean_val and std_val</p>
        <p className="text-gray-600">Statistical measures used to verify the normalization. The mean should be around 0.5 and standard deviation less than 0.5 for well-normalized images.</p>
      </div>
    </div>
  </div>

  {/* Common Issues and Solutions */}
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">Common Issues and Solutions</h3>
    <div className="bg-yellow-50 rounded-lg p-6">
      <ul className="space-y-3 text-yellow-800">
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Outlier Effects:</p>
            <p>If extreme values are skewing the normalization, consider using robust normalization methods like percentile-based scaling.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Loss of Contrast:</p>
            <p>If the normalized image appears too flat, try histogram equalization or adaptive normalization techniques.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>
{/* Bias Field Correction Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Bias Field Correction</h2>
  
  {/* Theory Explanation */}
  <div className="bg-blue-50 rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Bias Field Correction</h3>
    <div className="text-blue-800">
      <p className="mb-4">
        Imagine taking a photo with uneven lighting, where one part of the image is brighter than another, 
        even though the actual objects are the same. In MRI scans, similar issues occur due to magnetic field 
        inhomogeneities, creating a 'bias field' that makes the same type of tissue appear different in 
        different parts of the image.
      </p>
      <p className="font-medium mt-4">Why is it important?</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Ensures same tissues have similar intensities throughout the image</li>
        <li>Improves accuracy of tissue segmentation</li>
        <li>Makes automated analysis more reliable</li>
      </ul>
    </div>
  </div>

  {/* Code Section */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">Implementation</h3>
    <CodeBlock language="python">
{`def fsl_bias_correction(self, input_image_path, output_path):
    """Performs bias field correction using FSL FAST.
    
    Args:
        input_image_path (str): Path to brain-extracted image
        output_path (str): Path for saving corrected image
    
    Returns:
        str: Path to the bias-corrected image
        
    Raises:
        FileNotFoundError: If output path is incorrect
    """
    try:
        # Initialize FSL FAST
        fast = fsl.FAST()
        
        # Set up input parameters
        fast.inputs.in_files = input_image_path
        fast.inputs.bias_iters = 5        # Number of bias field removal iterations
        fast.inputs.bias_lowpass = 20     # Bias field smoothing extent
        fast.inputs.output_biascorrected = True
        fast.inputs.output_type = 'NIFTI_GZ'
        
        # Run bias correction
        print("Starting bias field correction...")
        result = fast.run()
        
        # Handle output files
        corrected_file = input_image_path.replace('.nii.gz', '_restore.nii.gz')
        
        # Verify output exists
        if not os.path.exists(corrected_file):
            raise FileNotFoundError(f"Bias-corrected file not found: {corrected_file}")
            
        # Move to final destination
        os.rename(corrected_file, output_path)
        print(f"Bias correction complete. Output saved to: {output_path}")
        
        return output_path
        
    except Exception as e:
        print(f"Error during bias field correction: {str(e)}")
        raise`}</CodeBlock>
    </div><div>
<CodeBlock language='python'>
{`
def visualize_bias_correction(self, original_path, corrected_path, slice_idx=None):
    """Visualize the effects of bias field correction.
    
    Args:
        original_path (str): Path to original image
        corrected_path (str): Path to bias-corrected image
        slice_idx (int, optional): Slice to visualize
    """
    # Load images
    orig_img = nib.load(original_path)
    corr_img = nib.load(corrected_path)
    
    orig_data = orig_img.get_fdata()
    corr_data = corr_img.get_fdata()
    
    if slice_idx is None:
        slice_idx = orig_data.shape[2] // 2
    
    # Create visualization
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Show original image
    im1 = ax1.imshow(orig_data[:, :, slice_idx], cmap='gray')
    ax1.set_title('Original Image')
    plt.colorbar(im1, ax=ax1)
    
    # Show corrected image
    im2 = ax2.imshow(corr_data[:, :, slice_idx], cmap='gray')
    ax2.set_title('Bias Corrected Image')
    plt.colorbar(im2, ax=ax2)
    
    plt.tight_layout()
    plt.show()`}</CodeBlock>
  </div>

  {/* Parameter Explanation */}
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">bias_iters (5)</p>
        <p className="text-gray-600">Number of iterations for estimating the bias field. More iterations can provide better correction but take longer. Range: 3-10</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">bias_lowpass (20)</p>
        <p className="text-gray-600">Controls how smooth the estimated bias field should be. Higher values produce smoother bias fields. Range: 10-30</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">output_biascorrected</p>
        <p className="text-gray-600">Flag to save the bias-corrected image. Set to True to generate the corrected output.</p>
      </div>
    </div>
  </div>

  {/* Common Issues and Solutions */}
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">Common Issues and Solutions</h3>
    <div className="bg-yellow-50 rounded-lg p-6">
      <ul className="space-y-3 text-yellow-800">
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Over-correction:</p>
            <p>If the correction is too aggressive, try reducing bias_iters or increasing bias_lowpass.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Under-correction:</p>
            <p>If inhomogeneities remain, try increasing bias_iters or decreasing bias_lowpass.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Processing Time:</p>
            <p>For faster processing with slightly lower accuracy, reduce bias_iters to 3-4.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>
{/* Image Registration Section */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4">Image Registration (MNI Space)</h2>
  
  {/* Theory Explanation */}
  <div className="bg-blue-50 rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Image Registration</h3>
    <div className="text-blue-800">
      <p className="mb-4">
        Image registration is like aligning photos to a standard template. Imagine having photos of different 
        faces, all taken from slightly different angles and distances. To compare them properly, you'd want 
        to align them all to the same position and size. In MRI analysis, we align brain scans to a standard 
        template called the MNI (Montreal Neurological Institute) space.
      </p>
      <p className="font-medium mt-4">Why is it important?</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Enables comparison across different subjects</li>
        <li>Makes automated analysis more reliable</li>
        <li>Allows for consistent location references in the brain</li>
        <li>Facilitates group studies and statistical analysis</li>
      </ul>
    </div>
  </div>

  {/* Code Section */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">Implementation</h3>
    <CodeBlock language="python">
{`def image_registration_mni(self, moving_image_path, template_mni_path, output_prefix):
    """Register image to MNI space using ANTs registration.
    
    Args:
        moving_image_path (str): Path to preprocessed image
        template_mni_path (str): Path to MNI template
        output_prefix (str): Prefix for output files
    
    Returns:
        str: Path to registered image
    """
    try:
        # Load the images
        print("Loading images...")
        fixed = ants.image_read(template_mni_path)
        moving = ants.image_read(moving_image_path)
        
        print("Starting registration...")
        registration = ants.registration(
            fixed=fixed,           # MNI template (target)
            moving=moving,         # Image to be registered
            type_of_transform='SyN',  # Symmetric Normalization
            grad_step=0.2,         # Gradient descent step size
            flow_sigma=3,          # Smoothing parameter
            total_sigma=0,         # Total field smoothing
            aff_metric='mattes',   # Similarity metric for affine
            syn_metric='mattes',   # Similarity metric for deformable
            reg_iterations=(100, 70, 50, 20),  # Multi-resolution iterations
            verbose=True
        )
        
        # Save registered image
        registered_image_path = output_prefix + 'registered.nii.gz'
        warped_img = registration['warpedmovout']
        ants.image_write(warped_img, registered_image_path)
        
        print(f"Registration complete. Output saved to: {registered_image_path}")
        return registered_image_path
        
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return None`}</CodeBlock>
    </div><div>
<CodeBlock language='python'>
{`def verify_registration(self, original_path, registered_path, mni_path):
    """Visualize registration results.
    
    Args:
        original_path (str): Path to original image
        registered_path (str): Path to registered image
        mni_path (str): Path to MNI template
    """
    # Load all images
    orig_img = nib.load(original_path)
    reg_img = nib.load(registered_path)
    mni_img = nib.load(mni_path)
    
    # Get middle slices
    orig_data = orig_img.get_fdata()
    reg_data = reg_img.get_fdata()
    mni_data = mni_img.get_fdata()
    
    slice_idx = orig_data.shape[2] // 2
    
    # Create visualization
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    
    # Original image
    axes[0].imshow(orig_data[:, :, slice_idx], cmap='gray')
    axes[0].set_title('Original Image')
    
    # Registered image
    axes[1].imshow(reg_data[:, :, slice_idx], cmap='gray')
    axes[1].set_title('Registered Image')
    
    # MNI template
    axes[2].imshow(mni_data[:, :, slice_idx], cmap='gray')
    axes[2].set_title('MNI Template')
    
    plt.tight_layout()
    plt.show()`}</CodeBlock>
  </div>

  {/* Parameter Explanation */}
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-gray-900">type_of_transform='SyN'</p>
        <p className="text-gray-600">Symmetric Normalization transform type - allows for complex, non-linear deformations while maintaining anatomical topology.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">grad_step (0.2)</p>
        <p className="text-gray-600">Controls how large the steps are in the optimization process. Smaller values are more precise but slower.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">flow_sigma (3)</p>
        <p className="text-gray-600">Controls smoothness of the deformation field. Higher values produce smoother transformations.</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">reg_iterations</p>
        <p className="text-gray-600">Number of iterations at each resolution level. More iterations can improve accuracy but increase processing time.</p>
      </div>
    </div>
  </div>

  {/* Common Issues and Solutions */}
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">Common Issues and Solutions</h3>
    <div className="bg-yellow-50 rounded-lg p-6">
      <ul className="space-y-3 text-yellow-800">
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Poor Alignment:</p>
            <p>Try increasing the number of iterations or adjusting the gradient step size. Consider using a different similarity metric.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Distorted Results:</p>
            <p>Increase flow_sigma for smoother deformations, or try using a different transform type like 'Affine' first.</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <div>
            <p className="font-medium">Processing Time:</p>
            <p>For faster processing, reduce the number of iterations or use multi-threading with the 'n_jobs' parameter.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>
    </div>
  );
};

export default Preprocessing;