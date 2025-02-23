import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const BatchProcessing = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Batch Processing MRI Images</h1>

      {/* Understanding Batch Processing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is MRI Batch Processing?</h2>
        <div className="prose max-w-none text-gray-600 mb-6 text-justify">
          <p>
            Batch processing in MRI analysis is a technique that enables simultaneous processing of multiple MRI scans,
            significantly improving efficiency and reducing total processing time. Instead of processing each scan
            sequentially, batch processing leverages parallel computing to handle multiple images simultaneously.
            This approach is particularly crucial when dealing with large datasets, such as in research studies or
            clinical trials where hundreds or thousands of scans need to be processed. The technique ensures
            consistency in processing while optimizing resource utilization and maintaining robust error handling
            for each individual scan.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Key Advantages in MRI Processing
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            <li>
              <strong>Parallel Processing:</strong> Utilize multiple CPU cores to process multiple images simultaneously
            </li>
            <li>
              <strong>Time Efficiency:</strong> Significantly reduce total processing time compared to sequential processing
            </li>
            <li>
              <strong>Resource Optimization:</strong> Better utilization of available computing resources
            </li>
            <li>
              <strong>Error Isolation:</strong> Issues with one image don't affect the processing of others
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Processing Pipeline Steps</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pre-processing</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Brain extraction</li>
                <li>Intensity normalization</li>
                <li>Bias field correction</li>
                <li>Registration to standard space</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Processing Controls</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Parallel worker management</li>
                <li>Error handling and logging</li>
                <li>Progress tracking</li>
                <li>Resource monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
        
        {/* Initialization */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">1. Batch Processor Initialization</h3>
          <CodeBlock language="python">
{`class BatchProcessingImages(MRIScansPipeline):
    def __init__(self, input_dir, output_dir, registered_dir):
        """Initialize batch processor with directory paths.
        
        Args:
            input_dir (str): Directory containing raw MRI scans
            output_dir (str): Directory for processed outputs
            registered_dir (str): Directory for registered images
        """
        super().__init__(input_dir, output_dir)
        self.registered = registered_dir`}
          </CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Parameter Explanation</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>input_dir:</strong> Contains the original MRI scans to be processed
              </li>
              <li>
                <strong>output_dir:</strong> Where processed and intermediate files will be saved
              </li>
              <li>
                <strong>registered_dir:</strong> Specific location for storing registered images
              </li>
            </ul>
          </div>
        </div>

        {/* Single Image Processing */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. Single Image Processing</h3>
          <CodeBlock language="python">
{`def process_mri_image(self, args):
    """Process a single MRI image through the complete pipeline.
    
    Args:
        args (tuple): (patient_id, image_id, mni_path)
    Returns:
        str: Processing status message
    """
    patient_id, image_id, mni_path = args
    try:
        # Construct paths
        patient_path = os.path.join(self.input, patient_id)
        image_path = os.path.join(patient_path, image_id)
        
        # Skip if already processed
        registered_image_prefix = os.path.join(
            self.output, 
            f"registered2/{patient_id}-{image_id}-"
        )
        registered_image_path = registered_image_prefix + "registered.nii.gz"
        
        if os.path.exists(registered_image_path):
            return f"Already exists: {registered_image_path}"
            
        # Process through pipeline
        brain_extracted_path = self.extract_brain_part(
            image_path, 
            f"{patient_id}-{image_id}-brain_extracted.nii.gz"
        )

        normalised_image_path = self.normalize_image(
            brain_extracted_path,
            f"{patient_id}-{image_id}-normalized.nii.gz"
        )
        
        bias_path = self.fsl_bias_correction(
            normalised_image_path,
            f"{patient_id}-{image_id}-bias.nii.gz"
        )
        
        registered_image_path = self.image_registration_mni(
            bias_path, 
            mni_path, 
            registered_image_prefix
        )
        
        return f"Processing complete: {patient_id} - {image_id}"
        
    except Exception as e:
        return f"Error processing {patient_id}-{image_id}: {str(e)}"`}
          </CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Process Steps Explanation</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Construct file paths and check for existing processed files</li>
              <li>Perform brain extraction to remove non-brain tissue</li>
              <li>Normalize image intensities for consistency</li>
              <li>Apply bias field correction</li>
              <li>Register image to standard MNI space</li>
            </ol>
          </div>
        </div>

        {/* Batch Processing */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">3. Parallel Batch Processing</h3>
          <CodeBlock language="python">
{`def batch_process_mri_images(self, mni_path, num_workers=4):
    """Process multiple MRI images in parallel.
    
    Args:
        mni_path (str): Path to MNI template
        num_workers (int): Number of parallel processes
    """
    tasks = []
    
    # Collect processing tasks
    for patient_id in os.listdir(self.input):
        patient_path = os.path.join(self.input, patient_id)
        
        if not os.path.isdir(patient_path):
            continue
            
        # Get MRI images for patient
        patient_images = [
            file for file in os.listdir(patient_path) 
            if file.endswith('.nii.gz')
        ]
        
        if not patient_images:
            print(f"No MRI images found for {patient_id}")
            continue
        
        # Create tasks for parallel processing
        for image_id in patient_images:
            tasks.append((patient_id, image_id, mni_path))
    
    # Execute parallel processing
    with ProcessPoolExecutor(max_workers=num_workers) as executor:
        results = executor.map(self.process_mri_image, tasks)
        
    for result in results:
        print(result)`}
          </CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Implementation Features</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Efficient task collection and distribution</li>
              <li>• Parallel processing with configurable worker count</li>
              <li>• Automatic resource management</li>
              <li>• Progress tracking and result logging</li>
            </ul>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">4. Usage Example</h3>
          <CodeBlock language="python">
{`# Initialize batch processor
processor = BatchProcessingImages(
    input_dir='../CogNIDImages',
    output_dir='../Output',
    registered_dir='../Output/registered'
)

# Set MNI template path
mni_path = "path/to/MNI152_T1_1mm_brain.nii.gz"

# Start batch processing with 8 parallel workers
processor.batch_process_mri_images(mni_path, num_workers=8)`}
          </CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Start with 4-8 workers and adjust based on system capabilities</li>
              <li>• Monitor system resources during processing</li>
              <li>• Keep comprehensive logs for debugging</li>
              <li>• Ensure adequate storage space for outputs</li>
            </ul>
          </div>
        </div>
      </section>
        <section>
      <div className="mb-8">
          <h6 className="text-xl font-semibold mb-4">Similarly batch processing code for segmentation of MRI images</h6>
          <CodeBlock language="python">
{`class ImageSegmenter(BatchProccessingImages):
    def __init__(self, images_dir, atlas_paths, output_dir):
        """
        Initialize the ImageSegmenter with paths and label mappings.
        
        Args:
            images_dir (str): Directory containing input images
            hoa_path (str): Path to HOA template
            output_dir (str): Base output directory
        """
        self.images_dir = images_dir
        self.atlas_paths = atlas_paths
        self.output_dir = output_dir
        
        # Define label mappings
        self.label_mappings = {
            'cortex': labels_cortex,
            'subcortex': labels_subcortex,
            'mni': mni_labels
        }
        
        # Create output directories
        for seg_type in ['cortex', 'subcortex', 'mni']:
            os.makedirs(f"{output_dir}/segmented_{seg_type}", exist_ok=True)

    def process_single_image(self, args):
        """
        Process a single image for segmentation.
        
        Args:
            args (tuple): (file_path, segmentation_type)
        
        Returns:
            str: Status message
        """
        file, segmentation_type = args
        
        try:
            if not file.endswith('.nii.gz'):
                return f"Skipped non-nii.gz file: {file}"
                
            registered_mri_path = os.path.join(self.images_dir, file)
            
            if registered_mri_path == "../Output/registered/.DS_Store":
                return f"Skipped .DS_Store file: {registered_mri_path}"
                
            # Load images
            registered_mri_image = nib.load(registered_mri_path)
            registered_mri_data = registered_mri_image.get_fdata()
            
            # Process filename
            renamed_file_name = file.replace('.nii.gz-_warped.nii.gz', '')
            
            # Determine which segmentations to perform
            segmentations = ['cortex', 'subcortex', 'mni'] if segmentation_type == 'all' else [segmentation_type]
            
            # Process each segmentation type
            for seg_type in segmentations:
                atlas_path = self.atlas_paths[seg_type]
                atlas_img = nib.load(atlas_path)
                atlas_data = atlas_img.get_fdata()
                
                labels = self.label_mappings[seg_type]
                labels = self.label_mappings[seg_type]
                
                for label in labels:
                    label_out_path = f"{self.output_dir}/segmented_{seg_type}/{renamed_file_name}-{label}.nii.gz"
                    
                    # Skip if output already exists
                    if os.path.exists(label_out_path):
                        print("Already exists", seg_type)
                        continue
                    
                    # Create and apply mask
                    label_mask = np.isin(atlas_data, labels[label]).astype(np.float32)
                    label_mask_img = nib.Nifti1Image(label_mask, atlas_img.affine)
                    
                    resampled_mask_img = resample_from_to(label_mask_img, registered_mri_image, order=0)
                    label_data = registered_mri_data * resampled_mask_img.get_fdata()
                    label_img = nib.Nifti1Image(label_data, registered_mri_image.affine)
                    
                    nib.save(label_img, label_out_path)
            
            return f"Successfully processed {file}"
            
        except Exception as e:
            return f"Error processing {file}: {str(e)}"

    def batch_segment_images(self, segmentation_type='all', num_workers=4):
        """
        Batch process images for segmentation using parallel processing.
        
        Args:
            segmentation_type (str): Type of segmentation ('cortex', 'subcortex', 'mni', or 'all')
            num_workers (int): Number of parallel processes to use
        """
        # Collect all processing tasks
        tasks = []
        files = [f for f in os.listdir(self.images_dir) if f.endswith('.nii.gz')]
        
        for file in files:
            tasks.append((file, segmentation_type))
        
        if not tasks:
            print("No NIFTI files found in the input directory")
            return
        
        print(f"Starting batch processing of {len(tasks)} files with {num_workers} workers...")
        
        # Process tasks in parallel
        with ProcessPoolExecutor(max_workers=num_workers) as executor:
            results = list(executor.map(self.process_single_image, tasks))
        
        # Print results
        for result in results:
            print(result)
        
        print("Batch processing completed!")`}
          </CodeBlock>
        </div>
      </section>
    </div>
  );
};

export default BatchProcessing;