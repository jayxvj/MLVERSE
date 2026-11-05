'use client';

import React, { useState } from 'react';
import { ChevronRight, Database, Cpu, BarChart2, Rocket, Search, SlidersHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';

interface StepDetail {
  id: string;
  step: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  inputs: string[];
  outputs: string[];
  objectives: string[];
  activities: string[];
  tools: string[];
  pitfalls: string[];
}

const STEPS: StepDetail[] = [
  {
    id: 'problem',
    step: 1,
    icon: Search,
    title: 'Problem Definition',
    subtitle: 'What are we solving and why?',
    color: '#00f0ff',
    glow: 'rgba(0,240,255,0.25)',
    inputs: ['Business requirements', 'Stakeholder interviews', 'Domain knowledge'],
    outputs: ['Clear problem statement', 'Success criteria & KPIs', 'Scope boundaries'],
    objectives: ['Define the ML task type (classification, regression, clustering)', 'Identify measurable success metric (e.g. F1-Score > 0.90)', 'Establish feasibility with available data'],
    activities: ['Kick-off meetings with product owners', 'Baseline comparison research', 'Literature & benchmark review'],
    tools: ['JIRA / Confluence', 'Jupyter Notebooks (exploration)', 'Google Scholar'],
    pitfalls: ['Solving the wrong problem due to vague requirements', 'Skipping baseline — is ML even necessary?', 'No clear success metric defined upfront']
  },
  {
    id: 'data',
    step: 2,
    icon: Database,
    title: 'Data Collection',
    subtitle: 'Gather the raw training signal',
    color: '#7000ff',
    glow: 'rgba(112,0,255,0.25)',
    inputs: ['Problem statement', 'Feature requirements', 'Data source inventory'],
    outputs: ['Raw dataset files (CSV, Parquet, SQL)', 'Data dictionary', 'Provenance documentation'],
    objectives: ['Acquire sufficient quantity and quality of labeled data', 'Define feature schema and target variable', 'Document data lineage and collection method'],
    activities: ['API data pulls & web scraping', 'Manual annotation or crowdsourced labeling', 'Privacy compliance review (GDPR / HIPAA)'],
    tools: ['Pandas', 'SQL', 'Apache Spark', 'Label Studio'],
    pitfalls: ['Collecting data only from convenient sources (selection bias)', 'Insufficient minority class samples for rare events', 'Leaking future timestamps into historical training data']
  },
  {
    id: 'eda',
    step: 3,
    icon: BarChart2,
    title: 'Data Preparation & EDA',
    subtitle: 'Clean, explore and engineer features',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.25)',
    inputs: ['Raw datasets', 'Domain feature knowledge', 'Business rules'],
    outputs: ['Clean feature matrix X ∈ ℝ^(N×D)', 'Encoded target vector y', 'Train/Test split partitions'],
    objectives: ['Identify and handle missing values, outliers, and duplicates', 'Explore distributions, correlations, and class balance', 'Engineer domain-informed predictive features'],
    activities: ['Visualizing distributions with histograms and box plots', 'Computing correlation heatmaps', 'One-Hot / Ordinal Encoding, Min-Max / Z-Score Scaling'],
    tools: ['Pandas', 'Seaborn', 'Matplotlib', 'Scikit-Learn pipelines'],
    pitfalls: ['Fitting the StandardScaler on the full dataset (data leakage)', 'Ignoring class imbalance until after model training', 'Engineering features using future-timestamped information']
  },
  {
    id: 'model',
    step: 4,
    icon: Cpu,
    title: 'Model Selection & Training',
    subtitle: 'Choose and fit the right algorithm',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    inputs: ['Clean feature matrix X', 'Target vector y', 'Domain inductive biases'],
    outputs: ['Trained model artifact (.pkl / .onnx)', 'Training and validation metrics', 'Hyperparameter configuration'],
    objectives: ['Select algorithm family based on data size, linearity, and interpretability', 'Fit model on training partition only', 'Tune hyperparameters using validation data'],
    activities: ['Baseline model benchmarking', 'Cross-validation across K folds', 'Grid Search / Random Search / Bayesian Optimization'],
    tools: ['Scikit-Learn', 'XGBoost', 'LightGBM', 'Optuna', 'MLflow'],
    pitfalls: ['Evaluating on test data during hyperparameter tuning (test set leakage)', 'Choosing the most complex model rather than the most generalizable', 'No reproducible random seed in model training']
  },
  {
    id: 'evaluation',
    step: 5,
    icon: SlidersHorizontal,
    title: 'Model Evaluation',
    subtitle: 'Measure true generalization performance',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    inputs: ['Trained model artifact', 'Held-out test partition', 'Business success criteria'],
    outputs: ['Evaluation metrics report', 'Error analysis', 'Deployment recommendation'],
    objectives: ['Measure performance on the fully held-out test set', 'Analyse failure modes and misclassified examples', 'Determine whether KPIs established in Step 1 are met'],
    activities: ['Computing F1-Score, PR-AUC, RMSE on test set', 'Generating confusion matrices and residual plots', 'Stakeholder demo with explainability (SHAP values)'],
    tools: ['Scikit-Learn metrics', 'SHAP', 'Evidently AI', 'Weights & Biases'],
    pitfalls: ['Reporting training accuracy as final evaluation metric', 'Not segmenting evaluation by demographic sub-groups', 'Ignoring inference latency and memory constraints']
  },
  {
    id: 'deploy',
    step: 6,
    icon: Rocket,
    title: 'Deployment & Monitoring',
    subtitle: 'Serve predictions and maintain quality',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    inputs: ['Validated model artifact', 'Serving infrastructure', 'Monitoring requirements'],
    outputs: ['REST API / batch prediction service', 'Model card documentation', 'Data drift monitoring alerts'],
    objectives: ['Package and serve model as a low-latency API or batch job', 'Set up real-time monitoring for data drift and concept drift', 'Establish a scheduled model retraining trigger'],
    activities: ['Containerizing model with Docker', 'Building a FastAPI inference endpoint', 'Setting up Evidently / Great Expectations monitoring dashboards'],
    tools: ['FastAPI', 'Docker', 'Kubernetes', 'AWS SageMaker', 'MLflow Registry'],
    pitfalls: ['Deploying without a rollback strategy', 'No monitoring for production data distribution drift', 'Missing model versioning and artifact lineage tracking']
  }
];

export default function MLWorkflowMap() {
  const [activeStep, setActiveStep] = useState<StepDetail>(STEPS[0]);
  const [activeTab, setActiveTab] = useState<'inputs' | 'outputs' | 'objectives' | 'activities' | 'pitfalls'>('objectives');

  const tabConfig = [
    { id: 'objectives' as const, label: 'Objectives' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'inputs' as const, label: 'Inputs' },
    { id: 'outputs' as const, label: 'Outputs' },
    { id: 'pitfalls' as const, label: 'Common Pitfalls' },
  ];

  return (
    <div className="rounded-2xl border border-border/80 bg-navy-900/60 p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/50 pb-5">
        <span className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
          <Rocket className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">Six-Step ML Workflow Explorer</h3>
          <p className="text-xs text-slate-400 mt-0.5">Click any step to explore its inputs, outputs, activities and pitfalls</p>
        </div>
      </div>

      {/* Step Pipeline */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep.id === step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => { setActiveStep(step); setActiveTab('objectives'); }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                  isActive
                    ? 'border-opacity-100 bg-opacity-20 shadow-lg'
                    : 'border-border/50 bg-navy-950/50 hover:border-slate-500'
                }`}
                style={isActive ? {
                  borderColor: step.color,
                  backgroundColor: step.glow,
                  boxShadow: `0 0 20px ${step.glow}`
                } : {}}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
                  style={isActive ? { background: step.color + '30', borderColor: step.color, color: step.color } : { background: '#1e293b', borderColor: '#334155', color: '#64748b' }}>
                  {step.step}
                </div>
                <Icon className="w-4 h-4" style={{ color: isActive ? step.color : '#64748b' }} />
                <span className="text-[11px] font-semibold leading-tight" style={{ color: isActive ? step.color : '#94a3b8' }}>
                  {step.title}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className="hidden sm:flex items-center justify-center absolute" style={{ display: 'none' }}>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Horizontal Arrow Flow Indicator */}
      <div className="hidden sm:flex items-center justify-center gap-1 text-xs text-slate-600">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <span className="font-mono text-[10px]" style={{ color: activeStep.id === s.id ? s.color : '#334155' }}>
              Step {s.step}
            </span>
            {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-slate-700" />}
          </React.Fragment>
        ))}
      </div>

      {/* Detail Panel */}
      <div className="rounded-xl border p-5 space-y-4 transition-all"
        style={{ borderColor: activeStep.color + '50', backgroundColor: activeStep.glow }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: activeStep.color }}>
              STEP {activeStep.step} OF 6
            </span>
          </div>
          <h4 className="text-lg font-bold text-white">{activeStep.title}</h4>
          <p className="text-sm text-slate-300">{activeStep.subtitle}</p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === tab.id
                  ? 'text-white border-opacity-80'
                  : 'border-border/50 text-slate-400 hover:text-white'
              }`}
              style={activeTab === tab.id ? {
                borderColor: activeStep.color,
                backgroundColor: activeStep.color + '25',
                color: activeStep.color
              } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-2">
          {(activeStep[activeTab] as string[]).map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-navy-950/60 border border-border/30">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: activeStep.color }} />
              <span className="text-xs text-slate-300 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* Tools Row */}
        <div className="pt-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Key Tools & Frameworks:</span>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {activeStep.tools.map(tool => (
              <span key={tool} className="px-2.5 py-1 text-[11px] font-mono rounded-full border border-border/60 bg-navy-950/60 text-slate-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

