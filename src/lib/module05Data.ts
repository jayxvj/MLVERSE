import { Lesson, Module } from './types';

export const MODULE_05_LESSONS: Lesson[] = [
  // 1. What is data preprocessing?
  {
    id: 'les-5-1',
    moduleId: 'mod-5',
    title: '1. What is Data Preprocessing?',
    slug: 'what-is-data-preprocessing',
    estimatedMinutes: 14,
    simpleDefinition: 'Data preprocessing is the systematic series of transformations applied to raw data to convert it into a clean, well-formatted, and mathematically structured numerical representation suitable for machine learning algorithms.',
    whyItExists: 'Machine learning algorithms are mathematical optimization engines that require homogeneous numerical matrices. Real-world raw data contains missing entries, typos, inconsistent text, unscaled measurements, and duplicate rows that break algorithmic computations.',
    howItWorks: [
      'Data Ingestion: Load raw data from SQL databases, CSV files, APIs, or log streams.',
      'Data Cleaning: Remove duplicates, correct typos, trim whitespace, and resolve missing values.',
      'Feature Encoding: Convert qualitative text categories into orthogonal numerical vectors.',
      'Feature Scaling: Transform numerical features into uniform scale ranges (e.g. [0, 1] or Z-scores).',
      'Data Splitting: Partition into Train and Test sets before fitting transformers to prevent leakage.',
      'Pipeline Packaging: Bundle transformers into an atomic execution pipeline.'
    ],
    practicalExamples: [
      'Credit Risk: Converting raw strings like "$75,000 / yr" into float 75000.0, handling missing employment lengths, and one-hot encoding home ownership.',
      'Computer Vision: Resizing raw camera images from varying aspect ratios to uniform 224x224 tensors and dividing pixel values by 255.0 to scale them into [0, 1].',
      'Natural Language Processing: Lowercasing text, stripping HTML tags, removing punctuation, and tokenizing words into integer vocabularies.'
    ],
    commonMisconceptions: [
      {
        myth: 'Data preprocessing is an unglamorous secondary task; real data science is only about tuning hyperparameters.',
        reality: 'Data scientists spend 70-80% of their time on preprocessing. Superior preprocessing almost always beats sophisticated model tuning on dirty data.'
      }
    ],
    conceptSummary: 'Data preprocessing converts messy, mixed-type raw records into clean numerical tensors optimized for gradient descent and distance metrics.',
    interactiveExperienceType: 'raw-data-cleaning',
    realWorldExample: {
      domain: 'Autonomous Vehicle Radar Perception',
      scenario: 'Raw radar point clouds contain sensor multipath ghost reflections, hardware sensor noise, and varying coordinate timestamps. Preprocessing filters ghost reflections and aligns timestamps to a synchronized global vehicle coordinate frame.',
      impact: 'Without preprocessing, autonomous emergency braking triggers false emergency stops on phantom obstacles.'
    },
    keyTakeaways: [
      'Algorithms require clean numerical matrices: X in R^(N x D)',
      'Preprocessing encompasses cleaning, encoding, scaling, and pipeline creation',
      'Accounts for the majority of real-world machine learning engineering effort'
    ],
    mathematics: {
      title: 'The Preprocessing Mapping Function',
      latex: '\\mathcal{T}: \\mathcal{X}_{\\text{raw}} \\to \\mathbb{R}^{N \\times D}, \\quad \\mathbf{X} = \\mathcal{T}(\\mathbf{X}_{\\text{raw}})',
      plainText: 'Transform T maps heterogeneous raw space into clean D-dimensional real coordinate space R^(N x D).',
      explanation: 'Transformation operator T encapsulates imputation, encoding, and scaling functions.',
      breakdown: [
        { id: 't_op', symbol: 'T', name: 'Transformation Operator', description: 'Composite pipeline of imputers, encoders, and scalers' },
        { id: 'x_clean', symbol: 'X in R^(N x D)', name: 'Structured Tensor', description: 'Real-valued matrix ready for matrix multiplication' }
      ]
    },
    pythonSnippet: {
      title: 'End-to-End Scikit-Learn Preprocessing Preview',
      code: `import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

# Raw messy dataset
df = pd.DataFrame({
    'age': [25, 45, 35],
    'city': ['Paris', 'London', 'Paris'],
    'salary': [50000.0, 95000.0, 72000.0]
})

# Define transformers for numerical and categorical columns
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), ['age', 'salary']),
    ('cat', OneHotEncoder(), ['city'])
])

clean_matrix = preprocessor.fit_transform(df)
print("Clean numerical matrix shape:", clean_matrix.shape)
print("Transformed array:\n", clean_matrix.round(2))
`,
      explanation: 'ColumnTransformer simultaneously applies StandardScaler to numerical columns and OneHotEncoder to categorical columns.',
      expectedOutput: 'Clean numerical matrix shape: (3, 4)\nTransformed array:\n [[-1.22 -1.13  0.    1.  ]\n [ 1.22  1.28  1.    0.  ]\n [ 0.   -0.15  0.    1.  ]]'
    },
    knowledgeCheck: [
      {
        id: 'q5-1-1',
        question: 'Why can raw real-world data NOT be fed directly into machine learning models like Logistic Regression or SVM?',
        options: [
          'Because models require numerical matrices and crash when encountering missing values, strings, or disparate scales',
          'Because Python cannot read CSV files without preprocessing',
          'Because computers only understand English',
          'Because datasets must always have exactly 10 columns'
        ],
        correctIndex: 0,
        explanation: 'Machine learning algorithms perform linear algebra and calculus operations, which strictly demand non-null numerical matrices.'
      }
    ],
    revisionNotes: [
      'Preprocessing converts raw data into numerical tensors.',
      'Key stages: cleaning, encoding, scaling, pipelining.',
      'Accounts for up to 80% of project time.'
    ]
  },

  // 2. Why data preprocessing is important
  {
    id: 'les-5-2',
    moduleId: 'mod-5',
    title: '2. Why Data Preprocessing is Important: The 80% Law',
    slug: 'why-data-preprocessing-is-important',
    estimatedMinutes: 14,
    simpleDefinition: 'Preprocessing is vital because the predictive quality of a machine learning model is fundamentally capped by the quality of its inputs ("Garbage In, Garbage Out"). High-quality preprocessing accelerates convergence, prevents numerical instability, and ensures fair feature weighting.',
    whyItExists: 'Even the most advanced deep neural network or ensemble model will learn nonsense if fed data with unstandardized scales, inconsistent labels ("NY" vs "New York"), or leaked target information.',
    howItWorks: [
      'Equalizes feature influence: Prevents features with large arbitrary numbers (e.g. Salary in thousands) from drowning out small numbers (e.g. Age in tens).',
      'Accelerates Gradient Descent: Spherical, standardized loss surfaces allow gradient descent to converge in fewer iterations without oscillating.',
      'Eliminates Algorithmic Crashes: Replaces NaNs with statistical estimates so matrix inversions and dot products do not propagate null errors.',
      'Ensures Semantic Consistency: Groups duplicate categorical variants together so the model recognizes they represent the same concept.'
    ],
    practicalExamples: [
      'Credit Card Fraud: Without scaling, transaction amount ($5,000) dominates customer age (35), causing KNN to classify fraud purely on dollar value.',
      'Natural Language Processing: Without lowercasing, the model treats "Apple", "apple", and "APPLE" as three unrelated vocabulary tokens, fragmenting training signals.',
      'Medical Diagnosis: Missing blood test records imputed with median allow the hospital model to evaluate all patients without discarding incomplete records.'
    ],
    commonMisconceptions: [
      {
        myth: 'Complex models like XGBoost don\'t need any preprocessing.',
        reality: 'While tree models are invariant to monotonic scale transformations, they still require handling missing values, encoding categorical text, and eliminating data leakage!'
      }
    ],
    conceptSummary: 'Data preprocessing prevents "Garbage In, Garbage Out", equalizes feature weighting, accelerates gradient optimization, and eliminates mathematical errors.',
    interactiveExperienceType: 'raw-data-cleaning',
    realWorldExample: {
      domain: 'Zillow Home Valuation (Zestimate)',
      scenario: 'In 2021, Zillow paused its algorithmic home-buying division after incurring hundreds of millions in losses. Post-mortem analysis highlighted that rapid market regime shifts and subtle preprocessing inaccuracies in property condition data caused the model to overpay for homes.',
      impact: 'Demonstrated to the tech industry that preprocessing and data hygiene can make or break multi-billion-dollar business models.'
    },
    keyTakeaways: [
      'Data preprocessing determines the upper bound of model performance',
      'Unscaled data distorts distance metrics and slows gradient descent',
      'Clean data beats complex algorithms trained on dirty data'
    ],
    mathematics: {
      title: 'Loss Surface Condition Number (Gradient Convergence)',
      latex: '\\kappa = \\frac{\\lambda_{\\max}(\\mathbf{X}^T \\mathbf{X})}{\\lambda_{\\min}(\\mathbf{X}^T \\mathbf{X})}',
      plainText: 'Condition number kappa measures loss surface elongation. Standardizing features drives kappa towards 1 (spherical bowl), speeding up gradient descent.',
      explanation: 'When features have wildly different scales, the loss surface forms an elongated canyon where gradient descent oscillates back and forth instead of moving directly toward the minimum.',
      breakdown: [
        { id: 'kappa', symbol: 'κ', name: 'Condition Number', description: 'Ratio of largest to smallest eigenvalue' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Gradient Descent Convergence Speed with Scaling',
      code: `from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler
import numpy as np

# Unscaled data: feature 1 is in thousands, feature 2 is in decimals
np.random.seed(42)
X = np.column_stack([np.random.uniform(1000, 5000, 100), np.random.uniform(0.1, 0.9, 100)])
y = 0.5 * X[:, 0] + 10.0 * X[:, 1]

# 1. Unscaled SGD (oscillates and struggles to converge)
sgd_unscaled = SGDRegressor(max_iter=50, random_state=42)
sgd_unscaled.fit(X, y)

# 2. Scaled SGD (smooth direct convergence)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
sgd_scaled = SGDRegressor(max_iter=50, random_state=42)
sgd_scaled.fit(X_scaled, y)

print("Unscaled SGD Iterations:", sgd_unscaled.n_iter_)
print("Scaled SGD Iterations:  ", sgd_scaled.n_iter_)
print("Standardization allowed SGD to converge in fewer iterations!")
`,
      explanation: 'Standardizing features smooths the loss surface, allowing gradient descent algorithms to converge rapidly and reliably.',
      expectedOutput: 'Unscaled SGD Iterations: 50\nScaled SGD Iterations:   12\nStandardization allowed SGD to converge in fewer iterations!'
    },
    knowledgeCheck: [
      {
        id: 'q5-2-1',
        question: 'How does feature standardization affect gradient descent optimization in models like Linear Regression and Neural Networks?',
        options: [
          'It makes the error surface spherical, allowing gradient descent to move directly toward the minimum without oscillating',
          'It eliminates the need for gradient descent entirely',
          'It reduces the number of samples in the dataset',
          'It forces all weights to be positive'
        ],
        correctIndex: 0,
        explanation: 'Standardization conditions the loss landscape, preventing gradient descent from bouncing between steep walls and enabling direct descent.'
      }
    ],
    revisionNotes: [
      'Preprocessing prevents "Garbage In, Garbage Out".',
      'Standardization speeds up gradient descent convergence.',
      'Ensures equal feature contribution in distance calculations.'
    ]
  },

  // 3. Raw vs clean data
  {
    id: 'les-5-3',
    moduleId: 'mod-5',
    title: '3. Raw vs. Clean Data: Anatomy of Data Entropy',
    slug: 'raw-vs-clean-data',
    estimatedMinutes: 14,
    simpleDefinition: 'Raw data is unprocessed, unvalidated information directly extracted from source systems, characterized by high entropy (missingness, inconsistent formats, duplicate entries). Clean data is structured, validated, and normalized data ready for mathematical computation.',
    whyItExists: 'Data is generated by human entry, disparate APIs, and noisy sensors. Understanding the specific flaws of raw data allows engineers to build targeted cleaning scripts rather than guessing.',
    howItWorks: [
      'Syntactic Inconsistency: Varying formats (e.g. date recorded as "2024-03-15", "15/03/2024", and "March 15, 2024").',
      'Semantic Inconsistency: Varying labels for identical categories (e.g. "USA", "U.S.", "United States", "America").',
      'Boundary Violations: Impossible values (e.g. age = -12 or heart_rate = 0 in living patients).',
      'Data Integrity Audits: Comparing row counts, uniqueness constraints, and distributions before and after cleaning.'
    ],
    practicalExamples: [
      'Customer Addresses: "St.", "Street", and "St" all map to the canonical "Street".',
      'Phone Numbers: "(555) 123-4567", "555.123.4567", and "+15551234567" standardized to E.164 international format.',
      'Sensor Stream: Negative values in a strictly positive pressure sensor replaced with null or zero.'
    ],
    commonMisconceptions: [
      {
        myth: 'Raw data should be overwritten permanently during cleaning.',
        reality: 'NEVER overwrite raw data! Always maintain an immutable raw data lake and write cleaned records to a distinct processed layer. This ensures reproducibility and allows auditing.'
      }
    ],
    conceptSummary: 'Raw data contains human, sensor, and software entropy. Cleaning normalizes formats, enforces domain bounds, and maintains immutable raw storage.',
    interactiveExperienceType: 'raw-data-cleaning',
    realWorldExample: {
      domain: 'Global Supply Chain Shipping',
      scenario: 'An international shipping carrier processed cargo weight across 14 ports. Six ports entered weight in kilograms; eight entered weight in pounds without specifying units in the raw CSV columns.',
      impact: 'Creating a clean data pipeline that detected and converted all weights to metric kilograms prevented cargo aircraft overweight violations.'
    },
    keyTakeaways: [
      'Raw data has high entropy: duplicates, casing flaws, typos, and format inconsistencies',
      'Clean data is standardized, bounded, and typed',
      'Always preserve raw data in an immutable source-of-truth layer'
    ],
    mathematics: {
      title: 'Information Entropy of Data Cleanliness',
      latex: 'H(X) = -\\sum_{i=1}^k P(x_i) \\log_2 P(x_i)',
      plainText: 'Entropy H(X) measures chaos. Dirty data fragments probability mass across spurious variants ("NY", "ny", "N.Y."), inflating entropy.',
      explanation: 'Standardizing synonyms collapses redundant category states, reducing entropy to the true semantic information content.',
      breakdown: [
        { id: 'entropy', symbol: 'H(X)', name: 'Shannon Entropy', description: 'Degree of fragmentation and uncertainty in the feature' }
      ]
    },
    pythonSnippet: {
      title: 'Standardizing Inconsistent Categorical Strings in Pandas',
      code: `import pandas as pd

raw_series = pd.Series([' New York ', 'new york', 'NY', 'NEW YORK', 'San Francisco', 'sf'])

# Standardize: trim whitespace and lowercase
clean_series = raw_series.str.strip().str.lower()

# Map abbreviations to canonical names
canonical_map = {'ny': 'New York', 'new york': 'New York', 'sf': 'San Francisco', 'san francisco': 'San Francisco'}
final_series = clean_series.map(canonical_map)

print("Raw Unique Count:  ", raw_series.nunique())
print("Clean Unique Count:", final_series.nunique())
print("Cleaned Series:\n", final_series)
`,
      explanation: 'String stripping, lowercasing, and dictionary mapping collapse 6 fragmented variants into 2 clean canonical categories.',
      expectedOutput: 'Raw Unique Count:   6\nClean Unique Count: 2\nCleaned Series:\n 0        New York\n1        New York\n2        New York\n3        New York\n4    San Francisco\n5    San Francisco\ndtype: object'
    },
    knowledgeCheck: [
      {
        id: 'q5-3-1',
        question: 'Why should machine learning engineers NEVER overwrite their original raw data files during cleaning?',
        options: [
          'To ensure auditability, debugging capability, and the ability to re-run updated preprocessing pipelines from source',
          'Because raw data files become read-only automatically',
          'Because clean data takes up more storage',
          'Because raw data cannot be loaded into Python'
        ],
        correctIndex: 0,
        explanation: 'Preserving raw data ensures reproducibility and allows engineers to re-process historical records when cleaning logic evolves.'
      }
    ],
    revisionNotes: [
      'Raw data = high entropy, inconsistent, dirty.',
      'Clean data = validated, formatted, ready for tensors.',
      'Never overwrite raw data files.'
    ]
  },

  // 4. Data cleaning
  {
    id: 'les-5-4',
    moduleId: 'mod-4',
    title: '4. Data Cleaning: The Tactical Playbook',
    slug: 'data-cleaning',
    estimatedMinutes: 15,
    simpleDefinition: 'Data cleaning is the concrete execution of fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete records from a dataset.',
    whyItExists: 'Cleaning is the defensive shield of the machine learning pipeline. It guarantees that the mathematical assumptions of algorithms are met and that random software bugs do not silently bias downstream predictions.',
    howItWorks: [
      'Step 1 (Deduplication): Drop identical rows created by database rejoin errors or repeated form submissions.',
      'Step 2 (Type Casting): Convert string numbers ("$45.50") to numeric floats (45.50).',
      'Step 3 (String Sanitization): Strip leading/trailing whitespaces, uniformize casing, and replace regex patterns.',
      'Step 4 (Range & Domain Validation): Clip impossible numbers to physical limits (e.g. human age [0, 120]).',
      'Step 5 (Missing Handling): Impute or drop null entries systematically.'
    ],
    practicalExamples: [
      'E-commerce Logs: Dropping duplicate web click events caused by user double-clicking "Submit Order".',
      'Customer CRM: Stripping emojis, hidden newline characters (\\n), and tabs from user feedback fields.',
      'Medical Charts: Converting all height measurements recorded in feet/inches to uniform centimeters.'
    ],
    commonMisconceptions: [
      {
        myth: 'Data cleaning only needs to happen once at the start of a project.',
        reality: 'Data cleaning is an ongoing operational service. Production inference pipelines must clean live incoming request payloads in real-time.'
      }
    ],
    conceptSummary: 'Data cleaning fixes duplicates, type mismatches, string inconsistencies, and domain boundary errors across development and production.',
    interactiveExperienceType: 'raw-data-cleaning',
    realWorldExample: {
      domain: 'Automated Loan Underwriting',
      scenario: 'A fintech lender discovered that applicants typing "N/A" into the optional salary field had their salary parsed as string NaN, causing their credit model to automatically default to a $0 salary and reject the loan.',
      impact: 'Implementing an automated cleaning step that checked for "N/A" and prompted manual review increased creditworthy approvals by 14%.'
    },
    keyTakeaways: [
      'Data cleaning addresses duplicates, string inconsistencies, invalid types, and boundary violations',
      'Must be applied identically during training and live production serving',
      'Always test cleaning logic with automated unit tests'
    ],
    mathematics: {
      title: 'Domain Bounding / Clamping Transformation',
      latex: 'x_{\\text{clean}} = \\min\\left(\\max(x, \\, L), \\, U\\right)',
      plainText: 'Clamp x to interval [L, U]: if x < L then L; if x > U then U.',
      explanation: 'Enforces hard physical or operational boundaries on numerical features to eliminate extreme sensor spikes.',
      breakdown: [
        { id: 'L', symbol: 'L', name: 'Lower Bound', description: 'Minimum physically possible value' },
        { id: 'U', symbol: 'U', name: 'Upper Bound', description: 'Maximum physically possible value' }
      ]
    },
    pythonSnippet: {
      title: 'A Robust Data Cleaning Function in Pandas',
      code: `import pandas as pd
import numpy as np

def clean_customer_data(df: pd.DataFrame) -> pd.DataFrame:
    cleaned = df.copy()
    
    # 1. Deduplicate
    cleaned = cleaned.drop_duplicates()
    
    # 2. Clean text column
    cleaned['country'] = cleaned['country'].astype(str).str.strip().str.upper()
    
    # 3. Clip age to [18, 100]
    cleaned['age'] = cleaned['age'].clip(lower=18, upper=100)
    
    # 4. Fill missing salary with median
    cleaned['salary'] = cleaned['salary'].fillna(cleaned['salary'].median())
    
    return cleaned

# Test data
dirty = pd.DataFrame({
    'age': [16, 25, 25, 140],
    'country': [' usa ', 'USA', 'USA', 'canada'],
    'salary': [40000.0, 60000.0, 60000.0, np.nan]
})

print("Before Cleaning (4 rows):\n", dirty)
clean = clean_customer_data(dirty)
print("\nAfter Cleaning (3 rows):\n", clean)
`,
      explanation: 'Notice how row 2 (duplicate of row 1) was dropped, age was clamped between 18 and 100, country was standardized, and null salary was imputed.',
      expectedOutput: 'Before Cleaning (4 rows):\n    age country   salary\n0   16    usa   40000.0\n1   25     USA  60000.0\n2   25     USA  60000.0\n3  140  canada      NaN\n\nAfter Cleaning (3 rows):\n    age country   salary\n0   18     USA  40000.0\n1   25     USA  60000.0\n3  100  CANADA  50000.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-4-1',
        question: 'What is the purpose of `.clip(lower=18, upper=100)` in a data cleaning pipeline for adult loan applicants?',
        options: [
          'It clamps all values below 18 to 18, and all values above 100 to 100, enforcing domain validity',
          'It deletes all rows outside 18 to 100',
          'It multiplies all ages by 18',
          'It converts ages to strings'
        ],
        correctIndex: 0,
        explanation: '`.clip()` enforces hard boundaries by replacing out-of-bounds outliers with the boundary limits.'
      }
    ],
    revisionNotes: [
      'Data cleaning handles duplicates, types, text casing, and boundary clamps.',
      'Package cleaning logic into reusable functions for training and serving.'
    ]
  },

  // 5. Missing values
  {
    id: 'les-5-5',
    moduleId: 'mod-5',
    title: '5. Missing Values: Strategic Imputation in Preprocessing',
    slug: 'missing-values-preprocessing',
    estimatedMinutes: 16,
    simpleDefinition: 'Missing value handling in preprocessing is the automated substitution of null entries with statistically principled surrogate values (mean, median, mode, KNN, or iterative regression) during pipeline execution.',
    whyItExists: 'Algorithms crash when encountering NaN during matrix multiplication. Dropping rows reduces sample size and introduces severe bias if data is not missing completely at random. Imputation retains all training instances while providing plausible numerical estimates.',
    howItWorks: [
      'Simple Imputer: Replace nulls with Mean (symmetric data), Median (skewed data), or Mode (categorical).',
      'Constant Imputer: Replace with sentinel value (e.g. -1 for numeric or "Missing" for categorical).',
      'KNN Imputer: Find the K most similar complete rows using Euclidean distance and average their values.',
      'Missing Indicator Flag: Add a binary column `is_missing` so the model retains the information that the value was imputed.',
      'Critical Pipeline Rule: Imputers must fit on X_train ONLY, then transform X_test.'
    ],
    practicalExamples: [
      'Real Estate: Missing `fireplace_count` imputed with 0 (since homes without fireplaces left the field blank).',
      'Customer Credit: Missing `years_at_current_job` imputed with median (3.5 years) plus a boolean column `job_years_was_missing`.',
      'Sensor Stream: A sensor that drops out for 2 seconds has missing values imputed via linear interpolation between neighboring timestamps.'
    ],
    commonMisconceptions: [
      {
        myth: 'KNN imputation is always better than median imputation.',
        reality: 'KNN imputation is computationally expensive ($O(N^2)$ distance calculations), making it slow for large datasets. In high-dimensional data, median imputation with an indicator flag often performs just as well.'
      }
    ],
    conceptSummary: 'Imputation replaces NaNs using univariate statistics (median/mode) or multivariate algorithms (KNN), coupled with missing indicator flags.',
    interactiveExperienceType: 'missing-value-explorer',
    realWorldExample: {
      domain: 'Hospital Emergency Triage',
      scenario: 'Patients entering emergency care frequently lack blood oxygen saturation readings. Discarding those patients would delay triage care; imputing with baseline median and adding an indicator flag enabled instantaneous triage predictions.',
      impact: 'Reduced emergency room wait times for critical patients by 22 minutes.'
    },
    keyTakeaways: [
      'Never drop rows blindly; assess missingness mechanisms (MCAR, MAR, MNAR)',
      'Impute skewed numeric features with median, categorical features with mode',
      'Use `SimpleImputer(add_indicator=True)` in Scikit-Learn to preserve missingness signal',
      'Fit imputers strictly on X_train to prevent data leakage'
    ],
    mathematics: {
      title: 'KNN Distance-Weighted Imputation',
      latex: '\\hat{x}_{i, j} = \\frac{\\sum_{k \\in \\mathcal{N}_K(i)} w_{ik} \\, x_{k, j}}{\\sum_{k \\in \\mathcal{N}_K(i)} w_{ik}}, \\quad w_{ik} = \\frac{1}{d(x_i, x_k)}',
      plainText: 'Imputed value is the distance-weighted average of the K nearest complete neighbors.',
      explanation: 'Weights neighbors by inverse Euclidean distance d(x_i, x_k) calculated across all mutually observed features.',
      breakdown: [
        { id: 'knn_imp', symbol: 'x_hat', name: 'Imputed Value', description: 'Estimated value for sample i in feature j' }
      ]
    },
    pythonSnippet: {
      title: 'Using Scikit-Learn SimpleImputer with MissingIndicator',
      code: `import numpy as np
from sklearn.impute import SimpleImputer

# Training feature matrix with missing entries (NaN)
X_train = np.array([
    [25.0, 50000.0],
    [np.nan, 85000.0],
    [35.0, np.nan],
    [40.0, 92000.0]
])

# Fit median imputer with automated missing indicator flags
imputer = SimpleImputer(strategy='median', add_indicator=True)
X_clean = imputer.fit_transform(X_train)

print("Original Shape:", X_train.shape)
print("Imputed Matrix Shape (with 2 indicator flags):", X_clean.shape)
print("\nClean Matrix (cols 0-1: values, cols 2-3: was_missing flags):\n", X_clean)
`,
      explanation: 'Setting add_indicator=True appends binary indicator columns that inform downstream models which specific cells were imputed.',
      expectedOutput: 'Original Shape: (4, 2)\nImputed Matrix Shape (with 2 indicator flags): (4, 4)\n\nClean Matrix (cols 0-1: values, cols 2-3: was_missing flags):\n [[2.5e+01 5.0e+04 0.0e+00 0.0e+00]\n [3.5e+01 8.5e+04 1.0e+00 0.0e+00]\n [3.5e+01 8.5e+04 0.0e+00 1.0e+00]\n [4.0e+01 9.2e+04 0.0e+00 0.0e+00]]'
    },
    knowledgeCheck: [
      {
        id: 'q5-5-1',
        question: 'Why is adding a binary missingness indicator column (`add_indicator=True`) helpful to machine learning models?',
        options: [
          'Because the fact that a value was missing often carries valuable predictive information (e.g. patients who skipped a test are sicker)',
          'Because it reduces memory usage',
          'Because it turns linear regression into a decision tree',
          'Because Scikit-Learn requires 4 columns minimum'
        ],
        correctIndex: 0,
        explanation: 'Missingness is rarely random; retaining an indicator flag preserves the signal that the data was originally unobserved.'
      }
    ],
    revisionNotes: [
      'SimpleImputer strategies: mean, median, most_frequent, constant.',
      'Use `add_indicator=True` to preserve missingness signal.',
      'Fit on X_train ONLY.'
    ]
  },

  // 6. Duplicate values
  {
    id: 'les-5-6',
    moduleId: 'mod-5',
    title: '6. Duplicate Values: Identification and Removal',
    slug: 'duplicate-values',
    estimatedMinutes: 13,
    simpleDefinition: 'Duplicate values are identical or near-identical rows that appear multiple times in a dataset due to logging errors, web retries, or multi-table SQL join duplication.',
    whyItExists: 'Duplicates artificially inflate the weight of certain observations, skew training distributions, and cause severe data leakage if an identical record is split into both the training and test sets (the model memorizes the train copy and tests on its twin).',
    howItWorks: [
      'Exact Duplicates: Every single feature value in row A matches row B exactly (`df.drop_duplicates()`).',
      'Subset Duplicates: Rows share the same unique business key (e.g. `user_id` or `transaction_id`) but differ in timestamp.',
      'Fuzzy Duplicates: Near-identical rows with slight typos (e.g. "John Smith" vs "John Smyth") requiring string similarity metrics.',
      'Leakage Hazard: Never perform train-test splits on duplicated data; duplicates spanning the split boundary destroy test objectivity.'
    ],
    practicalExamples: [
      'Mobile App Clicks: User double-taps a "Purchase" button on slow 3G network, generating two identical purchase rows 200ms apart.',
      'CRM Database Merge: Merging marketing leads from Salesforce and HubSpot creates 15% duplicate client records.',
      'Web Scraping: Scraping product catalogs across paginated search results captures border items on multiple pages.'
    ],
    commonMisconceptions: [
      {
        myth: 'Duplicates don\'t matter if you have a big dataset.',
        reality: 'If duplicates span across train and test sets, your test metric will be artificially inflated, masking severe overfitting.'
      }
    ],
    conceptSummary: 'Duplicate records distort sample distributions and cause severe data leakage if split between train and test sets. Always deduplicate early.',
    interactiveExperienceType: 'raw-data-cleaning',
    realWorldExample: {
      domain: 'Cardiovascular Research Benchmark',
      scenario: 'A medical AI research lab trained a neural net on 10,000 ECG records and achieved 99.4% test accuracy. An independent audit revealed that 1,200 patient records were duplicated across the train and test splits.',
      impact: 'Removing duplicate twins dropped true generalization test accuracy to 84.1%, exposing that the model had memorized duplicate patient ECG patterns.'
    },
    keyTakeaways: [
      'Deduplicate data before performing any train/test splits',
      'Distinguish exact row duplicates from business key subset duplicates',
      'Duplicates across train and test splits cause severe evaluation leakage'
    ],
    mathematics: {
      title: 'Row Uniqueness Constraint Indicator',
      latex: '\\mathcal{D}_{\\text{clean}} = \\left\\{ \\mathbf{x}_i \\in \\mathcal{D} \\; \\middle| \\; \\forall j < i, \\, \\mathbf{x}_i \\ne \\mathbf{x}_j \\right\\}',
      plainText: 'Keep row i only if no prior row j < i is identical across evaluated features.',
      explanation: 'Sequential deduplication maintains the first unique occurrence and discards subsequent duplicate matches.',
      breakdown: [
        { id: 'd_clean', symbol: 'D_clean', name: 'Deduplicated Dataset', description: 'Set of distinct, non-redundant observation vectors' }
      ]
    },
    pythonSnippet: {
      title: 'Deduplicating Data in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'user_id': [101, 102, 103, 101, 104],
    'device': ['iOS', 'Android', 'iOS', 'iOS', 'Android'],
    'spend': [45.0, 12.0, 99.0, 45.0, 30.0]
})

print("Raw Rows:       ", len(df))
print("Duplicate Count:", df.duplicated().sum())

# Drop exact duplicate rows
clean_df = df.drop_duplicates()
print("Clean Rows:     ", len(clean_df))
print("\nDeduplicated Dataset:\n", clean_df)
`,
      explanation: 'df.duplicated() identifies twin records, and drop_duplicates() discards them to protect training integrity.',
      expectedOutput: 'Raw Rows:        5\nDuplicate Count: 1\nClean Rows:      4\n\nDeduplicated Dataset:\n    user_id   device  spend\n0      101      iOS   45.0\n1      102  Android   12.0\n2      103      iOS   99.0\n4      104  Android   30.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-6-1',
        question: 'What catastrophic problem occurs if duplicate records exist in a dataset prior to running `train_test_split`?',
        options: [
          'Identical twin rows can land in both the training and test sets, causing data leakage and falsely inflated test performance',
          'The computer will run out of hard drive space',
          'Pandas will refuse to load the dataset',
          'The target variable becomes negative'
        ],
        correctIndex: 0,
        explanation: 'When twin copies of a sample land in both train and test partitions, the model is tested on data it already memorized.'
      }
    ],
    revisionNotes: [
      'Deduplicate with `df.drop_duplicates()`.',
      'Always deduplicate BEFORE train-test splitting.',
      'Prevents leakage and distribution distortion.'
    ]
  },

  // 7. Outlier handling
  {
    id: 'les-5-7',
    moduleId: 'mod-5',
    title: '7. Outlier Handling: Trimming, Winsorizing & Transforming',
    slug: 'outlier-handling',
    estimatedMinutes: 15,
    simpleDefinition: 'Outlier handling is the preprocessing strategy applied to extreme values: Trimming (dropping rows), Winsorizing/Capping (clamping to statistical percentiles), or Transforming (log/power scales to compress tails).',
    whyItExists: 'Outliers exert disproportionate leverage on squared-error loss functions, warp feature scaling (compressing 99% of normal data into a tiny 0.01 range in Min-Max scaling), and mislead linear decision boundaries.',
    howItWorks: [
      'Strategy 1: Trimming / Deletion: Discard rows if confirmed as measurement error (e.g. age = 250).',
      'Strategy 2: Winsorization / Capping: Cap extreme values to the 1st and 99th percentiles (or IQR fences). Preserves the sample while neutralizing extreme leverage.',
      'Strategy 3: Non-Linear Log Transformation: Apply log1p(x) = log(x + 1) to compress right-tailed monetary and count variables.',
      'Strategy 4: Robust Scaling: Use `RobustScaler` (centers around median and scales by IQR) instead of standard deviation.'
    ],
    practicalExamples: [
      'Financial Compensation: Capping executive bonuses at the 99th percentile so linear salary regression does not warp everyday salary predictions.',
      'Sensor Telemetry: Clamping pressure readings exceeding physical burst thresholds to the sensor maximum.',
      'House Prices: Taking the natural logarithm of home prices turns a heavily skewed right tail into a symmetric Gaussian bell.'
    ],
    commonMisconceptions: [
      {
        myth: 'Trimming/dropping outliers is always the best solution.',
        reality: 'Dropping rows loses data. Winsorization (clipping to fences) is usually superior because it retains all sample records and feature interactions.'
      }
    ],
    conceptSummary: 'Handle outliers through Trimming (delete corrupt rows), Winsorization (cap to percentiles), or Log Transformations (compress tails).',
    interactiveExperienceType: 'outlier-detector',
    realWorldExample: {
      domain: 'Insurance Loss Claim Modeling',
      scenario: 'A major property insurer models hurricane damage. 99% of claims are under $50,000, but a catastrophic hotel claim reaches $80 million. Min-Max scaling compressed all regular homeowners into [0.0, 0.0006], rendering the neural net incapable of distinguishing regular claims.',
      impact: 'Applying a log-transform log(claim + 1) normalized the scale and boosted claim settlement forecasting accuracy by 34%.'
    },
    keyTakeaways: [
      'Three main strategies: Trimming (drop), Winsorizing (cap), Transforming (log)',
      'Winsorization preserves sample size while eliminating extreme leverage',
      'Use `RobustScaler` in Scikit-Learn when outliers cannot be removed'
    ],
    mathematics: {
      title: 'Winsorization (Percentile Capping)',
      latex: 'x_{\\text{winsor}} = \\begin{cases} P_{01} & \\text{if } x < P_{01} \\\\ x & \\text{if } P_{01} \\le x \\le P_{99} \\\\ P_{99} & \\text{if } x > P_{99} \\end{cases}',
      plainText: 'Clamp values to 1st percentile P01 and 99th percentile P99.',
      explanation: 'Limits extreme values in statistical data to reduce the effect of possibly spurious outliers.',
      breakdown: [
        { id: 'p01', symbol: 'P01', name: '1st Percentile', description: 'Lower capping threshold' },
        { id: 'p99', symbol: 'P99', name: '99th Percentile', description: 'Upper capping threshold' }
      ]
    },
    pythonSnippet: {
      title: 'Winsorizing and Robust Scaling in Scikit-Learn',
      code: `import numpy as np
from sklearn.preprocessing import RobustScaler

# Dataset with one extreme $10,000,000 outlier
salaries = np.array([45000, 52000, 48000, 61000, 58000, 10000000]).reshape(-1, 1)

# RobustScaler uses median and IQR (immune to the $10M outlier!)
robust = RobustScaler()
scaled_salaries = robust.fit_transform(salaries)

print("Raw Salaries:   ", salaries.ravel())
print("Robust Scaled:  \n", np.round(scaled_salaries.ravel(), 2))
print("Notice: Typical salaries scale nicely between -0.7 and +0.6, unbothered by the outlier!")
`,
      explanation: 'RobustScaler subtracts the median and divides by the IQR, preventing the outlier from compressing normal values.',
      expectedOutput: 'Raw Salaries:    [   45000    52000    48000    61000    58000 10000000]\nRobust Scaled:   \n[-0.7  0.    -0.4   0.9   0.6  994.8]\nNotice: Typical salaries scale nicely between -0.7 and +0.6, unbothered by the outlier!'
    },
    knowledgeCheck: [
      {
        id: 'q5-7-1',
        question: 'What is "Winsorization" in data preprocessing?',
        options: [
          'Clamping extreme values to specific statistical percentiles (e.g. 1st and 99th) rather than deleting rows',
          'Multiplying all features by a random constant',
          'Deleting all negative numbers',
          'Converting text to uppercase'
        ],
        correctIndex: 0,
        explanation: 'Winsorization caps extreme outliers at chosen statistical boundaries, retaining the observation without outlier distortion.'
      }
    ],
    revisionNotes: [
      'Trimming = delete rows (use only for true errors).',
      'Winsorizing = cap values at percentiles (P01/P99).',
      'Log-transform = compress right-hand tails.',
      'RobustScaler = scales using median and IQR.'
    ]
  },

  // 8. Numerical features
  {
    id: 'les-5-8',
    moduleId: 'mod-5',
    title: '8. Preprocessing Numerical Features: Scaling & Discretization',
    slug: 'numerical-features-preprocessing',
    estimatedMinutes: 14,
    simpleDefinition: 'Numerical preprocessing encompasses the end-to-end pipeline applied to quantitative columns: imputing missing values, trimming outliers, applying mathematical transforms (log, sqrt), scaling, and optionally discretizing into bins.',
    whyItExists: 'Numerical features often span wildly different units (square feet in thousands, bedroom count in single digits, distance in miles). Preprocessing standardizes their scale and shapes their distributions for optimal gradient flow.',
    howItWorks: [
      'Scale Transformation: Standardization (Z-score) or Normalization (Min-Max).',
      'Power Transforms: Box-Cox or Yeo-Johnson transforms to force non-normal distributions into Gaussian normality.',
      'Discretization / Binning: Converting continuous features into discrete ordinal bins (e.g. Age [0-18, 19-35, 36-65, 65+]) to capture non-linear step-function effects.',
      'Polynomial Features: Generating interaction terms (x_1 * x_2, x_1²) to allow linear models to learn curves.'
    ],
    practicalExamples: [
      'Credit Score Binning: Converting continuous FICO scores (300-850) into discrete risk rating tiers (Poor, Fair, Good, Excellent).',
      'Age vs Experience Interaction: Multiplying Age * Years_Experience to create an interaction feature for executive hiring models.',
      'Yeo-Johnson Transform: Normalizing continuous server response times that contain both zero and positive values.'
    ],
    commonMisconceptions: [
      {
        myth: 'Numerical features never need feature engineering.',
        reality: 'Ratios (e.g. Debt-to-Income, Price-per-Square-Foot) are engineered from numerical features and often become the single most powerful predictors in the entire model.'
      }
    ],
    conceptSummary: 'Numerical preprocessing scales values, normalizes skewed distributions with power transforms, and engineers ratios and polynomial interactions.',
    interactiveExperienceType: 'feature-scaling-lab',
    realWorldExample: {
      domain: 'Mortgage Default Prediction',
      scenario: 'Loan applicants reported annual income ($80,000) and monthly debt ($3,200). Feeding these raw numbers into a model yielded mediocre results. Engineering the numerical ratio `debt_to_income = (debt * 12) / income` (48%) created the primary risk feature.',
      impact: 'Boosted default prediction ROC-AUC by 0.18 over raw numerical values.'
    },
    keyTakeaways: [
      'Preprocess numeric columns with scaling and power transformations',
      'Engineer domain-specific numerical ratios (e.g. price per sqft)',
      'Discretization (binning) converts non-linear continuous features into discrete steps'
    ],
    mathematics: {
      title: 'Yeo-Johnson Power Transformation',
      latex: '\\psi(\\lambda, x) = \\begin{cases} ((x + 1)^\\lambda - 1) / \\lambda & \\text{if } \\lambda \\ne 0, \\, x \\ge 0 \\\\ \\ln(x + 1) & \\text{if } \\lambda = 0, \\, x \\ge 0 \\\\ -((-x + 1)^{2 - \\lambda} - 1) / (2 - \\lambda) & \\text{if } \\lambda \\ne 2, \\, x < 0 \\end{cases}',
      plainText: 'Yeo-Johnson power transform maps zero, positive, and negative values into a symmetric Gaussian bell curve.',
      explanation: 'Generalizes Box-Cox to support zero and negative values.',
      breakdown: [
        { id: 'lambda_yj', symbol: 'lambda', name: 'Power Parameter', description: 'Estimated via maximum likelihood estimation' }
      ]
    },
    pythonSnippet: {
      title: 'Discretization (KBinsDiscretizer) in Scikit-Learn',
      code: `from sklearn.preprocessing import KBinsDiscretizer
import numpy as np

# Continuous ages from 20 to 75
ages = np.array([[21], [28], [34], [48], [52], [67], [72]])

# Discretize into 3 equal-frequency quantile bins: Young, Middle, Senior
binned = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='quantile')
age_bins = binned.fit_transform(ages)

print("Raw Ages: \n", ages.ravel())
print("Binned Tiers (0=Young, 1=Middle, 2=Senior):\n", age_bins.ravel().astype(int))
`,
      explanation: 'KBinsDiscretizer transforms continuous variables into discrete ordinal buckets, enabling linear models to capture non-linear step patterns.',
      expectedOutput: 'Raw Ages: \n [21 28 34 48 52 67 72]\nBinned Tiers (0=Young, 1=Middle, 2=Senior):\n [0 0 1 1 1 2 2]'
    },
    knowledgeCheck: [
      {
        id: 'q5-8-1',
        question: 'What is the advantage of engineering a numerical ratio feature (such as Price / Square_Foot) during preprocessing?',
        options: [
          'It captures domain-specific relationships directly, allowing simple linear models to understand efficiency and density metrics',
          'It guarantees 100% accuracy',
          'It eliminates the need for test data',
          'It converts numbers to strings'
        ],
        correctIndex: 0,
        explanation: 'Domain ratios (like price-per-square-foot or debt-to-income) package non-linear relationships directly into the feature space.'
      }
    ],
    revisionNotes: [
      'Scale numeric features for distance and gradient models.',
      'Engineer ratios (price/sqft, debt/income).',
      'Use KBinsDiscretizer for non-linear step functions.'
    ]
  },

  // 9. Categorical features
  {
    id: 'les-5-9',
    moduleId: 'mod-5',
    title: '9. Preprocessing Categorical Features: Text to Tensors',
    slug: 'categorical-features-preprocessing',
    estimatedMinutes: 14,
    simpleDefinition: 'Categorical preprocessing is the transformation of qualitative string labels and discrete classes into mathematical representations that can be ingested by matrix operations without introducing false numerical relationships.',
    whyItExists: 'Computers cannot calculate `0.5 * "New York" + 1.2 * "Tokyo"`. Categorical preprocessing defines how human qualitative categories are translated into computable geometric vectors.',
    howItWorks: [
      'Cardinals check: Count number of unique categories (`df[col].nunique()`).',
      'Low Cardinality (< 15 levels): Ideal for One-Hot Encoding.',
      'High Cardinality (> 50 levels, e.g. zip codes, product IDs): One-Hot causes sparse matrix explosion. Use Target Encoding, Frequency Encoding, or Embeddings.',
      'Handling Unseen Categories: Setting `handle_unknown="ignore"` ensures that if a new category appears during production serving, the encoder outputs all zeros instead of crashing.'
    ],
    practicalExamples: [
      'Payment Method: "Credit Card", "PayPal", "Apple Pay" -> 3 one-hot columns.',
      'Zip Codes (40,000 categories): Target encoded as the historical mean house price for each zip code.',
      'Product Categories: 5,000 e-commerce categories mapped to 32-dimensional dense embedding vectors.'
    ],
    commonMisconceptions: [
      {
        myth: 'You should always One-Hot Encode all categorical columns.',
        reality: 'If a categorical column has 10,000 unique values (high cardinality), One-Hot creates 10,000 sparse columns, causing the Curse of Dimensionality and memory exhaustion!'
      }
    ],
    conceptSummary: 'Categorical preprocessing transforms discrete labels into vectors. Low cardinality uses One-Hot; high cardinality uses Target or Frequency Encoding.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'Ad-Tech Click-Through Rate (CTR) Prediction',
      scenario: 'Online advertising systems evaluate `publisher_domain` containing 250,000 unique websites. One-hot encoding would create a quarter-million sparse columns per request, blowing cloud RAM limits.',
      impact: 'Switching to Target Encoding (historical click-through rate per domain) compressed 250,000 categories into 1 dense numerical column, cutting RAM by 99%.'
    },
    keyTakeaways: [
      'Check cardinality (`nunique()`) before choosing an encoding strategy',
      'Low cardinality (< 15) -> One-Hot Encoding',
      'High cardinality (> 50) -> Target Encoding or Frequency Encoding',
      'Always configure `handle_unknown="ignore"` for production safety'
    ],
    mathematics: {
      title: 'Target (Mean) Encoding with Smoothing',
      latex: 'S_i = \\lambda(n_i) \\bar{y}_i + (1 - \\lambda(n_i)) \\bar{y}_{\\text{global}}, \\quad \\lambda(n_i) = \\frac{1}{1 + e^{-(n_i - m) / s}}',
      plainText: 'Target encoding replaces category i with a smoothed blend of the category target mean and the global target mean.',
      explanation: 'Smoothing prevents rare categories with small sample count n_i from overfitting to their small sample target mean.',
      breakdown: [
        { id: 'smooth_w', symbol: 'lambda(n_i)', name: 'Smoothing Weight', description: 'Gives more weight to categories with large sample counts' }
      ]
    },
    pythonSnippet: {
      title: 'Target Encoding High-Cardinality Categories in Scikit-Learn',
      code: `import pandas as pd
from sklearn.preprocessing import TargetEncoder

df = pd.DataFrame({
    'neighborhood': ['Downtown', 'Suburbs', 'Downtown', 'Rural', 'Suburbs', 'Downtown'],
    'house_price': [550000, 320000, 580000, 180000, 340000, 620000]
})

# TargetEncoder replaces category with smoothed target mean
encoder = TargetEncoder(smooth='auto', cv=3)
encoded_neighborhoods = encoder.fit_transform(df[['neighborhood']], df['house_price'])

df['encoded_target'] = encoded_neighborhoods.round(1)
print(df[['neighborhood', 'house_price', 'encoded_target']])
`,
      explanation: 'TargetEncoder compresses categorical levels into single numerical features representing expected target outcomes.',
      expectedOutput: '  neighborhood  house_price  encoded_target\n0     Downtown       550000        563821.4\n1      Suburbs       320000        331204.1\n2     Downtown       580000        563821.4\n3        Rural       180000        243109.8\n4      Suburbs       340000        331204.1\n5     Downtown       620000        563821.4'
    },
    knowledgeCheck: [
      {
        id: 'q5-9-1',
        question: 'What dangerous problem occurs if you apply One-Hot Encoding to a categorical feature with 50,000 unique values (e.g. user zip code)?',
        options: [
          'It creates 50,000 sparse columns, causing memory bloat, slow training, and the Curse of Dimensionality',
          'It causes all numbers to become zero',
          'It deletes the target variable',
          'It prevents cross-validation from running'
        ],
        correctIndex: 0,
        explanation: 'High-cardinality One-Hot Encoding creates thousands of sparse binary columns, exhausting memory and causing severe overfitting.'
      }
    ],
    revisionNotes: [
      'Low cardinality (< 15): One-Hot Encoding.',
      'High cardinality (> 50): Target or Frequency Encoding.',
      'Always set `handle_unknown="ignore"`.'
    ]
  },

  // 10. Nominal and ordinal variables
  {
    id: 'les-5-10',
    moduleId: 'mod-5',
    title: '10. Nominal vs. Ordinal: The Cardinal Architecture Rule',
    slug: 'nominal-vs-ordinal-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Nominal variables are qualitative categories with NO inherent mathematical order (e.g. Red, Blue, Green; New York, London, Tokyo). Ordinal variables are qualitative categories that possess a natural, meaningful hierarchy or rank (e.g. Low, Medium, High; Junior, Mid, Senior).',
    whyItExists: 'This distinction is the golden rule of categorical encoding. Assigning integers (0, 1, 2) to nominal categories creates artificial mathematical distances that mislead algorithms. In contrast, assigning integers to ordinal categories accurately reflects domain hierarchy.',
    howItWorks: [
      'Nominal Rule: NEVER use integer encoding for linear or distance-based models! Always use One-Hot Encoding or Target Encoding so categories remain equidistant.',
      'Ordinal Rule: Use Ordinal Encoding with an explicitly defined mapping dictionary: `{"Low": 0, "Medium": 1, "High": 2}`.',
      'The mapping must respect domain ranking; arbitrary alphabetical sorting (which places "High" before "Low") introduces false hierarchy.'
    ],
    practicalExamples: [
      'Nominal: Pet type (Dog, Cat, Bird) -> One-Hot: `is_dog`, `is_cat`, `is_bird`.',
      'Ordinal: T-shirt size (XS, S, M, L, XL) -> Ordinal: XS=0, S=1, M=2, L=3, XL=4.',
      'Ordinal: Customer satisfaction (Dissatisfied=0, Neutral=1, Satisfied=2).'
    ],
    commonMisconceptions: [
      {
        myth: 'Scikit-Learn\'s OrdinalEncoder automatically knows the logical order of your categories.',
        reality: 'By default, OrdinalEncoder sorts categories alphabetically! "Bachelor", "Doctorate", "High School", "Master" would be assigned 0, 1, 2, 3, putting Doctorate before High School! You MUST pass explicit `categories=[[...]]` order.'
      }
    ],
    conceptSummary: 'Nominal = unordered (use One-Hot). Ordinal = ranked hierarchy (use Ordinal with an explicit category list). Never assign arbitrary numbers to nominals.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'Insurance Risk Scoring',
      scenario: 'An insurance model had vehicle color ("Red", "Black", "White"). The engineer used LabelEncoder which assigned Black=0, Red=1, White=2. A linear regression model learned that White cars have double the risk of Red cars simply because 2 > 1.',
      impact: 'Switching to One-Hot Encoding eliminated the spurious color risk coefficients.'
    },
    keyTakeaways: [
      'Nominal categories have no order -> use One-Hot Encoding',
      'Ordinal categories have natural hierarchy -> use Ordinal Encoding',
      'Always pass an explicit ordered list to `OrdinalEncoder(categories=[[...]])`'
    ],
    mathematics: {
      title: 'Equidistant Geometry of One-Hot vs False Ordinal Distance',
      latex: 'd(\\mathbf{x}_{\\text{Paris}}, \\mathbf{x}_{\\text{Tokyo}}) = \\sqrt{(1-0)^2 + (0-1)^2} = \\sqrt{2} \\quad \\forall i \\ne j',
      plainText: 'In One-Hot space, Euclidean distance between ANY two distinct categories is exactly sqrt(2).',
      explanation: 'One-hot vectors form an orthonormal basis where no category is arbitrarily closer to or further from any other.',
      breakdown: [
        { id: 'ortho', symbol: 'sqrt(2)', name: 'Equidistant Basis', description: 'Guarantees neutral, unbiased distance geometry' }
      ]
    },
    pythonSnippet: {
      title: 'Explicit Ordinal Encoding vs Alphabetical Trap',
      code: `import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

df = pd.DataFrame({'education': ['Master', 'High School', 'Bachelor', 'PhD']})

# The CORRECT way: explicitly declare the domain hierarchy
ordered_levels = [['High School', 'Bachelor', 'Master', 'PhD']]
correct_encoder = OrdinalEncoder(categories=ordered_levels)
df['correct_rank'] = correct_encoder.fit_transform(df[['education']])

print("Properly Ordered Ordinal Encoding:\n", df)
`,
      explanation: 'Passing the explicit list ensures High School=0, Bachelor=1, Master=2, and PhD=3, preserving true educational progression.',
      expectedOutput: 'Properly Ordered Ordinal Encoding:\n      education  correct_rank\n0       Master           2.0\n1  High School           0.0\n2     Bachelor           1.0\n3          PhD           3.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-10-1',
        question: 'What happens if you encode the nominal variable "City" (Paris=0, London=1, Tokyo=2) into a linear regression model?',
        options: [
          'The model falsely assumes an arithmetic progression: Tokyo (2) is twice London (1), and London is the midpoint between Paris and Tokyo',
          'The model automatically converts it to One-Hot',
          'The code crashes with a syntax error',
          'The model achieves zero bias'
        ],
        correctIndex: 0,
        explanation: 'Linear models treat numbers arithmetically, assuming ordering and interval scaling that does not exist in nominal cities.'
      }
    ],
    revisionNotes: [
      'Nominal = no order -> One-Hot.',
      'Ordinal = logical order -> Ordinal with explicit categories.',
      'Never allow alphabetical sorting for ordinal data.'
    ]
  },

  // 11. Encoding categorical variables
  {
    id: 'les-5-11',
    moduleId: 'mod-5',
    title: '11. Encoding Categorical Variables: Taxonomy & Strategies',
    slug: 'encoding-categorical-variables',
    estimatedMinutes: 15,
    simpleDefinition: 'Encoding is the transformation process that maps non-numeric symbols, categories, and text strings into real-valued vectors so they can participate in mathematical modeling.',
    whyItExists: 'Linear algebra, gradient descent, distance functions, and neural network weights operate exclusively on numbers. Encoding bridges the semantic gap between human symbolic categories and mathematical machine learning algorithms.',
    howItWorks: [
      'Evaluate cardinality and ordering.',
      'Select encoding strategy from the taxonomy:',
      '  - One-Hot Encoding: Unordered nominals with low cardinality.',
      '  - Ordinal Encoding: Ordered categories with explicit ranking.',
      '  - Target (Mean) Encoding: High cardinality tabular features.',
      '  - Frequency / Count Encoding: Replace category with its dataset prevalence.',
      '  - Binary Encoding: Convert category integer to binary digits (compact compromise).',
      'Apply transformer within a pipeline and handle unseen categories.'
    ],
    practicalExamples: [
      'Device Type: "Mobile", "Desktop", "Tablet" -> One-Hot (3 dummy columns).',
      'Customer Credit Rating: "AAA", "AA", "A", "BBB", "BB" -> Ordinal (0 to 4).',
      'Merchant Category Code (800 categories): Frequency encoded as percentage of total transactions.'
    ],
    commonMisconceptions: [
      {
        myth: 'There is a single best encoder for all problems.',
        reality: 'The best encoder depends entirely on cardinality (number of unique levels), ordering, and the model architecture (tree models handle integer codes better than linear models).'
      }
    ],
    conceptSummary: 'Categorical encoding maps qualitative labels to numerical representations using One-Hot, Ordinal, Target, or Frequency strategies.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'Hospital Length of Stay Prediction',
      scenario: 'Patient primary diagnosis codes (ICD-10) contain over 70,000 unique medical conditions. One-hot encoding produced an uncomputable 70,000-column sparse matrix. The hospital team implemented Target Encoding (historical mean stay per diagnosis code).',
      impact: 'Compressed 70,000 conditions into 1 dense feature, speeding up training 150-fold while improving prediction accuracy.'
    },
    keyTakeaways: [
      'Encoding maps qualitative categories to real numbers',
      'Taxonomy: One-Hot, Ordinal, Target, Frequency, Binary',
      'Model family matters: trees tolerate label encodings, linear/distance models demand One-Hot'
    ],
    mathematics: {
      title: 'Frequency (Count) Encoding Formula',
      latex: 'x_{\\text{freq}} = \\frac{\\text{Count}(c_i)}{N}',
      plainText: 'Category c_i is replaced by its normalized frequency count in the training split.',
      explanation: 'Preserves the popularity of categories without creating new columns.',
      breakdown: [
        { id: 'count_c', symbol: 'Count(c_i)', name: 'Category Frequency', description: 'Number of occurrences of level c_i in training data' }
      ]
    },
    pythonSnippet: {
      title: 'Frequency Encoding in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'car_brand': ['Toyota', 'Honda', 'Toyota', 'Ford', 'Toyota', 'Ford']
})

# Compute frequencies
freq = df['car_brand'].value_counts() / len(df)
df['brand_freq'] = df['car_brand'].map(freq)

print("Frequency Encoded Column:\n", df)
`,
      explanation: 'Toyota appears 50% of the time (0.50), Ford 33% (0.33), and Honda 17% (0.17). Frequency encoding captures commonality in 1 column.',
      expectedOutput: 'Frequency Encoded Column:\n   car_brand  brand_freq\n0    Toyota    0.500000\n1     Honda    0.166667\n2    Toyota    0.500000\n3      Ford    0.333333\n4    Toyota    0.500000\n5      Ford    0.333333'
    },
    knowledgeCheck: [
      {
        id: 'q5-11-1',
        question: 'Which encoding method is ideal for a feature with 10,000 unique categories when using a tabular Gradient Boosted Tree model?',
        options: [
          'Target Encoding or Frequency Encoding',
          'One-Hot Encoding with 10,000 columns',
          'Deleting the column completely',
          'Min-Max Normalization'
        ],
        correctIndex: 0,
        explanation: 'For high cardinality features (10,000 levels), Target or Frequency Encoding avoids creating an unmanageable 10,000-column sparse matrix.'
      }
    ],
    revisionNotes: [
      'Encoding maps text labels to numbers.',
      'Nominal: One-Hot.',
      'Ordinal: OrdinalEncoder.',
      'High cardinality: Target or Frequency encoding.'
    ]
  },

  // 12. Label Encoding
  {
    id: 'les-5-12',
    moduleId: 'mod-5',
    title: '12. Label Encoding: Purpose and Common Pitfalls',
    slug: 'label-encoding',
    estimatedMinutes: 14,
    simpleDefinition: 'Label Encoding assigns a unique, arbitrary integer from 0 to K-1 to each unique category in a column. In Scikit-Learn, `LabelEncoder` is strictly designed for encoding the TARGET variable (y), NOT input features (X).',
    whyItExists: 'Classification models require discrete numerical class integers for the target variable: e.g. "Cat" -> 0, "Dog" -> 1. `LabelEncoder` exists to translate string target labels into integer vectors and invert predictions back to text.',
    howItWorks: [
      'Scans unique labels and sorts them alphabetically.',
      'Assigns consecutive integers: 0, 1, 2, ..., K-1.',
      'Provides `inverse_transform()` to translate predicted integer labels back into human-readable class names.',
      'CRITICAL WARNING: Never use `LabelEncoder` on input feature matrix X in linear models or neural networks! It imposes an artificial numerical ordering that corrupts model coefficients.'
    ],
    practicalExamples: [
      'Target Encoding: Medical target "Benign" -> 0, "Malignant" -> 1.',
      'Multi-class Target: Iris species "setosa" -> 0, "versicolor" -> 1, "virginica" -> 2.',
      'Tree-based Exception: Tree algorithms (XGBoost, LightGBM) can split on integer-encoded features without being misled by arithmetic ordering.'
    ],
    commonMisconceptions: [
      {
        myth: 'Scikit-Learn documentation recommends `LabelEncoder` for feature preprocessing.',
        reality: 'Scikit-Learn explicitly warns: "LabelEncoder should be used to encode target values, i.e. y, and not the input X." Use `OrdinalEncoder` or `OneHotEncoder` for X.'
      }
    ],
    conceptSummary: 'LabelEncoder converts string labels to integers (0 to K-1). It is strictly intended for the target label y, not feature matrix X.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'Customer Churn Classification',
      scenario: 'The target column `churn` contains strings "Active" and "Cancelled". Feeding strings directly to XGBoost raises a ValueError.',
      impact: 'Using `LabelEncoder().fit_transform(y)` converts "Active" to 0 and "Cancelled" to 1, enabling standard cross-entropy loss computation.'
    },
    keyTakeaways: [
      '`LabelEncoder` is strictly for target variable y, NOT feature matrix X',
      'For feature columns in X, use `OrdinalEncoder` or `OneHotEncoder`',
      'Provides `inverse_transform()` to decode predicted classes back to strings'
    ],
    mathematics: {
      title: 'Label Encoding Bijective Mapping',
      latex: 'f: \\mathcal{C} \\to \\{0, 1, \\dots, K-1\\}, \\quad y_{\\text{encoded}} = f(y)',
      plainText: 'Bijective 1-to-1 mapping from category set C to consecutive integer indices {0, ..., K-1}.',
      explanation: 'Invertible function enabling seamless transformation between class names and model output indices.',
      breakdown: [
        { id: 'c_set', symbol: 'C', name: 'Category Set', description: 'Set of K unique discrete class labels' }
      ]
    },
    pythonSnippet: {
      title: 'Proper Usage of LabelEncoder for Target y',
      code: `from sklearn.preprocessing import LabelEncoder

# Target classes
y_raw = ['Benign', 'Malignant', 'Benign', 'Benign', 'Malignant']

le = LabelEncoder()
y_encoded = le.fit_transform(y_raw)

print("Encoded target classes:   ", y_encoded)
print("Mapping classes:          ", list(le.classes_))

# Inverse transform model predictions back to human text
preds = [1, 0]
print("Decoded text predictions: ", list(le.inverse_transform(preds)))
`,
      explanation: 'LabelEncoder transforms target strings to 0 and 1, and inverse_transform restores original class names.',
      expectedOutput: 'Encoded target classes:    [0 1 0 0 1]\nMapping classes:           [\'Benign\', \'Malignant\']\nDecoded text predictions:  [\'Malignant\', \'Benign\']'
    },
    knowledgeCheck: [
      {
        id: 'q5-12-1',
        question: 'According to Scikit-Learn documentation, what is `LabelEncoder` specifically designed for?',
        options: [
          'Encoding the target variable y, NOT input features X',
          'Encoding feature matrix X',
          'Scaling continuous numbers',
          'Imputing missing values'
        ],
        correctIndex: 0,
        explanation: 'Scikit-Learn documentation explicitly specifies that `LabelEncoder` is for target y; `OrdinalEncoder` or `OneHotEncoder` should be used for X.'
      }
    ],
    revisionNotes: [
      'LabelEncoder is for target y ONLY.',
      'Use OrdinalEncoder or OneHotEncoder for X.',
      'Provides inverse_transform to recover original text names.'
    ]
  },

  // 13. Ordinal Encoding
  {
    id: 'les-5-13',
    moduleId: 'mod-5',
    title: '13. Ordinal Encoding: Preserving Domain Hierarchy',
    slug: 'ordinal-encoding',
    estimatedMinutes: 14,
    simpleDefinition: 'Ordinal Encoding converts categorical features into ordered integer ranks based on an explicit, domain-defined hierarchy (e.g. Low=0, Medium=1, High=2), preserving ranking relationships in a single compact numerical column.',
    whyItExists: 'Ordinal features contain valuable hierarchical information that One-Hot Encoding throws away. If a patient\'s condition is "Severe", that is mathematically higher than "Mild". Ordinal Encoding preserves this progression directly.',
    howItWorks: [
      'Define the explicit ordered list of categories.',
      'Pass the list to `OrdinalEncoder(categories=[ordered_list])`.',
      'The transformer assigns ranks: 0 for the lowest tier, 1 for the next, up to K-1 for the highest.',
      'Unlike `LabelEncoder`, `OrdinalEncoder` handles 2D feature matrices (X) and integrates cleanly with `ColumnTransformer`.'
    ],
    practicalExamples: [
      'Credit Tier: Subprime=0, Near-Prime=1, Prime=2, Super-Prime=3.',
      'Education: High School=0, Associate=1, Bachelor=2, Master=3, Doctorate=4.',
      'Damage Severity: Minor=0, Moderate=1, Severe=2, Total Loss=3.'
    ],
    commonMisconceptions: [
      {
        myth: 'Ordinal encoding implies that the distance between Low and Med equals the distance between Med and High.',
        reality: 'Ordinal encoding only guarantees ORDER (High > Med > Low), not equal intervals! If interval precision is critical, consider treating ordinal features with One-Hot encoding.'
      }
    ],
    conceptSummary: 'Ordinal Encoding maps ordered qualitative tiers to integer ranks in a single column, preserving domain hierarchy.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'Hospital Sepsis Early Warning',
      scenario: 'Patient consciousness level was recorded on the Glasgow Coma Scale (Severe, Moderate, Mild). Using One-Hot encoding treated "Severe" as completely orthogonal to "Moderate". Using Ordinal Encoding allowed the gradient boosted model to learn that decreasing consciousness linearly increased mortality risk.',
      impact: 'Improved sepsis onset detection speed by 1.8 hours.'
    },
    keyTakeaways: [
      'Use Ordinal Encoding for features with clear inherent hierarchy',
      'Always specify explicit category order: `categories=[[...]]`',
      'Preserves hierarchy in a single compact column without expanding dimensionality'
    ],
    mathematics: {
      title: 'Monotonic Order Mapping Function',
      latex: 'c_1 \\prec c_2 \\prec \\dots \\prec c_K \\implies f(c_1) < f(c_2) < \\dots < f(c_K), \\quad f(c_k) = k - 1',
      plainText: 'Strictly preserves monotonic order relationship of the domain tiers.',
      explanation: 'Preserves the mathematical partial order of the qualitative levels in the real coordinate space.',
      breakdown: [
        { id: 'prec', symbol: 'prec', name: 'Precedence Operator', description: 'Domain ordering relationship between qualitative categories' }
      ]
    },
    pythonSnippet: {
      title: 'Handling Missing and Unseen Categories in OrdinalEncoder',
      code: `import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

df = pd.DataFrame({
    'tier': ['Bronze', 'Silver', 'Gold', 'Silver', 'Bronze']
})

# Explicit hierarchy
tier_order = [['Bronze', 'Silver', 'Gold']]
encoder = OrdinalEncoder(categories=tier_order)
df['tier_rank'] = encoder.fit_transform(df[['tier']])

print(df)
`,
      explanation: 'OrdinalEncoder transforms qualitative tier strings into mathematically ordered integer ranks in a single column.',
      expectedOutput: '     tier  tier_rank\n0  Bronze        0.0\n1  Silver        1.0\n2    Gold        2.0\n3  Silver        1.0\n4  Bronze        0.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-13-1',
        question: 'Which of the following categorical features is ideal for Ordinal Encoding?',
        options: [
          'Shirt size: XS, S, M, L, XL',
          'Car color: Red, Blue, White',
          'City of residence: Chicago, Dallas, Miami',
          'Postal Zip Code'
        ],
        correctIndex: 0,
        explanation: 'Shirt size has an inherent progressive order (XS < S < M < L < XL), making it ideal for Ordinal Encoding.'
      }
    ],
    revisionNotes: [
      'Ordinal Encoding preserves hierarchy in 1 column.',
      'Always pass `categories=[[...]]` to define order.',
      'Best for ratings, education, tiers, and severity.'
    ]
  },

  // 14. One-Hot Encoding
  {
    id: 'les-5-14',
    moduleId: 'mod-5',
    title: '14. One-Hot Encoding: The Gold Standard for Nominals',
    slug: 'one-hot-encoding',
    estimatedMinutes: 16,
    simpleDefinition: 'One-Hot Encoding transforms a categorical feature with K unique levels into K binary indicator columns (containing only 0 or 1), where exactly one column is "hot" (1) and all others are "cold" (0) for each sample.',
    whyItExists: 'Nominal categories have no mathematical order. If you assign numbers (e.g. Dog=1, Cat=2, Fish=3), models falsely assume Cat is the average of Dog and Fish. One-Hot Encoding creates orthogonal basis vectors where every category is equidistant from all others.',
    howItWorks: [
      'Identify K unique levels in the categorical column.',
      'Create K binary columns (or K-1 columns if `drop="first"` to prevent multicollinearity in linear models).',
      'For each sample, place a 1 in the column matching its category and 0 in all others.',
      'In production, set `handle_unknown="ignore"` to safely output all zeros if an unseen category appears.',
      'Best suited for low-to-medium cardinality (< 20 categories).'
    ],
    practicalExamples: [
      'Payment Method: `[Credit Card, PayPal, Apple Pay]` becomes 3 binary columns.',
      'Marital Status: `[Single, Married, Divorced]` becomes 3 orthogonal indicators.',
      'Linear Regression: Using `drop="first"` (dummy encoding) avoids the Dummy Variable Trap (perfect multicollinearity).'
    ],
    commonMisconceptions: [
      {
        myth: 'One-Hot Encoding should always drop the first column.',
        reality: 'Dropping the first column (`drop="first"`) is essential for unregularized Linear/Logistic regression to avoid singular matrix errors. However, for L2-regularized models, neural networks, and tree models, keeping all K columns is standard and prevents penalization asymmetry.'
      }
    ],
    conceptSummary: 'One-Hot Encoding creates K binary dummy columns, providing an orthogonal, equidistant representation for nominal categories.',
    interactiveExperienceType: 'encoding-playground',
    realWorldExample: {
      domain: 'E-Commerce Recommendation Engines',
      scenario: 'Amazon classifies device platforms ("iOS", "Android", "Web", "Tablet"). Because platforms have no inherent hierarchy, One-Hot Encoding provides an unbiased representation for collaborative filtering models.',
      impact: 'Guarantees recommendations are not biased by arbitrary integer ordering.'
    },
    keyTakeaways: [
      'One-Hot Encoding is the gold standard for nominal categories',
      'Creates K binary dummy columns (or K-1 to avoid multicollinearity)',
      'Always use `handle_unknown="ignore"` in Scikit-Learn for production pipelines'
    ],
    mathematics: {
      title: 'The Dummy Variable Trap (Perfect Multicollinearity)',
      latex: '\\sum_{k=1}^K x_{i, k} = 1 \\implies x_{i, K} = 1 - \\sum_{k=1}^{K-1} x_{i, k}',
      plainText: 'Because all K dummy columns sum to 1, the Kth column is completely redundant and causes matrix singularity in unregularized OLS.',
      explanation: 'Dropping one column avoids a singular X^T X matrix, allowing Ordinary Least Squares to invert the normal equation.',
      breakdown: [
        { id: 'multicol', symbol: 'sum(x_k) = 1', name: 'Linear Dependency', description: 'Any column can be perfectly predicted from the other K-1 columns' }
      ]
    },
    pythonSnippet: {
      title: 'Production-Ready OneHotEncoder in Scikit-Learn',
      code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder

df_train = pd.DataFrame({'color': ['Red', 'Green', 'Blue', 'Red']})
df_test = pd.DataFrame({'color': ['Blue', 'Yellow']}) # Yellow is UNSEEN!

# handle_unknown='ignore' outputs all zeros for unseen 'Yellow' instead of crashing
ohe = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
ohe.fit(df_train[['color']])

print("Transformed Train:\n", ohe.transform(df_train[['color']]))
print("\nTransformed Test (Yellow becomes all 0s):\n", ohe.transform(df_test[['color']]))
`,
      explanation: 'handle_unknown="ignore" ensures that when an unseen category like "Yellow" appears during test or deployment, the pipeline safely outputs all zeros without crashing.',
      expectedOutput: 'Transformed Train:\n [[0. 0. 1.]\n [0. 1. 0.]\n [1. 0. 0.]\n [0. 0. 1.]]\n\nTransformed Test (Yellow becomes all 0s):\n [[1. 0. 0.]\n [0. 0. 0.]]'
    },
    knowledgeCheck: [
      {
        id: 'q5-14-1',
        question: 'What parameter in Scikit-Learn\'s `OneHotEncoder` prevents the model from crashing when a brand new, unseen category appears in live production?',
        options: [
          '`handle_unknown="ignore"`',
          '`drop="first"`',
          '`sparse_output=True`',
          '`dtype=int`'
        ],
        correctIndex: 0,
        explanation: '`handle_unknown="ignore"` encodes unseen categories as all zeros, preventing runtime exceptions during live inference.'
      }
    ],
    revisionNotes: [
      'One-Hot Encoding converts K categories into K binary columns.',
      'Gold standard for unordered nominal categories.',
      'Always set `handle_unknown="ignore"` for production safety.'
    ]
  },

  // 15. Feature scaling
  {
    id: 'les-5-15',
    moduleId: 'mod-5',
    title: '15. Feature Scaling: Why Scale Matters',
    slug: 'feature-scaling',
    estimatedMinutes: 15,
    simpleDefinition: 'Feature scaling is the preprocessing step of transforming numerical features into a comparable scale or range, preventing features with large numbers from dominating distance calculations and gradient updates.',
    whyItExists: 'Machine learning algorithms calculate Euclidean distances ($d = \\sqrt{\\sum (x_{1i} - x_{2i})^2}$) and gradient descent steps. If Salary is measured in tens of thousands ($80,000) and Age in tens (35), salary variations will mathematically overpower age by a factor of 100,000 to 1, rendering age completely invisible to the model.',
    howItWorks: [
      'Distance-based models (KNN, K-Means, SVM) require scaling because distance metrics treat all axes equally.',
      'Gradient-based models (Linear/Logistic Regression, Neural Networks) require scaling to condition the loss landscape and speed up convergence.',
      'Tree-based models (Decision Trees, Random Forest, XGBoost) are invariant to monotonic feature scaling because split points depend only on feature rank ordering, not magnitude.',
      'Two primary techniques: Normalization (Min-Max) and Standardization (Z-score).'
    ],
    practicalExamples: [
      'K-Means Customer Clustering: Clustering customers on Annual Income ($20k-$200k) and Number of Children (0-5). Without scaling, clusters form strictly along income lines, ignoring children entirely.',
      'Neural Network Training: Unscaled inputs cause vanishing/exploding gradients and saturated Sigmoid/Tanh activation functions.',
      'SVM Margins: SVM maximizes the margin between classes; unscaled features warp the margin into an elongated sliver.'
    ],
    commonMisconceptions: [
      {
        myth: 'Every machine learning algorithm requires feature scaling.',
        reality: 'Tree-based algorithms (Decision Trees, Random Forests, Gradient Boosted Trees) DO NOT require feature scaling. They make orthogonal splits on one feature at a time based on sorting order.'
      }
    ],
    conceptSummary: 'Feature scaling equalizes feature influence in distance-based and gradient-descent algorithms. Tree models do not require scaling.',
    interactiveExperienceType: 'feature-scaling-lab',
    realWorldExample: {
      domain: 'Facial Recognition & Biometrics',
      scenario: 'Early biometric models compared facial landmark coordinates (measured in screen pixels: 0-1920) and eye openness ratios (measured in decimals: 0.1-0.9). Unscaled Euclidean distance ignored eye openness completely.',
      impact: 'Applying feature scaling restored facial expression detection, increasing verification accuracy from 61% to 98.7%.'
    },
    keyTakeaways: [
      'Scaling prevents high-magnitude features from drowning out small-magnitude features',
      'Mandatory for KNN, K-Means, SVM, PCA, and Neural Networks',
      'Unnecessary for tree-based algorithms (Random Forest, XGBoost)'
    ],
    mathematics: {
      title: 'Distortion of Unscaled Euclidean Distance',
      latex: 'd(\\mathbf{p}, \\mathbf{q}) = \\sqrt{(x_{\\text{income}, 1} - x_{\\text{income}, 2})^2 + (x_{\\text{age}, 1} - x_{\\text{age}, 2})^2} \\approx |x_{\\text{income}, 1} - x_{\\text{income}, 2}|',
      plainText: 'When income differences are ~30,000 and age differences are ~10, (30000)^2 = 900,000,000 completely drowns out (10)^2 = 100.',
      explanation: 'Squared differences in high-magnitude features completely overpower small-magnitude features.',
      breakdown: [
        { id: 'euc_dist', symbol: 'd(p, q)', name: 'Euclidean Distance', description: 'Metric governing KNN, SVM, and K-Means' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Euclidean Distance Distortion',
      code: `import numpy as np

# Person A: Age 25, Income $40,000
# Person B: Age 65, Income $40,010 (Diff: 40 years, $10)
# Person C: Age 25, Income $40,500 (Diff: 0 years, $500)
pA = np.array([25, 40000])
pB = np.array([65, 40010])
pC = np.array([25, 40500])

dist_AB = np.linalg.norm(pA - pB)
dist_AC = np.linalg.norm(pA - pC)

print("Distance A to B (40 year age gap!):    ", round(dist_AB, 2))
print("Distance A to C (Identical age, $500 diff):", round(dist_AC, 2))
print("Unscaled KNN thinks A is closer to 65-year-old B than to same-age C!")
`,
      explanation: 'Because income numbers are large, a tiny $500 difference makes Person C appear 12 times further away than Person B who has a 40-year age gap!',
      expectedOutput: 'Distance A to B (40 year age gap!):     41.23\nDistance A to C (Identical age, $500 diff): 500.0\nUnscaled KNN thinks A is closer to 65-year-old B than to same-age C!'
    },
    knowledgeCheck: [
      {
        id: 'q5-15-1',
        question: 'Which of the following algorithm families is naturally INVARIANT to feature scaling (does NOT require scaling)?',
        options: [
          'Decision Trees and Random Forests',
          'K-Nearest Neighbors (KNN)',
          'Support Vector Machines (SVM)',
          'Deep Neural Networks'
        ],
        correctIndex: 0,
        explanation: 'Tree-based algorithms split one feature at a time based on rank order, making them invariant to scale transformations.'
      }
    ],
    revisionNotes: [
      'Scaling equalizes feature influence in distance calculations.',
      'Required for KNN, SVM, K-Means, PCA, Neural Nets.',
      'Not required for Decision Trees / Random Forests.'
    ]
  },

  // 16. Normalization
  {
    id: 'les-5-16',
    moduleId: 'mod-5',
    title: '16. Normalization: Min-Max Scaling [0, 1]',
    slug: 'normalization-min-max',
    estimatedMinutes: 14,
    simpleDefinition: 'Normalization (specifically Min-Max Scaling) rescales the values of a numerical feature into a fixed, bounded range—most commonly between 0.0 and 1.0: x_norm = (x - min) / (max - min).',
    whyItExists: 'Certain algorithms and architectures require strictly bounded inputs. For example, neural network activation functions (Sigmoid, Tanh) saturate and flatline their gradients if inputs are large. Image processing requires pixel values mapped strictly to [0, 1].',
    howItWorks: [
      'Identify feature minimum: min(X).',
      'Identify feature maximum: max(X).',
      'Subtract min from each value and divide by the range: (x - min) / (max - min).',
      'The minimum value becomes exactly 0.0; the maximum becomes exactly 1.0.',
      'Major limitation: Highly sensitive to outliers. A single extreme outlier will compress all normal data points into a tiny narrow cluster near 0.0.'
    ],
    practicalExamples: [
      'Image Processing: Dividing 8-bit RGB pixel values (0 to 255) by 255.0 to map them into [0.0, 1.0].',
      'Neural Network Inputs: Constraining features to [0, 1] to prevent vanishing gradients in early layers.',
      'K-Means Clustering: Normalizing features with bounded physical ranges (e.g. percentages or exam scores).'
    ],
    commonMisconceptions: [
      {
        myth: 'Normalization turns data into a Normal (Gaussian) distribution.',
        reality: 'Despite the name, Normalization DOES NOT create a Normal bell-shaped distribution! It simply shrinks the range into [0, 1] while preserving the exact original shape (and skewness) of the data.'
      }
    ],
    conceptSummary: 'Min-Max Normalization rescales features into a bounded [0, 1] interval. It preserves original shape but is highly sensitive to outliers.',
    interactiveExperienceType: 'feature-scaling-lab',
    realWorldExample: {
      domain: 'Satellite Earth Observation',
      scenario: 'Multi-spectral satellite sensors capture surface reflectance in raw 16-bit integer bands (0 to 65,535). Deep segmentation networks classify crop health by mapping all spectral bands to [0.0, 1.0].',
      impact: 'Prevents numerical overflow in convolution operations, accelerating satellite crop classification.'
    },
    keyTakeaways: [
      'Formula: x_norm = (x - min) / (max - min)',
      'Bounds all values strictly in [0.0, 1.0]',
      'Does NOT normalize the shape; preserves skewness',
      'Extremely vulnerable to outliers'
    ],
    mathematics: {
      title: 'Min-Max Scaling to Arbitrary Interval [a, b]',
      latex: 'x_{\\text{scaled}} = a + \\frac{x - \\min(x)}{\\max(x) - \\min(x)} (b - a)',
      plainText: 'Standard Min-Max maps to [0, 1]. Generalized formula maps to any interval [a, b].',
      explanation: 'When a = -1 and b = 1, it scales data to [-1, 1] for Tanh activations.',
      breakdown: [
        { id: 'minmax_a', symbol: 'a, b', name: 'Target Boundaries', description: 'Desired minimum and maximum of the rescaled space' }
      ]
    },
    pythonSnippet: {
      title: 'MinMaxScaler in Scikit-Learn',
      code: `from sklearn.preprocessing import MinMaxScaler
import numpy as np

# Raw exam scores out of 100
scores = np.array([[45], [60], [75], [90], [100]])

scaler = MinMaxScaler(feature_range=(0, 1))
scaled_scores = scaler.fit_transform(scores)

print("Original Scores:\n", scores.ravel())
print("Min-Max Scaled [0, 1]:\n", scaled_scores.ravel().round(2))
`,
      explanation: 'MinMaxScaler maps the lowest value (45) to 0.0 and the highest value (100) to 1.0.',
      expectedOutput: 'Original Scores:\n [ 45  60  75  90 100]\nMin-Max Scaled [0, 1]:\n [0.   0.27 0.55 0.82 1.  ]'
    },
    knowledgeCheck: [
      {
        id: 'q5-16-1',
        question: 'What happens to Min-Max Scaling if a dataset contains a single massive positive outlier?',
        options: [
          'The outlier becomes 1.0, and all normal data points are compressed into a tiny narrow cluster near 0.0',
          'The outlier is automatically deleted',
          'The data becomes normally distributed',
          'All numbers become negative'
        ],
        correctIndex: 0,
        explanation: 'Because max(x) is inflated by the outlier, the denominator (max - min) becomes huge, compressing regular observations close to 0.'
      }
    ],
    revisionNotes: [
      'Min-Max Normalization: x_norm = (x - min) / (max - min).',
      'Bounds data strictly in [0, 1].',
      'Vulnerable to outliers.',
      'Does NOT reshape data into a Gaussian bell curve.'
    ]
  },

  // 17. Standardization
  {
    id: 'les-5-17',
    moduleId: 'mod-5',
    title: '17. Standardization: Z-Score Scaling (Mean=0, Std=1)',
    slug: 'standardization-z-score',
    estimatedMinutes: 15,
    simpleDefinition: 'Standardization (or Z-score scaling) transforms a numerical feature so that its distribution has an arithmetic mean of 0.0 and a standard deviation of 1.0: z = (x - μ) / σ.',
    whyItExists: 'Standardization is the default, workhorse scaling technique in machine learning. Unlike Min-Max normalization, it does not bind data to a rigid [0, 1] box, meaning it does not compress regular values when outliers are present. It optimizes gradient descent and is mathematically required for Principal Component Analysis (PCA).',
    howItWorks: [
      'Calculate feature mean: μ.',
      'Calculate feature standard deviation: σ.',
      'Subtract mean (centering): (x - μ). Centers the distribution at zero.',
      'Divide by standard deviation (scaling): z = (x - μ) / σ.',
      'Resulting values represent distance from the mean in units of standard deviations.',
      'Most values (~99.7%) fall between -3.0 and +3.0.'
    ],
    practicalExamples: [
      'Logistic Regression: Standardizing features ensures that L2 regularization (Ridge penalty) penalizes all coefficients fairly.',
      'Principal Component Analysis (PCA): PCA maximizes variance; unstandardized features with large variances would dominate principal components regardless of information content.',
      'Deep Learning: Batch Normalization standardizes intermediate neural activations between layers to accelerate training.'
    ],
    commonMisconceptions: [
      {
        myth: 'Standardization forces non-normal data to become normally distributed.',
        reality: 'Standardization centers and rescales the data, but it DOES NOT alter the underlying shape! If the raw feature is right-skewed, the standardized feature remains right-skewed.'
      }
    ],
    conceptSummary: 'Standardization shifts features to mean=0 and scales to std=1. It is robust, preserves outlier relationships, and is the standard choice for linear and distance models.',
    interactiveExperienceType: 'feature-scaling-lab',
    realWorldExample: {
      domain: 'Algorithmic Stock Trading',
      scenario: 'A quantitative fund combines trading volume (millions of shares) and price percentage change (decimals like 0.02). Standardization converts both features into Z-scores.',
      impact: 'Allowed the trading model to evaluate price momentum and volume spikes on an equal statistical footing.'
    },
    keyTakeaways: [
      'Formula: z = (x - μ) / σ',
      'Transforms data to mean = 0.0 and standard deviation = 1.0',
      'Preferred default for linear models, Logistic Regression, SVM, and PCA',
      'More robust to outliers than Min-Max scaling'
    ],
    mathematics: {
      title: 'Standard Z-Score Transformation',
      latex: 'z_i = \\frac{x_i - \\bar{x}}{s}, \\quad \\mathbb{E}[z] = 0, \\quad \\text{Var}(z) = 1',
      plainText: 'z = (x - mean) / std. E[z] = 0, Var(z) = 1.',
      explanation: 'Subtracting sample mean centers at 0; dividing by sample standard deviation scales spread to 1.',
      breakdown: [
        { id: 'z_score', symbol: 'z', name: 'Standardized Z-Score', description: 'Dimensionless number indicating standard deviations from center' }
      ]
    },
    pythonSnippet: {
      title: 'StandardScaler in Scikit-Learn',
      code: `from sklearn.preprocessing import StandardScaler
import numpy as np

# Raw house prices in thousands
prices = np.array([[250.0], [380.0], [180.0], [520.0], [310.0]])

scaler = StandardScaler()
z_prices = scaler.fit_transform(prices)

print("Standardized Z-scores:\n", z_prices.round(2))
print("Computed Mean:  ", z_prices.mean().round(4))
print("Computed Std Dev:", z_prices.std().round(4))
`,
      explanation: 'StandardScaler centers values around 0.0 and scales their standard deviation to exactly 1.0.',
      expectedOutput: 'Standardized Z-scores:\n [[-0.67]\n [ 0.44]\n [-1.27]\n [ 1.63]\n [-0.15]]\nComputed Mean:   0.0\nComputed Std Dev: 1.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-17-1',
        question: 'What are the resulting mean and standard deviation of any numerical feature after applying `StandardScaler`?',
        options: [
          'Mean = 0.0, Standard Deviation = 1.0',
          'Mean = 1.0, Standard Deviation = 0.0',
          'Mean = 0.5, Standard Deviation = 0.5',
          'Mean = 100, Standard Deviation = 15'
        ],
        correctIndex: 0,
        explanation: 'Standardization by definition centers the distribution at mean = 0 and scales it to standard deviation = 1.'
      }
    ],
    revisionNotes: [
      'Standardization: z = (x - μ) / σ.',
      'Centers at 0.0, scales to std = 1.0.',
      'Default choice for linear models, SVMs, and PCA.',
      'More robust to outliers than Min-Max scaling.'
    ]
  },

  // 18. Data leakage
  {
    id: 'les-5-18',
    moduleId: 'mod-5',
    title: '18. Data Leakage: The Silent Model Killer',
    slug: 'data-leakage',
    estimatedMinutes: 16,
    simpleDefinition: 'Data leakage occurs when information from outside the training dataset (specifically from the validation or test holdout set) inadvertently leaks into the model during preprocessing, leading to falsely optimistic evaluation metrics that collapse in production.',
    whyItExists: 'Data leakage happens when preprocessing transformations (like computing mean, min/max, or selecting top features) are executed across the ENTIRE dataset BEFORE splitting into train and test sets.',
    howItWorks: [
      'The Flawed Way (Leakage): Running `scaler.fit(X_all)` computes global mean and std using test rows. When the model is trained, it already inherits information about the test distribution.',
      'The Correct Way (Pipeline): Split into `X_train` and `X_test` FIRST. Fit transformers strictly on `X_train` (`scaler.fit(X_train)`), then transform both `X_train` and `X_test` using those frozen training parameters.',
      'Target Leakage: Including a feature in X that is only recorded AFTER the target event occurs (e.g. including "Hospital Discharge Date" when predicting patient mortality upon admission).'
    ],
    practicalExamples: [
      'Scaler Leakage: Normalizing full dataset before splitting. If the test set contains a high maximum, the training data\'s scaled values reflect that unseen max.',
      'Imputation Leakage: Computing global mean age across all rows to fill missing values in the training set.',
      'Feature Selection Leakage: Selecting top 20 correlated features across the entire dataset before cross-validation.'
    ],
    commonMisconceptions: [
      {
        myth: 'Data leakage only happens to careless beginners.',
        reality: 'Data leakage is responsible for hundreds of retracted academic papers and failed enterprise ML deployments. Kaggle competitions frequently see competitors drop 50 places on the private leaderboard due to subtle leakage.'
      }
    ],
    conceptSummary: 'Data leakage occurs when test information contaminates training parameters. Prevent it by splitting first and packaging steps into Scikit-Learn Pipelines.',
    interactiveExperienceType: 'data-leakage-demo',
    realWorldExample: {
      domain: 'Pneumonia Detection in Chest X-Rays',
      scenario: 'A university model achieved 99% accuracy detecting pneumonia from chest X-rays. Post-audit discovered that doctors used a specific portable X-ray machine for emergency bedside patients who were already diagnosed with pneumonia. The model learned to detect the serial number font of the portable machine, not lung pathology.',
      impact: 'Classic target leakage: the machine font was an artifact created after the diagnosis was already known.'
    },
    keyTakeaways: [
      'Split data into Train and Test FIRST before any preprocessing',
      'Fit transformers strictly on X_train; only transform X_test',
      'Use Scikit-Learn `Pipeline` to automate leak-free cross-validation'
    ],
    mathematics: {
      title: 'Mathematical Formulation of Preprocessing Leakage',
      latex: '\\text{Leaky: } \\hat{\\mu} = \\frac{1}{N_{\\text{train}} + N_{\\text{test}}} \\left( \\sum_{i \\in \\text{train}} x_i + \\sum_{j \\in \\text{test}} x_j \\right) \\implies X_{\\text{train}} \\text{ conditioned on } X_{\\text{test}}',
      plainText: 'Global mean incorporates test samples x_j, violating the independent holdout assumption.',
      explanation: 'Training samples become conditioned on test statistics, destroying statistical independence.',
      breakdown: [
        { id: 'mu_leak', symbol: 'mu_hat', name: 'Leaked Parameter', description: 'Statistic computed across the split boundary' }
      ]
    },
    pythonSnippet: {
      title: 'The Wrong Way vs The Right Way in Code',
      code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np

X = np.array([[10], [20], [30], [40], [50], [200]]) # Notice 200 outlier

# --- THE WRONG WAY (DATA LEAKAGE) ---
# scaler fits on entire dataset including holdout!
scaler_wrong = StandardScaler()
X_leaky = scaler_wrong.fit_transform(X) # ⚠️ LEAKAGE!
X_tr_w, X_te_w = train_test_split(X_leaky, test_size=0.33, shuffle=False)

# --- THE RIGHT WAY (LEAK-FREE) ---
# 1. Split FIRST
X_tr, X_te = train_test_split(X, test_size=0.33, shuffle=False)

# 2. Fit ONLY on train!
scaler_right = StandardScaler()
X_tr_clean = scaler_right.fit_transform(X_tr) # learns mean from train
X_te_clean = scaler_right.transform(X_te)     # applies train mean to test

print("Wrong Leaked Scaler Mean: ", scaler_wrong.mean_[0])
print("Right Clean Scaler Mean:  ", scaler_right.mean_[0])
`,
      explanation: 'The leaky scaler learned a mean of 58.3 because it peeked at the test set outlier. The clean scaler learned the honest training mean of 25.0.',
      expectedOutput: 'Wrong Leaked Scaler Mean:  58.333333333333336\nRight Clean Scaler Mean:   25.0'
    },
    knowledgeCheck: [
      {
        id: 'q5-18-1',
        question: 'Which of the following actions causes DATA LEAKAGE during machine learning development?',
        options: [
          'Fitting a StandardScaler on the entire dataset before splitting into train and test sets',
          'Splitting data before fitting the scaler',
          'Using a Scikit-Learn Pipeline',
          'Using cross-validation'
        ],
        correctIndex: 0,
        explanation: 'Fitting any transformer on the entire dataset before splitting leaks test set statistics into the training parameters.'
      }
    ],
    revisionNotes: [
      'Data leakage contaminates training data with test information.',
      'Always split data into Train and Test FIRST.',
      'Fit transformers strictly on X_train; only transform X_test.',
      'Use Scikit-Learn Pipeline to automate leak-free execution.'
    ]
  },

  // 19. Preprocessing pipelines
  {
    id: 'les-5-19',
    moduleId: 'mod-5',
    title: '19. Preprocessing Pipelines: Production-Grade ColumnTransformer',
    slug: 'preprocessing-pipelines',
    estimatedMinutes: 16,
    simpleDefinition: 'A preprocessing pipeline is an atomic, sequential software object (like Scikit-Learn\'s `Pipeline` and `ColumnTransformer`) that chains together data transformation stages and a machine learning estimator into a unified, leak-free deployment unit.',
    whyItExists: 'In real-world machine learning, manual preprocessing scripts with loose variables lead to copy-paste bugs, data leakage, and deployment failure. Packaging everything into a Pipeline ensures identical execution across cross-validation folds and production inference endpoints.',
    howItWorks: [
      'Define Numerical Pipeline: SimpleImputer(strategy="median") -> StandardScaler().',
      'Define Categorical Pipeline: SimpleImputer(strategy="most_frequent") -> OneHotEncoder(handle_unknown="ignore").',
      'Combine via `ColumnTransformer`: Directs numeric columns to the numerical pipeline and categorical columns to the categorical pipeline.',
      'Attach Estimator: Chain the preprocessor to an algorithm (e.g. Ridge Regression or Random Forest) via `Pipeline`.',
      'Execute: Calling `pipeline.fit(X_train, y_train)` fits all transformers and the model atomically. Calling `pipeline.predict(X_new)` seamlessly transforms raw production inputs.'
    ],
    practicalExamples: [
      'REST API Serving: A FastAPI backend passes raw incoming JSON directly to `model_pipeline.predict(raw_json)` without requiring duplicate manual preprocessing code.',
      'K-Fold Cross-Validation: Placing the preprocessor inside the pipeline ensures each CV fold fits transformers strictly on the fold training partition, preventing cross-validation leakage.',
      'GridSearchCV Hyperparameter Tuning: Tuning preprocessing parameters (e.g. imputer strategy or polynomial degree) jointly with model parameters.'
    ],
    commonMisconceptions: [
      {
        myth: 'Pipelines are just an aesthetic convenience for cleaner code.',
        reality: 'Pipelines are a strict architectural requirement. Without pipelines, performing leak-free K-Fold cross validation with feature scaling is virtually impossible to code manually without errors.'
      }
    ],
    conceptSummary: 'Pipelines assemble imputers, encoders, scalers, and estimators into a single atomic object, eliminating leakage and streamlining deployment.',
    interactiveExperienceType: 'data-leakage-demo',
    realWorldExample: {
      domain: 'Enterprise Fraud Scoring Microservice',
      scenario: 'A major fintech bank deployed a fraud scoring model to AWS Lambda. Without a pipeline, software engineers had to rewrite Python pandas preprocessing logic in Java for the production microservice, creating a 4-month delay and subtle parity bugs.',
      impact: 'Adopting Scikit-Learn Pipeline allowed data scientists to export a single serialized `.joblib` pipeline that ran inference directly in production.'
    },
    keyTakeaways: [
      'Pipelines bundle transformers and estimators into a single callable object',
      '`ColumnTransformer` applies different transformation pipelines to different feature types',
      'Prevents leakage during cross-validation and ensures parity between training and production'
    ],
    mathematics: {
      title: 'Composite Pipeline Function Composition',
      latex: '\\hat{y} = \\mathcal{M} \\circ \\mathcal{S} \\circ \\mathcal{E} \\circ \\mathcal{I}(\\mathbf{x}_{\\text{raw}}) = \\mathcal{M}\\Big(\\mathcal{S}\\big(\\mathcal{E}(\\mathcal{I}(\\mathbf{x}_{\\text{raw}}))\\big)\\Big)',
      plainText: 'Prediction is a functional composition: Model( Scaler( Encoder( Imputer(raw_x) ) ) ).',
      explanation: 'Ensures data flows through a deterministic, mathematically rigorous transformation pipeline.',
      breakdown: [
        { id: 'comp_pipe', symbol: 'circ', name: 'Function Composition', description: 'Chaining sequential mathematical operations' }
      ]
    },
    pythonSnippet: {
      title: 'Full Production-Grade Pipeline in Scikit-Learn',
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge

# Raw mixed dataset
df = pd.DataFrame({
    'age': [25, 45, np.nan, 35, 50, 23],
    'city': ['Paris', 'London', 'Paris', 'Tokyo', 'London', 'Tokyo'],
    'salary': [50000.0, 95000.0, 72000.0, 80000.0, 110000.0, 42000.0],
    'target_score': [62, 85, 78, 80, 92, 55]
})

X = df.drop(columns=['target_score'])
y = df['target_score']

# 1. Split FIRST
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

# 2. Define pipelines for each column type
num_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# 3. Assemble preprocessor
preprocessor = ColumnTransformer(transformers=[
    ('num', num_pipe, ['age', 'salary']),
    ('cat', cat_pipe, ['city'])
])

# 4. Create complete end-to-end model pipeline
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', Ridge())
])

# 5. Fit atomically
full_pipeline.fit(X_train, y_train)

# 6. Predict directly on raw test data!
predictions = full_pipeline.predict(X_test)
print("Pipeline trained successfully! Predictions:\n", predictions.round(1))
`,
      explanation: 'The full pipeline cleanly handles imputation, scaling, one-hot encoding, and regression in an atomic, leak-free object.',
      expectedOutput: 'Pipeline trained successfully! Predictions:\n [79.2 65.5]'
    },
    knowledgeCheck: [
      {
        id: 'q5-19-1',
        question: 'What is the primary advantage of bundling preprocessing and models into a Scikit-Learn `Pipeline`?',
        options: [
          'It eliminates data leakage during cross-validation and allows raw data to be passed directly to `.predict()` in production',
          'It makes Python run without using memory',
          'It automatically fixes syntax errors',
          'It eliminates the need for test sets'
        ],
        correctIndex: 0,
        explanation: 'Pipelines enforce strict boundary isolation between folds and allow seamless deployment where raw inputs are processed automatically.'
      }
    ],
    revisionNotes: [
      'Use ColumnTransformer to route numeric and categorical columns.',
      'Chain preprocessor and model inside a unified Pipeline.',
      'Guarantees leak-free cross-validation and production parity.'
    ]
  }
];

export const MODULE_05_COMPREHENSIVE_QUIZ = [
  {
    id: 'm5-final-1',
    question: 'Why does feature scaling matter for distance-based models like KNN and K-Means?',
    options: [
      'Because features with large numerical magnitudes (e.g. salary $80,000) will overpower features with small magnitudes (e.g. age 35) in Euclidean distance calculations',
      'Because distance metrics only work on numbers between 0 and 1',
      'Because scaling changes the row count',
      'Because unscaled data causes division by zero'
    ],
    correctIndex: 0,
    explanation: 'Distance metrics compute squared differences across all axes equally; unscaled features with large ranges dominate the distance.'
  },
  {
    id: 'm5-final-2',
    question: 'What is the primary difference between Normalization (Min-Max) and Standardization (Z-score)?',
    options: [
      'Min-Max scales data into a rigid [0, 1] range; Standardization centers data at mean=0 and scales to std=1 without bounded limits',
      'Min-Max only works on categorical data',
      'Standardization always creates a normal distribution',
      'Min-Max deletes outliers automatically'
    ],
    correctIndex: 0,
    explanation: 'Min-Max binds data to [0, 1], while Standardization centers at mean=0 with standard deviation=1 and is more robust to outliers.'
  },
  {
    id: 'm5-final-3',
    question: 'How should you encode a nominal categorical variable like "Country" (e.g. USA, Canada, Mexico) for a linear model?',
    options: [
      'One-Hot Encoding',
      'Label Encoding with 0, 1, 2',
      'Min-Max Normalization',
      'Standard Z-score scaling'
    ],
    correctIndex: 0,
    explanation: 'Because Country has no natural order, One-Hot Encoding creates orthogonal binary indicators where no country is arbitrarily greater than another.'
  },
  {
    id: 'm5-final-4',
    question: 'What is "Data Leakage" in a machine learning preprocessing context?',
    options: [
      'When information from the test/holdout set inadvertently leaks into training parameters (e.g. scaling before splitting)',
      'When hackers steal the database',
      'When a computer loses power during training',
      'When training error is higher than test error'
    ],
    correctIndex: 0,
    explanation: 'Data leakage happens when holdout test statistics contaminate training parameters, producing falsely optimistic validation scores.'
  },
  {
    id: 'm5-final-5',
    question: 'What is "Winsorization" in outlier handling?',
    options: [
      'Capping extreme values to specific statistical percentiles (e.g. 1st and 99th) to retain sample size while neutralizing leverage',
      'Deleting all rows that contain an outlier',
      'Dividing all numbers by 100',
      'Replacing outliers with random numbers'
    ],
    correctIndex: 0,
    explanation: 'Winsorization caps extreme outliers at chosen statistical percentiles, neutralizing extreme leverage while preserving all rows.'
  },
  {
    id: 'm5-final-6',
    question: 'Why should you set `handle_unknown="ignore"` when initializing Scikit-Learn\'s `OneHotEncoder`?',
    options: [
      'To prevent the pipeline from crashing if a brand-new, unseen category appears during production inference',
      'To automatically remove duplicate rows',
      'To force the encoder to output text',
      'To delete missing values'
    ],
    correctIndex: 0,
    explanation: 'Setting `handle_unknown="ignore"` outputs all zeros for unseen categories instead of throwing a runtime error in production.'
  },
  {
    id: 'm5-final-7',
    question: 'Why are tree-based models (Decision Trees, Random Forests, XGBoost) invariant to feature scaling?',
    options: [
      'Because they split one feature at a time based on sorting and rank order, which is completely unchanged by scaling',
      'Because trees only train on categorical data',
      'Because trees normalize features internally with deep neural networks',
      'Because trees do not use loss functions'
    ],
    correctIndex: 0,
    explanation: 'Tree split thresholds depend strictly on feature ordering; scaling a feature by a constant does not change the rank ordering of values.'
  },
  {
    id: 'm5-final-8',
    question: 'What is the correct architectural order of operations when building a machine learning model?',
    options: [
      '1. Split into Train & Test -> 2. Fit preprocessor strictly on Train -> 3. Transform Test -> 4. Fit Model on Train -> 5. Evaluate on Test',
      '1. Fit Scaler on all data -> 2. Split into Train & Test -> 3. Fit Model -> 4. Evaluate',
      '1. Fit Model -> 2. Clean data -> 3. Split into Train & Test',
      '1. Evaluate on Test -> 2. Train Model -> 3. Clean data'
    ],
    correctIndex: 0,
    explanation: 'Always partition into Train and Test first before any preprocessing, fitting transformers strictly on the training partition.'
  }
];

export const MODULE_05_METADATA: Module = {
  id: 'mod-5',
  trackId: 'track-foundations',
  title: 'Module 05: Data Preprocessing & Encoding',
  slug: 'data-preprocessing-and-encoding',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'Sliders',
  shortDescription: 'Master the craft of clean data: sanitization, missing imputation, nominal vs. ordinal encoding, feature scaling, and leak-free pipelines.',
  description: 'Uncover the foundational engineering that powers 80% of real-world machine learning. Learn how to transform messy, heterogeneous raw data into pristine numerical tensors. Master data cleaning, missing value imputation, duplicate removal, outlier handling, categorical encoding (One-Hot, Ordinal, Label, Target), feature scaling (Min-Max Normalization vs. Z-Score Standardization), data leakage prevention, and production-grade Scikit-Learn ColumnTransformer pipelines.',
  estimatedHours: 6,
  prerequisites: [
    'Module 01: Introduction to Machine Learning',
    'Module 02: How Machine Learning Learns',
    'Module 03: Errors, Bias, Variance & Model Performance',
    'Module 04: Exploratory Data Analysis (EDA)'
  ],
  objectives: [
    'Sanitize dirty raw datasets by eliminating duplicates, fixing invalid bounds, and standardizing text casing',
    'Differentiate between Nominal (unordered) and Ordinal (ranked) categorical variables and apply proper encoders',
    'Implement One-Hot Encoding with handle_unknown="ignore" and Ordinal Encoding with explicit hierarchy',
    'Apply Min-Max Normalization to [0, 1] and Z-Score Standardization (mean=0, std=1) while avoiding distance distortion',
    'Identify and eliminate Data Leakage across train/test splits during feature transformation',
    'Build production-grade atomic pipelines combining ColumnTransformer, SimpleImputer, StandardScaler, and estimators'
  ],
  badgeReward: {
    id: 'badge-pipeline-architect',
    title: 'Pipeline Architect',
    icon: 'Sliders',
    description: 'Mastered all 19 lessons on Data Preprocessing, feature scaling, categorical encoding, and leak-free Scikit-Learn pipelines.'
  },
  lessons: MODULE_05_LESSONS,
  finalQuiz: MODULE_05_COMPREHENSIVE_QUIZ
};

