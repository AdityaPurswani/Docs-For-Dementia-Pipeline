import React from 'react';
import CodeBlock from '../../components/CodeBlock';


const TrainingProcess = () => {
  return (
    <div className="p-8 text-justify">
      <h1 className="text-3xl font-bold mb-6">Training Process: Medical Risk Analysis Model</h1>

      {/* Dataset Preparation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Dataset Preparation</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          Dataset processing in medical text involves creating efficient, tokenized datasets that can be used for model training and evaluation. We leverage PyTorch's `Dataset` class for efficient data loading and preprocessing. The dataset is tokenized into smaller units (words or subwords) so that it can be processed efficiently during model training. Batching allows us to feed multiple samples into the model at once, which speeds up computation.
          </p>
          <br/>

          <CodeBlock language="python">
{`class DementiaReportDataset(Dataset):
    def __init__(self, texts, labels=None, tokenizer=None, max_length=512):
        set_seed(12)  # For reproducibility
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = str(self.texts[idx])
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

          <div className="bg-blue-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-blue-900 mb-2">Dataset Features:</h4>
            <ul className="list-disc pl-6 text-blue-800">
              <li>Fixed seed for reproducibility</li>
              <li>Dynamic padding to max_length</li>
              <li>Attention mask generation</li>
              <li>Label handling for supervised learning</li>
              <li>Efficient tokenization using medical domain tokenizer</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Loading and Batching */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Data Loading and Batching</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          The training data preparation and loading process is a critical component of the machine learning pipeline, designed for optimal performance and efficiency. The process begins with splitting the data into training (80%) and validation (20%) sets using train_test_split, ensuring reproducibility with a fixed random seed. Custom DementiaReportDataset objects are created for both sets, handling specialized medical text processing and on-the-fly tokenization to manage memory efficiently. The DataLoader configuration is then optimized with several key parameters: a batch_size of 8 balances between memory usage and training efficiency, shuffle=True for training data prevents order-dependent learning biases, pin_memory=True enables faster CPU to GPU transfer by using pinned memory, and num_workers=4 enables parallel data loading across multiple CPU cores. This combination of features ensures efficient data handling, optimal GPU utilization, and robust model training while maintaining memory efficiency. The validation DataLoader uses similar settings but without shuffling to ensure consistent evaluation. The entire setup is designed to minimize data loading bottlenecks while maximizing training efficiency and model performance.
          </p>
          <br/>

          <CodeBlock language="python">
{`def train(self, train_texts, validation_split=0.2, epochs=7, batch_size=8):
    # Split into train and validation sets
    indices = np.arange(len(train_texts))
    train_idx, val_idx = train_test_split(
        indices, 
        test_size=validation_split, 
        random_state=0
    )
    
    # Create datasets
    train_dataset = DementiaReportDataset(
        [train_texts[i] for i in train_idx],
        train_scores[train_idx],
        self.tokenizer
    )
    val_dataset = DementiaReportDataset(
        [train_texts[i] for i in val_idx],
        train_scores[val_idx],
        self.tokenizer
    )

    # Create optimized data loaders
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        pin_memory=True,  # Faster data transfer to GPU
        num_workers=4  # Parallel data loading
    )
    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        pin_memory=True,
        num_workers=4
    )`}
          </CodeBlock>

          <div className="bg-green-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-green-900 mb-2">Dataset Features:</h4>
            <ul className="list-disc pl-6 text-green-800">
              <li>
                <span className="font-semibold">Custom Processing:</span> The DementiaReportDataset applies 
                specialized processing for medical text data
              </li>
              <li>
                <span className="font-semibold">On-the-fly Tokenization:</span> Texts are tokenized when accessed, 
                saving memory
              </li>
              <li>
                <span className="font-semibold">Consistent Processing:</span> Same tokenizer ensures consistent 
                processing across train and validation sets
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-purple-900 mb-2">Performance Optimization Strategies:</h4>
            <ul className="list-disc pl-6 text-purple-800">
              <li>
                <span className="font-semibold">Memory Management:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Pinned memory optimizes CPU-GPU transfer</li>
                  <li>Batch size balances memory usage and performance</li>
                  <li>Parallel workers distribute memory load</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Processing Efficiency:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Multi-worker data loading reduces I/O bottlenecks</li>
                  <li>On-the-fly tokenization saves memory</li>
                  <li>Efficient batch processing for GPU utilization</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Training Optimization:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Shuffled data improves model robustness</li>
                  <li>Consistent validation process</li>
                  <li>Balanced train-validation split</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Training Loop */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Training Loop Implementation</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
          The training process in the DementiaRiskAnalyzer is designed for efficient and effective model training, combining unsupervised and supervised learning techniques. First, it initializes the training environment by preparing batches and enabling GPU acceleration through CUDA if available. The optimization uses the AdamW optimizer with a carefully chosen learning rate of 2e-5, balancing learning speed with stability. During each epoch, the training loop employs automatic mixed precision (AMP) training when CUDA is available, which significantly improves training speed while maintaining accuracy. The process handles batches efficiently by moving data to the GPU in a non-blocking manner, computes the model outputs, and calculates loss using mean squared error. For GPU training, it uses gradient scaling to prevent underflow in mixed precision calculations. The validation phase evaluates the model's performance without computing gradients, ensuring proper shape matching between predictions and labels.
          </p>
          <br/>

          <CodeBlock language="python">
{`def train(self, train_texts, validation_split=0.2, epochs=7, batch_size=8):
    # Initialize optimizer
    optimizer = torch.optim.AdamW(self.model.parameters(), lr=2e-5)
    
    for epoch in range(epochs):
        self.model.train()
        total_loss = 0
        
        # Training phase
        for batch in tqdm(train_loader, desc=f'Epoch {epoch + 1}/{epochs}'):
            optimizer.zero_grad()
            
            # Move batch to GPU efficiently
            input_ids = batch['input_ids'].to(self.device, non_blocking=True)
            attention_mask = batch['attention_mask'].to(self.device, non_blocking=True)
            labels = batch['labels'].to(self.device, non_blocking=True)

            if torch.cuda.is_available():
                # Use automatic mixed precision
                with torch.amp.autocast('cuda'):
                    outputs = self.model(
                        input_ids=input_ids,
                        attention_mask=attention_mask
                    )
                    loss = F.mse_loss(outputs.logits.squeeze(), labels)
                
                # Use gradient scaling
                self.scaler.scale(loss).backward()
                self.scaler.step(optimizer)
                self.scaler.update()
            else:
                outputs = self.model(
                    input_ids=input_ids,
                    attention_mask=attention_mask
                )
                loss = F.mse_loss(outputs.logits.squeeze(), labels)
                loss.backward()
                optimizer.step()
            
            total_loss += loss.item()

        # Validation phase
        self.model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(self.device, non_blocking=True)
                attention_mask = batch['attention_mask'].to(self.device, non_blocking=True)
                labels = batch['labels'].to(self.device, non_blocking=True)

                with torch.amp.autocast('cuda'):
                    outputs = self.model(
                        input_ids=input_ids,
                        attention_mask=attention_mask
                    )
                    predicted = outputs.logits.squeeze()
                    labels = labels.view(predicted.shape)
                    val_loss += F.mse_loss(predicted, labels).item()

        # Print epoch statistics
        avg_train_loss = total_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        print(f'Epoch {epoch + 1}:')
        print(f'Average training loss: {avg_train_loss:.4f}')
        print(f'Average validation loss: {avg_val_loss:.4f}')

        # Clear GPU cache
        if torch.cuda.is_available():
            torch.cuda.empty_cache()`}
          </CodeBlock>

          <div className="bg-yellow-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-yellow-900 mb-2">Training Optimizations:</h4>
            <ul className="list-disc pl-6 text-yellow-800">
              <li>
                <span className="font-semibold">Mixed Precision Training:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Uses FP16 for faster computation</li>
                  <li>Maintains accuracy with gradient scaling</li>
                  <li>Automatic casting between precisions</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Memory Management:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Regular GPU cache clearing</li>
                  <li>Efficient batch transfer to GPU</li>
                  <li>Non-blocking data transfer</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Loss Optimization:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>Mean Squared Error loss for regression</li>
                  <li>Gradient scaling for stability</li>
                  <li>Proper shape matching for predictions</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Initial Scoring */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Initial Score Generation</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            Before the main training loop, we generate initial scores for the training data using 
            unsupervised techniques as explained in the <span><a href="/risk/severity">severity analysis</a></span> section
          </p>
          <br/>

          <CodeBlock language="python">
{`def prepare_training_data(self, texts):
    """Generate initial risk scores for training."""
    print("Generating initial risk scores...")
    initial_scores = self.initial_scorer.generate_training_scores(texts)
    
    print("\nScore distribution:")
    print(pd.Series(initial_scores).describe())
    
    return initial_scores`}
          </CodeBlock>

          <div className="bg-purple-50 rounded-lg p-6 mt-4">
            <h4 className="font-medium text-purple-900 mb-2">Initial Scoring Features:</h4>
            <ul className="list-disc pl-6 text-purple-800">
              <li>Unsupervised score generation</li>
              <li>Statistical analysis of score distribution</li>
              <li>Automatic outlier detection</li>
              <li>Score normalization and scaling</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingProcess;