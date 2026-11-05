'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import CodePlayground from '@/components/interactive/CodePlayground';
import { Terminal, BookOpen, Check, Play, Sparkles } from 'lucide-react';

interface TopicItem {
  id: string;
  category: string;
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
}

const PYTHON_TOPICS: TopicItem[] = [
  {
    id: 'syntax-vars',
    category: 'Core Python',
    title: '1. Variables and Data Types',
    description: 'Dynamic typing in Python: integers, floats, booleans, and strings used to define model parameters.',
    code: `# Dynamic variable assignments in Python
learning_rate = 0.01          # float
batch_size = 32               # int
model_name = "GradientBoost"  # string
is_converged = False          # boolean

print(f"Model: {model_name}")
print(f"Hyperparameters: LR={learning_rate}, BatchSize={batch_size}")
print(f"Status: Converged? {is_converged}")
`,
    expectedOutput: 'Model: GradientBoost\nHyperparameters: LR=0.01, BatchSize=32\nStatus: Converged? False',
  },
  {
    id: 'lists-dicts',
    category: 'Core Python',
    title: '2. Lists and Dictionaries',
    description: 'Storing sample batches, metric dictionaries, and key-value hyperparameters.',
    code: `# Lists of feature values and dictionaries of loss records
sample_losses = [0.85, 0.62, 0.41, 0.28, 0.15]
metrics_dict = {
    "accuracy": 0.942,
    "precision": 0.920,
    "recall": 0.965,
    "f1_score": 0.942
}

print(f"Epoch 1 Loss: {sample_losses[0]}")
print(f"Final Epoch Loss: {sample_losses[-1]}")
print(f"Test F1 Score: {metrics_dict['f1_score'] * 100:.1f}%")
`,
    expectedOutput: 'Epoch 1 Loss: 0.85\nFinal Epoch Loss: 0.15\nTest F1 Score: 94.2%',
  },
  {
    id: 'conditions-loops',
    category: 'Core Python',
    title: '3. Conditions and Loops',
    description: 'Iterating over training epochs and stopping when loss falls below convergence tolerance.',
    code: `# Training loop with early stopping condition
epochs = 5
loss = 1.0

for epoch in range(1, epochs + 1):
    loss = loss * 0.65 # simulated exponential decay
    print(f"Epoch {epoch}: Loss = {loss:.4f}")
    if loss < 0.2:
        print("Early stopping triggered: loss converged below tolerance!")
        break
`,
    expectedOutput: 'Epoch 1: Loss = 0.6500\nEpoch 2: Loss = 0.4225\nEpoch 3: Loss = 0.2746\nEpoch 4: Loss = 0.1785\nEarly stopping triggered: loss converged below tolerance!',
  },
  {
    id: 'functions',
    category: 'Core Python',
    title: '4. Functions and Lambda Expressions',
    description: 'Defining modular mathematical transforms like Mean Squared Error and Sigmoid.',
    code: `import math

def sigmoid(z):
    """Squashes real-valued inputs into [0, 1] probability."""
    return 1.0 / (1.0 + math.exp(-z))

def mean_squared_error(y_true, y_pred):
    squared_errors = [(yt - yp)**2 for yt, yp in zip(y_true, y_pred)]
    return sum(squared_errors) / len(squared_errors)

print("Sigmoid(0):", sigmoid(0))
print("Sigmoid(2.5):", round(sigmoid(2.5), 4))
print("Sigmoid(-2.5):", round(sigmoid(-2.5), 4))
print("MSE Error:", mean_squared_error([1.0, 2.0, 3.0], [1.1, 1.9, 3.2]))
`,
    expectedOutput: 'Sigmoid(0): 0.5\nSigmoid(2.5): 0.9241\nSigmoid(-2.5): 0.0759\nMSE Error: 0.02',
  },
  {
    id: 'numpy-basics',
    category: 'NumPy',
    title: '5. NumPy Array Operations',
    description: 'Vectorized high-performance operations replacing slow Python loops.',
    code: `import numpy as np

# Create 2D feature matrix X (4 samples, 3 features)
X = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0],
    [10.0, 11.0, 12.0]
])

# Weights vector
w = np.array([0.5, -0.2, 0.1])

# Vectorized dot product dot(X, w)
predictions = np.dot(X, w)

print("X shape:", X.shape)
print("w shape:", w.shape)
print("Dot product predictions:", predictions)
print("Column-wise mean:", X.mean(axis=0))
`,
    expectedOutput: 'X shape: (4, 3)\nw shape: (3,)\nDot product predictions: [0.4 1.6 2.8 4. ]\nColumn-wise mean: [5.5 6.5 7.5]',
  },
  {
    id: 'pandas-frames',
    category: 'Pandas',
    title: '6. Pandas DataFrames',
    description: 'Tabular data analysis, feature selection, and summary statistics.',
    code: `import pandas as pd

# Creating a machine learning dataset DataFrame
df = pd.DataFrame({
    'age': [25, 34, 45, 29, 52],
    'income': [55000, 72000, 110000, 62000, 140000],
    'churned': [0, 0, 1, 0, 1]
})

print("Dataset Preview:")
print(df)
print("\\nMean Income by Churn Status:")
print(df.groupby('churned')['income'].mean())
`,
    expectedOutput: 'Dataset Preview:\n   age  income  churned\n0   25   55000        0\n1   34   72000        0\n2   45  110000        1\n3   29   62000        0\n4   52  140000        1\n\nMean Income by Churn Status:\nchurned\n0     63000.0\n1    125000.0\nName: income, dtype: float64',
  },
  {
    id: 'scikit-learn-fit',
    category: 'Scikit-Learn',
    title: '7. Scikit-Learn Model Pipeline',
    description: 'Fitting estimators, cross-validation, and calculating test accuracy.',
    code: `from sklearn.linear_model import LogisticRegression
import numpy as np

# Toy dataset: Feature 1 = hours, Feature 2 = practice tests
X = np.array([[1, 0], [2, 1], [3, 1], [5, 3], [6, 4], [7, 5]])
y = np.array([0, 0, 0, 1, 1, 1]) # 0 = Fail, 1 = Pass

model = LogisticRegression()
model.fit(X, y)

test_student = np.array([[4, 2]])
prob = model.predict_proba(test_student)[0]

print("Model Trained Successfully!")
print(f"Pass Probability for [4 hours, 2 practice tests]: {prob[1] * 100:.1f}%")
print(f"Prediction: {'PASS' if prob[1] >= 0.5 else 'FAIL'}")
`,
    expectedOutput: 'Model Trained Successfully!\nPass Probability for [4 hours, 2 practice tests]: 78.4%\nPrediction: PASS',
  },
];

export default function CodingLabPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicItem>(PYTHON_TOPICS[0]);

  const categories = ['Core Python', 'NumPy', 'Pandas', 'Scikit-Learn'];

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Terminal className="h-4 w-4" />
            <span>INTERACTIVE CODE RUNNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Python & Data Science Coding Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Run, modify, and master Python from fundamentals up to NumPy array broadcasting and Scikit-learn models directly in your browser.
          </p>
        </div>

        {/* Topic Navigator */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PYTHON_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow font-bold'
                    : 'bg-navy-950 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {topic.title}
              </button>
            );
          })}
        </div>

        {/* Main Code Editor Block */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-navy-950 border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
              <span>{selectedTopic.category.toUpperCase()}</span>
              <span className="text-slate-400">WebAssembly / Sandbox Safe</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">{selectedTopic.title}</h3>
            <p className="text-xs text-slate-300">{selectedTopic.description}</p>
          </div>

          <CodePlayground
            key={selectedTopic.id}
            initialCode={selectedTopic.code}
            expectedOutput={selectedTopic.expectedOutput}
            title={selectedTopic.title}
            description="Edit any parameter or formula in the Monaco editor below and click 'Run Code' to execute."
            height="340px"
          />
        </div>
      </main>
    </div>
  );
}

