import { Lesson, Module, QuizQuestion } from './types';

export const MODULE_07_LESSONS: Lesson[] = [
  // 1. The Six-Step ML Workflow
  {
    id: 'les-7-1',
    moduleId: 'mod-workflow',
    title: '1. The Six-Step ML Workflow',
    slug: 'the-six-step-ml-workflow',
    estimatedMinutes: 15,
    simpleDefinition: 'The machine learning workflow is a structured, iterative 6-phase engineering lifecycle—Problem Definition, Data Collection, Data Preparation & EDA, Model Selection & Training, Evaluation & Tuning, and Deployment & Monitoring—transforming business questions into production predictions.',
    whyItExists: 'Developing ML systems without a formal workflow leads to 85% project failure rates caused by solving vague problems, training on leaky data, tuning without proper validation, and failing to monitor production drift.',
    howItWorks: [
      'Phase 1: Problem Definition — Frame the business goal as an ML task (regression, classification, ranking) and establish success metrics.',
      'Phase 2: Data Collection — Acquire raw features, verify ground-truth labels, assess privacy, and check representativeness.',
      'Phase 3: Data Preparation & EDA — Clean noise, impute missing entries, encode variables, scale features, and uncover distributions.',
      'Phase 4: Model Selection & Training — Establish simple baselines, select candidate algorithms, and train models.',
      'Phase 5: Evaluation & Tuning — Perform cross-validation, hyperparameter optimization, error analysis, and fairness audits.',
      'Phase 6: Deployment & Monitoring — Containerize the inference pipeline, serve via APIs, monitor prediction drift, and retrain.'
    ],
    practicalExamples: [
      'E-Commerce Recommendations: Translating "increase cart conversion" into a collaborative filtering & gradient boosting ranker evaluated via NDCG@10.',
      'Fraud Detection: Translating "stop fraudulent card charges" into high-recall anomaly classification with strict 20ms latency budgets.',
      'Healthcare Diagnostics: Formulating pneumonia detection on chest X-rays with rigorous clinical validation and false-negative penalty matrices.'
    ],
    commonMisconceptions: [
      {
        myth: 'Machine learning workflows are linear pipelines executed once from left to right.',
        reality: 'ML workflows are inherently cyclical and iterative; error analysis in Phase 5 often requires returning to Phase 2 (more data) or Phase 3 (better features).'
      }
    ],
    conceptSummary: 'The ML workflow is a continuous, iterative feedback loop connecting business needs to robust deployed inference models.',
    interactiveExperienceType: 'ml-workflow-map',
    realWorldExample: {
      domain: 'Fintech Credit Underwriting',
      scenario: 'A neobank built a complex neural network that achieved 99% accuracy in training but collapsed in production because income data was self-reported and shifted during economic downturns.',
      impact: 'Adopting the 6-step workflow caught data drift early, saved millions in defaulted loans, and mandated continuous pipeline monitoring.'
    },
    keyTakeaways: [
      'ML engineering is fundamentally iterative, not a one-way waterfall',
      'Phase 1 (problem framing) and Phase 3 (data prep) dictate 80% of project outcomes',
      'Continuous feedback loops connect evaluation diagnostics back to data and feature design'
    ],
    mathematics: {
      title: 'The Iterative Empirical Risk Minimization Workflow',
      latex: '\\mathcal{W}: \\mathcal{P}_{\\text{biz}} \\xrightarrow{\\text{frame}} (\\mathcal{X}, \\mathcal{Y}, \\mathcal{L}) \\xrightarrow{\\text{train}} f^* = \\arg\\min_{f \\in \\mathcal{F}} \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f(\\mathbf{x}_i), y_i) \\xrightarrow{\\text{deploy}} \\mathbb{E}_{(\\mathbf{x}, y) \\sim \\mathcal{D}_{\\text{prod}}}[\\mathcal{L}(f^*(\\mathbf{x}), y)]',
      plainText: 'Workflow W: Business Problem -> (X, Y, Loss) -> Best model f* minimizing empirical loss -> Production expected loss',
      explanation: 'The workflow bridges empirical training optimization on sample data to true generalization risk in real-world deployment.',
      breakdown: [
        { id: 'w_p', symbol: 'P_biz', name: 'Business Objective', description: 'Real-world business goal to optimize' },
        { id: 'w_l', symbol: 'L', name: 'Loss Metric', description: 'Mathematical surrogate function measuring prediction error' },
        { id: 'w_f', symbol: 'f*', name: 'Optimal Hypothesis', description: 'Selected model parameters minimizing empirical risk' },
        { id: 'w_d', symbol: 'D_prod', name: 'Production Distribution', description: 'Real-world data distribution where the model operates' }
      ]
    },
    pythonSnippet: {
      title: 'End-to-End Scikit-Learn Pipeline Skeleton',
      code: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# 1. Simulate data collection
X, y = make_classification(n_samples=1000, n_features=10, random_state=42)

# 2. Strict Train-Test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Encapsulate Data Prep + Model into atomic Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# 4. Fit on train set only
pipeline.fit(X_train, y_train)

# 5. Evaluate on unseen test set
y_pred = pipeline.predict(X_test)
print("Test Set Performance:")
print(classification_report(y_test, y_pred, digits=3))`,
      explanation: 'Using a Scikit-Learn Pipeline ensures all preprocessing steps are fitted strictly on training data and replicated identically during testing.',
      expectedOutput: 'Test Set Performance:\n              precision    recall  f1-score   support\n\n           0      0.887     0.940     0.913       100\n           1      0.936     0.880     0.907       100\n\n    accuracy                          0.910       200\n   macro avg      0.911     0.910     0.910       200\nweighted avg      0.911     0.910     0.910       200'
    },
    knowledgeCheck: [
      {
        id: 'q7-1-1',
        question: 'Why is the machine learning workflow depicted as an iterative loop rather than a rigid linear waterfall?',
        options: [
          'Because error analysis in later stages frequently exposes the need to collect cleaner data or engineer new features',
          'Because GPUs can only process data backwards',
          'Because software engineering standards forbid linear workflows',
          'Because models cannot be trained without repeating Phase 1 twice'
        ],
        correctIndex: 0,
        explanation: 'In production ML, discovering edge-case errors or distributional shifts during evaluation directly triggers upstream changes in data gathering, labeling, and feature engineering.'
      }
    ],
    revisionNotes: [
      'The 6 steps: Problem Framing -> Data Collection -> Preparation/EDA -> Model Selection -> Evaluation/Tuning -> Deployment.',
      'Atomic Pipelines prevent data leakage between preparation and model training.'
    ]
  },

  // 2. Problem Definition & Business Understanding
  {
    id: 'les-7-2',
    moduleId: 'mod-workflow',
    title: '2. Problem Definition & Business Understanding',
    slug: 'problem-definition-business-understanding',
    estimatedMinutes: 14,
    simpleDefinition: 'Problem definition is the crucial foundational stage where a qualitative business challenge is translated into a well-posed, mathematically solvable machine learning task with measurable success criteria and operational constraints.',
    whyItExists: 'An expertly optimized algorithm that answers the wrong question or optimizes the wrong metric provides zero business value. Poor problem framing is the leading reason 80%+ of industrial AI prototypes never reach production.',
    howItWorks: [
      'Identify Business Objective — Pinpoint the core business problem (e.g. customer churn, delivery delay).',
      'Determine ML Paradigm — Decide if the task is supervised (regression/classification), unsupervised (clustering), or reinforcement learning.',
      'Frame the Target Variable — Define what y is, how ground truth is determined, and whether labels are delayed.',
      'Specify Business & Technical Constraints — Establish inference latency limits, compute budget, privacy constraints, and interpretability requirements.',
      'Align Loss Function to Business Value — Quantify asymmetric costs (e.g. false negatives costing 10x more than false positives).'
    ],
    practicalExamples: [
      'Ride-Hailing ETA: Framing arrival estimation as a quantile regression (predicting 90th percentile arrival time) to avoid underpromising and leaving riders stranded.',
      'Subscription Churn: Defining churn as "no logins for 30 consecutive days" and predicting it 14 days in advance to allow time for retention interventions.',
      'Video Streaming: Framing user retention as a recommendation ranking problem optimized for mean watch time rather than click-through rate (CTR) to curb clickbait.'
    ],
    commonMisconceptions: [
      {
        myth: 'Higher statistical accuracy automatically translates to superior business outcomes.',
        reality: 'A 99% accurate fraud model that flags 0 fraud cases in a 99:1 imbalanced dataset has high accuracy but zero business utility.'
      }
    ],
    conceptSummary: 'Translating business goals into precise mathematical tasks, target labels, and asymmetric cost matrices is the most critical step of any ML initiative.',
    interactiveExperienceType: 'ml-workflow-map',
    realWorldExample: {
      domain: 'E-Commerce Search Engine',
      scenario: 'An engineering team trained a model to maximize click-through rate (CTR). Clicks spiked by 35%, but revenue plunged by 20% because the model recommended cheap novelty items instead of high-value items users actually bought.',
      impact: 'Reframing the target from binary click prediction to expected revenue per impression restored $40M in lost annual sales.'
    },
    keyTakeaways: [
      'Always specify the target variable y and its label latency before writing model code',
      'Statistical metrics must map to dollar values, customer retention, or operational KPIs',
      'Factor in hardware constraints: mobile edge vs. cloud server latency budgets'
    ],
    mathematics: {
      title: 'Expected Business Cost Matrix Formulation',
      latex: '\\text{Expected Cost} = C_{\\text{FP}} \\cdot P(y=0) \\cdot P(\\hat{y}=1 \\mid y=0) + C_{\\text{FN}} \\cdot P(y=1) \\cdot P(\\hat{y}=0 \\mid y=1)',
      plainText: 'Expected Cost = C_FP * P(y=0) * FPR + C_FN * P(y=1) * FNR',
      explanation: 'When the cost of a false negative C_FN (e.g. missed cancer diagnosis) differs from a false positive C_FP, the model must optimize cost-weighted risk rather than symmetric accuracy.',
      breakdown: [
        { id: 'c_fp', symbol: 'C_FP', name: 'Cost of False Positive', description: 'Financial or operational cost of a false alarm' },
        { id: 'c_fn', symbol: 'C_FN', name: 'Cost of False Negative', description: 'Cost of failing to detect a critical positive case' },
        { id: 'p_y', symbol: 'P(y)', name: 'Prior Class Prevalence', description: 'Base rate probability of the positive/negative classes' }
      ]
    },
    pythonSnippet: {
      title: 'Cost-Sensitive Decision Threshold Selection',
      code: `import numpy as np

# Simulated predicted probabilities for 1000 patients
np.random.seed(42)
y_true = np.random.binomial(1, 0.05, size=1000) # 5% true disease rate
y_prob = np.clip(y_true * 0.7 + np.random.uniform(0, 0.4, size=1000), 0, 1)

# Cost parameters: Missed diagnosis (FN) = $500, False alarm (FP) = $20
cost_fn = 500
cost_fp = 20

best_threshold = 0.5
min_total_cost = float('inf')

for threshold in np.linspace(0.05, 0.95, 19):
    y_pred = (y_prob >= threshold).astype(int)
    fp = np.sum((y_pred == 1) & (y_true == 0))
    fn = np.sum((y_pred == 0) & (y_true == 1))
    total_cost = (fp * cost_fp) + (fn * cost_fn)
    
    if total_cost < min_total_cost:
        min_total_cost = total_cost
        best_threshold = threshold

default_fp = np.sum(((y_prob >= 0.5) == 1) & (y_true == 0))
default_fn = np.sum(((y_prob >= 0.5) == 0) & (y_true == 1))
default_cost = default_fp * cost_fp + default_fn * cost_fn

print("Default 0.50 Threshold Cost: $" + str(int(default_cost)))
print("Optimal Cost-Sensitive Threshold:", round(best_threshold, 2))
print("Optimized Minimum Total Cost: $" + str(int(min_total_cost)))`,
      explanation: 'Tuning the decision threshold to account for asymmetric real-world costs reduces overall business loss by over 75% without altering the underlying model.',
      expectedOutput: 'Default 0.50 Threshold Cost: $4240\nOptimal Cost-Sensitive Threshold: 0.2\nOptimized Minimum Total Cost: $880'
    },
    knowledgeCheck: [
      {
        id: 'q7-2-1',
        question: 'When defining an ML problem for fraud detection where 99.8% of transactions are legitimate, why is standard classification accuracy a dangerous evaluation metric?',
        options: [
          'A trivial model predicting "legitimate" for every transaction achieves 99.8% accuracy while missing 100% of fraud',
          'Accuracy cannot be computed on decimal numbers',
          'Accuracy is mathematically undefined when classes are imbalanced',
          'Banks are legally prohibited from reporting accuracy'
        ],
        correctIndex: 0,
        explanation: 'Under severe class imbalance, accuracy is dominated by the majority class. A dummy classifier that catches zero fraud achieves 99.8% accuracy, masking catastrophic failure.'
      }
    ],
    revisionNotes: [
      'Start with the business decision, then work backwards to labels, inputs, and loss functions.',
      'Always establish the baseline first: heuristic rules, random guessing, or simple linear regression.'
    ]
  },

  // 3. Data Collection & Requirements
  {
    id: 'les-7-3',
    moduleId: 'mod-workflow',
    title: '3. Data Collection & Requirements',
    slug: 'data-collection-requirements',
    estimatedMinutes: 14,
    simpleDefinition: 'Data collection is the systematic process of gathering, cataloging, labeling, and verifying sufficient, representative, and unbiased historical records to train and evaluate machine learning models.',
    whyItExists: 'The fundamental axiom of machine learning is "Garbage In, Garbage Out" (GIGO). If training data lacks diversity, suffers from label noise, or fails to represent production operating environments, even the most advanced model will fail catastrophically.',
    howItWorks: [
      'Data Auditing & Sourcing — Identify internal data warehouses, event logs, third-party APIs, and web scrapers.',
      'Ground-Truth Labeling — Establish human annotation guidelines, compute inter-annotator agreement (Cohen\'s Kappa), or extract verified outcome events.',
      'Sample Size Estimation — Calculate minimum required sample sizes based on feature dimensionality and statistical power.',
      'Bias & Representativeness Checks — Verify that demographic, temporal, and geographic segments are adequately represented.',
      'Privacy, Ethics & Governance — Enforce GDPR/CCPA compliance, strip Personally Identifiable Information (PII), and establish data lineage.'
    ],
    practicalExamples: [
      'Autonomous Driving: Collecting diverse sensor driving data across blizzard conditions, heavy fog, nighttime glare, and construction zones rather than sunny California highways only.',
      'Speech Recognition: Sourcing audio samples across diverse age groups, regional dialects, background noise levels, and microphone hardware.',
      'Medical Imaging: Standardizing multi-hospital MRI scans collected across different hardware vendors (Siemens, GE, Philips) to prevent vendor-specific artifacts.'
    ],
    commonMisconceptions: [
      {
        myth: 'More data is always better than higher quality data.',
        reality: 'Adding 1,000,000 noisy, mislabeled, or unrepresentative examples will degrade model performance compared to 10,000 carefully curated, clean, and balanced examples.'
      }
    ],
    conceptSummary: 'High-quality, representative, and ethically governed datasets are the ultimate competitive advantage and determinant of model capability.',
    interactiveExperienceType: 'ml-workflow-map',
    realWorldExample: {
      domain: 'Hiring & Talent Screening',
      scenario: 'An automated resume screening tool was trained on 10 years of historical tech hiring data. Because the historical industry hires were predominantly male, the model penalized resumes containing the word "women\'s" (e.g. "captain of women\'s rugby team").',
      impact: 'The model had to be completely scrapped due to systemic historical bias embedded in the collected training data.'
    },
    keyTakeaways: [
      'Historical data reflects historical human biases unless actively identified and mitigated',
      'Measure Inter-Annotator Agreement (e.g., Cohen\'s Kappa > 0.8) for labeled datasets',
      'Ensure sample diversity covers all anticipated production edge cases and subgroups'
    ],
    mathematics: {
      title: 'Inter-Annotator Agreement: Cohen\'s Kappa',
      latex: '\\kappa = \\frac{p_o - p_e}{1 - p_e}, \\quad p_e = \\sum_{k=1}^K p_{A,k} \\cdot p_{B,k}',
      plainText: 'Kappa = (Observed Agreement - Chance Agreement) / (1 - Chance Agreement)',
      explanation: 'Cohen\'s Kappa quantifies label reliability between two annotators, removing the probability of agreeing purely by chance.',
      breakdown: [
        { id: 'k_p0', symbol: 'p_o', name: 'Observed Agreement', description: 'Proportion of cases where both raters assigned identical labels' },
        { id: 'k_pe', symbol: 'p_e', name: 'Hypothetical Chance Agreement', description: 'Expected agreement rate assuming raters assign labels independently' },
        { id: 'k_kap', symbol: 'kappa', name: 'Cohen\'s Kappa Statistic', description: 'Index from -1 to 1; values > 0.8 indicate near-perfect reliability' }
      ]
    },
    pythonSnippet: {
      title: 'Computing Inter-Annotator Agreement with Cohen\'s Kappa',
      code: `from sklearn.metrics import cohen_kappa_score

# Annotations from two independent medical radiologists classifying 12 scans
radiologist_A = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1]
radiologist_B = [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1]

# Compute Cohen's Kappa
kappa = cohen_kappa_score(radiologist_A, radiologist_B)
raw_agreement = sum(a == b for a, b in zip(radiologist_A, radiologist_B)) / len(radiologist_A)

print("Raw Observed Agreement:", round(raw_agreement * 100, 1), "%")
print("Cohen's Kappa Score:", round(kappa, 3))
if kappa > 0.8:
    print("Reliability: Excellent agreement across annotators.")
elif kappa > 0.6:
    print("Reliability: Substantial agreement, acceptable for training.")
else:
    print("Reliability: Poor agreement; clarify labeling guidelines.")`,
      explanation: 'Cohen\'s Kappa separates genuine diagnostic consensus from chance agreement, giving teams confidence in training label quality.',
      expectedOutput: 'Raw Observed Agreement: 83.3 %\nCohen\'s Kappa Score: 0.667\nReliability: Substantial agreement, acceptable for training.'
    },
    knowledgeCheck: [
      {
        id: 'q7-3-1',
        question: 'What is the primary danger of training an ML model on data scraped exclusively from a single user demographic or geographic region?',
        options: [
          'The model will overfit to regional quirks and fail to generalize when deployed to broader populations (sample selection bias)',
          'The code will fail with an OutOfMemory runtime error',
          'Python libraries only support global data formats',
          'Scikit-learn requires GPS coordinates for every training instance'
        ],
        correctIndex: 0,
        explanation: 'Sample selection bias occurs when training data is not representative of the true target population, causing significant performance collapse on underrepresented groups.'
      }
    ],
    revisionNotes: [
      'Label quality matters more than model architecture: clean 10k > dirty 100k.',
      'Always measure inter-annotator agreement to detect ambiguous labeling guidelines early.'
    ]
  },

  // 4. Data Preparation & EDA in the Workflow
  {
    id: 'les-7-4',
    moduleId: 'mod-workflow',
    title: '4. Data Preparation & EDA in the Workflow',
    slug: 'data-preparation-eda-workflow',
    estimatedMinutes: 15,
    simpleDefinition: 'Data Preparation and Exploratory Data Analysis (EDA) is the iterative phase where raw data is inspected, visualized, cleaned, imputed, transformed, and engineered into algorithmic-ready feature matrices while strictly preserving experimental integrity.',
    whyItExists: 'Real-world raw data contains non-numeric categories, extreme outliers, unscaled features, and missing fields. Rigorous EDA uncovers underlying structural patterns and prevents catastrophic errors like data leakage before model training begins.',
    howItWorks: [
      'Exploratory Data Analysis — Compute summary statistics, inspect distributions for skewness, and assess correlation structures.',
      'Missing Value Imputation — Determine missingness mechanisms (MCAR, MAR, MNAR) and apply median, mode, or iterative imputation.',
      'Outlier Handling — Identify anomalous records using IQR or Isolation Forests; winsorize or trim appropriately.',
      'Categorical Encoding — Convert qualitative variables using One-Hot, Ordinal, or Target encoding.',
      'Feature Scaling — Standardize via StandardScaler (Z-score) or MinMaxScaler to preserve gradient descent stability.',
      'Pipeline Encapsulation — Bundle transformations to execute .fit() only on training splits and .transform() on test splits.'
    ],
    practicalExamples: [
      'Real Estate Pricing: Log-transforming heavily right-skewed home prices (y) to stabilize residual variance and satisfy normality assumptions in linear regressors.',
      'Credit Card Default: Imputing missing income values using median grouping conditioned on occupation code rather than global median.',
      'IoT Predictive Maintenance: Aggregating raw 100Hz vibration sensor streams into rolling mean, variance, and spectral power features.'
    ],
    commonMisconceptions: [
      {
        myth: 'Feature scaling and imputation should be fitted on the entire dataset before splitting to use all available information.',
        reality: 'Fitting scalers or imputers on the full dataset leaks information from the test set into the training process, producing overly optimistic validation scores that fail in production.'
      }
    ],
    conceptSummary: 'Preprocessing transforms messy data into mathematical feature tensors; performing it inside leak-free pipelines guarantees generalization.',
    interactiveExperienceType: 'ml-workflow-map',
    realWorldExample: {
      domain: 'Hospital Length-of-Stay Prediction',
      scenario: 'A clinical data science team normalized patient lab values across all 50,000 hospital records before splitting into train/test sets. The model achieved 94% test accuracy in research papers.',
      impact: 'When deployed live on newly arriving patients, accuracy dropped to 71% because future statistical means had leaked into the historical training split.'
    },
    keyTakeaways: [
      'Always split data BEFORE fitting imputers, encoders, or scalers',
      'Inspect skewness and apply log/power transforms to right-skewed features',
      'Use Scikit-Learn ColumnTransformer to handle mixed numerical and categorical types cleanly'
    ],
    mathematics: {
      title: 'Leak-Free Preprocessing Operator',
      latex: '\\hat{\\boldsymbol{\\mu}}_{\\text{train}} = \\frac{1}{N_{\\text{tr}}} \\sum_{i=1}^{N_{\\text{tr}}} \\mathbf{x}_i, \\quad \\mathbf{X}_{\\text{train}}\' = \\frac{\\mathbf{X}_{\\text{train}} - \\hat{\\boldsymbol{\\mu}}_{\\text{train}}}{\\hat{\\boldsymbol{\\sigma}}_{\\text{train}}}, \\quad \\mathbf{X}_{\\text{test}}\' = \\frac{\\mathbf{X}_{\\text{test}} - \\hat{\\boldsymbol{\\mu}}_{\\text{train}}}{\\hat{\\boldsymbol{\\sigma}}_{\\text{train}}}',
      plainText: 'Mean and standard deviation are computed strictly on training data, then used to scale both training and test sets.',
      explanation: 'Notice test data is standardized using the training set mean and standard deviation, never recalculating them on test data.',
      breakdown: [
        { id: 'mu_tr', symbol: 'mu_train', name: 'Training Sample Mean', description: 'Empirical mean vector computed exclusively from training records' },
        { id: 'sig_tr', symbol: 'sigma_train', name: 'Training Standard Deviation', description: 'Empirical spread computed exclusively from training records' },
        { id: 'x_te_p', symbol: 'X_test\'', name: 'Transformed Test Split', description: 'Test split normalized using parameters frozen from training' }
      ]
    },
    pythonSnippet: {
      title: 'Clean Preprocessing with ColumnTransformer and Pipeline',
      code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

# Create sample dataset with mixed types and missing values
df = pd.DataFrame({
    'age': [25, 42, np.nan, 36, 55, np.nan, 29, 48],
    'income': [50000, 85000, 62000, np.nan, 120000, 45000, 58000, 95000],
    'city': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', 'Chicago', 'NYC', 'LA'],
    'churn': [0, 1, 0, 1, 0, 1, 0, 1]
})

X = df.drop(columns='churn')
y = df['churn']

# Strict split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

num_cols = ['age', 'income']
cat_cols = ['city']

preprocessor = ColumnTransformer(transformers=[
    ('num', Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())]), num_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
])

full_pipe = Pipeline([('pre', preprocessor), ('clf', LogisticRegression())])
full_pipe.fit(X_train, y_train)
print("Pipeline fitted successfully without data leakage.")
print("Test predictions:", list(full_pipe.predict(X_test)))`,
      explanation: 'The ColumnTransformer maps distinct imputers and encoders to numerical and categorical features, fitting only on the training split.',
      expectedOutput: 'Pipeline fitted successfully without data leakage.\nTest predictions: [1, 1]'
    },
    knowledgeCheck: [
      {
        id: 'q7-4-1',
        question: 'Why must fit() be called ONLY on training data, while transform() is called on test and production data?',
        options: [
          'Calling fit() on test data exposes future distributional parameters to the model, creating severe data leakage',
          'Calling fit() twice deletes the Python object from memory',
          'Test data does not have rows or columns',
          'Scikit-learn throws an error if fit() is called on test sets'
        ],
        correctIndex: 0,
        explanation: 'Fitting transformers calculates parameters (mean, standard deviation, vocabulary). Computing these on test data leaks test distribution information into model training.'
      }
    ],
    revisionNotes: [
      'Rule of thumb: .fit_transform() on train split; .transform() on test split.',
      'Combine ColumnTransformer and Pipeline to guarantee atomic, leak-free preprocessing.'
    ]
  },

  // 5. Model Selection: Choosing the Right Algorithm
  {
    id: 'les-7-5',
    moduleId: 'mod-workflow',
    title: '5. Model Selection: Choosing the Right Algorithm',
    slug: 'model-selection-choosing-right-algorithm',
    estimatedMinutes: 16,
    simpleDefinition: 'Model selection is the principled engineering process of evaluating multiple candidate learning algorithms against problem constraints—dataset size, feature dimensionality, linearity, latency, interpretability, and noise—to find the best hypothesis class.',
    whyItExists: 'The No Free Lunch Theorem proves no single machine learning algorithm outperforms all others across every problem domain. A simple linear model might excel on high-dimensional text while failing on non-linear image data where deep convolutional networks dominate.',
    howItWorks: [
      'Determine Problem Geometry & Data Scale — Assess number of samples N, number of features D, and the ratio N/D.',
      'Establish a Fast Baseline — Implement a dummy baseline (majority class/mean) and an interpretable linear baseline (Ridge/Logistic Regression).',
      'Profile Algorithmic Families — Compare linear models, distance-based methods (KNN, SVM), tree ensembles (Random Forest, XGBoost), and neural networks.',
      'Balance Trade-offs — Weigh predictive performance against inference latency, training time, memory footprint, and regulatory interpretability requirements.',
      'Select Top Candidates for Tuning — Shortlist 2-3 distinct model families for systematic cross-validation and hyperparameter tuning.'
    ],
    practicalExamples: [
      'Tabular Financial Risk: Selecting Gradient Boosted Trees (LightGBM/XGBoost) over Deep Neural Networks because boosted trees handle mixed feature scales, missing values, and tabular interactions natively with superior sample efficiency.',
      'High-Dimensional Text Classification: Choosing Linear Support Vector Machines (LinearSVC) or Naive Bayes when classifying 50,000 TF-IDF features with instant training and low latency.',
      'Embedded Edge IoT: Deploying a pruned Decision Tree or small Logistic Regression onto a micro-controller with 128KB RAM where neural networks cannot execute.'
    ],
    commonMisconceptions: [
      {
        myth: 'Deep Neural Networks are always the best model to deploy for any machine learning problem.',
        reality: 'On structured tabular datasets, gradient boosted decision trees (XGBoost, LightGBM, CatBoost) consistently outperform or match deep learning models with a fraction of the compute and tuning complexity.'
      }
    ],
    conceptSummary: 'Selecting the optimal algorithm requires balancing mathematical fit, data scale, interpretability, and production latency constraints.',
    interactiveExperienceType: 'model-selection-simulator',
    realWorldExample: {
      domain: 'Mortgage Loan Approval',
      scenario: 'A bank evaluated a 50-layer deep neural network (91.2% accuracy) against a regularized Logistic Regression model (89.8% accuracy).',
      impact: 'Federal lending regulations (FCRA/ECOA) legally require explainable adverse action notices. The bank selected Logistic Regression because feature coefficients provide direct legal explanations, avoiding massive regulatory fines.'
    },
    keyTakeaways: [
      'Always build a trivial and linear baseline first before trying complex algorithms',
      'Gradient Boosted Trees are the industry standard benchmark for structured tabular data',
      'Factor in production constraints: explainability, training cost, and inference latency'
    ],
    mathematics: {
      title: 'No Free Lunch & Structural Risk Minimization',
      latex: '\\min_{f \\in \\mathcal{F}_k} \\left[ \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f(\\mathbf{x}_i), y_i) + \\lambda \\cdot \\Omega(f) \\right]',
      plainText: 'Minimize Empirical Risk + Regularized Complexity Penalty over candidate hypothesis space F_k.',
      explanation: 'Model selection searches across candidate hypothesis spaces F_k (linear, trees, kernels) to minimize total risk including model complexity.',
      breakdown: [
        { id: 'f_k', symbol: 'F_k', name: 'Hypothesis Class', description: 'Space of functions a specific algorithm can represent (e.g. depth-limited trees)' },
        { id: 'omega_f', symbol: 'Omega(f)', name: 'Model Complexity', description: 'Penalty for function flexibility (number of leaves, VC dimension, weight norm)' },
        { id: 'lam', symbol: 'lambda', name: 'Regularization Parameter', description: 'Controls the balance between training fit and generalization penalty' }
      ]
    },
    pythonSnippet: {
      title: 'Benchmarking Multiple Model Families in Scikit-Learn',
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

X, y = load_breast_cancer(return_X_y=True)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

models = {
    'Logistic Regression': make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
    'K-Nearest Neighbors': make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42)
}

print("5-Fold Cross-Validation Accuracy Benchmark:")
for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')
    mean_str = "{:.4f}".format(scores.mean())
    std_str = "{:.4f}".format(scores.std())
    print("  " + name.ljust(22) + ": Mean = " + mean_str + " (+/- " + std_str + ")")`,
      explanation: 'Evaluating multiple distinct model families across identical CV folds reveals that simple regularized linear models can outperform ensembles on certain feature spaces.',
      expectedOutput: '5-Fold Cross-Validation Accuracy Benchmark:\n  Logistic Regression   : Mean = 0.9807 (+/- 0.0105)\n  K-Nearest Neighbors   : Mean = 0.9666 (+/- 0.0152)\n  Random Forest         : Mean = 0.9614 (+/- 0.0186)\n  Gradient Boosting     : Mean = 0.9578 (+/- 0.0142)'
    },
    knowledgeCheck: [
      {
        id: 'q7-5-1',
        question: 'According to the No Free Lunch theorem, why is it bad engineering practice to always default to the most complex algorithm (e.g. Deep Neural Networks)?',
        options: [
          'No single algorithm is universally superior across all problem distributions; simpler models frequently generalize better on limited tabular data',
          'Complex algorithms cannot run on modern 64-bit operating systems',
          'Deep networks are mathematically incapable of classification',
          'Ensemble methods are legally required by IEEE software engineering standards'
        ],
        correctIndex: 0,
        explanation: 'The No Free Lunch theorem establishes that all algorithms have equivalent average performance over the set of all possible problems. Priors and data geometry dictate which model family succeeds.'
      }
    ],
    revisionNotes: [
      'Always test 3 families: linear baseline, tree ensemble, and distance/kernel/neural method.',
      'Consider inference budget: a 1ms model in production often beats a 200ms model with 0.5% higher AUC.'
    ]
  },

  // 6. Understanding Hyperparameters
  {
    id: 'les-7-6',
    moduleId: 'mod-workflow',
    title: '6. Understanding Hyperparameters',
    slug: 'understanding-hyperparameters',
    estimatedMinutes: 15,
    simpleDefinition: 'Hyperparameters are configuration variables set by the machine learning engineer prior to training that govern the learning process, model capacity, and algorithmic structure, in contrast to model parameters learned automatically from data.',
    whyItExists: 'Without external hyperparameters, algorithms have no mechanism to constrain model capacity, control optimization convergence rates, or prevent catastrophic overfitting to noisy training observations.',
    howItWorks: [
      'Differentiate Parameters vs Hyperparameters — Parameters (weights w, biases b) are updated via gradient descent/closed-form math; hyperparameters (K, learning rate alpha, tree depth) are tuned externally.',
      'Categorize Hyperparameters — Group into Capacity Hyperparameters (max_depth, C, n_estimators), Optimization Hyperparameters (learning_rate, batch_size, momentum), and Regularization Hyperparameters (L1/L2 penalty, dropout).',
      'Analyze Sensitivity — Evaluate which hyperparameters create drastic changes in model behavior (e.g. learning rate) vs minor refinements.',
      'Avoid Train-Set Tuning — Never optimize hyperparameters on the training split, as this monotonically drives training loss to zero while ballooning validation error.'
    ],
    practicalExamples: [
      'Random Forest: Tuning n_estimators (number of trees) to reduce variance, and max_depth or min_samples_leaf to prevent individual trees from memorizing training outliers.',
      'Support Vector Machines: Tuning C (penalty for misclassifications) and gamma (kernel bandwidth for RBF influence radius).',
      'Gradient Descent: Adjusting the learning rate alpha; too large causes divergence, too small stalls convergence.'
    ],
    commonMisconceptions: [
      {
        myth: 'Model parameters and hyperparameters are interchangeable terms for the same concept.',
        reality: 'Parameters are learned automatically by the algorithm from data during training (e.g. weights in linear regression). Hyperparameters are chosen by the engineer to guide the training algorithm.'
      }
    ],
    conceptSummary: 'Hyperparameters control the architecture, capacity, and learning dynamics; tuning them on validation sets prevents overfitting.',
    interactiveExperienceType: 'model-selection-simulator',
    realWorldExample: {
      domain: 'Robotic Surgery Computer Vision',
      scenario: 'An object detection model had its confidence threshold and NMS (non-maximum suppression) IoU hyperparameters set arbitrarily to defaults.',
      impact: 'Tuning the NMS overlap hyperparameter on a validation set reduced double-counted surgical instruments by 88%, ensuring precise surgical tracking.'
    },
    keyTakeaways: [
      'Parameters are learned internally from data; hyperparameters are external configuration knobs',
      'Capacity hyperparameters directly control the bias-variance tradeoff',
      'Always tune hyperparameters using validation sets or cross-validation, never training data'
    ],
    mathematics: {
      title: 'The Bi-Level Optimization Formulation',
      latex: '\\boldsymbol{\\theta}^*(\\boldsymbol{\\lambda}) = \\arg\\min_{\\boldsymbol{\\theta}} \\mathcal{L}_{\\text{train}}(\\boldsymbol{\\theta}; \\boldsymbol{\\lambda}), \\quad \\boldsymbol{\\lambda}^* = \\arg\\min_{\\boldsymbol{\\lambda}} \\mathcal{L}_{\\text{val}}(\\boldsymbol{\\theta}^*(\\boldsymbol{\\lambda}); \\boldsymbol{\\lambda})',
      plainText: 'Parameters theta are optimized on training data given hyperparameters lambda; optimal lambda is selected to minimize validation loss.',
      explanation: 'Hyperparameter tuning is a nested bi-level optimization problem: inner loop learns weights theta, outer loop searches hyperparameter space lambda.',
      breakdown: [
        { id: 'hp_lam', symbol: 'lambda', name: 'Hyperparameter Vector', description: 'Configuration vector (e.g. regularization C, learning rate, tree depth)' },
        { id: 'hp_th', symbol: 'theta', name: 'Model Parameter Vector', description: 'Internal weights and biases learned during training' },
        { id: 'l_val', symbol: 'L_val', name: 'Validation Loss', description: 'Evaluation metric computed on unseen validation observations' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Parameter vs Hyperparameter Impact in Decision Trees',
      code: `from sklearn.datasets import make_moons
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

X, y = make_moons(n_samples=500, noise=0.3, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.3, random_state=42)

print("max_depth  | Train Acc  | Val Acc    | Total Nodes Learned")
print("-" * 52)

for depth in [1, 2, 4, 8, None]:
    # Hyperparameter: max_depth
    clf = DecisionTreeClassifier(max_depth=depth, random_state=42)
    clf.fit(X_train, y_train)
    
    # Parameters learned: number of split nodes and node thresholds
    node_count = clf.tree_.node_count
    train_acc = clf.score(X_train, y_train)
    val_acc = clf.score(X_val, y_val)
    
    depth_str = str(depth) if depth is not None else "Unlimited"
    tr_str = "{:.3f}".format(train_acc)
    va_str = "{:.3f}".format(val_acc)
    print(depth_str.ljust(10) + " | " + tr_str.ljust(10) + " | " + va_str.ljust(10) + " | " + str(node_count).ljust(10))`,
      explanation: 'Notice how unconstrained depth (None) drives training accuracy to 100% while validation accuracy degrades from 90% to 84% due to memorizing noise.',
      expectedOutput: 'max_depth  | Train Acc  | Val Acc    | Total Nodes Learned\n----------------------------------------------------\n1          | 0.777      | 0.767      | 3         \n2          | 0.886      | 0.873      | 7         \n4          | 0.931      | 0.900      | 27        \n8          | 0.983      | 0.867      | 69        \nUnlimited  | 1.000      | 0.840      | 93        '
    },
    knowledgeCheck: [
      {
        id: 'q7-6-1',
        question: 'Which of the following is a model PARAMETER rather than a HYPERPARAMETER?',
        options: [
          'The weight coefficients w and intercept b in a linear regression equation',
          'The learning rate alpha in gradient descent',
          'The number of estimators in a Random Forest',
          'The penalty constant C in a Support Vector Machine'
        ],
        correctIndex: 0,
        explanation: 'Linear regression weights w and bias b are internal parameters calculated directly from the training data via ordinary least squares or gradient descent.'
      }
    ],
    revisionNotes: [
      'Parameters = internal weights learned from data. Hyperparameters = external knobs chosen by engineer.',
      'Over-constraining hyperparameters causes underfitting; under-constraining causes overfitting.'
    ]
  },

  // 7. Train, Validation and Test Sets
  {
    id: 'les-7-7',
    moduleId: 'mod-workflow',
    title: '7. Train, Validation and Test Sets',
    slug: 'train-validation-test-sets',
    estimatedMinutes: 16,
    simpleDefinition: 'The three-way dataset partition divides historical data into disjoint subsets: Training Set (fits model parameters), Validation Set (guides model selection and hyperparameter tuning), and Test Set (evaluates final generalization performance on completely untouched data).',
    whyItExists: 'Evaluating a model on the same data used to tune hyperparameters produces optimistic selection bias. An untouched Test Set acts as a sterile laboratory simulation of how the model will perform after deployment.',
    howItWorks: [
      'The 3-Way Split Protocol — Allocate data into Train (e.g. 70%), Validation (e.g. 15%), and Test (e.g. 15%).',
      'Training Split Role — Fed to the learning algorithm to calculate internal weights, decision trees, or neural network gradients.',
      'Validation Split Role — Used to evaluate competing model architectures, tune hyperparameters, and trigger early stopping.',
      'Test Split Quarantine — Locked in a vault; evaluated exactly ONCE at the end of the project to assess final generalization.',
      'Stratification Strategy — Ensure rare target class proportions are preserved identically across all three subsets.'
    ],
    practicalExamples: [
      'Medical Disease Screening: Stratifying a 2% positive cancer dataset across train, validation, and test splits so every set contains exactly 2% positive cases.',
      'Stock Market Forecasting: Using chronological time-based splitting (e.g. Train: 2018-2022, Val: 2023, Test: 2024) rather than random shuffle to avoid future leakage.',
      'Customer Churn Modeling: Grouping records by customer ID so the same customer\'s monthly records never appear across both train and test splits.'
    ],
    commonMisconceptions: [
      {
        myth: 'If my validation score is high, I don\'t need a test set and can deploy immediately.',
        reality: 'Because you made decisions and tuned hyperparameters based on the validation set, the model overfit to the validation data through repeated iterations. Only an untouched test set provides an unbiased estimate.'
      }
    ],
    conceptSummary: 'The 3-way split isolates learning (train), model tuning (validation), and final generalization assessment (test) into airtight partitions.',
    interactiveExperienceType: 'train-test-split-explorer',
    realWorldExample: {
      domain: 'Autonomous Vehicle Braking',
      scenario: 'An autonomous driving startup tuned obstacle detection thresholds iteratively against their test set until test accuracy reached 99.5%.',
      impact: 'In real-world street tests, the car frequently failed to brake for unexpected pedestrians. The team had overfit to the test set through repeated tuning, destroying the metric\'s integrity.'
    },
    keyTakeaways: [
      'Never evaluate or make architectural decisions using the final Test Set',
      'Use stratified splitting for imbalanced classification tasks',
      'Use temporal (time-series) splitting when data has chronological order'
    ],
    mathematics: {
      title: 'Empirical Generalization Bound & Selection Bias',
      latex: '\\mathcal{D} = \\mathcal{S}_{\\text{train}} \\cup \\mathcal{S}_{\\text{val}} \\cup \\mathcal{S}_{\\text{test}}, \\quad \\mathcal{S}_i \\cap \\mathcal{S}_j = \\emptyset \\quad \\forall i \\neq j',
      plainText: 'Total dataset D is partitioned into mutually exclusive subsets Train, Val, and Test whose pairwise intersections are empty.',
      explanation: 'Complete disjointness guarantees statistical independence, preventing information leakage across optimization and evaluation boundaries.',
      breakdown: [
        { id: 's_tr', symbol: 'S_train', name: 'Training Partition', description: 'Subset used to optimize parameter values theta' },
        { id: 's_val', symbol: 'S_val', name: 'Validation Partition', description: 'Subset used to select best hyperparameters lambda and hypothesis class' },
        { id: 's_te', symbol: 'S_test', name: 'Test Partition', description: 'Untouched benchmark estimating true production risk' }
      ]
    },
    pythonSnippet: {
      title: 'Rigorous 3-Way Stratified Data Splitting',
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Generate imbalanced classification dataset (90% class 0, 10% class 1)
X, y = make_classification(n_samples=1000, n_classes=2, weights=[0.9, 0.1], random_state=42)

# Step 1: Split into Train+Val (80%) and Test (20%)
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# Step 2: Split Train+Val into Train (75% of 80% = 60%) and Val (25% of 80% = 20%)
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, random_state=42, stratify=y_temp
)

print("Total Dataset:       " + str(len(X)) + " samples")
print("Training Set (60%):  " + str(len(X_train)) + " samples | Positive Class: " + "{:.1%}".format(np.mean(y_train)))
print("Validation Set (20%):" + str(len(X_val)) + " samples | Positive Class: " + "{:.1%}".format(np.mean(y_val)))
print("Test Set (20%):      " + str(len(X_test)) + " samples | Positive Class: " + "{:.1%}".format(np.mean(y_test)))`,
      explanation: 'Two-stage stratified splitting guarantees exactly 60/20/20 proportions with identical 10.0% class prevalence in every split.',
      expectedOutput: 'Total Dataset:       1000 samples\nTraining Set (60%):  600 samples | Positive Class: 10.0%\nValidation Set (20%):200 samples | Positive Class: 10.0%\nTest Set (20%):      200 samples | Positive Class: 10.0%'
    },
    knowledgeCheck: [
      {
        id: 'q7-7-1',
        question: 'Why is it considered a major methodological flaw to tune hyperparameters directly against the final test set?',
        options: [
          'The test set becomes part of the training feedback loop, resulting in optimistic bias and destroying its ability to measure true generalization',
          'Test sets can only contain integer values',
          'Scikit-learn algorithms automatically crash if test data is evaluated more than once',
          'It doubles the memory footprint of the GPU'
        ],
        correctIndex: 0,
        explanation: 'Repeatedly evaluating on the test set to adjust hyperparameters causes information leakage into your design choices, leading to overfitting the test set.'
      }
    ],
    revisionNotes: [
      'Train = learn parameters; Validation = tune hyperparameters; Test = verify final generalization.',
      'Lock the test set until model selection and hyperparameter tuning are 100% frozen.'
    ]
  },

  // 8. Cross-Validation: K-Fold and Variants
  {
    id: 'les-7-8',
    moduleId: 'mod-workflow',
    title: '8. Cross-Validation: K-Fold and Variants',
    slug: 'cross-validation-kfold-variants',
    estimatedMinutes: 16,
    simpleDefinition: 'K-Fold Cross-Validation is a robust resampling technique that partitions data into K equal subsets (folds), iteratively training on K-1 folds and validating on the remaining fold, averaging performance across all rounds to minimize evaluation variance.',
    whyItExists: 'A single validation split can yield lucky or unlucky evaluation scores due to random sampling noise, especially on small-to-medium datasets. K-Fold guarantees every observation is used for validation exactly once.',
    howItWorks: [
      'Partitioning into Folds — Divide the training dataset into K non-overlapping chunks of equal size (commonly K=5 or K=10).',
      'Iterative Training and Validation — For fold k = 1 to K: train model on all folds except k; evaluate metric on fold k.',
      'Metric Aggregation — Calculate the mean performance score and standard deviation across all K validation iterations.',
      'Variant Selection:',
      '  - Stratified K-Fold: Preserves class distribution percentages across each fold (essential for classification).',
      '  - TimeSeriesSplit: Respects temporal order by using expanding forward-chaining windows (no future data in training).',
      '  - Group K-Fold: Ensures records belonging to the same entity (e.g. patient, user) never cross fold boundaries.'
    ],
    practicalExamples: [
      'Rare Disease Modeling: Using 5-Fold Stratified K-Fold on 1,000 patient records to ensure each fold has exactly the same 3% rare disease prevalence.',
      'Energy Demand Forecasting: Using TimeSeriesSplit with 5 rolling splits to evaluate forecasting models without looking ahead in time.',
      'Voice Assistant User Recognition: Using GroupKFold grouped by Speaker ID to ensure the model generalizes to brand new speakers, not just memorizing known voices.'
    ],
    commonMisconceptions: [
      {
        myth: 'Cross-validation creates K different models that must all be deployed to production together.',
        reality: 'Cross-validation is purely an evaluation protocol to estimate generalization and pick hyperparameters; once the best configuration is chosen, you train one final model on the entire training set.'
      }
    ],
    conceptSummary: 'K-Fold Cross-Validation produces low-variance generalization estimates by rotating validation across all data slices.',
    interactiveExperienceType: 'kfold-cross-validation',
    realWorldExample: {
      domain: 'Clinical Drug Response Trial',
      scenario: 'With only 150 clinical trial patients, a single 80/20 train/test split yielded 92% accuracy on one random seed and 64% on another.',
      impact: 'Implementing 5-Fold Stratified Cross-Validation revealed the true mean performance was 78% +/- 6%, preventing premature publication of spurious clinical claims.'
    },
    keyTakeaways: [
      'Standard choice is K=5 or K=10 balancing computational cost and bias-variance of the estimator',
      'Use Stratified K-Fold for classification and TimeSeriesSplit for temporal data',
      'Cross-validation measures expected performance; final deployment retrains on all training data'
    ],
    mathematics: {
      title: 'K-Fold Cross-Validation Metric Estimator',
      latex: '\\text{CV}_{(K)} = \\frac{1}{K} \\sum_{k=1}^K \\mathcal{L}_k, \\quad \\mathcal{L}_k = \\frac{1}{|\\mathcal{F}_k|} \\sum_{i \\in \\mathcal{F}_k} \\ell(f_{-k}(\\mathbf{x}_i), y_i)',
      plainText: 'CV score = (1/K) * sum of validation losses L_k across all K folds, where model f_{-k} was trained omitting fold k.',
      explanation: 'The cross-validation estimate averages test losses across all K validation folds, reducing variance by a factor proportional to K.',
      breakdown: [
        { id: 'f_k_set', symbol: 'F_k', name: 'Validation Fold k', description: 'The k-th held-out partition of the dataset' },
        { id: 'f_minus_k', symbol: 'f_{-k}', name: 'Trained Model', description: 'Hypothesis trained on all data points excluding fold k' },
        { id: 'cv_score', symbol: 'CV_(K)', name: 'Aggregate CV Metric', description: 'Unbiased expectation of model performance across the data distribution' }
      ]
    },
    pythonSnippet: {
      title: 'Comparing K-Fold vs Stratified K-Fold on Imbalanced Data',
      code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import KFold, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

# Create imbalanced dataset: 95% Class 0, 5% Class 1
X, y = make_classification(n_samples=500, weights=[0.95, 0.05], random_state=42)

standard_kf = KFold(n_splits=5, shuffle=True, random_state=42)
stratified_kf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

def evaluate_cv(splitter, name):
    scores = []
    for train_idx, val_idx in splitter.split(X, y):
        X_tr, y_tr = X[train_idx], y[train_idx]
        X_va, y_va = X[val_idx], y[val_idx]
        
        clf = LogisticRegression()
        clf.fit(X_tr, y_tr)
        y_probs = clf.predict_proba(X_va)[:, 1]
        scores.append(roc_auc_score(y_va, y_probs))
    mean_str = "{:.3f}".format(np.mean(scores))
    std_str = "{:.3f}".format(np.std(scores))
    print(name.ljust(20) + ": Mean ROC-AUC = " + mean_str + " (+/- " + std_str + ")")

evaluate_cv(standard_kf, "Standard K-Fold")
evaluate_cv(stratified_kf, "Stratified K-Fold")`,
      explanation: 'Stratified K-Fold maintains equal positive class representation in every fold, reducing evaluation score variance from +/- 0.064 to +/- 0.027.',
      expectedOutput: 'Standard K-Fold     : Mean ROC-AUC = 0.898 (+/- 0.064)\nStratified K-Fold   : Mean ROC-AUC = 0.908 (+/- 0.027)'
    },
    knowledgeCheck: [
      {
        id: 'q7-8-1',
        question: 'When validating a machine learning model on financial stock price time-series data, why is standard shuffled K-Fold Cross-Validation invalid?',
        options: [
          'Shuffling time-series data allows future prices to train the model to predict past prices, creating severe lookahead data leakage',
          'Stock market data cannot be represented as numbers',
          'K-Fold only works when K is an even number',
          'Financial data requires 100 folds minimum by law'
        ],
        correctIndex: 0,
        explanation: 'Time-series validation must respect chronological order. Shuffled K-Fold uses future information to predict past events, causing catastrophic lookahead leakage.'
      }
    ],
    revisionNotes: [
      'Standard K-Fold for regression; Stratified K-Fold for classification; TimeSeriesSplit for temporal data.',
      'Cross-validation score variance (std dev) is just as important as the mean score.'
    ]
  },

  // 9. Hyperparameter Tuning: Grid Search
  {
    id: 'les-7-9',
    moduleId: 'mod-workflow',
    title: '9. Hyperparameter Tuning: Grid Search',
    slug: 'hyperparameter-tuning-grid-search',
    estimatedMinutes: 15,
    simpleDefinition: 'Grid Search is an exhaustive hyperparameter optimization strategy that trains and evaluates a machine learning model across every possible combination of specified candidate hyperparameter values within a multi-dimensional Cartesian grid.',
    whyItExists: 'Guessing hyperparameters by hand is biased, haphazard, and inefficient. Grid Search provides a deterministic, reproducible, and fully automated exploration across a bounded hyperparameter search space.',
    howItWorks: [
      'Define Candidate Values — Select discrete values for each target hyperparameter (e.g. C in {0.1, 1, 10}, kernel in {"linear", "rbf"}).',
      'Construct Cartesian Product — Generate all M = product |V_j| parameter configurations.',
      'Execute Cross-Validation — For each configuration, perform K-Fold cross-validation, requiring M * K total model fits.',
      'Rank and Select — Identify the configuration with the highest mean validation score.',
      'Refit Final Model — Retrain the model on the full training dataset using the discovered best hyperparameters.'
    ],
    practicalExamples: [
      'Ridge Regression: Searching regularization strength alpha in {1e-4, 1e-3, 1e-2, 0.1, 1, 10, 100} using 5-Fold cross-validation.',
      'Support Vector Classifier: Evaluating combinations of penalty parameter C in {0.1, 1, 10, 100} and RBF kernel parameter gamma in {0.001, 0.01, 0.1, 1}.',
      'Text Pipeline: Searching n-gram ranges [(1,1), (1,2)] alongside Logistic Regression regularization C: [0.1, 1, 10].'
    ],
    commonMisconceptions: [
      {
        myth: 'Grid Search is always the optimal way to find the global best hyperparameter setting.',
        reality: 'Grid Search suffers from the Curse of Dimensionality: adding 5 hyperparameters with 5 values each requires 5^5 = 3,125 combinations (15,625 fits with 5-fold CV), wasting compute on unimportant dimensions.'
      }
    ],
    conceptSummary: 'Grid Search systematically checks every discrete combination in a Cartesian product, ideal for small search spaces with few hyperparameters.',
    interactiveExperienceType: 'hyperparameter-tuning-lab',
    realWorldExample: {
      domain: 'Telecom Customer Churn',
      scenario: 'An engineering team set up a Grid Search over 6 hyperparameters for XGBoost with 6 values each (6^6 = 46,656 combinations with 5-fold CV = 233,280 training runs).',
      impact: 'The cloud cluster ran for 4 days and cost $12,000 before being halted. Switching to a coarse grid followed by fine tuning reduced compute by 95% with identical model performance.'
    },
    keyTakeaways: [
      'Total fits = (Number of Grid Combinations) * (Number of CV Folds)',
      'Highly effective for 1-3 hyperparameters with coarse logarithmic intervals',
      'Scalability collapses exponentially as hyperparameter dimensions increase'
    ],
    mathematics: {
      title: 'Cartesian Grid Complexity Formulation',
      latex: '\\mathcal{G} = \\prod_{j=1}^P \\Lambda_j, \\quad |\\mathcal{G}| = \\prod_{j=1}^P |\\Lambda_j|, \\quad N_{\\text{fits}} = K \\times |\\mathcal{G}|',
      plainText: 'Grid size |G| is the product of candidate set sizes across P hyperparameters. Total fits = K folds * |G|.',
      explanation: 'Computational complexity grows exponentially O(|Lambda|^P) with the number of hyperparameters P, illustrating the curse of dimensionality.',
      breakdown: [
        { id: 'g_set', symbol: 'G', name: 'Hyperparameter Grid', description: 'Cartesian product of all candidate hyperparameter sets' },
        { id: 'p_dim', symbol: 'P', name: 'Number of Hyperparameters', description: 'Dimensionality of the hyperparameter search space' },
        { id: 'n_fits', symbol: 'N_fits', name: 'Total Model Training Fits', description: 'Total number of full training cycles executed' }
      ]
    },
    pythonSnippet: {
      title: 'Exhaustive Grid Search with GridSearchCV in Scikit-Learn',
      code: `from sklearn.datasets import load_iris
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV, StratifiedKFold

X, y = load_iris(return_X_y=True)

# Define hyperparameter grid: 3 values of C x 3 values of gamma x 2 kernels = 18 combinations
param_grid = {
    'C': [0.1, 1.0, 10.0],
    'gamma': [0.01, 0.1, 1.0],
    'kernel': ['rbf', 'linear']
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid_search = GridSearchCV(
    estimator=SVC(),
    param_grid=param_grid,
    cv=cv,
    scoring='accuracy',
    n_jobs=-1,
    refit=True
)

grid_search.fit(X, y)

print("Best Hyperparameters:", grid_search.best_params_)
print("Best 5-Fold CV Accuracy: " + "{:.4f}".format(grid_search.best_score_))
print("Total Combinations Tested: " + str(len(grid_search.cv_results_['params'])))
print("Total Model Fits: " + str(len(grid_search.cv_results_['params']) * 5))`,
      explanation: 'GridSearchCV tests all 18 configurations across 5 folds (90 fits), identifying the optimal C=1.0 and gamma=0.1 combination.',
      expectedOutput: 'Best Hyperparameters: {\'C\': 1.0, \'gamma\': 0.1, \'kernel\': \'rbf\'}\nBest 5-Fold CV Accuracy: 0.9800\nTotal Combinations Tested: 18\nTotal Model Fits: 90'
    },
    knowledgeCheck: [
      {
        id: 'q7-9-1',
        question: 'If you configure GridSearchCV to tune 4 hyperparameters with 5 candidate values each using 5-fold cross validation, how many total model fits are executed?',
        options: [
          '3,125 fits (5^4 * 5 = 625 * 5)',
          '100 fits',
          '25 fits',
          '20 fits'
        ],
        correctIndex: 0,
        explanation: 'There are 5^4 = 625 unique hyperparameter combinations. Multiplied by 5 cross-validation folds, exactly 3,125 total model fits must run.'
      }
    ],
    revisionNotes: [
      'Use logarithmic spacing (e.g. 0.001, 0.01, 0.1, 1, 10) for scale hyperparameters like learning rate and regularization.',
      'Grid search is best suited when you have <= 3 hyperparameters to tune.'
    ]
  },

  // 10. Random Search & Bayesian Optimization
  {
    id: 'les-7-10',
    moduleId: 'mod-workflow',
    title: '10. Random Search & Bayesian Optimization',
    slug: 'random-search-bayesian-optimization',
    estimatedMinutes: 16,
    simpleDefinition: 'Random Search samples hyperparameter combinations randomly from defined statistical distributions, while Bayesian Optimization builds a probabilistic surrogate model (e.g. Gaussian Process) of the objective function to intelligently choose the most promising next candidates.',
    whyItExists: 'Grid Search wastes enormous computation evaluating unimportant hyperparameters on rigid grid points. Random Search explores significantly more unique values per parameter, and Bayesian Optimization balances exploration and exploitation to find optima in fewer iterations.',
    howItWorks: [
      'The Bergstra-Bengio Insight — In most ML models, only a few hyperparameters significantly impact performance; random search tests distinct values along all dimensions rather than repeating grid points.',
      'Random Search Execution — Specify continuous distributions (e.g. loguniform(1e-4, 1e0)); sample N random configurations within a fixed compute budget.',
      'Bayesian Surrogate Model — Fit a surrogate prior (Gaussian Process or Tree-structured Parzen Estimator / TPE) predicting validation loss as a function of hyperparameters.',
      'Acquisition Function — Calculate Expected Improvement (EI) or Upper Confidence Bound (UCB) to choose the next trial.',
      'Iterative Refinement — Evaluate the selected configuration, update the surrogate model, and repeat until convergence.'
    ],
    practicalExamples: [
      'Deep Learning Tuning: Using Random Search across learning rate (log-uniform 1e-5 to 1e-1), weight decay, and dropout rates where grid search is too expensive.',
      'XGBoost Optimization: Using Optuna (Bayesian TPE) to optimize max_depth, colsample_bytree, subsample, and reg_alpha in 50 trials instead of 2,000 grid points.',
      'Natural Language Processing: Tuning transformer warmup steps, batch size, and Adam beta_2 with Bayesian optimization within a strict 24-hour GPU quota.'
    ],
    commonMisconceptions: [
      {
        myth: 'Random Search is just unguided guessing and therefore strictly inferior to systematic Grid Search.',
        reality: 'Bergstra and Bengio (2012) mathematically proved Random Search is strictly superior to Grid Search for hyperparameter optimization because it searches continuous spaces without wasting budget on uninfluential dimensions.'
      }
    ],
    conceptSummary: 'Random Search explores high-dimensional spaces efficiently; Bayesian Optimization uses historical results to guide intelligent parameter exploration.',
    interactiveExperienceType: 'hyperparameter-tuning-lab',
    realWorldExample: {
      domain: 'High-Frequency Trading Algorithm',
      scenario: 'A quantitative trading firm needed to tune 12 hyperparameters on a market-making ensemble model where each backtest took 30 minutes.',
      impact: 'Grid Search would have taken 8 months. Bayesian optimization found a parameter set that increased the Sharpe ratio by 34% within 48 hours and 100 evaluations.'
    },
    keyTakeaways: [
      'Random Search dominates Grid Search whenever hyperparameter dimensionality exceeds 3',
      'Sample scale parameters (learning rate, regularization) from log-uniform distributions',
      'Bayesian Optimization (e.g., Optuna, TPE) reaches optimal configurations with the fewest objective evaluations'
    ],
    mathematics: {
      title: 'Expected Improvement (EI) Acquisition Function',
      latex: '\\text{EI}(\\boldsymbol{\\lambda}) = \\mathbb{E} \\left[ \\max(0, f^* - f(\\boldsymbol{\\lambda})) \\right] = (f^* - \\mu(\\boldsymbol{\\lambda})) \\Phi\\left(\\frac{f^* - \\mu(\\boldsymbol{\\lambda})}{\\sigma(\\boldsymbol{\\lambda})}\\right) + \\sigma(\\boldsymbol{\\lambda}) \\phi\\left(\\frac{f^* - \\mu(\\boldsymbol{\\lambda})}{\\sigma(\\boldsymbol{\\lambda})}\\right)',
      plainText: 'Expected Improvement balances exploitation (mean predicted improvement) and exploration (uncertainty sigma).',
      explanation: 'The acquisition function balances exploiting areas with low predicted loss (mu) against exploring regions with high model uncertainty (sigma).',
      breakdown: [
        { id: 'f_star', symbol: 'f*', name: 'Current Best Value', description: 'Best validation performance achieved across all prior trials' },
        { id: 'mu_lam', symbol: 'mu(lambda)', name: 'Surrogate Mean Prediction', description: 'Expected validation score predicted by the surrogate model' },
        { id: 'sig_lam', symbol: 'sigma(lambda)', name: 'Surrogate Uncertainty', description: 'Standard deviation reflecting surrogate prediction uncertainty' },
        { id: 'phi_funcs', symbol: 'Phi, phi', name: 'Normal CDF & PDF', description: 'Standard normal cumulative distribution and density functions' }
      ]
    },
    pythonSnippet: {
      title: 'Randomized Search with Continuous Distributions in Scikit-Learn',
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold
from scipy.stats import randint, uniform

X, y = load_breast_cancer(return_X_y=True)

# Define probability distributions rather than fixed discrete lists
param_dist = {
    'n_estimators': randint(50, 300),
    'max_depth': randint(2, 12),
    'min_samples_split': randint(2, 10),
    'max_features': uniform(0.2, 0.8)
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
random_search = RandomizedSearchCV(
    estimator=RandomForestClassifier(random_state=42),
    param_distributions=param_dist,
    n_iter=25, # Budget capped at exactly 25 configurations
    cv=cv,
    scoring='roc_auc',
    random_state=42,
    n_jobs=-1
)

random_search.fit(X, y)
print("Best ROC-AUC:", round(random_search.best_score_, 4))
print("Optimal Configuration:")
for param, val in sorted(random_search.best_params_.items()):
    val_disp = round(val, 3) if isinstance(val, float) else val
    print("  " + str(param) + ": " + str(val_disp))`,
      explanation: 'In only 25 trials, RandomizedSearchCV sampled diverse continuous parameter combinations, achieving 0.9928 ROC-AUC.',
      expectedOutput: 'Best ROC-AUC: 0.9928\nOptimal Configuration:\n  max_depth: 8\n  max_features: 0.247\n  min_samples_split: 3\n  n_estimators: 237'
    },
    knowledgeCheck: [
      {
        id: 'q7-10-1',
        question: 'Why does Random Search consistently outperform Grid Search when tuning models with many hyperparameters?',
        options: [
          'Because not all hyperparameters are equally important; random search evaluates unique values along the critical dimensions on every trial instead of repeating grid coordinates',
          'Because random numbers have higher statistical entropy',
          'Because Scikit-learn runs random search on GPU by default',
          'Because grid search is mathematically incapable of exploring float values'
        ],
        correctIndex: 0,
        explanation: 'If only 2 of 10 hyperparameters matter, grid search tests the same 2 values repeatedly across the other 8 dimensions, while random search tests unique values on every single trial.'
      }
    ],
    revisionNotes: [
      'Default to RandomizedSearchCV or Optuna (Bayesian) over GridSearchCV for real-world projects.',
      'Always specify a fixed iteration budget (n_iter) when resources or time are constrained.'
    ]
  },

  // 11. Overfitting During Model Selection
  {
    id: 'les-7-11',
    moduleId: 'mod-workflow',
    title: '11. Overfitting During Model Selection',
    slug: 'overfitting-during-model-selection',
    estimatedMinutes: 15,
    simpleDefinition: 'Overfitting during model selection (also known as validation overfitting or optimization snooping) occurs when an engineer evaluates so many models or hyperparameter combinations against the validation set that a configuration wins purely by capitalizing on validation noise.',
    whyItExists: 'Just as a complex model with millions of weights can memorize training observations, an engineer searching millions of hyperparameter combinations can inadvertently "memorize" the validation set.',
    howItWorks: [
      'The Multiple Hypothesis Testing Dilemma — Testing 1,000 random model configurations at a 95% confidence level guarantees ~50 false winners by pure luck.',
      'Validation Loss Erosion — As the number of tuned configurations approaches the validation sample size, validation error diverges from true generalization error.',
      'Diagnosing Selection Overfitting — Model achieves 96% on train, 95% on validation during intensive search, but drops to 84% on the held-out test set.',
      'Mitigation Protocols:',
      '  - Nested Cross-Validation: Outer loop evaluates performance; inner loop selects hyperparameters.',
      '  - Strict Test Set Quarantine: Keep the test set untouched until hyperparameter search finishes.',
      '  - Information Criteria: Penalize model complexity using AIC, BIC, or MDL.'
    ],
    practicalExamples: [
      'Kaggle Competition Leaderboards: Competitors who submit 100 entries tuned to the public leaderboard often suffer a massive rank drop on the final private test leaderboard.',
      'Algorithmic Trading Backtests: Testing 10,000 technical indicator combinations on 2 years of market data discovers "guaranteed" profitable strategies that fail immediately in live trading.',
      'Genomic Biomarker Selection: Selecting from 20,000 gene expressions on 50 patient samples creates spurious correlations that vanish in clinical validation.'
    ],
    commonMisconceptions: [
      {
        myth: 'If I use 10-fold cross validation instead of a single validation split, it is impossible to overfit during hyperparameter tuning.',
        reality: 'Searching an enormous hyperparameter space (e.g. 50,000 combinations) over cross-validation can still overfit the cross-validation score through selection bias.'
      }
    ],
    conceptSummary: 'Testing too many model variants against the same validation data causes selection overfitting; Nested Cross-Validation provides the antidote.',
    interactiveExperienceType: 'model-selection-simulator',
    realWorldExample: {
      domain: 'Competitive Data Science / Oil Pipeline Anomaly Detection',
      scenario: 'An engineering team tuned an ensemble of 50 models over 3 months against a static validation split, improving validation accuracy from 88% to 97.4%.',
      impact: 'When deployed on pipeline telemetry in production, accuracy plunged to 86.1%. The team had spent 3 months fitting the idiosyncratic noise of their validation set.'
    },
    keyTakeaways: [
      'The more models you evaluate, the higher the probability that the top performer won by chance',
      'Use Nested Cross-Validation when evaluating pipeline architectures on smaller datasets',
      'A held-out Test Set evaluated only once is the ultimate defense against selection bias'
    ],
    mathematics: {
      title: 'Nested Cross-Validation Protocol',
      latex: '\\mathbb{E}_{\\text{gen}}[\\mathcal{L}] \\approx \\frac{1}{K_{\\text{out}}} \\sum_{k=1}^{K_{\\text{out}}} \\mathcal{L}\\left( f^*_{\\boldsymbol{\\lambda}^*_{-k}}(\\mathcal{S}_{\\text{out}, k}), \\mathcal{S}_{\\text{out}, k} \\right), \\quad \\boldsymbol{\\lambda}^*_{-k} = \\arg\\min_{\\boldsymbol{\\lambda}} \\text{CV}_{\\text{inner}}(\\boldsymbol{\\lambda}; \\mathcal{S}_{\\text{in}, -k})',
      plainText: 'Outer K-fold cross-validation estimates generalization error; inner cross-validation optimizes hyperparameters lambda without touching outer test folds.',
      explanation: 'Nested CV decouples hyperparameter tuning (inner loop) from performance estimation (outer loop), eliminating optimistic selection bias.',
      breakdown: [
        { id: 'k_out', symbol: 'K_out', name: 'Outer CV Folds', description: 'Number of outer splits dedicated strictly to unbiased generalization evaluation' },
        { id: 'cv_in', symbol: 'CV_inner', name: 'Inner CV Search', description: 'Internal cross-validation loop executing hyperparameter tuning' },
        { id: 'lam_star', symbol: 'lambda*_{-k}', name: 'Selected Hyperparameter Set', description: 'Configuration chosen solely on the inner folds of round k' }
      ]
    },
    pythonSnippet: {
      title: 'Nested Cross-Validation with Scikit-Learn',
      code: `from sklearn.datasets import load_diabetes
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV, KFold, cross_val_score
import numpy as np

X, y = load_diabetes(return_X_y=True)

# Inner CV: chooses best hyperparameter alpha
inner_cv = KFold(n_splits=4, shuffle=True, random_state=42)
param_grid = {'alpha': [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]}
inner_grid_search = GridSearchCV(estimator=Ridge(), param_grid=param_grid, cv=inner_cv, scoring='r2')

# Outer CV: evaluates the entire model selection procedure
outer_cv = KFold(n_splits=5, shuffle=True, random_state=42)
nested_scores = cross_val_score(inner_grid_search, X, y, cv=outer_cv, scoring='r2')

# Non-nested approach (optimistic bias)
inner_grid_search.fit(X, y)
non_nested_score = inner_grid_search.best_score_

print("Non-nested (Optimistic) CV R^2: " + "{:.4f}".format(non_nested_score))
print("Nested (Unbiased) Mean R^2:     " + "{:.4f}".format(nested_scores.mean()) + " (+/- " + "{:.4f}".format(nested_scores.std()) + ")")`,
      explanation: 'Nested CV reveals the realistic generalization score (0.4682), demonstrating that standard non-nested tuning suffers from slight optimistic selection bias.',
      expectedOutput: 'Non-nested (Optimistic) CV R^2: 0.4851\nNested (Unbiased) Mean R^2:     0.4682 (+/- 0.0526)'
    },
    knowledgeCheck: [
      {
        id: 'q7-11-1',
        question: 'What is the primary architectural purpose of using Nested Cross-Validation?',
        options: [
          'To separate the hyperparameter tuning loop from the generalization performance estimation loop, preventing selection overfitting',
          'To train models twice as fast',
          'To convert regression problems into classification problems automatically',
          'To double the number of training samples'
        ],
        correctIndex: 0,
        explanation: 'Nested CV uses an inner loop to tune hyperparameters and an independent outer loop to evaluate performance, preventing selection bias from inflating validation scores.'
      }
    ],
    revisionNotes: [
      'Validation data is a finite resource; reusing it too many times causes it to become "burned".',
      'Nested CV is the gold standard when reporting academic or regulatory benchmark results on small datasets.'
    ]
  },

  // 12. Data Leakage in ML Workflows
  {
    id: 'les-7-12',
    moduleId: 'mod-workflow',
    title: '12. Data Leakage in ML Workflows',
    slug: 'data-leakage-ml-workflows',
    estimatedMinutes: 16,
    simpleDefinition: 'Data leakage is the catastrophic error where information from outside the training dataset (such as target labels or future production data) inadvertently contaminates the model training process, yielding artificially inflated validation scores that collapse in deployment.',
    whyItExists: 'Data leakage is subtle, insidious, and silent. It generates models that appear near-perfect during development (99%+ accuracy) because the algorithm learned to exploit unintended "cheat codes" unavailable during real-world inference.',
    howItWorks: [
      'Types of Data Leakage:',
      '  - Target Leakage: Features included in training that inadvertently reveal or correlate with the target, but will not be known at inference time (e.g. prescription_date when predicting disease_diagnosis).',
      '  - Train-Test Contamination: Performing scaling, imputation, PCA, or feature selection on the full dataset before splitting.',
      '  - Temporal / Lookahead Leakage: Using future time-step information to predict past or present states in sequential data.',
      '  - Group / Entity Overlap: Duplicate records or longitudinal observations from the same patient/user split across train and test sets.',
      'The Leakage Red Flag — Any model that achieves unrealistically high performance on complex real-world data almost certainly suffers from leakage.',
      'Prevention Architecture — Wrap all preprocessors and estimators inside atomic Scikit-Learn Pipeline objects; enforce chronological splitting on temporal series.'
    ],
    practicalExamples: [
      'Pneumonia X-Ray Diagnostics: A deep net learned to predict pneumonia with 99% accuracy by identifying metal hospital tokens indicating the scan was taken in the ICU emergency ward, not lung features.',
      'Loan Default Prediction: Including debt_collection_agency_contacted as an input feature when predicting whether a borrower will default in 12 months.',
      'Customer Churn: Including cancellation_survey_rating in the feature matrix for churn prediction models.'
    ],
    commonMisconceptions: [
      {
        myth: 'If my dataset has no duplicate rows, data leakage cannot occur.',
        reality: 'Data leakage happens via feature timing, target proxies, and preprocessing before train/test splitting even with zero duplicate rows in the dataset.'
      }
    ],
    conceptSummary: 'Data leakage occurs when future or target-proxy information contaminates training, producing models that fail completely in production.',
    interactiveExperienceType: 'train-test-split-explorer',
    realWorldExample: {
      domain: 'Hospital Sepsis Early Warning System',
      scenario: 'An AI system achieved 98% AUC detecting sepsis 4 hours before onset. Post-mortem audit revealed the model relied heavily on whether the patient was administered intravenous broad-spectrum antibiotics.',
      impact: 'Doctors prescribed antibiotics only after clinically diagnosing sepsis; the model was predicting past medical decisions rather than anticipating future sepsis.'
    },
    keyTakeaways: [
      'Ask for every feature: "Will this exact value be available at the exact millisecond of production inference?"',
      'Fit imputers, encoders, and scalers strictly on the training partition',
      'Build Scikit-Learn Pipeline objects to guarantee airtight transform isolation'
    ],
    mathematics: {
      title: 'Information Theoretic Formulation of Data Leakage',
      latex: 'I(X_{\\text{leak}}; Y \\mid X_{\\text{legit}}) \\gg 0 \\quad \\text{where} \\quad X_{\\text{leak}} \\notin \\sigma(\\mathcal{F}_{t_{\\text{infer}}})',
      plainText: 'Mutual information between leaked feature and target is positive, but the leaked feature is outside the information field available at inference time.',
      explanation: 'Data leakage introduces a feature X_leak carrying high mutual information with target Y that is not measurable at inference time t_infer.',
      breakdown: [
        { id: 'i_mut', symbol: 'I(X; Y)', name: 'Mutual Information', description: 'Quantifies information shared between candidate feature and target' },
        { id: 't_infer', symbol: 't_infer', name: 'Inference Timestamp', description: 'The exact point in time when the model must output a prediction' },
        { id: 'f_t', symbol: 'F_t', name: 'Filtration / Information Field', description: 'Set of all historical observations strictly available at or before t_infer' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Preprocessing Leakage vs Leak-Free Pipeline',
      code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Generate purely random noise: X has 100 samples, 1000 features; y is random coin flips
np.random.seed(42)
X_noise = np.random.randn(100, 1000)
y_noise = np.random.binomial(1, 0.5, size=100)

# --- LEAKY APPROACH: Feature selection on FULL dataset before splitting ---
selector_leaky = SelectKBest(f_classif, k=10)
X_selected_leaky = selector_leaky.fit_transform(X_noise, y_noise)
X_tr_l, X_te_l, y_tr_l, y_te_l = train_test_split(X_selected_leaky, y_noise, test_size=0.3, random_state=42)
clf_leaky = LogisticRegression().fit(X_tr_l, y_tr_l)
print("Leaky Pipeline Test Accuracy (on PURE NOISE): " + "{:.2f}".format(clf_leaky.score(X_te_l, y_te_l)) + " (Fake Skill!)")

# --- CORRECT LEAK-FREE APPROACH: Selection inside Pipeline on train split only ---
X_tr, X_te, y_tr, y_te = train_test_split(X_noise, y_noise, test_size=0.3, random_state=42)
leak_free_pipe = Pipeline([
    ('selector', SelectKBest(f_classif, k=10)),
    ('clf', LogisticRegression())
])
leak_free_pipe.fit(X_tr, y_tr)
print("Leak-Free Pipeline Test Accuracy (on PURE NOISE): " + "{:.2f}".format(leak_free_pipe.score(X_te, y_te)) + " (Honest Null Result)")`,
      explanation: 'Performing feature selection before splitting achieved 83% accuracy on pure random noise! Encapsulating selection in a Pipeline yields the true honest result (~50%).',
      expectedOutput: 'Leaky Pipeline Test Accuracy (on PURE NOISE): 0.83 (Fake Skill!)\nLeak-Free Pipeline Test Accuracy (on PURE NOISE): 0.47 (Honest Null Result)'
    },
    knowledgeCheck: [
      {
        id: 'q7-12-1',
        question: 'Which of the following scenarios represents an instance of Target Data Leakage?',
        options: [
          'Including an "account_refund_approved_timestamp" feature in a model predicting whether an online purchase will be refunded',
          'Using StandardScaler fitted only on the training set',
          'Splitting data into 70% train and 30% test sets using random_state=42',
          'Imputing missing values using the median of the training split'
        ],
        correctIndex: 0,
        explanation: 'An account refund approved timestamp is populated only after a refund is granted. At the time of original purchase, this feature cannot exist, leaking the target directly.'
      }
    ],
    revisionNotes: [
      'Feature selection and scaling MUST happen strictly inside Scikit-Learn Pipelines.',
      'Audit all features against production inference timestamps to prevent lookahead and target leakage.'
    ]
  },

  // 13. Generalization and the Real World
  {
    id: 'les-7-13',
    moduleId: 'mod-workflow',
    title: '13. Generalization and the Real World',
    slug: 'generalization-real-world',
    estimatedMinutes: 15,
    simpleDefinition: 'Generalization is the fundamental capability of a machine learning model to accurately predict unseen, newly arriving samples drawn from the production distribution, overcoming distributional shift, concept drift, and environmental changes.',
    whyItExists: 'Machine learning models do not operate in static mathematical vacuums. In the real world, consumer behaviors evolve, economic climates change, sensor calibrations degrade, and data distributions drift, degrading static models over time.',
    howItWorks: [
      'The I.I.D. Assumption — Classical ML assumes training and test samples are Independent and Identically Distributed: P_train(X, Y) = P_test(X, Y).',
      'Real-World Violations of I.I.D.:',
      '  - Covariate Shift: Input feature distribution shifts P_prod(X) != P_train(X) while relationship P(Y | X) stays constant.',
      '  - Concept Drift: The relationship changes P_prod(Y | X) != P_train(Y | X) (e.g. inflation changing price sensitivity).',
      '  - Prior Probability Shift: Target class prevalence shifts P_prod(Y) != P_train(Y) (e.g. pandemic disease spike).',
      'Detecting Drift — Monitor Kolmogorov-Smirnov (KS) tests, Population Stability Index (PSI), and prediction distribution entropy over time.',
      'Continuous Retraining Lifecycles — Implement automated scheduled retraining triggers and shadow model deployments.'
    ],
    practicalExamples: [
      'Spam Filtering: Spammers continually adapt email phrasing to bypass keyword filters, requiring active learning and dynamic retraining to combat concept drift.',
      'Credit Scoring During Recessions: Economic shocks alter default probabilities for previously low-risk credit tiers (covariate and concept shift).',
      'Autonomous Delivery Drones: Sensor lenses accumulating dust over months gradually alters camera optical distributions, requiring periodic recalibration.'
    ],
    commonMisconceptions: [
      {
        myth: 'Once a model achieves 95% accuracy and is deployed to production, the engineering work is finished.',
        reality: 'Deployment is merely the midpoint of an ML system lifecycle; production performance decays continuously due to data and concept drift unless actively monitored and maintained.'
      }
    ],
    conceptSummary: 'Generalization in production requires continuous vigilance, drift detection, and automated retraining pipelines to maintain reliability.',
    interactiveExperienceType: 'model-selection-simulator',
    realWorldExample: {
      domain: 'Supply Chain & Retail Inventory',
      scenario: 'During the March 2020 COVID-19 pandemic outbreak, historical predictive supply chain models failed across international retailers as consumer buying shifted overnight to paper goods, canned foods, and home gym equipment.',
      impact: 'Massive stockouts occurred globally because ML models assumed static pre-pandemic consumer purchasing distributions.'
    },
    keyTakeaways: [
      'The real world constantly violates the static I.I.D. assumption',
      'Distinguish between Covariate Shift (inputs change) and Concept Drift (relationships change)',
      'Continuous telemetry and drift monitoring (e.g. Population Stability Index) are mandatory for production models'
    ],
    mathematics: {
      title: 'Population Stability Index (PSI) for Drift Detection',
      latex: '\\text{PSI} = \\sum_{b=1}^B \\left( P_b - Q_b \\right) \\times \\ln\\left(\\frac{P_b}{Q_b}\\right)',
      plainText: 'PSI = sum over bins of (Actual_b - Expected_b) * ln(Actual_b / Expected_b)',
      explanation: 'PSI quantifies distributional divergence between baseline reference data P and production monitoring batch Q. PSI > 0.2 indicates significant drift requiring retraining.',
      breakdown: [
        { id: 'p_b', symbol: 'P_b', name: 'Reference Distribution', description: 'Fraction of observations in bin b during training/baseline period' },
        { id: 'q_b', symbol: 'Q_b', name: 'Production Distribution', description: 'Fraction of observations in bin b observed in the live production window' },
        { id: 'psi_val', symbol: 'PSI', name: 'Stability Index Value', description: '<0.1: No change; 0.1-0.2: Moderate shift; >0.2: Significant drift' }
      ]
    },
    pythonSnippet: {
      title: 'Calculating Population Stability Index (PSI) to Detect Feature Drift',
      code: `import numpy as np

def calculate_psi(baseline, target, num_bins=10):
    # Calculate bin edges from baseline
    quantiles = np.linspace(0, 100, num_bins + 1)
    bins = np.percentile(baseline, quantiles)
    bins[0] = -np.inf
    bins[-1] = np.inf
    
    # Bin counts
    base_counts, _ = np.histogram(baseline, bins=bins)
    target_counts, _ = np.histogram(target, bins=bins)
    
    # Proportions (with epsilon smoothing)
    P = np.maximum(base_counts / len(baseline), 1e-4)
    Q = np.maximum(target_counts / len(target), 1e-4)
    
    # PSI formula
    psi_value = np.sum((Q - P) * np.log(Q / P))
    return psi_value

np.random.seed(42)
baseline_data = np.random.normal(loc=50, scale=10, size=1000)
stable_prod_data = np.random.normal(loc=50.2, scale=9.8, size=1000)
drifted_prod_data = np.random.normal(loc=57, scale=12, size=1000)

print("PSI (Stable Production):  " + "{:.4f}".format(calculate_psi(baseline_data, stable_prod_data)) + " (Safe)")
print("PSI (Drifted Production): " + "{:.4f}".format(calculate_psi(baseline_data, drifted_prod_data)) + " (Drift Alert! Retraining Required)")`,
      explanation: 'A PSI of 0.016 indicates stable operational data, while 0.5057 easily exceeds the 0.20 threshold, automatically triggering an alert to retrain the model.',
      expectedOutput: 'PSI (Stable Production):  0.0163 (Safe)\nPSI (Drifted Production): 0.5057 (Drift Alert! Retraining Required)'
    },
    knowledgeCheck: [
      {
        id: 'q7-13-1',
        question: 'What is the difference between Covariate Shift and Concept Drift?',
        options: [
          'Covariate shift occurs when input features P(X) change while relationships P(Y|X) remain stable; Concept drift occurs when the underlying relationship P(Y|X) itself changes',
          'Covariate shift applies only to neural networks; concept drift applies only to decision trees',
          'Concept drift occurs during training; covariate shift occurs only during testing',
          'They are identical terms with no mathematical distinction'
        ],
        correctIndex: 0,
        explanation: 'In covariate shift, the inputs change (e.g. younger users joining an app). In concept drift, the real-world definition or relationship changes (e.g. what constitutes a fraudulent charge shifts).'
      }
    ],
    revisionNotes: [
      'I.I.D. assumption fails over time in production.',
      'Monitor features with PSI (Population Stability Index) and trigger automated alerts when PSI > 0.2.'
    ]
  },

  // 14. Model Deployment Introduction
  {
    id: 'les-7-14',
    moduleId: 'mod-workflow',
    title: '14. Model Deployment Introduction',
    slug: 'model-deployment-introduction',
    estimatedMinutes: 16,
    simpleDefinition: 'Model deployment is the engineering discipline of transitioning a trained machine learning model from an offline research prototype into a secure, scalable, reliable, and observable production software system serving real-time or batch predictions.',
    whyItExists: 'A machine learning model stored in a Jupyter notebook creates zero real-world value. Production deployment bridges the gap between statistical modeling and enterprise software engineering, guaranteeing uptime, low latency, and continuous monitoring.',
    howItWorks: [
      'Serialization & Packaging — Export model weights and preprocessing pipelines into standardized, reproducible formats (ONNX, joblib, TorchScript).',
      'Deployment Patterns:',
      '  - Real-Time REST/gRPC API: Microservice (FastAPI, Triton) responding synchronously to live web queries within 20-50ms.',
      '  - Batch Prediction: Offline cron job processing millions of records in bulk (e.g. Apache Spark, daily recommendation tables).',
      '  - Edge Inference: Quantized models executing locally on mobile devices or IoT chips (TensorFlow Lite, CoreML) with zero network latency.',
      'Release Strategies — Implement Shadow Deployments (scoring live traffic without user impact), Canary Releases (routing 5% of traffic to new model), or A/B Testing.',
      'Telemetry & Monitoring — Track service latency (p95/p99), system throughput (QPS), input data drift, and fallback recovery.',
      'The Production Checklist — Verify input validation, model versioning, latency benchmarks, rollback readiness, and drift monitors.'
    ],
    practicalExamples: [
      'Fraud Detection: Serving an XGBoost classifier behind a FastAPI endpoint running on Kubernetes with a 15ms p99 latency SLA.',
      'Streaming Media Recommendations: Generating batch user-item recommendations overnight via Spark and loading them into Redis for instantaneous read lookups.',
      'Mobile Smartphone Camera: Running a quantized CoreML portrait segmentation model directly on iPhone Neural Engine hardware at 60 frames per second.'
    ],
    commonMisconceptions: [
      {
        myth: 'Deploying a machine learning model is just serializing a pickle file and putting it behind a simple Flask app.',
        reality: 'Production deployment requires input schema validation (Pydantic), latency profiling, load testing, automated canary rollouts, drift detection, security authentication, and automated fallback failovers.'
      }
    ],
    conceptSummary: 'Deployment turns static algorithmic artifacts into observable, scalable, and resilient software services that deliver real-world business impact.',
    interactiveExperienceType: 'workflow-checklist',
    realWorldExample: {
      domain: 'Online Payment Processing',
      scenario: 'A fintech unicorn deployed an updated fraud model directly to 100% of payment traffic. A missing dependency in the production environment caused all API calls to throw 500 errors.',
      impact: 'Transactions froze for 18 minutes, costing $1.4M in lost processing fees. Implementing automated canary deployments and health-check rollbacks prevented any future outages.'
    },
    keyTakeaways: [
      'Choose the right deployment architecture: Real-time API vs Batch processing vs Edge deployment',
      'Use Canary or Shadow deployments to validate new models against live production traffic safely',
      'Always implement input schema validation and deterministic fallback heuristics'
    ],
    mathematics: {
      title: 'Canary Deployment Routing & Risk Probability',
      latex: 'P(\\text{Incident}) = \\alpha \\cdot P_{\\text{bug}}(M_{\\text{new}}) + (1 - \\alpha) \\cdot P_{\\text{bug}}(M_{\\text{prod}}), \\quad \\alpha \\in [0.01, 0.05]',
      plainText: 'System incident risk is bounded by routing only a small fraction alpha (1-5%) of traffic to candidate model M_new.',
      explanation: 'Canary routing mathematically caps production blast radius: if the new model fails, only alpha fraction of requests are affected while automatic rollback triggers.',
      breakdown: [
        { id: 'alpha_rt', symbol: 'alpha', name: 'Canary Traffic Fraction', description: 'Small proportion of live requests directed to the candidate model (e.g. 2%)' },
        { id: 'm_new', symbol: 'M_new', name: 'Candidate Model', description: 'Newly trained model undergoing production validation' },
        { id: 'm_prod', symbol: 'M_prod', name: 'Current Production Baseline', description: 'Existing stable model serving the remaining (1 - alpha) traffic' }
      ]
    },
    pythonSnippet: {
      title: 'Production-Grade Inference Service with FastAPI and Pydantic',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np

app = FastAPI(title="Production ML Inference Service", version="1.0.0")

# Define strict input data schema
class PredictionRequest(BaseModel):
    feature_1: float = Field(..., ge=-5.0, le=5.0, description="Normalized reading")
    feature_2: float = Field(..., ge=0.0, le=100.0, description="Patient age")
    category_code: int = Field(..., ge=0, le=3, description="One-hot category ID")

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    model_version: str

# Mock model weights
w = np.array([0.45, 0.02, 0.15])
b = -1.2

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        x = np.array([request.feature_1, request.feature_2, float(request.category_code)])
        logit = np.dot(w, x) + b
        prob = 1.0 / (1.0 + np.exp(-logit))
        pred = int(prob >= 0.5)
        
        return PredictionResponse(
            prediction=pred,
            probability=round(float(prob), 4),
            model_version="v1.4.2"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Inference error: " + str(e))

print("FastAPI production schema and endpoint compiled successfully.")`,
      explanation: 'Pydantic models validate input types, boundary ranges, and missing fields before passing data to the model, preventing runtime exceptions.',
      expectedOutput: 'FastAPI production schema and endpoint compiled successfully.'
    },
    knowledgeCheck: [
      {
        id: 'q7-14-1',
        question: 'What is the primary advantage of a Shadow Deployment release strategy?',
        options: [
          'The new model receives real production traffic copies and generates predictions for telemetry analysis, but its outputs are never served to users, presenting zero operational risk',
          'It cuts server hosting costs by 50%',
          'It allows models to run without any CPU or memory',
          'It eliminates the need for unit testing'
        ],
        correctIndex: 0,
        explanation: 'In a shadow deployment, the new model processes live production requests in parallel with the incumbent model, verifying latency and accuracy with zero user-facing risk.'
      }
    ],
    revisionNotes: [
      'Serialize pipelines with joblib or ONNX for language-agnostic inference.',
      'Always deploy behind schema validation (Pydantic) with automated fallback logic.'
    ]
  }
];

export const MODULE_07_COMPREHENSIVE_QUIZ: QuizQuestion[] = [
  {
    id: 'm7-final-1',
    question: 'Why is the machine learning workflow fundamentally an iterative loop rather than a linear, one-directional waterfall?',
    options: [
      'Because evaluation and error diagnostics in later stages routinely uncover the need for refined data labeling, additional data collection, or novel feature engineering',
      'Because GPU drivers reject linear execution graphs',
      'Because Scikit-Learn pipelines cannot execute without running in a circular loop',
      'Because model accuracy degrades if steps are completed only once'
    ],
    correctIndex: 0,
    explanation: 'Real-world ML is experimental and empirical; error analysis, bias audits, and drift detection constantly send practitioners back to earlier phases (problem definition, data collection, and feature engineering) to resolve root causes.'
  },
  {
    id: 'm7-final-2',
    question: 'In a transaction fraud detection problem with a 99.9% legitimate transaction rate, why is standard classification accuracy an unsuitable business optimization metric?',
    options: [
      'A naive dummy classifier predicting "legitimate" for 100% of transactions scores 99.9% accuracy while detecting zero fraud, resulting in massive financial losses',
      'Accuracy cannot be calculated on binary target distributions',
      'Scikit-learn forbids computing accuracy on imbalanced datasets',
      'Accuracy ignores the number of features in the input matrix'
    ],
    correctIndex: 0,
    explanation: 'Under extreme class imbalance, the majority class dominates the accuracy metric. A model that fails to detect a single fraudulent transaction still scores 99.9% accuracy, completely failing the business objective.'
  },
  {
    id: 'm7-final-3',
    question: 'What catastrophic methodological error occurs if StandardScaler or SimpleImputer is fitted on the entire dataset BEFORE executing train_test_split?',
    options: [
      'Data leakage: distributional parameters (mean, variance, median) from the test set contaminate the training process, producing artificially optimistic validation scores that fail in production',
      'A Python segmentation fault occurs immediately during fit_transform',
      'The test set is permanently erased from memory',
      'Categorical variables are automatically deleted'
    ],
    correctIndex: 0,
    explanation: 'Fitting preprocessing transformers on the full dataset leaks information about the test set distribution into the training pipeline. All transformers must be fitted strictly on training data alone.'
  },
  {
    id: 'm7-final-4',
    question: 'According to the No Free Lunch Theorem, how should an engineer approach model selection for a tabular business dataset?',
    options: [
      'Start with simple, interpretable baselines (linear models, dummy baselines), then benchmark diverse candidate families (e.g. Gradient Boosted Trees, Random Forests) using cross-validation',
      'Always immediately deploy the deepest available neural network architecture',
      'Only use Support Vector Machines because they have mathematical convex proofs',
      'Pick the algorithm that trains in the fewest CPU clock cycles regardless of validation score'
    ],
    correctIndex: 0,
    explanation: 'The No Free Lunch Theorem proves no algorithm is universally superior. Empirical benchmarking across multiple distinct model families against a clear baseline is the only reliable path.'
  },
  {
    id: 'm7-final-5',
    question: 'What is the fundamental difference between a model parameter and a model hyperparameter?',
    options: [
      'Parameters (e.g. linear weights, neural network biases) are learned automatically from data; hyperparameters (e.g. tree depth, learning rate, C) are set externally by the engineer prior to training',
      'Parameters are floating point numbers, while hyperparameters are always integers',
      'Parameters are only used during testing; hyperparameters are only used during deployment',
      'Parameters are stored on CPU; hyperparameters are stored on GPU'
    ],
    correctIndex: 0,
    explanation: 'Parameters are internal variables optimized by the learning algorithm during training. Hyperparameters are external configuration knobs that dictate how the algorithm learns and its capacity.'
  },
  {
    id: 'm7-final-6',
    question: 'When validating a machine learning model on sequential financial or time-series data, why is standard shuffled K-Fold cross-validation mathematically invalid?',
    options: [
      'Shuffling sequential records creates lookahead leakage: future time-step information leaks into training folds to predict past events',
      'Time-series data cannot be partitioned into numerical folds',
      'K-Fold requires an odd number of splits for temporal data',
      'Financial regulators require that time-series models never use cross-validation'
    ],
    correctIndex: 0,
    explanation: 'Temporal data has serial correlation and directional causality. Shuffled K-Fold uses future observations to predict past states, artificially inflating scores and failing completely on live forward-in-time deployment.'
  },
  {
    id: 'm7-final-7',
    question: 'Why does Randomized Search often outperform exhaustive Grid Search when optimizing machine learning models with 4 or more hyperparameters?',
    options: [
      'Random Search evaluates unique, distinct values across all dimensions on every trial, avoiding the exponential Curse of Dimensionality and concentrating trials on the few parameters that truly matter',
      'Random Search utilizes quantum computing heuristics built into Python',
      'Grid Search can only optimize integer hyperparameters',
      'Random Search guarantees achieving the global mathematical optimum in under 10 iterations'
    ],
    correctIndex: 0,
    explanation: 'Bergstra and Bengio showed that for most models, only a subset of hyperparameters significantly impact performance. Grid search wastes trials testing redundant values of unimportant parameters, while random search explores distinct candidate values on every trial.'
  },
  {
    id: 'm7-final-8',
    question: 'What is the primary operational difference between Covariate Shift and Concept Drift in production machine learning systems?',
    options: [
      'In Covariate Shift, the input feature distribution P(X) changes while P(Y|X) remains stable; in Concept Drift, the statistical relationship between features and target P(Y|X) changes',
      'Covariate shift applies only to unsupervised clustering; concept drift applies only to reinforcement learning',
      'Concept drift occurs when the database crashes; covariate shift occurs when network bandwidth drops',
      'Covariate shift occurs only during model training; concept drift occurs only during feature scaling'
    ],
    correctIndex: 0,
    explanation: 'Covariate shift means the input population changes (e.g. younger demographic adopting an app). Concept drift means the real-world meaning or relationship changes (e.g. new fraud tactics making previously legitimate behavior fraudulent).'
  }
];

export const MODULE_07_METADATA: Module = {
  id: 'mod-workflow',
  trackId: 'track-foundations',
  title: 'Module 07: ML Workflow & Model Selection',
  slug: 'ml-workflow-model-selection',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'GitBranch',
  shortDescription: 'Master the end-to-end 6-step machine learning lifecycle: problem formulation, data requirements, leak-free pipelines, cross-validation, hyperparameter tuning, and deployment readiness.',
  description: 'Building production machine learning systems requires far more than training algorithms on clean datasets. This module covers the complete 6-step machine learning lifecycle: translating business goals into mathematical targets, rigorous data collection and labeling audits, leak-free preprocessing with Scikit-Learn pipelines, multi-family model selection benchmarks, parameter vs hyperparameter optimization (Grid, Random, and Bayesian search), cross-validation strategies (K-Fold, Stratified, TimeSeries), avoiding selection overfitting with Nested CV, diagnosing data leakage, monitoring real-world drift (PSI, Covariate Shift), and production deployment patterns (Canary, Shadow, REST APIs).',
  estimatedHours: 5,
  prerequisites: [
    'Module 01: Introduction to Machine Learning',
    'Module 02: How Machine Learning Learns',
    'Module 03: Errors, Bias, Variance & Model Performance',
    'Module 04: Exploratory Data Analysis (EDA)',
    'Module 05: Data Preprocessing & Encoding',
    'Module 06: Data Visualization Masterclass'
  ],
  objectives: [
    'Navigate and execute the complete 6-step machine learning lifecycle from business problem definition to production monitoring',
    'Formulate quantitative ML problems with cost-sensitive loss functions and appropriate evaluation metrics under class imbalance',
    'Design leak-free preprocessing architectures using Scikit-Learn ColumnTransformers and Pipelines',
    'Select candidate algorithm families based on dataset geometry, sample size, interpretability, and latency budgets',
    'Differentiate model parameters from hyperparameters and tune them using Grid Search, Random Search, and Bayesian Optimization',
    'Implement robust validation schemes: 3-way splits, Stratified K-Fold, TimeSeriesSplit, and Nested Cross-Validation',
    'Detect, diagnose, and prevent subtle forms of data leakage across features, preprocessing, and temporal boundaries',
    'Monitor production models for covariate shift and concept drift using Population Stability Index (PSI) and plan deployment release strategies'
  ],
  badgeReward: {
    id: 'badge-workflow-architect',
    title: 'Workflow Architect',
    icon: 'GitBranch',
    description: 'Mastered all 14 lessons on the end-to-end ML workflow, cross-validation architectures, hyperparameter optimization, and leak-free production pipelines.'
  },
  lessons: MODULE_07_LESSONS,
  finalQuiz: MODULE_07_COMPREHENSIVE_QUIZ
};
