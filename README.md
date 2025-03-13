# Medical Image Analysis Documentation

## Overview
Neurodegenerative disorders(ND) such as Alzheimer's Dementia(AD) and Fronto-Temporal Dementia(FTD) present significant challenges in early diagnosis. The Cognitive and Neuroimaging in Neurodegenerative Disorders(CogNID) study provides a comprehensive dataset of 450 patients, including cognitive evaluations, MRI-scans, and clinical biomarkers. Our research develops an AI-driven framework for early detection of dementia by integrating multimodal data.

Our comprehensive AI-driven methodology integrates both MRI data and clinical text-reports to analyse neurodegenerative disorders. MRI-scans are processed to extract volumetric data from brain-structures affected by neurodegeneration. Initially, FSL's-BET tool performs skull stripping to precisely remove non-brain tissues. The resulting brain extractions undergo intensity normalization to standardize voxel data addressing inter-scanner variability common in clinical datasets. Bias-field correction follows using FSL's-FAST algorithm to eliminate intensity non-uniformities. These pre-processed images are registered to the standard MNI152 template using ANTs'-SyN transformation ensuring structural consistency across scans for improved analysis.

Atlas-based segmentation is applied on these scans leveraging Harvard-Oxford cortical/subcortical atlases identifying 27 brain regions implicated in neurodegeneration, particularly focusing on structures like the hippocampus. From these segmented regions, the system computes multiple quantitative biomarkers: volumetric measurements using efficient integral image approaches, surface area calculations, and advanced shape descriptors including compactness, sphericity, and eccentricity.

The system processes radiology reports using an NLP pipeline based on PubMedBERT, leveraging domain-specific embeddings for medical text analysis. Text-processing includes context-aware tokenization, medical-entity recognition, and dependency parsing to understand negations and syntactic relationships to extract relevant context for analyses. BART-based classifiers generate initial risk contexts, which are further refined through clustering and severity rating. K-means clustering (k=3) identifies report similarity patterns, and final risk scores are computed as a weighted sum of severity and cluster-risk. The model employs stacked transformer blocks with 4-head attention to analyse complex clinical language, ensuring robust contextual understanding. Training results demonstrated stable learning with consistent loss reduction across multiple epochs, enhancing risk assessment accuracy ensuring successful development of the pipeline.


## Website Structure

### Getting Started
- Installation guide
- Quick start tutorial
- Basic setup instructions

### MRI Analysis
- Loading Images
- Preprocessing techniques
- Segmentation methods
- Visualization tools
- Feature Extraction

### Risk Analysis
- Text Processing
- Severity Analysis
- Model Architecture
- Training Process
- Inference and Explainability

### Advanced Topics
- Batch Processing
- Advanced Data Imputation
- Custom Models

## Features

### Interactive Documentation
- Clean and intuitive navigation
- Code examples with syntax highlighting
- Detailed explanations of concepts
- Step-by-step guides

### Technical Features
- Responsive design
- Fast search functionality
- Mobile-friendly layout
- Code copying capability

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack
- React
- Tailwind CSS
- Code syntax highlighting
- Markdown processing

## Contributing
We welcome contributions to improve the documentation. Please see our contributing guidelines for more details.

## Feedback
If you find any issues or have suggestions for improvement, please open an issue in this repository.

## License
This documentation is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or concerns, please reach out to us through:
- GitHub Issues
- Email: psxap13@nottingham.ac.uk
