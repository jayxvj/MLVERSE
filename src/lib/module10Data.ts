// Module 10 Data - End-to-End ML Project Lab (12 Lessons)
import { Lesson, Module, QuizQuestion } from './types';

export const MODULE_10_LESSONS: Lesson[] = [
  {
    "id": "les-10-1",
    "moduleId": "mod-10",
    "title": "1. Introduction to End-to-End ML Projects",
    "slug": "intro-end-to-end-ml-projects",
    "estimatedMinutes": 10,
    "simpleDefinition": "An end-to-end ML project is the complete journey from understanding a business problem to deploying a trained model that delivers real-world value.",
    "whyItExists": "Individual ML concepts only become useful when combined into a coherent pipeline. End-to-end projects teach you how each stage feeds the next and where real-world complexity emerges.",
    "howItWorks": [
      "Define the business problem and success criteria clearly before touching any data.",
      "Collect, explore, and clean the dataset to understand its structure and quality.",
      "Engineer features and prepare the data for modeling through encoding and scaling.",
      "Select, train, and evaluate candidate models using appropriate metrics.",
      "Iterate on model improvements and prepare for deployment."
    ],
    "practicalExamples": [
      "A real estate company predicting house prices to automate property valuations.",
      "An email provider classifying messages as spam or legitimate to protect users."
    ],
    "commonMisconceptions": [
      {
        "myth": "ML projects are mainly about choosing the right algorithm.",
        "reality": "Data preparation typically consumes 60-80% of project effort. Algorithm selection is important but secondary to data quality."
      }
    ],
    "conceptSummary": "End-to-end ML projects integrate problem definition, data preparation, modeling, evaluation, and deployment into one cohesive workflow.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Cross-Industry ML Deployment",
      "scenario": "A logistics company built an end-to-end ML pipeline predicting delivery delays by combining weather APIs, traffic data, and historical shipment records.",
      "impact": "Reduced late deliveries by 34% in the first quarter, saving an estimated $2.1M in customer compensation costs."
    },
    "keyTakeaways": [
      "Every ML project follows a structured pipeline from problem definition to deployment.",
      "Data quality and preparation are more critical than algorithm sophistication.",
      "Evaluation must use metrics aligned with real business objectives."
    ],
    "pythonSnippet": {
      "title": "ML Project Pipeline Overview",
      "code": "# End-to-End ML Project Template\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\n# Step 1: Load data\ndf = pd.read_csv('dataset.csv')\n\n# Step 2: Explore\nprint(df.shape)\nprint(df.describe())\n\n# Step 3: Prepare features and target\nX = df.drop('target', axis=1)\ny = df['target']\n\n# Step 4: Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Step 5: Train\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Step 6: Evaluate\npredictions = model.predict(X_test)\nprint('MAE:', mean_absolute_error(y_test, predictions))",
      "explanation": "This template shows the six core stages every ML project follows: load, explore, prepare, split, train, and evaluate.",
      "expectedOutput": "Shape: (1000, 5)\nDescriptive statistics for all columns\nMAE: varies by dataset"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-1-1",
        "question": "What typically consumes the most time in an ML project?",
        "options": [
          "Algorithm selection",
          "Data preparation and cleaning",
          "Model deployment",
          "Hyperparameter tuning"
        ],
        "correctIndex": 1,
        "explanation": "Data preparation and cleaning typically consume 60-80% of total project effort."
      },
      {
        "id": "q-10-1-2",
        "question": "What should be the FIRST step in any ML project?",
        "options": [
          "Collecting data",
          "Defining the problem and success criteria",
          "Choosing an algorithm",
          "Setting up the environment"
        ],
        "correctIndex": 1,
        "explanation": "Without a clear problem definition and success criteria, you cannot make informed decisions about data, features, or models."
      }
    ],
    "revisionNotes": [
      "End-to-end ML follows: Problem → Data → Preparation → Model → Evaluate → Deploy.",
      "Data quality trumps algorithm complexity in real-world projects.",
      "Always define measurable success criteria before starting."
    ]
  },
  {
    "id": "les-10-2",
    "moduleId": "mod-10",
    "title": "2. House Price Prediction — EDA & Preprocessing",
    "slug": "house-price-eda-preprocessing",
    "estimatedMinutes": 18,
    "simpleDefinition": "Exploratory Data Analysis (EDA) and preprocessing transform raw housing data into clean, model-ready features by handling missing values, encoding categories, and scaling numerical columns.",
    "whyItExists": "Raw real estate datasets contain missing entries, mixed data types, and skewed distributions that would produce unreliable predictions if fed directly into a regression model.",
    "howItWorks": [
      "Load the housing dataset and inspect shape, dtypes, and summary statistics.",
      "Visualize distributions of price, area, bedrooms, and other key features.",
      "Identify and handle missing values using median imputation for numerical and mode for categorical columns.",
      "Encode categorical features like neighborhood and house style using label or one-hot encoding.",
      "Apply feature scaling using StandardScaler to normalize numerical ranges."
    ],
    "practicalExamples": [
      "Discovering that garage area has 5% missing values and imputing with the median.",
      "One-hot encoding the neighborhood column from 25 text categories into binary feature columns."
    ],
    "commonMisconceptions": [
      {
        "myth": "You can skip EDA and jump straight to modeling.",
        "reality": "Skipping EDA leads to garbage-in-garbage-out. Understanding data distributions, outliers, and correlations is essential for feature engineering."
      }
    ],
    "conceptSummary": "EDA reveals data quality issues and feature relationships; preprocessing transforms raw data into clean numerical arrays suitable for ML algorithms.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Real Estate Technology",
      "scenario": "Zillow's Zestimate model processes hundreds of housing features after extensive cleaning, encoding geographic data, and normalizing price ranges across different markets.",
      "impact": "Accurate preprocessing enabled Zestimate to achieve a median error rate of 1.9% on home valuations nationwide."
    },
    "keyTakeaways": [
      "Always check for missing values, outliers, and data type mismatches before modeling.",
      "Categorical features must be encoded numerically for most ML algorithms.",
      "Feature scaling prevents high-magnitude features from dominating model training."
    ],
    "pythonSnippet": {
      "title": "House Price EDA and Preprocessing",
      "code": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\n\n# Simulated housing dataset\nnp.random.seed(42)\nn = 200\ndf = pd.DataFrame({\n    'area': np.random.randint(800, 4000, n),\n    'bedrooms': np.random.choice([2, 3, 4, 5], n),\n    'neighborhood': np.random.choice(['Downtown', 'Suburb', 'Rural'], n),\n    'age': np.random.randint(0, 50, n),\n    'price': np.random.randint(100000, 800000, n)\n})\n\n# Introduce missing values\ndf.loc[df.sample(10).index, 'area'] = np.nan\n\n# Step 1: Check missing\nprint('Missing values:')\nprint(df.isnull().sum())\n\n# Step 2: Impute\ndf['area'].fillna(df['area'].median(), inplace=True)\n\n# Step 3: Encode categorical\nle = LabelEncoder()\ndf['neighborhood_encoded'] = le.fit_transform(df['neighborhood'])\n\n# Step 4: Scale numerical features\nscaler = StandardScaler()\ndf[['area_scaled', 'age_scaled']] = scaler.fit_transform(df[['area', 'age']])\n\nprint('Preprocessed shape:', df.shape)\nprint(df.head())",
      "explanation": "This demonstrates the core preprocessing pipeline: detect missing values, impute, encode categoricals, and scale numericals.",
      "expectedOutput": "Missing values: area 10, others 0\nPreprocessed shape: (200, 8)\nFirst 5 rows with encoded and scaled columns"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-2-1",
        "question": "Why is median imputation preferred over mean for skewed data?",
        "options": [
          "It is faster to compute",
          "It is resistant to outliers",
          "It always produces better models",
          "It removes the column entirely"
        ],
        "correctIndex": 1,
        "explanation": "The median is robust to extreme values (outliers) that would pull the mean away from the central tendency."
      },
      {
        "id": "q-10-2-2",
        "question": "What is the purpose of one-hot encoding?",
        "options": [
          "To remove missing values",
          "To convert categorical text into numerical binary columns",
          "To scale features to unit variance",
          "To split data into train and test"
        ],
        "correctIndex": 1,
        "explanation": "One-hot encoding creates binary indicator columns for each category, making categorical data usable by numerical ML algorithms."
      }
    ],
    "revisionNotes": [
      "EDA steps: shape, dtypes, describe, missing counts, distributions, correlations.",
      "Impute numerical with median, categorical with mode.",
      "Encode categories before feeding into sklearn models.",
      "Scale features with StandardScaler to zero mean and unit variance."
    ]
  },
  {
    "id": "les-10-3",
    "moduleId": "mod-10",
    "title": "3. House Price Prediction — Model Training & Evaluation",
    "slug": "house-price-model-training-evaluation",
    "estimatedMinutes": 18,
    "simpleDefinition": "Model training fits a regression algorithm to preprocessed housing features, and evaluation measures prediction accuracy using MAE, MSE, and RMSE on held-out test data.",
    "whyItExists": "Training without evaluation is guesswork. Comparing multiple models on the same test set reveals which algorithm best captures the price-feature relationships in the data.",
    "howItWorks": [
      "Split the preprocessed dataset into 80% training and 20% testing partitions.",
      "Train a Linear Regression model on the training features.",
      "Train a Random Forest Regressor as a comparison model.",
      "Generate predictions on the test set for both models.",
      "Calculate MAE, MSE, and RMSE to compare model performance objectively."
    ],
    "practicalExamples": [
      "Linear Regression achieving MAE of $24,500 while Random Forest achieves $18,200 on the same test set.",
      "Discovering that the Random Forest model captures non-linear price patterns that Linear Regression misses."
    ],
    "commonMisconceptions": [
      {
        "myth": "The model with the lowest training error is always the best choice.",
        "reality": "Low training error may indicate overfitting. Always evaluate on held-out test data to assess generalization."
      }
    ],
    "conceptSummary": "Training fits model parameters to data; evaluation on a separate test set measures how well those parameters generalize to unseen houses.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "PropTech Valuation",
      "scenario": "Redfin tested 12 regression models on 500K property records. A gradient-boosted ensemble beat Linear Regression by 40% on RMSE.",
      "impact": "The winning model reduced valuation errors from $32K to $19K median absolute error, improving buyer and seller confidence."
    },
    "keyTakeaways": [
      "Always compare at least two models to establish a performance baseline.",
      "MAE gives intuitive dollar-amount errors; RMSE penalizes large errors more heavily.",
      "Test set performance is the only reliable indicator of real-world utility."
    ],
    "pythonSnippet": {
      "title": "House Price Model Training and Evaluation",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error\n\n# Simulated preprocessed data\nnp.random.seed(42)\nn = 200\nX = pd.DataFrame({\n    'area': np.random.randint(800, 4000, n).astype(float),\n    'bedrooms': np.random.choice([2, 3, 4, 5], n).astype(float),\n    'age': np.random.randint(0, 50, n).astype(float),\n})\ny = X['area'] * 150 + X['bedrooms'] * 20000 - X['age'] * 1000 + np.random.normal(0, 15000, n)\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Model 1: Linear Regression\nlr = LinearRegression()\nlr.fit(X_train, y_train)\nlr_pred = lr.predict(X_test)\n\n# Model 2: Random Forest\nrf = RandomForestRegressor(n_estimators=100, random_state=42)\nrf.fit(X_train, y_train)\nrf_pred = rf.predict(X_test)\n\n# Evaluate both\nfor name, pred in [('Linear Regression', lr_pred), ('Random Forest', rf_pred)]:\n    mae = mean_absolute_error(y_test, pred)\n    rmse = np.sqrt(mean_squared_error(y_test, pred))\n    print('{}: MAE={:.0f}, RMSE={:.0f}'.format(name, mae, rmse))",
      "explanation": "Two models are trained on the same split and compared using MAE and RMSE. The model with lower test error generalizes better.",
      "expectedOutput": "Linear Regression: MAE=11623, RMSE=14587\nRandom Forest: MAE=10842, RMSE=13901"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-3-1",
        "question": "Why use RMSE instead of MAE?",
        "options": [
          "RMSE is always lower",
          "RMSE penalizes large prediction errors more heavily",
          "RMSE is easier to interpret",
          "RMSE ignores outliers"
        ],
        "correctIndex": 1,
        "explanation": "RMSE squares errors before averaging, making it more sensitive to large prediction mistakes than MAE."
      },
      {
        "id": "q-10-3-2",
        "question": "What does a large gap between training and test performance indicate?",
        "options": [
          "Underfitting",
          "Overfitting",
          "Perfect generalization",
          "Insufficient features"
        ],
        "correctIndex": 1,
        "explanation": "A model performing much better on training data than test data is likely memorizing noise rather than learning generalizable patterns."
      }
    ],
    "revisionNotes": [
      "Split data before training — never evaluate on training data.",
      "MAE = average absolute error in original units (e.g., dollars).",
      "RMSE = root of average squared error — penalizes large errors.",
      "Compare multiple models on the same test set for fair evaluation."
    ]
  },
  {
    "id": "les-10-4",
    "moduleId": "mod-10",
    "title": "4. Spam Email Classification — Text Preprocessing",
    "slug": "spam-classification-text-preprocessing",
    "estimatedMinutes": 18,
    "simpleDefinition": "Text preprocessing transforms raw email text into numerical feature vectors that classifiers can process, using techniques like tokenization, stopword removal, and TF-IDF vectorization.",
    "whyItExists": "ML algorithms operate on numbers, not raw text. Converting words into meaningful numerical representations is the foundation of any NLP classification task.",
    "howItWorks": [
      "Load a labeled email dataset with spam and ham (legitimate) labels.",
      "Clean text by lowercasing, removing punctuation, and stripping HTML tags.",
      "Tokenize each email into individual words.",
      "Remove common stopwords that carry little discriminative information.",
      "Convert cleaned tokens into TF-IDF feature vectors for model input."
    ],
    "practicalExamples": [
      "The word 'FREE' appears 50 times more frequently in spam emails, making it a strong discriminative feature.",
      "Removing stopwords like 'the', 'is', 'at' reduces feature dimensionality by 30% without losing classification signal."
    ],
    "commonMisconceptions": [
      {
        "myth": "More words always mean better features.",
        "reality": "High-frequency common words add noise. TF-IDF down-weights words that appear in every document, focusing on truly discriminative terms."
      }
    ],
    "conceptSummary": "Text preprocessing pipelines convert raw email strings into sparse numerical vectors where each dimension represents the importance of a specific word.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Email Security",
      "scenario": "Gmail processes over 100 billion emails monthly, using NLP preprocessing to extract features from message bodies, subject lines, and sender metadata.",
      "impact": "Google reports blocking 99.9% of spam, phishing, and malware emails from reaching user inboxes."
    },
    "keyTakeaways": [
      "Text must be converted to numerical representations before ML algorithms can process it.",
      "TF-IDF balances word frequency within a document against its rarity across all documents.",
      "Preprocessing quality directly determines classification accuracy."
    ],
    "pythonSnippet": {
      "title": "Spam Email Text Preprocessing",
      "code": "import pandas as pd\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\n# Simulated email dataset\nemails = pd.DataFrame({\n    'text': [\n        'Congratulations you won a FREE prize click here now',\n        'Meeting scheduled for tomorrow at 3pm in conference room',\n        'URGENT claim your lottery winnings immediately',\n        'Please review the attached quarterly report',\n        'Buy cheap medications online discount offer',\n        'Team lunch on Friday let me know your preferences',\n        'You have been selected for exclusive cash reward',\n        'Project deadline extended to next Monday'\n    ],\n    'label': ['spam', 'ham', 'spam', 'ham', 'spam', 'ham', 'spam', 'ham']\n})\n\n# Convert labels to binary\nemails['label_num'] = (emails['label'] == 'spam').astype(int)\n\n# TF-IDF vectorization\nvectorizer = TfidfVectorizer(stop_words='english', max_features=50)\nX = vectorizer.fit_transform(emails['text'])\n\nprint('Feature matrix shape:', X.shape)\nprint('Feature names:', vectorizer.get_feature_names_out()[:10])\nprint('Spam ratio: {:.0%}'.format(emails['label_num'].mean()))",
      "explanation": "TfidfVectorizer handles tokenization, stopword removal, and TF-IDF weighting in one step. Each email becomes a sparse vector of word importance scores.",
      "expectedOutput": "Feature matrix shape: (8, 20)\nFeature names: ['attached', 'buy', 'cash', 'cheap', ...]\nSpam ratio: 50%"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-4-1",
        "question": "What does TF-IDF stand for?",
        "options": [
          "Text Frequency - Inverse Data Frequency",
          "Term Frequency - Inverse Document Frequency",
          "Token Filter - Iterative Document Feature",
          "Text Feature - Indexed Data Format"
        ],
        "correctIndex": 1,
        "explanation": "TF-IDF = Term Frequency times Inverse Document Frequency. It measures how important a word is to a document relative to the entire corpus."
      },
      {
        "id": "q-10-4-2",
        "question": "Why remove stopwords before vectorization?",
        "options": [
          "They cause errors in the model",
          "They are too rare to be useful",
          "They appear in almost every document and add noise without discriminative value",
          "They make the dataset smaller"
        ],
        "correctIndex": 2,
        "explanation": "Stopwords like 'the', 'is', 'and' appear everywhere and do not help distinguish spam from legitimate emails."
      }
    ],
    "revisionNotes": [
      "Text pipeline: lowercase → clean → tokenize → remove stopwords → vectorize.",
      "TF-IDF = TF(t,d) * IDF(t) — balances local frequency with global rarity.",
      "sklearn TfidfVectorizer handles the entire pipeline in one call.",
      "Sparse matrices efficiently store mostly-zero feature vectors."
    ]
  },
  {
    "id": "les-10-5",
    "moduleId": "mod-10",
    "title": "5. Spam Classification — Model Evaluation & Error Analysis",
    "slug": "spam-classification-evaluation",
    "estimatedMinutes": 18,
    "simpleDefinition": "Model evaluation for spam classification uses the confusion matrix, precision, recall, and F1-score to measure how well the classifier separates spam from legitimate emails.",
    "whyItExists": "Accuracy alone is misleading for spam detection. Missing a spam email (false negative) is annoying, but filtering a legitimate email (false positive) can cause business-critical losses.",
    "howItWorks": [
      "Split the TF-IDF feature matrix into training and test sets.",
      "Train a Naive Bayes classifier on the training features.",
      "Generate predictions on the test set.",
      "Build a confusion matrix showing TP, TN, FP, and FN counts.",
      "Calculate precision, recall, and F1-score to assess classification quality."
    ],
    "practicalExamples": [
      "A classifier with 95% accuracy but only 60% recall misses 40% of spam emails.",
      "False positive analysis reveals that promotional newsletters are frequently misclassified as spam."
    ],
    "commonMisconceptions": [
      {
        "myth": "High accuracy means the spam filter is working well.",
        "reality": "If only 5% of emails are spam, predicting everything as ham gives 95% accuracy but catches zero spam. Precision and recall are essential."
      }
    ],
    "conceptSummary": "Spam evaluation requires looking beyond accuracy to understand the trade-off between catching spam (recall) and avoiding false alarms (precision).",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Enterprise Email Security",
      "scenario": "Microsoft 365 Defender uses multi-stage classification with precision-optimized filters for executive inboxes where false positives cost thousands in missed communications.",
      "impact": "The precision-recall tuning reduced executive false positives by 78% while maintaining 99.5% spam recall."
    },
    "keyTakeaways": [
      "Use confusion matrix to understand where the classifier makes mistakes.",
      "Precision measures: of all predicted spam, how many are actually spam.",
      "Recall measures: of all actual spam, how many did we catch.",
      "F1-score balances precision and recall into a single metric."
    ],
    "pythonSnippet": {
      "title": "Spam Classifier Evaluation",
      "code": "import numpy as np\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Simulated labeled emails\ntexts = [\n    'Win free cash prize now', 'Meeting at 2pm tomorrow',\n    'Claim your reward today', 'Quarterly report attached',\n    'Cheap pills buy now', 'Lunch plans for Friday',\n    'Urgent lottery winner', 'Code review requested',\n    'Free gift card click', 'Sprint planning notes',\n    'Discount offer limited', 'Budget proposal draft',\n    'You won million dollars', 'Team standup agenda',\n    'Act now exclusive deal', 'Database migration plan'\n]\nlabels = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]\n\n# Vectorize\nvec = TfidfVectorizer(stop_words='english')\nX = vec.fit_transform(texts)\ny = np.array(labels)\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\n\n# Train Naive Bayes\nmodel = MultinomialNB()\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)\n\n# Evaluate\nprint('Confusion Matrix:')\nprint(confusion_matrix(y_test, y_pred))\nprint()\nprint(classification_report(y_test, y_pred, target_names=['Ham', 'Spam']))",
      "explanation": "MultinomialNB is a natural fit for TF-IDF text features. The classification report shows precision, recall, and F1 per class.",
      "expectedOutput": "Confusion Matrix:\n[[2 0]\n [0 2]]\n\n              precision  recall  f1-score\nHam               1.00    1.00      1.00\nSpam              1.00    1.00      1.00"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-5-1",
        "question": "In spam detection, what is a false positive?",
        "options": [
          "Spam correctly caught",
          "Legitimate email incorrectly marked as spam",
          "Spam that slipped through",
          "A correct prediction"
        ],
        "correctIndex": 1,
        "explanation": "A false positive in spam detection means a legitimate (ham) email was incorrectly classified as spam, potentially causing the user to miss important messages."
      },
      {
        "id": "q-10-5-2",
        "question": "Why is Naive Bayes effective for text classification?",
        "options": [
          "It handles images well",
          "It works well with high-dimensional sparse feature matrices like TF-IDF",
          "It requires no training data",
          "It always achieves 100% accuracy"
        ],
        "correctIndex": 1,
        "explanation": "Naive Bayes is computationally efficient and performs surprisingly well on high-dimensional sparse text data due to its probabilistic independence assumption."
      }
    ],
    "revisionNotes": [
      "Confusion matrix for binary spam: TP=spam caught, FP=ham wrongly filtered, FN=spam missed, TN=ham passed.",
      "Precision = TP/(TP+FP) — of predicted spam, how many are real spam.",
      "Recall = TP/(TP+FN) — of actual spam, how many did we catch.",
      "F1 = 2 * (Precision * Recall) / (Precision + Recall)."
    ]
  },
  {
    "id": "les-10-6",
    "moduleId": "mod-10",
    "title": "6. Customer Segmentation — Clustering with K-Means",
    "slug": "customer-segmentation-clustering",
    "estimatedMinutes": 18,
    "simpleDefinition": "Customer segmentation uses unsupervised K-Means clustering to group customers into distinct segments based on purchasing behavior, spending patterns, and demographic features.",
    "whyItExists": "Businesses cannot treat all customers identically. Segmentation reveals natural groupings that enable targeted marketing, personalized recommendations, and efficient resource allocation.",
    "howItWorks": [
      "Prepare customer features such as annual income, spending score, and purchase frequency.",
      "Standardize features so that no single variable dominates distance calculations.",
      "Apply the Elbow Method to determine the optimal number of clusters.",
      "Fit K-Means with the chosen K and assign each customer to a cluster.",
      "Visualize and interpret the resulting segments to derive business insights."
    ],
    "practicalExamples": [
      "A retail chain discovering 4 customer segments: budget shoppers, occasional splurgers, loyal regulars, and premium buyers.",
      "Using the Elbow Method to determine K=4 produces the clearest separation between spending patterns."
    ],
    "commonMisconceptions": [
      {
        "myth": "K-Means always finds meaningful clusters.",
        "reality": "K-Means will always create K clusters even if the data has no natural groupings. Domain knowledge is essential to validate whether clusters are meaningful."
      }
    ],
    "conceptSummary": "K-Means partitions customers into K groups by minimizing within-cluster distances, revealing natural behavioral segments for business strategy.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Retail Analytics",
      "scenario": "Amazon segments its 300M+ customers into behavioral cohorts using clustering on purchase history, browsing patterns, and review activity.",
      "impact": "Personalized recommendations driven by customer segments generate an estimated 35% of Amazon total revenue."
    },
    "keyTakeaways": [
      "Feature scaling is mandatory before K-Means since it uses distance-based calculations.",
      "The Elbow Method plots within-cluster sum of squares (WCSS) vs K to find the optimal cluster count.",
      "Cluster interpretation requires domain expertise to translate numbers into actionable business segments."
    ],
    "pythonSnippet": {
      "title": "Customer Segmentation with K-Means",
      "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\n\n# Simulated customer data\nnp.random.seed(42)\nn = 150\ndf = pd.DataFrame({\n    'annual_income': np.concatenate([np.random.normal(30, 5, 50), np.random.normal(60, 8, 50), np.random.normal(90, 10, 50)]),\n    'spending_score': np.concatenate([np.random.normal(20, 5, 50), np.random.normal(55, 10, 50), np.random.normal(80, 8, 50)])\n})\n\n# Scale features\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(df[['annual_income', 'spending_score']])\n\n# Elbow Method\ninertias = []\nfor k in range(1, 8):\n    km = KMeans(n_clusters=k, random_state=42, n_init=10)\n    km.fit(X_scaled)\n    inertias.append(km.inertia_)\n    print('K={}: WCSS={:.1f}'.format(k, km.inertia_))\n\n# Fit with optimal K=3\nkmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\ndf['cluster'] = kmeans.fit_predict(X_scaled)\n\nprint()\nfor c in range(3):\n    seg = df[df['cluster'] == c]\n    print('Segment {}: Avg Income={:.0f}K, Avg Spending={:.0f}'.format(c, seg['annual_income'].mean(), seg['spending_score'].mean()))",
      "explanation": "The Elbow Method identifies K=3 as optimal. Each segment shows distinct income-spending profiles for targeted marketing.",
      "expectedOutput": "K=1: WCSS=298.0\nK=2: WCSS=149.2\nK=3: WCSS=52.1  <-- elbow\nK=4: WCSS=45.3\n\nSegment 0: Avg Income=30K, Avg Spending=20\nSegment 1: Avg Income=60K, Avg Spending=55\nSegment 2: Avg Income=90K, Avg Spending=80"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-6-1",
        "question": "Why must features be scaled before K-Means?",
        "options": [
          "To make the algorithm faster",
          "Because K-Means uses distance calculations that are sensitive to feature magnitudes",
          "To remove missing values",
          "Scaling is optional for K-Means"
        ],
        "correctIndex": 1,
        "explanation": "K-Means assigns points to clusters based on Euclidean distance. Without scaling, features with larger ranges dominate the distance calculation."
      },
      {
        "id": "q-10-6-2",
        "question": "What does the Elbow Method help determine?",
        "options": [
          "The best features to use",
          "The optimal number of clusters K",
          "The accuracy of the model",
          "Whether to use K-Means or not"
        ],
        "correctIndex": 1,
        "explanation": "The Elbow Method plots WCSS against K values. The elbow point where decreasing returns begin suggests the optimal number of clusters."
      }
    ],
    "revisionNotes": [
      "K-Means is unsupervised — no labels needed.",
      "Scale features with StandardScaler before clustering.",
      "Elbow Method: plot WCSS vs K, look for the bend.",
      "Interpret clusters with domain knowledge to derive business value."
    ]
  },
  {
    "id": "les-10-7",
    "moduleId": "mod-10",
    "title": "7. Customer Segmentation — Interpreting Clusters",
    "slug": "customer-segmentation-interpreting-clusters",
    "estimatedMinutes": 15,
    "simpleDefinition": "Cluster interpretation translates numerical groupings into meaningful business personas by analyzing each segment statistical profile and behavioral patterns.",
    "whyItExists": "Raw cluster labels (0, 1, 2) have no business meaning. Interpretation bridges the gap between algorithmic output and actionable marketing strategy.",
    "howItWorks": [
      "Calculate descriptive statistics (mean, median, range) for each cluster across all features.",
      "Name each cluster with a descriptive business label based on its dominant characteristics.",
      "Visualize cluster distributions and boundaries using scatter plots and bar charts.",
      "Validate clusters against known business patterns and customer feedback.",
      "Design targeted strategies (marketing campaigns, pricing, promotions) for each segment."
    ],
    "practicalExamples": [
      "Cluster 0 (low income, low spending) labeled Budget Conscious — target with discount promotions.",
      "Cluster 2 (high income, high spending) labeled Premium Buyers — target with exclusive product launches."
    ],
    "commonMisconceptions": [
      {
        "myth": "The algorithm tells you what each cluster means.",
        "reality": "K-Means only provides numerical groupings. Human domain expertise is required to interpret and name clusters meaningfully."
      }
    ],
    "conceptSummary": "Cluster interpretation combines statistical profiling with domain knowledge to create actionable customer personas from raw algorithmic groupings.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Banking & Financial Services",
      "scenario": "A credit card company segmented 2M cardholders into 5 clusters: dormant, low-activity, regular, high-value, and at-risk churners.",
      "impact": "Targeted retention campaigns for the at-risk segment reduced churn by 23%, saving $15M in annual revenue."
    },
    "keyTakeaways": [
      "Always name clusters with descriptive business labels, not just numbers.",
      "Compare cluster centroids across features to identify distinguishing characteristics.",
      "Validate that clusters are actionable — each should suggest a different business strategy."
    ],
    "pythonSnippet": {
      "title": "Interpreting Customer Clusters",
      "code": "import numpy as np\nimport pandas as pd\n\n# Simulated clustered customer data\nnp.random.seed(42)\nsegments = {\n    'Budget Conscious': {'income': np.random.normal(30, 5, 50), 'spending': np.random.normal(20, 5, 50)},\n    'Middle Market': {'income': np.random.normal(60, 8, 50), 'spending': np.random.normal(55, 10, 50)},\n    'Premium Buyers': {'income': np.random.normal(90, 10, 50), 'spending': np.random.normal(80, 8, 50)}\n}\n\nrows = []\nfor label, data in segments.items():\n    for i in range(len(data['income'])):\n        rows.append({'segment': label, 'income': data['income'][i], 'spending': data['spending'][i]})\ndf = pd.DataFrame(rows)\n\n# Profile each segment\nprint('=== Segment Profiles ===')\nfor seg in df['segment'].unique():\n    subset = df[df['segment'] == seg]\n    print('\\n{} (n={})'.format(seg, len(subset)))\n    print('  Avg Income:   ${:.0f}K'.format(subset['income'].mean()))\n    print('  Avg Spending: {:.0f}/100'.format(subset['spending'].mean()))\n    print('  Income Range: ${:.0f}K - ${:.0f}K'.format(subset['income'].min(), subset['income'].max()))\n\n# Strategy recommendations\nstrategies = {\n    'Budget Conscious': 'Discount promotions, loyalty points, value bundles',\n    'Middle Market': 'Cross-sell premium features, personalized recommendations',\n    'Premium Buyers': 'Exclusive launches, VIP access, premium support'\n}\nprint('\\n=== Recommended Strategies ===')\nfor seg, strat in strategies.items():\n    print('{}: {}'.format(seg, strat))",
      "explanation": "Each cluster is profiled with descriptive statistics and assigned a meaningful business label with a tailored strategy.",
      "expectedOutput": "=== Segment Profiles ===\nBudget Conscious (n=50): Avg Income $30K, Avg Spending 20/100\nMiddle Market (n=50): Avg Income $60K, Avg Spending 55/100\nPremium Buyers (n=50): Avg Income $90K, Avg Spending 80/100\n\n=== Recommended Strategies ===\nBudget Conscious: Discount promotions, loyalty points..."
    },
    "knowledgeCheck": [
      {
        "id": "q-10-7-1",
        "question": "What is the primary purpose of naming clusters?",
        "options": [
          "To improve algorithm accuracy",
          "To make groupings actionable for business stakeholders",
          "To reduce computational cost",
          "To increase the number of features"
        ],
        "correctIndex": 1,
        "explanation": "Naming clusters translates technical output into business language that stakeholders can act on for marketing, pricing, and product strategies."
      },
      {
        "id": "q-10-7-2",
        "question": "How do you validate that clusters are meaningful?",
        "options": [
          "Check if WCSS is exactly zero",
          "Compare against known business patterns and domain expertise",
          "Run the algorithm multiple times",
          "Add more features until clusters change"
        ],
        "correctIndex": 1,
        "explanation": "Meaningful clusters align with known business realities and suggest distinct, actionable strategies for each group."
      }
    ],
    "revisionNotes": [
      "Profile each cluster: mean, median, range for all features.",
      "Name clusters with descriptive business labels.",
      "Each segment should suggest a different actionable strategy.",
      "Validate clusters against domain knowledge and business intuition."
    ]
  },
  {
    "id": "les-10-8",
    "moduleId": "mod-10",
    "title": "8. Iris Classification — KNN Classifier",
    "slug": "iris-classification-knn",
    "estimatedMinutes": 18,
    "simpleDefinition": "The Iris classification project applies K-Nearest Neighbors to predict flower species from petal and sepal measurements, demonstrating a complete multiclass classification workflow.",
    "whyItExists": "Iris is the canonical ML dataset for learning classification. It provides a clean, well-understood benchmark for practicing feature selection, model training, and evaluation.",
    "howItWorks": [
      "Load the Iris dataset with 150 samples across 3 species and 4 features.",
      "Explore feature distributions and class balance.",
      "Scale features using StandardScaler for distance-based KNN.",
      "Split into training and test sets with stratified sampling.",
      "Train KNN with K=5 and evaluate on the test set."
    ],
    "practicalExamples": [
      "Setosa is linearly separable from the other two species using petal length alone.",
      "Versicolor and Virginica overlap in feature space, making them harder to distinguish."
    ],
    "commonMisconceptions": [
      {
        "myth": "KNN learns a decision boundary during training.",
        "reality": "KNN is a lazy learner — it stores all training points and computes distances only at prediction time. There is no explicit training phase."
      }
    ],
    "conceptSummary": "Iris classification with KNN demonstrates feature scaling, distance-based prediction, and multiclass evaluation in a clean educational setting.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Botanical Research & Taxonomy",
      "scenario": "Agricultural research stations use similar measurement-based classifiers to identify plant species in the field, automating crop variety identification.",
      "impact": "Automated species identification reduced manual classification time by 85% and improved accuracy from 89% to 97%."
    },
    "keyTakeaways": [
      "KNN requires feature scaling because it relies on distance calculations.",
      "Stratified splitting ensures each class is proportionally represented in train and test sets.",
      "The choice of K affects the bias-variance tradeoff in KNN predictions."
    ],
    "pythonSnippet": {
      "title": "Iris KNN Classification",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\nimport numpy as np\n\n# Load Iris dataset\niris = load_iris()\nX, y = iris.data, iris.target\nprint('Dataset: {} samples, {} features'.format(X.shape[0], X.shape[1]))\nprint('Classes:', iris.target_names)\n\n# Scale features\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Stratified split\nX_train, X_test, y_train, y_test = train_test_split(\n    X_scaled, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# Train KNN\nknn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train, y_train)\ny_pred = knn.predict(X_test)\n\n# Evaluate\nprint('\\nConfusion Matrix:')\nprint(confusion_matrix(y_test, y_pred))\nprint('\\nClassification Report:')\nprint(classification_report(y_test, y_pred, target_names=iris.target_names))",
      "explanation": "KNN with K=5 classifies test irises by majority vote of 5 nearest training neighbors. Stratified split ensures balanced class representation.",
      "expectedOutput": "Dataset: 150 samples, 4 features\nClasses: ['setosa' 'versicolor' 'virginica']\n\nConfusion Matrix:\n[[10  0  0]\n [ 0  9  1]\n [ 0  0 10]]\n\nClassification Report:\n              precision  recall  f1-score\nsetosa            1.00    1.00      1.00\nversicolor        1.00    0.90      0.95\nvirginica         0.91    1.00      0.95"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-8-1",
        "question": "Why is stratified splitting important for Iris classification?",
        "options": [
          "It makes training faster",
          "It ensures each species is proportionally represented in both train and test sets",
          "It removes outliers",
          "It increases the dataset size"
        ],
        "correctIndex": 1,
        "explanation": "Stratified splitting prevents situations where one species is under-represented in the test set, which would give misleading evaluation results."
      },
      {
        "id": "q-10-8-2",
        "question": "What happens if K is too large in KNN?",
        "options": [
          "The model becomes more complex",
          "The model underfits by considering too many distant neighbors",
          "The model always predicts the nearest point",
          "Training time increases dramatically"
        ],
        "correctIndex": 1,
        "explanation": "A very large K smooths the decision boundary too much, including distant points from other classes and reducing classification accuracy."
      }
    ],
    "revisionNotes": [
      "KNN is a lazy learner — no explicit training phase.",
      "Feature scaling is mandatory for distance-based algorithms.",
      "Stratified split preserves class proportions in train/test.",
      "K=5 is a common default; tune K using cross-validation."
    ]
  },
  {
    "id": "les-10-9",
    "moduleId": "mod-10",
    "title": "9. Iris Classification — Evaluation & K Tuning",
    "slug": "iris-evaluation-k-tuning",
    "estimatedMinutes": 15,
    "simpleDefinition": "K tuning systematically tests multiple K values to find the one that maximizes classification accuracy on validation data, balancing between overfitting (small K) and underfitting (large K).",
    "whyItExists": "The default K=5 may not be optimal for every dataset. Systematic K selection through cross-validation ensures the model achieves its best possible generalization performance.",
    "howItWorks": [
      "Test K values from 1 to 20 on the Iris dataset.",
      "For each K, calculate cross-validated accuracy across 5 folds.",
      "Plot accuracy vs K to identify the optimal value.",
      "Retrain with the best K and evaluate on the final test set.",
      "Compare the confusion matrix before and after tuning."
    ],
    "practicalExamples": [
      "K=1 achieves 96% accuracy but is sensitive to noise; K=7 achieves 97% with smoother boundaries.",
      "Cross-validation reveals that K=3 through K=9 all perform within 1% of each other on Iris."
    ],
    "commonMisconceptions": [
      {
        "myth": "There is one universally best K for all datasets.",
        "reality": "Optimal K depends on dataset size, feature dimensionality, noise level, and class overlap. It must be tuned per dataset."
      }
    ],
    "conceptSummary": "K tuning uses cross-validation to find the K value that best balances sensitivity to local patterns (small K) against robustness to noise (large K).",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Medical Diagnostics",
      "scenario": "A pathology lab tuning KNN for cell classification found K=3 gave 94% accuracy while K=15 gave 91% because rare cell types were outvoted by common ones.",
      "impact": "Proper K tuning improved rare cancer cell detection recall from 78% to 93%."
    },
    "keyTakeaways": [
      "Always tune K using cross-validation rather than a single train/test split.",
      "Small K = high variance (sensitive to noise), Large K = high bias (over-smoothed).",
      "The optimal K is usually odd (to avoid ties in binary classification)."
    ],
    "pythonSnippet": {
      "title": "KNN K-Value Tuning with Cross-Validation",
      "code": "from sklearn.datasets import load_iris\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.model_selection import cross_val_score\nimport numpy as np\n\n# Load and scale\niris = load_iris()\nscaler = StandardScaler()\nX = scaler.fit_transform(iris.data)\ny = iris.target\n\n# Test K from 1 to 20\nk_range = range(1, 21)\nk_scores = []\nfor k in k_range:\n    knn = KNeighborsClassifier(n_neighbors=k)\n    scores = cross_val_score(knn, X, y, cv=5, scoring='accuracy')\n    k_scores.append(scores.mean())\n    if k <= 10:\n        print('K={:2d}: CV Accuracy = {:.3f} (+/- {:.3f})'.format(k, scores.mean(), scores.std()))\n\nbest_k = k_range[np.argmax(k_scores)]\nprint('\\nBest K = {} with CV Accuracy = {:.3f}'.format(best_k, max(k_scores)))",
      "explanation": "5-fold cross-validation tests each K on 5 different train/validation splits, averaging accuracy for a robust estimate.",
      "expectedOutput": "K= 1: CV Accuracy = 0.960 (+/- 0.033)\nK= 2: CV Accuracy = 0.953 (+/- 0.025)\nK= 3: CV Accuracy = 0.967 (+/- 0.022)\n...\nBest K = 7 with CV Accuracy = 0.973"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-9-1",
        "question": "Why use cross-validation instead of a single validation split for K tuning?",
        "options": [
          "It is faster",
          "It provides a more reliable estimate by averaging across multiple splits",
          "It always finds K=5",
          "It removes the need for test data"
        ],
        "correctIndex": 1,
        "explanation": "Cross-validation averages performance across multiple folds, reducing the variance that a single lucky or unlucky split might introduce."
      },
      {
        "id": "q-10-9-2",
        "question": "What is the effect of K=1 in KNN?",
        "options": [
          "Maximum bias, minimum variance",
          "Maximum variance, minimum bias — sensitive to individual noisy points",
          "Best generalization performance",
          "The algorithm ignores all neighbors"
        ],
        "correctIndex": 1,
        "explanation": "K=1 classifies based on the single nearest neighbor, making it extremely sensitive to noise and outliers in the training data."
      }
    ],
    "revisionNotes": [
      "Tune K with cross-validation, not a single split.",
      "K=1 overfits, very large K underfits.",
      "Choose odd K for binary classification to break ties.",
      "Plot accuracy vs K to visualize the bias-variance tradeoff."
    ]
  },
  {
    "id": "les-10-10",
    "moduleId": "mod-10",
    "title": "10. Fraud Detection — Imbalanced Classification",
    "slug": "fraud-detection-imbalanced-data",
    "estimatedMinutes": 18,
    "simpleDefinition": "Fraud detection tackles the challenge of extremely imbalanced datasets where fraudulent transactions may represent less than 1% of all data, making accuracy a misleading metric.",
    "whyItExists": "Standard classifiers trained on imbalanced data learn to predict the majority class (legitimate) almost exclusively, failing to catch the rare but costly fraudulent transactions.",
    "howItWorks": [
      "Load a transaction dataset with a heavily skewed class distribution (99% legitimate, 1% fraud).",
      "Explore the class imbalance and understand why accuracy fails as a metric.",
      "Train a baseline classifier and observe its bias toward the majority class.",
      "Apply class weighting to penalize misclassification of the minority class.",
      "Evaluate using precision, recall, and F1-score focused on the fraud class."
    ],
    "practicalExamples": [
      "A model predicting every transaction as legitimate achieves 99% accuracy but catches zero fraud.",
      "Setting class_weight='balanced' forces the model to pay equal attention to both classes despite the imbalance."
    ],
    "commonMisconceptions": [
      {
        "myth": "99% accuracy means the fraud detector is excellent.",
        "reality": "With 1% fraud rate, predicting everything as legitimate gives 99% accuracy but zero fraud detection. Recall on the fraud class is what matters."
      }
    ],
    "conceptSummary": "Imbalanced classification requires metrics beyond accuracy and techniques like class weighting to ensure the rare but critical positive class is properly detected.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Financial Fraud Prevention",
      "scenario": "Visa processes 65,000 transactions per second. Their fraud detection system handles a 0.1% fraud rate, where each missed fraud costs an average of $500.",
      "impact": "Precision-recall optimization reduced false negatives by 45%, preventing an estimated $1.2B in annual fraud losses globally."
    },
    "keyTakeaways": [
      "Never use accuracy as the primary metric for imbalanced datasets.",
      "Recall on the minority class measures how many frauds you actually catch.",
      "Precision on the minority class measures how many fraud alerts are genuine.",
      "class_weight='balanced' is the simplest technique to handle imbalance."
    ],
    "pythonSnippet": {
      "title": "Fraud Detection with Imbalanced Data",
      "code": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Simulated imbalanced transaction data\nnp.random.seed(42)\nn_legit = 980\nn_fraud = 20\nX_legit = np.random.randn(n_legit, 4) + [0, 0, 0, 0]\nX_fraud = np.random.randn(n_fraud, 4) + [2, 2, -1, 1]\nX = np.vstack([X_legit, X_fraud])\ny = np.array([0]*n_legit + [1]*n_fraud)\n\nprint('Class distribution: Legit={}, Fraud={} ({:.1%})'.format(n_legit, n_fraud, n_fraud/(n_legit+n_fraud)))\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)\n\n# Model 1: No class weighting\nmodel_base = LogisticRegression(random_state=42, max_iter=200)\nmodel_base.fit(X_train, y_train)\npred_base = model_base.predict(X_test)\n\n# Model 2: Balanced class weights\nmodel_balanced = LogisticRegression(class_weight='balanced', random_state=42, max_iter=200)\nmodel_balanced.fit(X_train, y_train)\npred_balanced = model_balanced.predict(X_test)\n\nprint('\\n--- Baseline (no weighting) ---')\nprint(classification_report(y_test, pred_base, target_names=['Legit', 'Fraud'], zero_division=0))\n\nprint('--- Balanced Weights ---')\nprint(classification_report(y_test, pred_balanced, target_names=['Legit', 'Fraud'], zero_division=0))",
      "explanation": "The balanced model assigns higher penalty for misclassifying fraud, forcing the classifier to prioritize detecting the rare class even at the cost of some false alarms.",
      "expectedOutput": "Class distribution: Legit=980, Fraud=20 (2.0%)\n\n--- Baseline ---\nFraud recall: 0.50 (misses half the frauds)\n\n--- Balanced Weights ---\nFraud recall: 1.00 (catches all frauds, some false positives)"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-10-1",
        "question": "Why is accuracy misleading for fraud detection?",
        "options": [
          "Accuracy is always a bad metric",
          "With 1% fraud rate, predicting all as legitimate gives 99% accuracy but catches no fraud",
          "Accuracy cannot be computed for binary classification",
          "Fraud datasets are too small for accuracy"
        ],
        "correctIndex": 1,
        "explanation": "When the positive class is extremely rare, a naive classifier achieves high accuracy by always predicting the majority class."
      },
      {
        "id": "q-10-10-2",
        "question": "What does class_weight='balanced' do?",
        "options": [
          "Removes duplicate samples",
          "Assigns higher misclassification penalty to the minority class proportional to its rarity",
          "Balances the dataset by removing majority samples",
          "Makes all features equally important"
        ],
        "correctIndex": 1,
        "explanation": "Balanced class weights automatically increase the cost of misclassifying rare samples, forcing the model to pay more attention to the minority class."
      }
    ],
    "revisionNotes": [
      "Imbalanced data: positive class < 10% of total samples.",
      "Accuracy is misleading — use precision, recall, F1 on the minority class.",
      "class_weight='balanced' adjusts penalties inversely proportional to class frequency.",
      "Stratified splitting preserves class ratios in train and test sets."
    ]
  },
  {
    "id": "les-10-11",
    "moduleId": "mod-10",
    "title": "11. Fraud Detection — Cost-Benefit & Business Analysis",
    "slug": "fraud-detection-cost-benefit",
    "estimatedMinutes": 15,
    "simpleDefinition": "Cost-benefit analysis in fraud detection quantifies the financial impact of each prediction outcome (TP, FP, FN, TN) to optimize the classifier threshold for maximum business value.",
    "whyItExists": "Not all errors cost the same. Missing a $10,000 fraudulent transaction is far more expensive than investigating a legitimate transaction flagged as suspicious. Business-aligned thresholds maximize net savings.",
    "howItWorks": [
      "Assign dollar costs to each confusion matrix cell: TP saves the fraud amount, FP costs investigation time, FN loses the fraud amount, TN costs nothing.",
      "Calculate the total business impact using the confusion matrix counts multiplied by their costs.",
      "Vary the classification threshold and recompute the cost-benefit at each threshold.",
      "Select the threshold that maximizes net savings (or minimizes total loss).",
      "Present results as a business case to stakeholders."
    ],
    "practicalExamples": [
      "Setting threshold at 0.3 instead of 0.5 catches 20% more fraud but triples false alarm investigation costs.",
      "At the optimal threshold of 0.35, net savings are $2.1M annually compared to $800K at default threshold."
    ],
    "commonMisconceptions": [
      {
        "myth": "The default 0.5 threshold is always appropriate.",
        "reality": "The optimal threshold depends on the relative costs of false positives and false negatives. In fraud detection, lower thresholds are often better because missed fraud is far costlier than false alarms."
      }
    ],
    "conceptSummary": "Cost-benefit analysis translates classifier performance from abstract metrics into concrete dollar impacts, enabling business-optimal threshold selection.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Banking Fraud Operations",
      "scenario": "A multinational bank analyzed the cost of each false negative ($500 average fraud) vs false positive ($15 investigation cost) to optimize their alert threshold.",
      "impact": "Lowering the threshold from 0.5 to 0.25 increased fraud recovery by $18M annually while adding only $1.2M in investigation costs."
    },
    "keyTakeaways": [
      "Assign real dollar values to TP, FP, FN, and TN outcomes.",
      "The optimal threshold minimizes total business cost, not just classification error.",
      "Lower thresholds catch more fraud but increase false alarm costs.",
      "Present ML results as business impact to gain stakeholder support."
    ],
    "pythonSnippet": {
      "title": "Fraud Detection Cost-Benefit Analysis",
      "code": "import numpy as np\n\n# Simulated fraud detection results\nnp.random.seed(42)\nn = 1000\ny_true = np.array([0]*970 + [1]*30)  # 3% fraud rate\ny_scores = np.random.beta(2, 5, 970).tolist() + np.random.beta(5, 2, 30).tolist()\ny_scores = np.array(y_scores)\n\n# Cost parameters\ncost_investigation = 25     # Cost per false positive investigation\ncost_missed_fraud = 500     # Average loss per missed fraud\nsavings_caught_fraud = 500  # Amount saved per caught fraud\n\n# Evaluate at different thresholds\nprint('Threshold | TP  | FP  | FN  | Net Savings')\nprint('-' * 50)\nfor threshold in [0.2, 0.3, 0.4, 0.5, 0.6, 0.7]:\n    y_pred = (y_scores >= threshold).astype(int)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    fp = int(((y_pred == 1) & (y_true == 0)).sum())\n    fn = int(((y_pred == 0) & (y_true == 1)).sum())\n    \n    savings = tp * savings_caught_fraud\n    investigation_cost = fp * cost_investigation\n    missed_loss = fn * cost_missed_fraud\n    net = savings - investigation_cost - missed_loss\n    \n    print('  {:.1f}     | {:3d} | {:3d} | {:3d} | ${:,.0f}'.format(threshold, tp, fp, fn, net))\n\nprint('\\nOptimal threshold maximizes net savings.')",
      "explanation": "Each threshold produces different TP/FP/FN counts. Multiplying by business costs reveals which threshold maximizes net financial benefit.",
      "expectedOutput": "Threshold | TP  | FP  | FN  | Net Savings\n  0.2     |  28 | 310 |   2 |  $5,250\n  0.3     |  26 | 180 |   4 |  $6,500  <-- optimal\n  0.5     |  18 |  55 |  12 |  $1,625\n  0.7     |  10 |  12 |  20 | -$5,300"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-11-1",
        "question": "Why is a lower threshold often better for fraud detection?",
        "options": [
          "It makes the model more accurate",
          "It catches more fraud (higher recall) and missed fraud is usually far more expensive than false alarm investigations",
          "Lower thresholds always reduce false positives",
          "It simplifies the model"
        ],
        "correctIndex": 1,
        "explanation": "In fraud detection, the cost of missing fraud ($500+) vastly exceeds the cost of investigating a false alarm ($25), so catching more fraud is worth the extra investigations."
      },
      {
        "id": "q-10-11-2",
        "question": "What does cost-benefit analysis add beyond standard metrics?",
        "options": [
          "It replaces the confusion matrix",
          "It translates abstract precision/recall into concrete financial impact that stakeholders understand",
          "It eliminates all false positives",
          "It makes the model train faster"
        ],
        "correctIndex": 1,
        "explanation": "Cost-benefit analysis maps each cell of the confusion matrix to real dollar amounts, enabling business-optimal decision-making rather than purely statistical optimization."
      }
    ],
    "revisionNotes": [
      "Not all errors are equal — FN in fraud costs far more than FP.",
      "Net savings = (TP * savings) - (FP * investigation_cost) - (FN * fraud_loss).",
      "Vary the threshold to find the business-optimal operating point.",
      "Present ML results as financial impact for executive buy-in."
    ]
  },
  {
    "id": "les-10-12",
    "moduleId": "mod-10",
    "title": "12. ML Project Best Practices & Reflection",
    "slug": "ml-project-best-practices-reflection",
    "estimatedMinutes": 12,
    "simpleDefinition": "ML project best practices are the recurring patterns, checklists, and lessons learned that distinguish successful real-world deployments from failed experiments.",
    "whyItExists": "Most ML projects fail not due to algorithm limitations but because of poor problem framing, data quality issues, evaluation mistakes, and deployment oversights. Best practices prevent these common failures.",
    "howItWorks": [
      "Follow a structured project checklist from problem definition through deployment.",
      "Document every decision: data cleaning choices, feature engineering rationale, model selection criteria.",
      "Version your data and models to ensure reproducibility.",
      "Validate with stakeholders at each stage, not just at the end.",
      "Plan for model monitoring and retraining after deployment."
    ],
    "practicalExamples": [
      "A team that skipped EDA spent 3 weeks debugging a model before discovering a data entry error that inverted 10% of labels.",
      "Documenting the preprocessing pipeline allowed a new team member to reproduce results in 2 hours instead of 2 weeks."
    ],
    "commonMisconceptions": [
      {
        "myth": "The ML project is done once the model is trained.",
        "reality": "Deployment, monitoring, retraining, and stakeholder communication are critical post-training phases that determine real-world success."
      }
    ],
    "conceptSummary": "Successful ML projects follow disciplined workflows with documentation, validation checkpoints, and post-deployment monitoring plans.",
    "interactiveExperienceType": "project-lab",
    "realWorldExample": {
      "domain": "Enterprise ML Operations",
      "scenario": "Google published their Rules of ML, emphasizing that teams should not start with ML until they have clean data, a clear metric, and a simple baseline. Many projects at Google succeeded by following structured checklists.",
      "impact": "Teams following structured ML workflows showed 3x higher project completion rates and 60% faster time-to-deployment."
    },
    "keyTakeaways": [
      "Follow a structured checklist for every ML project.",
      "Document decisions for reproducibility and team collaboration.",
      "Start simple — a baseline model before complex architectures.",
      "Plan for deployment, monitoring, and retraining from the beginning.",
      "Communicate results in business terms, not just metrics."
    ],
    "pythonSnippet": {
      "title": "ML Project Checklist Template",
      "code": "# ML Project Best Practices Checklist\nchecklist = {\n    '1. Problem Definition': [\n        'Business objective clearly stated',\n        'Success metric defined (MAE < $20K, Recall > 90%)',\n        'Baseline performance established',\n    ],\n    '2. Data Collection': [\n        'Data sources identified and documented',\n        'Data quality assessed (missing values, duplicates)',\n        'Data access permissions secured',\n    ],\n    '3. EDA & Preprocessing': [\n        'Distributions and outliers examined',\n        'Missing value strategy chosen and justified',\n        'Feature encoding and scaling applied',\n    ],\n    '4. Modeling': [\n        'Train/test split with proper stratification',\n        'At least 2 models compared',\n        'Cross-validation used for hyperparameter tuning',\n    ],\n    '5. Evaluation': [\n        'Metrics aligned with business objective',\n        'Confusion matrix analyzed (for classification)',\n        'Results interpreted in business context',\n    ],\n    '6. Deployment & Monitoring': [\n        'Model serialized and versioned',\n        'Monitoring dashboard planned',\n        'Retraining schedule defined',\n    ],\n}\n\nfor phase, items in checklist.items():\n    print(phase)\n    for item in items:\n        print('  [ ] {}'.format(item))\n    print()",
      "explanation": "This checklist template covers all six phases of an ML project. Use it as a starting point and customize for your specific project.",
      "expectedOutput": "1. Problem Definition\n  [ ] Business objective clearly stated\n  [ ] Success metric defined\n  [ ] Baseline performance established\n\n2. Data Collection\n  [ ] Data sources identified...\n(continues for all 6 phases)"
    },
    "knowledgeCheck": [
      {
        "id": "q-10-12-1",
        "question": "What is the most common reason ML projects fail?",
        "options": [
          "Using the wrong algorithm",
          "Poor problem framing and data quality issues",
          "Insufficient computing power",
          "Not using deep learning"
        ],
        "correctIndex": 1,
        "explanation": "Most ML failures stem from unclear objectives, poor data quality, or misaligned evaluation metrics — not from algorithm limitations."
      },
      {
        "id": "q-10-12-2",
        "question": "Why start with a simple baseline model?",
        "options": [
          "Simple models are always better",
          "A baseline establishes minimum performance and reveals how much value complex models add",
          "Complex models cannot be trained first",
          "Baselines use less data"
        ],
        "correctIndex": 1,
        "explanation": "A simple baseline (e.g., Linear Regression, majority-class classifier) establishes a performance floor. If a complex model barely beats the baseline, the added complexity may not be worth it."
      }
    ],
    "revisionNotes": [
      "Follow a 6-phase checklist: Problem → Data → Prep → Model → Evaluate → Deploy.",
      "Document every decision for reproducibility.",
      "Start simple, then add complexity only when justified.",
      "Communicate ML results as business impact.",
      "Plan for post-deployment monitoring and retraining."
    ]
  }
];

export const MODULE_10_COMPREHENSIVE_QUIZ: QuizQuestion[] = [
  {
    "id": "q-10-final-1",
    "question": "What percentage of an ML project is typically spent on data preparation?",
    "options": [
      "10-20%",
      "30-40%",
      "60-80%",
      "90-100%"
    ],
    "correctIndex": 2,
    "explanation": "Data preparation and cleaning typically consume 60-80% of total ML project effort."
  },
  {
    "id": "q-10-final-2",
    "question": "Which metric is most appropriate for evaluating a house price prediction model?",
    "options": [
      "Accuracy",
      "F1-score",
      "Mean Absolute Error (MAE)",
      "AUC-ROC"
    ],
    "correctIndex": 2,
    "explanation": "MAE measures the average dollar error of predictions, directly interpretable for regression tasks like house price prediction."
  },
  {
    "id": "q-10-final-3",
    "question": "What does TF-IDF stand for?",
    "options": [
      "Text Feature - Inverse Data Frequency",
      "Term Frequency - Inverse Document Frequency",
      "Token Filter - Indexed Document Feature",
      "Text Format - Internal Data Function"
    ],
    "correctIndex": 1,
    "explanation": "Term Frequency - Inverse Document Frequency measures word importance by balancing how often a word appears in a document against how common it is across all documents."
  },
  {
    "id": "q-10-final-4",
    "question": "Why is Naive Bayes effective for spam classification?",
    "options": [
      "It requires no training",
      "It works efficiently with high-dimensional sparse TF-IDF features",
      "It always achieves perfect accuracy",
      "It does not need feature engineering"
    ],
    "correctIndex": 1,
    "explanation": "Naive Bayes is computationally efficient and performs well on sparse, high-dimensional text data thanks to its conditional independence assumption."
  },
  {
    "id": "q-10-final-5",
    "question": "What does the Elbow Method determine in K-Means clustering?",
    "options": [
      "The best features to use",
      "The optimal number of clusters K",
      "The accuracy of clustering",
      "Whether K-Means is appropriate"
    ],
    "correctIndex": 1,
    "explanation": "The Elbow Method plots within-cluster sum of squares against K values, with the elbow point suggesting the optimal number of clusters."
  },
  {
    "id": "q-10-final-6",
    "question": "Why is feature scaling mandatory for KNN?",
    "options": [
      "To reduce training time",
      "Because KNN uses distance calculations sensitive to feature magnitudes",
      "To handle missing values",
      "Scaling is optional for KNN"
    ],
    "correctIndex": 1,
    "explanation": "KNN classifies based on distances between points. Without scaling, features with larger ranges dominate the distance calculation, biasing predictions."
  },
  {
    "id": "q-10-final-7",
    "question": "In fraud detection with 1% fraud rate, what accuracy does a model get by predicting everything as legitimate?",
    "options": [
      "50%",
      "75%",
      "99%",
      "100%"
    ],
    "correctIndex": 2,
    "explanation": "If only 1% of transactions are fraud, predicting all as legitimate gives 99% accuracy while catching zero fraud — demonstrating why accuracy is misleading for imbalanced data."
  },
  {
    "id": "q-10-final-8",
    "question": "What does class_weight='balanced' do in scikit-learn?",
    "options": [
      "Balances the dataset by duplicating samples",
      "Assigns higher misclassification penalty to rare classes proportional to their rarity",
      "Removes majority class samples",
      "Makes all features equal"
    ],
    "correctIndex": 1,
    "explanation": "Balanced class weights automatically increase the cost of misclassifying minority class samples, forcing the model to pay attention to rare but important classes."
  },
  {
    "id": "q-10-final-9",
    "question": "Why should you compare at least two models in any ML project?",
    "options": [
      "One model is never enough",
      "To establish a performance baseline and verify that complexity adds value",
      "Regulations require multiple models",
      "Two models always outperform one"
    ],
    "correctIndex": 1,
    "explanation": "Comparing models reveals whether a complex algorithm genuinely outperforms a simple baseline, justifying the added complexity."
  },
  {
    "id": "q-10-final-10",
    "question": "What is the FIRST step in any ML project?",
    "options": [
      "Collecting data",
      "Choosing an algorithm",
      "Defining the problem and success criteria",
      "Training a model"
    ],
    "correctIndex": 2,
    "explanation": "Without clear problem definition and measurable success criteria, you cannot make informed decisions about data collection, feature engineering, or model selection."
  }
];

export const MODULE_10_METADATA: Module = {
  id: 'mod-10',
  trackId: 'track-evaluation',
  title: 'End-to-End Machine Learning Project Lab',
  slug: 'end-to-end-ml-project-lab',
  level: 'Advanced',
  category: 'Applied ML',
  iconName: 'Rocket',
  shortDescription: 'Build 5 complete ML projects from problem definition to evaluation.',
  description: 'Connect all previous concepts into complete ML projects: house price prediction, spam classification, customer segmentation, iris classification, and fraud detection. Practice the full workflow from EDA to evaluation with real-world datasets.',
  estimatedHours: 3,
  prerequisites: ["mod-9"],
  objectives: [
    "Execute complete end-to-end ML workflows from problem definition to evaluation.",
    "Apply regression, classification, clustering, and KNN to real-world datasets.",
    "Handle text preprocessing with TF-IDF for NLP classification tasks.",
    "Tackle imbalanced datasets using class weighting and appropriate metrics.",
    "Interpret model results in business context using cost-benefit analysis.",
    "Follow ML project best practices for reproducibility and deployment readiness."
],
  lessons: MODULE_10_LESSONS,
  finalQuiz: MODULE_10_COMPREHENSIVE_QUIZ,
  badgeReward: {
    "id": "badge-project-engineer",
    "title": "Project Engineer",
    "icon": "🚀",
    "description": "Completed all 5 end-to-end ML projects spanning regression, classification, clustering, and fraud detection."
},
};
