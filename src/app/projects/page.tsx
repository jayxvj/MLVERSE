'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import CodePlayground from '@/components/interactive/CodePlayground';
import { FolderGit2, CheckCircle2, ArrowRight, Code, Sparkles, Layers } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  problemStatement: string;
  dataset: string;
  evaluationMetric: string;
  starterCode: string;
  expectedOutput: string;
}

const PROJECTS: Project[] = [
  {
    id: 'proj-housing',
    title: '1. California House Price Predictor',
    difficulty: 'Beginner',
    summary: 'Build a multi-variable regression model predicting median house values from regional census attributes.',
    problemStatement: 'Given features such as median household income, house age, average rooms, and geographical coordinates, predict the median house price in hundred-thousands.',
    dataset: 'California Housing Dataset (20,640 samples, 8 numerical features)',
    evaluationMetric: 'Mean Absolute Error (MAE) and R² Coefficient of Determination',
    starterCode: `from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load data
housing = fetch_california_housing()
X, y = housing.data[:1000], housing.target[:1000] # 1000 sample subset

# 2. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Fit Ridge Regression
model = Ridge(alpha=1.0)
model.fit(X_train, y_train)

# 4. Evaluate
y_pred = model.predict(X_test)
print(f"R² Score on Hold-out Test: {r2_score(y_test, y_pred):.3f}")
print(f"Mean Squared Error: {mean_squared_error(y_test, y_pred):.3f}")
print(f"Sample prediction: USD {y_pred[0] * 100000:.0f} (Actual: USD {y_test[0] * 100000:.0f})")
`,
    expectedOutput: 'R² Score on Hold-out Test: 0.612\nMean Squared Error: 0.495\nSample prediction: USD 214500 (Actual: USD 189000)',
  },
  {
    id: 'proj-spam',
    title: '2. SMS Spam / Phishing Detector',
    difficulty: 'Intermediate',
    summary: 'Build a text classification pipeline using Bag-of-Words TF-IDF vectorization and Multinomial Naive Bayes.',
    problemStatement: 'Filter incoming SMS messages into Spam (1) or Ham (0) with minimal False Positives to protect users from phishing links without blocking authentic notifications.',
    dataset: 'SMS Spam Collection (5,574 messages)',
    evaluationMetric: 'Precision (minimizing False Positives) and F1-Score',
    starterCode: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# Training samples
texts = [
    "WINNER! You have won a \$1000 Walmart Gift Card! Call now!",
    "Hey mom, will you be home for dinner tonight?",
    "URGENT: Your bank account is suspended. Verify credentials at link",
    "Let's reschedule the group study session to Friday afternoon."
]
labels = [1, 0, 1, 0] # 1=Spam, 0=Ham

# Build scikit-learn pipeline
pipeline = make_pipeline(TfidfVectorizer(), MultinomialNB())
pipeline.fit(texts, labels)

# Test on new unseen incoming SMS
new_messages = [
    "Can you review my pull request?",
    "Free entry in 2 a weekly competition! Text WIN to 80082"
]
preds = pipeline.predict(new_messages)
for msg, pred in zip(new_messages, preds):
    print(f"Message: '{msg}' -> Classification: {'SPAM' if pred == 1 else 'HAM'}")
`,
    expectedOutput: "Message: 'Can you review my pull request?' -> Classification: HAM\nMessage: 'Free entry in 2 a weekly competition! Text WIN to 80082' -> Classification: SPAM",
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <FolderGit2 className="h-4 w-4" />
            <span>PORTFOLIO CAPSTONES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Guided ML Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Practical capstone projects designed to take you from problem formulation to production pipeline evaluation.
          </p>
        </div>

        {/* Project Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-glow'
                    : 'border-white/10 bg-navy-950/70 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                    {proj.difficulty}
                  </span>
                  <span>Scikit-Learn Pipeline</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{proj.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Project Specification Box */}
        <div className="rounded-xl border border-white/10 bg-navy-950/80 p-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono uppercase text-cyan-400">Project Brief</span>
            <h2 className="text-lg font-bold text-white mt-1">{selectedProject.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-navy-900 border border-white/5">
              <span className="font-mono text-slate-400 block mb-1">Problem Statement:</span>
              <p className="text-slate-200 leading-relaxed">{selectedProject.problemStatement}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-navy-900 border border-white/5">
              <span className="font-mono text-slate-400 block mb-1">Dataset & Metric:</span>
              <p className="text-slate-200">
                <strong>Dataset:</strong> {selectedProject.dataset}
              </p>
              <p className="text-slate-200 mt-1">
                <strong>Metric:</strong> {selectedProject.evaluationMetric}
              </p>
            </div>
          </div>

          {/* Runnable Code Playground */}
          <div className="pt-2">
            <CodePlayground
              key={selectedProject.id}
              initialCode={selectedProject.starterCode}
              expectedOutput={selectedProject.expectedOutput}
              title={`${selectedProject.title} Implementation`}
              description="Execute this end-to-end model pipeline right here in the browser."
              height="300px"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

