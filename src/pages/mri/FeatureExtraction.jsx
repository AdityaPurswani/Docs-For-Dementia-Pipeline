import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const Formula = ({ formula, explanation }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 my-4">
      <div className="font-mono text-center text-lg mb-2">{formula}</div>
      <div className="text-gray-700 mt-2">{explanation}</div>
    </div>
  );
};

const MathFormula = ({ children }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center">
      {children}
    </div>
  );
};


const FeatureExtraction = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Feature Extraction: MRI Pipeline</h1>

      {/* Volume Calculation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            The feature extraction process involves several sophisticated algorithms to calculate 
            morphological characteristics of brain structures. Each feature is computed using specific 
            mathematical approaches optimized for medical image analysis.
          </p>
          <br/>

          <CodeBlock language="python">
{`class FeatureExtraction(ImageSegmenter):
    def __init__(self, images_dir, atlas_paths, output_dir):
        super().__init__(images_dir, atlas_paths, output_dir)`}
          </CodeBlock>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Volume Calculation</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          Volume is one of the most important metrics in brain MRI analysis as it helps quantify the size of different brain structures, detect abnormalities, and monitor disease progression. Many neurological disorders lead to changes in brain volume, making it a critical biomarker for early diagnosis and treatment evaluation. 
          Neurodegenerative diseases such as Alzheimer’s, Parkinson’s, and Frontotemporal Dementia (FTD) cause a gradual decrease in brain volume, known as atrophy. Measuring volume loss in specific regions like the hippocampus and medial temporal lobe helps in early diagnosis and disease staging.
          Volume calculation uses the integral image approach for efficient computation which significantly improves computational 
          efficiency compared to traditional voxel counting methods. For a 3D image I(x,y,z), 
          the integral image II(x,y,z) is defined as:
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">Algorithm Theory:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>
                <span className="font-semibold">Integral Image:</span> Creates a 3D cumulative sum array 
                where each point (x,y,z) contains the sum of all points in the sub-volume from (0,0,0) to (x,y,z)
              </li>
              <li>
                <span className="font-semibold">Voxel Size Correction:</span> Multiplies by voxel dimensions 
                to convert from voxel counts to physical volume
              </li>
              <li>
                <span className="font-semibold">Computational Complexity:</span> Reduces from O(n³) to O(1) 
                for volume queries after integral image computation
              </li>
            </ul>
          </div>

          <Formula 
            formula="II(x,y,z) = Σ(i≤x, j≤y, k≤z) I(i,j,k)"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>II(x,y,z)</strong>: Integral image value at position (x,y,z)</li>
                <li><strong>I(i,j,k)</strong>: Original image intensity at position (i,j,k)</li>
                <li><strong>Σ</strong>: Sum over all voxels from (0,0,0) to (x,y,z)</li>
                <li><strong>i,j,k</strong>: Iteration variables for each dimension</li>
              </ul>
            }
          />

          <Formula 
            formula="Volume = II(xmax, ymax, zmax) × (Δx × Δy × Δz)"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>II(xmax, ymax, zmax)</strong>: Final value of integral image</li>
                <li><strong>Δx, Δy, Δz</strong>: Voxel dimensions in each direction (mm)</li>
                <li><strong>×</strong>: Multiplication operator for physical volume calculation</li>
                <li>Final volume is in cubic millimeters (mm³)</li>
              </ul>
            }
          />

          <CodeBlock language="python">
{`def extract_volume(self, segmented_img_path):
    img = nib.load(segmented_img_path)
    data = img.get_fdata()
    # Get voxel dimensions (Δx, Δy, Δz)
    voxel_size = np.prod(img.header.get_zooms())
    
    # Calculate integral image
    integral_img = np.cumsum(np.cumsum(np.cumsum(data, axis=0), axis=1), axis=2)
    volume = integral_img[-1, -1, -1] * voxel_size
    
    return volume`}
          </CodeBlock>
        </div>
      </section>

      {/* Surface Area */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Surface Area Calculation</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          Surface area is an important morphological feature in brain MRI analysis that reflects the complexity and folding patterns of the cerebral cortex. It provides valuable insights into brain development, neurological disorders, and cognitive function.
            Surface area calculation uses the Marching Cubes algorithm with gradient-based refinements 
            for accurate surface mesh generation.. For each triangle in the mesh, 
            the area is calculated using the cross product formula:
          </p>

          <div className="bg-green-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-green-900 mb-2">Algorithm Components:</h4>
            <ul className="list-disc pl-6 text-green-800">
              <li>
                <span className="font-semibold">Marching Cubes:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Creates triangulated mesh from volumetric data</li>
                  <li>Processes each voxel cube to generate surface patches</li>
                  <li>Interpolates vertex positions for smooth surfaces</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Mesh Surface Area:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Calculates area of each triangle in mesh</li>
                  <li>Accounts for voxel spacing/dimensions</li>
                  <li>Sums all triangle areas for total surface area</li>
                </ul>
              </li>
            </ul>
          </div>

          <Formula 
            formula="Area_triangle = ||(v2 - v1) × (v3 - v1)|| / 2"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>v1, v2, v3</strong>: Vertices of the triangle in 3D space</li>
                <li><strong>×</strong>: Cross product operator</li>
                <li><strong>|| ||</strong>: Magnitude (length) of the vector</li>
                <li><strong>-</strong>: Vector subtraction</li>
              </ul>
            }
          />

          <Formula 
            formula="Surface_Area = Σ(Area_triangle) × spacing_correction"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Σ(Area_triangle)</strong>: Sum of all triangle areas</li>
                <li><strong>spacing_correction</strong>: Adjustment for voxel dimensions</li>
                <li>Final area is in square millimeters (mm²)</li>
              </ul>
            }
          />

          <CodeBlock language="python">
{`def extract_surface_area(self, segmented_image_path, method="greyscale", percentile=50):
    """Calculate surface area using Marching Cubes algorithm"""
    img = nib.load(segmented_image_path)
    data = img.get_fdata()
    spacing = img.header.get_zooms()
    
    if method == 'binary':
        # Convert to binary using Otsu's method or a threshold of 0.5
        threshold = filters.threshold_otsu(data)
        data_processed = data > threshold
        level = 0  # Use 0 for binary data
    else:
        # Use the data as is
        data_processed = data
        # Set level to mean between min and max of non-zero values
        non_zero_data = data[data > 0]
        level = np.percentile(non_zero_data, percentile) if len(non_zero_data) > 0 else 0
    
    # Calculate surface area
    verts, faces, _, _ = measure.marching_cubes(data_processed, level=level)
    verts = verts * spacing
    return measure.mesh_surface_area(verts, faces)`}
          </CodeBlock>
        </div>
      </section>

      {/* Shape Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Shape Descriptors</h2>
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-xl font-semibold mt-6 mb-3">A. Compactness</h3>
          <p>
          Compactness is an important shape-based feature in brain MRI analysis, providing valuable insights into brain structure, atrophy, and potential abnormalities. It is a quantitative measure of how efficiently a structure is packed, helping in the assessment of neurodegenerative diseases, tumors, and other brain conditions.
          Compactness helps in identifying brain atrophy, where the brain loses volume due to diseases like Alzheimer’s, Frontotemporal Dementia (FTD), and Parkinson’s. A lower compactness value may indicate irregular or fragmented brain structures, signifying degeneration.

          </p>

          <Formula 
            formula="Compactness = A³ / (36π × V²)"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>A</strong>: Surface area of the region (mm²)</li>
                <li><strong>V</strong>: Volume of the region (mm³)</li>
                <li><strong>π</strong>: Mathematical constant pi</li>
                <li><strong>³, ²</strong>: Cube and square operations</li>
              </ul>
            }
          />

          <CodeBlock language="python">
{`def extract_compactness(self, volume, surface_area):
    if volume == 0:
        return 0
    return (surface_area)**3 / (volume)**2`}
          </CodeBlock>

          <h3 className="text-xl font-semibold mt-6 mb-3">B. Sphericity</h3>
          <p>
          Sphericity is a key shape-based feature in brain MRI analysis that measures how closely a structure resembles a perfect sphere. It is useful for assessing brain morphology, detecting abnormalities, and monitoring disease progression. Sphericity is particularly valuable in neuroimaging because many healthy brain structures tend to have regular, smooth shapes, while neurodegenerative diseases, tumors, and lesions often cause deformations.
          Neurodegenerative diseases like Alzheimer’s and Frontotemporal Dementia (FTD) cause brain structures to shrink and deform. A decrease in sphericity suggests increasing irregularity in brain shape, which may indicate cortical thinning, ventricular enlargement, or atrophy.

          </p>

          <Formula 
            formula="Sphericity = (π^(1/3)) × (6V)^(2/3) / A"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>V</strong>: Volume of the region</li>
                <li><strong>A</strong>: Surface area of the region</li>
                <li><strong>π^(1/3)</strong>: Cube root of pi</li>
                <li><strong>(6V)^(2/3)</strong>: Two-thirds power of 6 times volume</li>
              </ul>
            }
          />

          <CodeBlock language="python">
{`def extract_sphericity(self, volume, surface_area):
    if surface_area == 0:
        return 0
    return (np.pi**(1/3)) * (6 * volume)**(2/3) / surface_area`}
          </CodeBlock>

          <h3 className="text-xl font-semibold mt-6 mb-3">C. Eccentricity</h3>
          <p>
          Eccentricity is a shape-based feature in brain MRI analysis that measures how elongated a structure is compared to a perfect circle or sphere. It provides crucial insights into brain morphology, structural deformations, and disease progression by quantifying how much a brain region deviates from a normal, rounded shape.
          In diseases like Alzheimer’s, Frontotemporal Dementia (FTD), and Parkinson’s, brain regions may shrink unevenly, causing structures such as ventricles and cortical regions to become more elongated. An increase in eccentricity over time may indicate progressive atrophy, making it valuable for disease tracking.
          Eccentricity is calculated using SVD eigenvalues. For eigenvalues λ₁ ≥ λ₂ ≥ λ₃:
          </p>

          <div className="bg-purple-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-purple-900 mb-2">SVD-based Algorithm:</h4>
            <ul className="list-disc pl-6 text-purple-800">
              <li>
                <span className="font-semibold">Point Cloud Generation:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Extracts coordinates of non-zero voxels</li>
                  <li>Applies voxel spacing correction</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">SVD Analysis:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Centers data around mean</li>
                  <li>Performs SVD decomposition</li>
                  <li>Extracts principal axes from singular values</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Eccentricity Calculation:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Uses ratio of largest to smallest singular values</li>
                  <li>Normalizes to [0,1] range</li>
                </ul>
              </li>
            </ul>
          </div>

          <Formula 
            formula="Eccentricity = √(1 - λ₃/λ₁)"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>λ₁</strong>: Largest eigenvalue (major axis)</li>
                <li><strong>λ₃</strong>: Smallest eigenvalue (minor axis)</li>
                <li><strong>√</strong>: Square root operation</li>
                <li>Value ranges from 0 (sphere) to 1 (line)</li>
              </ul>
            }
          />

          <Formula 
            formula="M = UΣV^T"
            explanation={
              <ul className="list-disc pl-6 mt-2">
                <li><strong>M</strong>: Original coordinate matrix</li>
                <li><strong>U</strong>: Left singular vectors</li>
                <li><strong>Σ</strong>: Diagonal matrix of singular values</li>
                <li><strong>V^T</strong>: Transpose of right singular vectors</li>
                <li><strong>λᵢ = σᵢ²</strong>: Eigenvalues are squares of singular values</li>
              </ul>
            }
          />

<CodeBlock language="python">
{`def extract_eccentricity(self, segmented_image_path):
    """
    Calculate eccentricity using SVD-based ellipsoid fitting.
    
    Algorithm Steps:
    1. Extract point cloud from segmented image
    2. Center points and apply voxel spacing
    3. Perform SVD for principal component analysis
    4. Calculate eccentricity from singular values
    """
    img = nib.load(segmented_image_path)
    data = img.get_fdata()
    spacing = img.header.get_zooms()
    
    # Get coordinates with proper spacing
    coords = np.array(np.where(data > 0)).T * spacing
    
    if len(coords) < 4:
        return 0
    
    # Center coordinates
    centroid = np.mean(coords, axis=0)
    coords_centered = coords - centroid
    
    # Perform SVD
    U, S, Vh = svd(coords_centered, full_matrices=False)
    
    # Calculate eigenvalues and eccentricity
    eigenvalues = S ** 2 + 1e-10  # Add small epsilon
    eccentricity = np.sqrt(1 - eigenvalues[2] / eigenvalues[0])
    
    return eccentricity if 0 <= eccentricity <= 1 else 0`}
          </CodeBlock>
        </div>
      </section>

      {/* Feature Combination */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Complete Feature Extraction Process</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            The complete process combines all features into a comprehensive analysis pipeline, processing 
            multiple brain regions and organizing results.
          </p>
          <br/>

          <CodeBlock language="python">
{`def extract_features(self, segmented_dir, output_csv):
    """
    Extract all features from segmented brain regions.
    
    Process:
    1. Iterate through segmented images
    2. Extract all features for each region
    3. Organize results by MRI ID
    4. Save to CSV format
    """
    features_dict = {}
    files = os.listdir(segmented_dir)

    for file in files:
        if not file.endswith('.nii.gz'):
            continue
        
        # Parse filename for identification
        cognid_id, mri_id, part_name = file.split('-')
        part_name = part_name.replace('.nii.gz', '')
        
        image_path = os.path.join(segmented_dir, file)
        
        if os.path.exists(image_path):
            try:
                # Extract all features
                volume = self.extract_volume(image_path)
                surface_area = self.extract_surface_area(image_path)
                compactness = self.extract_compactness(volume, surface_area)
                sphericity = self.extract_sphericity(volume, surface_area)
                eccentricity = self.extract_eccentricity(image_path)
                
                # Organize features by MRI ID
                if mri_id not in features_dict:
                    features_dict[mri_id] = {}

                # Store features with anatomical region labels
                features_dict[mri_id].update({
                    f"{part_name}_Volume": volume,
                    f"{part_name}_Surface_Area": surface_area,
                    f"{part_name}_Compactness": compactness,
                    f"{part_name}_Sphericity": sphericity,
                    f"{part_name}_Eccentricity": eccentricity
                })
            
            except Exception as e:
                print(f"Error processing {image_path}: {e}")
                continue

    # Convert to DataFrame and save
    features_df = pd.DataFrame.from_dict(features_dict, orient='index')
    features_df.rename(columns={'index': 'MRI_ID'}, inplace=True)
    features_df.to_csv(output_csv, index=False)

    return features_df`}
          </CodeBlock>
        </div>
      </section>
    </div>
  );
};

export default FeatureExtraction;