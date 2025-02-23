import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import ModelDiagram from '../../components/ModelDiagram';

const ModelArchitecture = () => {
  return (
    <div className="p-8 text-justify">
      <h1 className="text-3xl font-bold mb-6">Model Architecture: Medical Risk Analysis</h1>

      {/* Foundation and Base Model */}
      <section className="mb-12">
        
        <h2 className="text-2xl font-semibold mb-4">Foundation and Base Model</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          The model architecture is built on PubMedBERT, which is specifically designed for biomedical language 
          understanding. PubMedBERT was chosen because it is pre-trained on a vast corpus of biomedical literature, 
          making it particularly effective for understanding medical terminology and concepts. Unlike traditional BERT
           models, which are trained on general English text (such as Wikipedia and BooksCorpus), PubMedBERT is 
           exclusively trained on biomedical and clinical texts, allowing it to grasp domain-specific nuances, 
           abbreviations, and complex medical relationships with greater accuracy.

        One of the major advantages of using PubMedBERT is its ability to handle contextual variations in medical 
        language, including negations, multi-word medical terms, and disease-related correlations. This makes it 
        highly valuable for clinical text classification, information retrieval, medical named entity recognition 
        (NER), and predictive modeling in healthcare applications.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mt-4 mb-4">
            <h4 className="font-medium text-blue-900 mb-2">PubMedBERT Advantages:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>Pre-trained on PubMed abstracts and full-text articles</li>
              <li>Specialized vocabulary for medical terms</li>
              <li>Better understanding of medical relationships and contexts</li>
              <li>Strong performance on biomedical NLP tasks</li>
            </ul>
          </div>

          <CodeBlock language="python">
{`def _create_model(self):
    # Load PubMedBERT as base model
    model = AutoModelForSequenceClassification.from_pretrained(
        'microsoft/BiomedNLP-PubMedBert-base-uncased-abstract-fulltext',
        num_labels=1,
        problem_type="regression"
    )
    
    hidden_size = model.config.hidden_size  # 768 for BERT base`}
          </CodeBlock>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 mt-4 text-blue-800">
            <h4 className="font-semibold text-blue-900 mb-2">Importance of BERT in Medical AI:</h4>
            <p classname="text-blue-800">BERT-based models have revolutionized medical AI due to their ability to understand context in clinical and biomedical texts. Some key advantages include:</p>
            <ul className="list-disc pl-6 text-blue-800">
              <li><strong>Better Medical Language Understanding:</strong> Traditional NLP models often fail to capture the complexity of medical language, such as abbreviations, terminology, and negations (e.g., "no evidence of disease").
              PubMedBERT is trained specifically on biomedical texts, making it more accurate in understanding clinical notes, research papers, and diagnostic reports.</li>
              <li><strong>Effective for Medical Text Classification & Extraction:</strong>Can classify patient records, disease symptoms, or extract key medical insights from reports.
              Example use case: Classifying radiology reports as "normal" or "abnormal".</li>
              <li><strong>Predictive Modeling & Disease Risk Assessment:</strong> Since the model is used for regression, it can predict disease severity scores or patient risk levels based on textual descriptions.</li>
              <li><strong>Enhanced Performance Over General BERT:</strong>Standard BERT is trained on generic English text (Wikipedia & Books), but PubMedBERT is trained on millions of biomedical documents, making it more domain-specific.
              Example: It understands that "BP" in a medical context refers to "blood pressure", not "business process".</li>
            </ul>
          </div>
      </section>

      {/* Custom Architecture Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Custom Architecture Components</h2>
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-xl font-semibold mt-6 mb-3">1. Risk Attention Mechanism</h3>
          <p>
  The <span className="text-yellow-800">Risk Attention mechanism</span> is a specialized <span className="text-yellow-800">multi-head attention layer</span> designed to focus on 
  risk-relevant aspects of medical text, optimizing <span className="text-yellow-800">transformer-based models</span> for medical risk assessment. 
  It employs <span className="text-yellow-800">multi-head attention</span> to capture subtle yet 
  significant patterns in clinical narratives, ensuring the model can analyze multiple <span className="text-yellow-800">risk factors</span> simultaneously. 
  The inclusion of layer normalization stabilizes learning by preventing <span className="text-yellow-800">vanishing or exploding gradients</span>, improving 
  generalization across medical datasets. A <span className="text-yellow-800">residual connection</span> allows the model to retain 
  original input features alongside <span className="text-yellow-800">attention-based transformations</span>, reducing 
  information loss and enhancing <span className="text-yellow-800">long-term dependency understanding</span>. Additionally, 
 dropout regularization prevents overfitting, making the model more robust when working with limited or imbalanced medical data. This mechanism 
  is particularly useful in predicting disease progression, identifying high-risk patients, and enhancing medical 
  NLP models by prioritizing key information in <span className="text-yellow-800">radiology reports</span>, <span className="text-yellow-800">electronic health records (EHRs)</span>, and <span className="text-yellow-800">clinical notes</span>.
</p>

          <br/>


          <CodeBlock language="python">
{`class RiskAttention(nn.Module):
    def __init__(self, d_model, num_heads=4, dropout=0.1):
        super().__init__()
        # Multi-head attention for risk assessment
        self.attention = nn.MultiheadAttention(d_model, num_heads, dropout=dropout)
        self.norm = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        residual = x
        x = self.norm(x)
        x, _ = self.attention(x, x, x)  # Self-attention mechanism
        x = self.dropout(x)
        return x + residual  # Residual connection`}
          </CodeBlock>

          <div className="bg-yellow-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-yellow-900 mb-2">Risk Attention Features:</h4>
            <ul className="list-disc pl-6 text-yellow-800">
              <li>Multi-head attention allows focus on different risk aspects</li>
              <li>Layer normalization for training stability</li>
              <li>Residual connections to maintain information flow</li>
              <li>Dropout for regularization</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Risk MLP Layer</h3>
          <p>
  The <span className="text-yellow-800">Risk MLP (Multi-Layer Perceptron)</span> layer is a crucial component designed to 
  process attention outputs through a <span className="text-yellow-800">two-layer feed-forward network</span>, enabling the 
  model to capture <span className="text-yellow-800">complex, non-linear relationships</span> in medical data. The first 
  linear layer expands the feature space to a <span className="text-yellow-800">higher-dimensional representation 
  (d_ff = 2048)</span> before applying the <span className="text-yellow-800">GELU (Gaussian Error Linear Unit) activation</span>, 
  which improves gradient flow and enhances learning efficiency, particularly in deep neural networks. A 
  <span className="text-yellow-800">dropout mechanism</span> is integrated to <span className="text-yellow-800">prevent overfitting</span>, 
  ensuring the model remains robust when handling diverse medical datasets. The second linear layer projects the 
  features back to their <span className="text-yellow-800">original dimension</span>, allowing for efficient information 
  transformation. Additionally, <span className="text-yellow-800">layer normalization</span> stabilizes training and 
  maintains <span className="text-yellow-800">numerical consistency across batches</span>, while the <span className="text-yellow-800">residual connection</span> preserves the original 
  input features, aiding in <span className="text-yellow-800">gradient propagation</span> and reducing information loss.
</p>

          <br/>

          <CodeBlock language="python">
{`class RiskMLP(nn.Module):
    def __init__(self, d_model, d_ff=2048, dropout=0.1):
        super().__init__()
        # Two-layer feed-forward network
        self.w1 = nn.Linear(d_model, d_ff)
        self.w2 = nn.Linear(d_ff, d_model)
        self.gelu = nn.GELU()  # GELU activation for better gradient flow
        self.dropout = nn.Dropout(dropout)
        self.norm = nn.LayerNorm(d_model)

    def forward(self, x):
        residual = x
        x = self.norm(x)
        x = self.gelu(self.w1(x))
        x = self.dropout(x)
        x = self.w2(x)
        x = self.dropout(x)
        return x + residual`}
          </CodeBlock>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Risk Transformer Block</h3>
          <p>
  The <span class="text-yellow-800">Risk Transformer Block</span> is a fundamental building unit 
  designed for <span class="text-yellow-800">medical risk assessment</span>, combining both <span class="text-yellow-800">attention mechanisms</span> and <span class="text-yellow-800">feed-forward processing</span> to enhance the model’s ability to analyze 
  complex clinical data. This block first applies an <span class="text-yellow-800">attention mechanism</span> 
  to focus on key risk factors within medical text, ensuring that significant patterns in patient records, 
  radiology reports, and electronic health records (EHRs) are effectively captured. Following this, a  <span class="text-yellow-800">feed-forward network</span> refines the extracted information, transforming 
  it into meaningful representations that aid in medical decision-making.By integrating these two components, the <span class="text-yellow-800">Risk Transformer Block</span> enables 
  the model to process medical narratives more accurately, improving <span class="text-yellow-800">disease progression modeling, patient risk stratification, and predictive analytics</span>. 
          </p>
          <br/>

          <CodeBlock language="python">
{`class RiskTransformerBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = RiskAttention(d_model, num_heads, dropout)
        self.mlp = RiskMLP(d_model, d_ff, dropout)

    def forward(self, x):
        x = self.attention(x)
        x = self.mlp(x)
        return x`}
          </CodeBlock>
        </div>
      </section>

      {/* Complete Model Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Complete Model Architecture</h2>
        <div>
          <ModelDiagram/>
          <p className='text-center'> Fiigure: Flow of the Model Architechture</p>
          </div>
          <br/>
        <div className="prose max-w-none text-gray-600">
          <p>
          The complete model architecture integrates the base PubMedBERT model with a custom risk assessment framework,
           enhancing its ability to analyze medical text for risk prediction and clinical decision support. 
           This architecture leverages biomedical language understanding while incorporating transformer-based deep 
           learning techniques to improve medical risk assessment performance. It begins with PubMedBERT, a specialized 
           BERT variant pre-trained on biomedical literature, ensuring a strong grasp of medical terminology, abbreviations, 
           and domain-specific linguistic structures. To enhance the model’s predictive power, the default classification head is replaced with a linear 
           projection layer, reducing the BERT hidden size (768) to 256 dimensions while preserving essential 
           information. Layer normalization is applied to stabilize training and prevent covariate shifts. The 
           core component of the model is the RiskTransformerBlock, which introduces multi-head self-attention 
           and feed-forward layers designed for medical risk factor extraction. Two consecutive transformer 
           blocks are incorporated, each utilizing multi-head attention (4 heads) to capture complex dependencies, 
           feed-forward layers (hidden size 512) for deeper feature extraction.
          </p>
          <br/>

          <CodeBlock language="python">
{`def _create_model(self):
    # Use PubMedBERT as base model
    model = AutoModelForSequenceClassification.from_pretrained(
        self.model_name,
        num_labels=1,
        problem_type="regression"
    )

    hidden_size = model.config.hidden_size  # 768 for BERT base
    
    # Create new architecture with correct dimensions
    model.classifier = nn.Sequential(
        nn.Linear(hidden_size, 256),       # Dimensionality reduction
        nn.LayerNorm(256),                 # Normalization for stability
        RiskTransformerBlock(              # First transformer block
            d_model=256,
            num_heads=4,
            d_ff=512,
            dropout=0.2
        ),
        RiskTransformerBlock(              # Second transformer block
            d_model=256,
            num_heads=4,
            d_ff=512,
            dropout=0.2
        ),
        nn.Linear(256, 64),               # Further dimensionality reduction
        nn.GELU(),                        # Non-linear activation
        nn.LayerNorm(64),                 # Final normalization
        nn.Dropout(0.2),                  # Regularization
        nn.Linear(64, 1),                 # Output layer
        nn.Sigmoid()                      # Scale to [0,1] range
    )

    return model`}
          </CodeBlock>

          <div className="bg-green-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-green-900 mb-2">Architecture Features:</h4>
            <ul className="list-disc pl-6 text-green-800">
              <li>
                <span className="font-semibold">Dimensionality Processing:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Initial reduction from 768 to 256 dimensions</li>
                  <li>Intermediate processing at 256 dimensions</li>
                  <li>Final reduction to 64 dimensions before output</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Multi-stage Transformation:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Two transformer blocks for deep feature extraction</li>
                  <li>Each block combines attention and feed-forward processing</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Regularization Techniques:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Layer normalization at multiple stages</li>
                  <li>Dropout layers (0.2 rate) for preventing overfitting</li>
                  <li>Residual connections in transformer blocks</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelArchitecture;