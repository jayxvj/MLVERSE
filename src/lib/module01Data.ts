import { Lesson, Module } from './types';

export const MODULE_01_LESSONS: Lesson[] = [
  // 1. What is Artificial Intelligence?
  {
    id: 'les-1-1',
    moduleId: 'mod-1',
    title: '1. What is Artificial Intelligence?',
    slug: 'what-is-artificial-intelligence',
    estimatedMinutes: 12,
    simpleDefinition: 'Artificial Intelligence (AI) is the broad science of building machines capable of performing tasks that typically require human intellect, such as reasoning, recognizing patterns, understanding language, and making decisions.',
    whyItExists: 'Human capacity is limited by biological constraints like fatigue, slow arithmetic processing, and inability to analyze millions of records simultaneously. AI exists to automate complex cognitive labor and discover knowledge beyond human bandwidth.',
    howItWorks: [
      'Define an objective goal or utility function for the computational agent.',
      'Perceive environment or ingest data through sensors, files, or API inputs.',
      'Process information using symbolic rules, statistical learning, or heuristic search.',
      'Select and execute optimal actions to maximize expected task success.'
    ],
    practicalExamples: [
      'Navigation GPS: A* search finding the fastest route through real-time traffic.',
      'Optical Character Recognition (OCR): Digitizing printed invoices into editable text.',
      'Game Bots: Chess engines evaluating 200 million board positions per second.',
      'Virtual Assistants: Voice assistants parsing acoustic speech into intent commands.'
    ],
    commonMisconceptions: [
      {
        myth: 'AI implies sentient, conscious computers with human emotions.',
        reality: 'Current AI is Narrow AI (ANI) — purely mathematical optimization algorithms designed for specific tasks with zero consciousness.'
      },
      {
        myth: 'AI always involves machine learning and neural networks.',
        reality: 'AI is a broad umbrella that includes rule-based systems, expert logic, and search algorithms that do not learn from data.'
      }
    ],
    conceptSummary: 'Artificial Intelligence is the parent discipline encompassing all computational techniques designed to simulate intelligent perception, reasoning, and automated decision-making.',
    interactiveExperienceType: 'ai-ml-dl-hierarchy',
    realWorldExample: {
      domain: 'Aviation Autopilot',
      scenario: 'Commercial aircraft fly >90% of cruising time via automated flight management systems that adjust control surfaces based on radar, pitot tubes, and gyro sensors.',
      impact: 'Reduces pilot cognitive fatigue and enables unprecedented global aviation safety records.'
    },
    keyTakeaways: [
      'AI is the general umbrella category, not a single algorithm',
      'Encompasses both symbolic (rule-based) and statistical (learning) paradigms',
      'Modern AI focuses on Narrow AI (performing specific tasks exceptionally well)'
    ],
    visualDiagramType: 'architecture',
    visualDiagramData: {
      nodes: [
        { id: 'perceive', label: '1. Environmental Inputs', description: 'Sensor data, video, text, numbers', type: 'input' },
        { id: 'reason', label: '2. Cognitive Engine', description: 'Rule logic, search, or neural inference', type: 'process' },
        { id: 'act', label: '3. Automated Decision', description: 'Action executed or prediction generated', type: 'output' }
      ],
      connections: [
        { from: 'perceive', to: 'reason', label: 'Feeds' },
        { from: 'reason', to: 'act', label: 'Executes' }
      ]
    },
    pythonSnippet: {
      title: 'Simple Rule-Based AI Agent (Thermostat)',
      code: `# Classical Rule-Based AI Agent
class SmartThermostatAgent:
    def __init__(self, target_temp=22.0):
        self.target = target_temp

    def decide_action(self, current_temp):
        if current_temp < self.target - 1.0:
            return "ACTIVATE_HEATER"
        elif current_temp > self.target + 1.0:
            return "ACTIVATE_COOLER"
        return "STANDBY"

agent = SmartThermostatAgent(target_temp=21.0)
current_sensor_reading = 18.5
decision = agent.decide_action(current_sensor_reading)
print(f"Sensor Reading: {current_sensor_reading}C -> Agent Action: {decision}")
`,
      explanation: 'This agent exhibits basic goal-seeking intelligence using declarative conditional logic without machine learning.',
      expectedOutput: 'Sensor Reading: 18.5C -> Agent Action: ACTIVATE_HEATER'
    },
    knowledgeCheck: [
      {
        id: 'q1-1-1',
        question: 'What is the relationship between Artificial Intelligence and Machine Learning?',
        options: [
          'Machine Learning is a subfield of Artificial Intelligence',
          'Artificial Intelligence is a subfield of Machine Learning',
          'They are exact synonyms for the same mathematical algorithm',
          'AI only works with physical robots, while ML is for websites'
        ],
        correctIndex: 0,
        explanation: 'AI is the broad discipline; Machine Learning is a specific subfield within AI that focuses on learning from data.'
      },
      {
        id: 'q1-1-2',
        question: 'Which of the following represents Narrow AI (Artificial Narrow Intelligence)?',
        options: [
          'A machine that can write poetry, drive a submarine, and experience genuine grief',
          'A computer vision system that inspects circuit boards for microscopic solder defects',
          'A human brain simulated inside a quantum computer',
          'A program with universal common sense'
        ],
        correctIndex: 1,
        explanation: 'Narrow AI excels at one specialized domain (like circuit board inspection) but cannot transfer that intelligence to unrelated tasks.'
      },
      {
        id: 'q1-1-3',
        question: 'Can an AI system function without using machine learning?',
        options: [
          'No, all AI requires deep neural networks',
          'Yes, rule-based expert systems and search trees solve problems using explicit logic without learning from datasets',
          'Only if the computer is disconnected from the internet',
          'No, Python requires scikit-learn for any AI'
        ],
        correctIndex: 1,
        explanation: 'Symbolic AI, expert systems, and graph search (like A*) are AI methods that rely on human-coded rules rather than data-driven learning.'
      },
      {
        id: 'q1-1-4',
        question: 'What was the historic significance of IBM Deep Blue defeating Garry Kasparov in 1997?',
        options: [
          'It proved computers had achieved human consciousness',
          'It proved that brute-force heuristic search and expert evaluation functions could beat the greatest human mind in chess',
          'It invented the internet',
          'It was the first artificial neural network'
        ],
        correctIndex: 1,
        explanation: 'Deep Blue used specialized chess hardware and Alpha-Beta search trees to evaluate positions rather than modern deep learning.'
      },
      {
        id: 'q1-1-5',
        question: 'Why does human society develop AI systems?',
        options: [
          'To replace human breathing',
          'To automate repetitive cognitive tasks, identify patterns in vast datasets, and solve computationally intractable problems',
          'Because computer screens require AI to light up',
          'To eliminate all mathematical formulas'
        ],
        correctIndex: 1,
        explanation: 'AI amplifies human capabilities by processing high-dimensional data at speeds and volumes impossible for humans.'
      }
    ],
    revisionNotes: [
      'AI is the broad field; ML and Deep Learning are specialized subsets.',
      'Narrow AI dominates today; General AI (AGI) remains theoretical.',
      'AI encompasses rule-based systems, heuristics, logic, and statistical models.'
    ]
  },

  // 2. What is Machine Learning?
  {
    id: 'les-1-2',
    moduleId: 'mod-1',
    title: '2. What is Machine Learning?',
    slug: 'what-is-machine-learning',
    estimatedMinutes: 14,
    simpleDefinition: 'Machine Learning (ML) is the science of training computers to identify patterns in historical data so they can make accurate predictions or decisions on new, unseen data without being explicitly programmed with manual rules.',
    whyItExists: 'When problems are too intricate, noisy, or constantly shifting for humans to write explicit if-else rules (like recognizing handwriting or detecting fraudulent banking behavior), machine learning algorithms automatically extract the mathematical relationships directly from example observations.',
    howItWorks: [
      'Gather historical examples containing features (inputs) and known answers (outputs).',
      'Select a learning algorithm that defines an adjustable mathematical hypothesis function.',
      'Run an optimization process that repeatedly measures prediction error and adjusts weights.',
      'Evaluate the converged model on separate holdout test data to verify generalization.'
    ],
    practicalExamples: [
      'Music Streaming: Recommending songs based on listening similarity across millions of users.',
      'E-commerce Pricing: Dynamically predicting the optimal price for hotel rooms based on seasonal demand.',
      'Medical Imaging: Detecting early signs of diabetic retinopathy from retinal photographs.',
      'Predictive Maintenance: Forecasting when industrial wind turbine bearings will fail based on vibration sensors.'
    ],
    commonMisconceptions: [
      {
        myth: 'Machine learning models memorize all training rows like a database lookup table.',
        reality: 'A properly trained model extracts underlying general statistical patterns; memorizing training data is called overfitting and destroys real-world performance.'
      },
      {
        myth: 'ML algorithms can learn without any human intervention or data cleaning.',
        reality: 'Data cleaning, feature engineering, and metric selection require deliberate human domain expertise.'
      }
    ],
    conceptSummary: 'Machine learning replaces rigid human-written boolean rules with statistical optimization: computers tune internal mathematical parameters based on observed training data to minimize prediction error.',
    interactiveExperienceType: 'animated-3d-pipeline',
    realWorldExample: {
      domain: 'Ride-Hailing ETA Prediction',
      scenario: 'Uber and Lyft estimate arrival times by analyzing billions of historical trip segments factoring in time of day, weather, construction, and traffic speed.',
      impact: 'Reduces customer pickup anxiety and optimizes fleet dispatching across metropolitan areas.'
    },
    keyTakeaways: [
      'ML models learn from examples rather than manual rule coding',
      'Arthur Samuel definition (1959): Giving computers the ability to learn without being explicitly programmed',
      'Generalization to new, unseen data is the ultimate measure of model quality'
    ],
    mathematics: {
      title: 'Tom Mitchell\'s Formal Definition of Machine Learning (1997)',
      latex: '\\text{A program learns from } E \\text{ with respect to } T \\text{ and } P \\text{ if } P(T) \\text{ improves with } E',
      plainText: 'A program learns from Experience (E) regarding Task (T) measured by Performance (P) if P on T improves with E.',
      explanation: 'If a computer performs Task T, its measured Performance P must increase as it is fed more Experience / Data E.',
      breakdown: [
        { id: 'T', symbol: 'T', name: 'Task', description: 'The specific job: e.g. classifying spam, predicting house prices' },
        { id: 'E', symbol: 'E', name: 'Experience', description: 'The training dataset of historical examples' },
        { id: 'P', symbol: 'P', name: 'Performance Metric', description: 'Quantitative score: e.g. Accuracy %, Mean Squared Error' }
      ]
    },
    pythonSnippet: {
      title: 'Learning from Data: A 4-Line Scikit-Learn Model',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Experience (E): Hours studied (X) and Exam Scores (y)
X_train = np.array([[1], [2], [3], [4], [5]])
y_train = np.array([40, 50, 60, 70, 80])

# Task (T): Learn relationship to predict score from hours
model = LinearRegression()
model.fit(X_train, y_train) # Training adjusts weights

# Performance (P): Predict on new student with 6 hours
new_student_hours = np.array([[6]])
predicted_score = model.predict(new_student_hours)[0]
print(f"Predicted Exam Score for 6 study hours: {predicted_score:.1f}%")
`,
      explanation: 'The model discovers slope w=10 and intercept b=30 directly from data pairs without anyone coding `score = hours * 10 + 30`.',
      expectedOutput: 'Predicted Exam Score for 6 study hours: 90.0%'
    },
    knowledgeCheck: [
      {
        id: 'q1-2-1',
        question: 'According to Tom Mitchell, a computer program is said to learn if its performance on Task T...',
        options: [
          'Remains constant over time regardless of updates',
          'Improves with Experience E as measured by Performance Metric P',
          'Is approved by an executive committee',
          'Consumes 100% of available CPU cores'
        ],
        correctIndex: 1,
        explanation: 'The classical formal definition states: performance on task T must improve with experience E according to measure P.'
      },
      {
        id: 'q1-2-2',
        question: 'Why is machine learning preferred over manual rules for facial recognition?',
        options: [
          'Because human faces cannot be photographed',
          'Because variations in lighting, facial angles, expressions, and aging create too many infinite permutations to write rules by hand',
          'Because machine learning uses less electricity than conditional statements',
          'Because rule-based code only runs on Linux'
        ],
        correctIndex: 1,
        explanation: 'Writing explicit rules for every pixel configuration across billions of diverse faces is impossible; ML models learn facial feature embeddings automatically.'
      },
      {
        id: 'q1-2-3',
        question: 'What is the critical goal of a machine learning model?',
        options: [
          'To memorize all training records perfectly',
          'To generalize accurately to new, previously unseen data samples',
          'To maximize the size of the generated binary file',
          'To avoid executing matrix multiplications'
        ],
        correctIndex: 1,
        explanation: 'The ultimate purpose of ML is generalization: producing correct outputs when fed novel, unencountered observations.'
      },
      {
        id: 'q1-2-4',
        question: 'Who coined the phrase "Machine Learning" in 1959?',
        options: [
          'Alan Turing',
          'Arthur Samuel',
          'Elon Musk',
          'Ada Lovelace'
        ],
        correctIndex: 1,
        explanation: 'Arthur Samuel coined the term in 1959 while developing a checkers-playing program at IBM.'
      },
      {
        id: 'q1-2-5',
        question: 'What happens if you feed low-quality, corrupted, or biased data into a machine learning algorithm?',
        options: [
          'The algorithm automatically repairs the data into perfect truth',
          'Garbage In, Garbage Out: the model will learn and replicate the flaws, producing inaccurate or biased predictions',
          'The computer will explode',
          'The model will achieve 100% accuracy'
        ],
        correctIndex: 1,
        explanation: 'Machine learning models mirror the statistical properties of their training data; flawed data inevitably yields flawed models.'
      }
    ],
    revisionNotes: [
      'Machine Learning derives parameters from data instead of hardcoded rules.',
      'Key triad: Task (T), Experience (E), Performance (P).',
      'The goal is generalization, not rote training data memorization.'
    ]
  },

  // 3. AI vs ML vs Deep Learning
  {
    id: 'les-1-3',
    moduleId: 'mod-1',
    title: '3. AI vs ML vs Deep Learning',
    slug: 'ai-vs-ml-vs-deep-learning',
    estimatedMinutes: 14,
    simpleDefinition: 'Think of nested Russian dolls: Artificial Intelligence is the outermost doll (any smart machine); Machine Learning is the doll inside it (machines that learn from data); and Deep Learning is the innermost doll (models using multi-layered artificial neural networks).',
    whyItExists: 'These three buzzwords are frequently conflated by media and marketing. Distinguishing their boundaries is vital for engineers to select the appropriate architectural tool for a given problem without unnecessary compute overhead.',
    howItWorks: [
      'AI represents the broad vision of smart machines dating back to 1950.',
      'ML emerged as a practical AI approach: feeding algorithms statistical data rather than writing thousands of rigid if-else rules.',
      'Deep Learning emerged when massive datasets and modern GPUs allowed neural networks with dozens of hidden layers to learn raw feature hierarchies automatically.'
    ],
    practicalExamples: [
      'AI (Rule-based): Tax calculation software navigating 10,000 statutory rules.',
      'ML (Statistical): Random Forest predicting employee turnover based on salary, tenure, and reviews.',
      'Deep Learning (Neural): Self-driving cars detecting pedestrians at night using raw camera pixel streams.'
    ],
    commonMisconceptions: [
      {
        myth: 'Deep Learning makes classical Machine Learning obsolete.',
        reality: 'For tabular data (spreadsheets, SQL databases), classical ML (XGBoost, Random Forests) frequently trains 100x faster and outperforms deep neural networks.'
      },
      {
        myth: 'All AI algorithms require GPUs.',
        reality: 'Rule-based systems and classical ML algorithms run comfortably on standard consumer CPUs.'
      }
    ],
    conceptSummary: 'AI is the universal category. Machine Learning is the data-driven branch of AI. Deep Learning is the neural network-driven branch of Machine Learning.',
    interactiveExperienceType: 'ai-ml-dl-hierarchy',
    realWorldExample: {
      domain: 'Customer Support Ecosystem',
      scenario: 'A company uses an automated phone tree (AI rule logic), a ticket urgency classifier (classical ML), and a conversational voice synthesizer (Deep Learning).',
      impact: 'Combines all three levels of the hierarchy to resolve customer inquiries in seconds.'
    },
    keyTakeaways: [
      'AI ⊃ ML ⊃ Deep Learning (Strict nested hierarchy)',
      'Classical ML requires manual feature engineering; DL learns representations automatically',
      'Choose the simplest tool that solves the problem: do not use DL when linear regression suffices'
    ],
    pythonSnippet: {
      title: 'Comparing Classical ML vs Neural Deep Learning in Code',
      code: `# 1. Classical ML: Scikit-learn Random Forest (Tabular features)
from sklearn.ensemble import RandomForestClassifier
import numpy as np

X_tabular = np.array([[25, 50000], [45, 120000], [30, 65000]]) # Age, Income
y_labels = np.array([0, 1, 0])

ml_model = RandomForestClassifier(n_estimators=10)
ml_model.fit(X_tabular, y_labels)
print(f"Classical ML Model Trained on {X_tabular.shape[1]} hand-crafted features.")

# 2. Deep Learning Concept: Layered transformation
def dense_layer(inputs, weights, bias):
    return np.maximum(0, np.dot(inputs, weights) + bias) # ReLU activation

print("Deep Learning applies stacked non-linear matrix transforms across depth.")
`,
      explanation: 'Classical ML operates directly on structured tabular features, while deep networks stack matrix transformations to extract latent representations from raw unstructured inputs.',
      expectedOutput: 'Classical ML Model Trained on 2 hand-crafted features.\nDeep Learning applies stacked non-linear matrix transforms across depth.'
    },
    knowledgeCheck: [
      {
        id: 'q1-3-1',
        question: 'Which of the following statements correctly captures the relationship between Deep Learning and Machine Learning?',
        options: [
          'Deep Learning is a specialized subfield of Machine Learning',
          'Machine Learning is a specialized subfield of Deep Learning',
          'They are competing technologies developed by different companies',
          'Deep Learning never uses data'
        ],
        correctIndex: 0,
        explanation: 'Deep Learning is a specific branch of Machine Learning that utilizes multi-layer artificial neural networks.'
      },
      {
        id: 'q1-3-2',
        question: 'What is a major advantage of Deep Learning over classical Machine Learning for images and audio?',
        options: [
          'Deep Learning does not require any computing power',
          'Deep Learning automatically learns feature representations from raw data, eliminating manual feature extraction',
          'Deep Learning works without any training data',
          'Deep Learning models are always 100% explainable'
        ],
        correctIndex: 1,
        explanation: 'In computer vision, DL discovers low-level edges, mid-level textures, and high-level objects automatically from raw pixels.'
      },
      {
        id: 'q1-3-3',
        question: 'If you have an Excel spreadsheet with 5,000 customer rows and 10 columns, which approach is generally recommended first?',
        options: [
          'A 50-layer Convolutional Neural Network running on a supercomputer',
          'A classical Machine Learning model like Logistic Regression or Random Forest',
          'Writing a custom compiler from scratch',
          'Quantum computing'
        ],
        correctIndex: 1,
        explanation: 'For tabular data of moderate size, classical ML is faster, highly interpretable, and often matches or beats deep learning.'
      },
      {
        id: 'q1-3-4',
        question: 'A chess program that explores a decision tree using minimax search with no data training belongs to which category?',
        options: [
          'Deep Learning',
          'Artificial Intelligence (Symbolic/Search), but not Machine Learning',
          'Quantum Neural Network',
          'Unsupervised Clustering'
        ],
        correctIndex: 1,
        explanation: 'Minimax search is a classical AI technique, but because it does not adjust parameters from a dataset, it is not Machine Learning.'
      },
      {
        id: 'q1-3-5',
        question: 'What does the word "Deep" in Deep Learning specifically refer to?',
        options: [
          'The philosophical depth of the computer\'s thoughts',
          'The number of sequential hidden layers stacked in the artificial neural network architecture',
          'The physical depth of underwater data centers',
          'The depth of the hard drive partition'
        ],
        correctIndex: 1,
        explanation: '"Deep" refers to the network architecture having multiple hidden layers (depth) between input and output.'
      }
    ],
    revisionNotes: [
      'Hierarchy: AI (broadest) > Machine Learning > Deep Learning (core).',
      'Classical ML excels at tabular datasets; DL dominates images, audio, and language.',
      'Always start with the simplest baseline before introducing deep architectures.'
    ]
  },

  // 4. Traditional Programming vs Machine Learning
  {
    id: 'les-1-4',
    moduleId: 'mod-1',
    title: '4. Traditional Programming vs Machine Learning',
    slug: 'traditional-vs-machine-learning',
    estimatedMinutes: 15,
    simpleDefinition: 'In Traditional Programming, humans write explicit rules and feed them data to calculate answers. In Machine Learning, humans feed the computer data and answers, and the computer calculates the rules (the model).',
    whyItExists: 'When real-world problems involve thousands of edge cases, sensor noise, or continuous human variation, manually coding every possible rule results in fragile, unmaintainable software. Flipping the paradigm allows the computer to solve the rules mathematically.',
    howItWorks: [
      'Classical flow: Data (Inputs) + Rules (Code written by human) ➔ Output (Answers).',
      'Machine Learning flow: Data (Inputs) + Answers (Ground Truth Labels) ➔ Model (Learned Rules).',
      'Inference flow: New Unseen Data ➔ Trained Model ➔ Predictive Answers.'
    ],
    practicalExamples: [
      'Spam Filtering: Hardcoded keyword lists (Traditional) vs Naive Bayes / Transformer (ML).',
      'Credit Underwriting: Fixed cutoff score table (Traditional) vs Gradient Boosted Tree risk scoring (ML).',
      'Autonomous Driving: "If red pixel in front stop" (Traditional, breaks in shadow) vs Computer Vision object detector (ML).'
    ],
    commonMisconceptions: [
      {
        myth: 'Machine learning will completely replace traditional programming.',
        reality: 'ML models are components inside traditional software: databases, web servers, authentication, and user interfaces are and will remain traditional code.'
      },
      {
        myth: 'Traditional programming is outdated and inferior.',
        reality: 'If a problem has clear, deterministic logic (like payroll calculation or currency arithmetic), traditional code is 100% exact, instant, and bug-free.'
      }
    ],
    conceptSummary: 'Traditional programming requires humans to craft explicit logic. Machine learning computes the logic statistically from paired examples.',
    interactiveExperienceType: 'prog-vs-ml',
    realWorldExample: {
      domain: 'Tax Calculation vs Tax Fraud Detection',
      scenario: 'Calculating standard sales tax follows deterministic rules (Traditional Programming). Flagging suspicious offshore shell company transaction webs requires pattern detection (Machine Learning).',
      impact: 'Combines exact legal compliance with proactive anomaly detection.'
    },
    keyTakeaways: [
      'Classical: Data + Rules = Answers',
      'Machine Learning: Data + Answers = Rules (Model)',
      'Use deterministic software for clear rules; use ML for statistical ambiguity'
    ],
    pythonSnippet: {
      title: 'Comparing the Two Paradigms Side-by-Side',
      code: `# 1. Traditional Programming Paradigm: Human writes the logic
def convert_celsius_to_fahrenheit_traditional(c):
    return (c * 9/5) + 32 # Human hardcoded the exact formula

# 2. Machine Learning Paradigm: Computer learns the formula from pairs
from sklearn.linear_model import LinearRegression
import numpy as np

# Examples (Data + Answers)
celsius_samples = np.array([[-40], [0], [10], [20], [100]])
fahrenheit_answers = np.array([-40, 32, 50, 68, 212])

ml_converter = LinearRegression()
ml_converter.fit(celsius_samples, fahrenheit_answers)

learned_slope = ml_converter.coef_[0]
learned_intercept = ml_converter.intercept_

print(f"Traditional exact: 25C = {convert_celsius_to_fahrenheit_traditional(25)}F")
print(f"ML learned formula: F = {learned_slope:.2f} * C + {learned_intercept:.2f}")
print(f"ML prediction for 25C: {ml_converter.predict([[25]])[0]:.1f}F")
`,
      explanation: 'The machine learning model deduces slope 1.8 (9/5) and intercept 32 directly from historical temperature pairs.',
      expectedOutput: 'Traditional exact: 25C = 77.0F\nML learned formula: F = 1.80 * C + 32.00\nML prediction for 25C: 77.0F'
    },
    knowledgeCheck: [
      {
        id: 'q1-4-1',
        question: 'Which equation correctly represents the traditional software engineering paradigm?',
        options: [
          'Data + Rules = Answers',
          'Data + Answers = Rules',
          'Rules + Answers = Data',
          'Hardware + Internet = Code'
        ],
        correctIndex: 0,
        explanation: 'In traditional programming, engineers write the rules, feed in data, and the program executes to produce answers.'
      },
      {
        id: 'q1-4-2',
        question: 'Which equation correctly represents the machine learning paradigm?',
        options: [
          'Data + Answers = Rules (Model)',
          'Data + Rules = Answers',
          'Answers - Data = Rules',
          'Rules + Code = Accuracy'
        ],
        correctIndex: 0,
        explanation: 'In machine learning, algorithms analyze historical data pairs (inputs + answers) to discover the underlying mathematical rules (the model).'
      },
      {
        id: 'q1-4-3',
        question: 'For which of the following problems should you use TRADITIONAL programming instead of machine learning?',
        options: [
          'Predicting customer churn probability over the next 6 months',
          'Calculating the exact total price of a shopping cart including 8.25% sales tax',
          'Recognizing spoken voice commands in noisy subway stations',
          'Detecting fraudulent credit card purchases'
        ],
        correctIndex: 1,
        explanation: 'Tax calculation is a deterministic mathematical rule. Machine learning should never be used where simple, exact arithmetic rules exist.'
      },
      {
        id: 'q1-4-4',
        question: 'What is the main drawback of writing rule-based software for natural language translation?',
        options: [
          'Computers cannot read text',
          'Human language contains millions of idioms, slang, context dependencies, and grammatical exceptions that break rigid rules',
          'Rule-based software runs too quickly',
          'Rules require GPU hardware'
        ],
        correctIndex: 1,
        explanation: 'Natural language is full of ambiguity, metaphors, and cultural evolution that overwhelm manual if-else rule writing.'
      },
      {
        id: 'q1-4-5',
        question: 'What is the artifact produced by the training phase of a machine learning workflow?',
        options: [
          'A compiled C compiler',
          'A Model: the algorithm instantiated with learned weights that acts as the prediction function',
          'A new physical computer chip',
          'A relational database schema'
        ],
        correctIndex: 1,
        explanation: 'Training produces a trained model—the parameters and mathematical function ready to make predictions on future inputs.'
      }
    ],
    revisionNotes: [
      'Traditional: human coders write rules; ML: algorithms learn rules from data.',
      'Use traditional deterministic code for accounting, tax, and exact formulas.',
      'Use machine learning for perception, fuzzy patterns, and high-dimensional noise.'
    ]
  },

  // 5. What is Data?
  {
    id: 'les-1-5',
    moduleId: 'mod-1',
    title: '5. What is Data?',
    slug: 'what-is-data',
    estimatedMinutes: 14,
    simpleDefinition: 'Data is information collected from the real world—such as numbers, text, images, timestamps, and audio recordings—stored digitally so algorithms can analyze patterns and learn from it.',
    whyItExists: 'Machine learning algorithms cannot learn in a vacuum; data is the raw fuel and historical experience from which statistical relationships are discovered.',
    howItWorks: [
      'Continuous numerical data represents real measurements (temperatures, prices, speed).',
      'Discrete categorical data represents distinct groups or classes (yes/no, color, postal code).',
      'Unstructured data (pixels, raw text, audio waves) is transformed into numeric vectors before algorithms can process it.'
    ],
    practicalExamples: [
      'Tabular Data: CSV spreadsheets containing customer demographics and purchase history.',
      'Time-Series Data: Heart rate monitor readings logged every 500 milliseconds.',
      'Spatial Data: GPS coordinates tracking delivery vehicles.',
      'Image Matrix Data: A 1080p camera snapshot stored as an array of RGB pixel brightness numbers from 0 to 255.'
    ],
    commonMisconceptions: [
      {
        myth: 'More data is always better than high-quality data.',
        reality: 'Massive amounts of noisy, mislabeled, or biased data will train a worse model than a smaller, meticulously curated dataset.'
      },
      {
        myth: 'Data is objective and free of human bias.',
        reality: 'Data reflects historical human practices, inequalities, and measurement flaws.'
      }
    ],
    conceptSummary: 'Data is the structured digital footprint of real-world observations: algorithms require clean, representative numerical representations to discover true relationships.',
    realWorldExample: {
      domain: 'Hospital Patient Telemetry',
      scenario: 'Intensive Care Units record blood pressure, oxygen saturation, temperature, and respiration every minute to train septic shock early-warning alarms.',
      impact: 'Gives clinicians up to 6 hours advance notice before life-threatening organ failure occurs.'
    },
    keyTakeaways: [
      'Data is divided into Structured (tabular) and Unstructured (images, text, audio)',
      'Data quality, freshness, and representativeness dictate the ceiling of model performance',
      'Garbage in, garbage out is the immutable law of machine learning'
    ],
    visualDiagramType: 'matrix',
    visualDiagramData: {
      nodes: [
        { id: 'num', label: 'Numerical Data', description: 'Continuous: 72.4kg | Discrete: 3 children', type: 'input' },
        { id: 'cat', label: 'Categorical Data', description: 'Nominal: Red/Blue | Ordinal: Small/Medium/Large', type: 'input' },
        { id: 'unstruct', label: 'Unstructured Data', description: 'Pixels, Text strings, Audio waveforms', type: 'input' },
        { id: 'tensor', label: '2D Feature Matrix (X)', description: 'Unified numbers consumable by algorithms', type: 'output' }
      ],
      connections: [
        { from: 'num', to: 'tensor' },
        { from: 'cat', to: 'tensor' },
        { from: 'unstruct', to: 'tensor' }
      ]
    },
    pythonSnippet: {
      title: 'Inspecting Data Types and Summaries with Pandas',
      code: `import pandas as pd

# Creating a sample clinical patient dataset
data = {
    'patient_id': [101, 102, 103, 104],
    'age': [45, 62, 29, 53],              # Numerical Continuous/Discrete
    'systolic_bp': [120, 142, 115, 138],   # Numerical Continuous
    'smoker': ['No', 'Yes', 'No', 'Yes'], # Categorical Binary
    'risk_tier': ['Low', 'High', 'Low', 'Medium'] # Categorical Ordinal
}

df = pd.DataFrame(data)
print("Dataset Structure:\\n", df)
print("\\nData Types:\\n", df.dtypes)
print("\\nMean Age:", df['age'].mean(), "years")
`,
      explanation: 'Pandas distinguishes between numeric columns (int64) and categorical text columns (object) that require numerical encoding before ML training.',
      expectedOutput: 'Dataset Structure:\n    patient_id  age  systolic_bp smoker risk_tier\n0         101   45          120     No       Low\n1         102   62          142    Yes      High\n2         103   29          115     No       Low\n3         104   53          138    Yes    Medium\n\nData Types:\n patient_id      int64\nage             int64\nsystolic_bp     int64\nsmoker         object\nrisk_tier      object\ndtype: object\n\nMean Age: 47.25 years'
    },
    knowledgeCheck: [
      {
        id: 'q1-5-1',
        question: 'Which of the following is an example of continuous numerical data?',
        options: [
          'A patient\'s body temperature (e.g., 37.2°C, 38.6°C)',
          'The color of a car (Red, Blue, Green)',
          'The number of pets in a house (0, 1, 2, 3)',
          'A person\'s zip code'
        ],
        correctIndex: 0,
        explanation: 'Body temperature can take on any fractional value on a continuous scale, making it continuous numerical data.'
      },
      {
        id: 'q1-5-2',
        question: 'What is the key difference between structured and unstructured data?',
        options: [
          'Structured data has no numbers',
          'Structured data is neatly organized into rows and columns (tables), while unstructured data includes images, video, and freeform text',
          'Unstructured data cannot be stored on hard drives',
          'Structured data is only used by Apple'
        ],
        correctIndex: 1,
        explanation: 'Structured data fits into predefined tabular schemas (rows and columns); unstructured data lacks predefined schema.'
      },
      {
        id: 'q1-5-3',
        question: 'Why must categorical values like "Yes" and "No" be converted to 1 and 0 before feeding into most ML algorithms?',
        options: [
          'Because English text is copyrighted',
          'Because machine learning models are mathematical functions that perform arithmetic calculations on numbers',
          'Because text takes up too much battery',
          'Because scikit-learn will crash without warning'
        ],
        correctIndex: 1,
        explanation: 'At their core, ML models evaluate algebraic operations ($w \cdot x + b$), requiring all inputs to be numerical.'
      },
      {
        id: 'q1-5-4',
        question: 'What does the principle "Garbage In, Garbage Out" mean in machine learning?',
        options: [
          'Old computers should be recycled',
          'If the training data is low quality, inaccurate, or biased, the resulting model will produce inaccurate and flawed predictions',
          'Models automatically delete bad data during training',
          'Trash collection schedules can be predicted with 100% precision'
        ],
        correctIndex: 1,
        explanation: 'Models learn the exact statistical distribution fed to them; errors or biases in data become errors in predictions.'
      },
      {
        id: 'q1-5-5',
        question: 'T-shirt sizes (Small, Medium, Large, Extra Large) are what type of data?',
        options: [
          'Continuous numeric',
          'Categorical Ordinal (categories with a natural logical order)',
          'Random noise',
          'Unstructured audio'
        ],
        correctIndex: 1,
        explanation: 'Ordinal data consists of distinct categories that possess an inherent ranking or order (Small < Medium < Large).'
      }
    ],
    revisionNotes: [
      'Data types: Numerical (Continuous & Discrete) and Categorical (Nominal & Ordinal).',
      'Unstructured data must be converted to numeric arrays or embeddings.',
      'Data preprocessing and cleaning occupy ~80% of real-world ML project time.'
    ]
  },

  // 6. What is an ML Algorithm?
  {
    id: 'les-1-6',
    moduleId: 'mod-1',
    title: '6. What is an ML Algorithm?',
    slug: 'what-is-an-ml-algorithm',
    estimatedMinutes: 14,
    simpleDefinition: 'An ML Algorithm is the mathematical recipe or procedure that determines HOW a computer adjusts its internal settings to learn patterns from training data.',
    whyItExists: 'Different problems require different learning strategies. Predicting a house price requires an algorithm that fits smooth lines; grouping unlabeled customers requires an algorithm that finds geometric clusters.',
    howItWorks: [
      'Receives training data (features and targets).',
      'Initializes adjustable parameters (weights and biases).',
      'Evaluates predictions against true answers using a loss function.',
      'Uses optimization calculus (like Gradient Descent) to tune parameters until error is minimized.'
    ],
    practicalExamples: [
      'Linear Regression: An algorithm that finds the best-fit straight hyperplane minimizing squared residuals.',
      'Decision Tree: An algorithm that repeatedly splits data using if-else questions to maximize purity.',
      'K-Means: An algorithm that iteratively shifts cluster centroids towards the mean of assigned data points.'
    ],
    commonMisconceptions: [
      {
        myth: 'An algorithm is the same thing as a model.',
        reality: 'The algorithm is the recipe (the learning procedure). The model is the cooked meal (the recipe executed on data with final learned weights).'
      },
      {
        myth: 'There is one master algorithm that is best for every single problem.',
        reality: 'The "No Free Lunch Theorem" in ML proves that no single algorithm outperforms all others across all possible problem domains.'
      }
    ],
    conceptSummary: 'An ML algorithm is the engine that executes the learning process: it specifies the mathematical hypothesis family and optimization strategy.',
    realWorldExample: {
      domain: 'Credit Scoring Engine',
      scenario: 'A bank runs the Logistic Regression algorithm on historical loan applicants to optimize weight parameters for debt, income, and payment history.',
      impact: 'Produces a stable, mathematically defensible underwriting model satisfying financial regulators.'
    },
    keyTakeaways: [
      'Algorithm = the learning procedure / recipe',
      'Model = the resulting trained mathematical artifact with learned parameters',
      'No Free Lunch Theorem: Match the algorithm to the geometry of your problem'
    ],
    pythonSnippet: {
      title: 'One Dataset, Two Different Learning Algorithms',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Training dataset: [Exam1_Score, Exam2_Score]
X = np.array([[30, 40], [45, 50], [70, 75], [85, 90]])
y = np.array([0, 0, 1, 1]) # 0 = Fail, 1 = Pass

# Algorithm A: Logistic Regression (Fits a smooth linear sigmoid boundary)
algo_a = LogisticRegression()
algo_a.fit(X, y)

# Algorithm B: Decision Tree (Fits orthogonal rectangular boundaries)
algo_b = DecisionTreeClassifier(max_depth=2)
algo_b.fit(X, y)

new_student = np.array([[60, 65]])
print("Logistic Regression Prediction:", algo_a.predict(new_student)[0])
print("Decision Tree Prediction:", algo_b.predict(new_student)[0])
`,
      explanation: 'Two completely different mathematical algorithms (sigmoid optimization vs recursive tree splitting) train on the same data.',
      expectedOutput: 'Logistic Regression Prediction: 1\nDecision Tree Prediction: 1'
    },
    knowledgeCheck: [
      {
        id: 'q1-6-1',
        question: 'What is the fundamental difference between an Algorithm and a Model?',
        options: [
          'They are exact synonyms',
          'An algorithm is the computational procedure/recipe that learns; a model is the finished artifact containing the learned weights',
          'An algorithm is written in Python, while a model is written in HTML',
          'Algorithms only run on databases'
        ],
        correctIndex: 1,
        explanation: 'The algorithm is the learning process; the model is the trained output resulting from applying that algorithm to data.'
      },
      {
        id: 'q1-6-2',
        question: 'What does the "No Free Lunch Theorem" state in machine learning?',
        options: [
          'Engineers must pay for cafeteria food',
          'No single learning algorithm is universally superior to all others across every conceivable problem',
          'All models require paid API keys',
          'Linear models never work'
        ],
        correctIndex: 1,
        explanation: 'Formulated by Wolpert and Macready, the theorem proves that every algorithm makes assumptions, and no single algorithm beats all others universally.'
      },
      {
        id: 'q1-6-3',
        question: 'Which of the following is an example of an ML algorithm rather than a dataset?',
        options: [
          'The MNIST handwritten digits database',
          'Gradient Descent optimization',
          'The 2020 US Census spreadsheet',
          'A CSV file containing real estate listings'
        ],
        correctIndex: 1,
        explanation: 'Gradient descent is an optimization algorithm; the others are datasets.'
      },
      {
        id: 'q1-6-4',
        question: 'What role does a loss function play inside a machine learning algorithm?',
        options: [
          'It deletes lost files from disk',
          'It mathematically measures how far off the algorithm\'s current predictions are from true answers so parameters can be updated',
          'It slows down the training process to save electricity',
          'It counts the number of lines of code'
        ],
        correctIndex: 1,
        explanation: 'The loss function provides the mathematical error score that guides parameter updates.'
      },
      {
        id: 'q1-6-5',
        question: 'Which component adjusts the weights during the execution of an algorithm like Gradient Descent?',
        options: [
          'A human typist pressing buttons',
          'Calculus partial derivatives (gradients) indicating the direction of steepest error descent',
          'A random number generator with no guidance',
          'The web browser rendering engine'
        ],
        correctIndex: 1,
        explanation: 'Partial derivatives indicate how changing each weight influences the error, allowing systematic optimization.'
      }
    ],
    revisionNotes: [
      'Algorithm = Procedure; Model = Trained Output.',
      'Loss functions measure error; Optimizers adjust parameters.',
      'Different algorithms make different geometric assumptions about data.'
    ]
  },

  // 7. What is a Model?
  {
    id: 'les-1-7',
    moduleId: 'mod-1',
    title: '7. What is a Model?',
    slug: 'what-is-a-model',
    estimatedMinutes: 14,
    simpleDefinition: 'A Model is the trained mathematical function created after an algorithm processes data. It contains specific learned numerical parameters (weights and biases) that allow it to take new inputs and calculate predictions.',
    whyItExists: 'We cannot retrain algorithms from scratch every time an application needs a prediction. A model is saved as a compact file that executes in milliseconds in production environments.',
    howItWorks: [
      'Before training: The model architecture has random or blank parameters (θ).',
      'During training: The algorithm tunes θ to minimize loss on training examples.',
      'After training: Parameters θ are frozen. The model is saved to disk (e.g. .pkl, .onnx, .pt).',
      'Inference: A user submits new features x; model computes ŷ = f(x; θ).'
    ],
    practicalExamples: [
      'House Valuation Model: The equation `Price = 175 * sqft + 18000 * beds + 65000`.',
      'Spam Classifier Model: A vocabulary table storing calibrated log-odds weights for 50,000 words.',
      'Voice Assistant Model: A 50-megabyte neural network weights file embedded directly on your smartphone.'
    ],
    commonMisconceptions: [
      {
        myth: 'A model is 100% accurate and always knows the truth.',
        reality: 'Statistican George Box famously noted: "All models are wrong, but some are useful." A model is an approximation of reality.'
      },
      {
        myth: 'A model continues learning automatically every time you query it.',
        reality: 'In standard production inference, model weights are frozen and static unless deliberately retrained via a dedicated retraining pipeline.'
      }
    ],
    conceptSummary: 'A model is a frozen mathematical function equipped with learned weights that takes feature inputs and outputs predictions.',
    interactiveExperienceType: 'house-price',
    realWorldExample: {
      domain: 'Smartphone Face Unlock',
      scenario: 'Apple\'s FaceID uses an on-device trained deep neural network model stored in the Secure Enclave that compares 30,000 infrared dot depth coordinates to your registered facial embedding in under 100 milliseconds.',
      impact: 'Enables seamless biometric security without sending private facial scans to external cloud servers.'
    },
    keyTakeaways: [
      'A model is the specific output produced by running an algorithm on a dataset',
      'Consists of: Mathematical architecture + Learned parameters (weights and biases)',
      'Can be saved to disk, deployed to servers, and called via REST APIs'
    ],
    pythonSnippet: {
      title: 'Saving and Loading a Trained Model Artifact',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# 1. Train model
X = np.array([[1000], [1500], [2000], [2500]])
y = np.array([200, 300, 400, 500]) # Price in $k

model = LinearRegression()
model.fit(X, y)

# 2. Inspect learned parameters (weights & bias)
weight = model.coef_[0]
bias = model.intercept_
print(f"Learned Weight (Slope): \${weight * 1000:.2f} per sqft")
print(f"Learned Bias (Intercept): \${bias * 1000:.2f}")

# 3. Model is now a frozen equation: y_hat = 0.2 * sqft + 0.0
new_house_sqft = 1800
predicted_price = model.predict([[new_house_sqft]])[0]
print(f"Inference on 1,800 sqft house: \${predicted_price:.1f}k")
`,
      explanation: 'The model is captured by two numbers: weight (0.2) and bias (0.0). Any computer with these two numbers can reproduce all predictions.',
      expectedOutput: 'Learned Weight (Slope): $200.00 per sqft\nLearned Bias (Intercept): $0.00\nInference on 1,800 sqft house: $360.0k'
    },
    knowledgeCheck: [
      {
        id: 'q1-7-1',
        question: 'What constitutes a trained machine learning model?',
        options: [
          'A web browser and a monitor',
          'A mathematical architecture instantiated with specific learned parameter weights and biases',
          'A database filled with all historical customer passwords',
          'A subscription to an internet service provider'
        ],
        correctIndex: 1,
        explanation: 'A model consists of the mathematical structure plus the numerical parameters (weights) learned during training.'
      },
      {
        id: 'q1-7-2',
        question: 'What famous aphorism by statistician George Box summarizes the nature of models?',
        options: [
          '"All models are perfect in the cloud"',
          '"All models are wrong, but some are useful"',
          '"Models never fail on Tuesdays"',
          '"If a model breaks, buy more RAM"'
        ],
        correctIndex: 1,
        explanation: 'George Box noted that models are simplified mathematical abstractions of messy reality; none are complete reflections of truth, but they are immensely useful.'
      },
      {
        id: 'q1-7-3',
        question: 'What happens to model parameters during standard production INFERENCE?',
        options: [
          'They are deleted to save space',
          'They remain frozen and static while calculating predictions on new incoming features',
          'They double in value with every API call',
          'They turn into SQL queries'
        ],
        correctIndex: 1,
        explanation: 'Inference uses fixed, frozen weights. Model parameters only change during explicit training or fine-tuning runs.'
      },
      {
        id: 'q1-7-4',
        question: 'Why do engineers serialize (save) models to files like .onnx, .pkl, or .pt?',
        options: [
          'So the model can be versioned, deployed to production microservices, and run inference without retraining',
          'Because Python cannot run without files',
          'To encrypt the internet',
          'To prevent users from viewing the website'
        ],
        correctIndex: 0,
        explanation: 'Model serialization allows decoupling the expensive training stage from lightweight, ultra-fast production inference.'
      },
      {
        id: 'q1-7-5',
        question: 'In the linear model equation Price = 175 * sqft + 65000, what is the number 175?',
        options: [
          'The learning rate',
          'The learned weight parameter for the square footage feature',
          'The random seed',
          'The number of rows in the dataset'
        ],
        correctIndex: 1,
        explanation: '175 is the learned slope/weight parameter multiplying the feature x (sqft).'
      }
    ],
    revisionNotes: [
      'A model is the specific trained function with learned parameters.',
      'Inference runs frozen weights to produce instantaneous predictions.',
      'Models are approximations of reality: "All models are wrong, but some are useful."'
    ]
  },

  // 8. Training, Testing and Prediction
  {
    id: 'les-1-8',
    moduleId: 'mod-1',
    title: '8. Training, Testing and Prediction',
    slug: 'training-testing-prediction',
    estimatedMinutes: 16,
    simpleDefinition: 'The three phases of the ML lifecycle: Training is when the algorithm learns patterns from historical data; Testing is evaluating the model on a hidden holdout exam it has never seen; and Prediction (Inference) is using the verified model on real-world inputs.',
    whyItExists: 'If you evaluate a student on the exact same practice questions they studied with the answers, you cannot tell if they understand the subject or simply memorized the answer key. Splitting data into Training and Testing sets prevents self-deception and catches overfitting.',
    howItWorks: [
      'Split raw dataset: Typically 80% for Training and 20% for Testing.',
      'Train: Algorithm adjusts weights strictly on the 80% training set.',
      'Test: Model predicts on the 20% holdout set with ground-truth answers hidden.',
      'Validate: Calculate test metrics (accuracy, MSE); if test score is high, deploy model for live prediction.'
    ],
    practicalExamples: [
      'Medical Diagnosis: Training on 10,000 patient records from 2020-2023; testing on 2,000 new patients from 2024.',
      'Autonomous Driving: Training in sunny California simulations; testing on icy Swedish winter road recordings.',
      'Credit Card Fraud: Training on January-October transactions; testing on November-December holiday shopping rushes.'
    ],
    commonMisconceptions: [
      {
        myth: 'A model with 100% training accuracy is a flawless model.',
        reality: '100% training accuracy usually signals catastrophic overfitting—the model memorized the training noise and will fail on unseen test data.'
      },
      {
        myth: 'You can test on the training data if the dataset is small.',
        reality: 'Testing on training data causes data snooping and destroys the validity of your evaluation.'
      }
    ],
    conceptSummary: 'Training optimizes internal weights. Testing measures true generalization on unseen holdout data. Prediction executes inference in production.',
    interactiveExperienceType: 'animated-3d-pipeline',
    realWorldExample: {
      domain: 'Pharmaceutical Drug Discovery',
      scenario: 'Bioinformatics models train on 500,000 known molecular bindings, then test on a completely withheld family of synthesized proteins to confirm if affinity predictions generalize.',
      impact: 'Shortens experimental lab synthesis timelines from 5 years to 6 months.'
    },
    keyTakeaways: [
      'Never evaluate a model solely on the data it was trained on',
      'Train/Test Split (e.g. 80/20) provides an honest benchmark of generalization',
      'Prediction (inference) is the ultimate operational goal'
    ],
    mathematics: {
      title: 'Train vs. Test Error Generalization Gap',
      latex: '\\text{Generalization Gap} = \\mathcal{L}_{\\text{test}}(\\theta) - \\mathcal{L}_{\\text{train}}(\\theta)',
      plainText: 'Generalization Gap = Loss_test - Loss_train',
      explanation: 'A small gap means the model generalizes well. A large gap where test loss is much higher than train loss indicates severe overfitting.',
      breakdown: [
        { id: 'L_test', symbol: 'L_test', name: 'Test Loss', description: 'Error measured on unseen holdout test samples' },
        { id: 'L_train', symbol: 'L_train', name: 'Train Loss', description: 'Error measured on samples used to update weights' }
      ]
    },
    pythonSnippet: {
      title: 'Executing a Train/Test Split with Scikit-Learn',
      code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
import numpy as np

# Generate synthetic dataset: 10 observations
X = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])
y = np.array([2.1, 3.9, 6.2, 8.1, 9.8, 12.2, 14.1, 15.9, 18.2, 20.1])

# 80% Train (8 samples), 20% Test (2 samples)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = Ridge()
model.fit(X_train, y_train)

# Evaluate performance on unseen test samples
test_predictions = model.predict(X_test)

print(f"Training samples count: {len(X_train)}")
print(f"Testing samples count: {len(X_test)}")
print(f"Unseen Test Inputs: {X_test.flatten()}")
print(f"Actual Test Targets: {y_test}")
print(f"Model Predictions:  {test_predictions.round(2)}")
`,
      explanation: 'The model has never seen X_test during training, giving an honest appraisal of predictive accuracy.',
      expectedOutput: 'Training samples count: 8\nTesting samples count: 2\nUnseen Test Inputs: [9 2]\nActual Test Targets: [18.2  3.9]\nModel Predictions:  [18.06  4.11]'
    },
    knowledgeCheck: [
      {
        id: 'q1-8-1',
        question: 'Why do machine learning practitioners split raw data into separate training and testing subsets?',
        options: [
          'Because computer hard drives cannot store more than 100 rows in one file',
          'To honestly assess how well the model generalizes to new, unseen data, avoiding memorization/overfitting',
          'Because Python commands require two files',
          'To reduce electricity costs during training'
        ],
        correctIndex: 1,
        explanation: 'Evaluating on unseen holdout data simulates real-world production performance.'
      },
      {
        id: 'q1-8-2',
        question: 'What is a typical split ratio used in machine learning workflows?',
        options: [
          '80% training, 20% testing',
          '5% training, 95% testing',
          '100% testing, 0% training',
          '50% training, 50% random guessing'
        ],
        correctIndex: 0,
        explanation: '80/20 (or 70/30) is the standard heuristic providing ample training data while maintaining statistically significant test sets.'
      },
      {
        id: 'q1-8-3',
        question: 'If a model achieves 99.8% accuracy on training data but drops to 54.0% accuracy on test data, what happened?',
        options: [
          'The model converged to the global optimum',
          'Severe Overfitting: the model memorized idiosyncrasies and noise in the training set and failed to generalize',
          'The testing data was deleted',
          'The learning rate was too low'
        ],
        correctIndex: 1,
        explanation: 'A massive gap between high training accuracy and low test accuracy is the hallmark definition of overfitting.'
      },
      {
        id: 'q1-8-4',
        question: 'What is "Data Leakage"?',
        options: [
          'A physical leak in server liquid cooling loops',
          'When information from the test dataset accidentally contaminates the training phase, artificially inflating test scores',
          'When users download CSV files from a dashboard',
          'When variables are printed to the console'
        ],
        correctIndex: 1,
        explanation: 'Data leakage happens when information from the target or test split leaks into the training pipeline, yielding deceitfully high test metrics.'
      },
      {
        id: 'q1-8-5',
        question: 'What is the "Prediction" or "Inference" phase of machine learning?',
        options: [
          'Writing the initial code repository',
          'Using the completed, trained model to calculate outputs for new real-world inputs in production',
          'Downloading a dataset from Kaggle',
          'Formatting a hard drive'
        ],
        correctIndex: 1,
        explanation: 'Prediction (also called inference) is the deployment phase where end-users submit queries and receive model outputs.'
      }
    ],
    revisionNotes: [
      'Three phases: Training (learning), Testing (evaluating), Prediction (inference).',
      'Never train on the test set; holdout sets reveal true generalization.',
      'High train accuracy + low test accuracy = overfitting.'
    ]
  },

  // 9. Features and Targets
  {
    id: 'les-1-9',
    moduleId: 'mod-1',
    title: '9. Features and Targets',
    slug: 'features-and-targets',
    estimatedMinutes: 14,
    simpleDefinition: 'Features are the input attributes or clues used to make a prediction (like house square footage or patient age), while the Target is the actual outcome or answer you want to predict (like the sale price or whether a disease is present).',
    whyItExists: 'Before any machine learning algorithm can execute, reality must be formalized into distinct predictor variables (the feature matrix X) and the designated answer variable (the target vector y).',
    howItWorks: [
      'Identify the real-world business objective: "What do we want to forecast?" ➔ That is your Target ($y$).',
      'Identify all measurable attributes available at prediction time: "What clues can we use?" ➔ Those are your Features ($X$).',
      'Structure into matrix $X$ of shape $(N, D)$ and vector $y$ of length $N$.'
    ],
    practicalExamples: [
      'Loan Approval: Features = Credit Score, Income, Debt, Employment Years; Target = Default (Yes/No).',
      'Customer Churn: Features = Monthly Usage, Support Tickets, Contract Length; Target = Churned (1 or 0).',
      'Crop Yield: Features = Rainfall, Soil Nitrogen, Sun Hours, Fertilizer; Target = Tons of Wheat harvested.'
    ],
    commonMisconceptions: [
      {
        myth: 'A column is permanently a feature or permanently a target across all problems.',
        reality: 'Whether a variable is a feature or a target depends entirely on your project objective. You can use age to predict income, or income to predict age.'
      },
      {
        myth: 'Including as many features as possible always improves performance.',
        reality: 'Irrelevant or redundant features introduce noise, increase variance, and cause the "Curse of Dimensionality".'
      }
    ],
    conceptSummary: 'Features ($X$) are the measurable inputs; Target ($y$) is the output variable to be predicted.',
    interactiveExperienceType: 'feature-target',
    realWorldExample: {
      domain: 'Used Car Marketplace (Carvana, AutoTrader)',
      scenario: 'To calculate instantaneous trade-in offers, the valuation model uses mileage, year, make, trim, accident history, and location as features to predict the target cash value.',
      impact: 'Allows instant automated online purchase offers without manual appraiser inspections.'
    },
    keyTakeaways: [
      'Features = X (matrix of predictors/attributes)',
      'Target = y (vector of ground-truth answers)',
      'Target type dictates the task: continuous target = Regression, categorical target = Classification'
    ],
    pythonSnippet: {
      title: 'Separating Features (X) and Target (y) in Python',
      code: `import pandas as pd

# Raw dataset
df = pd.DataFrame({
    'mileage': [45000, 12000, 95000, 31000],
    'year': [2018, 2022, 2014, 2020],
    'cylinders': [4, 6, 4, 4],
    'resale_price': [18500, 29000, 9200, 22400] # TARGET
})

# 1. Extract Features Matrix X (drop the target column)
X = df.drop(columns=['resale_price'])

# 2. Extract Target Vector y
y = df['resale_price']

print("Features Matrix X (Inputs):")
print(X)
print(f"X shape: {X.shape} (4 rows, 3 feature columns)")
print("\\nTarget Vector y (Output):")
print(y.values)
print(f"y shape: {y.shape} (4 target values)")
`,
      explanation: 'Separating X and y is the universal first step in preparing data for scikit-learn models.',
      expectedOutput: 'Features Matrix X (Inputs):\n   mileage  year  cylinders\n0    45000  2018          4\n1    12000  2022          6\n2    95000  2014          4\n3    31000  2020          4\nX shape: (4, 3) (4 rows, 3 feature columns)\n\nTarget Vector y (Output):\n[18500 29000  9200 22400]\ny shape: (4,) (4 target values)'
    },
    knowledgeCheck: [
      {
        id: 'q1-9-1',
        question: 'In a project predicting apartment rental prices, which of the following is the TARGET variable?',
        options: [
          'Square footage',
          'Monthly rental price in dollars',
          'Number of bathrooms',
          'Proximity to subway station'
        ],
        correctIndex: 1,
        explanation: 'The monthly rental price is the outcome you want to predict (the target); the other attributes are features.'
      },
      {
        id: 'q1-9-2',
        question: 'What mathematical notation is standardly used for the Feature Matrix and Target Vector?',
        options: [
          'Features = X (uppercase matrix), Target = y (lowercase vector)',
          'Features = A, Target = Z',
          'Features = ?, Target = !',
          'Features = HTML, Target = CSS'
        ],
        correctIndex: 0,
        explanation: 'By mathematical convention, a 2D matrix of features is written as uppercase X, and a 1D vector of targets is lowercase y.'
      },
      {
        id: 'q1-9-3',
        question: 'If a dataset has 1,000 customers and 8 attributes measured for each (age, income, balance, etc.), what is the shape of feature matrix X?',
        options: [
          '(8, 1000)',
          '(1000, 8)',
          '(1000, 1)',
          '(8, 8)'
        ],
        correctIndex: 1,
        explanation: 'Standard rows = samples (1,000) and columns = features (8), resulting in shape (1000, 8).'
      },
      {
        id: 'q1-9-4',
        question: 'What determines whether a column in a spreadsheet is a feature or a target?',
        options: [
          'The spreadsheet font size',
          'The specific business problem or question you are asking the machine learning model to solve',
          'The column name must always start with the letter T',
          'Target columns must always be on the far left'
        ],
        correctIndex: 1,
        explanation: 'The designated target is defined by your project objective—what you want the model to forecast.'
      },
      {
        id: 'q1-9-5',
        question: 'What is the risk of including "target leakage" features in X?',
        options: [
          'The model will take 10x longer to download',
          'The feature inadvertently contains the answer or historical information that will not exist at real prediction time, producing false high performance',
          'The computer will run out of hard drive space',
          'The target will turn into text'
        ],
        correctIndex: 1,
        explanation: 'If a feature contains information that only becomes available after the target event occurs, the model will cheat and fail in real life.'
      }
    ],
    revisionNotes: [
      'Features = X (predictors); Target = y (outcome to predict).',
      'Target type dictates the task: Continuous = Regression, Categorical = Classification.',
      'Always guard against feature target leakage.'
    ]
  },

  // 10. Input and Output Variables
  {
    id: 'les-1-10',
    moduleId: 'mod-1',
    title: '10. Input and Output Variables',
    slug: 'input-and-output-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'Input Variables are the raw data signals fed INTO the machine learning system, while Output Variables are the resulting values or classifications generated BY the model.',
    whyItExists: 'In engineering systems, modeling requires treating the algorithm as an information transfer function that maps an input vector space onto an output decision space.',
    howItWorks: [
      'System inputs: Features $x = [x_1, x_2, \dots, x_D]$.',
      'Internal transformation: $z = w_1 x_1 + w_2 x_2 + \dots + b$.',
      'System output: $\hat{y} = g(z)$ where $g$ is an activation or identity function.'
    ],
    practicalExamples: [
      'Speech-to-Text: Input = Audio waveform frequency amplitudes; Output = Transcribed text sentence.',
      'Weather Radar: Input = Atmospheric pressure, radar reflectivity, temperature; Output = Expected rain volume in mm.',
      'Smart Thermostat: Input = Outdoor temperature, motion sensor; Output = Heating valve angle (0% to 100%).'
    ],
    commonMisconceptions: [
      {
        myth: 'An ML model can only have a single output variable.',
        reality: 'While single-output models are common, multi-output regression and multi-label classification models output multiple variables simultaneously.'
      },
      {
        myth: 'Input variables must be completely independent from one another.',
        reality: 'Real-world inputs frequently correlate with each other (collinearity), which models handle through regularization.'
      }
    ],
    conceptSummary: 'Inputs are the sensory signals entering the model; Outputs are the calculated responses exiting the model.',
    realWorldExample: {
      domain: 'Automated Insulin Pumps',
      scenario: 'The continuous glucose monitor provides input glucose level readings every 5 minutes; the control model outputs the precise micro-unit insulin dose to deliver.',
      impact: 'Maintains optimal blood sugar levels for Type-1 diabetics automatically overnight.'
    },
    keyTakeaways: [
      'Inputs = Vector of observations $x \\in \\mathbb{R}^D$',
      'Outputs = Scalar or vector prediction $\\hat{y}$',
      'The model acts as an input-to-output mapping function $f: X \\to Y$'
    ],
    pythonSnippet: {
      title: 'Tracing Input to Output Transformation',
      code: `import numpy as np

# Input vector x: [study_hours, sleep_hours, practice_tests]
x_input = np.array([4.0, 7.5, 3.0])

# Model learned weights and bias
weights = np.array([5.5, 2.0, 4.0])
bias = 30.0

# Mathematical mapping f(x) = x · w + b
z = np.dot(x_input, weights) + bias
y_output = z # linear identity

print(f"Inputs: Hours={x_input[0]}, Sleep={x_input[1]}, Practice={x_input[2]}")
print(f"Calculated Model Output: {y_output:.1f}% Expected Exam Score")
`,
      explanation: 'The three input variables are combined through dot product arithmetic into a single numerical output prediction.',
      expectedOutput: 'Inputs: Hours=4.0, Sleep=7.5, Practice=3.0\nCalculated Model Output: 69.0% Expected Exam Score'
    },
    knowledgeCheck: [
      {
        id: 'q1-10-1',
        question: 'In a machine learning system, what is the role of an Input Variable?',
        options: [
          'It is the final score the user reads on screen',
          'It is an observed data signal fed into the model function to compute a prediction',
          'It deletes unwanted rows from RAM',
          'It compiles the Python script'
        ],
        correctIndex: 1,
        explanation: 'Input variables (features) are the predictor signals passed into the mathematical function.'
      },
      {
        id: 'q1-10-2',
        question: 'In an autonomous vehicle camera system, what is the primary input variable?',
        options: [
          'The vehicle loan interest rate',
          'The raw multi-dimensional matrix of pixel color values captured by the camera sensor',
          'The driver\'s credit score',
          'The weather in another country'
        ],
        correctIndex: 1,
        explanation: 'The camera feed generates a matrix of pixel intensity numbers that act as direct inputs to the vision model.'
      },
      {
        id: 'q1-10-3',
        question: 'Can a machine learning model produce multiple output variables simultaneously?',
        options: [
          'No, mathematics strictly forbids more than one output',
          'Yes, multi-target regression and multi-label classification models output vectors of multiple values',
          'Only if the model is running on two monitors',
          'Only in quantum computers'
        ],
        correctIndex: 1,
        explanation: 'Multi-output models simultaneously predict multiple targets (e.g. predicting both systolic and diastolic blood pressure).'
      },
      {
        id: 'q1-10-4',
        question: 'What is the standard notation for model output predictions compared to true ground-truth answers?',
        options: [
          'True answer = y, Predicted model output = ŷ (y-hat)',
          'True answer = 1, Predicted model output = 0',
          'True answer = X, Predicted model output = Z',
          'True answer = Input, Predicted model output = Output'
        ],
        correctIndex: 0,
        explanation: 'In statistics and ML, the circumflex hat symbol (ŷ) denotes the model\'s estimate of the true ground truth y.'
      },
      {
        id: 'q1-10-5',
        question: 'What is the relationship between inputs and outputs in a trained model?',
        options: [
          'They have zero correlation',
          'The model acts as a mapping function f: X ➔ y that transforms input coordinates into output predictions',
          'Inputs are created by outputs',
          'They must always be equal'
        ],
        correctIndex: 1,
        explanation: 'A model is formally a mapping function from input space to output space.'
      }
    ],
    revisionNotes: [
      'Inputs ($X$) are fed in; Outputs ($\hat{y}$) are computed.',
      'The circumflex hat ($\hat{y}$) denotes an estimated prediction.',
      'Models can be single-output or multi-output.'
    ]
  },

  // 11. Independent and Dependent Variables
  {
    id: 'les-1-11',
    moduleId: 'mod-1',
    title: '11. Independent and Dependent Variables',
    slug: 'independent-and-dependent-variables',
    estimatedMinutes: 14,
    simpleDefinition: 'The Independent Variables are the factors that change freely and stand on their own (the features), while the Dependent Variable is the factor whose value DEPENDS on the independent variables (the target).',
    whyItExists: 'This terminology comes from scientific experimentation and classical statistics, bridging the vocabulary of empirical science with modern data science.',
    howItWorks: [
      'In experiments: The scientist manipulates the independent variable (e.g., dosage of fertilizer).',
      'The dependent variable changes in response (e.g., plant growth height).',
      'In ML: Features = Independent variables; Target = Dependent variable.'
    ],
    practicalExamples: [
      'Physics: Time elapsed (Independent) vs Distance fallen by an object (Dependent).',
      'Economics: Central bank interest rate (Independent) vs Inflation rate (Dependent).',
      'Digital Ads: Ad spend budget (Independent) vs Sales revenue generated (Dependent).'
    ],
    commonMisconceptions: [
      {
        myth: 'Correlation between independent and dependent variables always proves direct physical causation.',
        reality: 'Correlation does not imply causation. Two variables may correlate due to an unmeasured third confounding variable (e.g., ice cream sales and shark attacks both correlate with summer heat).'
      },
      {
        myth: 'Independent variables in a dataset must have zero statistical correlation between each other.',
        reality: 'In observational datasets, independent variables frequently correlate (like house square footage and room count); the term "independent" refers to their role as predictors, not strict mathematical orthogonality.'
      }
    ],
    conceptSummary: 'Independent variables are the predictor inputs; the dependent variable is the outcome whose value depends on them.',
    realWorldExample: {
      domain: 'Clinical Pharmacology',
      scenario: 'In drug trials, dosage milligrams (Independent variable) is varied across patient cohorts to measure the resulting reduction in viral load (Dependent variable).',
      impact: 'Determines the minimum effective therapeutic dose while avoiding toxic side effects.'
    },
    keyTakeaways: [
      'Independent Variable = Feature = Predictor = X',
      'Dependent Variable = Target = Outcome = y',
      'Correlation between variables does not prove causal mechanism'
    ],
    pythonSnippet: {
      title: 'Analyzing Correlation Between Independent and Dependent Variables',
      code: `import pandas as pd

# Experimental study: Fertilizer (Independent) vs Plant Height (Dependent)
study = pd.DataFrame({
    'fertilizer_grams': [5, 10, 15, 20, 25, 30], # Independent Variable (X)
    'water_liters': [1.0, 1.2, 1.1, 1.5, 1.4, 1.6], # Independent Variable (X)
    'plant_height_cm': [12.4, 18.2, 24.1, 31.0, 35.8, 41.2] # Dependent Variable (y)
})

# Pearson correlation matrix
corr_matrix = study.corr()
print("Correlation Matrix:")
print(corr_matrix.round(3))
print(f"\\nCorrelation of Fertilizer with Plant Height: {corr_matrix.loc['fertilizer_grams', 'plant_height_cm']:.4f}")
`,
      explanation: 'The correlation of 0.998 shows an almost perfect positive linear relationship between the independent variable and dependent variable.',
      expectedOutput: 'Correlation Matrix:\n                  fertilizer_grams  water_liters  plant_height_cm\nfertilizer_grams             1.000         0.932            0.999\nwater_liters                 0.932         1.000            0.936\nplant_height_cm              0.999         0.936            1.000\n\nCorrelation of Fertilizer with Plant Height: 0.9989'
    },
    knowledgeCheck: [
      {
        id: 'q1-11-1',
        question: 'In an experiment testing how study hours affect exam grades, which is the DEPENDENT variable?',
        options: [
          'Study hours',
          'Exam grade',
          'The student\'s desk color',
          'The classroom lighting'
        ],
        correctIndex: 1,
        explanation: 'The exam grade is the dependent variable because its value is hypothesized to depend on the amount of study hours.'
      },
      {
        id: 'q1-11-2',
        question: 'Which of the following aligns terms correctly across scientific and machine learning terminology?',
        options: [
          'Independent Variable = Feature (X) | Dependent Variable = Target (y)',
          'Independent Variable = Target (y) | Dependent Variable = Feature (X)',
          'Independent Variable = Accuracy | Dependent Variable = Loss',
          'Independent Variable = CPU | Dependent Variable = GPU'
        ],
        correctIndex: 0,
        explanation: 'In scientific literature, predictors are independent variables (features); the outcome to be predicted is the dependent variable (target).'
      },
      {
        id: 'q1-11-3',
        question: 'Why does the phrase "Correlation does not imply causation" matter in machine learning?',
        options: [
          'Because machine learning models cannot calculate correlations',
          'Because an independent variable may strongly correlate with a dependent variable due to an unseen confounding factor rather than a true cause',
          'Because correlation is always zero in datasets',
          'Because causation is illegal in statistics'
        ],
        correctIndex: 1,
        explanation: 'Two variables can correlate strongly without one causing the other (e.g. ice cream sales and drowning incidents both rise in summer due to hot weather).'
      },
      {
        id: 'q1-11-4',
        question: 'In a housing dataset, if square footage increases and price increases proportionally, how is their relationship described?',
        options: [
          'Zero correlation',
          'Positive correlation',
          'Negative correlation',
          'Inverse correlation'
        ],
        correctIndex: 1,
        explanation: 'When both variables increase together in the same direction, they exhibit positive correlation.'
      },
      {
        id: 'q1-11-5',
        question: 'If car age increases and resale value drops, how is their relationship described?',
        options: [
          'Negative (Inverse) correlation',
          'Positive correlation',
          'Random correlation',
          'Zero correlation'
        ],
        correctIndex: 0,
        explanation: 'When one variable increases while the other decreases, they exhibit negative (inverse) correlation.'
      }
    ],
    revisionNotes: [
      'Independent Variable = Feature (X); Dependent Variable = Target (y).',
      'Positive correlation = move together; Negative correlation = move in opposite directions.',
      'Correlation describes statistical association, not physical causality.'
    ]
  },

  // 12. Function Approximation
  {
    id: 'les-1-12',
    moduleId: 'mod-1',
    title: '12. Function Approximation',
    slug: 'function-approximation',
    estimatedMinutes: 16,
    simpleDefinition: 'Function Approximation is the mathematical view of machine learning: nature has a hidden rule $y = f^*(x)$ that generated our data, and our job is to find an adjustable mathematical formula $\hat{f}(x; \theta)$ that gets as close as possible to nature\'s true rule.',
    whyItExists: 'In real life, we rarely know the exact physics or equations behind complex phenomena (like consumer behavior or disease progression). Function approximation allows us to learn an effective mathematical proxy purely from observational examples.',
    howItWorks: [
      'Assume nature generated observed pairs $(x_i, y_i)$ via $y = f^*(x) + \\epsilon$ where $\\epsilon$ is random noise.',
      'Choose a model family: e.g. Linear $\\hat{f}(x) = w x + b$ or Multi-Layer Neural Network.',
      'Tune parameters $\\theta$ to minimize distance between model curve $\\hat{f}(x)$ and observed points.',
      'According to the Universal Approximation Theorem, deep neural networks can approximate any continuous function to arbitrary precision given enough neurons.'
    ],
    practicalExamples: [
      'Physics: Approximating the aerodynamic drag curve of a novel aircraft wing geometry.',
      'Finance: Approximating the non-linear option pricing surface across different strike prices and maturities.',
      'Robotics: Approximating the inverse kinematics mapping joint angles to 3D gripper position.'
    ],
    commonMisconceptions: [
      {
        myth: 'A good approximating function must pass through every single observed data point.',
        reality: 'Real data contains measurement noise; forcing the curve to pass through every point causes severe overfitting.'
      },
      {
        myth: 'Linear models can approximate complex curved relationships.',
        reality: 'Linear models are constrained to flat hyperplanes (high bias / underfitting) unless non-linear features or polynomial transformations are applied.'
      }
    ],
    conceptSummary: 'Machine learning is function approximation: tuning mathematical parameters to closely mimic the unknown natural law that generated the data.',
    interactiveExperienceType: 'function-approx',
    realWorldExample: {
      domain: 'Acoustic Noise-Canceling Headphones',
      scenario: 'External microphones measure ambient acoustic sound waves; the digital signal processor executes an approximating function that generates the exact inverse anti-noise waveform in real-time.',
      impact: 'Cancels out ambient engine drone and background chatter.'
    },
    keyTakeaways: [
      'ML models are mathematical function approximators $\\hat{y} \\approx f(x; \\theta)$',
      'The Universal Approximation Theorem guarantees neural networks can approximate any continuous non-linear curve',
      'Balancing underfitting (too simple) and overfitting (too wiggly) is the core goal'
    ],
    mathematics: {
      title: 'The Universal Approximation Formalization',
      latex: '|f^*(x) - \\hat{f}(x; \\theta)| < \\epsilon, \\quad \\forall x \\in K',
      plainText: '|f*(x) - f_hat(x; theta)| < epsilon for all x in compact set K',
      explanation: 'For any continuous target function f* and tolerance epsilon > 0, there exists a feedforward network f_hat with non-linear activations that approximates f* within epsilon.',
      breakdown: [
        { id: 'f_star', symbol: 'f*(x)', name: 'True Nature Function', description: 'The actual underlying physical relationship' },
        { id: 'f_hat', symbol: 'f̂(x; θ)', name: 'Model Approximator', description: 'Our learned mathematical hypothesis' },
        { id: 'eps', symbol: 'ε', name: 'Tolerance Error', description: 'Arbitrarily small approximation error bound' }
      ]
    },
    pythonSnippet: {
      title: 'Polynomial Non-Linear Function Approximation',
      code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# Noisy quadratic data: y ≈ 0.5*x^2 + 2
x = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.5, 4.1, 6.4, 10.2, 14.5])

# 1. Linear approximation (Underfitting)
linear_model = LinearRegression().fit(x, y)

# 2. Degree-2 Polynomial approximation (Captures curvature)
poly = PolynomialFeatures(degree=2)
x_poly = poly.fit_transform(x)
poly_model = LinearRegression().fit(x_poly, y)

test_x = np.array([[6]])
pred_linear = linear_model.predict(test_x)[0]
pred_poly = poly_model.predict(poly.transform(test_x))[0]

print(f"Linear Approximation Prediction for x=6: {pred_linear:.2f} (Underfit)")
print(f"Polynomial Approximation Prediction for x=6: {pred_poly:.2f} (Accurate curve)")
`,
      explanation: 'Adding polynomial features allows the linear model to bend and accurately approximate the non-linear parabolic curve.',
      expectedOutput: 'Linear Approximation Prediction for x=6: 16.54 (Underfit)\nPolynomial Approximation Prediction for x=6: 19.98 (Accurate curve)'
    },
    knowledgeCheck: [
      {
        id: 'q1-12-1',
        question: 'What is the core intuition behind "Function Approximation" in machine learning?',
        options: [
          'All software is an approximation of Microsoft Windows',
          'The model acts as an adjustable mathematical formula that approximates the unknown natural relationship mapping inputs to outputs',
          'Computers only approximate numbers because integers don\'t exist',
          'Functions are deleted after training'
        ],
        correctIndex: 1,
        explanation: 'Machine learning views learning as finding a parameterized mathematical function $\hat{f}(x; \theta)$ that closely estimates the true relationship $f^*(x)$.'
      },
      {
        id: 'q1-12-2',
        question: 'What does the Universal Approximation Theorem prove regarding Artificial Neural Networks?',
        options: [
          'Neural networks can cure any disease',
          'A feedforward network with a single hidden layer and non-linear activations can approximate any continuous function to arbitrary precision given enough neurons',
          'Linear models are always better than neural networks',
          'Neural networks do not require training data'
        ],
        correctIndex: 1,
        explanation: 'Formulated by Cybenko (1989) and Hornik (1991), the theorem proves neural networks have the mathematical capacity to represent any continuous non-linear curve.'
      },
      {
        id: 'q1-12-3',
        question: 'What happens when a model has "High Bias" (Underfitting)?',
        options: [
          'The model curve is too rigid and simple (e.g. straight line on a curved trend), failing to capture the underlying pattern',
          'The model passes through every noise point perfectly',
          'The model uses too many GPUs',
          'The model has zero error'
        ],
        correctIndex: 0,
        explanation: 'High bias occurs when the model assumptions are overly simplistic, causing it to underfit the true underlying function.'
      },
      {
        id: 'q1-12-4',
        question: 'What happens when a model has "High Variance" (Overfitting)?',
        options: [
          'The model is too simple',
          'The model curve is excessively complex and wiggly, memorizing random noise in the training data rather than the true general trend',
          'The model runs out of memory',
          'The model predicts the same constant number for everything'
        ],
        correctIndex: 1,
        explanation: 'High variance occurs when an overly flexible model captures random noise variations specific only to the training set.'
      },
      {
        id: 'q1-12-5',
        question: 'Why can\'t stacking multiple linear layers without activation functions approximate curved functions?',
        options: [
          'Because linear algebra forbids it: the composition of linear transformations is always mathematically identical to a single linear transformation',
          'Because Python crashes on linear functions',
          'Because curves cannot be drawn on screens',
          'Because linear layers are too expensive'
        ],
        correctIndex: 0,
        explanation: '$W_2(W_1 x) = (W_2 W_1) x = W_{comb} x$. Non-linear activation functions (like ReLU) are strictly required to create non-linear function approximators.'
      }
    ],
    revisionNotes: [
      'Machine Learning = Function Approximation ($y \approx f(X; \theta)$).',
      'Universal Approximation Theorem guarantees neural capacity.',
      'Non-linear activation functions allow networks to bend and fit curves.'
    ]
  },

  // 13. Types of Machine Learning — Introduction
  {
    id: 'les-1-13',
    moduleId: 'mod-1',
    title: '13. Types of Machine Learning — Introduction',
    slug: 'types-of-machine-learning-introduction',
    estimatedMinutes: 16,
    simpleDefinition: 'Machine learning is divided into three primary paradigms: Supervised Learning (learning with a teacher and labeled answers), Unsupervised Learning (discovering hidden patterns with no labels), and Reinforcement Learning (learning through trial-and-error reward signals).',
    whyItExists: 'Not all real-world problems arrive with neat ground-truth labels. Understanding the three paradigms allows engineers to match business problems to the appropriate learning setup.',
    howItWorks: [
      'Supervised Learning: Trained on paired $(X, y)$ examples. Predicts continuous quantities (Regression) or discrete categories (Classification).',
      'Unsupervised Learning: Trained solely on $X$ without $y$. Discovers natural groupings (Clustering) or compact representations (Dimensionality Reduction).',
      'Reinforcement Learning: An agent takes actions $A$ in an environment $S$ to maximize cumulative numerical reward $R$.'
    ],
    practicalExamples: [
      'Supervised: Predicting house sale prices (Regression) or detecting melanoma in skin biopsies (Classification).',
      'Unsupervised: Grouping 50,000 grocery shoppers into purchasing personas (K-Means Clustering).',
      'Reinforcement: Training an autonomous drone to stabilize against wind gusts or DeepMind\'s AlphaGo mastering board games.'
    ],
    commonMisconceptions: [
      {
        myth: 'Reinforcement learning is just supervised learning with a different name.',
        reality: 'In supervised learning, the correct answer is known immediately for each sample; in RL, the agent must explore through trial and error with delayed rewards.'
      },
      {
        myth: 'Unsupervised learning can predict future stock prices without historical stock data.',
        reality: 'Unsupervised learning finds internal structure and density, not external predictive labels.'
      }
    ],
    conceptSummary: 'Supervised learning maps inputs to known answers; Unsupervised learning finds intrinsic geometry; Reinforcement learning masters actions via rewards.',
    realWorldExample: {
      domain: 'Autonomous Self-Driving Vehicles',
      scenario: 'Tesla and Waymo use Supervised Learning for pedestrian detection, Unsupervised Learning for road surface anomaly clustering, and Reinforcement Learning for smooth lane merging policies.',
      impact: 'Combines all three paradigms into a unified production autonomous driving stack.'
    },
    keyTakeaways: [
      'Supervised: Has labels $y$ (Classification & Regression)',
      'Unsupervised: No labels, only features $X$ (Clustering & Dimensionality Reduction)',
      'Reinforcement: Agent, Environment, Actions, and Rewards ($S, A, R$)'
    ],
    visualDiagramType: 'architecture',
    visualDiagramData: {
      nodes: [
        { id: 'sup', label: '1. Supervised Learning', description: 'Labeled Data (X, y) ➔ Predicts Categories or Values', type: 'input' },
        { id: 'unsup', label: '2. Unsupervised Learning', description: 'Unlabeled Data (X) ➔ Discovers Clusters & Structure', type: 'process' },
        { id: 'rl', label: '3. Reinforcement Learning', description: 'Agent Loop ➔ Action, State, Reward Optimization', type: 'output' }
      ],
      connections: [
        { from: 'sup', to: 'unsup', label: 'Complementary' },
        { from: 'unsup', to: 'rl', label: 'Integrated' }
      ]
    },
    pythonSnippet: {
      title: 'Quick Demonstration of Supervised vs Unsupervised Syntax',
      code: `import numpy as np

# Sample 2D data points
X = np.array([[1, 2], [1, 4], [2, 2], [8, 7], [9, 8], [8, 9]])

# 1. Supervised Learning requires labels y:
y = np.array([0, 0, 0, 1, 1, 1]) # Ground truth categories
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression().fit(X, y)
print("Supervised Prediction for [2, 3]:", clf.predict([[2, 3]])[0])

# 2. Unsupervised Learning takes ONLY X with NO labels:
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=2, n_init=10, random_state=42).fit(X)
print("Unsupervised Discovered Clusters:", kmeans.labels_)
`,
      explanation: 'Notice how KMeans fits strictly on X without any y labels, while LogisticRegression requires both X and y.',
      expectedOutput: 'Supervised Prediction for [2, 3]: 0\nUnsupervised Discovered Clusters: [1 1 1 0 0 0]'
    },
    knowledgeCheck: [
      {
        id: 'q1-13-1',
        question: 'Which machine learning paradigm requires data paired with known ground-truth answers (labels) during training?',
        options: [
          'Supervised Learning',
          'Unsupervised Learning',
          'Reinforcement Learning',
          'Autonomous Search'
        ],
        correctIndex: 0,
        explanation: 'Supervised learning explicitly requires paired training data $(X, y)$ where $y$ represents the true answers.'
      },
      {
        id: 'q1-13-2',
        question: 'Grouping 100,000 retail customers into spending personas with NO pre-existing labels is what type of task?',
        options: [
          'Binary Classification',
          'Unsupervised Clustering',
          'Linear Regression',
          'Reinforcement Policy Learning'
        ],
        correctIndex: 1,
        explanation: 'Discovering inherent groupings from unlabeled features is the textbook definition of unsupervised clustering.'
      },
      {
        id: 'q1-13-3',
        question: 'An AI agent learning to navigate a robotic arm by receiving +10 points for picking up a box and -5 points for dropping it is using which paradigm?',
        options: [
          'Supervised Regression',
          'Reinforcement Learning',
          'Unsupervised Dimensionality Reduction',
          'Static Rule Systems'
        ],
        correctIndex: 1,
        explanation: 'Reinforcement learning optimizes an agent\'s actions through trial and error governed by reward and penalty signals.'
      },
      {
        id: 'q1-13-4',
        question: 'Predicting whether a patient has Diabetes (Yes or No) based on blood glucose and BMI is what type of supervised task?',
        options: [
          'Continuous Regression',
          'Binary Classification',
          'K-Means Clustering',
          'Markov Decision Process'
        ],
        correctIndex: 1,
        explanation: 'When the target consists of discrete category tags (Yes/No), it is a classification problem.'
      },
      {
        id: 'q1-13-5',
        question: 'Predicting the exact sale price of a house ($345,200) based on location and size is what type of supervised task?',
        options: [
          'Regression',
          'Multi-class Classification',
          'Reinforcement Q-Learning',
          'Principal Component Analysis'
        ],
        correctIndex: 0,
        explanation: 'When the target is a continuous numerical value on a scale, it is a regression problem.'
      }
    ],
    revisionNotes: [
      'Supervised: Learns mapping $X \to y$ (Classification & Regression).',
      'Unsupervised: Finds structure in $X$ without $y$ (Clustering & PCA).',
      'Reinforcement: Agent learns optimal actions to maximize reward in an environment.'
    ]
  }
];

export const MODULE_01_COMPREHENSIVE_QUIZ = [
  {
    id: 'm1-final-1',
    question: 'What is the fundamental difference between traditional programming and machine learning?',
    options: [
      'Traditional programming only runs on Windows, while ML runs on Linux',
      'Traditional programming uses Data + Rules to produce Answers; Machine Learning uses Data + Answers to produce Rules (Models)',
      'Traditional programming uses math, while machine learning does not',
      'Machine learning requires writing all if-else conditions by hand'
    ],
    correctIndex: 1,
    explanation: 'Traditional programming executes human-written rules; machine learning computes the rules (parameters) from data.'
  },
  {
    id: 'm1-final-2',
    question: 'Which of the following correctly describes the relationship between AI, Machine Learning, and Deep Learning?',
    options: [
      'Deep Learning is the broadest field, which contains AI, which contains ML',
      'AI is the broad umbrella discipline; Machine Learning is a subset of AI; Deep Learning is a subset of Machine Learning using deep neural networks',
      'They are identical terms with no hierarchy',
      'Machine Learning was invented in 2023, while AI was invented in 1800'
    ],
    correctIndex: 1,
    explanation: 'AI is the outer universe, ML is the data-driven subfield, and Deep Learning is the neural network subfield of ML.'
  },
  {
    id: 'm1-final-3',
    question: 'In a real estate valuation project, what are the property attributes (square footage, bedrooms, year built)?',
    options: [
      'Target variables (y)',
      'Features or Independent Variables (X)',
      'Loss functions',
      'Model architectures'
    ],
    correctIndex: 1,
    explanation: 'The descriptive clues/inputs are the features or independent variables (X).'
  },
  {
    id: 'm1-final-4',
    question: 'Why must models be evaluated on a holdout test dataset that was excluded from training?',
    options: [
      'To prevent the computer from running out of memory',
      'To verify that the model can generalize to new, unseen data rather than merely memorizing the training samples',
      'Because Python commands require two files to run',
      'To ensure training error is always zero'
    ],
    correctIndex: 1,
    explanation: 'Holdout testing prevents self-deception and catches overfitting by testing true generalization.'
  },
  {
    id: 'm1-final-5',
    question: 'What does the Universal Approximation Theorem guarantee regarding artificial neural networks?',
    options: [
      'They will achieve 100% real-world accuracy on every stock market trade',
      'A feedforward neural network with non-linear activation functions has the mathematical capacity to approximate any continuous function to arbitrary precision',
      'They never need training data',
      'They make classical computers obsolete'
    ],
    correctIndex: 1,
    explanation: 'The theorem proves that neural networks are universal mathematical function approximators.'
  },
  {
    id: 'm1-final-6',
    question: 'Predicting whether an incoming email is "Spam" or "Legitimate" is an example of what type of task?',
    options: [
      'Continuous Regression',
      'Binary Classification',
      'Unsupervised Clustering',
      'Reinforcement Game Policy'
    ],
    correctIndex: 1,
    explanation: 'Choosing between two discrete category tags (Spam vs Legitimate) is binary classification.'
  },
  {
    id: 'm1-final-7',
    question: 'What is the trained output artifact produced after an ML algorithm optimizes parameters on a dataset?',
    options: [
      'A Model',
      'A Compiler',
      'A Hard Drive Partition',
      'A GPU Driver'
    ],
    correctIndex: 0,
    explanation: 'Training produces a trained model—the mathematical function equipped with learned weights ready for inference.'
  },
  {
    id: 'm1-final-8',
    question: 'What is "Overfitting"?',
    options: [
      'When a computer monitor is too small for a chart',
      'When a model memorizes random noise and idiosyncrasies in the training data, performing poorly on unseen test data',
      'When an algorithm trains too quickly',
      'When a dataset has too many rows'
    ],
    correctIndex: 1,
    explanation: 'Overfitting occurs when high model complexity causes it to memorize training noise, ruining generalization.'
  }
];

export const MODULE_01_METADATA: Module = {
  id: 'mod-1',
  trackId: 'track-foundations',
  title: 'Module 01: Introduction to Machine Learning',
  slug: 'introduction-to-machine-learning',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'Cpu',
  shortDescription: 'The comprehensive absolute-beginner foundation: from AI vs ML hierarchies and data representations to function approximation and pipeline mechanics.',
  description: 'Master the core foundational mental models of artificial intelligence and machine learning. Learn why data-driven learning replaces brittle rule-based software, how algorithms optimize parameter weights, how to formulate features vs targets, and explore the three major machine learning paradigms through 13 interactive lessons.',
  estimatedHours: 6,
  prerequisites: [
    'No prior programming or machine learning experience required',
    'Basic high-school arithmetic and curiosity about intelligence'
  ],
  objectives: [
    'Articulate the precise boundaries between Artificial Intelligence, Machine Learning, and Deep Learning',
    'Contrast traditional rule-based software with data-driven statistical pattern optimization',
    'Structure real-world business problems into Features (X) and Target (y) representations',
    'Trace the complete end-to-end ML lifecycle: Data ➔ Algorithm ➔ Training ➔ Model ➔ Prediction',
    'Understand function approximation, underfitting vs overfitting, and train/test holdout validation',
    'Distinguish between Supervised Learning, Unsupervised Learning, and Reinforcement Learning'
  ],
  badgeReward: {
    id: 'badge-paradigm-shift',
    title: 'Foundations Pioneer',
    icon: 'Cpu',
    description: 'Mastered all 13 foundational lessons and comprehensive assessment of Module 01.'
  },
  lessons: MODULE_01_LESSONS,
  finalQuiz: MODULE_01_COMPREHENSIVE_QUIZ
};

