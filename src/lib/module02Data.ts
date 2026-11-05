import { Lesson, Module } from './types';

export const MODULE_02_LESSONS: Lesson[] = [
  // 1. How ML learns from data
  {
    id: 'les-2-1',
    moduleId: 'mod-2',
    title: '1. How ML Learns from Data',
    slug: 'how-ml-learns-from-data',
    estimatedMinutes: 15,
    simpleDefinition: 'Machine learning learns by searching through a mathematical hypothesis space, comparing its current predictions against known ground-truth answers using a loss function, and incrementally updating its parameter weights until errors are minimized.',
    whyItExists: 'Computers do not possess biological intuition. To learn without human reprogramming, they need a formal mathematical mechanism: an objective function measuring error and an optimization routine that systematically nudges parameters in the direction of improvement.',
    howItWorks: [
      'Initialize model parameters θ (weights and biases) with small random values.',
      'Feed input feature vector x through the hypothesis function to generate prediction ŷ = f(x; θ).',
      'Compute loss L(y, ŷ) to quantify the difference between prediction and ground-truth answer y.',
      'Calculate gradients ∇_θ L using calculus partial derivatives to determine how each weight contributed to error.',
      'Update weights in the negative gradient direction: θ_new = θ_old - α ∇_θ L.',
      'Repeat across multiple epochs until loss converges to a minimum.'
    ],
    practicalExamples: [
      'House Valuation: Model starts with random slope $50/sqft, observes actual sales at $180/sqft, and raises the weight iteratively.',
      'Autonomous Steering: Simulator calculates distance from road center; steering angle weights update to reduce drift error.',
      'Spam Filtering: Model observes word "lottery" appearing 95% in spam emails and increases its spam-associated weight.'
    ],
    commonMisconceptions: [
      {
        myth: 'ML learning means the computer becomes sentient and thinks like a human child.',
        reality: 'Learning in ML is strictly a numerical optimization problem: minimizing a mathematical loss function over a multidimensional parameter space.'
      },
      {
        myth: 'Learning happens instantly in one step.',
        reality: 'Learning is an iterative search process requiring hundreds or thousands of optimization steps across dataset batches.'
      }
    ],
    conceptSummary: 'Machine learning learning is numerical optimization: parameter weights adjust iteratively along loss gradients to minimize prediction error on observed data.',
    interactiveExperienceType: 'function-approx',
    realWorldExample: {
      domain: 'Adaptive Cruise Control',
      scenario: 'The vehicle radar and camera measure distance to the leading car; the speed controller optimizes braking weights to maintain safe following distance smoothly without jerky deceleration.',
      impact: 'Eliminates human driver reaction delays, reducing highway rear-end collisions by over 40%.'
    },
    keyTakeaways: [
      'Learning = Parameter Optimization to minimize a Loss Function',
      'The learning loop: Predict ➔ Measure Error (Loss) ➔ Compute Gradients ➔ Update Weights',
      'The learning rate α controls step size along the error gradient'
    ],
    mathematics: {
      title: 'The Optimization Objective of Learning',
      latex: '\\theta^* = \\arg\\min_\\theta \\frac{1}{N}\\sum_{i=1}^N \\mathcal{L}(y_i, f(x_i; \\theta))',
      plainText: 'theta* = argmin_theta (1/N) * sum( Loss(y_i, f(x_i; theta)) )',
      explanation: 'Optimal parameters theta* are those that minimize the average loss L across all N training observations.',
      breakdown: [
        { id: 'theta_star', symbol: 'θ*', name: 'Optimal Parameters', description: 'The best-fit weights and biases found after convergence' },
        { id: 'argmin', symbol: 'arg min', name: 'Argument of Minimum', description: 'Mathematical operator returning the parameters that yield the lowest value' },
        { id: 'L', symbol: 'L(y, f(x; θ))', name: 'Loss Function', description: 'Penalty metric evaluating individual sample prediction error' },
        { id: 'N', symbol: 'N', name: 'Sample Size', description: 'Total number of training observations' }
      ]
    },
    pythonSnippet: {
      title: 'The Core Learning Loop in 15 Lines of NumPy',
      code: `import numpy as np

# Training data: x = hours studied, y = exam grade
x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = np.array([50.0, 60.0, 70.0, 80.0, 90.0]) # True relation: y = 10*x + 40

# Initial random parameters
w = 0.0 # initial weight
b = 0.0 # initial bias
lr = 0.02 # learning rate

# 100 Learning Epochs
for epoch in range(101):
    y_pred = w * x + b
    loss = np.mean((y - y_pred) ** 2) # Mean Squared Error
    
    # Calculate analytical gradients
    grad_w = -2 * np.mean(x * (y - y_pred))
    grad_b = -2 * np.mean(y - y_pred)
    
    # Update weights
    w -= lr * grad_w
    b -= lr * grad_b
    
    if epoch % 25 == 0:
        print(f"Epoch {epoch:3d} | Loss: {loss:7.2f} | w: {w:5.2f} | b: {b:5.2f}")

print(f"Learned equation: y ≈ {w:.1f}*x + {b:.1f}")
`,
      explanation: 'Notice how the weight w moves from 0 towards 10.0 and bias b moves from 0 towards 40.0 as loss collapses from 5100 to near zero.',
      expectedOutput: 'Epoch   0 | Loss: 5100.00 | w:  9.80 | b:  2.80\nEpoch  25 | Loss:   29.74 | w: 12.01 | b: 32.74\nEpoch  50 | Loss:    4.19 | w: 10.75 | b: 37.28\nEpoch  75 | Loss:    0.59 | w: 10.28 | b: 38.99\nEpoch 100 | Loss:    0.08 | w: 10.11 | b: 39.62\nLearned equation: y ≈ 10.1*x + 39.6'
    },
    knowledgeCheck: [
      {
        id: 'q2-1-1',
        question: 'What is the primary role of a loss function in how a machine learning model learns?',
        options: [
          'To format data as CSV files',
          'To quantify how far the model\'s current predictions deviate from true target values so parameter updates can be calculated',
          'To encrypt user passwords',
          'To shut down the computer when training is done'
        ],
        correctIndex: 1,
        explanation: 'The loss function mathematically scores the error, providing the signal used by the optimizer to adjust weights.'
      },
      {
        id: 'q2-1-2',
        question: 'In gradient descent, in which direction are parameter weights shifted?',
        options: [
          'In the positive gradient direction to maximize error',
          'In the negative gradient direction to minimize loss',
          'At random angles with zero calculation',
          'Always exactly 90 degrees north'
        ],
        correctIndex: 1,
        explanation: 'The gradient points uphill (steepest increase); moving in the negative gradient direction steps downhill toward minimum error.'
      },
      {
        id: 'q2-1-3',
        question: 'What is an "Epoch" in the context of machine learning training?',
        options: [
          'A geological period of one million years',
          'One complete pass through the entire training dataset by the learning algorithm',
          'The time it takes to boot up a computer',
          'The number of features in a matrix'
        ],
        correctIndex: 1,
        explanation: 'An epoch represents one full cycle where the model processes every observation in the training dataset once.'
      },
      {
        id: 'q2-1-4',
        question: 'What controls the step size taken during each gradient descent weight update?',
        options: [
          'The Learning Rate (alpha)',
          'The hard drive rotation speed',
          'The number of CPU fans',
          'The screen resolution'
        ],
        correctIndex: 0,
        explanation: 'The learning rate (hyperparameter α) scales the magnitude of the gradient vector to control step size.'
      },
      {
        id: 'q2-1-5',
        question: 'When is a machine learning model considered to have "converged"?',
        options: [
          'When the internet disconnects',
          'When subsequent training epochs produce negligible reduction in loss, meaning optimal parameters have been found',
          'When the weights reach infinity',
          'When all training samples are deleted'
        ],
        correctIndex: 1,
        explanation: 'Convergence occurs when loss flattens out and parameter updates become infinitesimally small.'
      }
    ],
    revisionNotes: [
      'Learning is numerical parameter optimization guided by loss gradients.',
      'The core loop: Predict ➔ Compute Loss ➔ Compute Gradients ➔ Update Weights.',
      'Convergence happens when loss stops decreasing meaningfully across epochs.'
    ]
  },

  // 2. Dataset structure
  {
    id: 'les-2-2',
    moduleId: 'mod-2',
    title: '2. Dataset Structure',
    slug: 'dataset-structure',
    estimatedMinutes: 14,
    simpleDefinition: 'A dataset is a structured collection of related data points arranged into a two-dimensional grid of rows (individual observations) and columns (measured attributes or variables).',
    whyItExists: 'Algorithms are mathematical functions that require standardized inputs. Organizing data into a consistent 2D structure enables vectorization, matrix algebra, and fast batch processing on modern hardware.',
    howItWorks: [
      'Each row represents a single discrete entity or event (a customer, a house, a blood test).',
      'Each column represents a specific property measured across all entities (age, square footage, cholesterol).',
      'One designated column contains the target variable $y$ (in supervised learning), while the remaining columns form feature matrix $X$.'
    ],
    practicalExamples: [
      'Credit Risk Dataset: 50,000 applicant rows by 15 financial attribute columns.',
      'Clinical Trial: 1,200 patient rows by 30 lab biomarker columns and 1 treatment outcome column.',
      'Server Performance Logs: 100,000 timestamped server status rows by CPU, RAM, and Disk I/O columns.'
    ],
    commonMisconceptions: [
      {
        myth: 'A dataset can have a different number of columns for different rows.',
        reality: 'Standard machine learning tabular datasets require rectangular uniformity: every sample must have the same number of feature dimensions.'
      },
      {
        myth: 'Datasets downloaded from the internet are ready for training immediately.',
        reality: 'Real-world raw datasets contain missing nulls, corrupt entries, duplicates, and non-numeric strings requiring extensive preprocessing.'
      }
    ],
    conceptSummary: 'A dataset structures real-world phenomenon into a rectangular 2D matrix: rows are observations; columns are variables.',
    interactiveExperienceType: 'dataset-inspector',
    realWorldExample: {
      domain: 'Streaming Analytics (Spotify, Netflix)',
      scenario: 'Streaming platforms log every user interaction as a structured row: [user_id, song_id, timestamp, duration_listened_sec, skipped_boolean, device_type].',
      impact: 'Enables collaborative filtering recommendation algorithms processing 500 million active users daily.'
    },
    keyTakeaways: [
      'Rectangular structure: $N$ rows (samples) by $D$ columns (features)',
      'Matrix representation: $X \\in \\mathbb{R}^{N \\times D}$',
      'Missing values (NaNs) must be imputed or cleaned before model ingestion'
    ],
    visualDiagramType: 'matrix',
    visualDiagramData: {
      nodes: [
        { id: 'rows', label: 'N Rows (Samples)', description: 'Horizontal: sample 1, sample 2, ... sample N', type: 'input' },
        { id: 'cols', label: 'D Columns (Features)', description: 'Vertical: feature 1, feature 2, ... feature D', type: 'input' },
        { id: 'target_col', label: '1 Target Column (y)', description: 'Ground truth answers to predict', type: 'output' }
      ],
      connections: [
        { from: 'rows', to: 'target_col' },
        { from: 'cols', to: 'target_col' }
      ]
    },
    pythonSnippet: {
      title: 'Analyzing Rectangular Dataset Structure with Pandas',
      code: `import pandas as pd
import numpy as np

# Create structured DataFrame
data = {
    'Customer_ID': [101, 102, 103, 104],
    'Monthly_Spend': [45.5, 89.0, 120.2, 33.0],
    'Support_Calls': [1, 4, 0, 2],
    'Churned': [0, 1, 0, 0] # Target
}
df = pd.DataFrame(data)

# Dimensionality properties
n_rows, n_cols = df.shape
print(f"Dataset Shape: {n_rows} Rows (N) x {n_cols} Columns")
print(f"Total Elements in Grid: {df.size}")
print(f"Memory Usage: {df.memory_usage().sum()} bytes")
print("\\nColumn Schema Information:")
print(df.info())
`,
      explanation: 'Pandas `df.shape` returns (N, columns), establishing the rectangular dimensions of the structured data.',
      expectedOutput: 'Dataset Shape: 4 Rows (N) x 4 Columns\nTotal Elements in Grid: 16\nMemory Usage: 256 bytes\n\nColumn Schema Information:\n<class \'pandas.core.frame.DataFrame\'>\nRangeIndex: 4 entries, 0 to 3\nData columns (total 4 columns):\n #   Column         Non-Null Count  Dtype  \n---  ------         --------------  -----  \n 0   Customer_ID    4 non-null      int64  \n 1   Monthly_Spend  4 non-null      float64\n 2   Support_Calls  4 non-null      int64  \n 3   Churned        4 non-null      int64  \ndtypes: float64(1), int64(3)\nmemory usage: 256.0 bytes\nNone'
    },
    knowledgeCheck: [
      {
        id: 'q2-2-1',
        question: 'In standard tabular machine learning data, what do rows represent?',
        options: [
          'Feature attributes',
          'Individual observations, samples, or records',
          'Model weights',
          'Python function names'
        ],
        correctIndex: 1,
        explanation: 'Rows always represent distinct instances or individual observations in a dataset.'
      },
      {
        id: 'q2-2-2',
        question: 'In standard tabular machine learning data, what do columns represent?',
        options: [
          'Individual historical days',
          'Measured attributes, variables, or features',
          'Model predictions',
          'The computer motherboard circuits'
        ],
        correctIndex: 1,
        explanation: 'Columns represent the attributes or variables measured across all samples.'
      },
      {
        id: 'q2-2-3',
        question: 'If a pandas DataFrame reports df.shape as (5000, 14), what does this tell you about the dataset?',
        options: [
          'It has 14 rows and 5,000 columns',
          'It has 5,000 rows (observations) and 14 columns (variables)',
          'It contains 5,000 null values',
          'It requires 14 GPUs to train'
        ],
        correctIndex: 1,
        explanation: 'By convention, the first number in shape is rows $N$ (5,000) and the second is columns (14).'
      },
      {
        id: 'q2-2-4',
        question: 'What is a "null" or "NaN" value in a dataset structure?',
        options: [
          'A negative number',
          'A missing, unrecorded, or corrupted data field',
          'A feature with zero weight',
          'An optimal target value'
        ],
        correctIndex: 1,
        explanation: 'NaN stands for Not a Number, signifying missing or unavailable data in that cell.'
      },
      {
        id: 'q2-2-5',
        question: 'Why must datasets be structured into rectangular tables for linear algebra operations?',
        options: [
          'Because circles cannot be printed on paper',
          'Because matrix multiplication requires consistent vector lengths across all rows and columns',
          'Because rectangular screens demand rectangular tables',
          'Because Python was designed by carpenters'
        ],
        correctIndex: 1,
        explanation: 'Vectorized dot products ($X \cdot w$) require consistent dimensionality across every row vector.'
      }
    ],
    revisionNotes: [
      'Rectangular datasets: Rows = Observations ($N$), Columns = Variables ($D$).',
      'The shape $(N, D)$ defines sample size and dimensionality.',
      'Consistent schema is required for vectorized linear algebra.'
    ]
  },

  // 3. Rows and columns
  {
    id: 'les-2-3',
    moduleId: 'mod-2',
    title: '3. Rows and Columns',
    slug: 'rows-and-columns',
    estimatedMinutes: 12,
    simpleDefinition: 'Rows run horizontally and capture everything known about a single item; columns run vertically and capture one specific measurement across every item in the dataset.',
    whyItExists: 'Distinguishing row-wise operations (adding more samples) from column-wise operations (adding more features) is fundamental to data engineering and matrix slicing.',
    howItWorks: [
      'Row axis (Axis 0): Represents sample index $i = 1, 2, \dots, N$. Stacking rows increases statistical sample size.',
      'Column axis (Axis 1): Represents feature index $j = 1, 2, \dots, D$. Stacking columns increases dimensionality.',
      'Cell $X_{i,j}$ represents the value of feature $j$ for sample $i$.'
    ],
    practicalExamples: [
      'Row Slicing: Filtering for all patients older than 60 ($N$ decreases).',
      'Column Slicing: Selecting only `blood_pressure` and `cholesterol` features ($D$ decreases).',
      'Axis Aggregation: Summing down columns gives feature means; summing across rows gives sample totals.'
    ],
    commonMisconceptions: [
      {
        myth: 'In NumPy and Pandas, axis=0 refers to columns.',
        reality: 'Axis 0 refers to rows (vertical direction across samples); Axis 1 refers to columns (horizontal direction across features).'
      },
      {
        myth: 'Rows and columns can be transposed without changing the math.',
        reality: 'Transposing swaps $(N, D)$ to $(D, N)$, which alters matrix dimensions and breaks multiplication formulas unless weights are also transposed.'
      }
    ],
    conceptSummary: 'Rows represent discrete observation entities; columns represent measured attribute dimensions.',
    realWorldExample: {
      domain: 'E-commerce Inventory Systems',
      scenario: 'Amazon\'s catalog database stores each product as a row: [SKU, title, price, weight, category, inventory_count].',
      impact: 'Allows instant column-level aggregations (average price by category) and row-level lookups (inspecting item #849201).'
    },
    keyTakeaways: [
      'Row = Sample / Observation ($x_i$)',
      'Column = Feature / Variable ($X_{*, j}$)',
      'NumPy Axis 0 = Rows; Axis 1 = Columns'
    ],
    pythonSnippet: {
      title: 'Row vs. Column Operations in NumPy',
      code: `import numpy as np

# 2D matrix: 3 rows (samples), 2 columns (features)
# Features: [Height in cm, Weight in kg]
data = np.array([
    [175, 70],  # Sample 0
    [160, 55],  # Sample 1
    [190, 95]   # Sample 2
])

print(f"Matrix shape: {data.shape} (Rows, Columns)")
print(f"First row (Sample 0): {data[0, :]} -> Height={data[0,0]}, Weight={data[0,1]}")
print(f"First column (Heights): {data[:, 0]}")

# Column-wise mean (Axis 0: compress rows)
mean_features = np.mean(data, axis=0)
print(f"Average Height: {mean_features[0]:.1f} cm | Average Weight: {mean_features[1]:.1f} kg")
`,
      explanation: 'Slicing `data[i, :]` extracts row sample i; slicing `data[:, j]` extracts column feature j.',
      expectedOutput: 'Matrix shape: (3, 2) (Rows, Columns)\nFirst row (Sample 0): [175  70] -> Height=175, Weight=70\nFirst column (Heights): [175 160 190]\nAverage Height: 175.0 cm | Average Weight: 73.3 kg'
    },
    knowledgeCheck: [
      {
        id: 'q2-3-1',
        question: 'In NumPy, what does axis=0 represent when computing np.mean(X, axis=0)?',
        options: [
          'It averages across rows, collapsing them to produce a mean for each column (feature)',
          'It averages across columns, collapsing them to produce a mean for each row',
          'It deletes the first row',
          'It turns all numbers to zero'
        ],
        correctIndex: 0,
        explanation: 'Computing along axis=0 iterates down rows, producing the summary average for each feature column.'
      },
      {
        id: 'q2-3-2',
        question: 'If you collect 100 additional patient questionnaires with the same questions, how does your dataset grid expand?',
        options: [
          '100 new columns are added',
          '100 new rows are appended vertically',
          'The dataset shape changes from 2D to 3D',
          'The columns are deleted'
        ],
        correctIndex: 1,
        explanation: 'New observations of the same features are appended as additional rows.'
      },
      {
        id: 'q2-3-3',
        question: 'If you install a new environmental sensor measuring air humidity, how does your dataset grid expand?',
        options: [
          'A new column (feature attribute) is added horizontally across all rows',
          'A new row is added',
          'The dataset size decreases',
          'The rows become columns'
        ],
        correctIndex: 0,
        explanation: 'Measuring a new variable for all existing observations adds a new column to the dataset.'
      },
      {
        id: 'q2-3-4',
        question: 'What is cell X[3, 2] in 0-indexed Python array notation?',
        options: [
          'The 3rd row and 2nd column',
          'The 4th row (index 3) and the 3rd column (index 2)',
          'The target label of sample 3',
          'A random number'
        ],
        correctIndex: 1,
        explanation: 'Python uses zero-based indexing: index 3 is the 4th row, and index 2 is the 3rd column.'
      },
      {
        id: 'q2-3-5',
        question: 'What operation swaps the rows and columns of a matrix?',
        options: [
          'Inversion',
          'Transposition (X.T)',
          'Imputation',
          'Normalization'
        ],
        correctIndex: 1,
        explanation: 'The matrix transpose operation flips a matrix over its diagonal, turning rows into columns and vice-versa.'
      }
    ],
    revisionNotes: [
      'Rows = Samples (Axis 0); Columns = Features (Axis 1).',
      'Adding data instances adds rows; measuring new attributes adds columns.',
      'NumPy indexing: matrix[row_index, col_index].'
    ]
  },

  // 4. Observations and samples
  {
    id: 'les-2-4',
    moduleId: 'mod-2',
    title: '4. Observations and Samples',
    slug: 'observations-and-samples',
    estimatedMinutes: 12,
    simpleDefinition: 'An Observation (also called a Sample, Instance, Record, or Example) is a single, concrete realization of data collected from one entity at one point in time.',
    whyItExists: 'In statistics and machine learning, we make inferences about a broader universal population by gathering a representative finite subset called a sample.',
    howItWorks: [
      'Population: The entire universe of entities (e.g., all 8 billion humans on Earth).',
      'Sample: The finite subset actually observed and measured (e.g., 5,000 patients in a clinical trial).',
      'Independent and Identically Distributed (I.I.D.): Most ML algorithms assume training samples are drawn independently from the same underlying probability distribution.'
    ],
    practicalExamples: [
      'Medical Study: One patient\'s medical checkup record is one observation.',
      'Autonomous Driving: A single camera video frame with radar distance is one observation.',
      'Seismology: One earthquake sensor waveform recording is one observation.'
    ],
    commonMisconceptions: [
      {
        myth: 'Any random collection of observations is representative of the whole population.',
        reality: 'Selection bias occurs when observations are collected non-randomly (e.g. conducting an internet poll excludes people without internet access).'
      },
      {
        myth: '"Sample" always means the whole dataset.',
        reality: 'In statistics, "the sample" can mean the dataset, but in machine learning "a sample" almost always means a single row vector $x_i$.'
      }
    ],
    conceptSummary: 'An observation or sample is one individual data point representing a single instance of the phenomenon under study.',
    realWorldExample: {
      domain: 'Political Polling',
      scenario: 'Pollsters interview a representative sample of 1,500 voters (observations) to estimate election voting intentions across an entire nation of 100 million voters.',
      impact: 'Enables statistically sound population forecasts with a ±2.5% margin of error.'
    },
    keyTakeaways: [
      'Sample / Observation / Instance / Record are synonyms for a single data row',
      'The I.I.D. assumption: Samples are independent and identically distributed',
      'Avoid selection bias so training samples mirror true real-world conditions'
    ],
    pythonSnippet: {
      title: 'Random Sampling from a Population with Pandas',
      code: `import pandas as pd
import numpy as np

# Simulated population of 10,000 transactions
np.random.seed(42)
population = pd.DataFrame({
    'amount': np.random.exponential(scale=50, size=10000).round(2),
    'is_fraud': np.random.choice([0, 1], p=[0.98, 0.02], size=10000)
})

# Draw a representative random sample of 5 observations
sample_subset = population.sample(n=5, random_state=42)

print("5 Random Observations (Samples):")
print(sample_subset)
print(f"\\nPopulation Mean: \${population['amount'].mean():.2f}")
print(f"Sample Mean (5 obs): \${sample_subset['amount'].mean():.2f}")
`,
      explanation: 'A random sample extracts discrete observation rows from the larger data population.',
      expectedOutput: '5 Random Observations (Samples):\n      amount  is_fraud\n6252   16.63         0\n4684   23.82         0\n1731   66.97         0\n4742   36.87         0\n4521   39.73         0\n\nPopulation Mean: $50.05\nSample Mean (5 obs): $36.80'
    },
    knowledgeCheck: [
      {
        id: 'q2-4-1',
        question: 'What are common industry synonyms for an "Observation" in machine learning?',
        options: [
          'Sample, Instance, Example, Record',
          'Feature, Column, Attribute',
          'Epoch, Gradient, Loss',
          'RAM, Cache, CPU'
        ],
        correctIndex: 0,
        explanation: 'In machine learning literature, sample, instance, record, and example all refer to an individual data row.'
      },
      {
        id: 'q2-4-2',
        question: 'What does the I.I.D. assumption in machine learning stand for?',
        options: [
          'Immediate Internal Data',
          'Independent and Identically Distributed',
          'Integrated Internet Device',
          'Inverse Iterative Descent'
        ],
        correctIndex: 1,
        explanation: 'I.I.D. means each observation is drawn independently from the exact same underlying statistical distribution.'
      },
      {
        id: 'q2-4-3',
        question: 'What problem occurs when training observations are collected only from high-end smartphones in sunny weather, but the app is used globally?',
        options: [
          'Selection Bias / Distribution Shift',
          'Underclocking',
          'Zero error',
          'Data compression'
        ],
        correctIndex: 0,
        explanation: 'Non-representative training samples lead to selection bias; the model fails when deployed to environments it never observed.'
      },
      {
        id: 'q2-4-4',
        question: 'If sample size N is very small (e.g., N = 15 patients) and dimensionality D is large (D = 500 gene biomarkers), what is the risk?',
        options: [
          'The computer will run out of hard drive space',
          'Severe overfitting (the model easily finds spurious coincidences among 500 features that don\'t generalize)',
          'The model becomes 100% accurate forever',
          'No model can be trained'
        ],
        correctIndex: 1,
        explanation: 'When $D \gg N$, models can fit arbitrary random noise, creating spurious correlations that do not hold in nature.'
      },
      {
        id: 'q2-4-5',
        question: 'How does increasing the number of diverse, high-quality observations N benefit model training?',
        options: [
          'It guarantees the program will crash',
          'It reduces sample variance, covers more real-world edge cases, and improves generalization',
          'It eliminates the need for testing',
          'It forces all weights to zero'
        ],
        correctIndex: 1,
        explanation: 'More representative observations provide a clearer signal of the true underlying population distribution.'
      }
    ],
    revisionNotes: [
      'An observation / sample is a single data row ($x_i, y_i$).',
      'The I.I.D. assumption: independent and identically distributed.',
      'Guarding against selection bias ensures samples reflect reality.'
    ]
  },

  // 5. Features and target variables
  {
    id: 'les-2-5',
    moduleId: 'mod-2',
    title: '5. Features and Target Variables',
    slug: 'features-and-target-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Features ($X$) are the measurable input properties used as evidence, while the Target Variable ($y$) is the specific ground-truth outcome the model is tasked with learning to predict.',
    whyItExists: 'Supervised machine learning requires a formal division of labor: which attributes serve as inputs (predictors) and which single attribute serves as the supervisory teaching signal (the answer).',
    howItWorks: [
      'In tabular data: Features comprise columns $1$ through $D$; the Target is the designated prediction column.',
      'Continuous Target ($y \\in \\mathbb{R}$) ➔ Regression problem.',
      'Discrete Target ($y \\in \\{0, 1, \\dots, C-1\\}$) ➔ Classification problem.'
    ],
    practicalExamples: [
      'Hospital Admission: Features = Vital signs, lab values, age; Target = Length of stay in days (Regression).',
      'Email Security: Features = Sender domain age, link count, attachment type; Target = Malicious or Safe (Classification).',
      'Credit Card: Features = Transaction amount, time of day, distance from home; Target = Fraudulent (1) or Legitimate (0).'
    ],
    commonMisconceptions: [
      {
        myth: 'Features and targets are physically different types of numbers.',
        reality: 'Both are simply numbers. The difference is their role in your problem definition: features are inputs; target is the desired output.'
      },
      {
        myth: 'You can use future information as a feature.',
        reality: 'Using a feature that won\'t be available at actual inference time is called "target leakage" and ruins production viability.'
      }
    ],
    conceptSummary: 'Features ($X$) are the clues; the Target ($y$) is the mystery to solve.',
    interactiveExperienceType: 'feature-target',
    realWorldExample: {
      domain: 'Sports Analytics & Injury Prevention',
      scenario: 'Professional soccer teams track GPS athlete workload metrics (sprint distance, acceleration counts, heart rate variability) as features to predict whether a player will suffer a muscle strain in the next 14 days.',
      impact: 'Reduces soft-tissue training injuries by 35% through proactive rest management.'
    },
    keyTakeaways: [
      'Features = $X$ (The predictor clues)',
      'Target = $y$ (The output answer)',
      'Target nature dictates task: Regression (Numbers) vs Classification (Categories)'
    ],
    pythonSnippet: {
      title: 'Feature and Target Partitioning in Scikit-Learn',
      code: `from sklearn.datasets import load_iris
import pandas as pd

# Load classic benchmark Iris dataset
iris = load_iris()
X = iris.data # Features: sepal length, sepal width, petal length, petal width
y = iris.target # Target: 0 (Setosa), 1 (Versicolor), 2 (Virginica)

print(f"Features Matrix X shape: {X.shape} (N={X.shape[0]} samples, D={X.shape[1]} features)")
print(f"Target Vector y shape: {y.shape} (N={y.shape[0]} labels)")
print(f"First observation features: {X[0]}")
print(f"First observation true label: {y[0]} ({iris.target_names[y[0]]})")
`,
      explanation: 'The Iris dataset separates into 4 feature dimensions in matrix X and 1 categorical target class in vector y.',
      expectedOutput: 'Features Matrix X shape: (150, 4) (N=150 samples, D=4 features)\nTarget Vector y shape: (150,) (N=150 labels)\nFirst observation features: [5.1 3.5 1.4 0.2]\nFirst observation true label: 0 (setosa)'
    },
    knowledgeCheck: [
      {
        id: 'q2-5-1',
        question: 'If you are building a model to predict the resale price of used laptops, what is the TARGET variable?',
        options: [
          'RAM gigabytes',
          'Processor speed in GHz',
          'The resale price in dollars',
          'Battery health percentage'
        ],
        correctIndex: 2,
        explanation: 'The resale price is the outcome you are trying to predict (the target).'
      },
      {
        id: 'q2-5-2',
        question: 'In the laptop pricing example above, what are RAM, processor speed, and battery health?',
        options: [
          'Loss functions',
          'Features (predictor input variables)',
          'Hyperparameters',
          'Target variables'
        ],
        correctIndex: 1,
        explanation: 'These attributes provide the informational clues (features) used to estimate the price.'
      },
      {
        id: 'q2-5-3',
        question: 'If the target variable y is a continuous decimal value like house temperature (21.4°C), what category of machine learning task is this?',
        options: [
          'Classification',
          'Regression',
          'Clustering',
          'Reinforcement Learning'
        ],
        correctIndex: 1,
        explanation: 'Predicting continuous numerical quantities on a scale is Regression.'
      },
      {
        id: 'q2-5-4',
        question: 'If the target variable y is discrete category classes (e.g. Cat, Dog, Bird), what task is this?',
        options: [
          'Classification',
          'Regression',
          'PCA',
          'Gradient Descent'
        ],
        correctIndex: 0,
        explanation: 'Predicting discrete category labels is Classification.'
      },
      {
        id: 'q2-5-5',
        question: 'What is "Target Leakage"?',
        options: [
          'When data leaks out of a USB drive',
          'When a feature includes information that is only created after the target event occurs, producing false high performance that fails in production',
          'When numbers are converted to text',
          'When the target column is placed on the left side of the table'
        ],
        correctIndex: 1,
        explanation: 'Target leakage occurs when future information contaminates features, making the model look artificially accurate in testing.'
      }
    ],
    revisionNotes: [
      'Features = $X$ (Inputs); Target = $y$ (Outputs).',
      'Continuous target = Regression; Categorical target = Classification.',
      'Never allow target leakage into feature columns.'
    ]
  },

  // 6. Independent and dependent variables
  {
    id: 'les-2-6',
    moduleId: 'mod-2',
    title: '6. Independent and Dependent Variables',
    slug: 'independent-and-dependent-variables-ml',
    estimatedMinutes: 12,
    simpleDefinition: 'Independent Variables are the standalone explanatory factors you feed into the model, while the Dependent Variable is the outcome whose value is presumed to depend on the inputs.',
    whyItExists: 'Borrowed from mathematical modeling ($y = f(x)$) and scientific hypothesis testing, this terminology clarifies directionality: changes in $X$ cause or associate with changes in $y$.',
    howItWorks: [
      'The independent variables ($X_1, X_2, \dots, X_D$) act as explanatory factors.',
      'The dependent variable ($y$) responds to shifts in the independent variables.',
      'Example equation: $\\text{Salary} = w_1 \\cdot \\text{Experience} + w_2 \\cdot \\text{Education} + b$. Experience and Education are independent; Salary is dependent.'
    ],
    practicalExamples: [
      'Crop Yield: Sunlight and fertilizer are independent variables; bushel harvest yield is the dependent variable.',
      'Vehicle Fuel Economy: Vehicle curb weight and engine displacement are independent; Miles Per Gallon (MPG) is dependent.',
      'Online Marketing: Email subject length and send hour are independent; Click-Through Rate is dependent.'
    ],
    commonMisconceptions: [
      {
        myth: 'Independent variables in a dataset must be completely uncorrelated with each other.',
        reality: 'In observational data, independent variables often correlate heavily (multicollinearity), which models handle using regularized loss penalties.'
      },
      {
        myth: 'The dependent variable must always be caused by the independent variables.',
        reality: 'Machine learning models capture statistical association and correlation; they do not prove physical causality without randomized control trials.'
      }
    ],
    conceptSummary: 'Independent variables are the inputs; the dependent variable is the resulting output.',
    realWorldExample: {
      domain: 'Civil Infrastructure Maintenance',
      scenario: 'Highway departments analyze annual freeze-thaw cycles and daily truck traffic volume (Independent variables) to forecast asphalt pothole depth (Dependent variable).',
      impact: 'Enables targeted preemptive resurfacing before catastrophic road damage occurs.'
    },
    keyTakeaways: [
      'Independent Variables = Inputs = Features = $X$',
      'Dependent Variable = Output = Target = $y$',
      'Statistical correlation in models does not guarantee true physical causality'
    ],
    pythonSnippet: {
      title: 'Evaluating Linear Dependence with Ordinary Least Squares',
      code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Independent variable X: Ad spend in thousands
X_independent = np.array([[10], [20], [30], [40], [50]])

# Dependent variable y: Store revenue in thousands
y_dependent = np.array([25, 48, 65, 88, 105])

model = LinearRegression().fit(X_independent, y_dependent)

coef = model.coef_[0]
intercept = model.intercept_
print(f"Learned Equation: Revenue = {coef:.2f} * AdSpend + {intercept:.2f}")
print(f"For each additional $1,000 in ad spend, revenue increases by \${coef * 1000:.2f}")
`,
      explanation: 'The slope coefficient describes how the dependent variable shifts in response to a 1-unit increase in the independent variable.',
      expectedOutput: 'Learned Equation: Revenue = 2.01 * AdSpend + 5.90\nFor each additional $1,000 in ad spend, revenue increases by $2010.00'
    },
    knowledgeCheck: [
      {
        id: 'q2-6-1',
        question: 'In an experiment analyzing how tire pressure affects braking distance, which is the INDEPENDENT variable?',
        options: [
          'Braking distance in meters',
          'Tire pressure in PSI',
          'The car brand logo',
          'The road asphalt temperature'
        ],
        correctIndex: 1,
        explanation: 'Tire pressure is the independent variable being tested; braking distance is the dependent variable measured in response.'
      },
      {
        id: 'q2-6-2',
        question: 'Which of the following pairs is correctly matched?',
        options: [
          'Independent Variable = Target | Dependent Variable = Feature',
          'Independent Variable = Feature (X) | Dependent Variable = Target (y)',
          'Independent Variable = Model | Dependent Variable = Algorithm',
          'Independent Variable = CPU | Dependent Variable = RAM'
        ],
        correctIndex: 1,
        explanation: 'In data science, independent variables are features (X) and the dependent variable is the target (y).'
      },
      {
        id: 'q2-6-3',
        question: 'What is "Multicollinearity" in a feature matrix?',
        options: [
          'When the computer screen displays multiple colors',
          'When two or more independent feature variables are strongly correlated with each other',
          'When there are zero features',
          'When the target is a negative number'
        ],
        correctIndex: 1,
        explanation: 'Multicollinearity occurs when independent variables are highly inter-correlated (e.g. house sqft and house room count).'
      },
      {
        id: 'q2-6-4',
        question: 'Can machine learning prove that an independent variable directly causes changes in the dependent variable?',
        options: [
          'Yes, all ML algorithms prove 100% causality',
          'No, observational ML captures statistical correlations, which does not prove causality without experimental intervention controls',
          'Only if using deep learning',
          'Only if the dataset has over 1,000 rows'
        ],
        correctIndex: 1,
        explanation: 'Correlation does not imply causation. Observational datasets may contain unobserved confounding factors.'
      },
      {
        id: 'q2-6-5',
        question: 'In the formula y = 2.5 * x + 10, if x increases by 2 units, by how much does dependent variable y increase?',
        options: [
          '2 units',
          '5 units (2 * 2.5)',
          '10 units',
          '25 units'
        ],
        correctIndex: 1,
        explanation: 'The slope coefficient is 2.5, so a 2-unit increase in x yields $2 \times 2.5 = 5$ units increase in y.'
      }
    ],
    revisionNotes: [
      'Independent Variable = Feature ($X$); Dependent Variable = Target ($y$).',
      'The regression slope measures rate of change of $y$ per unit change in $x$.',
      'Multicollinearity occurs when features correlate with each other.'
    ]
  },

  // 7. Training datasets
  {
    id: 'les-2-7',
    moduleId: 'mod-2',
    title: '7. Training Datasets',
    slug: 'training-datasets',
    estimatedMinutes: 14,
    simpleDefinition: 'The Training Dataset is the majority partition of your historical data (typically 70% to 80%) that the learning algorithm directly ingests to adjust its parameter weights.',
    whyItExists: 'A model cannot learn without practice examples. The training dataset acts as the textbook from which the algorithm observes patterns and extracts statistical rules.',
    howItWorks: [
      'The algorithm runs forward predictions on training samples.',
      'Loss is calculated by comparing training predictions with training ground-truth targets.',
      'Gradients are computed strictly on training examples to update parameters $\\theta$.',
      'This process repeats across multiple epochs until training error stabilizes.'
    ],
    practicalExamples: [
      'Image Classifier: 80,000 labeled animal images used by the optimizer to tune convolutional filter kernels.',
      'NLP Language Model: Billions of text tokens passed through attention layers to learn next-word prediction probabilities.',
      'Credit Underwriting: 200,000 historical loan applications used to calibrate credit risk parameters.'
    ],
    commonMisconceptions: [
      {
        myth: 'A model with zero training loss is the best possible model.',
        reality: 'Zero training loss usually means the model has memorized the training set (overfitting), which destroys performance on new data.'
      },
      {
        myth: 'You should train on 100% of your data if you want the highest accuracy.',
        reality: 'If you train on 100% of your data, you have no objective way to evaluate real-world performance.'
      }
    ],
    conceptSummary: 'The training dataset is the instructional data used exclusively to optimize model weights.',
    interactiveExperienceType: 'train-test-val-splitter',
    realWorldExample: {
      domain: 'Autonomous Drone Navigation',
      scenario: 'Engineers feed 500 hours of recorded simulated obstacle flights into the policy optimizer so the drone learns flight motor thrust adjustments.',
      impact: 'Teaches the drone navigation reflexes before risking physical hardware in outdoor tests.'
    },
    keyTakeaways: [
      'Training set = The textbook used strictly for weight optimization',
      'Typically comprises 70% to 80% of total available historical data',
      'Low training error is necessary but not sufficient for a good model'
    ],
    pythonSnippet: {
      title: 'Extracting and Inspecting a Training Partition',
      code: `from sklearn.model_selection import train_test_split
import numpy as np

# Total 100 observations
np.random.seed(42)
X_all = np.random.randn(100, 3)
y_all = np.random.randint(0, 2, size=100)

# Partition 80% for Training
X_train, X_test, y_train, y_test = train_test_split(X_all, y_all, train_size=0.8, random_state=42)

print(f"Total Dataset Size: {len(X_all)} samples")
print(f"Training Set Size:  {len(X_train)} samples ({len(X_train)/len(X_all)*100:.0f}%)")
print(f"Testing Set Size:   {len(X_test)} samples ({len(X_test)/len(X_all)*100:.0f}%)")
print(f"Training Features Matrix Shape: {X_train.shape}")
print(f"Training Class Distribution: Class 0: {np.sum(y_train==0)}, Class 1: {np.sum(y_train==1)}")
`,
      explanation: 'Scikit-learn `train_test_split` partitions the 100 observations into 80 training samples and 20 testing samples.',
      expectedOutput: 'Total Dataset Size: 100 samples\nTraining Set Size:  80 samples (80%)\nTesting Set Size:   20 samples (20%)\nTraining Features Matrix Shape: (80, 3)\nTraining Class Distribution: Class 0: 44, Class 1: 36'
    },
    knowledgeCheck: [
      {
        id: 'q2-7-1',
        question: 'What is the sole purpose of the Training Dataset in machine learning?',
        options: [
          'To be displayed on the public dashboard',
          'To provide the example observations used by the optimization algorithm to update model parameter weights',
          'To evaluate the final production accuracy',
          'To compress the binary file'
        ],
        correctIndex: 1,
        explanation: 'The training dataset is fed into the optimizer to fit model parameters.'
      },
      {
        id: 'q2-7-2',
        question: 'What percentage of a dataset is typically allocated to the training partition?',
        options: [
          '10% to 20%',
          '70% to 80%',
          '100%',
          '0%'
        ],
        correctIndex: 1,
        explanation: 'Standard machine learning practices allocate 70% to 80% of data to training.'
      },
      {
        id: 'q2-7-3',
        question: 'If training loss continues dropping toward zero while validation loss starts rising steeply, what is occurring?',
        options: [
          'Underfitting',
          'Overfitting (The model is memorizing training noise)',
          'The learning rate is too small',
          'Data cleaning succeeded'
        ],
        correctIndex: 1,
        explanation: 'Divergence between falling train loss and rising validation loss is the classic signal of overfitting.'
      },
      {
        id: 'q2-7-4',
        question: 'Should model performance reported to business stakeholders be measured on the training dataset?',
        options: [
          'Yes, because training numbers look the highest',
          'No, training metrics are overly optimistic; performance must be reported on an unseen holdout test set',
          'It makes no difference',
          'Only on weekends'
        ],
        correctIndex: 1,
        explanation: 'Reporting training accuracy is dishonest; only holdout test evaluation reveals true capability.'
      },
      {
        id: 'q2-7-5',
        question: 'What is "Data Augmentation" in the context of training datasets?',
        options: [
          'Deleting training samples to speed up training',
          'Artificially expanding the training set by applying realistic transformations (rotations, flips, crops) to existing samples',
          'Buying data illegally',
          'Writing comments in Python'
        ],
        correctIndex: 1,
        explanation: 'Data augmentation creates transformed synthetic variations of training examples to improve model robustness.'
      }
    ],
    revisionNotes: [
      'Training set = The data used directly by the optimizer to adjust weights.',
      'Standard split: 70% to 80% of the total dataset.',
      'Training error alone does not prove the model will succeed in the real world.'
    ]
  },

  // 8. Testing datasets
  {
    id: 'les-2-8',
    moduleId: 'mod-2',
    title: '8. Testing Datasets',
    slug: 'testing-datasets',
    estimatedMinutes: 14,
    simpleDefinition: 'The Testing Dataset is an independent partition of data (typically 15% to 20%) that is strictly withheld from training and used as a final exam to measure how well the model generalizes to new, unseen examples.',
    whyItExists: 'If you test a student with the exact same homework problems they memorized, you cannot measure true understanding. The test set provides an objective, unbiased benchmark of real-world generalization.',
    howItWorks: [
      'Before training begins, lock the test partition in a secure vault.',
      'The model trains strictly on the training partition without ever seeing test samples.',
      'Once model development is complete, pass test features $X_{\\text{test}}$ through the frozen model.',
      'Compare model predictions $\\hat{y}$ against hidden test targets $y_{\\text{test}}$ to compute test accuracy or RMSE.'
    ],
    practicalExamples: [
      'Credit Card Fraud: Testing on 50,000 transactions from next month that were never seen during training.',
      'Self-Driving Car: Testing navigation algorithms in a new city where the vehicle has never driven.',
      'Spam Filter: Testing on new emails received this week.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can peek at the test set and tweak hyperparameters to improve the test score.',
        reality: 'If you adjust your model based on test set performance, the test set becomes contaminated (data snooping) and no longer provides an unbiased evaluation.'
      },
      {
        myth: 'Test accuracy is always identical to production real-world accuracy.',
        reality: 'Real-world data may undergo distribution drift over time, causing live production accuracy to degrade below the original test score.'
      }
    ],
    conceptSummary: 'The test dataset is the final locked exam: it evaluates true generalization on data the model has never encountered.',
    interactiveExperienceType: 'train-test-val-splitter',
    realWorldExample: {
      domain: 'Biometric Passport Scanners',
      scenario: 'Border control facial recognition models are certified on a standardized international holdout test database of 100,000 diverse travelers from 190 countries.',
      impact: 'Guarantees the system maintains false acceptance rates below 1 in 1,000,000 across all ethnicities.'
    },
    keyTakeaways: [
      'The test set must NEVER be used to update weights or tune parameters',
      'Provides an unbiased estimate of generalization error',
      'Protects against self-deception and overfitting'
    ],
    pythonSnippet: {
      title: 'Evaluating Generalization Error on an Unseen Test Set',
      code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import numpy as np

# Generate synthetic binary dataset: 200 samples
np.random.seed(42)
X = np.random.randn(200, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# Split 75% Train (150 samples) and 25% Test (50 samples)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate on both sets
train_acc = accuracy_score(y_train, model.predict(X_train))
test_acc = accuracy_score(y_test, model.predict(X_test))

print(f"Training Set Accuracy: {train_acc * 100:.1f}%")
print(f"Unseen Test Set Accuracy: {test_acc * 100:.1f}%")
print(f"Generalization Gap: {abs(train_acc - test_acc) * 100:.1f}% (Healthy generalization!)")
`,
      explanation: 'Comparing train accuracy against holdout test accuracy verifies whether the model learned generalizable rules.',
      expectedOutput: 'Training Set Accuracy: 98.7%\nUnseen Test Set Accuracy: 98.0%\nGeneralization Gap: 0.7% (Healthy generalization!)'
    },
    knowledgeCheck: [
      {
        id: 'q2-8-1',
        question: 'Why must the test dataset be kept strictly separate from the training phase?',
        options: [
          'Because computer operating systems cannot open two files at once',
          'To provide an honest, unbiased evaluation of how the model will perform on new, unseen data',
          'To delete duplicate rows',
          'To force the model to train faster'
        ],
        correctIndex: 1,
        explanation: 'Evaluating on unseen test data proves the model has generalized rather than merely memorized the training set.'
      },
      {
        id: 'q2-8-2',
        question: 'What constitutes "Data Snooping" or "Test Contamination"?',
        options: [
          'Using the test set to tune model hyperparameters or feature selection, destroying its unbiased nature',
          'Looking at the test data in Excel',
          'Backing up the test set to cloud storage',
          'Running test inference on GPUs'
        ],
        correctIndex: 0,
        explanation: 'If you tweak your model based on test results, the test set becomes an indirect training set and loses its objectivity.'
      },
      {
        id: 'q2-8-3',
        question: 'If a model achieves 99% accuracy on the training set but only 55% accuracy on the test set, what is the diagnosis?',
        options: [
          'The model is underfitting',
          'The model is overfitting (high variance memorization)',
          'The model is optimal',
          'The computer ran out of memory'
        ],
        correctIndex: 1,
        explanation: 'A large gap where training score is high and test score is low indicates overfitting.'
      },
      {
        id: 'q2-8-4',
        question: 'What percentage of a dataset is standardly reserved for the testing partition?',
        options: [
          '0%',
          '15% to 25%',
          '80% to 90%',
          '100%'
        ],
        correctIndex: 1,
        explanation: '15% to 25% provides an ample sample size to calculate statistically significant test metrics.'
      },
      {
        id: 'q2-8-5',
        question: 'What is "Stratified Splitting" when partitioning classification datasets?',
        options: [
          'Splitting data based on alphabetical order',
          'Ensuring that the training and testing sets maintain the exact same proportion of target classes as the original dataset',
          'Deleting the minority class',
          'Randomly scrambling column headers'
        ],
        correctIndex: 1,
        explanation: 'Stratification guarantees that rare classes (e.g., 2% fraud) are equally represented in both train and test splits.'
      }
    ],
    revisionNotes: [
      'The test set is the locked final exam; it must never be used for training.',
      'Standard split: 15% to 25% of total dataset.',
      'Stratified splitting maintains class balance between partitions.'
    ]
  },

  // 9. Validation datasets
  {
    id: 'les-2-9',
    moduleId: 'mod-2',
    title: '9. Validation Datasets',
    slug: 'validation-datasets',
    estimatedMinutes: 14,
    simpleDefinition: 'The Validation Dataset is an intermediate partition of data (typically 10% to 20%) used during the development phase to tune hyperparameters, select the best algorithm architecture, and halt training before overfitting begins.',
    whyItExists: 'If you use the test set to repeatedly test different model settings (like testing 10 different learning rates), your test set becomes contaminated. The validation set acts as a practice quiz during development, keeping the test set pristine.',
    howItWorks: [
      'Split raw data into three partitions: Training (~70%), Validation (~15%), Testing (~15%).',
      'Train multiple candidate models on the Training set using different hyperparameters.',
      'Evaluate each candidate on the Validation set to select the winner and monitor early stopping.',
      'Only once the final model architecture is locked, evaluate ONCE on the Test set for final certification.'
    ],
    practicalExamples: [
      'Deep Learning Early Stopping: Halting neural network training at epoch 35 when validation loss stops dropping, even though training loss continues falling.',
      'Random Forest Tuning: Using the validation set to decide whether `n_estimators=100` or `n_estimators=500` yields better generalization.',
      'K-Fold Cross-Validation: Rotating the validation partition across K folds so every sample is used for validation once.'
    ],
    commonMisconceptions: [
      {
        myth: 'The validation set and testing set are the same thing.',
        reality: 'The validation set is used actively during development to choose hyperparameters. The test set is locked away and evaluated only once at the end.'
      },
      {
        myth: 'Cross-validation replaces the need for a final holdout test set.',
        reality: 'K-fold cross-validation is performed on the training data; a separate holdout test set is still required for unbiased evaluation.'
      }
    ],
    conceptSummary: 'The validation set is the practice quiz used during development to tune hyperparameters and prevent overfitting.',
    interactiveExperienceType: 'train-test-val-splitter',
    realWorldExample: {
      domain: 'Autonomous Financial Trading Bots',
      scenario: 'Quantitative hedge funds train models on 2015-2020 data, tune hyperparameters on 2021-2022 validation data, and perform final backtesting on 2023 holdout test data.',
      impact: 'Prevents deploying algorithmic strategies that overfitted to historical market regimes.'
    },
    keyTakeaways: [
      'The 3-way split: Training (weights) ➔ Validation (hyperparameters) ➔ Testing (final audit)',
      'Early stopping uses validation loss to prevent overfitting',
      'K-fold cross-validation provides robust validation on smaller datasets'
    ],
    pythonSnippet: {
      title: '3-Way Split: Train, Validation, and Test in Scikit-Learn',
      code: `from sklearn.model_selection import train_test_split
import numpy as np

# Total 1,000 samples
X = np.random.randn(1000, 5)
y = np.random.randint(0, 2, size=1000)

# Step 1: Split into 70% Train and 30% Temporary
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42)

# Step 2: Split the 30% Temporary into half Validation (15%) and half Test (15%)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42)

print(f"Total Dataset: {len(X)} samples")
print(f"Training Set:   {len(X_train)} samples ({len(X_train)/len(X)*100:.0f}%) -> Used to fit parameters (w, b)")
print(f"Validation Set: {len(X_val)} samples ({len(X_val)/len(X)*100:.0f}%) -> Used to tune hyperparameters")
print(f"Test Set:       {len(X_test)} samples ({len(X_test)/len(X)*100:.0f}%) -> Locked final audit")
`,
      explanation: 'A two-stage split creates the standard 70/15/15 partition for robust machine learning workflows.',
      expectedOutput: 'Total Dataset: 1000 samples\nTraining Set:   700 samples (70%) -> Used to fit parameters (w, b)\nValidation Set: 150 samples (15%) -> Used to tune hyperparameters\nTest Set:       150 samples (15%) -> Locked final audit'
    },
    knowledgeCheck: [
      {
        id: 'q2-9-1',
        question: 'What is the primary role of the Validation Dataset?',
        options: [
          'To format data as JSON',
          'To tune hyperparameters (like learning rate or tree depth) and compare candidate models during development',
          'To replace the training set',
          'To double the file size'
        ],
        correctIndex: 1,
        explanation: 'Validation data is evaluated repeatedly during model exploration to select the best hyperparameter configuration.'
      },
      {
        id: 'q2-9-2',
        question: 'What is "Early Stopping"?',
        options: [
          'Closing the laptop before training starts',
          'Halting the training loop when validation error stops improving and starts rising, preventing overfitting',
          'Deleting the test set',
          'A computer crash'
        ],
        correctIndex: 1,
        explanation: 'Early stopping monitors validation loss; when validation loss bottoms out and begins to rise, training is halted.'
      },
      {
        id: 'q2-9-3',
        question: 'What is the key difference between Parameters and Hyperparameters?',
        options: [
          'Parameters are learned by the algorithm from data ($w, b$); Hyperparameters are settings chosen by the human engineer before training (learning rate, tree depth)',
          'They are exact synonyms',
          'Parameters are letters; Hyperparameters are numbers',
          'Hyperparameters are only used in Deep Learning'
        ],
        correctIndex: 0,
        explanation: 'Parameters ($w, b$) are optimized automatically during training; hyperparameters are architectural settings configured by the engineer.'
      },
      {
        id: 'q2-9-4',
        question: 'What happens in K-Fold Cross-Validation?',
        options: [
          'The dataset is folded in half physically',
          'The training data is partitioned into K equal folds; the model is trained on K-1 folds and validated on the remaining fold, rotating K times',
          'K models are deleted',
          'The data is encrypted K times'
        ],
        correctIndex: 1,
        explanation: 'K-fold cross-validation rotates the validation fold across all samples, providing a low-variance performance estimate.'
      },
      {
        id: 'q2-9-5',
        question: 'Why should you NOT use the test set for early stopping?',
        options: [
          'Because early stopping requires validation data; using the test set contaminates it and invalidates it as an unbiased final benchmark',
          'Because test sets have no labels',
          'Because test sets are read-only on Linux',
          'Because Python forbids it with a syntax error'
        ],
        correctIndex: 0,
        explanation: 'Using the test set to decide when to stop training bleeds information into model selection, destroying test objectivity.'
      }
    ],
    revisionNotes: [
      '3-way split: Training (~70%), Validation (~15%), Testing (~15%).',
      'Validation data guides hyperparameter choices and early stopping.',
      'Parameters are learned automatically; Hyperparameters are chosen by engineers.'
    ]
  },

  // 10. Parametric approaches
  {
    id: 'les-2-10',
    moduleId: 'mod-2',
    title: '10. Parametric Approaches',
    slug: 'parametric-approaches',
    estimatedMinutes: 14,
    simpleDefinition: 'A Parametric Model makes a strong assumption about the functional form of the relationship, summarizing data into a fixed, finite number of parameters (weights) that does NOT grow as sample size increases.',
    whyItExists: 'When you have prior domain knowledge that a relationship is roughly linear or normal, parametric models are fast to train, require minimal memory, and execute lightning-fast inference on edge microcontrollers.',
    howItWorks: [
      'Assume a specific mathematical shape beforehand (e.g., a straight line $y = w \cdot x + b$ or a plane).',
      'The number of parameters is fixed: for $D$ features, a linear model has exactly $D+1$ parameters ($D$ weights plus 1 bias).',
      'Training estimates optimal numerical values for these fixed parameters.',
      'Once trained, the raw training data can be discarded; the model needs only the fixed weights to predict.'
    ],
    practicalExamples: [
      'Linear Regression: Fixed parameters $w_1, w_2, \dots, w_D$ and intercept $b$.',
      'Logistic Regression: Fixed parameters passed through the Sigmoid function.',
      'Linear Discriminant Analysis (LDA): Assumes Gaussian class distributions with shared covariance.',
      'Simple Perceptron: Fixed weight matrix $W$ and bias vector $b$.'
    ],
    commonMisconceptions: [
      {
        myth: 'Parametric models can fit any arbitrary curve if you give them enough data.',
        reality: 'If the true relationship is non-linear (like a circle or parabola), a linear parametric model will underfit forever, regardless of whether you feed it 100 rows or 100 billion rows.'
      },
      {
        myth: 'Parametric means "having no parameters".',
        reality: 'Parametric means the model has a fixed, predetermined parameter structure.'
      }
    ],
    conceptSummary: 'Parametric models summarize data into a fixed set of parameters: fast, compact, but constrained by strong structural assumptions.',
    interactiveExperienceType: 'parametric-vs-nonparametric',
    realWorldExample: {
      domain: 'Cardiac Pacemakers & Embedded Medical Devices',
      scenario: 'Implantable pacemakers monitor heart rhythms using a fixed 4-parameter logistic equation running on micro-watt batteries.',
      impact: 'Executes real-time arrhythmia detection for 10 years without requiring battery replacement surgery.'
    },
    keyTakeaways: [
      'Fixed parameter count: Number of parameters does NOT grow with dataset size $N$',
      'High Bias / Low Variance: Makes strong assumptions, resistant to overfitting on noise',
      'Extremely fast inference and minimal memory footprint'
    ],
    mathematics: {
      title: 'Parametric Linear Hypothesis Representation',
      latex: 'f(\\mathbf{x}; \\boldsymbol{\\theta}) = \\sum_{j=1}^D w_j x_j + b = \\mathbf{w}^T \\mathbf{x} + b',
      plainText: 'f(x; theta) = sum(w_j * x_j) + b = w^T * x + b',
      explanation: 'For any number of training samples N, the parameter set theta is strictly fixed to D+1 numbers.',
      breakdown: [
        { id: 'w', symbol: 'w', name: 'Weight Vector', description: 'D coefficients weighting each feature dimension' },
        { id: 'b', symbol: 'b', name: 'Scalar Bias', description: 'Offset constant independent of feature values' },
        { id: 'D', symbol: 'D', name: 'Dimensionality', description: 'Number of input features' }
      ]
    },
    pythonSnippet: {
      title: 'Parametric Model Discarding Training Data',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Large dataset of 10,000 samples
np.random.seed(42)
X_train = np.random.uniform(10, 100, (10000, 1))
y_train = 3.5 * X_train[:, 0] + 12.0 + np.random.normal(0, 2, 10000)

# Train parametric linear model
model = LinearRegression().fit(X_train, y_train)

# The model compresses 10,000 samples into just TWO numbers:
w = model.coef_[0]
b = model.intercept_
print(f"Compressed 10,000 samples into 2 parameters: w={w:.3f}, b={b:.3f}")

# Predict on new point using only w and b:
x_new = 50.0
prediction_manual = w * x_new + b
prediction_model = model.predict([[x_new]])[0]
print(f"Manual calculation (w*x + b): {prediction_manual:.2f}")
print(f"Model prediction:            {prediction_model:.2f}")
`,
      explanation: 'The parametric model discards all 10,000 training points and needs only w and b to perform inference.',
      expectedOutput: 'Compressed 10,000 samples into 2 parameters: w=3.500, b=12.016\nManual calculation (w*x + b): 187.01\nModel prediction:            187.01'
    },
    knowledgeCheck: [
      {
        id: 'q2-10-1',
        question: 'What defines a Parametric machine learning model?',
        options: [
          'It has no parameters',
          'It summarizes data into a fixed, predetermined number of parameters that does NOT grow as sample size N increases',
          'It requires 100 GPUs to train',
          'It can only be written in C++'
        ],
        correctIndex: 1,
        explanation: 'Parametric models use a fixed functional form whose parameter count is determined by feature count $D$, independent of sample count $N$.'
      },
      {
        id: 'q2-10-2',
        question: 'Which of the following is a classic example of a Parametric model?',
        options: [
          'Linear Regression',
          'K-Nearest Neighbors (KNN)',
          'Decision Tree with unlimited depth',
          'Kernel Density Estimation'
        ],
        correctIndex: 0,
        explanation: 'Linear regression assumes a flat linear hyperplane parameterized by a fixed weight vector $w$ and bias $b$.'
      },
      {
        id: 'q2-10-3',
        question: 'What is a major ADVANTAGE of parametric models?',
        options: [
          'They can fit any arbitrary complex curve without error',
          'They are computationally fast, require minimal memory, and have simple, interpretable mathematical forms',
          'They do not require training data',
          'They eliminate the need for test sets'
        ],
        correctIndex: 1,
        explanation: 'Parametric models compress data into a few numbers, enabling rapid inference and high interpretability.'
      },
      {
        id: 'q2-10-4',
        question: 'What is the primary DISADVANTAGE of parametric models?',
        options: [
          'They use too much RAM',
          'Strong structural assumptions: if the assumed shape (e.g. linear) does not match reality, the model suffers from high bias (underfitting)',
          'They cannot be saved to disk',
          'They only work with text data'
        ],
        correctIndex: 1,
        explanation: 'If the true relationship is non-linear, a linear parametric model is fundamentally incapable of bending to fit it.'
      },
      {
        id: 'q2-10-5',
        question: 'After training a linear regression model on 1,000,000 rows, does the model need to keep the 1,000,000 rows in memory for inference?',
        options: [
          'Yes, it must search through all rows for every prediction',
          'No, all historical data can be discarded; inference requires only the learned weight vector w and bias b',
          'It requires keeping at least half the rows',
          'Only on Tuesdays'
        ],
        correctIndex: 1,
        explanation: 'Parametric models compress historical data into learned weights; the raw data is discarded after training.'
      }
    ],
    revisionNotes: [
      'Parametric: Fixed number of parameters $\\theta$, independent of sample size $N$.',
      'Examples: Linear Regression, Logistic Regression, Naive Bayes.',
      'Fast and compact, but risks high bias if model assumptions are too rigid.'
    ]
  },

  // 11. Non-parametric approaches
  {
    id: 'les-2-11',
    moduleId: 'mod-2',
    title: '11. Non-Parametric Approaches',
    slug: 'non-parametric-approaches',
    estimatedMinutes: 14,
    simpleDefinition: 'A Non-Parametric Model does not make rigid assumptions about the mathematical shape of the function; instead, the model structure and capacity grow dynamically with the amount of training data.',
    whyItExists: 'Real-world relationships are often messy, multimodal, and non-linear. Non-parametric models provide the flexibility to conform to any arbitrary data geometry without forcing it into a straight line.',
    howItWorks: [
      'Make minimal prior assumptions about functional form $f(x)$.',
      'The effective number of parameters grows as you feed more training observations $N$.',
      'In memory-based methods (like KNN): Keep the training instances in memory and calculate local neighborhood distances at query time.',
      'In tree-based methods: Grow deeper branches and leaf partitions as more data samples arrive.'
    ],
    practicalExamples: [
      'K-Nearest Neighbors (KNN): Classifies queries based on the plurality vote of the $k$ closest stored data points.',
      'Decision Trees: Creates recursive orthogonal splits that increase in depth as data complexity grows.',
      'Kernel Support Vector Machines (RBF SVM): Uses kernel distance functions to construct arbitrary non-linear boundaries.',
      'Gaussian Processes: Defines distributions over functions that update with every observed sample.'
    ],
    commonMisconceptions: [
      {
        myth: '"Non-parametric" means the model has zero parameters.',
        reality: 'It means the parameters are not fixed in advance; the model has an infinite or data-dependent number of degrees of freedom.'
      },
      {
        myth: 'Non-parametric models are always better than parametric models.',
        reality: 'They require significantly more memory, are prone to overfitting on noise, and inference becomes slow as dataset size $N$ grows.'
      }
    ],
    conceptSummary: 'Non-parametric models make minimal structural assumptions: their complexity grows with data, allowing them to fit complex, arbitrary patterns.',
    interactiveExperienceType: 'parametric-vs-nonparametric',
    realWorldExample: {
      domain: 'Facial Identification Verification',
      scenario: 'Security checkpoints compare a live face scan against stored facial embedding vectors using K-Nearest Neighbors in high-dimensional vector space.',
      impact: 'Enables instant identification across 100,000 registered employees without retraining a neural network when a new person is hired.'
    },
    keyTakeaways: [
      'Non-parametric: Capacity and complexity grow with dataset size $N$',
      'Low Bias / High Variance: Can fit any arbitrary shape, but risks overfitting',
      'Inference scales with dataset size $\\mathcal{O}(N)$, requiring more memory'
    ],
    pythonSnippet: {
      title: 'K-Nearest Neighbors: Memory-Based Non-Parametric Inference',
      code: `from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Non-linear XOR-like clusters
X_train = np.array([
    [1, 1], [1, 2], [2, 1],       # Cluster A (Class 0)
    [8, 8], [8, 9], [9, 8],       # Cluster B (Class 0)
    [1, 8], [2, 9], [9, 1], [8, 2] # Scattered corners (Class 1)
])
y_train = np.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1])

# Non-parametric model stores all training points in memory
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Query test point near Cluster A
query = np.array([[1.5, 1.5]])
pred = knn.predict(query)[0]
distances, indices = knn.kneighbors(query)

print(f"Query Point: {query[0]}")
print(f"Predicted Class: {pred}")
print(f"3 Nearest Neighbors Indices: {indices[0]}")
print(f"Distances to 3 Nearest Neighbors: {distances[0].round(3)}")
`,
      explanation: 'KNN computes Euclidean distances to stored data points at query time rather than evaluating a pre-compiled equation.',
      expectedOutput: 'Query Point: [1.5 1.5]\nPredicted Class: 0\n3 Nearest Neighbors Indices: [0 2 1]\nDistances to 3 Nearest Neighbors: [0.707 0.707 0.707]'
    },
    knowledgeCheck: [
      {
        id: 'q2-11-1',
        question: 'What does "Non-Parametric" mean in machine learning?',
        options: [
          'The model contains zero code',
          'The model does not assume a fixed functional form; its capacity and complexity grow with the training data size N',
          'The model runs without an operating system',
          'The model cannot be evaluated'
        ],
        correctIndex: 1,
        explanation: 'Non-parametric models make flexible assumptions; their parameter representation expands as more data is provided.'
      },
      {
        id: 'q2-11-2',
        question: 'Which of the following is a classic Non-Parametric algorithm?',
        options: [
          'K-Nearest Neighbors (KNN)',
          'Linear Regression',
          'Logistic Regression',
          'Linear Discriminant Analysis'
        ],
        correctIndex: 0,
        explanation: 'KNN is an instance-based non-parametric algorithm that stores data samples and evaluates neighborhoods at inference time.'
      },
      {
        id: 'q2-11-3',
        question: 'What is a primary DISADVANTAGE of non-parametric instance-based models like KNN on massive datasets (e.g., 50 million rows)?',
        options: [
          'They cannot handle numbers',
          'Inference becomes slow and memory-intensive because the model must store and compute distances across millions of points for every prediction',
          'They are unable to fit curved boundaries',
          'They require Python 2'
        ],
        correctIndex: 1,
        explanation: 'Because instance-based models store training samples, query time scales as $\\mathcal{O}(N)$, making inference slow for large datasets.'
      },
      {
        id: 'q2-11-4',
        question: 'Why are non-parametric models generally more prone to overfitting than parametric models?',
        options: [
          'Because they are written in simpler code',
          'Because their high flexibility allows them to bend and conform to random noise and outliers in the training data',
          'Because they have no access to loss functions',
          'Because they run on CPUs'
        ],
        correctIndex: 1,
        explanation: 'High flexibility (low bias) allows non-parametric models to memorize noisy training anomalies unless constrained.'
      },
      {
        id: 'q2-11-5',
        question: 'How do you prevent a Decision Tree (a non-parametric model) from growing infinitely complex and overfitting?',
        options: [
          'By setting hyperparameters like max_depth, min_samples_split, or pruning branches',
          'By converting all numbers to text',
          'By deleting the test set',
          'By training for fewer epochs'
        ],
        correctIndex: 0,
        explanation: 'Constraining tree depth (pruning) restricts its capacity, forcing it to learn broad, generalizable decision rules.'
      }
    ],
    revisionNotes: [
      'Non-parametric: Capacity and complexity grow dynamically with data size $N$.',
      'Examples: K-Nearest Neighbors (KNN), Decision Trees, RBF Kernel SVMs.',
      'Flexible and low-bias, but memory-intensive and prone to overfitting.'
    ]
  },

  // 12. Model assumptions
  {
    id: 'les-2-12',
    moduleId: 'mod-2',
    title: '12. Model Assumptions',
    slug: 'model-assumptions',
    estimatedMinutes: 14,
    simpleDefinition: 'Model Assumptions (also called Inductive Bias) are the mathematical premises an algorithm takes for granted about the structure of data before it ever sees the training samples.',
    whyItExists: 'Without assumptions, an algorithm would have no logical basis to choose one hypothesis over another when generalizing to unseen data. Assumptions are the foundation that makes learning possible.',
    howItWorks: [
      'Linear Regression assumes: Linearity, homoscedasticity (constant error variance), normal residuals, and independent features.',
      'Naive Bayes assumes: All features are conditionally independent given the class label.',
      'K-Nearest Neighbors assumes: Proximity in Euclidean space implies similarity in target value.',
      'Convolutional Neural Networks (CNNs) assume: Spatial locality and translation invariance (a cat in the corner is the same as a cat in the center).'
    ],
    practicalExamples: [
      'Violated Linearity: Fitting a straight line to an S-shaped disease outbreak curve fails because the linearity assumption is violated.',
      'Violated Independence: Predicting stock prices using standard regression assumes rows are independent, ignoring temporal time-series auto-correlation.',
      'Violated Proximity: Using KNN with Euclidean distance on high-dimensional text without normalization fails due to the curse of dimensionality.'
    ],
    commonMisconceptions: [
      {
        myth: 'There is a model that makes zero assumptions about data.',
        reality: 'A model with zero assumptions cannot generalize. By definition, learning requires an inductive bias to prefer certain patterns over pure noise.'
      },
      {
        myth: 'If a model assumption is slightly violated, the model is completely useless.',
        reality: 'Naive Bayes assumes features are completely independent (which is almost never true in real text), yet it remains an effective spam classifier in practice.'
      }
    ],
    conceptSummary: 'Every machine learning algorithm relies on foundational assumptions about data geometry to generalize.',
    interactiveExperienceType: 'no-free-lunch-arena',
    realWorldExample: {
      domain: 'Algorithmic Financial Risk Modeling',
      scenario: 'Prior to the 2008 financial crisis, Gaussian Copula risk models assumed housing default correlations across different US states were independent.',
      impact: 'When national home prices fell simultaneously, the violated independence assumption caused catastrophic multi-trillion dollar risk miscalculations.'
    },
    keyTakeaways: [
      'Every algorithm has an Inductive Bias (built-in assumptions)',
      'If model assumptions match reality ➔ high accuracy and fast convergence',
      'If model assumptions contradict reality ➔ systematic high bias and failure'
    ],
    pythonSnippet: {
      title: 'Diagnosing Violated Residual Homoscedasticity in Linear Regression',
      code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Synthetic data where noise expands with X (Heteroscedasticity - violated assumption)
np.random.seed(42)
X = np.linspace(1, 10, 100).reshape(-1, 1)
noise = np.random.normal(0, X.flatten() * 0.5) # Noise grows with X!
y = 2.0 * X.flatten() + noise

model = LinearRegression().fit(X, y)
residuals = y - model.predict(X)

print(f"Model Learned Slope: {model.coef_[0]:.2f}")
print(f"Residual Std Dev at low X (X < 3):  {np.std(residuals[:30]):.2f}")
print(f"Residual Std Dev at high X (X > 7): {np.std(residuals[70:]):.2f}")
print("Violated assumption: Error variance is not constant (Heteroscedasticity).")
`,
      explanation: 'Residual variance quadruples from 1.07 to 4.29 as X increases, violating the classical linear regression homoscedasticity assumption.',
      expectedOutput: 'Model Learned Slope: 1.95\nResidual Std Dev at low X (X < 3):  1.07\nResidual Std Dev at high X (X > 7): 4.29\nViolated assumption: Error variance is not constant (Heteroscedasticity).'
    },
    knowledgeCheck: [
      {
        id: 'q2-12-1',
        question: 'What is "Inductive Bias" in machine learning?',
        options: [
          'A personal political opinion held by an engineer',
          'The set of foundational mathematical assumptions an algorithm makes to predict outputs for unseen inputs',
          'A hardware malfunction in GPUs',
          'A database error'
        ],
        correctIndex: 1,
        explanation: 'Inductive bias encompasses all prior assumptions an algorithm utilizes to generalize beyond observed training samples.'
      },
      {
        id: 'q2-12-2',
        question: 'What fundamental assumption does the Naive Bayes algorithm make about input features?',
        options: [
          'All features are completely independent of one another given the target class',
          'All features must be images',
          'All features are identical',
          'Features can never be negative'
        ],
        correctIndex: 0,
        explanation: 'The "Naive" in Naive Bayes refers to the strong assumption of conditional independence among all predictor features.'
      },
      {
        id: 'q2-12-3',
        question: 'What fundamental assumption does K-Nearest Neighbors make about distance?',
        options: [
          'Distance has no meaning',
          'Observations that are close to each other in feature space share similar target values',
          'All points are exactly 1 mile apart',
          'Points with large distances are always identical'
        ],
        correctIndex: 1,
        explanation: 'KNN assumes geometric proximity in feature space translates directly to similarity in target labels.'
      },
      {
        id: 'q2-12-4',
        question: 'What happens when you apply a linear model to data with an inherently non-linear concentric ring structure?',
        options: [
          'The model automatically invents a circle',
          'The model fails with high bias because its linearity assumption directly contradicts the data geometry',
          'The computer restarts',
          'The test accuracy reaches 100%'
        ],
        correctIndex: 1,
        explanation: 'When data geometry violates the algorithm\'s inductive bias, the model suffers from systematic underfitting.'
      },
      {
        id: 'q2-12-5',
        question: 'Can any machine learning algorithm learn and generalize with ZERO assumptions?',
        options: [
          'Yes, Deep Learning makes zero assumptions',
          'No, without assumptions an algorithm has no rational basis to prefer one pattern over another on unseen data',
          'Yes, if the dataset has over 1 billion rows',
          'Yes, using quantum computing'
        ],
        correctIndex: 1,
        explanation: 'Without inductive assumptions, all unobserved predictions are equally probable, making generalization mathematically impossible.'
      }
    ],
    revisionNotes: [
      'Model assumptions = Inductive Bias (prior geometric beliefs).',
      'Learning is impossible without inductive bias.',
      'Check model assumptions against real data properties to avoid systematic errors.'
    ]
  },

  // 13. Model complexity
  {
    id: 'les-2-13',
    moduleId: 'mod-2',
    title: '13. Model Complexity',
    slug: 'model-complexity',
    estimatedMinutes: 16,
    simpleDefinition: 'Model Complexity refers to the flexibility, expressive power, and capacity of a model to represent intricate, non-linear relationships.',
    whyItExists: 'Managing complexity is the central balancing act of machine learning: models that are too simple underfit the data (high bias), while models that are too complex memorize random noise (high variance/overfitting).',
    howItWorks: [
      'Low Complexity: Linear equations, shallow decision trees (depth=1). Rigid lines with high bias.',
      'High Complexity: 50-layer deep neural networks, high-degree polynomials ($x^{10}$), unpruned trees. Hyper-flexible curves with high variance.',
      'The Bias-Variance Tradeoff: As complexity increases, Training Error decreases monotonically toward 0, but Test Error forms a U-shaped curve.',
      'The Goal: Find the "sweet spot" at the bottom of the U-shaped validation error curve.'
    ],
    practicalExamples: [
      'Underfitting (Too Simple): Predicting house prices using only a straight line when the market has regional luxury plateaus.',
      'Overfitting (Too Complex): A 15th-degree polynomial that loops through every single outlier point, predicting negative prices between samples.',
      'Optimal Fit: A regularized gradient-boosted tree that captures general trends while ignoring individual noise spikes.'
    ],
    commonMisconceptions: [
      {
        myth: 'A more complex model with millions of parameters is always superior to a simpler model.',
        reality: 'If you lack sufficient data to constrain a complex model, it will overfit severely and perform worse than a simple linear regression.'
      },
      {
        myth: 'Overfitting only happens when you train for too many epochs.',
        reality: 'Overfitting is driven by model capacity relative to data size, noisy labels, and lack of regularization constraints.'
      }
    ],
    conceptSummary: 'Model complexity dictates flexibility: navigate the bias-variance tradeoff to find the optimal sweet spot minimizing test error.',
    interactiveExperienceType: 'model-complexity-tradeoff',
    realWorldExample: {
      domain: 'Weather Forecasting Models',
      scenario: 'Global climate simulations balance atmospheric mesh cell size: too coarse (100km cells) misses localized storm fronts (underfit); too fine (1cm cells) models individual turbulent air eddies with explosive chaotic error (overfit).',
      impact: 'Maintains reliable 7-day hurricane trajectory predictions within a 50-mile landfall cone.'
    },
    keyTakeaways: [
      'Underfitting (High Bias) = Model is too simple to capture true relationships',
      'Overfitting (High Variance) = Model is too flexible and memorizes noise',
      'Validation error forms a U-shaped curve; optimal generalization lies at the minimum'
    ],
    mathematics: {
      title: 'The Mathematical Bias-Variance Decomposition of Error',
      latex: '\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2',
      plainText: 'Total Expected Error = Bias^2 + Variance + Irreducible Error (sigma^2)',
      explanation: 'Total prediction error decomposes into three distinct components: squared bias, variance, and inherent environmental noise.',
      breakdown: [
        { id: 'bias', symbol: 'Bias^2', name: 'Squared Bias', description: 'Error from erroneous, oversimplified model assumptions' },
        { id: 'variance', symbol: 'Variance', name: 'Model Variance', description: 'Sensitivity to fluctuations in the specific training dataset' },
        { id: 'sigma', symbol: 'σ²', name: 'Irreducible Noise', description: 'Inherent randomness and measurement noise in the universe' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating Underfitting vs Overfitting with Polynomial Features',
      code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Synthetic true function: y = cos(1.5 * pi * x) + noise
np.random.seed(42)
x_train = np.sort(np.random.rand(20)).reshape(-1, 1)
y_train = np.cos(1.5 * np.pi * x_train[:, 0]) + np.random.randn(20) * 0.1

x_test = np.sort(np.random.rand(50)).reshape(-1, 1)
y_test = np.cos(1.5 * np.pi * x_test[:, 0]) + np.random.randn(50) * 0.1

for degree in [1, 4, 15]:
    poly = PolynomialFeatures(degree=degree)
    X_train_poly = poly.fit_transform(x_train)
    X_test_poly = poly.transform(x_test)
    
    m = LinearRegression().fit(X_train_poly, y_train)
    train_mse = mean_squared_error(y_train, m.predict(X_train_poly))
    test_mse = mean_squared_error(y_test, m.predict(X_test_poly))
    
    label = "UNDERFITTING (High Bias)" if degree==1 else ("OPTIMAL SWEET SPOT" if degree==4 else "OVERFITTING (High Var)")
    print(f"Degree {degree:2d} | Train MSE: {train_mse:.4f} | Test MSE: {test_mse:.4f} | {label}")
`,
      explanation: 'Degree 1 underfits (test error 0.18); Degree 4 finds the sweet spot (test error 0.01); Degree 15 overfits on noise (test error explodes to 12.87!).',
      expectedOutput: 'Degree  1 | Train MSE: 0.1782 | Test MSE: 0.1841 | UNDERFITTING (High Bias)\nDegree  4 | Train MSE: 0.0078 | Test MSE: 0.0124 | OPTIMAL SWEET SPOT\nDegree 15 | Train MSE: 0.0001 | Test MSE: 12.8741 | OVERFITTING (High Var)'
    },
    knowledgeCheck: [
      {
        id: 'q2-13-1',
        question: 'What are the two competing error components in the Bias-Variance Tradeoff?',
        options: [
          'Download Speed and Upload Speed',
          'Bias (error from oversimplified assumptions) and Variance (error from sensitivity to training set noise)',
          'CPU Heat and GPU Heat',
          'Memory Usage and Hard Drive Size'
        ],
        correctIndex: 1,
        explanation: 'Bias measures how far the model\'s average prediction is from truth; Variance measures how much predictions fluctuate across different training sets.'
      },
      {
        id: 'q2-13-2',
        question: 'What shape does the Validation/Test Error curve take as model complexity increases from 1 to 10?',
        options: [
          'A straight horizontal line',
          'A U-shaped curve that drops to a minimum sweet spot and then rises sharply due to overfitting',
          'A curve that drops to negative numbers',
          'A circle'
        ],
        correctIndex: 1,
        explanation: 'Test error forms a characteristic U-curve: high at low complexity (bias), lowest at the optimal tradeoff, and high again at excessive complexity (variance).'
      },
      {
        id: 'q2-13-3',
        question: 'What is the "Irreducible Error" (sigma^2) in the error decomposition formula?',
        options: [
          'A bug in the compiler',
          'The fundamental environmental noise, sensor imprecision, and unmeasured factors inherent to the real-world system that no model can ever eliminate',
          'An error that can be fixed by buying more RAM',
          'Zero error'
        ],
        correctIndex: 1,
        explanation: 'Irreducible error stems from natural stochastic noise and unobserved variables that cannot be predicted even by a perfect model.'
      },
      {
        id: 'q2-13-4',
        question: 'Which of the following techniques is commonly used to combat overfitting in high-complexity models?',
        options: [
          'Regularization (L1/L2 penalties), dropout, pruning, and gathering more training data',
          'Deleting the validation set',
          'Making the model 100x more complex',
          'Training on the test set'
        ],
        correctIndex: 0,
        explanation: 'Regularization penalizes large weights, constraining model capacity and preventing it from memorizing noise.'
      },
      {
        id: 'q2-13-5',
        question: 'If your model has high bias (underfitting), what should you do?',
        options: [
          'Increase model complexity (e.g. add polynomial features, increase tree depth, add neural layers)',
          'Make the model even simpler',
          'Throw away half your features',
          'Add heavier regularization penalties'
        ],
        correctIndex: 0,
        explanation: 'Underfitting means the model is too rigid; you must increase expressive capacity to capture the underlying pattern.'
      }
    ],
    revisionNotes: [
      'Total Error = $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$.',
      'Underfitting = High Bias; Overfitting = High Variance.',
      'Optimal complexity is located at the lowest point of the U-shaped validation error curve.'
    ]
  },

  // 14. No Free Lunch Theorem
  {
    id: 'les-2-14',
    moduleId: 'mod-2',
    title: '14. The No Free Lunch Theorem',
    slug: 'no-free-lunch-theorem',
    estimatedMinutes: 16,
    simpleDefinition: 'The No Free Lunch (NFL) Theorem is a foundational mathematical proof stating that when evaluated across all possible problem distributions, no single machine learning algorithm outperforms all others.',
    whyItExists: 'Engineers often waste time searching for a mythical "universal master algorithm". The NFL theorem establishes that high performance in one specific problem comes at the cost of lower performance in other problem domains.',
    howItWorks: [
      'Formulated mathematically by David Wolpert and William Macready in 1997.',
      'Every algorithm relies on an inductive bias (assumptions about data geometry).',
      'When an algorithm\'s assumptions align with the true data distribution (e.g., linear models on linear trends), it triumphs.',
      'When an algorithm\'s assumptions contradict the data distribution (e.g., linear models on concentric rings), it fails.',
      'Averaged across every mathematically conceivable data distribution in the universe, all learning algorithms perform identically to random guessing.'
    ],
    practicalExamples: [
      'Tabular Data: Tree ensembles (XGBoost, LightGBM) routinely beat deep neural networks with 10x faster training.',
      'Computer Vision: Convolutional Neural Networks outperform decision trees because spatial pixel locality matches their convolutional bias.',
      'High-Dimensional Sparse Text: Simple Linear Logistic Regression often beats complex Random Forests due to low variance.'
    ],
    commonMisconceptions: [
      {
        myth: 'The NFL theorem means all algorithms are equally good on real-world datasets.',
        reality: 'The theorem averages over ALL theoretical problems (including pure random static noise). Real-world problems have structure (smoothness, locality); our job is to pick the algorithm whose inductive bias matches real-world structure.'
      },
      {
        myth: 'Deep Learning disproved the No Free Lunch Theorem.',
        reality: 'Deep Learning is remarkably successful precisely because its architectural inductive biases (convolutions for vision, attention for sequences) match the physics of the physical universe.'
      }
    ],
    conceptSummary: 'The No Free Lunch Theorem proves that no single algorithm is universally superior: success depends on matching algorithm assumptions to data geometry.',
    interactiveExperienceType: 'no-free-lunch-arena',
    realWorldExample: {
      domain: 'Competitive Data Science (Kaggle Competitions)',
      scenario: 'In tabular financial forecasting, XGBoost and LightGBM dominate leaderboards. In medical image segmentation, U-Net CNNs dominate. In automated document translation, Transformers dominate.',
      impact: 'Demonstrates that experienced ML practitioners select algorithms tailored to data modality rather than using one tool for everything.'
    },
    keyTakeaways: [
      'No single algorithm is universally best across all problems (Wolpert & Macready, 1997)',
      'High performance in one domain requires specialized inductive bias',
      'The ML engineer\'s task is to understand data geometry and match the right algorithm'
    ],
    mathematics: {
      title: 'Formal Statement of the No Free Lunch Theorem',
      latex: '\\sum_{f} \\sum_{d} P(d|f) \\cdot \\mathcal{L}(A_1, d, f) = \\sum_{f} \\sum_{d} P(d|f) \\cdot \\mathcal{L}(A_2, d, f)',
      plainText: 'Sum over all f, d of [ Loss(Algorithm_1, d, f) ] = Sum over all f, d of [ Loss(Algorithm_2, d, f) ]',
      explanation: 'Averaged over all possible target functions f and datasets d, the expected performance of any algorithm A_1 is identical to any other algorithm A_2.',
      breakdown: [
        { id: 'f', symbol: 'f', name: 'Target Functions', description: 'The universe of all conceivable mathematical relationships' },
        { id: 'A1_A2', symbol: 'A₁, A₂', name: 'Distinct Algorithms', description: 'Any two learning procedures (e.g. Deep Neural Net vs Random Guessing)' },
        { id: 'L', symbol: 'L(A, d, f)', name: 'Generalization Error', description: 'Performance measured on unseen test samples' }
      ]
    },
    pythonSnippet: {
      title: 'Demonstrating the No Free Lunch Theorem Across 2 Contrasting Datasets',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import make_classification, make_circles
from sklearn.model_selection import cross_val_score

# Dataset 1: Clean Linear Separability
X_lin, y_lin = make_classification(n_samples=200, n_features=2, n_informative=2, n_redundant=0, random_state=42)

# Dataset 2: Non-Linear Concentric Circles (XOR problem)
X_circ, y_circ = make_circles(n_samples=200, factor=0.4, noise=0.1, random_state=42)

linear_model = LogisticRegression()
knn_model = KNeighborsClassifier(n_neighbors=5)

# Problem 1 Tournament:
score_lin_on_lin = cross_val_score(linear_model, X_lin, y_lin, cv=3).mean()
score_knn_on_lin = cross_val_score(knn_model, X_lin, y_lin, cv=3).mean()

# Problem 2 Tournament:
score_lin_on_circ = cross_val_score(linear_model, X_circ, y_circ, cv=3).mean()
score_knn_on_circ = cross_val_score(knn_model, X_circ, y_circ, cv=3).mean()

print("--- TOURNAMENT 1: Linear Dataset ---")
print(f"Linear Logistic Regression: {score_lin_on_lin * 100:.1f}% (WINNER!)")
print(f"K-Nearest Neighbors (KNN):  {score_knn_on_lin * 100:.1f}%")

print("\\n--- TOURNAMENT 2: Concentric Circles Dataset ---")
print(f"Linear Logistic Regression: {score_lin_on_circ * 100:.1f}% (FAILS - 50% random chance)")
print(f"K-Nearest Neighbors (KNN):  {score_knn_on_circ * 100:.1f}% (WINNER!)")
print("\\nProof: No single algorithm won both competitions!")
`,
      explanation: 'Linear regression wins on Problem 1 but fails completely on Problem 2; KNN wins on Problem 2. Demonstrating the No Free Lunch Theorem in code.',
      expectedOutput: '--- TOURNAMENT 1: Linear Dataset ---\nLinear Logistic Regression: 94.5% (WINNER!)\nK-Nearest Neighbors (KNN):  91.5%\n\n--- TOURNAMENT 2: Concentric Circles Dataset ---\nLinear Logistic Regression: 50.5% (FAILS - 50% random chance)\nK-Nearest Neighbors (KNN):  98.5% (WINNER!)\n\nProof: No single algorithm won both competitions!'
    },
    knowledgeCheck: [
      {
        id: 'q2-14-1',
        question: 'Who formulated the No Free Lunch Theorem for machine learning in 1997?',
        options: [
          'David Wolpert and William Macready',
          'Steve Jobs and Bill Gates',
          'Alan Turing and John von Neumann',
          'Ada Lovelace and Charles Babbage'
        ],
        correctIndex: 0,
        explanation: 'David Wolpert and William Macready published the foundational papers on optimization and supervised learning in 1997.'
      },
      {
        id: 'q2-14-2',
        question: 'What is the core conclusion of the No Free Lunch Theorem?',
        options: [
          'Engineers should never eat lunch at their desks',
          'No single learning algorithm is universally superior to all other algorithms across every conceivable problem distribution',
          'All models achieve 100% accuracy if trained long enough',
          'Linear regression is mathematically invalid'
        ],
        correctIndex: 1,
        explanation: 'The theorem states that when averaged over all possible mathematical problems, every algorithm has identical expected performance.'
      },
      {
        id: 'q2-14-3',
        question: 'If all algorithms perform equally on average across all theoretical problems, why does machine learning work so well in the real world?',
        options: [
          'Because real-world problems are not random noise; they possess natural geometric structure (smoothness, symmetry, locality) that matches our algorithms\' inductive biases',
          'Because computers run faster today',
          'Because Python ignores the theorem',
          'Because test sets are deleted'
        ],
        correctIndex: 0,
        explanation: 'Real-world data comes from physical laws with natural regularity. Algorithms with matching inductive biases triumph.'
      },
      {
        id: 'q2-14-4',
        question: 'What is the role of the machine learning engineer in light of the No Free Lunch Theorem?',
        options: [
          'To always use the same single algorithm for every project without testing',
          'To understand the geometry and domain characteristics of the problem and select/tune the algorithm with the most appropriate inductive bias',
          'To write random number generators',
          'To avoid evaluating models on test data'
        ],
        correctIndex: 1,
        explanation: 'Because no algorithm is universally best, the engineer\'s job is to match the algorithm to the specific problem geometry.'
      },
      {
        id: 'q2-14-5',
        question: 'In competitive data science benchmarks (like Kaggle), what family of algorithms typically dominates structured tabular datasets?',
        options: [
          'Gradient-Boosted Decision Trees (XGBoost, LightGBM, CatBoost)',
          'Convolutional Neural Networks',
          'Recurrent Neural Networks',
          'Linear Discriminant Analysis'
        ],
        correctIndex: 0,
        explanation: 'Gradient-boosted decision trees routinely beat deep neural networks on tabular datasets because their axis-aligned split bias matches tabular data.'
      }
    ],
    revisionNotes: [
      'No Free Lunch Theorem: No single algorithm is universally superior across all problems.',
      'Every algorithm relies on inductive assumptions.',
      'Success requires matching the algorithm\'s inductive bias to the data geometry.'
    ]
  }
];

export const MODULE_02_COMPREHENSIVE_QUIZ = [
  {
    id: 'm2-final-1',
    question: 'What is the fundamental mechanism through which machine learning models "learn"?',
    options: [
      'They memorize all rows verbatim like a relational database',
      'They iteratively adjust parameter weights along loss gradients to minimize prediction error on observed data',
      'They download human thoughts from the internet',
      'They compile Python into machine assembly'
    ],
    correctIndex: 1,
    explanation: 'Learning in ML is parameter optimization: tuning internal weights to minimize loss.'
  },
  {
    id: 'm2-final-2',
    question: 'In a rectangular dataset matrix X of shape (1000, 15), what do the numbers 1000 and 15 represent?',
    options: [
      '1,000 features and 15 observations',
      '1,000 observations (samples/rows) and 15 attributes (features/columns)',
      '1,000 training days and 15 test days',
      '1,000 model weights and 15 loss scores'
    ],
    correctIndex: 1,
    explanation: 'Shape convention is $(N, D)$: $N=1000$ rows (samples) and $D=15$ columns (features).'
  },
  {
    id: 'm2-final-3',
    question: 'What is the purpose of the 3-way data partition (Training, Validation, Testing)?',
    options: [
      'Training updates parameter weights; Validation tunes hyperparameters & triggers early stopping; Testing provides the locked final unbiased generalization audit',
      'All three partitions are merged together for training',
      'Testing updates weights; Validation formats tables; Training is discarded',
      'To make the dataset 3x larger'
    ],
    correctIndex: 0,
    explanation: 'The 3-way split decouples parameter learning from hyperparameter tuning and unbiased final evaluation.'
  },
  {
    id: 'm2-final-4',
    question: 'What distinguishes a Parametric model from a Non-Parametric model?',
    options: [
      'Parametric models have no parameters',
      'Parametric models summarize data into a fixed, predetermined number of parameters (e.g. Linear Regression); Non-parametric models have capacity that grows dynamically with data size N (e.g. KNN, Trees)',
      'Non-parametric models only run on supercomputers',
      'Parametric models never make mistakes'
    ],
    correctIndex: 1,
    explanation: 'Parametric models have a fixed parameter count independent of $N$; non-parametric model capacity scales with $N$.'
  },
  {
    id: 'm2-final-5',
    question: 'In the Bias-Variance Tradeoff, what happens when a model has excessive complexity (High Variance)?',
    options: [
      'The model is too simple to capture the relationship',
      'The model memorizes noise and anomalies specific to the training set, causing validation error to explode (Overfitting)',
      'The training loss increases to infinity',
      'The model becomes 100% accurate on all test datasets'
    ],
    correctIndex: 1,
    explanation: 'Excessive complexity causes high variance, where the model overfits to training noise.'
  },
  {
    id: 'm2-final-6',
    question: 'What does the No Free Lunch Theorem prove regarding algorithm selection?',
    options: [
      'There is one supreme master algorithm that beats all others for every possible task',
      'No single algorithm outperforms all others across all problem distributions; high performance in one problem requires matching the algorithm\'s inductive bias to the data geometry',
      'Algorithms are free to download on GitHub',
      'Linear models are always superior to neural networks'
    ],
    correctIndex: 1,
    explanation: 'The No Free Lunch Theorem proves that no algorithm is universally best across all possible problems.'
  },
  {
    id: 'm2-final-7',
    question: 'Why must you NEVER tune your model\'s hyperparameters using the holdout test set?',
    options: [
      'Because it causes data snooping/leakage, turning the test set into an indirect training set and destroying its ability to provide an unbiased generalization benchmark',
      'Because the computer will run out of memory',
      'Because test sets have no features',
      'Because the code will not compile'
    ],
    correctIndex: 0,
    explanation: 'Tuning hyperparameters on the test set contaminates it, giving falsely optimistic estimates of real-world performance.'
  },
  {
    id: 'm2-final-8',
    question: 'What is "Inductive Bias"?',
    options: [
      'An illegal bias in data collection',
      'The foundational mathematical assumptions an algorithm makes about the structure of the data to generalize beyond training observations',
      'A defect in computer processors',
      'A statistical test for prime numbers'
    ],
    correctIndex: 1,
    explanation: 'Inductive bias is the set of prior assumptions an algorithm utilizes to generalize to unseen inputs.'
  }
];

export const MODULE_02_METADATA: Module = {
  id: 'mod-2',
  trackId: 'track-foundations',
  title: 'Module 02: How Machine Learning Learns',
  slug: 'how-machine-learning-learns',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'GitFork',
  shortDescription: 'The mechanics of learning: dataset matrices, train/val/test splits, parametric vs non-parametric paradigms, model complexity, and the No Free Lunch Theorem.',
  description: 'Uncover the mathematical and architectural mechanics of how machine learning systems acquire knowledge from data. Master dataset dimensionality (rows and columns, samples and features), the critical 3-way partition (training, validation, testing), the architectural divide between parametric and non-parametric models, the bias-variance tradeoff curve, and why the No Free Lunch Theorem governs all algorithm selection.',
  estimatedHours: 6,
  prerequisites: [
    'Module 01: Introduction to Machine Learning',
    'Familiarity with basic 2D grids (rows and columns) and variables'
  ],
  objectives: [
    'Trace how parameter weights are optimized iteratively along loss gradients during learning',
    'Deconstruct dataset dimensionality into sample count N and feature dimensionality D',
    'Structure robust data partitions: Training (weights), Validation (hyperparameters), Testing (unbiased audit)',
    'Distinguish between Parametric (fixed parameter count) and Non-Parametric (data-dependent capacity) models',
    'Diagnose Underfitting (High Bias) vs Overfitting (High Variance) along the U-shaped validation error curve',
    'Apply the No Free Lunch Theorem to match algorithm inductive biases to problem geometries'
  ],
  badgeReward: {
    id: 'badge-learning-mechanic',
    title: 'Learning Mechanics Master',
    icon: 'GitFork',
    description: 'Mastered all 14 lessons on dataset structures, data partitioning, model complexity, and the No Free Lunch Theorem.'
  },
  lessons: MODULE_02_LESSONS,
  finalQuiz: MODULE_02_COMPREHENSIVE_QUIZ
};

