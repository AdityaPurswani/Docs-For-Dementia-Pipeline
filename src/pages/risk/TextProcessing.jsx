// src/pages/risk/TextProcessing.jsx
import React from "react";
import CodeBlock from "../../components/CodeBlock";

const TextProcessing = () => {
    return (
      <div className="p-8 text-justify">
        <h1 className="text-3xl font-bold mb-6">Text Processing in Medical Report Analysis</h1>
  
        {/* Core Theory */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Core Theory</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              The text processing module is built on three fundamental concepts in medical text analysis. These concepts 
              allow us to extract meaningful information from clinical data, which is crucial for various tasks like 
              diagnosis, clinical decision support, and medical research.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Natural Language Processing for Medical Text</h3>
            <p>
              Medical text processing involves specialized NLP techniques that are designed to understand medical terminology, 
              contextual relationships, and clinical language patterns. In standard NLP, models focus on general language 
              understanding. However, medical texts contain domain-specific vocabulary, abbreviations, and complex clinical contexts 
              that require specialized models. We use SpaCy with a medical domain model for advanced linguistic analysis.
            </p>
            <div className="bg-green-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-green-900 mb-2">Why use SpaCy with medical domain models?</h4>
              <ul className="list-disc pl-6 text-green-800">
                <li>Medical text has a distinct vocabulary that general NLP models may not be able to handle properly.</li>
                <li>Contextual understanding of medical terms is essential to extract accurate clinical information.</li>
                <li>Pre-trained models in the medical domain such as `en_core_web_lg` are designed to handle medical terminology.</li>
              </ul>
            </div>
            <br/>
            <CodeBlock language="python">
  {`# Loading specialized medical NLP model
self.nlp = spacy.load('en_core_web_lg')

# Processing medical text
doc = self.nlp(medical_text)

# Analyzing linguistic features
for token in doc:
    # Check for medical terms
    if self._is_medical_finding(token):
        # Extract context window
        context = doc[max(0, token.i - 5):min(len(doc), token.i + 5)]`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2. Medical Domain Embeddings</h3>
            <p>
              In order to capture domain-specific semantic relationships between medical terms and concepts, we utilize embeddings 
              trained on medical literature. These embeddings help represent clinical terms in a vector space that captures their 
              meanings more accurately than general-purpose embeddings. We use **Sentence Transformers**, which generate semantic 
              representations of entire medical texts for downstream tasks.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Why use medical domain embeddings?</h4>
              <ul className="list-disc pl-6 text-blue-800">
                <li>Traditional word embeddings fail to capture the rich, specific meaning of medical terms.</li>
                <li>Medical embeddings are trained on extensive biomedical literature, making them highly effective for clinical text processing.</li>
                <li>They allow us to better understand medical terminology and jargon that would otherwise be ambiguous in general models.</li>
                </ul>
            </div>
            <br/>
            <CodeBlock language="python">
  {`# Initialize medical domain transformer
self.sentence_model = SentenceTransformer('pritamdeka/S-PubMedBert-MS-MARCO')

# Generate embeddings for medical text
embeddings = []
for i in range(0, len(texts), batch_size):
    batch_texts = texts[i:i + batch_size]
    with torch.amp.autocast('cuda'):
        batch_embeddings = self.sentence_model.encode(
            batch_texts,
            convert_to_tensor=True,
            show_progress_bar=False
        )
    embeddings.append(batch_embeddings.cpu().numpy())  # Move to CPU for sklearn
        
embeddings = np.vstack(embeddings)`}
            </CodeBlock>
  
            <div className="bg-blue-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Why Medical Domain Embeddings?</h4>
              <ul className="list-disc pl-6 text-blue-800">
                <li>Better understanding of medical terminology</li>
                <li>Capture relationships between medical concepts</li>
                <li>Trained on biomedical literature</li>
                <li>Understands medical abbreviations and jargon</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">3. Contextual Analysis</h3>
            <p>
              Medical reports often involve complex temporal relationships, contextual clues, and clinical implications that require 
              both local and global analysis. This includes understanding the dependencies between terms within sentences and across 
              different sections of a report. In order to extract meaningful insights, we need to extract context from medical terms 
              as well as their surrounding text. We use sentence parsing to understand the relationships and importance of terms 
              within their specific context.
            </p>
            <div className="bg-yellow-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-yellow-900 mb-2">Why is contextual analysis critical?</h4>
              <ul className="list-disc pl-6 text-yellow-800">
                <li>Clinical terms often need to be understood in context to make accurate medical decisions.</li>
                <li>Terms like "probable" or "likely" affect diagnosis, and understanding their context is crucial.</li>
                <li>Dependencies between terms can signify relationships (e.g., cause and effect) that need to be understood.</li>
                </ul>
            </div>
            <br/>
            <CodeBlock language="python">
  {`def extract_medical_context(self, text):
    """Extract medical terms and their context."""
    doc = self.nlp(text)
    medical_contexts = []

    for sent in doc.sents:
        # Get span window around medical terms
        medical_spans = []
        for token in sent:
            if self._is_medical_finding(token):
                # Extract local context
                start = max(0, token.i - 5)
                end = min(len(doc), token.i + 5)
                medical_spans.append(doc[start:end].text)
                
        if medical_spans:
            medical_contexts.extend(medical_spans)`}
            </CodeBlock>
  
            <div className="bg-yellow-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-yellow-900 mb-2">Context Analysis Features:</h4>
              <ul className="list-disc pl-6 text-yellow-800">
                <li>Local context windows around medical terms</li>
                <li>Sentence-level analysis</li>
                <li>Dependency parsing for term relationships</li>
                <li>Term importance weighting</li>
              </ul>
            </div>
          </div>
            
        </section>
  
        {/* Dataset Processing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dataset Processing Theory</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Dataset processing in medical text involves creating efficient, tokenized datasets that can be used for 
              model training and evaluation. We leverage PyTorch's `Dataset` class for efficient data loading and preprocessing. 
              The dataset is tokenized into smaller units (words or subwords) so that it can be processed efficiently during 
              model training. Batching allows us to feed multiple samples into the model at once, which speeds up computation.
            </p>
            <br/>
  
            <CodeBlock language="python">
  {`class DementiaReportDataset(Dataset):
      def __init__(self, texts, labels=None, tokenizer=None, max_length=512):
          self.texts = texts
          self.labels = labels
          self.tokenizer = tokenizer
          self.max_length = max_length
  
      def __getitem__(self, idx):
          text = str(self.texts[idx])
          # Tokenize with medical domain tokenizer
          encoding = self.tokenizer(
              text,
              add_special_tokens=True,
              max_length=self.max_length,
              padding='max_length',
              truncation=True,
              return_attention_mask=True,
              return_tensors='pt'
          )
  
          item = {
              'input_ids': encoding['input_ids'].flatten(),
              'attention_mask': encoding['attention_mask'].flatten()
          }
  
          if self.labels is not None:
              item['labels'] = torch.tensor(self.labels[idx], dtype=torch.float)
  
          return item`}
            </CodeBlock>
  
            <div className="bg-green-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-green-900 mb-2">Dataset Processing Features:</h4>
              <ul className="list-disc pl-6 text-green-800">
                <li>Efficient batching for GPU processing</li>
                <li>Dynamic padding for variable-length texts</li>
                <li>Attention mask generation</li>
                <li>Label handling for supervised learning</li>
              </ul>
            </div>
          </div>
        </section>
  
        {/* Processing Pipeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Processing Pipeline</h2>
          <p className="text-gray-600 mb-6">
            The complete processing pipeline combines multiple steps to prepare medical text for analysis:
          </p>
  
          <CodeBlock language="python">
  {`def preprocess_text(self, text: str) -> str:
      """Clean and standardize report text"""
      # Remove multiple spaces
      text = ' '.join(text.split())
      
      # Remove special characters while preserving medical symbols
      text = text.replace('\\n', ' ').replace('\\r', ' ')
      
      # Convert to lowercase
      text = text.lower()
      
      return text
  
  def prepare_batch(self, texts, batch_size=32):
      """Prepare batch for model processing"""
      processed_texts = [self.preprocess_text(text) for text in texts]
      
      # Create dataset
      dataset = DementiaReportDataset(
          processed_texts,
          tokenizer=self.tokenizer
      )
      
      # Create dataloader
      loader = DataLoader(
          dataset,
          batch_size=batch_size,
          pin_memory=True,
          num_workers=4
      )
      
      return loader`}
          </CodeBlock>
  
          <div className="bg-purple-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-purple-900 mb-2">Pipeline Components:</h4>
            <ol className="list-decimal pl-6 text-purple-800">
              <li>Text cleaning and standardization</li>
              <li>Medical term extraction</li>
              <li>Context window generation</li>
              <li>Batch preparation for model</li>
              <li>GPU optimization</li>
            </ol>
          </div>
        </section>
      </div>
    );
  };
  
  export default TextProcessing;
