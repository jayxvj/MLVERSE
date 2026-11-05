import { Lesson, Module } from './types';

export const MODULE_04_LESSONS: Lesson[] = [
  // 1. What is Exploratory Data Analysis?
  {
    id: 'les-4-1',
    moduleId: 'mod-4',
    title: '1. What is Exploratory Data Analysis?',
    slug: 'what-is-exploratory-data-analysis',
    estimatedMinutes: 14,
    simpleDefinition: 'Exploratory Data Analysis (EDA) is the crucial investigative phase where data scientists inspect, summarize, visualize, and question a dataset to understand its underlying structure, spot anomalies, and test hypotheses before applying machine learning algorithms.',
    whyItExists: 'Pioneered by statistician John Tukey in 1977, EDA exists because jumping straight into machine learning modeling without understanding data distributions guarantees "Garbage In, Garbage Out". EDA ensures your modeling assumptions match the empirical reality of your dataset.',
    howItWorks: [
      'Examine the dimensional shape: total rows (samples) and columns (features).',
      'Identify variable data types (numeric, categorical, datetime, text).',
      'Compute five-number summaries and central tendency measures.',
      'Visualize single-variable distributions with histograms and boxplots.',
      'Analyze bivariate and multivariate interactions with scatter plots and correlation matrices.',
      'Identify data quality issues: missing entries, invalid values, and extreme outliers.'
    ],
    practicalExamples: [
      'Real Estate Pricing: Plotting house prices reveals severe positive skewness, prompting the engineer to apply a log-transform before fitting linear regression.',
      'Credit Risk Modeling: An applicant with age = -999 or income = $0 is discovered during EDA, revealing missing-value sentinel flags.',
      'Medical Diagnostics: EDA reveals that the target label (rare disease) occurs in only 0.2% of samples, warning the team to use stratified sampling and PR-AUC instead of standard accuracy.'
    ],
    commonMisconceptions: [
      {
        myth: 'EDA is just making pretty charts for business presentations.',
        reality: 'EDA is a formal diagnostic procedure. It dictates feature engineering, data imputation strategies, and algorithm selection.'
      },
      {
        myth: 'Modern deep learning models do not need EDA because neural nets learn features automatically.',
        reality: 'Neural networks are equally vulnerable to corrupt data, class imbalance, and label leakage. Skipping EDA in deep learning often leads to high benchmark scores that fail catastrophically in deployment.'
      }
    ],
    conceptSummary: 'EDA is the detective work of data science: inspecting shapes, types, distributions, and anomalies before training models.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Fintech Fraud Detection',
      scenario: 'A banking data team noticed their credit card fraud classifier had 99.9% accuracy but caught 0% of actual frauds. EDA revealed that 99.9% of transactions were legitimate, meaning a trivial majority-class predictor scored 99.9% without learning anything.',
      impact: 'Conducting EDA prevented a $14M fraud loss by forcing the adoption of cost-sensitive learning and SMOTE oversampling.'
    },
    keyTakeaways: [
      'EDA is the foundational first step of every ML pipeline',
      'Never fit a model to data you haven\'t visualized and summarized',
      'Key tools: summary statistics, histograms, boxplots, scatter plots, and correlation matrices'
    ],
    mathematics: {
      title: 'Tukey\'s Five-Number Summary',
      latex: 'S = \\{ \\min(x), \\, Q_1, \\, \\text{Median}(x), \\, Q_3, \\, \\max(x) \\}',
      plainText: 'Five-Number Summary: Min, Q1 (25th percentile), Median (50th percentile), Q3 (75th percentile), Max',
      explanation: 'Provides a non-parametric summary of location and spread that remains robust against extreme outliers.',
      breakdown: [
        { id: 'min', symbol: 'min(x)', name: 'Sample Minimum', description: 'Lowest observed value in the feature column' },
        { id: 'q1', symbol: 'Q1', name: 'First Quartile', description: '25th percentile: 25% of observations fall below this value' },
        { id: 'med', symbol: 'Median', name: 'Second Quartile', description: '50th percentile: midpoint separating lower and upper halves' },
        { id: 'q3', symbol: 'Q3', name: 'Third Quartile', description: '75th percentile: 75% of observations fall below this value' },
        { id: 'max', symbol: 'max(x)', name: 'Sample Maximum', description: 'Highest observed value in the feature column' }
      ]
    },
    pythonSnippet: {
      title: 'Quick Comprehensive EDA with Pandas',
      code: `import pandas as pd
import numpy as np

# Create sample dataset
data = {
    'area': [1200, 1850, 950, 2400, 1100, 3200, 1500, 780, 2100, 1700],
    'bedrooms': [2, 3, 1, 4, 2, 5, 3, 1, 4, 3],
    'price': [245000, 385000, 128000, 520000, 215000, 875000, 310000, 95000, 450000, 362000]
}
df = pd.DataFrame(data)

# 1. Dataset Shape and Data Types
print("--- DATASET SHAPE & TYPES ---")
print(df.info())

# 2. Descriptive Statistics for all numerical columns
print("\n--- DESCRIPTIVE STATISTICS ---")
print(df.describe())
`,
      explanation: 'df.info() reveals column types and non-null counts, while df.describe() computes mean, standard deviation, and the five-number summary for every numeric feature.',
      expectedOutput: '--- DATASET SHAPE & TYPES ---\nRangeIndex: 10 entries, 0 to 9\nData columns (total 3 columns):\n #   Column    Non-Null Count  Dtype\n---  ------    --------------  -----\n 0   area      10 non-null     int64\n 1   bedrooms  10 non-null     int64\n 2   price     10 non-null     int64\ndtypes: int64(3)\n\n--- DESCRIPTIVE STATISTICS ---\n              area   bedrooms          price\ncount    10.000000  10.000000      10.000000\nmean   1678.000000   2.800000  358500.000000\nstd     725.684351   1.316561  227187.978946\nmin     780.000000   1.000000   95000.000000\n25%    1125.000000   2.000000  222500.000000\n50%    1600.000000   3.000000  336000.000000\n75%    2037.500000   3.750000  433750.000000\nmax    3200.000000   5.000000  875000.000000'
    },
    knowledgeCheck: [
      {
        id: 'q4-1-1',
        question: 'Who coined the term Exploratory Data Analysis (EDA) and established its principles in 1977?',
        options: ['John Tukey', 'Alan Turing', 'Geoffrey Hinton', 'Andrew Ng'],
        correctIndex: 0,
        explanation: 'John Tukey introduced Exploratory Data Analysis in his seminal 1977 book to emphasize data visualization and summary before confirmatory testing.'
      }
    ],
    revisionNotes: [
      'EDA is the foundational discovery step in data science.',
      'It identifies distributions, anomalies, missing data, and patterns.',
      'Primary tools include five-number summaries, histograms, and scatter plots.'
    ]
  },

  // 2. Why EDA is important
  {
    id: 'les-4-2',
    moduleId: 'mod-4',
    title: '2. Why EDA is Important',
    slug: 'why-eda-is-important',
    estimatedMinutes: 14,
    simpleDefinition: 'EDA is essential because real-world data is inherently messy, noisy, and biased. EDA reveals data quality flaws, guides preprocessing, validates assumptions, and suggests which algorithms are mathematically appropriate.',
    whyItExists: 'Algorithms blindly optimize whatever numbers you feed them. If your dataset contains data leakage, measurement errors, or invalid sentinel codes (-999), a model will learn spurious patterns that fail in production.',
    howItWorks: [
      'Detects corrupt or impossible values (e.g. human age = 250 years).',
      'Uncovers multicollinearity (two features carrying duplicate information).',
      'Identifies whether target distributions violate algorithmic assumptions (e.g. non-linearities or heavy skewness in linear models).',
      'Informs feature engineering (e.g. ratios, log-transforms, binning).',
      'Prevents data leakage by verifying target independence.'
    ],
    practicalExamples: [
      'Insurance Claims: EDA reveals that the "Claim Approved" column contains an internal database update timestamp that only exists for approved claims, exposing catastrophic target leakage.',
      'Customer Churn: EDA shows that 95% of churned users have zero logins in the final 30 days, suggesting "days since last login" as an essential engineered feature.',
      'Healthcare: EDA discovers that blood pressure readings were recorded in different units across two hospital systems (mmHg vs kPa).'
    ],
    commonMisconceptions: [
      {
        myth: 'Automated ML (AutoML) makes human EDA obsolete.',
        reality: 'AutoML cannot understand business domain logic, detect semantic errors, or realize that a zip code of 99999 represents missing data.'
      }
    ],
    conceptSummary: 'EDA prevents flawed models by exposing corruption, ensuring mathematical assumptions hold, and revealing feature engineering opportunities.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Google Flu Trends Failure',
      scenario: 'Google attempted to predict flu outbreaks using search query volumes. Because they did not perform continuous EDA on shifting search habits, seasonal search correlations broke down, and their model overestimated flu cases by over 100%.',
      impact: 'Demonstrated to the global data science community that without continuous exploratory analysis, correlational models drift and fail.'
    },
    keyTakeaways: [
      'EDA prevents building models on corrupted or leaky data',
      'It determines whether transformations (like log-scaling) are required',
      'Domain context combined with EDA uncovers critical data entry anomalies'
    ],
    mathematics: {
      title: 'Anscombe\'s Quartet',
      latex: '\\text{For all 4 datasets: } \\bar{x} = 9.0, \\quad \\bar{y} = 7.5, \\quad r = 0.816, \\quad y = 3.00 + 0.500x',
      plainText: 'Four completely different datasets with identical means, variances, correlation r=0.816, and regression lines!',
      explanation: 'Anscombe proved in 1973 that summary statistics alone are insufficient; you MUST visualize data because radically different distributions can have identical summary numbers.',
      breakdown: [
        { id: 'summary', symbol: 'x_bar, y_bar', name: 'Identical Statistics', description: 'Mean and variance match across all four datasets' },
        { id: 'geom', symbol: 'Geometry', name: 'Different Reality', description: 'One is linear, one is curved quadratic, one has an outlier, one is vertical with an outlier' }
      ]
    },
    pythonSnippet: {
      title: 'Visualizing Why Summary Stats Alone Can Deceive',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load Anscombe's Quartet directly from seaborn
df = sns.load_dataset("anscombe")

# Print summary stats for dataset I and II
print("Dataset I Mean Y:", round(df[df['dataset']=='I']['y'].mean(), 2))
print("Dataset II Mean Y:", round(df[df['dataset']=='II']['y'].mean(), 2))
print("Both have identical summary stats, yet Dataset II is a non-linear parabola!")
`,
      explanation: 'Anscombe\'s quartet proves that relying solely on descriptive statistics without visual EDA can hide severe non-linearities and outliers.',
      expectedOutput: 'Dataset I Mean Y: 7.5\nDataset II Mean Y: 7.5\nBoth have identical summary stats, yet Dataset II is a non-linear parabola!'
    },
    knowledgeCheck: [
      {
        id: 'q4-2-1',
        question: 'What does Anscombe\'s Quartet mathematically demonstrate to data scientists?',
        options: [
          'Datasets with identical means, variances, and correlations can have radically different visual distributions',
          'Python is faster than R for statistics',
          'Linear regression always fits any dataset',
          'Four features are always better than three'
        ],
        correctIndex: 0,
        explanation: 'Anscombe\'s Quartet demonstrated that numerical summaries alone can be deceptive and that visualization is indispensable.'
      }
    ],
    revisionNotes: [
      'EDA validates data integrity and prevents the "Garbage In, Garbage Out" trap.',
      'Anscombe\'s quartet proves why summary statistics must be paired with visualization.'
    ]
  },

  // 3. Understanding datasets
  {
    id: 'les-4-3',
    moduleId: 'mod-4',
    title: '3. Understanding Datasets: Dimensions, Rows & Columns',
    slug: 'understanding-datasets',
    estimatedMinutes: 14,
    simpleDefinition: 'A dataset in tabular machine learning is a two-dimensional matrix of N rows (observations or samples) and D columns (features or attributes), representing real-world measurements structured for mathematical processing.',
    whyItExists: 'Machine learning algorithms operate on linear algebra matrix mathematics: X in R^(N x D). Translating messy real-world entities into consistent tabular rows and columns is how software transforms observations into computable vectors.',
    howItWorks: [
      'Each row represents a distinct entity, transaction, patient, or observation.',
      'Each column represents a measurable property (feature) of that entity.',
      'The target column y holds the ground truth label in supervised learning.',
      'The shape of the dataset is denoted as (N, D): N samples, D attributes.'
    ],
    practicalExamples: [
      'E-commerce: Rows are individual orders; columns are timestamp, cart value, customer ID, item count, and payment method.',
      'Sensor Telemetry: Rows are time readings sampled at 10 Hz; columns are vibration, temperature, pressure, and motor RPM.',
      'Genomics: Rows are individual patients (e.g. 500); columns are gene expression levels (e.g. 20,000 features), creating a wide dataset (D >> N).'
    ],
    commonMisconceptions: [
      {
        myth: 'More columns are always better.',
        reality: 'Adding irrelevant columns increases dimensionality and causes the "Curse of Dimensionality", increasing data sparsity and overfitting risk.'
      }
    ],
    conceptSummary: 'Datasets are 2D matrices where rows represent observations and columns represent attributes.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Autonomous Fleet Management',
      scenario: 'A self-driving delivery fleet collects 50 million sensor rows per day across 85 telemetry columns. Understanding which columns represent static vehicle metadata vs real-time dynamic velocity is the first step in building battery range models.',
      impact: 'Structuring and filtering the tabular dataset reduced data ingestion costs by $80,000 monthly.'
    },
    keyTakeaways: [
      'Dataset dimensions: N rows (samples) × D columns (features)',
      'High-dimensional data (D > N) requires dimensionality reduction and regularization',
      'Inspecting row samples and column metadata is the first step of EDA'
    ],
    mathematics: {
      title: 'Dataset Matrix Representation',
      latex: '\\mathbf{X} = \\begin{bmatrix} x_{1,1} & x_{1,2} & \\dots & x_{1,D} \\\\ x_{2,1} & x_{2,2} & \\dots & x_{2,D} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ x_{N,1} & x_{N,2} & \\dots & x_{N,D} \\end{bmatrix} \\in \\mathbb{R}^{N \\times D}',
      plainText: 'X is an N x D matrix where row i is the feature vector of sample i.',
      explanation: 'Mathematical formulation of tabular data where N is the number of observations and D is the feature dimensionality.',
      breakdown: [
        { id: 'N', symbol: 'N', name: 'Sample Size', description: 'Number of rows/observations' },
        { id: 'D', symbol: 'D', name: 'Dimensionality', description: 'Number of columns/features' }
      ]
    },
    pythonSnippet: {
      title: 'Inspecting Dataset Dimensions in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'house_id': [101, 102, 103],
    'sqft': [1500, 2200, 1800],
    'price': [320000, 480000, 390000]
})

print("Shape (rows, columns):", df.shape)
print("Row count N:          ", len(df))
print("Column count D:       ", df.shape[1])
print("Column names:         ", list(df.columns))
`,
      explanation: 'df.shape returns the tuple (rows, columns). Understanding this basic dimension confirms whether the dataset is tall (N >> D) or wide (D >> N).',
      expectedOutput: 'Shape (rows, columns): (3, 3)\nRow count N:           3\nColumn count D:        3\nColumn names:          [\'house_id\', \'sqft\', \'price\']'
    },
    knowledgeCheck: [
      {
        id: 'q4-3-1',
        question: 'If a dataset has shape (5000, 42), what do the numbers represent?',
        options: [
          '5,000 samples (rows) and 42 features (columns)',
          '42 samples (rows) and 5,000 features (columns)',
          '5,000 gigabytes of memory and 42 tables',
          '5,000 missing values and 42 outliers'
        ],
        correctIndex: 0,
        explanation: 'By convention in Python and machine learning, df.shape returns (n_samples, n_features).'
      }
    ],
    revisionNotes: [
      'Rows = samples / instances / observations.',
      'Columns = attributes / features / variables.',
      'Shape is expressed as (N, D).'
    ]
  },

  // 4. Numerical variables
  {
    id: 'les-4-4',
    moduleId: 'mod-4',
    title: '4. Numerical Variables: Quantitative Measurements',
    slug: 'numerical-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Numerical variables (also called quantitative variables) are features expressed as numbers where mathematical operations like addition, subtraction, and averaging are meaningful (e.g. house area, age, annual income).',
    whyItExists: 'Numerical features can be directly operated on by linear algebra routines, distance metrics, and calculus gradients without needing categorical encoding tables.',
    howItWorks: [
      'Represent counts or physical measurements on continuous or discrete scales.',
      'Support arithmetic operations: mean, standard deviation, and correlation.',
      'Can be scaled or normalized (e.g. Min-Max scaling, Standard Z-score scaling) to accelerate gradient descent.',
      'Divided into continuous (fractions allowed) and discrete (integer counts only) sub-types.'
    ],
    practicalExamples: [
      'House price in dollars ($350,000.00).',
      'Body temperature in Celsius (37.2°C).',
      'Vehicle engine displacement in liters (2.5L).'
    ],
    commonMisconceptions: [
      {
        myth: 'Any column containing numbers is a numerical variable.',
        reality: 'Zip codes (90210) and telephone numbers (555-0199) are stored as digits, but averaging them is meaningless! They are categorical variables formatted with digits.'
      }
    ],
    conceptSummary: 'Numerical variables represent quantifiable measurements where arithmetic operations and ordering are meaningful.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Aviation Engine Health',
      scenario: 'Turbofan sensors measure exhaust gas temperature (850.4°C) and core vibration (0.42 mm/s). Because these are continuous numerical variables, engineers can compute running averages and derivatives to predict metal fatigue.',
      impact: 'Enables predictive maintenance that avoids in-flight engine shutdowns.'
    },
    keyTakeaways: [
      'Numerical variables support arithmetic and statistical aggregation',
      'Not all numbers are numerical: zip codes, ID numbers, and phone numbers are categorical',
      'Numerical variables require feature scaling before being passed to distance-based models (KNN, SVM)'
    ],
    mathematics: {
      title: 'Arithmetic Mean of a Numerical Variable',
      latex: '\\bar{x} = \\frac{1}{N}\\sum_{i=1}^N x_i',
      plainText: 'mean = (1/N) * sum(x_i)',
      explanation: 'The arithmetic mean requires addition and division, operations that are strictly valid only for quantitative numerical variables.',
      breakdown: [
        { id: 'x_bar', symbol: 'x_bar', name: 'Sample Mean', description: 'Average value of the numerical feature' }
      ]
    },
    pythonSnippet: {
      title: 'Identifying and Summarizing Numerical Features',
      code: `import pandas as pd

df = pd.DataFrame({
    'user_id': [1, 2, 3],          # Categorical identifier (not a real number!)
    'age': [24, 38, 45],            # Numerical
    'income': [52000.0, 94000.0, 71000.0] # Numerical
})

# Select strictly numerical columns (ignoring IDs)
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
print("Detected numeric columns:", list(num_cols))
print("\nMean of numerical variables:")
print(df[['age', 'income']].mean())
`,
      explanation: 'Pandas select_dtypes filters numeric columns, enabling batch calculations of statistical properties.',
      expectedOutput: 'Detected numeric columns: [\'user_id\', \'age\', \'income\']\n\nMean of numerical variables:\nage          35.666667\nincome    72333.333333\ndtype: float64'
    },
    knowledgeCheck: [
      {
        id: 'q4-4-1',
        question: 'Which of the following is a genuine NUMERICAL variable where arithmetic operations are meaningful?',
        options: ['Annual Salary ($85,000)', 'Postal Zip Code (90210)', 'Credit Card Number', 'Social Security Number'],
        correctIndex: 0,
        explanation: 'Annual salary represents a true monetary quantity where calculating an average or difference has real mathematical meaning.'
      }
    ],
    revisionNotes: [
      'Numerical variables represent true quantitative measurements.',
      'Check if averaging the column makes domain sense; if not, it is categorical.'
    ]
  },

  // 5. Categorical variables
  {
    id: 'les-4-5',
    moduleId: 'mod-4',
    title: '5. Categorical Variables: Qualitative Groups',
    slug: 'categorical-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Categorical variables (also called qualitative variables) represent distinct classes, groups, or labels that place an observation into a category (e.g. house location: Urban, Suburban, or Rural).',
    whyItExists: 'Human language and real-world phenomena are organized into conceptual buckets. Because mathematical algorithms only accept numerical matrices, identifying categorical features is essential so they can be properly encoded (One-Hot, Ordinal).',
    howItWorks: [
      'Observations take on one value from a finite set of discrete categories (levels).',
      'Can be Nominal (no natural ordering: Red, Blue, Green) or Ordinal (meaningful hierarchy: Low, Medium, High).',
      'Cannot be directly multiplied by weights; must be encoded into numbers using techniques like One-Hot Encoding or Target Encoding.'
    ],
    practicalExamples: [
      'Medical: Blood type (A, B, AB, O) — nominal categorical.',
      'Customer Feedback: Rating (Poor, Fair, Good, Excellent) — ordinal categorical.',
      'Real Estate: Garage presence (True/False) — binary categorical.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can just label encode nominal categories as 1, 2, 3 and pass them to linear regression.',
        reality: 'If you encode Red=1, Blue=2, Green=3, a linear model assumes Green is "3 times Red" and Blue is the midpoint, introducing false arithmetic relationships.'
      }
    ],
    conceptSummary: 'Categorical variables place observations into qualitative groups (nominal or ordinal) and require encoding before modeling.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Customer Churn Prediction',
      scenario: 'A telecom provider tracks user contract type ("Month-to-Month", "One-Year", "Two-Year"). EDA shows month-to-month users churn at a 42% rate vs 3% for two-year contracts.',
      impact: 'Identifying this categorical split allowed marketing to offer targeted annual discounts, reducing churn by 18%.'
    },
    keyTakeaways: [
      'Categorical variables represent discrete labels, not numbers',
      'Nominal categories have no ordering; Ordinal categories have a logical hierarchy',
      'Must be converted to numerical format via One-Hot Encoding or Ordinal Encoding'
    ],
    mathematics: {
      title: 'One-Hot Indicator Vector Transformation',
      latex: 'x_{\\text{Urban}} = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}, \\quad x_{\\text{Suburban}} = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\quad x_{\\text{Rural}} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}',
      plainText: 'A K-level categorical feature becomes K binary dummy columns with values in {0, 1}.',
      explanation: 'One-hot encoding creates orthogonal basis vectors that avoid introducing false ordering into nominal categories.',
      breakdown: [
        { id: 'dummy', symbol: 'x_k in {0, 1}', name: 'Dummy Variable', description: 'Binary indicator flag for category membership' }
      ]
    },
    pythonSnippet: {
      title: 'Analyzing and Encoding Categorical Features in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'location': ['Urban', 'Suburban', 'Urban', 'Rural', 'Suburban'],
    'has_garage': [True, True, False, False, True]
})

# Frequency distribution of categorical levels
print("--- VALUE COUNTS ---")
print(df['location'].value_counts())

# One-hot encoding nominal feature
encoded_df = pd.get_dummies(df, columns=['location'], drop_first=True)
print("\n--- ONE-HOT ENCODED MATRIX ---")
print(encoded_df)
`,
      explanation: 'value_counts() inspects category frequency distributions during EDA, while pd.get_dummies() transforms labels into numerical binary columns.',
      expectedOutput: '--- VALUE COUNTS ---\nlocation\nUrban       2\nSuburban    2\nRural       1\nName: count, dtype: int64\n\n--- ONE-HOT ENCODED MATRIX ---\n   has_garage  location_Suburban  location_Urban\n0        True              False            True\n1        True               True           False\n2       False              False            True\n3       False              False           False\n4        True               True           False'
    },
    knowledgeCheck: [
      {
        id: 'q4-5-1',
        question: 'Which of the following is an ORDINAL categorical variable (has a natural logical ranking)?',
        options: [
          'Education Level: High School < Bachelor\'s < Master\'s < PhD',
          'Car Brand: Ford, Toyota, BMW',
          'Eye Color: Brown, Blue, Green',
          'State: Texas, California, New York'
        ],
        correctIndex: 0,
        explanation: 'Education levels have an inherent hierarchical progression, making it an ordinal categorical variable.'
      }
    ],
    revisionNotes: [
      'Nominal: categories with no order (e.g. colors, countries).',
      'Ordinal: categories with a logical order (e.g. low, medium, high).',
      'Requires categorical encoding for machine learning.'
    ]
  },

  // 6. Continuous and discrete variables
  {
    id: 'les-4-6',
    moduleId: 'mod-4',
    title: '6. Continuous vs. Discrete Variables',
    slug: 'continuous-vs-discrete-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Continuous variables can take on an infinite number of real values within any interval (e.g. price $245,182.50, house area 1,450.75 sqft), while discrete variables can only take on specific countable separate values (e.g. 3 bedrooms, 2 bathrooms).',
    whyItExists: 'Continuous and discrete variables require different statistical distributions (Normal/Gaussian vs Poisson/Binomial), different visualization charts (smooth KDE vs bar charts), and different loss functions in machine learning.',
    howItWorks: [
      'Continuous: Any value along the real number line is theoretically possible, constrained only by measurement precision.',
      'Discrete: Gaps exist between possible values; you can count them (0, 1, 2, 3...). You cannot have 2.37 children or 3.14 bedrooms.',
      'In modeling, discrete targets use count-regression (Poisson) or classification, while continuous targets use standard regression (MSE loss).'
    ],
    practicalExamples: [
      'House Area: 1,842.3 sqft — Continuous.',
      'Number of Bedrooms: 3 — Discrete.',
      'Customer Age: Often recorded as whole years (discrete in practice), but fundamentally continuous in time.'
    ],
    commonMisconceptions: [
      {
        myth: 'If a variable only has integers in the dataset, it is always discrete.',
        reality: 'Salary rounded to whole dollars ($85,240) is fundamentally continuous; it is only rounded due to currency convention.'
      }
    ],
    conceptSummary: 'Continuous features represent uncountably infinite measurements along a spectrum; discrete features represent distinct countable quantities.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Ride-Hailing Surge Pricing',
      scenario: 'Uber models trip duration (continuous in seconds) and the number of available drivers nearby (discrete count: 0, 1, 2, 3...). Using a continuous Gaussian model for driver count resulted in negative driver estimates.',
      impact: 'Switching to a discrete Poisson distribution for driver count eliminated invalid negative availability predictions.'
    },
    keyTakeaways: [
      'Continuous = measured along a continuum with infinite potential values',
      'Discrete = counted in integer steps with distinct gaps between values',
      'Dictates whether you visualize with smooth histograms/KDE or discrete bar plots'
    ],
    mathematics: {
      title: 'Probability Density (PDF) vs Probability Mass (PMF)',
      latex: '\\text{Continuous: } \\int_{-\\infty}^\\infty f(x) dx = 1, \\quad \\text{Discrete: } \\sum_{k} P(X = k) = 1',
      plainText: 'Continuous uses integration over a density f(x); Discrete sums point probabilities P(X=k).',
      explanation: 'Continuous variables have zero probability at any exact point P(X = c) = 0; probabilities exist only over intervals.',
      breakdown: [
        { id: 'pdf', symbol: 'f(x)', name: 'Probability Density Function', description: 'Used for continuous measurements' },
        { id: 'pmf', symbol: 'P(X=k)', name: 'Probability Mass Function', description: 'Used for discrete countable outcomes' }
      ]
    },
    pythonSnippet: {
      title: 'Distinguishing Continuous vs Discrete Features in Code',
      code: `import pandas as pd

df = pd.DataFrame({
    'bedrooms': [1, 2, 3, 4, 3, 2, 5],     # Discrete (Countable)
    'price_k': [150.5, 230.2, 310.8, 480.0, 350.2, 220.1, 750.9] # Continuous
})

print("Bedrooms unique values (Discrete):", sorted(df['bedrooms'].unique()))
print("Price range (Continuous):         ", df['price_k'].min(), "to", df['price_k'].max())
`,
      explanation: 'Inspecting cardinality (unique values) helps identify whether a column behaves as a discrete count or a continuous continuum.',
      expectedOutput: 'Bedrooms unique values (Discrete): [1, 2, 3, 4, 5]\nPrice range (Continuous):          150.5 to 750.9'
    },
    knowledgeCheck: [
      {
        id: 'q4-6-1',
        question: 'Which of the following is a DISCRETE variable?',
        options: ['Number of cars owned by a household', 'Vehicle speed in mph', 'Weight of a shipping package', 'Flight duration in hours'],
        correctIndex: 0,
        explanation: 'Car count is a countable integer (0, 1, 2, 3...) with gaps between possible values, making it discrete.'
      }
    ],
    revisionNotes: [
      'Continuous: measured on a continuum (temperature, distance, time, price).',
      'Discrete: counted in distinct chunks (visits, bedrooms, clicks).'
    ]
  },

  // 7. Data types
  {
    id: 'les-4-7',
    moduleId: 'mod-4',
    title: '7. Data Types: Software Representations in Python & Pandas',
    slug: 'data-types',
    estimatedMinutes: 14,
    simpleDefinition: 'Data types (dtypes) are the software specifications that define how data values are stored in computer memory and what operations can be performed on them (e.g. int64, float64, object/string, bool, datetime64).',
    whyItExists: 'Machine learning algorithms require clean numerical tensors. If a numeric column accidentally contains a stray string (e.g. "$1,200" or "N/A"), Pandas loads the entire column as a generic `object` dtype, causing machine learning models to crash.',
    howItWorks: [
      'int64: 64-bit integer values (e.g. sample counts, discrete values).',
      'float64: 64-bit floating point numbers (e.g. continuous values, probabilities).',
      'object: Generic Python string or mixed-type container (requires cleaning).',
      'bool: Binary True/False flags.',
      'datetime64: Temporal timestamps (supports date math, day-of-week extraction).'
    ],
    practicalExamples: [
      'Currency Columns: A price column loaded as `$250,000` has string `object` dtype; stripping `$` and commas allows casting to `float64`.',
      'Dates: Converting `2024-03-15` to `datetime64` lets engineers extract "Day of Week" and "Month" as predictive features.',
      'Memory Optimization: Converting high-cardinality strings to `category` dtype can reduce Pandas RAM consumption by over 80%.'
    ],
    commonMisconceptions: [
      {
        myth: 'Pandas always infers data types correctly.',
        reality: 'If a numerical column has even a single empty string or typo like "12O" (letter O instead of zero), Pandas defaults the entire column to `object`.'
      }
    ],
    conceptSummary: 'Data types dictate memory representation and computational capabilities. Verifying dtypes during EDA catches parsing bugs early.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Hospital Electronic Health Records',
      scenario: 'Patient temperature was recorded as strings with notes like "98.6 (oral)". The machine learning pipeline failed silently by treating all temperatures alphabetically instead of numerically.',
      impact: 'EDA detected the `object` dtype, prompting regex cleaning that restored critical fever features for septic shock prediction.'
    },
    keyTakeaways: [
      'Always run `df.dtypes` and `df.info()` as the very first line of EDA',
      'Beware of numerical columns loaded as `object` dtype due to stray symbols',
      'Use `pd.to_numeric(errors="coerce")` to convert dirty string columns into clean floats'
    ],
    mathematics: {
      title: 'Memory Footprint of Numeric Data Types',
      latex: '\\text{int8: } [-128, 127], \\quad \\text{int32: } [-2\\cdot 10^9, 2\\cdot 10^9], \\quad \\text{float64: } 64 \\text{ bits} \\implies 8 \\text{ bytes per float}',
      plainText: 'float64 consumes 8 bytes per cell. 10M rows x 100 float64 columns = 8 GB RAM.',
      explanation: 'Downcasting float64 to float32 halves memory consumption without sacrificing predictive precision in machine learning.',
      breakdown: [
        { id: 'dtype', symbol: 'dtype', name: 'Bit Width', description: 'Number of bits allocated per memory cell' }
      ]
    },
    pythonSnippet: {
      title: 'Detecting and Fixing Mismatched Data Types',
      code: `import pandas as pd

# Dirty dataset where price contains a dollar sign
dirty_df = pd.DataFrame({
    'house_id': [1, 2, 3],
    'price': ['$250,000', '$385,000', '$128,000']
})

print("Before cleaning dtypes:")
print(dirty_df.dtypes)

# Clean and cast to float
dirty_df['price_clean'] = dirty_df['price'].str.replace('$', '').str.replace(',', '').astype(float)

print("\nAfter cleaning dtypes:")
print(dirty_df[['house_id', 'price_clean']].dtypes)
`,
      explanation: 'String cleaning and type casting transforms uncomputable object strings into machine-learning-ready float64 features.',
      expectedOutput: 'Before cleaning dtypes:\nhouse_id     int64\nprice       object\ndtype: object\n\nAfter cleaning dtypes:\nhouse_id         int64\nprice_clean    float64\ndtype: object'
    },
    knowledgeCheck: [
      {
        id: 'q4-7-1',
        question: 'If a column containing house prices is listed as `object` dtype in Pandas, what does that usually indicate?',
        options: [
          'The column contains strings, special characters, or missing-value text that prevented numeric parsing',
          'The numbers are too large for Python',
          'The column is an image',
          'The column has zero variance'
        ],
        correctIndex: 0,
        explanation: 'In Pandas, `object` dtype for a numerical feature indicates non-numeric characters (like currency symbols, commas, or text) are present.'
      }
    ],
    revisionNotes: [
      'Check `df.info()` to inspect dtypes.',
      'int64 / float64: numeric.',
      'object: strings or mixed data.',
      'datetime64: timestamps.'
    ]
  },

  // 8. Descriptive statistics
  {
    id: 'les-4-8',
    moduleId: 'mod-4',
    title: '8. Descriptive Statistics: Summarizing Data at Scale',
    slug: 'descriptive-statistics',
    estimatedMinutes: 15,
    simpleDefinition: 'Descriptive statistics are quantitative summaries that describe the central location, dispersion, and shape of a dataset, condensing millions of raw data points into actionable insights.',
    whyItExists: 'Humans cannot mentally inspect a table of 500,000 rows. Descriptive statistics boil down massive datasets into a handful of diagnostic numbers that tell you where the data centers, how widely it spreads, and whether anomalies lurk in the tails.',
    howItWorks: [
      'Measures of Central Tendency: Mean, Median, and Mode (where does the data cluster?).',
      'Measures of Dispersion: Range, Variance, Standard Deviation, and IQR (how spread out is it?).',
      'Measures of Shape: Skewness (asymmetry) and Kurtosis (tail-heaviness).',
      'Jointly evaluated to check whether data conforms to standard modeling assumptions.'
    ],
    practicalExamples: [
      'A/B Testing: Comparing the mean conversion rate and variance between Control and Variant groups.',
      'Data Quality Audit: Seeing a minimum age of -5 or a maximum price of $999,999,999 instantly flags corrupt records.',
      'Feature Scaling: Computing mean and standard deviation to standardize features for neural net training.'
    ],
    commonMisconceptions: [
      {
        myth: 'Descriptive statistics tell the complete story of a dataset.',
        reality: 'As Anscombe\'s Quartet proved, summary statistics must always be verified visually with charts to avoid missing non-linearities.'
      }
    ],
    conceptSummary: 'Descriptive statistics condense large datasets into interpretable metrics of center, spread, and shape.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Salary Equity Auditing',
      scenario: 'A multinational corporation audits compensation parity across departments. Relying solely on mean salary disguised pay gaps because executive outlier packages inflated department averages; calculating medians and IQRs revealed true employee compensation patterns.',
      impact: 'Guided evidence-based adjustments that corrected pay disparities.'
    },
    keyTakeaways: [
      'Descriptive statistics summarize center, spread, and shape',
      'Always examine both center (mean/median) and spread (std/IQR)',
      'Use `df.describe()` in Pandas for a rapid multi-variable audit'
    ],
    mathematics: {
      title: 'The Core Statistical Summary Suite',
      latex: '\\text{Center: } \\mu = \\frac{1}{N}\\sum x_i, \\quad \\text{Spread: } \\sigma = \\sqrt{\\frac{1}{N}\\sum (x_i - \\mu)^2}',
      plainText: 'Mean mu summarizes center; Standard deviation sigma summarizes dispersion.',
      explanation: 'Together, mean and standard deviation completely describe a Gaussian bell curve.',
      breakdown: [
        { id: 'mu', symbol: 'μ', name: 'Mean', description: 'Center of gravity' },
        { id: 'sigma', symbol: 'σ', name: 'Standard Deviation', description: 'Average distance of data points from the center' }
      ]
    },
    pythonSnippet: {
      title: 'Full Descriptive Summary in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'house_price': [245000, 385000, 128000, 520000, 215000, 875000, 310000]
})

desc = df['house_price'].describe()
print(desc.round(1))
`,
      explanation: 'describe() automatically outputs count, mean, std, min, 25%, 50% (median), 75%, and max.',
      expectedOutput: 'count         7.0\nmean     382571.4\nstd      246549.9\nmin      128000.0\n25%      230000.0\n50%      310000.0\n75%      452500.0\nmax      875000.0\nName: house_price, dtype: float64'
    },
    knowledgeCheck: [
      {
        id: 'q4-8-1',
        question: 'Which Pandas method generates count, mean, std, min, quartiles, and max for all numerical columns?',
        options: ['df.describe()', 'df.info()', 'df.head()', 'df.shape()'],
        correctIndex: 0,
        explanation: '`df.describe()` generates the full descriptive statistical summary.'
      }
    ],
    revisionNotes: [
      'Center: Mean, Median, Mode.',
      'Spread: Variance, Standard Deviation, IQR, Range.',
      'Generated via `df.describe()`.'
    ]
  },

  // 9. Mean
  {
    id: 'les-4-9',
    moduleId: 'mod-4',
    title: '9. Mean: The Arithmetic Center of Gravity',
    slug: 'mean',
    estimatedMinutes: 14,
    simpleDefinition: 'The mean (or arithmetic average) is the sum of all values divided by the total number of values: μ = (1/N) Σ x_i. It represents the physical center of gravity of a distribution.',
    whyItExists: 'The mean is the single most mathematically convenient measure of central location. It incorporates every observation and minimizes the sum of squared errors, making it the mathematical foundation of Ordinary Least Squares (OLS) regression.',
    howItWorks: [
      'Sum all observations in the feature: Total = x_1 + x_2 + ... + x_N.',
      'Divide the total by sample size N.',
      'Every observation contributes proportionally.',
      'Crucial property: The sum of deviations around the mean is always exactly zero: Σ (x_i - μ) = 0.',
      'Major vulnerability: Extremely sensitive to outliers. A single massive number pulls the mean towards it.'
    ],
    practicalExamples: [
      'Grade Point Average (GPA): Averaging grades across 30 course credits.',
      'Sensor Monitoring: Averaging 100 voltage readings to smooth out high-frequency noise.',
      'Salary Distortion: If 9 factory workers earn $40k each and the CEO earns $1,000,000, the mean salary is $136k — misleading all 9 workers!'
    ],
    commonMisconceptions: [
      {
        myth: 'The mean represents what a "typical" person or sample experiences.',
        reality: 'If the distribution is skewed or has outliers, the mean does not represent typicality. In skewed distributions, the median is a far better measure of typicality.'
      }
    ],
    conceptSummary: 'The mean is the arithmetic center of gravity. It is mathematically elegant for optimization, but vulnerable to extreme outliers.',
    interactiveExperienceType: 'outlier-detector',
    realWorldExample: {
      domain: 'National Wealth Statistics',
      scenario: 'In a small town of 1,000 people, Elon Musk buys a vacation home. The town\'s mean net worth instantly jumps to $250 million per resident, even though 999 citizens still have identical modest savings.',
      impact: 'Demonstrates why central banks and economists report MEDIAN net worth rather than mean net worth.'
    },
    keyTakeaways: [
      'Formula: μ = (1/N) × Σ x_i',
      'The mean minimizes squared errors: argmin Σ (x_i - c)²',
      'Heavily distorted by outliers and skewed distributions'
    ],
    mathematics: {
      title: 'Sample Mean vs Population Mean',
      latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i \\quad (\\text{Sample}), \\quad \\mu = \\frac{1}{N}\\sum_{i=1}^N X_i \\quad (\\text{Population})',
      plainText: 'x_bar = (1/n) * sum(x_i)',
      explanation: 'Sample mean x_bar is an unbiased estimator of true population mean mu: E[x_bar] = mu.',
      breakdown: [
        { id: 'xbar', symbol: 'x_bar', name: 'Sample Mean', description: 'Calculated on observed sample data' },
        { id: 'mu', symbol: 'μ', name: 'Population Mean', description: 'True underlying parameter of the population' }
      ]
    },
    pythonSnippet: {
      title: 'Calculating Mean and Demonstrating Outlier Distortion',
      code: `import numpy as np

# 5 typical salaries
salaries = [45000, 50000, 48000, 52000, 47000]
print("Baseline Mean Salary:", np.mean(salaries))

# Add 1 CEO outlier
salaries_with_ceo = salaries + [1500000]
print("Mean with CEO Outlier:", round(np.mean(salaries_with_ceo), 2))
print("Notice how one single outlier inflated the mean by $240,000!")
`,
      explanation: 'Adding one extreme value pulled the average from $48k to $290k, demonstrating the vulnerability of the mean to outliers.',
      expectedOutput: 'Baseline Mean Salary: 48400.0\nMean with CEO Outlier: 290333.33\nNotice how one single outlier inflated the mean by $240,000!'
    },
    knowledgeCheck: [
      {
        id: 'q4-9-1',
        question: 'Given the values [10, 20, 30, 40, 100], what is the mean?',
        options: ['40.0', '30.0', '50.0', '200.0'],
        correctIndex: 0,
        explanation: 'Sum = 10 + 20 + 30 + 40 + 100 = 200. Count = 5. Mean = 200 / 5 = 40.0.'
      }
    ],
    revisionNotes: [
      'Mean = sum / count.',
      'Center of gravity minimizing squared deviations.',
      'Easily pulled away by outliers.'
    ]
  },

  // 10. Median
  {
    id: 'les-4-10',
    moduleId: 'mod-4',
    title: '10. Median: The Robust 50th Percentile',
    slug: 'median',
    estimatedMinutes: 14,
    simpleDefinition: 'The median is the exact middle value of a sorted dataset that separates the higher half from the lower half. If the dataset has an even number of values, it is the average of the two middle numbers.',
    whyItExists: 'Because the median depends strictly on the rank ordering of values rather than their numerical magnitudes, it is immune to extreme outliers. If the richest person in the world doubles their wealth, the median wealth of the country does not change by a single penny.',
    howItWorks: [
      'Sort all values in ascending numerical order: x_(1) <= x_(2) <= ... <= x_(N).',
      'If N is odd: Median = x_((N+1)/2) (the single middle value).',
      'If N is even: Median = (x_(N/2) + x_(N/2 + 1)) / 2 (the average of the two middle values).',
      'Mathematical property: The median minimizes the sum of absolute deviations: argmin Σ |x_i - c|.',
      'Remains rock-solid stable in the presence of extreme outliers.'
    ],
    practicalExamples: [
      'Real Estate: Real estate boards always report median home price (e.g. $420,000) so a $30M luxury estate does not mislead buyers.',
      'Web Page Load Time: Median latency gives the 50th percentile user experience, unaffected by a single user whose browser froze.',
      'Income Reporting: National statistics report median household income to accurately represent the typical family.'
    ],
    commonMisconceptions: [
      {
        myth: 'Mean and median are interchangeable.',
        reality: 'They only match when data is perfectly symmetric. When data is skewed, the difference between mean and median reveals the direction of skewness.'
      }
    ],
    conceptSummary: 'The median is the robust middle value of sorted data, completely resistant to outlier distortion.',
    interactiveExperienceType: 'outlier-detector',
    realWorldExample: {
      domain: 'Cloud Infrastructure SLA Monitoring',
      scenario: 'Amazon AWS tracks API latency. If 99 requests take 20ms and 1 request hits a network timeout (30,000ms), the mean is 320ms (looks terrible). The median is 20ms (accurately reflects typical experience).',
      impact: 'Using medians and p95/p99 percentiles prevents false operational alarms from isolated transient glitches.'
    },
    keyTakeaways: [
      'The median divides sorted data into equal halves (50th percentile)',
      'Extremely robust against outliers and extreme values',
      'Minimizes the sum of absolute errors (MAE)'
    ],
    mathematics: {
      title: 'Formal Definition of the Median',
      latex: '\\tilde{x} = \\begin{cases} x_{\\left(\\frac{n+1}{2}\\right)} & \\text{if } n \\text{ is odd} \\\\[8pt] \\frac{x_{\\left(\\frac{n}{2}\\right)} + x_{\\left(\\frac{n}{2} + 1\\right)}}{2} & \\text{if } n \\text{ is even} \\end{cases}',
      plainText: 'Odd n: middle item. Even n: average of two middle items in sorted array.',
      explanation: 'Values must be sorted in ascending order before index lookup.',
      breakdown: [
        { id: 'xtilde', symbol: 'x_tilde', name: 'Sample Median', description: '50th percentile ranking value' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Median Outlier Immunity in Python',
      code: `import numpy as np

# 5 typical salaries
salaries = [45000, 48000, 50000, 52000, 55000]
print("Baseline Median:", np.median(salaries))

# Add 1 massive CEO outlier ($10 million!)
salaries_with_ceo = salaries + [10000000]
print("Median with $10M Outlier:", np.median(salaries_with_ceo))
print("Notice: The median only shifted from $50k to $51k, completely brushing off the $10M outlier!")
`,
      explanation: 'While the mean would have skyrocketed into millions, the median shifted by only $1,000, proving its resilience.',
      expectedOutput: 'Baseline Median: 50000.0\nMedian with $10M Outlier: 51000.0\nNotice: The median only shifted from $50k to $51k, completely brushing off the $10M outlier!'
    },
    knowledgeCheck: [
      {
        id: 'q4-10-1',
        question: 'What is the median of the dataset [15, 8, 22, 10, 3]? (Hint: sort it first!)',
        options: ['10', '15', '11.6', '8'],
        correctIndex: 0,
        explanation: 'Sorted: [3, 8, 10, 15, 22]. The middle item (index 3) is 10.'
      }
    ],
    revisionNotes: [
      'Median = middle value of sorted data.',
      'Odd count: middle item; Even count: average of 2 middle items.',
      'Robust against outliers.'
    ]
  },

  // 11. Mode
  {
    id: 'les-4-11',
    moduleId: 'mod-4',
    title: '11. Mode: The Most Frequent Value',
    slug: 'mode',
    estimatedMinutes: 14,
    simpleDefinition: 'The mode is the value that appears with the highest frequency in a dataset. Unlike the mean and median, the mode can be calculated for both numerical and categorical data.',
    whyItExists: 'For categorical features (e.g. car color: Red, Blue, White), you cannot calculate a mean or median. The mode is the ONLY measure of central tendency valid for nominal categorical variables, and it reveals the most common archetype.',
    howItWorks: [
      'Count occurrences of each unique value.',
      'The value with maximum count is the mode.',
      'Unimodal: One clear peak.',
      'Bimodal: Two distinct values tie for highest frequency (hints at two distinct sub-populations).',
      'Multimodal: Multiple peaks.',
      'No mode: All values appear with equal frequency.'
    ],
    practicalExamples: [
      'Apparel Manufacturing: Shoe size 9 is the mode; manufacturers produce more size 9s than size 14s.',
      'Missing Value Imputation: Filling missing values in categorical columns (e.g. `location`) using the mode category.',
      'Retail Grocery: The mode item in supermarket baskets on Friday evening is milk.'
    ],
    commonMisconceptions: [
      {
        myth: 'Every dataset has exactly one mode.',
        reality: 'A dataset can have no mode (all values unique) or multiple modes (bimodal, trimodal). In continuous data, exact ties are rare, so the mode is identified via histogram bin peaks.'
      }
    ],
    conceptSummary: 'The mode is the most frequently occurring value. It is the only measure of central tendency applicable to nominal categorical data.',
    interactiveExperienceType: 'distribution-explorer',
    realWorldExample: {
      domain: 'Inventory Optimization',
      scenario: 'An auto parts distributor stocks replacement tires. The mean tire size is 16.74 inches (which doesn\'t exist in manufacturing). The mode tire size is 17 inches.',
      impact: 'Ordering inventory based on the mode prevented stocking imaginary decimal-sized tires.'
    },
    keyTakeaways: [
      'Mode = most frequent value in the dataset',
      'The only measure of central tendency valid for nominal categorical variables',
      'Bimodal distributions suggest two distinct underlying sub-groups'
    ],
    mathematics: {
      title: 'Formal Mode Definition',
      latex: '\\text{Mode}(x) = \\arg\\max_{v} \\sum_{i=1}^N \\mathbb{I}(x_i = v)',
      plainText: 'Mode = value v that maximizes frequency count.',
      explanation: 'Where I is the indicator function equal to 1 if x_i = v, and 0 otherwise.',
      breakdown: [
        { id: 'mode_val', symbol: 'Mode', name: 'Most Frequent Value', description: 'Peak of the discrete probability distribution' }
      ]
    },
    pythonSnippet: {
      title: 'Computing the Mode in Pandas and SciPy',
      code: `import pandas as pd

# Categorical column with a clear mode
locations = pd.Series(['Urban', 'Suburban', 'Urban', 'Rural', 'Urban', 'Suburban'])
print("Mode Location:   ", locations.mode()[0])
print("Frequency Count:\n", locations.value_counts())
`,
      explanation: 'Pandas .mode() returns a Series containing the most frequent value(s).',
      expectedOutput: 'Mode Location:    Urban\nFrequency Count:\n Urban       3\nSuburban    2\nRural       1\nName: count, dtype: int64'
    },
    knowledgeCheck: [
      {
        id: 'q4-11-1',
        question: 'Which measure of central tendency is the ONLY valid choice for nominal categorical variables like eye color (Blue, Brown, Green)?',
        options: ['Mode', 'Mean', 'Median', 'Variance'],
        correctIndex: 0,
        explanation: 'Because nominal categories cannot be added or ranked, the mode (most frequent category) is the only valid measure of central tendency.'
      }
    ],
    revisionNotes: [
      'Mode = most frequent value.',
      'Works on numbers AND categories.',
      'Bimodal data implies two sub-populations.'
    ]
  },

  // 12. Minimum and maximum
  {
    id: 'les-4-12',
    moduleId: 'mod-4',
    title: '12. Minimum and Maximum: Boundary Scouting',
    slug: 'minimum-and-maximum',
    estimatedMinutes: 13,
    simpleDefinition: 'The minimum is the smallest observed value and the maximum is the largest observed value in a numerical feature. Together, they establish the empirical boundaries of the data.',
    whyItExists: 'Checking minimum and maximum values is the fastest sanity test in data science. It immediately exposes impossible values (e.g. negative age, 150% battery), sentinel codes (-999, 9999), and measurement clipping.',
    howItWorks: [
      'Scan feature column to find min: min(X) = infimum of observed values.',
      'Scan feature column to find max: max(X) = supremum of observed values.',
      'Verify if values respect physical domain boundaries (e.g. human age in [0, 120]).',
      'Used as anchors for Min-Max normalization: x_norm = (x - min) / (max - min).'
    ],
    practicalExamples: [
      'Age Validation: Min age = -1 indicates data entry error; Min age = 999 indicates a missing-value sentinel code.',
      'Sensor Saturation: If a temperature sensor has a maximum of exactly 100.00°C repeated 50 times, the sensor saturated and clipped readings.',
      'Feature Scaling: Min and max are required to map features into the range [0, 1] for neural network training.'
    ],
    commonMisconceptions: [
      {
        myth: 'The min and max in our training set will never be exceeded in production.',
        reality: 'Future test data will often produce values lower than min or higher than max. Normalization algorithms must be robust to out-of-bounds production values.'
      }
    ],
    conceptSummary: 'Min and max define the outer observed limits of a feature, serving as quick sanity checks and bounds for feature scaling.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Telecommunications Billing',
      scenario: 'A mobile carrier found a customer with call_duration_minutes = -120. A negative duration caused their automated billing model to issue a credit rather than a bill.',
      impact: 'A simple min-check audit caught the software bug before sending erroneous credits to 40,000 customers.'
    },
    keyTakeaways: [
      'Min and max establish boundary limits',
      'Essential for detecting negative values in strictly positive domains',
      'Core components of Min-Max normalization to [0, 1]'
    ],
    mathematics: {
      title: 'Min-Max Normalization (Feature Rescaling)',
      latex: 'x_{\\text{scaled}} = \\frac{x - \\min(x)}{\\max(x) - \\min(x)} \\in [0, 1]',
      plainText: 'x_scaled = (x - min) / (max - min)',
      explanation: 'Transforms any numerical feature onto a bounded scale from 0 to 1.',
      breakdown: [
        { id: 'min_val', symbol: 'min(x)', name: 'Lower Bound', description: 'Becomes 0.0 in rescaled space' },
        { id: 'max_val', symbol: 'max(x)', name: 'Upper Bound', description: 'Becomes 1.0 in rescaled space' }
      ]
    },
    pythonSnippet: {
      title: 'Boundary Checking and Min-Max Scaling',
      code: `import numpy as np

areas = np.array([950, 1200, 1500, 1850, 2400, 3200])

print("Minimum Area:", areas.min(), "sqft")
print("Maximum Area:", areas.max(), "sqft")

# Rescale to [0, 1]
scaled = (areas - areas.min()) / (areas.max() - areas.min())
print("Scaled to [0, 1]:\n", np.round(scaled, 2))
`,
      explanation: 'Using min() and max() normalizes features into the [0, 1] range required by many machine learning algorithms.',
      expectedOutput: 'Minimum Area: 950 sqft\nMaximum Area: 3200 sqft\nScaled to [0, 1]:\n [0.   0.11 0.24 0.4  0.64 1.  ]'
    },
    knowledgeCheck: [
      {
        id: 'q4-12-1',
        question: 'If a column representing percentage scores has min = 0.12 and max = 999.0, what does this immediately suggest to the data scientist?',
        options: [
          '999.0 is likely an error or a missing-value sentinel code that needs cleaning',
          'The data is perfectly normal',
          'The model will achieve 999% accuracy',
          'The dataset is too small'
        ],
        correctIndex: 0,
        explanation: 'In a percentage domain [0, 100], a value of 999.0 is physically impossible and indicates a data entry bug or missing sentinel code.'
      }
    ],
    revisionNotes: [
      'Min and max define empirical limits.',
      'Check for impossible numbers or sentinel values (-999, 9999).',
      'Used for [0, 1] Min-Max scaling.'
    ]
  },

  // 13. Range
  {
    id: 'les-4-13',
    moduleId: 'mod-4',
    title: '13. Range: The Simplest Measure of Spread',
    slug: 'range',
    estimatedMinutes: 13,
    simpleDefinition: 'The range is the simplest measure of statistical dispersion, calculated as the difference between the maximum and minimum values: Range = Max - Min.',
    whyItExists: 'Range provides an instant high-level sense of the total spread or span of a feature. It tells you the total width of the territory covered by your observations.',
    howItWorks: [
      'Identify maximum value: max(X).',
      'Identify minimum value: min(X).',
      'Subtract min from max: Range = Max - Min.',
      'Major limitation: Highly sensitive to single extreme outliers, as it depends exclusively on the two most extreme points in the dataset.'
    ],
    practicalExamples: [
      'Temperature Span: Daily high 85°F, daily low 55°F -> Daily range is 30°F.',
      'Salary Range: Entry-level $45,000, VP $220,000 -> Range is $175,000.',
      'Quality Control: If sheet metal thickness range exceeds 0.05mm, the rolling mill is misaligned.'
    ],
    commonMisconceptions: [
      {
        myth: 'Range tells you how data is distributed inside the boundaries.',
        reality: 'Range only tells you the distance between the two most extreme points. All 1,000 points could be clustered near the bottom, and range would still be identical.'
      }
    ],
    conceptSummary: 'The range measures the total span between maximum and minimum values, providing an immediate but outlier-vulnerable measure of dispersion.',
    interactiveExperienceType: 'eda-dashboard',
    realWorldExample: {
      domain: 'Meteorology',
      scenario: 'Desert climates and maritime island climates might share an identical average temperature of 25°C. However, the desert has a daily range of 35°C (scorching day to freezing night), while the island has a daily range of only 4°C.',
      impact: 'Relying solely on average temperature without range misrepresents desert climate severity.'
    },
    keyTakeaways: [
      'Range = Max - Min',
      'Measures total dispersion width',
      'Extremely vulnerable to single outliers because it uses only 2 data points'
    ],
    mathematics: {
      title: 'Mathematical Range Formula',
      latex: 'R = x_{(n)} - x_{(1)} = \\max(x) - \\min(x)',
      plainText: 'Range = max(x) - min(x)',
      explanation: 'Where x_(n) is the nth order statistic (maximum) and x_(1) is the 1st order statistic (minimum).',
      breakdown: [
        { id: 'R', symbol: 'R', name: 'Sample Range', description: 'Total span of the data' }
      ]
    },
    pythonSnippet: {
      title: 'Calculating Feature Range in Python',
      code: `import numpy as np

prices = np.array([245000, 385000, 128000, 520000, 875000])

data_range = np.ptp(prices) # ptp stands for "peak to peak"
print("Min:  $", prices.min())
print("Max:  $", prices.max())
print("Range:$", data_range)
`,
      explanation: 'NumPy np.ptp() ("peak to peak") computes max - min directly.',
      expectedOutput: 'Min:  $ 128000\nMax:  $ 875000\nRange:$ 747000'
    },
    knowledgeCheck: [
      {
        id: 'q4-13-1',
        question: 'Given the values [12, 18, 5, 42, 29], what is the range?',
        options: ['37', '42', '5', '30'],
        correctIndex: 0,
        explanation: 'Max is 42, Min is 5. Range = 42 - 5 = 37.'
      }
    ],
    revisionNotes: [
      'Range = Max - Min.',
      'Measures full spread.',
      'Distorted by outliers.'
    ]
  },

  // 14. Variance
  {
    id: 'les-4-14',
    moduleId: 'mod-4',
    title: '14. Variance: The Average Squared Deviation (σ²)',
    slug: 'variance-eda',
    estimatedMinutes: 15,
    simpleDefinition: 'Variance (denoted σ² for population, s² for sample) measures the average squared distance of data points from their arithmetic mean: s² = (1/(N-1)) Σ (x_i - x_bar)². It quantifies how much data values disperse around the center.',
    whyItExists: 'If you simply average the raw deviations (x_i - x_bar), the sum is ALWAYS zero because positive and negative deviations cancel out. Squaring each deviation eliminates the negative sign and heavily penalizes values far from the mean.',
    howItWorks: [
      'Calculate the mean: x_bar.',
      'Compute deviation for each point: (x_i - x_bar).',
      'Square each deviation: (x_i - x_bar)². Negative deviations become positive.',
      'Sum all squared deviations across the dataset.',
      'Divide by (N - 1) for sample variance (Bessel\'s correction for unbiased estimation).',
      'Units are squared (e.g. dollars², kg²), which can be difficult to interpret directly.'
    ],
    practicalExamples: [
      'Stock Market Volatility: A stable utility stock has low price variance; a volatile crypto token has enormous variance.',
      'Manufacturing Quality: Low variance in bolt diameter ensures consistent assembly on the factory line.',
      'Zero Variance Trap: A feature with variance = 0 has identical values in every row, meaning it carries ZERO predictive information and should be dropped.'
    ],
    commonMisconceptions: [
      {
        myth: 'Sample variance divides by N just like the mean.',
        reality: 'Sample variance divides by (N - 1), known as Bessel\'s Correction, to correct for the mathematical bias of using the sample mean instead of the true population mean.'
      }
    ],
    conceptSummary: 'Variance measures dispersion by averaging squared deviations from the mean. It is foundational to statistics, PCA, and loss functions.',
    interactiveExperienceType: 'distribution-explorer',
    realWorldExample: {
      domain: 'Feature Selection in Machine Learning',
      scenario: 'A credit scoring dataset has 300 features. The data scientist runs `VarianceThreshold(threshold=0.0)` during EDA and discovers that 14 columns have variance = 0 (e.g. `country_code` = "US" for all rows).',
      impact: 'Dropping zero-variance columns eliminates useless computation without losing any predictive information.'
    },
    keyTakeaways: [
      'Variance measures average squared deviation from the mean',
      'Sample variance uses N-1 in the denominator (Bessel\'s correction)',
      'A feature with variance = 0 is a constant and carries zero predictive power'
    ],
    mathematics: {
      title: 'Sample Variance Formula with Bessel\'s Correction',
      latex: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2',
      plainText: 's^2 = (1 / (n-1)) * sum((x_i - x_bar)^2)',
      explanation: 'Dividing by n-1 provides an unbiased estimator of true population variance sigma squared.',
      breakdown: [
        { id: 's2', symbol: 's²', name: 'Sample Variance', description: 'Unbiased estimator of population variance' },
        { id: 'nminus1', symbol: 'n - 1', name: 'Degrees of Freedom', description: 'Bessel\'s correction factor' }
      ]
    },
    pythonSnippet: {
      title: 'Calculating Variance in NumPy and Pandas',
      code: `import numpy as np
import pandas as pd

vals = [10, 12, 14, 16, 18]

# NumPy by default uses ddof=0 (population variance)
pop_var = np.var(vals)

# Pandas by default uses ddof=1 (sample variance, Bessel's correction)
sample_var = pd.Series(vals).var()

print("Mean:            ", np.mean(vals))
print("Population Var (N):  ", pop_var)
print("Sample Var (N-1):    ", sample_var)
`,
      explanation: 'Note the difference: NumPy defaults to N (population), while Pandas defaults to N-1 (sample). In machine learning, sample variance (N-1) is standard.',
      expectedOutput: 'Mean:             14.0\nPopulation Var (N):   8.0\nSample Var (N-1):     10.0'
    },
    knowledgeCheck: [
      {
        id: 'q4-14-1',
        question: 'Why does sample variance divide by (N - 1) instead of N?',
        options: [
          'Bessel\'s correction: dividing by N-1 corrects for the bias of estimating the mean from the sample',
          'Because the last observation is always corrupted',
          'To make the number smaller',
          'Because computers start counting at 0'
        ],
        correctIndex: 0,
        explanation: 'Bessel\'s correction (N - 1) makes the sample variance an unbiased estimator of the true population variance.'
      }
    ],
    revisionNotes: [
      'Variance = average squared deviation from mean.',
      'Sample formula divides by N - 1.',
      'Expressed in squared units.'
    ]
  },

  // 15. Standard deviation
  {
    id: 'les-4-15',
    moduleId: 'mod-4',
    title: '15. Standard Deviation: The Interpretable Spread (σ)',
    slug: 'standard-deviation',
    estimatedMinutes: 15,
    simpleDefinition: 'Standard deviation (denoted σ for population, s for sample) is the square root of the variance: s = √s². It measures how far data points typically spread from the mean, expressed in the EXACT SAME physical units as the original data.',
    whyItExists: 'While variance is mathematically convenient for calculus and linear algebra, its squared units (e.g. dollars² or kg²) make intuitive interpretation impossible. Standard deviation restores the original units, making it the most popular measure of spread.',
    howItWorks: [
      'Calculate sample variance: s².',
      'Take the square root: s = √s².',
      'The result is in the original units of measurement.',
      'Under a normal distribution, the Empirical 68-95-99.7 Rule applies: ~68% of data falls within ±1σ of the mean, ~95% within ±2σ, and ~99.7% within ±3σ.',
      'Forms the foundation of Standard Z-score Normalization: z = (x - μ) / σ.'
    ],
    practicalExamples: [
      'Exam Scores: Mean = 75, Standard Deviation = 10 points. ~68% of students scored between 65 and 85.',
      'House Prices: Mean = $350k, Standard Deviation = $50k. ~95% of homes fall between $250k and $450k.',
      'Standardization in Scikit-Learn: `StandardScaler` shifts data to mean=0 and scales it to standard deviation=1.'
    ],
    commonMisconceptions: [
      {
        myth: 'The 68-95-99.7% rule applies to all datasets.',
        reality: 'This rule STRICTLY applies to normal (bell-shaped) distributions! If data is heavily skewed or bimodal, different proportions apply (bounded by Chebyshev\'s inequality).'
      }
    ],
    conceptSummary: 'Standard deviation is the square root of variance, measuring average dispersion in original units and enabling Z-score standardization.',
    interactiveExperienceType: 'distribution-explorer',
    realWorldExample: {
      domain: 'Manufacturing Quality Control (Six Sigma)',
      scenario: 'Motorola pioneered Six Sigma in electronics manufacturing. "6-Sigma" quality requires that process defects occur beyond 6 standard deviations from the mean (fewer than 3.4 defects per million parts).',
      impact: 'Saved billions of dollars by driving industrial manufacturing defect rates down to near-zero.'
    },
    keyTakeaways: [
      'Standard Deviation = √Variance',
      'Expressed in the exact same units as the original data',
      '68-95-99.7 Rule applies to normal distributions',
      'Used for Z-score feature standardization: z = (x - μ) / σ'
    ],
    mathematics: {
      title: 'Sample Standard Deviation & Z-Score Formula',
      latex: 's = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2}, \\quad z_i = \\frac{x_i - \\bar{x}}{s}',
      plainText: 's = sqrt(variance). z = (x - mean) / s measures how many standard deviations x is from the mean.',
      explanation: 'A Z-score transforms any value into standard deviations away from the mean.',
      breakdown: [
        { id: 's', symbol: 's', name: 'Sample Standard Deviation', description: 'Root mean squared deviation' },
        { id: 'z', symbol: 'z', name: 'Standard Z-Score', description: 'Dimensionless score indicating distance from mean in units of sigma' }
      ]
    },
    pythonSnippet: {
      title: 'Computing Standard Deviation and Standardizing Features',
      code: `import numpy as np

# House prices in $000s
prices = np.array([245, 385, 128, 520, 215, 875, 310])

mean = np.mean(prices)
std = np.std(prices, ddof=1) # sample std

print(f"Mean Price:  \${mean:.1f}k")
print(f"Std Dev:     \${std:.1f}k")

# Compute Z-scores: z = (x - mean) / std
z_scores = (prices - mean) / std
print("\nZ-scores for each house:")
print(np.round(z_scores, 2))
print("Notice: House with $875k has Z-score > 2.0 (more than 2 standard deviations above mean!)")
`,
      explanation: 'Computing standard deviation allows you to calculate Z-scores, standardizing features to mean=0 and std=1 for machine learning algorithms.',
      expectedOutput: 'Mean Price:  $382.6k\nStd Dev:     $246.5k\n\nZ-scores for each house:\n[-0.56  0.01 -1.03  0.56 -0.68  2.   -0.29]\nNotice: House with $875k has Z-score > 2.0 (more than 2 standard deviations above mean!)'
    },
    knowledgeCheck: [
      {
        id: 'q4-15-1',
        question: 'Under a standard normal distribution, approximately what percentage of observations fall within ±1 standard deviation of the mean?',
        options: ['68%', '95%', '99.7%', '50%'],
        correctIndex: 0,
        explanation: 'According to the Empirical Rule, approximately 68% of data falls within ±1σ of the mean in a normal distribution.'
      }
    ],
    revisionNotes: [
      'Standard Deviation = √Variance.',
      'In original physical units.',
      '68% within ±1σ, 95% within ±2σ in normal distributions.',
      'Used for Z-score standardization.'
    ]
  },

  // 16. Data distribution
  {
    id: 'les-4-16',
    moduleId: 'mod-4',
    title: '16. Data Distribution: Visualizing Shape & Spread',
    slug: 'data-distribution',
    estimatedMinutes: 15,
    simpleDefinition: 'A data distribution describes the frequency pattern of how often different values of a variable occur across its possible range, illustrating the underlying probability architecture of the data.',
    whyItExists: 'Many classic machine learning algorithms (Linear Regression, Linear Discriminant Analysis, Naive Bayes) mathematically assume that features follow a bell-shaped Normal distribution. Visualizing distributions during EDA verifies whether these assumptions hold or whether transformations are needed.',
    howItWorks: [
      'Binned Frequency Histograms: Group continuous values into discrete bins and count frequencies.',
      'Kernel Density Estimation (KDE): Fit a smooth non-parametric probability density curve over the histogram.',
      'Examine common archetypes: Normal (bell), Uniform (flat), Exponential (decaying), Bimodal (two humps).',
      'Identify anomalies: gaps, isolated peaks, and heavy long tails.'
    ],
    practicalExamples: [
      'Human Height: Follows a classic symmetric bell curve (Normal distribution).',
      'Website Visit Inter-Arrival Times: Follows an Exponential distribution (many quick visits, rare long gaps).',
      'Customer Age in Mixed Bar/Arcade: Follows a Bimodal distribution with peaks at age 10 (kids birthday parties) and age 35 (parents).'
    ],
    commonMisconceptions: [
      {
        myth: 'All real-world data is normally distributed.',
        reality: 'Most real-world business and economic data (incomes, house prices, website clicks) is heavily skewed, not normally distributed.'
      }
    ],
    conceptSummary: 'Data distributions illustrate the frequency architecture of features. Visualizing them via histograms and KDE curves guides feature transformation.',
    interactiveExperienceType: 'distribution-explorer',
    realWorldExample: {
      domain: 'Retail Demand Forecasting',
      scenario: 'A retail chain tried predicting daily product sales assuming a normal distribution. For slow-moving luxury watches, daily sales were 0, 0, 1, 0, 0. A normal distribution predicted negative sales of -0.4 watches.',
      impact: 'Visualizing the distribution in EDA prompted a switch to a zero-inflated Poisson distribution, saving millions in excess inventory.'
    },
    keyTakeaways: [
      'Distributions reveal probability architecture and frequency patterns',
      'Visualized using histograms, KDE curves, and box plots',
      'Bimodal distributions indicate the presence of two distinct sub-populations'
    ],
    mathematics: {
      title: 'The Gaussian (Normal) Distribution PDF',
      latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)',
      plainText: 'f(x) = (1 / (sigma * sqrt(2*pi))) * exp(-0.5 * ((x - mu)/sigma)^2)',
      explanation: 'Symmetric bell-curve completely defined by its mean mu and variance sigma squared.',
      breakdown: [
        { id: 'fx', symbol: 'f(x)', name: 'Probability Density', description: 'Height of the curve at point x' }
      ]
    },
    pythonSnippet: {
      title: 'Plotting Histograms and KDE in Seaborn',
      code: `import seaborn as sns
import numpy as np

# Generate 1000 normal random numbers
np.random.seed(42)
normal_data = np.random.normal(loc=50, scale=10, size=1000)

# Check distribution properties
print("Sample Mean:  ", round(np.mean(normal_data), 2))
print("Sample Std:   ", round(np.std(normal_data), 2))
print("Values roughly 68% between 40 and 60, 95% between 30 and 70.")
`,
      explanation: 'Seaborn sns.histplot(data, kde=True) is the standard method for visualizing empirical distributions during EDA.',
      expectedOutput: 'Sample Mean:   50.19\nSample Std:    9.79\nValues roughly 68% between 40 and 60, 95% between 30 and 70.'
    },
    knowledgeCheck: [
      {
        id: 'q4-16-1',
        question: 'If a histogram displays two distinct tall peaks separated by a valley, what kind of distribution is this?',
        options: ['Bimodal distribution', 'Normal distribution', 'Uniform distribution', 'Exponential distribution'],
        correctIndex: 0,
        explanation: 'A distribution with two distinct peaks is bimodal, often revealing that two distinct sub-groups exist in the data.'
      }
    ],
    revisionNotes: [
      'Distributions show frequency patterns across ranges.',
      'Common types: Normal (bell), Skewed (tailed), Uniform (flat), Bimodal (two peaks).',
      'Visualized with histograms and KDE plots.'
    ]
  },

  // 17. Skewness
  {
    id: 'les-4-17',
    moduleId: 'mod-4',
    title: '17. Skewness: Asymmetry and Long Tails',
    slug: 'skewness',
    estimatedMinutes: 15,
    simpleDefinition: 'Skewness is a measure of the asymmetry of a probability distribution around its mean. A distribution can be symmetric (skew ≈ 0), right-skewed/positive (tail stretches right), or left-skewed/negative (tail stretches left).',
    whyItExists: 'Severe skewness degrades the performance of linear models and distance-based algorithms because extreme values in the tail drag the mean and inflate variance. Detecting skewness in EDA tells the engineer to apply non-linear transformations (e.g. log(x) or Box-Cox) to normalize the feature.',
    howItWorks: [
      'Symmetric (Skew ≈ 0): Left and right halves balance; Mean ≈ Median ≈ Mode.',
      'Right-Skewed (Positive Skew > 0): Long tail extends toward higher positive values; Mean > Median > Mode. (Common in income, prices, web traffic).',
      'Left-Skewed (Negative Skew < 0): Long tail extends toward lower negative values; Mean < Median < Mode. (Common in retirement age, easy test scores).',
      'Rule of thumb: |Skewness| > 1.0 indicates a highly skewed distribution requiring transformation.'
    ],
    practicalExamples: [
      'House Prices: Most homes sell for $200k-$400k, but a few luxury mansions sell for $5M+. The long right tail makes prices right-skewed (Mean > Median).',
      'Human Mortality: Most deaths occur at older ages (70-90), with a long tail extending toward childhood and infancy (Left-skewed).',
      'Log Transformation: Applying log(price) compresses the long right tail, turning a heavily skewed price curve into a symmetrical bell curve.'
    ],
    commonMisconceptions: [
      {
        myth: '"Right-skewed" means most of the data is on the right.',
        reality: 'The name refers to where the TAIL stretches! In right-skewed data, most values are clustered on the LEFT, and the long tail stretches to the RIGHT.'
      }
    ],
    conceptSummary: 'Skewness measures distributional asymmetry. Right-skewed data has a long right tail (Mean > Median); log transformations normalize skewed features.',
    interactiveExperienceType: 'distribution-explorer',
    realWorldExample: {
      domain: 'Fintech Credit Lending',
      scenario: 'Applicant income was heavily right-skewed with skewness = +4.8. When fed directly into a linear regression model, high-income outliers dominated gradient updates, ruining predictions for 95% of applicants.',
      impact: 'Applying a log-transform log(income) reduced skewness to +0.2, boosting model R² from 0.41 to 0.73.'
    },
    keyTakeaways: [
      'Positive / Right-Skew: long tail to the right, Mean > Median',
      'Negative / Left-Skew: long tail to the left, Mean < Median',
      'Fix severe skewness (|skew| > 1) with log-transforms: log1p(x) = log(x + 1)'
    ],
    mathematics: {
      title: 'Pearson\'s Moment Coefficient of Skewness',
      latex: '\\tilde{\\mu}_3 = \\frac{\\mathbb{E}[(X - \\mu)^3]}{\\sigma^3} = \\frac{\\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^3}{\\left( \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 \\right)^{3/2}}',
      plainText: 'Skewness is the normalized third standardized moment: E[(X - mu)^3] / sigma^3.',
      explanation: 'Cubing deviations preserves their signs: large positive deviations create positive skew, while large negative deviations create negative skew.',
      breakdown: [
        { id: 'skew_val', symbol: 'gamma_1', name: 'Skewness Coefficient', description: '0 = symmetric, >0 = right-skewed, <0 = left-skewed' }
      ]
    },
    pythonSnippet: {
      title: 'Measuring and Correcting Skewness in Pandas',
      code: `import numpy as np
import pandas as pd

# Generate heavily right-skewed log-normal data (like house prices)
np.random.seed(42)
raw_prices = np.random.lognormal(mean=11.5, sigma=0.8, size=1000)

s = pd.Series(raw_prices)
print("Raw Skewness:        ", round(s.skew(), 2), "(Heavily Right-Skewed!)")

# Apply log transformation: log(x)
log_prices = np.log(s)
print("Log-Transformed Skew:", round(log_prices.skew(), 2), "(Symmetric & Normal!)")
`,
      explanation: 'Applying np.log() compresses the right tail, bringing skewness from +3.16 down to +0.02 (near-perfect normal symmetry).',
      expectedOutput: 'Raw Skewness:         3.16 (Heavily Right-Skewed!)\nLog-Transformed Skew: 0.02 (Symmetric & Normal!)'
    },
    knowledgeCheck: [
      {
        id: 'q4-17-1',
        question: 'In a heavily right-skewed distribution of home prices, what is the typical relationship between the mean and the median?',
        options: [
          'Mean is greater than Median (Mean > Median)',
          'Median is greater than Mean (Median > Mean)',
          'Mean equals Median',
          'Mean is always zero'
        ],
        correctIndex: 0,
        explanation: 'In right-skewed data, extreme high values in the right tail pull the mean upward, resulting in Mean > Median.'
      }
    ],
    revisionNotes: [
      'Skewness = asymmetry of distribution.',
      'Right-skewed (positive): tail stretches right; Mean > Median.',
      'Left-skewed (negative): tail stretches left; Mean < Median.',
      'Correct right-skew with log transformation.'
    ]
  },

  // 18. Outliers
  {
    id: 'les-4-18',
    moduleId: 'mod-4',
    title: '18. Outliers: Detection with IQR and Z-Score',
    slug: 'outliers',
    estimatedMinutes: 16,
    simpleDefinition: 'An outlier is an observation that lies an abnormal distance away from other values in a random sample from a population. Outliers can stem from measurement errors, data entry bugs, or genuine rare events.',
    whyItExists: 'Outliers exert immense leverage on machine learning models. In algorithms that minimize squared errors (MSE), a single outlier with error 100 contributes 10,000 to the loss, forcing the model to bend its decision boundary away from the true population pattern to accommodate one bad sample.',
    howItWorks: [
      'IQR Method (Non-parametric / Boxplot):',
      'Calculate Q1 (25th percentile) and Q3 (75th percentile).',
      'Compute Interquartile Range: IQR = Q3 - Q1.',
      'Establish Fences: Lower Fence = Q1 - 1.5×IQR, Upper Fence = Q3 + 1.5×IQR.',
      'Any point outside the fences is flagged as an outlier.',
      'Z-score Method (Parametric): Flag any point with |Z| > 3.0 (beyond 3 standard deviations from mean).',
      'Handling Options: Drop (if data entry error), Cap/Winsorize (clamp to 1st/99th percentile), or Transform (log).'
    ],
    practicalExamples: [
      'Typo Entry: An applicant enters age = 300 instead of 30.',
      'Financial Fraud: A customer who normally spends $25 at lunch suddenly makes a $95,000 diamond purchase.',
      'Sensor Glitch: A temperature probe loses connection and reports -999.0°C.'
    ],
    commonMisconceptions: [
      {
        myth: 'You must always delete every outlier immediately.',
        reality: 'Never delete outliers blindly! In fraud detection, rare disease diagnosis, and cybersecurity, the OUTLIERS ARE THE ACTUAL TARGET you are trying to detect.'
      }
    ],
    conceptSummary: 'Outliers are extreme deviations. The IQR rule (Q1/Q3 ± 1.5×IQR) and Z-score (|z| > 3) detect them for cleaning, capping, or isolation.',
    interactiveExperienceType: 'outlier-detector',
    realWorldExample: {
      domain: 'Credit Card Fraud Prevention',
      scenario: 'A machine learning engineer cleaned a financial dataset by blindly removing all transactions above $5,000 as "outliers". The resulting model had near-zero training error but failed to catch 100% of large-dollar bank heists in production.',
      impact: 'Demonstrated to the bank that outliers were not noise, but the primary business signal.'
    },
    keyTakeaways: [
      'IQR rule: Outlier if x < Q1 - 1.5×IQR or x > Q3 + 1.5×IQR',
      'Z-score rule: Outlier if |z| > 3.0 (for normal distributions)',
      'Never delete outliers automatically; distinguish errors from genuine rare events',
      'Winsorization (clipping to fences) preserves sample size without outlier distortion'
    ],
    mathematics: {
      title: 'Tukey\'s IQR Outlier Detection Rule',
      latex: '\\text{IQR} = Q_3 - Q_1, \\quad \\text{Fences: } \\left[ Q_1 - 1.5 \\times \\text{IQR}, \\; Q_3 + 1.5 \\times \\text{IQR} \\right]',
      plainText: 'Lower Fence = Q1 - 1.5*IQR, Upper Fence = Q3 + 1.5*IQR. Points outside are outliers.',
      explanation: 'Under a Gaussian distribution, the 1.5×IQR fence naturally captures ~99.3% of data, flagging only the extreme 0.7% as potential anomalies.',
      breakdown: [
        { id: 'iqr', symbol: 'IQR', name: 'Interquartile Range', description: 'Width of the middle 50% of the distribution' },
        { id: 'fence', symbol: '1.5 * IQR', name: 'Tukey Multiplier', description: 'Standard threshold boundary' }
      ]
    },
    pythonSnippet: {
      title: 'Detecting Outliers Using the IQR Method in Pandas',
      code: `import numpy as np
import pandas as pd

# Dataset with one extreme outlier: $9,500,000
data = pd.Series([210000, 235000, 220000, 245000, 228000, 240000, 9500000])

q1 = data.quantile(0.25)
q3 = data.quantile(0.75)
iqr = q3 - q1

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr

outliers = data[(data < lower_fence) | (data > upper_fence)]

print("Q1 (25%):    ", q1)
print("Q3 (75%):    ", q3)
print("IQR:         ", iqr)
print("Upper Fence: ", upper_fence)
print("Flagged Outliers:\n", outliers)
`,
      explanation: 'The IQR method flags 9,500,000 because it far exceeds the upper fence, protecting downstream models from distorted weights.',
      expectedOutput: 'Q1 (25%):     224000.0\nQ3 (75%):     242500.0\nIQR:          18500.0\nUpper Fence:  270250.0\nFlagged Outliers:\n 6    9500000\ndtype: int64'
    },
    knowledgeCheck: [
      {
        id: 'q4-18-1',
        question: 'Under the IQR method, if Q1 = 100 and Q3 = 200, what is the Upper Fence beyond which a value is considered an outlier?',
        options: ['350', '250', '300', '400'],
        correctIndex: 0,
        explanation: 'IQR = Q3 - Q1 = 200 - 100 = 100. Upper Fence = Q3 + 1.5×IQR = 200 + 1.5×100 = 350.'
      }
    ],
    revisionNotes: [
      'IQR = Q3 - Q1 (middle 50%).',
      'Outlier Fences: Q1 - 1.5×IQR and Q3 + 1.5×IQR.',
      'Z-score rule: |z| > 3.0.',
      'Decide whether to drop, cap (winsorize), or keep as signal.'
    ]
  },

  // 19. Missing values
  {
    id: 'les-4-19',
    moduleId: 'mod-4',
    title: '19. Missing Values: Detection, Mechanisms & Imputation',
    slug: 'missing-values',
    estimatedMinutes: 16,
    simpleDefinition: 'Missing values are data cells where no observation was stored, represented in software as NaN (Not a Number), None, or null. They occur when sensors fail, surveys skip questions, or database joins produce unmapped rows.',
    whyItExists: 'Scikit-learn algorithms and linear algebra matrices CANNOT process NaN values; passing NaNs causes runtime crashes. Handling missing values systematically during EDA prevents bias and data loss.',
    howItWorks: [
      'Step 1 (Detect): Count nulls and compute percentages: `df.isnull().sum()`.',
      'Step 2 (Understand Mechanism):',
      '  - MCAR (Missing Completely at Random): purely accidental (e.g. coin flip sensor drop). Safe to drop or impute.',
      '  - MAR (Missing at Random): missingness depends on other observed features (e.g. younger people less likely to report income).',
      '  - MNAR (Missing Not at Random): missingness depends on the unobserved value itself (e.g. people with depression skip mental health survey questions). Dropping causes heavy bias!',
      'Step 3 (Remediation):',
      '  - Drop rows: only if < 3% of data is missing and mechanism is MCAR.',
      '  - Simple Imputation: Mean (numeric, symmetric), Median (numeric, skewed), Mode (categorical).',
      '  - Advanced Imputation: KNN Imputer, Iterative MICE (Multivariate Imputation by Chained Equations).',
      '  - Add Missing Indicator: Create a binary flag column `is_missing` so the model knows the value was imputed.'
    ],
    practicalExamples: [
      'Survey Data: An optional question on "Household Income" has 40% missing data. Dropping all missing rows would discard nearly half the dataset!',
      'Hospital Patient Log: Blood oxygen reading is null because the nurse judged the patient was clearly healthy; the missingness itself contains clinical meaning.',
      'House Features: Missing `garage_sqft` simply means the house has no garage; imputing with 0 is domain-correct.'
    ],
    commonMisconceptions: [
      {
        myth: 'Dropping all rows with missing values (`df.dropna()`) is always safe.',
        reality: 'If 10 columns each have 5% missing values at random, dropping rows can delete over 40% of your entire dataset, introducing severe sampling bias.'
      }
    ],
    conceptSummary: 'Missing values must be detected and understood (MCAR, MAR, MNAR) before dropping or imputing with mean, median, mode, or KNN.',
    interactiveExperienceType: 'missing-value-explorer',
    realWorldExample: {
      domain: 'Clinical Trial Survival Analysis',
      scenario: 'Patients who experienced severe drug side effects dropped out of a trial early, leaving their final health scores missing (MNAR). Researchers who simply dropped missing patients concluded the drug was 100% safe.',
      impact: 'Understanding missing data mechanisms prevented the FDA approval of a dangerous pharmaceutical.'
    },
    keyTakeaways: [
      'Detect with `df.isnull().sum()` and percentage tables',
      'Three mechanisms: MCAR (accidental), MAR (correlated with features), MNAR (systematic)',
      'Impute continuous with median, categorical with mode',
      'Always consider creating a companion `_is_missing` binary indicator feature'
    ],
    mathematics: {
      title: 'Rubin\'s Missing Data Mechanisms',
      latex: 'P(M \\mid Y_{obs}, Y_{mis}) = \\begin{cases} P(M) & \\text{MCAR} \\\\[4pt] P(M \\mid Y_{obs}) & \\text{MAR} \\\\[4pt] P(M \\mid Y_{obs}, Y_{mis}) & \\text{MNAR} \\end{cases}',
      plainText: 'MCAR: independent of all data. MAR: depends on observed data. MNAR: depends on the missing value itself.',
      explanation: 'Formulated by Donald Rubin in 1976 to govern valid statistical inference on incomplete data.',
      breakdown: [
        { id: 'M', symbol: 'M', name: 'Missingness Indicator', description: 'Binary indicator of whether a cell is null' }
      ]
    },
    pythonSnippet: {
      title: 'Detecting and Imputing Missing Values in Pandas',
      code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'age': [25, np.nan, 30, 45, np.nan],
    'city': ['NY', 'SF', np.nan, 'NY', 'SF']
})

print("--- MISSING VALUE COUNTS ---")
print(df.isnull().sum())

# Impute numeric with median
df['age_imputed'] = df['age'].fillna(df['age'].median())

# Impute categorical with mode
df['city_imputed'] = df['city'].fillna(df['city'].mode()[0])

print("\n--- AFTER IMPUTATION ---")
print(df[['age_imputed', 'city_imputed']])
`,
      explanation: 'fillna() with median and mode safely handles missing values without dropping rows.',
      expectedOutput: '--- MISSING VALUE COUNTS ---\nage     2\ncity    1\ndtype: int64\n\n--- AFTER IMPUTATION ---\n   age_imputed city_imputed\n0         25.0           NY\n1         30.0           SF\n2         30.0           NY\n3         45.0           NY\n4         30.0           SF'
    },
    knowledgeCheck: [
      {
        id: 'q4-19-1',
        question: 'What is the recommended imputation strategy for a skewed numerical feature containing missing values?',
        options: [
          'Median imputation',
          'Mean imputation',
          'Replace with zero',
          'Replace with 99999'
        ],
        correctIndex: 0,
        explanation: 'Because skewed data pulls the mean, the median is the preferred, robust choice for imputing missing numerical values.'
      }
    ],
    revisionNotes: [
      'Detect with `df.isnull().sum()`.',
      'MCAR: purely random.',
      'MAR: correlated with observed features.',
      'MNAR: correlated with the missing value itself.',
      'Impute skewed numeric with median, categorical with mode.'
    ]
  },

  // 20. Correlation
  {
    id: 'les-4-20',
    moduleId: 'mod-4',
    title: '20. Correlation: Pearson, Spearman & Linear Strength',
    slug: 'correlation',
    estimatedMinutes: 16,
    simpleDefinition: 'Correlation is a bivariate statistical metric that quantifies the strength and direction of a linear relationship between two continuous variables, bounded strictly between -1.0 and +1.0.',
    whyItExists: 'Machine learning engineers need to know which features are strongly predictive of the target variable (high correlation with y) and whether features are duplicating each other (multicollinearity: high correlation between x_1 and x_2).',
    howItWorks: [
      'Pearson correlation coefficient r measures linear association:',
      '  - r = +1.0: Perfect positive linear correlation (as X rises, Y rises in a straight line).',
      '  - r = 0.0: Zero linear correlation (no linear relationship).',
      '  - r = -1.0: Perfect negative linear correlation (as X rises, Y falls in a straight line).',
      'Spearman rank correlation r_s measures monotonic association (works for non-linear curves and ranked ordinal data).',
      'Multicollinearity check: Features with |r| > 0.85 carry duplicate information and should be pruned or combined via PCA.'
    ],
    practicalExamples: [
      'House Area vs Price: r = +0.88 (strong positive correlation — larger houses cost more).',
      'Car Mileage vs Price: r = -0.76 (strong negative correlation — higher mileage cars sell for less).',
      'Shoe Size vs IQ: r = +0.02 (zero correlation — no linear relationship).'
    ],
    commonMisconceptions: [
      {
        myth: 'If Pearson r = 0, the two variables have no relationship at all.',
        reality: 'Pearson r ONLY measures LINEAR relationships! If y = x², the relationship is deterministic, yet Pearson r is 0.0! Always visualize with scatter plots.'
      }
    ],
    conceptSummary: 'Correlation measures linear association between -1.0 and +1.0. Pearson detects linear trends; Spearman detects monotonic curves.',
    interactiveExperienceType: 'correlation-explorer',
    realWorldExample: {
      domain: 'Algorithmic Stock Trading',
      scenario: 'A hedge fund quant discovers that two commodity stocks have a 0.96 correlation. When short-term geopolitical news causes the correlation to diverge momentarily, an automated pairs-trading algorithm buys the undervalued stock and shorts the overvalued one.',
      impact: 'Statistically captures arbitrage alpha while remaining market-neutral.'
    },
    keyTakeaways: [
      'Pearson r is bounded between -1.0 and +1.0',
      'r = 0 does NOT mean "no relationship" — it only means no LINEAR relationship',
      'Detect multicollinearity using correlation heatmaps: `sns.heatmap(df.corr())`'
    ],
    mathematics: {
      title: 'Pearson Product-Moment Correlation Coefficient',
      latex: 'r_{xy} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}} = \\frac{\\text{Cov}(x, y)}{s_x s_y}',
      plainText: 'r = Cov(x, y) / (s_x * s_y). Normalized covariance divided by product of standard deviations.',
      explanation: 'Dividing covariance by standard deviations normalizes the coefficient to strictly [-1.0, +1.0], independent of measurement units.',
      breakdown: [
        { id: 'cov', symbol: 'Cov(x, y)', name: 'Covariance', description: 'Direction of joint variation' },
        { id: 'sxsy', symbol: 's_x * s_y', name: 'Product of Deviations', description: 'Normalizing denominator' }
      ]
    },
    pythonSnippet: {
      title: 'Generating a Correlation Matrix in Pandas',
      code: `import pandas as pd

df = pd.DataFrame({
    'area': [1200, 1850, 950, 2400, 3200],
    'bedrooms': [2, 3, 1, 4, 5],
    'price': [245000, 385000, 128000, 520000, 875000]
})

corr_matrix = df.corr()
print("--- CORRELATION MATRIX ---")
print(corr_matrix.round(2))
print("\nNotice: Area and Price have strong correlation: r = +0.99")
`,
      explanation: 'df.corr() computes pairwise Pearson correlation across all numerical features.',
      expectedOutput: '--- CORRELATION MATRIX ---\n          area  bedrooms  price\narea      1.00      0.97   0.99\nbedrooms  0.97      1.00   0.95\nprice     0.99      0.95   1.00\n\nNotice: Area and Price have strong correlation: r = +0.99'
    },
    knowledgeCheck: [
      {
        id: 'q4-20-1',
        question: 'If two features X and Y have a Pearson correlation coefficient of r = -0.92, what does this indicate?',
        options: [
          'A strong negative linear relationship: as X increases, Y consistently decreases',
          'No relationship exists',
          'A calculation error occurred because r cannot be negative',
          'X causes Y to decrease'
        ],
        correctIndex: 0,
        explanation: 'A correlation of -0.92 is very close to -1.0, representing a strong inverse linear relationship.'
      }
    ],
    revisionNotes: [
      'Bounded between -1.0 (inverse) and +1.0 (positive).',
      'r = 0 means no linear relationship (could still be non-linear!).',
      'Multicollinearity (|r| > 0.85) harms linear models.'
    ]
  },

  // 21. Relationships between variables
  {
    id: 'les-4-21',
    moduleId: 'mod-4',
    title: '21. Relationships Between Variables: Correlation vs. Causation',
    slug: 'relationships-between-variables',
    estimatedMinutes: 16,
    simpleDefinition: 'Analyzing relationships between variables uncovers how features interact. The most vital rule in statistical learning is: Correlation does NOT imply Causation. Two variables can correlate strongly due to coincidence or a shared hidden confounding variable.',
    whyItExists: 'Machine learning models identify statistical correlations, not physical causal mechanisms. If you deploy a model in production expecting that manipulating feature X will automatically change target Y, the model will fail if the relationship is merely correlational or confounded.',
    howItWorks: [
      'Direct Causation: X directly causes Y (e.g. atmospheric pressure drops -> barometer drops).',
      'Reverse Causation: Y actually causes X (e.g. hospital patients with high medication dosages have higher mortality, because sicker patients receive higher doses).',
      'Confounding Variable (Spurious Correlation): A third variable Z causes both X and Y simultaneously.',
      'Bivariate Exploration Techniques: Scatter plots (numeric vs numeric), box plots (numeric vs categorical), cross-tabulations (categorical vs categorical).'
    ],
    practicalExamples: [
      'Ice Cream vs Drownings: Ice cream sales strongly correlate with pool drownings. Ice cream does NOT cause drowning! The confounding variable is Summer Temperature (warm weather increases both).',
      'Shoe Size vs Reading Ability: In school children, shoe size correlates with reading grade. The confounder is Age (older kids have bigger feet and read better).',
      'Hospital Bed Length of Stay: Patients prescribed a specialty drug have longer hospital stays. The drug didn\'t cause the long stay; severe disease progression (confounder) caused both.'
    ],
    commonMisconceptions: [
      {
        myth: 'A machine learning model with 99% accuracy has learned the true causal laws of the system.',
        reality: 'ML models only learn surface correlations. If external conditions alter the confounding relationship, the model\'s predictions completely break down.'
      }
    ],
    conceptSummary: 'Correlation measures association; causation requires controlled experiments. Beware of confounding variables and spurious correlations during EDA.',
    interactiveExperienceType: 'correlation-explorer',
    realWorldExample: {
      domain: 'Public Health & Nutrition Policy',
      scenario: 'Observational studies showed that people who take Vitamin E supplements have 40% lower cardiovascular disease (strong correlation). When a randomized controlled trial was conducted with 10,000 patients, Vitamin E had zero protective effect. The confounder was that people who buy supplements also exercise more and eat healthier diets.',
      impact: 'Prevented millions of dollars from being wasted on ineffective national health recommendations.'
    },
    keyTakeaways: [
      'Correlation does NOT imply Causation',
      'Spurious correlation is often created by a hidden third variable (confounder)',
      'Causation can only be proven via Randomized Controlled Trials (A/B testing) or causal inference frameworks (DAGs, do-calculus)'
    ],
    mathematics: {
      title: 'Confounding Bias in Joint Probability',
      latex: 'P(Y \\mid X) \\ne P(Y \\mid \\text{do}(X)), \\quad P(Y \\mid X) = \\sum_Z P(Y \\mid X, Z) P(Z \\mid X)',
      plainText: 'Observational conditional probability P(Y|X) differs from causal intervention P(Y|do(X)) due to confounder Z.',
      explanation: 'Judea Pearl\'s do-calculus mathematically distinguishes passive observation P(Y|X) from active experimental intervention P(Y|do(X)).',
      breakdown: [
        { id: 'dox', symbol: 'do(X)', name: 'Causal Intervention', description: 'Actively manipulating feature X rather than passively observing it' }
      ]
    },
    pythonSnippet: {
      title: 'Bivariate Pairplot Analysis in Seaborn',
      code: `import seaborn as sns
import pandas as pd

# Sample dataset
df = pd.DataFrame({
    'temp_celsius': [15, 22, 28, 35, 18, 31],
    'ice_cream_sales': [120, 250, 480, 710, 190, 590],
    'swim_accidents': [1, 3, 7, 12, 2, 9]
})

# Both correlate with each other, but temp is the true common cause
print("Correlation Matrix:")
print(df.corr().round(2))
print("\nAccidents correlate with Ice Cream (r = 0.99), but temperature drives both!")
`,
      explanation: 'Computing bivariate correlations shows how spurious associations arise from shared underlying drivers.',
      expectedOutput: 'Correlation Matrix:\n                 temp_celsius  ice_cream_sales  swim_accidents\ntemp_celsius             1.00             0.99            0.98\nice_cream_sales          0.99             1.00            0.99\nswim_accidents           0.98             0.99            1.00\n\nAccidents correlate with Ice Cream (r = 0.99), but temperature drives both!'
    },
    knowledgeCheck: [
      {
        id: 'q4-21-1',
        question: 'Why do ice cream sales correlate strongly with swimming pool drowning accidents?',
        options: [
          'A confounding variable (summer temperature) causes both to increase simultaneously',
          'Ice cream cramps cause drowning',
          'Drowning accidents cause people to buy comforting ice cream',
          'The data was fabricated'
        ],
        correctIndex: 0,
        explanation: 'Summer heat is the confounding variable: warm weather increases both ice cream consumption and swimming frequency.'
      }
    ],
    revisionNotes: [
      'Correlation ≠ Causation.',
      'Confounders create spurious correlations.',
      'Causation requires randomized experiments or causal DAGs.'
    ]
  }
];

export const MODULE_04_COMPREHENSIVE_QUIZ = [
  {
    id: 'm4-final-1',
    question: 'What is the primary objective of Exploratory Data Analysis (EDA)?',
    options: [
      'To understand data structure, detect anomalies, check assumptions, and guide feature engineering before modeling',
      'To build a neural network with 100% accuracy',
      'To delete all negative numbers from the database',
      'To encrypt dataset records for storage'
    ],
    correctIndex: 0,
    explanation: 'EDA is the investigative phase where data scientists inspect distributions, patterns, and anomalies to inform modeling.'
  },
  {
    id: 'm4-final-2',
    question: 'Why is the median preferred over the mean for reporting household income or home prices?',
    options: [
      'Because extreme high-value outliers pull the mean upward, while the median remains robust and reflects the typical experience',
      'Because the median is always an integer',
      'Because calculating the mean requires GPU acceleration',
      'Because the median is always higher than the mean'
    ],
    correctIndex: 0,
    explanation: 'The median represents the 50th percentile rank and is unaffected by extreme outliers in the tail.'
  },
  {
    id: 'm4-final-3',
    question: 'Under the standard Tukey IQR method, what are the Lower and Upper Fences for outlier detection?',
    options: [
      'Lower: Q1 - 1.5×IQR, Upper: Q3 + 1.5×IQR',
      'Lower: Mean - 2×Std, Upper: Mean + 2×Std',
      'Lower: Min - 10, Upper: Max + 10',
      'Lower: 0, Upper: 100'
    ],
    correctIndex: 0,
    explanation: 'Tukey\'s outlier rule defines fences at Q1 - 1.5×IQR and Q3 + 1.5×IQR.'
  },
  {
    id: 'm4-final-4',
    question: 'If Pearson correlation coefficient r between X and Y is 0.0, what does this prove?',
    options: [
      'There is no LINEAR relationship between X and Y (a non-linear relationship like y=x² could still exist)',
      'X and Y are completely independent in every possible way',
      'X causes Y to be zero',
      'The data has zero variance'
    ],
    correctIndex: 0,
    explanation: 'Pearson r only evaluates linear relationships. Non-linear relationships (like circles or parabolas) can have r = 0.0.'
  },
  {
    id: 'm4-final-5',
    question: 'What does Anscombe\'s Quartet demonstrate to data scientists?',
    options: [
      'Radically different datasets can share identical summary statistics, proving that visualization is essential',
      'Four features are always optimal for regression',
      'Python code is four times faster than R',
      'Every distribution is normal with enough data'
    ],
    correctIndex: 0,
    explanation: 'Anscombe\'s Quartet proved that relying on summary statistics without visualization can disguise non-linearities and outliers.'
  },
  {
    id: 'm4-final-6',
    question: 'What is the difference between Nominal and Ordinal categorical variables?',
    options: [
      'Ordinal has an inherent logical ranking (e.g. Low, Med, High); Nominal has no ordering (e.g. Red, Blue, Green)',
      'Nominal has numbers; Ordinal has words',
      'Ordinal cannot be one-hot encoded',
      'Nominal variables cannot be plotted'
    ],
    correctIndex: 0,
    explanation: 'Ordinal variables carry a natural rank or hierarchy; nominal variables have no natural order.'
  },
  {
    id: 'm4-final-7',
    question: 'What happens when a numerical feature has a variance of exactly 0.0 across all rows in a dataset?',
    options: [
      'Every single row has the identical constant value; the feature carries zero predictive information and should be dropped',
      'The feature is perfectly normally distributed',
      'The model will achieve 100% accuracy',
      'The dataset is corrupted and must be discarded'
    ],
    correctIndex: 0,
    explanation: 'Variance = 0 means every row has the same value. Constant features provide zero predictive signal.'
  },
  {
    id: 'm4-final-8',
    question: 'Why does ice cream consumption strongly correlate with pool drowning deaths?',
    options: [
      'A confounding variable (summer temperature) causes both to increase simultaneously',
      'Ice cream causes muscle cramps while swimming',
      'Drownings cause people to buy ice cream out of grief',
      'The correlation is a mathematical error'
    ],
    correctIndex: 0,
    explanation: 'Summer heat is a confounding variable that causes both ice cream sales and swimming pool attendance to rise simultaneously.'
  }
];

export const MODULE_04_METADATA: Module = {
  id: 'mod-4',
  trackId: 'track-foundations',
  title: 'Module 04: Exploratory Data Analysis (EDA)',
  slug: 'exploratory-data-analysis',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'BarChart2',
  shortDescription: 'Master the investigative art of data: summary statistics, distributions, outlier detection, missing data mechanisms, and correlation vs. causation.',
  description: 'Uncover the foundational detective work of machine learning. Learn how to interrogate datasets before training models. Master descriptive statistics (mean, median, mode, variance, std dev), visual distribution shapes, skewness, the IQR outlier method, missing data imputation, and how to analyze bivariate correlation without falling into the causation trap.',
  estimatedHours: 6,
  prerequisites: [
    'Module 01: Introduction to Machine Learning',
    'Module 02: How Machine Learning Learns',
    'Module 03: Errors, Bias, Variance & Model Performance'
  ],
  objectives: [
    'Inspect tabular dimensions, schemas, numerical vs categorical types, and continuous vs discrete scales',
    'Compute and interpret descriptive statistics: mean, median, mode, min, max, range, variance, and standard deviation',
    'Diagnose distribution shapes, skewness, and bimodal patterns using histograms, box plots, and KDEs',
    'Detect and handle outliers using the IQR 1.5× rule and Z-score thresholds',
    'Differentiate missing data mechanisms (MCAR, MAR, MNAR) and apply median, mode, and indicator imputation',
    'Evaluate Pearson and Spearman correlation matrices while recognizing confounding variables and spurious correlations'
  ],
  badgeReward: {
    id: 'badge-data-detective',
    title: 'Data Detective',
    icon: 'BarChart2',
    description: 'Mastered all 21 lessons on Exploratory Data Analysis, descriptive statistics, outlier detection, and correlation.'
  },
  lessons: MODULE_04_LESSONS,
  finalQuiz: MODULE_04_COMPREHENSIVE_QUIZ
};

