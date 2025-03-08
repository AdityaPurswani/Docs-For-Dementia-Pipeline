import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const DataImputation = () => {
  return (
    <div className="p-8 text-justify">
      <h1 className="text-3xl font-bold mb-6">Advanced Data Imputation</h1>
      
      {/* Introduction Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is Class-Aware Data Imputation?</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
          Class-aware data imputation is a technique used to fill in missing values in a dataset by taking into account the class labels of the data points, meaning it imputes missing values based on the specific characteristics of the class each data point belongs to, rather than treating all data points uniformly; this is particularly useful when dealing with imbalanced datasets where different classes may have distinct patterns of missing data. 
          When medical datasets have missing values, 
            we need reliable ways to estimate what those values might have been, based on the surrounding data.
            Our approach uses specialized class-aware imputation which recognizes that different diagnostic classes 
            may have different underlying patterns.
          </p>
          <p>
            The imputation pipeline includes several key strategies:
          </p>
          <ul className="mt-4 space-y-2">
            <li>1. <strong>Class-Specific KNN:</strong> Imputing using only data from the same class</li>
            <li>2. <strong>Similar-Class Borrowing:</strong> Using data from similar diagnostic classes when needed</li>
            <li>3. <strong>Value Variation:</strong> Adding controlled randomness to prevent identical values</li>
            <li>4. <strong>Statistical Bounds:</strong> Ensuring physiologically reasonable results</li>
          </ul>
        </div>
      </section>

      {/* Class-Specific KNN Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Class-Specific KNN Imputation</h2>
        
        {/* Theory Explanation */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Class-Specific Imputation</h3>
          <div className="text-blue-800">
            <p className="mb-4">
              Imagine you're trying to guess a person's age based on their health metrics. The relationship between
              health metrics and age would be different for athletes versus non-athletes. Similarly, medical biomarkers
              have different patterns across diagnostic classes (like Alzheimer's versus normal cognition), so we should
              impute missing values using only data from the same diagnostic group.
            </p>
            <p className="font-medium mt-4">Why is it important?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Preserves class-specific patterns and relationships</li>
              <li>Prevents blending of distinct diagnostic profiles</li>
              <li>Results in more physiologically accurate estimates</li>
            </ul>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`def knn_impute_by_class_with_variation(df, class_column, impute_columns, n_neighbors=5, 
                                       min_samples_required=2, variation_factor=0.1, 
                                       apply_bounds=True, random_state=42):
    """
    Apply KNN imputation separately within each class.
    
    Args:
        df (DataFrame): Input dataframe with missing values
        class_column (str): Column name containing class labels
        impute_columns (list): List of column names to impute
        n_neighbors (int): Number of neighbors for KNN imputation
        min_samples_required (int): Minimum non-missing values required for class-based imputation
        variation_factor (float): Factor to control amount of variation (0.1 = 10% variation)
        apply_bounds (bool): Whether to apply reasonable bounds to imputed values
        random_state (int): Random seed for reproducibility
    
    Returns:
        DataFrame: Dataframe with imputed values
    """
    # Set random seed
    np.random.seed(random_state)
    
    # Create a copy of the original dataframe to hold results
    result_df = df.copy()
    
    # Get unique class values (excluding NaN)
    classes = df[class_column].dropna().unique()
    print(f"Found {len(classes)} classes for imputation: {classes}")
    
    # Process each class separately
    for cls in classes:
        # Get rows belonging to this class
        class_mask = df[class_column] == cls
        subset = df[class_mask].copy()
        
        # Skip if no samples
        if len(subset) == 0:
            print(f"No samples for class '{cls}', skipping")
            continue
        
        # Apply imputation column by column
        imputer = KNNImputer(n_neighbors=min(n_neighbors, max(1, len(subset) - 1)), weights='distance')
        
        try:
            # Impute columns with data
            imputed_values = imputer.fit_transform(subset_numeric[valid_columns])
            
            # Update missing values in the result dataframe
            num_imputed = 0
            for col in valid_columns:
                missing_mask = subset_numeric[col].isna()
                if missing_mask.any():
                    # Update values with appropriate variation
                    missing_indices = subset[missing_mask].index

                    for i, idx in enumerate(missing_indices):
                            result_df.loc[idx, col] = varied_values[i]
                    else:
                        # No variation needed, use original imputed values
                        for idx in missing_indices:
                            result_df.loc[idx, col] = imputed_df.loc[idx, col]
                    
                    num_imputed += len(missing_indices)
            
            imputed_by_class[cls] = num_imputed
            total_imputed += num_imputed
            
            print(f"  - Successfully imputed {num_imputed} values for class '{cls}'")
        # If the data is not imputed then put that column of the particular class in failed_imputation_columns   
        except Exception as e:
            print(f"  - Error during imputation for class '{cls}': {e}")
            
            # Add all columns from this class to failed_imputation_columns
            if cls not in failed_imputation_columns:
                failed_imputation_columns[cls] = []
            for col in valid_columns:
                if col not in failed_imputation_columns[cls]:
                    failed_imputation_columns[cls].append(col)
`}</CodeBlock>
        </div>

        {/* Parameter Explanation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">class_column</p>
              <p className="text-gray-600">The column in your dataframe that contains the diagnostic class labels (e.g., 'Alzheimer's', 'MCI', 'Control').</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">impute_columns</p>
              <p className="text-gray-600">The list of columns containing values you want to impute (e.g., biomarker measurements, cognitive scores).</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">n_neighbors</p>
              <p className="text-gray-600">How many neighbors to use for each imputation. Higher values use more data points but might blur distinct patterns.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">min_samples_required</p>
              <p className="text-gray-600">Minimum number of non-missing values a class must have to attempt class-specific imputation.</p>
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
                  <p className="font-medium">Small Class Sizes:</p>
                  <p>If a class has very few samples, reduce n_neighbors or use similar-class borrowing (automatically handled).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Identical Imputed Values:</p>
                  <p>If imputed values are too similar, increase the variation_factor parameter to add more diversity.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Similar-Class Borrowing Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Similar-Class Borrowing</h2>
        
        {/* Theory Explanation */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Similar-Class Borrowing</h3>
          <div className="text-blue-800">
            <p className="mb-4">
              Sometimes a diagnostic class has too few samples to reliably impute missing values. Imagine having only
              one athlete in your dataset—you can't really determine patterns from just one person. In these cases,
              we can "borrow" information from similar classes. For example, mild cognitive impairment (MCI) might
              share some patterns with early Alzheimer's disease, making it a better source for borrowing than a 
              completely different condition.
            </p>
            <p className="font-medium mt-4">Why is it important?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Enables imputation for rare diagnostic classes</li>
              <li>Preserves more clinical relevance than global imputation</li>
              <li>Creates a fallback strategy when class-specific imputation isn't possible</li>
            </ul>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`def calculate_class_similarities(df, class_column, impute_columns):
    """
    Calculate similarity between different classes based on their feature distributions
    """
    classes = df[class_column].dropna().unique()
    similarities = {cls: {} for cls in classes}
    
    # Calculate class statistics
    class_stats = {}
    for cls in classes:
        class_mask = df[class_column] == cls
        class_data = numeric_df[class_mask]
        
        # Calculate mean and std for each column
        means = {col: class_data[col].mean() for col in impute_columns}
        stds = {col: class_data[col].std() for col in impute_columns}
        non_missing = {col: class_data[col].count() for col in impute_columns}
        
        class_stats[cls] = {
            'means': means,
            'stds': stds,
            'counts': non_missing
        }
    
    # Calculate similarity between each pair of classes
    for cls1 in classes:
        for cls2 in classes:
            if cls1 == cls2:
                similarities[cls1][cls2] = 1.0  # Perfect similarity with self
                continue
                
            # Find columns with sufficient data in both classes
            common_cols = [col for col in impute_columns 
                         if not pd.isna(stats1['means'][col]) 
                         and not pd.isna(stats2['means'][col])
                         and stats1['counts'][col] >= 2 
                         and stats2['counts'][col] >= 2]
            
            # Calculate normalized distances between means
            distances = []
            for col in common_cols:
                mean1, mean2 = stats1['means'][col], stats2['means'][col]
                col_range = all_values.max() - all_values.min() if len(all_values) > 0 else 1.0
                norm_diff = ((mean1 - mean2) / col_range) ** 2
                distances.append(norm_diff)
            
            # Convert distance to similarity score
            similarity = 1.0 / (1.0 + np.sqrt(np.mean(distances))) if distances else 0.0
            similarities[cls1][cls2] = similarity
            
    return similarities`}</CodeBlock>
        </div>
        <div className="mb-6">
          <CodeBlock language="python">
{`# Find similar classes for fallback
similar_classes = [(other_cls, sim) for other_cls, sim in class_similarities[cls].items() 
                  if other_cls != cls]
similar_classes = sorted(similar_classes, key=lambda x: x[1], reverse=True)

# Try to find a similar class with enough data for this column
for similar_cls, similarity in similar_classes:
    # Skip if similarity is too low
    if similarity < 0.4:  # Minimum similarity threshold
        continue
        
    # Get data for the similar class
    similar_mask = df[class_column] == similar_cls
    similar_subset = df[similar_mask].copy()
    
    # Check if similar class has enough data
    non_missing = similar_subset[col].count()
    if non_missing >= min_samples_required:
        print(f"Using class '{similar_cls}' (similarity={similarity:.3f}) for column '{col}'")
        
        # Create a temporary dataframe with both classes
        combined_df = pd.concat([similar_subset, subset])
        
        # Apply KNN imputation
        imputer = KNNImputer(n_neighbors=effective_k, weights='distance')
        imputed_values = imputer.fit_transform(combined_numeric)`}</CodeBlock>
        </div>

        {/* Parameter Explanation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">class_similarities</p>
              <p className="text-gray-600">A matrix containing similarity scores between each pair of diagnostic classes. Higher values indicate greater similarity.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">similarity threshold (0.4)</p>
              <p className="text-gray-600">Minimum similarity score required before a class can be used for borrowing. Prevents using completely unrelated classes.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">combined_df</p>
              <p className="text-gray-600">A temporary dataset combining the original class and the similar class to provide more data points for imputation.</p>
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
                  <p className="font-medium">Poor Class Similarity:</p>
                  <p>If no sufficiently similar classes are found, try lowering the similarity threshold (with caution) or adding more features for similarity calculation.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Inappropriate Borrowing:</p>
                  <p>If clinically dissimilar classes are being used, increase the similarity threshold or manually specify which classes can borrow from each other.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Value Variation Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Value Variation</h2>
        
        {/* Theory Explanation */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Value Variation</h3>
          <div className="text-blue-800">
            <p className="mb-4">
              In small classes, KNN imputation might assign the exact same value to multiple missing entries,
              which isn't physiologically realistic. Imagine if every 65-year-old patient in your dataset had 
              exactly identical blood pressure readings—this would be statistically unlikely. Our approach adds
              controlled random variation to imputed values to better mimic natural biological diversity.
            </p>
            <p className="font-medium mt-4">Why is it important?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Creates more realistic data distributions</li>
              <li>Prevents artificial clusters in downstream analysis</li>
              <li>Better represents natural biological variation</li>
            </ul>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`# Check if this is a small class that needs variation
needs_variation = len(subset) < 3 * min_samples_required

# Check if all imputed values are identical
unique_values = np.unique(imputed_col_values)
if len(unique_values) == 1 and len(imputed_col_values) > 1:
    # If we got identical values, definitely need variation
    needs_variation = True

# Add variation if needed
if needs_variation:
    # Get column statistics for variation
    col_values = subset_numeric[col].dropna()
    if len(col_values) > 1:
        col_std = col_values.std()
    elif col in global_stats:
        # Use global stats if class-specific not available
        col_std = global_stats[col]['std']
    else:
        # Default small variation
        col_std = abs(np.mean(imputed_col_values)) * 0.1 if np.mean(imputed_col_values) != 0 else 1.0
    
    # Ensure non-zero std
    if pd.isna(col_std) or col_std == 0:
        col_std = abs(np.mean(imputed_col_values)) * 0.1 if np.mean(imputed_col_values) != 0 else 1.0
    
    # Generate random variation (smaller for small classes to avoid extremes)
    variation_scale = col_std * variation_factor * 0.8
    noise = np.random.normal(0, variation_scale, size=len(imputed_col_values))
    
    # Add noise
    varied_values = imputed_col_values + noise`}</CodeBlock>
        </div>

        {/* Parameter Explanation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">needs_variation</p>
              <p className="text-gray-600">Boolean flag indicating whether to add variation. Automatically determined based on class size and uniqueness of imputed values.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">col_std</p>
              <p className="text-gray-600">Standard deviation of the column being imputed. Used to scale the variation appropriately for each feature.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">variation_factor (0.1-0.3)</p>
              <p className="text-gray-600">Controls the amount of variation added. A value of 0.1 means roughly 10% of the standard deviation is used for variation.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">variation_scale</p>
              <p className="text-gray-600">The actual standard deviation used for generating random noise, calculated as col_std * variation_factor * 0.8.</p>
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
                  <p className="font-medium">Too Much Variation:</p>
                  <p>If imputed values seem too scattered, decrease the variation_factor parameter (e.g., from 0.3 to 0.1).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Insufficient Variation:</p>
                  <p>If imputed values still appear too similar, increase the variation_factor parameter (e.g., from 0.1 to 0.2).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Extreme Values:</p>
                  <p>If variation creates unrealistic outliers, ensure apply_bounds is set to True to constrain values within reasonable limits.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Statistical Bounds Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Statistical Bounds</h2>
        
        {/* Theory Explanation */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Statistical Bounds</h3>
          <div className="text-blue-800">
            <p className="mb-4">
              When adding variation to imputed values, we need to ensure that the results remain physiologically 
              plausible. For example, many biomarkers cannot be negative, and values shouldn't fall too far outside 
              the normal range. Our approach applies statistical bounds based on the overall distribution of each 
              variable to ensure reasonable results.
            </p>
            <p className="font-medium mt-4">Why is it important?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Prevents physiologically impossible values (e.g., negative concentrations)</li>
              <li>Limits extreme outliers that could skew analysis</li>
              <li>Ensures imputed values remain within clinically plausible ranges</li>
            </ul>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`# Calculate global statistics for bounds
global_stats = {}
if apply_bounds:
    for col in impute_columns:
        if col in df.columns:
            col_values = pd.to_numeric(df[col], errors='coerce')
            global_stats[col] = {
                'mean': col_values.mean(),
                'std': col_values.std(),
                'min': col_values.min(),
                'max': col_values.max(),
                'q1': col_values.quantile(0.25) if col_values.count() > 0 else None,
                'q3': col_values.quantile(0.75) if col_values.count() > 0 else None
            }
            # Calculate reasonable min/max bounds using IQR
            if global_stats[col]['q1'] is not None and global_stats[col]['q3'] is not None:
                iqr = global_stats[col]['q3'] - global_stats[col]['q1']
                global_stats[col]['lower_bound'] = max(
                    global_stats[col]['min'], 
                    global_stats[col]['q1'] - 1.5 * iqr
                )
                global_stats[col]['upper_bound'] = min(
                    global_stats[col]['max'], 
                    global_stats[col]['q3'] + 1.5 * iqr
                )
            else:
                global_stats[col]['lower_bound'] = global_stats[col]['min']
                global_stats[col]['upper_bound'] = global_stats[col]['max']`}</CodeBlock>
        </div>
        <div className="mb-6">
          <CodeBlock language="python">
{`# Apply bounds to varied values
if apply_bounds and col in global_stats:
    # Handle non-negative columns
    should_be_non_negative = global_stats[col]['min'] >= 0 or any(
        kw in col.lower() for kw in ['tau', 'beta', 'total', 'score']
    )
    
    if should_be_non_negative:
        # Fix negative values by reflecting them
        negative_mask = varied_values < 0
        if np.any(negative_mask):
            # Use reflection with small random adjustment
            varied_values[negative_mask] = abs(varied_values[negative_mask]) * np.random.uniform(0.95, 1.05, size=np.sum(negative_mask))
    
    # Apply general bounds
    lower_bound = global_stats[col]['lower_bound']
    upper_bound = global_stats[col]['upper_bound']
    varied_values = np.clip(varied_values, lower_bound, upper_bound)`}</CodeBlock>
        </div>

        {/* Parameter Explanation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Parameter Explanation</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">apply_bounds</p>
              <p className="text-gray-600">Boolean flag controlling whether statistical bounds should be applied to imputed values. Default is True.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">IQR-based bounds</p>
              <p className="text-gray-600">Uses interquartile range (IQR) to calculate reasonable lower and upper bounds (Q1 - 1.5*IQR to Q3 + 1.5*IQR), a standard approach for outlier detection.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">should_be_non_negative</p>
              <p className="text-gray-600">Automatically detects columns that should never have negative values, based on column names (e.g., 'tau', 'score') or observed data (min ≥ 0).</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">negative value handling</p>
              <p className="text-gray-600">For columns that should be non-negative, negative values are "reflected" to positive values with a small random adjustment to prevent duplicates.</p>
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
                  <p className="font-medium">Too Restrictive Bounds:</p>
                  <p>If bounds are too tight, you can adjust the IQR multiplier from 1.5 to a higher value like 2.0 or 3.0 for wider bounds.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Missing Non-negative Detection:</p>
                  <p>If a column should be non-negative but isn't detected automatically, add its keyword to the check: <code>kw in col.lower() for kw in ['tau', 'beta', 'total', 'score', 'your_keyword']</code></p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Bounded Variables with Natural Outliers:</p>
                  <p>For values with legitimate outliers (e.g., extreme lab values in certain conditions), consider setting apply_bounds=False for those specific columns.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Example Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Implementation</h3>
          <CodeBlock language="python">
{`# Load the dataset
file_path = 'cognid_processed.xlsx'
df = pd.read_excel(file_path)

# Define columns to impute
impute_columns = [
    'Total Tau pg/ml (146-595)', 
    'Phospho Tau pg/ml (24-68)', 
    'A Beta 142 pg/ml (627-1322)', 
    'Total', 
    'Attention', 
    'mem', 
    'fluency', 
    'language', 
    'visuospatial'
]

# Apply enhanced KNN imputation with variation for small classes
df_imputed = knn_impute_by_class_with_variation(
    df, 
    class_column='Completed Diagnosis',  # Column containing diagnostic classes
    impute_columns=impute_columns,       # Columns to impute
    n_neighbors=5,                       # Number of neighbors for KNN
    min_samples_required=2,              # Minimum samples needed within a class
    variation_factor=0.3,                # 30% variation based on standard deviation
    apply_bounds=True,                   # Apply reasonable bounds to prevent extreme values
    random_state=42                      # For reproducibility
)

# Save the imputed data
df_imputed.to_excel('cognid_knn_imputed_with_variation.xlsx', index=False)

# Calculate imputation success rate
original_missing = df[impute_columns].isna().sum().sum()
imputed_missing = df_imputed[impute_columns].isna().sum().sum()
success_rate = 100 * (1 - imputed_missing/original_missing)
print(f"Imputation success rate: {success_rate:.2f}%")`}</CodeBlock>
        </div>

</section>
</div>
  );
};

export default DataImputation