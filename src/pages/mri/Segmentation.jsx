// src/pages/mri/Segmentation.jsx
import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const Segmentation = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Brain MRI Segmentation</h1>

      {/* Understanding Segmentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is MRI Segmentation?</h2>
        <div className="prose max-w-none text-gray-600 mb-6 text-justify">
          <p>
          MRI segmentation is the process of dividing an MRI scan into different regions or structures, 
          helping in medical research, diagnosis, and treatment planning. It can be manual, semi-automatic, 
          or fully automated using AI. There are different types of segmentation, including tissue-based 
          (separating gray matter, white matter, and cerebrospinal fluid), structure-based (identifying regions
           like the hippocampus and thalamus), and lesion-based (detecting abnormalities such as tumors, 
           stroke lesions, and multiple sclerosis). MRI segmentation is widely used in diagnosing Alzheimer’s
            disease by measuring hippocampus volume, detecting and classifying brain tumors, identifying 
            stroke-damaged areas, monitoring multiple sclerosis progression, and aiding in surgical planning. 
            Techniques used for segmentation include thresholding, region growing, and deep learning models 
            like CNNs and U-Net. This advanced process is essential in neuroscience and medicine, enabling more
             precise diagnosis and treatment of various brain disorders.
             </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Importance in Dementia Detection
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            <li>
              <strong>Volume Changes:</strong> Helps detect brain atrophy (shrinkage) in specific regions, 
              a key indicator of dementia
            </li>
            <li>
              <strong>Structural Analysis:</strong> Enables measurement of hippocampus and temporal lobe 
              volumes, crucial areas affected in Alzheimer's
            </li>
            <li>
              <strong>Disease Progression:</strong> Allows tracking of changes over time to monitor 
              disease progression
            </li>
            <li>
              <strong>Early Detection:</strong> Can identify subtle changes before clinical symptoms 
              become apparent
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Key Brain Regions for Dementia Analysis</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Subcortical Structures</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Hippocampus - Memory formation</li>
                <li>Amygdala - Emotional processing</li>
                <li>Thalamus - Sensory processing</li>
                <li>Ventricles - CSF-filled spaces</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Cortical Regions</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Temporal lobe - Memory and language</li>
                <li>Frontal lobe - Executive function</li>
                <li>Parietal lobe - Spatial awareness</li>
                <li>Entorhinal cortex - Memory and navigation</li>
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
          <h3 className="text-xl font-semibold mb-4">1. Segmenter Initialization</h3>
          <CodeBlock language="python">
{`class ImageSegmenter(BatchProccessingImages):
    def __init__(self, images_dir, atlas_paths, output_dir):
        """Initialize segmentation with paths and label mappings.
        
        Args:
            images_dir (str): Directory with preprocessed MRI scans
            atlas_paths (dict): Paths to anatomical atlases
            output_dir (str): Output directory for segmented images
        """
        self.images_dir = images_dir
        self.atlas_paths = atlas_paths
        self.output_dir = output_dir
        
        # Define mappings for brain regions
        self.label_mappings = {
            'subcortex': {
                "left_hippocampus": 9,    # Critical for memory
                "right_hippocampus": 19,
                "left_amygdala": 10,      # Emotional processing
                "right_amygdala": 20,
                "left_thalamus": 4,       # Sensory relay
                "right_thalamus": 15,
                "left_ventricle": 3,      # CSF spaces
                "right_ventricle": 14
            },
            'cortex': {
                "temporal_lobe": 8,       # Memory and language
                "frontal_lobe": 1,        # Executive function
                "parietal_lobe": 18,      # Spatial processing
                "entorhinal_cortex": 25   # Memory and navigation
            }
        }
        
        # Create output directories
        for seg_type in ['cortex', 'subcortex']:
            os.makedirs(f"{output_dir}/segmented_{seg_type}", exist_ok=True)`}</CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Parameter Explanation</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>images_dir:</strong> Contains preprocessed MRI scans ready for segmentation
              </li>
              <li>
                <strong>atlas_paths:</strong> References to standard brain atlases for region identification
              </li>
              <li>
                <strong>label_mappings:</strong> Dictionary connecting brain regions to their atlas indices
              </li>
              <li>
                <strong className='text-blue-400'>You can check all the mappings when you install the FSL library and look for atlasses. Everything is mapped in respective xml files</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Processing Function */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. Segmentation Processing</h3>
          <CodeBlock language="python">
{`def process_single_image(self, args):
    """Segment individual brain regions from MRI scan.
    
    Args:
        args (tuple): (file_path, segmentation_type)
    Returns:
        str: Processing status message
    """
    file, segmentation_type = args
    
    try:
        # Validate and load image
        if not file.endswith('.nii.gz'):
            return f"Skipped non-nii.gz file: {file}"
            
        mri_path = os.path.join(self.images_dir, file)
        mri_img = nib.load(mri_path)
        mri_data = mri_img.get_fdata()
        
        # Determine segmentation types
        seg_types = ['cortex', 'subcortex'] if segmentation_type == 'all' else [segmentation_type]
        
        # Process each type
        for seg_type in seg_types:
            atlas_img = nib.load(self.atlas_paths[seg_type])
            atlas_data = atlas_img.get_fdata()
            
            # Process each region
            for region, label in self.label_mappings[seg_type].items():
                output_path = f"{self.output_dir}/segmented_{seg_type}/{file.split('.')[0]}_{region}.nii.gz"
                
                # Create binary mask
                mask = (atlas_data == label).astype(np.float32)
                mask_img = nib.Nifti1Image(mask, atlas_img.affine)
                
                # Apply mask
                masked_data = mri_data * mask
                result_img = nib.Nifti1Image(masked_data, mri_img.affine)
                nib.save(result_img, output_path)
                
        return f"Successfully segmented {file}"
        
    except Exception as e:
        return f"Error processing {file}: {str(e)}"`}</CodeBlock>

          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">Process Steps Explanation</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Load preprocessed and registered MRI scan and atlas.</li>
              <li>Use the binary masks mapped in the atlases provided in FSL (HOA, MNI), and map the data with registered MRI scan.</li>
              <li>Apply masks to isolate specific regions and get the data for the segmented region.</li>
              <li>Save individual segmented regions according to their label.</li>
            </ol>
          </div>
        </div>

        {/* Continue with other functions... */}
      </section>
      {/* Visualization Section */}
<section className="mb-12">
  <h3 className="text-xl font-semibold mb-4">4. Result Visualization</h3>
  <CodeBlock language="python">
{`def plot_segmented_img(self, bg_img_path, segmented_img_path):
        """Plot any of the required segmented brain part on top of the entire brain image

        Args:
            bg_img_path (str): path of the entire brain image
            segmented_img_path (str): path of the segmented brain part image 
        """
        
        # Load the entire brain MRI image
        bg_mri = nib.load(bg_img_path)
        bg_data = bg_mri.get_fdata()
        
        # Load the segmented brain part image
        segmented_mri = nib.load(segmented_img_path)
        segmented_data = segmented_mri.get_fdata()
        
        # Find slices with maximum segmentation in each view
        axial_slice = np.argmax(np.sum(segmented_data, axis=(0, 1)))    # Z-axis
        sagittal_slice = np.argmax(np.sum(segmented_data, axis=(1, 2)))  # X-axis
        coronal_slice = np.argmax(np.sum(segmented_data, axis=(0, 2)))   # Y-axis
        
        # Define custom colormap blending 'cool' and 'hot'
        colors = ["cyan", "blue", "red", "yellow"]
        custom_cmap = LinearSegmentedColormap.from_list("hotcool", colors, N=256)

        # Create subplots
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        fig.suptitle(f"{segmented_img_path.split('-')[-1]}".replace(".nii.gz", ""))

        # Mask segmentation data to avoid coloring the background
        seg_data_masked = np.ma.masked_where(segmented_data == 0, segmented_data)

        # Axial View
        axes[0].imshow(bg_data[:, :, axial_slice], cmap='gray', alpha=1)
        axes[0].imshow(seg_data_masked[:, :, axial_slice], cmap=custom_cmap, alpha=0.7)
        axes[0].set_title(f"Axial View (Slice {axial_slice})")

        # Sagittal View (Rotate 180°)
        axes[1].imshow(np.rot90(bg_data[sagittal_slice, :, :].T, 2), cmap='gray', alpha=1)
        axes[1].imshow(np.rot90(seg_data_masked[sagittal_slice, :, :].T, 2), cmap=custom_cmap, alpha=0.7)
        axes[1].set_title(f"Sagittal View (Slice {sagittal_slice})")

        # Coronal View (Rotate 180°)
        axes[2].imshow(np.rot90(bg_data[:, coronal_slice, :].T, 2), cmap='gray', alpha=1)
        axes[2].imshow(np.rot90(seg_data_masked[:, coronal_slice, :].T, 2), cmap=custom_cmap, alpha=0.7)
        axes[2].set_title(f"Coronal View (Slice {coronal_slice})")


        plt.tight_layout()
        plt.show()`}</CodeBlock>

  <div className="mt-4 bg-gray-50 rounded-lg p-6">
    <h4 className="font-medium text-gray-900 mb-2">Visualization Features</h4>
    <ul className="space-y-2 text-gray-600">
      <li>• Multi-planar views for comprehensive analysis</li>
      <li>• Overlay of segmented regions on original scan</li>
      <li>• Color-coded segmentation visualization</li>
      <li>• High-resolution output options</li>
    </ul>
  </div>
</section>

      {/* Would you like me to continue with the remaining sections? */}
    </div>
  );
};

export default Segmentation;