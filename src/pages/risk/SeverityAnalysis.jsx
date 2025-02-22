import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const SeverityAnalysis = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Severity Analysis in Medical Reports</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <div className="prose max-w-none text-gray-600 text-justify">
          <p>
            Medical reports contain vital information about patient conditions, diagnoses, and potential risks. 
            Analyzing the severity of medical conditions from these reports is crucial for several reasons. In 
            modern healthcare systems, where thousands of medical reports are generated daily, manual review 
            of each report becomes impractical and potentially dangerous due to time constraints and human error.
          </p>
          <div className="bg-orange-50 rounded-lg p-6 mt-4 text-justify">
            <h4 className="font-medium text-orange-900 mb-2">Clinical Impact:</h4>
            <ul className="list-disc pl-6 text-orange-800">
              <li>
                <span className="font-semibold">Triage Optimization:</span> Helps prioritize patient care by 
                automatically identifying severe cases that require immediate attention
              </li>
              <li>
                <span className="font-semibold">Risk Stratification:</span> Enables healthcare providers to 
                stratify patient populations based on condition severity
              </li>
              <li>
                <span className="font-semibold">Clinical Decision Support:</span> Provides quantitative severity 
                assessments to support clinical decision-making
              </li>
              <li>
                <span className="font-semibold">Early Warning System:</span> Identifies potentially serious 
                conditions early by analyzing subtle indicators
              </li>
            </ul>
          </div>
          <p className="mt-4">
            Automated severity analysis helps healthcare providers by:
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mt-4 ">
            <ul className="list-disc pl-6 text-blue-800">
              <li>
                <span className="font-semibold">Early Detection:</span> Identifying high-risk cases that require 
                immediate attention, potentially saving lives through early intervention
              </li>
              <li>
                <span className="font-semibold">Resource Optimization:</span> Helping healthcare facilities 
                allocate resources efficiently by prioritizing severe cases
              </li>
              <li>
                <span className="font-semibold">Quality Assurance:</span> Providing a standardized approach to 
                assess medical report severity, reducing variability in interpretations
              </li>
              <li>
                <span className="font-semibold">Clinical Decision Support:</span> Assisting healthcare 
                professionals with data-driven insights for better decision-making
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Components: Severity Analyzer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Severity Analyzer Implementation</h2>
        <div className="prose max-w-none text-gray-600 text-justify">
          <p>
            The SeverityAnalyzer class forms the core of our analysis system. It combines multiple NLP 
            techniques to understand and evaluate the severity of medical conditions described in text. 
            Let's break down each component and understand its significance.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Initialization and Model Loading</h3>
          <p classname='mb-4'>
          The <strong className='text-green-800'>SeverityAnalyzer</strong> class analyzes medical text severity using NLP techniques. 
          It employs <strong className='text-green-800'>SpaCy</strong> <code>(en_core_web_lg)</code> for linguistic processing, a <strong className='text-green-900'>medical sentence transformer</strong> <code>(pritamdeka/S-PubMedBert-MS-MARCO)</code> 
          for contextual embeddings, and a <strong className='text-green-800'>zero-shot classifier</strong> <code>(facebook/bart-large-mnli)
            </code> for severity classification. GPU support is enabled for faster processing. 
            This combination allows for accurate and scalable medical text analysis without predefined labels, 
            making it effective for various severity assessment tasks.
          </p>
          <br/>

          <CodeBlock language="python">
{`class SeverityAnalyzer:
    def __init__(self):
        # Load SpaCy model for linguistic analysis
        self.nlp = spacy.load('en_core_web_lg')
        
        # Load medical domain sentence transformer
        self.sentence_model = SentenceTransformer('pritamdeka/S-PubMedBert-MS-MARCO')
        
        # Initialize zero-shot classifier with GPU support
        self.zero_shot_classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli",
            device=0 if torch.cuda.is_available() else -1
        )`}
          </CodeBlock>

          <div className="bg-green-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-green-900 mb-2">Model Components:</h4>
            <ul className="list-disc pl-6 text-green-800">
              <li>
                <span className="font-semibold">SpaCy Model:</span> Provides linguistic analysis including 
                part-of-speech tagging, dependency parsing, and named entity recognition
              </li>
              <li>
                <span className="font-semibold">Sentence Transformer:</span> Specialized for medical domain, 
                converts text into meaningful vector representations
              </li>
              <li>
                <span className="font-semibold">Zero-shot Classifier:</span> Enables flexible classification 
                without requiring specific training for each condition
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-justify">2. Medical Context Extraction</h3>
          <p>
          The <strong className='text-red-800'>extract_medical_context</strong> method identifies and extracts medical terms along with 
          their surrounding context. It uses <strong className='text-red-800'>SpaCy</strong> to segment text into sentences and analyze words.
         It follows these steps:
          </p>
          <div className="bg-red-50 rounded-lg p-6 mt-4">
          <ul className="list-disc pl-6 text-green-800">
        <li><strong className='text-red-800'>Tokenization & Sentence Segmentation:</strong> The text is processed into a <span className='text-red-700'>SpaCy</span> doc object, which segments it into individual sentences.</li>
        <li><strong className='text-red-800'>Medical Term Identification:</strong> Each token in a sentence is checked using the <span className='text-red-700'>_is_medical_finding</span> method, which determines if a word is a medical finding based on its <span className='text-red-700'>part-of-speech (POS) </span>(e.g., nouns or proper nouns), dependency role (e.g., subject or object), and whether it is not a stop word.</li>
        <li><strong className='text-red-800'>Context Extraction:</strong> Once a medical term is detected, a context window is created around it, extracting up to five words before and after the term to capture relevant information</li>
        <li><strong className='text-red-800'>Aggregation of Contexts:</strong> Extracted contexts are stored in a list and returned, providing meaningful snippets that help in analyzing medical text.</li>
      </ul>
      </div>
      <br/>
      <p className='mb-4'>
        This method efficiently identifies key medical terms and their context, aiding in medical text analysis and clinical NLP applications.
      </p>

          <CodeBlock language="python">
{`def extract_medical_context(self, text):
    """Extract medical terms and their surrounding context."""
    doc = self.nlp(text)
    medical_contexts = []
    
    for sent in doc.sents:
        medical_spans = []
        for token in sent:
            if self._is_medical_finding(token):
                # Create context window around medical terms
                start = max(0, token.i - 5)
                end = min(len(doc), token.i + 5)
                medical_spans.append(doc[start:end].text)
        
        if medical_spans:
            medical_contexts.extend(medical_spans)
    
    return medical_contexts

def _is_medical_finding(self, token):
    """Identify tokens that represent medical findings."""
    return (
        token.pos_ in {'NOUN', 'PROPN'} and
        token.dep_ in {'nsubj', 'dobj', 'attr'} and
        not token.is_stop
    )`}
          </CodeBlock>
          <div className="bg-red-50 rounded-lg p-6 mt-4">
          <p className="mt-4 text-red-900 font-semibold">
            The context extraction process:
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-red-800">
            <li>Processes text sentence by sentence to maintain proper context boundaries</li>
            <li>Identifies medical findings using part-of-speech and syntactic role</li>
            <li>Creates a 5-token window around each medical term</li>
            <li>Filters out stop words and irrelevant parts of speech</li>
          </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-justify">3. Negation Analysis</h3>
          <p className='mb-4'>
          Negation handling is critical in medical natural language processing because it ensures accurate 
          interpretation of clinical documentation by distinguishing between the presence and absence of medical 
          conditions. Without proper negation detection, automated systems could misinterpret crucial medical 
          information, leading to potentially dangerous errors in patient care, clinical research, and decision 
          support. Complex linguistic expressions like "ruled out for," "negative for," and "denies" require 
          sophisticated natural language processing techniques to accurately capture the true clinical state. 
          By precisely identifying negated terms, medical NLP systems can extract more reliable patient histories, 
          support accurate electronic health record indexing, improve clinical coding, and enable more precise machine
           learning models that understand the contextual nuances of medical language, ultimately enhancing the 
           quality and reliability of healthcare information processing.
          </p>

          <CodeBlock language="python">
{`def _analyze_negation_context(self, doc):
    """Analyze negation context using dependency parsing."""
    neg_states = []
    
    for token in doc:
        # Check direct negation
        has_neg = any(child.dep_ == 'neg' for child in token.children)
        
        # Check negation in broader context
        subtree_has_neg = any(t.dep_ == 'neg' for t in token.subtree)
        
        is_negated = has_neg or subtree_has_neg
        neg_states.append(is_negated)
    
    return neg_states

def _get_finding_polarity(self, context):
    """Determine if a medical finding is positive or negative."""
    doc = self.nlp(context)
    negation_states = self._analyze_negation_context(doc)
    
    finding_tokens = []
    for token, is_negated in zip(doc, negation_states):
        if self._is_medical_finding(token):
            finding_tokens.append((token, is_negated))
    
    return not any(neg for _, neg in finding_tokens) if finding_tokens else True`}
          </CodeBlock>

          <div className="bg-yellow-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-yellow-900 mb-2">Negation Analysis Features:</h4>
            <ul className="list-disc pl-6 text-yellow-800">
              <li>
                <span className="font-semibold">Direct Negation:</span> Identifies immediate negation 
                markers (e.g., "no", "not")
              </li>
              <li>
                <span className="font-semibold">Contextual Negation:</span> Captures broader negation 
                context through dependency tree analysis
              </li>
              <li>
                <span className="font-semibold">Default Handling:</span> Assumes positive finding when 
                negation status is unclear
              </li>
            </ul>
          </div>
          <div className="bg-pink-50 rounded-lg p-6 mt-4">
              <h4 className="font-medium text-pink-900 mb-2">Techniques for Negation Handling:</h4>
              <ul className="list-disc pl-6 text-pink-800">
                <li>Dependency parsing</li>
                <li>Rule-based approaches</li>
                <li>Machine learning classifiers</li>
                <li>Advanced NLP algorithms like ConText (a popular negation detection algorithm)</li>
                <li className="font-semibold">The technique used here combines Syntactic parsing, Token-level negation state tracking, and Contextual analysis of negation markers</li>
              </ul>
            </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Severity Assessment</h3>
          <p>
          The analyze_severity method is designed to assess the severity of a medical condition based on 
          contextual text analysis. It leverages zero-shot classification to categorize medical findings into 
          predefined severity levels. Below is a detailed explanation of how this process works:
          </p>
          <div className="bg-green-50 rounded-lg p-6 mt-4 mb-4">
          <ul className="list-disc pl-6 text-green-900">
            <li><strong>Finding Polarity:</strong> Before assigning a severity score, the method determines whether the medical context describes a positive or negative finding.
            This is achieved through the _get_finding_polarity method, which likely analyzes the sentiment or nature of the medical statement to establish whether it indicates an abnormality or a normal condition.
            </li>
            <li><strong>Zero-Shot Classification:</strong> The method utilizes a zero-shot classification model (facebook/bart-large-mnli) to classify the given medical context into one of four severity categories: severe, moderate, mild, or normal. Since this is a zero-shot model, it does not require specific prior training on medical severity but instead generalizes its understanding based on its extensive pretraining.</li>
            <li><strong>Scoring Mechanism:</strong> Assigns numerical weights to each severity category and computes a weighted severity score based on classification confidence.</li>
            <li><strong>Context-Based Score Adjustment:</strong> The method returns a severity score ranging from 0 to 1, with higher values indicating more severe medical conditions.
            This score can be used to prioritize patient cases, assist in clinical decision-making, or automate medical document analysis.
            </li>
        </ul>
        </div>

          <CodeBlock language="python">
{`def analyze_severity(self, context):
    """Analyze severity using zero-shot classification."""
    is_positive_finding = self._get_finding_polarity(context)
    
    candidate_labels = [
        "severe condition",
        "moderate condition",
        "mild condition",
        "normal condition"
    ]
    
    result = self.zero_shot_classifier(
        context,
        candidate_labels,
        hypothesis_template="The medical condition described is {}."
    )
    
    severity_weights = {
        "severe condition": 1.0,
        "moderate condition": 0.6,
        "mild condition": 0.3,
        "normal condition": 0.0
    }
    
    scores = dict(zip(result['labels'], result['scores']))
    severity_score = sum(
        severity_weights[label] * score
        for label, score in scores.items()
    )
    
    if not is_positive_finding:
        severity_score = 1 - severity_score
    
    return severity_score`}
          </CodeBlock>
        </div>
      </section>

      {/* Initial Scoring System */}
      <section className="mb-12 text-justify">
        <h2 className="text-2xl font-semibold mb-4">Initial Scoring System</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            The initial scoring system provides a foundation for risk assessment by combining multiple 
            analysis techniques. It's particularly important because it:
          </p>
          <div className="bg-purple-50 rounded-lg p-6 mt-4 mb-4">
          <ul className="list-disc pl-6 text-purple-900 mb-4">
            <li>Establishes baseline risk scores without requiring labeled training data</li>
            <li>Combines multiple analysis approaches for robust assessment</li>
            <li>Enables identification of high-risk cases early in the analysis pipeline</li>
            <li>Provides input for more sophisticated downstream analysis</li>
          </ul>
          </div>

          <CodeBlock language="python">
{`class InitialScorer:
    def __init__(self, device=None):
        self.device = device if device is not None else torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.sentence_model = SentenceTransformer('pritamdeka/S-PubMedBert-MS-MARCO')
        self.severity_analyzer = SeverityAnalyzer()
    
    def analyze_text(self, text):
        """Analyze single text for medical severity."""
        medical_contexts = self.severity_analyzer.extract_medical_context(text)
        
        if not medical_contexts:
            return 0.0
        
        severity_scores = [
            self.severity_analyzer.analyze_severity(context)
            for context in medical_contexts
        ]
        
        return np.mean(severity_scores) if severity_scores else 0.0`}
          </CodeBlock>

          <p className="mt-4 mb-4">
          The <span className='text-purple-700'>generate_training_scores</span> function calculates risk scores for medical texts using <strong className='text-purple-700'>unsupervised learning</strong> techniques. It first converts the texts into <strong className='text-purple-700'>numerical embeddings</strong> using 
          a sentence embedding model, processing them in batches of 32 for efficiency. Each text is then assigned
           a <strong className='text-purple-700'>severity score</strong> using the `analyze_text` method. To enhance context, the function applies 
           <strong className='text-purple-700'>K-Means clustering</strong> (with 3 clusters) to the embeddings and computes <strong className='text-purple-700'>cluster risk scores</strong> based 
           on the distance of each cluster center from the origin. The final risk score is calculated as a 
           **weighted combination** of the severity score (70%) and the cluster risk score (30%). Finally, the 
           scores are normalized using <span className='text-purple-700'>MinMaxScaler</span> to ensure they fall within the <strong className='text-purple-700'>0 to 1</strong> range. This 
           approach allows for **automated risk assessment** of medical texts, helping identify **high-risk cases** 
           in a structured and scalable way.
          </p>
          <CodeBlock language="python">
{`def generate_training_scores(self, texts):
    """Generate initial risk scores using unsupervised learning."""
    print("Analyzing medical contexts and generating scores...")
    
    # Generate embeddings for semantic similarity
    batch_size = 32
    embeddings = []
    
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i + batch_size]
        with torch.amp.autocast('cuda'):
            batch_embeddings = self.sentence_model.encode(
                batch_texts,
                convert_to_tensor=True,
                show_progress_bar=False
            )
        embeddings.append(batch_embeddings.cpu().numpy())
    
    embeddings = np.vstack(embeddings)
    
    # Calculate severity scores
    severity_scores = []
    for text in tqdm(texts, desc="Analyzing texts"):
        score = self.analyze_text(text)
        severity_scores.append(score)
    
    severity_scores = np.array(severity_scores)
    
    # Use K-means for additional context
    kmeans = KMeans(n_clusters=3, random_state=0)
    clusters = kmeans.fit_predict(embeddings)
    
    cluster_centers = kmeans.cluster_centers_
    cluster_distances = np.linalg.norm(cluster_centers, axis=1)
    cluster_risks = MinMaxScaler().fit_transform(
        cluster_distances.reshape(-1, 1)
    ).flatten()
    
    # Combine scores with weights
    combined_scores = 0.7 * severity_scores + 0.3 * cluster_risks[clusters]
    
    # Normalize final scores
    return MinMaxScaler().fit_transform(
        combined_scores.reshape(-1, 1)
    ).flatten()`}
          </CodeBlock>

          <div className="bg-purple-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-purple-900 mb-2">Initial Scoring Components:</h4>
            <ul className="list-disc pl-6 text-purple-800">
              <li>
                <span className="font-semibold">Semantic Analysis:</span> Uses medical domain embeddings 
                to understand report content
              </li>
              <li>
                <span className="font-semibold">Clustering:</span> Groups similar reports to identify 
                risk patterns
              </li>
              <li>
                <span className="font-semibold">Severity Assessment:</span> Analyzes individual medical 
                contexts for severity
              </li>
              <li>
                <span className="font-semibold">Score Combination:</span> Weighted combination of multiple 
                analysis approaches
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeverityAnalysis;