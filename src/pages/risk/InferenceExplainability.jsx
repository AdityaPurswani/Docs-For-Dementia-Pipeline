import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const InferenceExplainability = () => {
  return (
    <div className="p-8 text-justify">
      <h1 className="text-3xl font-bold mb-6">Inference and Explainability</h1>

      {/* Inference Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Model Inference</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            Medical risk inference from clinical text requires a sophisticated understanding of both 
            machine learning principles and medical domain knowledge. The process involves converting 
            qualitative medical observations into quantitative risk assessments while maintaining 
            interpretability.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">Key Importance:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>Improved Diagnosis & Early Detection</li>
              <li>Personalized Treatment Plans</li>
              <li>Reduction of Human Error</li>
              <li>Cost-Efficiency & Resource Optimization</li>
             <li>Integration with Electronic Health Records (EHRs)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Single Report Analysis</h3>
          <p>
            For individual report analysis, the system analyzes medical reports using an AI model to predict 
            dementia risk efficiently and accurately. It first processes the report by breaking it into smaller 
            parts using a tokenizer, making it easier for the model to analyze. The prepared data is then fed
             into a trained AI model, which identifies important patterns and signs related to dementia. 
             The model generates a risk score between 0 and 100, where a higher score indicates a greater likelihood of dementia. 
             Based on this score, the system classifies the risk level as <span className='text-green-700'>Low (below 40), Moderate (40-74), or High (75 and above)</span>, providing clear insights for doctors. To ensure speed and accuracy, the system uses advanced computing techniques that optimize memory usage and processing efficiency. 
             This automated approach helps healthcare professionals make quicker and more informed decisions, improving early detection and patient care.
          </p>
          <br/>

          <CodeBlock language="python">
{`@torch.amp.autocast('cuda')
def analyze_report(self, medical_report):
    """
    Analyze a single medical report and return a risk score.
    
    Parameters:
    medical_report (str): The text of the medical report
    
    Returns:
    dict: Risk analysis results including score and confidence
    """
    self.model.eval()
    
    # Prepare input
    dataset = DementiaReportDataset([medical_report], tokenizer=self.tokenizer)
    loader = DataLoader(dataset, batch_size=1)
    
    with torch.no_grad():
        batch = next(iter(loader))
        input_ids = batch['input_ids'].to(self.device, non_blocking=True)
        attention_mask = batch['attention_mask'].to(self.device, non_blocking=True)
        
        outputs = self.model(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        
        risk_score = outputs.logits.squeeze().item() * 100

    # Determine risk level
    risk_level = 'Low'
    if risk_score >= 75:
        risk_level = 'High'
    elif risk_score >= 40:
        risk_level = 'Moderate'

    return {
        'risk_score': round(risk_score, 2),
        'risk_level': risk_level
    }`}
          </CodeBlock>

          <div className="bg-blue-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">Inference Features:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>Automatic mixed precision for efficient inference</li>
              <li>Non-blocking GPU data transfer</li>
              <li>Memory-efficient batch processing</li>
              <li>Risk level categorization based on scores</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Batch Processing</h3>
          <p>
          This function efficiently analyzes multiple medical reports at once using batch processing, which speeds up the process by grouping reports instead of analyzing them one by one. It first prepares the reports by converting them into a structured format using a tokenizer, making it easier for the AI model to understand. The reports are then processed in batches (default size of 4) and sent to the AI model running on a GPU for faster calculations. The results for all reports are collected and stored in a structured table (DataFrame) for easy access and further analysis. This method significantly improves efficiency, making it ideal for handling large numbers of reports quickly and accurately.
          </p>
          <br/>

          <CodeBlock language="python">
{`def analyze_batch(self, medical_reports, batch_size=4):
    """Analyze multiple medical reports efficiently using batching."""
    dataset = DementiaReportDataset(medical_reports, tokenizer=self.tokenizer)
    loader = DataLoader(
        dataset,
        batch_size=batch_size,
        pin_memory=True,
        num_workers=4
    )
    
    results = []
    self.model.eval()
    
    with torch.no_grad():
        for batch in tqdm(loader, desc="Analyzing reports"):
            # GPU optimization
            input_ids = batch['input_ids'].to(self.device, non_blocking=True)
            attention_mask = batch['attention_mask'].to(self.device, non_blocking=True)
            
            with torch.amp.autocast('cuda'):
                outputs = self.model(
                    input_ids=input_ids,
                    attention_mask=attention_mask
                )
            
            # Process results
            risk_scores = outputs.logits.squeeze().cpu().numpy() * 100
            
            for score in risk_scores:
                risk_level = 'Low'
                if score >= 75:
                    risk_level = 'High'
                elif score >= 40:
                    risk_level = 'Moderate'
                
                results.append({
                    'risk_score': round(float(score), 2),
                    'risk_level': risk_level
                })
    
    return pd.DataFrame(results)`}
          </CodeBlock>
        </div>
      </section>

      {/* Explainability Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Model Explainability</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          Model explainability is crucial in AI-driven medical applications because it builds <span className='text-green-700'>trust, transparency, and accountability</span> in decision-making. In healthcare, where AI models are used for diagnosing diseases, predicting risks, and recommending treatments, understanding how a model arrives at its conclusions is essential for both doctors and patients.
          </p>
          <div className="bg-green-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-green-900 mb-2">Key Importance:</h4>
            <ul className="list-disc pl-6 text-green-800">
              <li><strong>Trust & Adoption:</strong> Doctors and healthcare providers are more likely to use AI tools if they can understand and validate the model’s reasoning. Black-box models without explanations can lead to skepticism and reluctance in clinical practice.</li>
              <li><strong>Improved Decision-Making:</strong> Explainable models help doctors interpret AI-driven predictions, allowing them to combine model insights with their medical expertise for better decision-making.</li>
              <li><strong>Error Detection & Bias Reduction:</strong> Transparency helps in identifying potential biases, errors, or limitations in the model, reducing the risk of incorrect or unfair predictions.</li>
              <li><strong>Regulatory Compliance:</strong> Many healthcare regulations, such as GDPR and HIPAA, emphasize the need for interpretable AI to ensure ethical and legal compliance, particularly when dealing with sensitive patient data.</li>
             <li><strong>Patient Confidence & Ethical Responsibility:</strong> When AI suggests a high-risk diagnosis, patients deserve to understand why. Explainability helps doctors communicate AI-based findings in a way that reassures and informs patients.</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Context Importance</h3>
          <p>
          This function analyzes the importance of different medical terms in a given text by evaluating their severity. First, it extracts key medical contexts from the text using a severity analyzer, which identifies relevant medical phrases or terms. Then, for each extracted context, the function calculates a severity score, representing the significance or risk level associated with that term. These scores are stored in a list along with their corresponding contexts. Finally, the list is sorted in descending order based on the severity scores, ensuring that the most critical medical terms appear at the top.
          </p>
          <br/>

          <CodeBlock language="python">
{`def analyze_feature_importance(self, text):
    """Analyze importance of different medical terms."""
    # Extract medical contexts
    contexts = self.severity_analyzer.extract_medical_context(text)
    
    # Get severity scores for each context
    importance_scores = []
    for context in contexts:
        score = self.severity_analyzer.analyze_severity(context)
        importance_scores.append({
            'context': context,
            'score': score
        })
    
    # Sort by importance
    return sorted(
        importance_scores,
        key=lambda x: x['score'],
        reverse=True
    )`}
          </CodeBlock>

          <div className="bg-yellow-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-yellow-900 mb-2">Explainability Features:</h4>
            <ul className="list-disc pl-6 text-yellow-800">
              <li>
                <span className="font-semibold">Attention Analysis:</span> Visualize model focus
              </li>
              <li>
                <span className="font-semibold">Feature Importance:</span> Identify key medical terms
              </li>
              <li>
                <span className="font-semibold">Contextual Understanding:</span> Analyze term relationships
              </li>
              <li>
                <span className="font-semibold">Confidence Metrics:</span> Provide uncertainty estimates
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Text Highlighting for Medical Report Explainability</h3>
          <p>
          The reports are highlighted and color coded based on the context that are being taken as important and the context which are taken as less important. Where red means extremely important while detecting dementia and blue means not as important.
          </p>
          <br/>
          <CodeBlock language="python">
{`def analyze_report_with_full_highlighting(self, medical_report):
    """
    Analyze a medical report and highlight text with a color gradient 
    based on importance.
    """
    self.model.eval()
    
    # Split the report into sentences
    doc = self.initial_scorer.severity_analyzer.nlp(medical_report)
    sentences = [sent.text for sent in doc.sents]
    
    # Generate importance scores and color the text
    highlighted_html = ""
    for sentence in sentences:
        severity_score = self.initial_scorer.severity_analyzer.analyze_severity(sentence)
        # Normalize score to 0–255 for gradient
        normalized_score = int(severity_score * 255)
        color = f"rgb({normalized_score}, 0, {255 - normalized_score})"
        highlighted_html += f"<span style='background-color: {color}; padding: 2px; margin: 1px;'>{sentence}</span> "
    
    # Add legend
    legend_html = """
    <div style="margin-top: 20px; text-align: center;">
        <b>Importance Scale:</b>
        <div style="margin-top: 5px; display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span>Less Important</span>
            <div style="background: linear-gradient(to right, rgb(0, 0, 255), rgb(255, 0, 0)); 
                    width: 200px; height: 20px; border: 1px solid #ccc; border-radius: 4px;"></div>
            <span>Important</span>
        </div>
    </div>
    """
    
    return highlighted_html + legend_html`}
          </CodeBlock>
          <div className="bg-blue-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">Key Components:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>
                <span className="font-semibold">Sentence Splitting:</span> Uses spaCy to properly 
                segment medical text into sentences
              </li>
              <li>
                <span className="font-semibold">Severity Analysis:</span> Analyzes each sentence 
                independently for importance
              </li>
              <li>
                <span className="font-semibold">Color Mapping:</span> Converts severity scores to 
                RGB values (red = important, blue = less important)
              </li>
              <li>
                <span className="font-semibold">Visual Legend:</span> Provides a gradient scale 
                for interpretation
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            Here's an example of how to use the explainability visualization with a dummy medical report:
          </p>
          <br/>

          <CodeBlock language="python">
{`# Initialize the analyzer
analyzer = EnhancedDementiaRiskAnalyzer()

# Example medical report
example_report = """
Patient presents with mild cognitive impairment, showing occasional forgetfulness and minor difficulty with complex tasks. Recent MRI reveals minimal atrophy in the 
hippocampal region, which is concerning. Patient demonstrates significant difficulty with memory recall tests and shows marked disorientation during evening hours. 
Physical examination is otherwise normal with stable vital signs. Whilst non-specific this pattern is described in a younger onset Alzheimer's type dementia.
"""

# Analyze and display highlighted report
result = analyzer.analyze_report_with_full_highlighting(example_report)
display(HTML(result))`}
          </CodeBlock>

          <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
            <div className="space-y-1">
              <span className="bg-purple-700">Patient presents with mild cognitive impairment, showing occasional forgetfulness and minor difficulty with complex tasks.</span>{' '}
              <span className="bg-indigo-700">Recent MRI reveals minimal atrophy in the hippocampal region, which is concerning.</span>{' '}
              <span className="bg-red-700">Patient demonstrates significant difficulty with memory recall tests and shows marked disorientation during evening hours. </span>{' '}
              <span className="bg-blue-700">Physical examination is otherwise normal with stable vital signs.</span>{' '}
              <span className="bg-red-700">Whilst non-specific this pattern is described in a younger onset Alzheimer's type dementia.</span>
            </div>
            
            <div className="mt-6 text-center">
              <p className="font-bold mb-2">Importance Scale:</p>
              <div className="flex items-center justify-center gap-4">
                <span>Less Important</span>
                <div className="w-48 h-5 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded"></div>
                <span>Important</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-yellow-900 mb-2">Interpretation:</h4>
            <ul className="list-disc pl-6 text-yellow-800">
              <li>Red highlighting indicates sentences with high severity/importance</li>
              <li>Blue highlighting indicates less severe/important sentences</li>
              <li>The gradient intensity corresponds to the degree of importance</li>
              <li>Medical findings and abnormalities typically show higher importance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InferenceExplainability;