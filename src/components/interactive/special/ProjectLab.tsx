'use client';
import React, { useState, useCallback } from 'react';

// ─── Project Data ──────────────────────────────────────────────────

interface ProjectStep {
  title: string;
  description: string;
  code: string;
  output: string;
  explanation: string;
}

interface ProjectConfig {
  id: string;
  title: string;
  emoji: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  diffColor: string;
  problem: string;
  dataset: string;
  dataPreview: string[][];
  dataHeaders: string[];
  steps: ProjectStep[];
  keyFindings: string[];
  reflection: string;
}

const PROJECTS: ProjectConfig[] = [
  {
    id: 'house-price',
    title: 'House Price Prediction',
    emoji: '🏠',
    difficulty: 'Beginner',
    diffColor: 'text-emerald-300',
    problem: 'Predict the selling price of residential properties based on physical features such as lot area, number of bedrooms, year built, and garage capacity. This is a classic supervised regression problem.',
    dataset: '1,460 residential homes in Ames, Iowa with 8 selected features and a continuous target variable (SalePrice in USD).',
    dataHeaders: ['LotArea', 'Bedrooms', 'Bathrooms', 'YearBuilt', 'GarageArea', 'OverallQual', 'TotalSF', 'SalePrice'],
    dataPreview: [
      ['8450', '3', '2', '2003', '548', '7', '1710', '208500'],
      ['9600', '3', '2', '1976', '460', '6', '1262', '181500'],
      ['11250', '3', '2', '2001', '608', '7', '1786', '223500'],
      ['9550', '3', '1', '1915', '642', '7', '1717', '140000'],
      ['14260', '4', '2', '2000', '836', '8', '2198', '250000'],
    ],
    steps: [
      {
        title: '1. Load & Explore Data',
        description: 'Import the dataset and examine its shape, data types, and basic statistics.',
        code: 'import pandas as pd\nimport numpy as np\n\n# Load dataset\ndf = pd.read_csv("house_prices.csv")\nprint("Shape:", df.shape)\nprint("\\nData Types:")\nprint(df.dtypes)\nprint("\\nBasic Statistics:")\nprint(df.describe().round(1))',
        output: 'Shape: (1460, 8)\n\nData Types:\nLotArea       int64\nBedrooms      int64\nBathrooms     int64\nYearBuilt     int64\nGarageArea    int64\nOverallQual   int64\nTotalSF       int64\nSalePrice     int64\n\nBasic Statistics:\n         LotArea  Bedrooms  Bathrooms  ...  SalePrice\nmean     10516.8       2.9        1.6  ...   180921.2\nstd       9981.3       0.8        0.6  ...    79442.5\nmin       1300.0       0.0        0.0  ...    34900.0\nmax     215245.0       8.0        3.0  ...   755000.0',
        explanation: 'The dataset has 1,460 rows with 7 features and 1 target. SalePrice ranges from $34,900 to $755,000 with a mean of $180,921.'
      },
      {
        title: '2. Check Missing Values',
        description: 'Identify and handle any missing data before modeling.',
        code: 'print("Missing Values:")\nprint(df.isnull().sum())\nprint("\\nTotal Missing:", df.isnull().sum().sum())\n\n# Fill any missing values with column median\ndf = df.fillna(df.median())\nprint("\\nAfter cleaning:", df.isnull().sum().sum(), "missing")',
        output: 'Missing Values:\nLotArea        0\nBedrooms       0\nBathrooms      0\nYearBuilt      0\nGarageArea    81\nOverallQual    0\nTotalSF        0\nSalePrice      0\n\nTotal Missing: 81\n\nAfter cleaning: 0 missing',
        explanation: 'GarageArea has 81 missing values (homes without garages). We fill with the column median as a simple robust strategy.'
      },
      {
        title: '3. Feature Scaling & Train/Test Split',
        description: 'Standardize features and split data into training (70%) and testing (30%) partitions.',
        code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX = df.drop("SalePrice", axis=1)\ny = df["SalePrice"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42\n)\n\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\nprint("Training samples:", X_train_s.shape[0])\nprint("Testing samples: ", X_test_s.shape[0])',
        output: 'Training samples: 1022\nTesting samples:  438',
        explanation: 'We fit the scaler ONLY on training data to avoid data leakage, then transform both splits. 70/30 split gives 1,022 training and 438 testing samples.'
      },
      {
        title: '4. Train Linear Regression',
        description: 'Train a baseline Linear Regression model and evaluate on the test set.',
        code: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error\nimport numpy as np\n\nlr = LinearRegression()\nlr.fit(X_train_s, y_train)\ny_pred_lr = lr.predict(X_test_s)\n\nmae = mean_absolute_error(y_test, y_pred_lr)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred_lr))\nr2 = lr.score(X_test_s, y_test)\n\nprint("Linear Regression Results:")\nprint("MAE:  ${:,.0f}".format(mae))\nprint("RMSE: ${:,.0f}".format(rmse))\nprint("R2:   {:.3f}".format(r2))',
        output: 'Linear Regression Results:\nMAE:  $21,847\nRMSE: $33,615\nR2:   0.821',
        explanation: 'Linear Regression explains 82.1% of price variance. Predictions are off by ~$21,847 on average. Decent baseline but room to improve.'
      },
      {
        title: '5. Train Random Forest (Comparison)',
        description: 'Train a Random Forest regressor and compare against the linear baseline.',
        code: 'from sklearn.ensemble import RandomForestRegressor\n\nrf = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)\nrf.fit(X_train_s, y_train)\ny_pred_rf = rf.predict(X_test_s)\n\nmae_rf = mean_absolute_error(y_test, y_pred_rf)\nrmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))\nr2_rf = rf.score(X_test_s, y_test)\n\nprint("Random Forest Results:")\nprint("MAE:  ${:,.0f}".format(mae_rf))\nprint("RMSE: ${:,.0f}".format(rmse_rf))\nprint("R2:   {:.3f}".format(r2_rf))\n\nprint("\\n--- Comparison ---")\nprint("Model         MAE       RMSE     R2")\nprint("Lin. Reg.   ${:>7,.0f}  ${:>7,.0f}  {:.3f}".format(mae, rmse, r2))\nprint("Rand. For.  ${:>7,.0f}  ${:>7,.0f}  {:.3f}".format(mae_rf, rmse_rf, r2_rf))',
        output: 'Random Forest Results:\nMAE:  $17,312\nRMSE: $27,108\nR2:   0.884\n\n--- Comparison ---\nModel         MAE       RMSE     R2\nLin. Reg.   $ 21,847  $ 33,615  0.821\nRand. For.  $ 17,312  $ 27,108  0.884',
        explanation: 'Random Forest outperforms Linear Regression across all metrics. R2 improves from 0.821 to 0.884. The ensemble captures nonlinear feature interactions that linear models miss.'
      }
    ],
    keyFindings: [
      'OverallQual and TotalSF are the strongest price predictors.',
      'Random Forest reduces MAE by ~$4,500 compared to Linear Regression.',
      'Feature scaling is critical for Linear Regression but optional for tree-based models.',
      'Median imputation is simple but may bias estimates for non-random missing data.',
    ],
    reflection: 'This project demonstrated the complete regression pipeline: EDA, cleaning, scaling, splitting, training, and model comparison. Key limitation: we used only 7 features; real estate pricing involves neighborhood, school district, and market timing factors not captured here.'
  },
  {
    id: 'spam-detection',
    title: 'Spam Email Classification',
    emoji: '📧',
    difficulty: 'Beginner',
    diffColor: 'text-cyan-300',
    problem: 'Build a binary classifier to distinguish spam emails from legitimate (ham) messages using text content features. This introduces Natural Language Processing (NLP) concepts within a classification framework.',
    dataset: '5,572 SMS messages labeled as ham (legitimate) or spam, with raw text content.',
    dataHeaders: ['Label', 'Message (first 60 chars)', 'Length', 'NumDigits'],
    dataPreview: [
      ['ham', 'Go until jurong point, crazy.. Available only...', '111', '0'],
      ['ham', 'Ok lar... Joking wif u oni...', '29', '0'],
      ['spam', 'Free entry in 2 a wkly comp to win FA Cup...', '155', '5'],
      ['ham', 'U dun say so early hor... U c already then say...', '49', '0'],
      ['spam', 'WINNER!! As a valued network customer you...', '157', '3'],
    ],
    steps: [
      {
        title: '1. Load & Explore Text Data',
        description: 'Load the SMS dataset and examine class distribution.',
        code: 'import pandas as pd\n\ndf = pd.read_csv("sms_spam.csv")\nprint("Shape:", df.shape)\nprint("\\nClass Distribution:")\nprint(df["label"].value_counts())\nprint("\\nSpam Percentage: {:.1f}%".format(\n    (df["label"] == "spam").mean() * 100\n))',
        output: 'Shape: (5572, 2)\n\nClass Distribution:\nham     4825\nspam     747\n\nSpam Percentage: 13.4%',
        explanation: 'The dataset is imbalanced: only 13.4% of messages are spam. This means accuracy alone will be misleading — we need precision and recall.'
      },
      {
        title: '2. Text Feature Extraction (TF-IDF)',
        description: 'Convert raw text into numerical features using Term Frequency-Inverse Document Frequency.',
        code: 'from sklearn.feature_extraction.text import TfidfVectorizer\n\ntfidf = TfidfVectorizer(max_features=3000, stop_words="english")\nX = tfidf.fit_transform(df["message"])\ny = (df["label"] == "spam").astype(int)\n\nprint("TF-IDF Matrix Shape:", X.shape)\nprint("Vocabulary Size:", len(tfidf.vocabulary_))\nprint("\\nTop 10 Features:")\nfeatures = tfidf.get_feature_names_out()\nprint(features[:10])',
        output: 'TF-IDF Matrix Shape: (5572, 3000)\nVocabulary Size: 3000\n\nTop 10 Features:\n[\"00\" \"000\" \"008704050406\" \"0089\" \"01onal\" \"02\" \"0207\" \"03\" \"04\" \"050703\"]',
        explanation: 'TF-IDF converts each message into a 3,000-dimensional sparse vector. Words appearing in many documents get lower weights. This is a standard baseline for text classification.'
      },
      {
        title: '3. Train Naive Bayes Classifier',
        description: 'Train a Multinomial Naive Bayes model — the classic baseline for text classification.',
        code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.metrics import classification_report, confusion_matrix\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42, stratify=y\n)\n\nnb = MultinomialNB()\nnb.fit(X_train, y_train)\ny_pred = nb.predict(X_test)\n\nprint("Confusion Matrix:")\nprint(confusion_matrix(y_test, y_pred))\nprint("\\nClassification Report:")\nprint(classification_report(\n    y_test, y_pred, target_names=["Ham", "Spam"]\n))',
        output: 'Confusion Matrix:\n[[1196    11]\n [  11   175]]\n\nClassification Report:\n              precision    recall  f1-score   support\n\n         Ham       0.99      0.99      0.99      1207\n        Spam       0.94      0.94      0.94       186\n\n    accuracy                           0.98      1393\n   macro avg       0.97      0.97      0.97      1393\nweighted avg       0.98      0.98      0.98      1393',
        explanation: 'Naive Bayes achieves 98% accuracy with strong precision (94%) and recall (94%) on spam. Only 11 spam messages slipped through, and 11 legitimate messages were falsely flagged.'
      },
      {
        title: '4. Analyze Errors & Limitations',
        description: 'Examine false positives and false negatives to understand model weaknesses.',
        code: 'print("=== Error Analysis ===")\nprint("False Positives (Ham flagged as Spam): 11")\nprint("  -> Cost: Legitimate messages lost")\nprint("\\nFalse Negatives (Spam bypassed filter): 11")\nprint("  -> Cost: Spam reaches inbox")\nprint("\\n=== Limitations ===")\nprint("1. TF-IDF loses word order information")\nprint("2. Model cannot detect image-based spam")\nprint("3. Adversarial spammers adapt to known filters")\nprint("4. Class imbalance may bias toward majority class")',
        output: '=== Error Analysis ===\nFalse Positives (Ham flagged as Spam): 11\n  -> Cost: Legitimate messages lost\n\nFalse Negatives (Spam bypassed filter): 11\n  -> Cost: Spam reaches inbox\n\n=== Limitations ===\n1. TF-IDF loses word order information\n2. Model cannot detect image-based spam\n3. Adversarial spammers adapt to known filters\n4. Class imbalance may bias toward majority class',
        explanation: 'In a spam filter, false positives (losing real email) are typically worse than false negatives (seeing spam). A production system would tune the threshold to minimize FP.'
      }
    ],
    keyFindings: [
      'TF-IDF with Naive Bayes achieves 98% accuracy on SMS spam detection.',
      'Precision of 94% means only 6% of flagged messages are false alarms.',
      'Spam messages tend to contain financial keywords, urgency words, and phone numbers.',
      'Stratified splitting preserves the 87/13 ham/spam ratio in both splits.',
    ],
    reflection: 'This project demonstrated text classification basics: TF-IDF vectorization, Naive Bayes, and evaluation with precision/recall on imbalanced classes. Real-world spam filters use deep learning, sender reputation, and link analysis beyond bag-of-words models.'
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation',
    emoji: '👥',
    difficulty: 'Intermediate',
    diffColor: 'text-purple-300',
    problem: 'Group customers into distinct behavioral segments using unsupervised learning. This project introduces K-Means clustering to identify patterns without labeled target variables.',
    dataset: '200 mall customers with Annual Income ($k) and Spending Score (1-100).',
    dataHeaders: ['CustomerID', 'Gender', 'Age', 'AnnualIncome_k', 'SpendingScore'],
    dataPreview: [
      ['1', 'Male', '19', '15', '39'],
      ['2', 'Male', '21', '15', '81'],
      ['3', 'Female', '20', '16', '6'],
      ['4', 'Female', '23', '16', '77'],
      ['5', 'Female', '31', '17', '40'],
    ],
    steps: [
      {
        title: '1. Load & Visualize Customer Data',
        description: 'Explore the relationship between income and spending behavior.',
        code: 'import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("mall_customers.csv")\nprint("Shape:", df.shape)\nprint("\\nFeature Statistics:")\nprint(df[["AnnualIncome_k", "SpendingScore"]].describe().round(1))\n\n# Select features for clustering\nX = df[["AnnualIncome_k", "SpendingScore"]].values\nprint("\\nClustering Features Shape:", X.shape)',
        output: 'Shape: (200, 5)\n\nFeature Statistics:\n       AnnualIncome_k  SpendingScore\nmean             60.6           50.2\nstd              26.3           25.8\nmin              15.0            1.0\n25%              41.5           34.8\n50%              61.5           50.0\n75%              78.0           73.0\nmax             137.0           99.0\n\nClustering Features Shape: (200, 2)',
        explanation: 'We focus on two features: Annual Income and Spending Score. Both have similar scales (~15-137 and 1-99), so scaling is helpful but not critical for K-Means here.'
      },
      {
        title: '2. Find Optimal K (Elbow Method)',
        description: 'Use the Elbow Method to determine the ideal number of customer segments.',
        code: 'from sklearn.cluster import KMeans\n\ninertias = []\nfor k in range(1, 11):\n    km = KMeans(n_clusters=k, n_init=10, random_state=42)\n    km.fit(X)\n    inertias.append(km.inertia_)\n    print("K={}: Inertia = {:.0f}".format(k, km.inertia_))',
        output: 'K=1: Inertia = 269981\nK=2: Inertia = 181363\nK=3: Inertia = 106348\nK=4: Inertia = 73679\nK=5: Inertia = 44448\nK=6: Inertia = 37233\nK=7: Inertia = 30263\nK=8: Inertia = 25337\nK=9: Inertia = 21984\nK=10: Inertia = 19660',
        explanation: 'The elbow appears at K=5, where inertia drops sharply from K=4 to K=5 (73,679 → 44,448) then flattens. This suggests 5 natural customer segments.'
      },
      {
        title: '3. Fit K-Means with K=5',
        description: 'Cluster customers into 5 segments and examine cluster centers.',
        code: 'km = KMeans(n_clusters=5, n_init=10, random_state=42)\ndf["Cluster"] = km.fit_predict(X)\n\nprint("Cluster Centers (Income_k, SpendingScore):")\nfor i, center in enumerate(km.cluster_centers_):\n    count = (df["Cluster"] == i).sum()\n    print("  Cluster {}: Income=${:.0f}k, Spending={:.0f}, Count={}".format(\n        i, center[0], center[1], count\n    ))',
        output: 'Cluster Centers (Income_k, SpendingScore):\n  Cluster 0: Income=$26k, Spending=20, Count=39\n  Cluster 1: Income=$87k, Spending=82, Count=22\n  Cluster 2: Income=$56k, Spending=49, Count=81\n  Cluster 3: Income=$26k, Spending=80, Count=22\n  Cluster 4: Income=$88k, Spending=18, Count=36',
        explanation: 'Five distinct segments emerge: Budget Savers (low income, low spending), Premium Spenders (high income, high spending), Average (middle), Young Enthusiasts (low income, high spending), and High-Income Conservatives (high income, low spending).'
      },
      {
        title: '4. Interpret & Name Segments',
        description: 'Give business-meaningful names to each cluster and derive marketing strategies.',
        code: 'segments = {\n    0: "Budget Savers",\n    1: "Premium Spenders",\n    2: "Average Customers",\n    3: "Young Enthusiasts",\n    4: "High-Income Conservatives"\n}\n\nprint("=== Customer Segments ===")\nfor cluster_id, name in segments.items():\n    subset = df[df["Cluster"] == cluster_id]\n    print("\\n{} (Cluster {}, n={})".format(name, cluster_id, len(subset)))\n    print("  Avg Income:   ${:.0f}k".format(subset["AnnualIncome_k"].mean()))\n    print("  Avg Spending: {:.0f}/100".format(subset["SpendingScore"].mean()))\n    print("  Avg Age:      {:.0f}".format(subset["Age"].mean()))',
        output: '=== Customer Segments ===\n\nBudget Savers (Cluster 0, n=39)\n  Avg Income:   $26k\n  Avg Spending: 20/100\n  Avg Age:      45\n\nPremium Spenders (Cluster 1, n=22)\n  Avg Income:   $87k\n  Avg Spending: 82/100\n  Avg Age:      33\n\nAverage Customers (Cluster 2, n=81)\n  Avg Income:   $56k\n  Avg Spending: 49/100\n  Avg Age:      43\n\nYoung Enthusiasts (Cluster 3, n=22)\n  Avg Income:   $26k\n  Avg Spending: 80/100\n  Avg Age:      25\n\nHigh-Income Conservatives (Cluster 4, n=36)\n  Avg Income:   $88k\n  Avg Spending: 18/100\n  Avg Age:      41',
        explanation: 'Each segment suggests a different marketing strategy: Premium Spenders get VIP loyalty programs, Young Enthusiasts get trendy affordable products, and High-Income Conservatives need value demonstrations to increase engagement.'
      }
    ],
    keyFindings: [
      'The Elbow Method identifies K=5 as the optimal number of customer segments.',
      'Premium Spenders (high income, high spending) represent the highest-value target segment.',
      'Young Enthusiasts spend heavily despite low income — ideal for credit card or buy-now-pay-later marketing.',
      'K-Means requires no labeled data, making it ideal for discovering hidden structure.',
    ],
    reflection: 'This project introduced unsupervised learning through customer segmentation. K-Means discovered five actionable groups without any target labels. Limitations: K-Means assumes spherical clusters and is sensitive to initialization and outliers. Real-world segmentation uses RFM analysis, hierarchical clustering, and DBSCAN.'
  },
  {
    id: 'iris-classification',
    title: 'Iris Flower Classification',
    emoji: '🌸',
    difficulty: 'Beginner',
    diffColor: 'text-pink-300',
    problem: 'Classify iris flowers into three species (Setosa, Versicolor, Virginica) based on petal and sepal measurements using K-Nearest Neighbors. The classic introductory ML classification dataset.',
    dataset: '150 iris flower samples with 4 continuous features and 3 balanced target classes (50 each).',
    dataHeaders: ['SepalLen', 'SepalWid', 'PetalLen', 'PetalWid', 'Species'],
    dataPreview: [
      ['5.1', '3.5', '1.4', '0.2', 'Setosa'],
      ['7.0', '3.2', '4.7', '1.4', 'Versicolor'],
      ['6.3', '3.3', '6.0', '2.5', 'Virginica'],
      ['4.9', '3.0', '1.4', '0.2', 'Setosa'],
      ['6.4', '3.2', '4.5', '1.5', 'Versicolor'],
    ],
    steps: [
      {
        title: '1. Load the Iris Dataset',
        description: 'Load the classic dataset from scikit-learn and examine class balance.',
        code: 'from sklearn.datasets import load_iris\nimport pandas as pd\nimport numpy as np\n\niris = load_iris()\ndf = pd.DataFrame(iris.data, columns=iris.feature_names)\ndf["species"] = iris.target_names[iris.target]\n\nprint("Shape:", df.shape)\nprint("\\nClass Distribution:")\nprint(df["species"].value_counts())\nprint("\\nFeature Statistics:")\nprint(df.describe().round(2))',
        output: 'Shape: (150, 5)\n\nClass Distribution:\nsetosa        50\nversicolor    50\nvirginica     50\n\nFeature Statistics:\n       sepal length  sepal width  petal length  petal width\nmean          5.84         3.06          3.76         1.20\nstd           0.83         0.44          1.77         0.76\nmin           4.30         2.00          1.00         0.10\nmax           7.90         4.40          6.90         2.50',
        explanation: 'Perfectly balanced dataset: 50 samples per species. Petal length has the highest variance (std=1.77), suggesting it is the most discriminative feature.'
      },
      {
        title: '2. Feature Scaling & Split',
        description: 'Scale features and create train/test partitions.',
        code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX = iris.data\ny = iris.target\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y\n)\n\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\nprint("Training: {} samples".format(len(X_train)))\nprint("Testing:  {} samples".format(len(X_test)))',
        output: 'Training: 105 samples\nTesting:  45 samples',
        explanation: 'Feature scaling is essential for KNN because distance calculations are dominated by features with larger numeric ranges.'
      },
      {
        title: '3. Train KNN Classifier',
        description: 'Train K-Nearest Neighbors with K=5 and evaluate with a confusion matrix.',
        code: 'from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\n\nknn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train_s, y_train)\ny_pred = knn.predict(X_test_s)\n\nprint("Confusion Matrix:")\nprint(confusion_matrix(y_test, y_pred))\nprint("\\nClassification Report:")\nprint(classification_report(\n    y_test, y_pred,\n    target_names=["Setosa", "Versicolor", "Virginica"]\n))',
        output: 'Confusion Matrix:\n[[15  0  0]\n [ 0 14  1]\n [ 0  0 15]]\n\nClassification Report:\n              precision    recall  f1-score   support\n\n      Setosa       1.00      1.00      1.00        15\n  Versicolor       1.00      0.93      0.97        15\n   Virginica       0.94      1.00      0.97        15\n\n    accuracy                           0.98        45\n   macro avg       0.98      0.98      0.98        45\nweighted avg       0.98      0.98      0.98        45',
        explanation: 'KNN achieves 98% accuracy with only 1 misclassification: one Versicolor sample predicted as Virginica. Setosa is perfectly separable. The Versicolor/Virginica boundary is where most confusion occurs.'
      },
      {
        title: '4. Experiment with Different K Values',
        description: 'Find the optimal K by testing multiple values.',
        code: 'print("K-Value Analysis:")\nprint("-" * 35)\n\nfor k in [1, 3, 5, 7, 9, 11]:\n    knn_k = KNeighborsClassifier(n_neighbors=k)\n    knn_k.fit(X_train_s, y_train)\n    acc = knn_k.score(X_test_s, y_test)\n    print("K={:>2d}: Accuracy = {:.1f}%".format(k, acc * 100))',
        output: 'K-Value Analysis:\n-----------------------------------\nK= 1: Accuracy = 95.6%\nK= 3: Accuracy = 97.8%\nK= 5: Accuracy = 97.8%\nK= 7: Accuracy = 97.8%\nK= 9: Accuracy = 97.8%\nK=11: Accuracy = 95.6%',
        explanation: 'K=3 through K=9 all achieve the same best accuracy (97.8%). K=1 overfits (memorizes noise), while K=11 starts over-smoothing boundaries. K=5 is a safe balanced choice.'
      }
    ],
    keyFindings: [
      'KNN achieves 97.8% accuracy on Iris with K=5.',
      'Setosa is perfectly linearly separable from the other two species.',
      'Petal dimensions are more discriminative than sepal dimensions.',
      'Feature scaling is mandatory for distance-based classifiers like KNN.',
    ],
    reflection: 'The Iris dataset is small, clean, and balanced — ideal for learning classification fundamentals. Real-world datasets are larger, messier, and imbalanced. This project reinforced the KNN workflow: scale → split → fit → evaluate → tune K.'
  },
  {
    id: 'fraud-detection',
    title: 'Transaction Fraud Detection',
    emoji: '🔍',
    difficulty: 'Advanced',
    diffColor: 'text-amber-300',
    problem: 'Detect fraudulent credit card transactions in a severely imbalanced dataset where fraud represents less than 1% of all transactions. This project emphasizes evaluation beyond accuracy.',
    dataset: '10,000 simulated credit card transactions with 20 anonymized features, of which only 50 are fraudulent (0.5% prevalence).',
    dataHeaders: ['Amount', 'V1', 'V2', 'V3', '...V20', 'Class'],
    dataPreview: [
      ['149.62', '-1.36', '-0.07', '2.54', '...', '0 (Legit)'],
      ['2.69', '1.19', '0.27', '0.17', '...', '0 (Legit)'],
      ['378.66', '-1.36', '-1.34', '1.77', '...', '1 (Fraud)'],
      ['123.50', '-0.97', '-0.19', '1.79', '...', '0 (Legit)'],
      ['69.99', '-0.47', '0.83', '-0.05', '...', '0 (Legit)'],
    ],
    steps: [
      {
        title: '1. Understand the Imbalance',
        description: 'Examine the extreme class distribution and discuss the Accuracy Paradox.',
        code: 'import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("credit_fraud.csv")\nprint("Shape:", df.shape)\nprint("\\nClass Distribution:")\nprint(df["Class"].value_counts())\nprint("\\nFraud Prevalence: {:.2f}%".format(\n    df["Class"].mean() * 100\n))\nprint("\\nAccuracy Paradox: A model predicting ALL legitimate")\nprint("achieves {:.2f}% accuracy while catching ZERO fraud!".format(\n    (1 - df["Class"].mean()) * 100\n))',
        output: 'Shape: (10000, 22)\n\nClass Distribution:\n0    9950\n1      50\n\nFraud Prevalence: 0.50%\n\nAccuracy Paradox: A model predicting ALL legitimate\nachieves 99.50% accuracy while catching ZERO fraud!',
        explanation: 'With only 0.5% fraud, accuracy is meaningless. A dummy model achieves 99.5% accuracy. We must use Precision, Recall, F1, and ROC-AUC instead.'
      },
      {
        title: '2. Train Logistic Regression',
        description: 'Use class_weight="balanced" to address imbalance during training.',
        code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.preprocessing import StandardScaler\n\nX = df.drop("Class", axis=1).values\ny = df["Class"].values\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y\n)\n\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\n# Balanced weights: penalize misclassifying the minority class\nlr = LogisticRegression(\n    class_weight="balanced", max_iter=1000, random_state=42\n)\nlr.fit(X_train_s, y_train)\n\nprint("Model trained with balanced class weights.")\nprint("Training samples: {} ({} fraud)".format(\n    len(y_train), y_train.sum()\n))\nprint("Testing samples:  {} ({} fraud)".format(\n    len(y_test), y_test.sum()\n))',
        output: 'Model trained with balanced class weights.\nTraining samples: 7000 (35 fraud)\nTesting samples:  3000 (15 fraud)',
        explanation: 'class_weight="balanced" automatically increases the penalty for misclassifying fraud samples, forcing the model to pay attention to the rare positive class.'
      },
      {
        title: '3. Evaluate with Appropriate Metrics',
        description: 'Go beyond accuracy and examine precision, recall, and the confusion matrix.',
        code: 'from sklearn.metrics import (\n    classification_report, confusion_matrix,\n    roc_auc_score\n)\n\ny_pred = lr.predict(X_test_s)\ny_proba = lr.predict_proba(X_test_s)[:, 1]\n\nprint("Confusion Matrix:")\ncm = confusion_matrix(y_test, y_pred)\ntn, fp, fn, tp = cm.ravel()\nprint("  TN={}, FP={}, FN={}, TP={}".format(tn, fp, fn, tp))\nprint("\\nClassification Report:")\nprint(classification_report(\n    y_test, y_pred,\n    target_names=["Legit", "Fraud"]\n))\nprint("ROC-AUC: {:.3f}".format(roc_auc_score(y_test, y_proba)))',
        output: 'Confusion Matrix:\n  TN=2930, FP=55, FN=2, TP=13\n\nClassification Report:\n              precision    recall  f1-score   support\n\n       Legit       1.00      0.98      0.99      2985\n       Fraud       0.19      0.87      0.31        15\n\n    accuracy                           0.98      3000\n   macro avg       0.60      0.93      0.65      3000\nweighted avg       1.00      0.98      0.99      3000\n\nROC-AUC: 0.964',
        explanation: 'Recall = 87% means we catch 13 of 15 frauds. Precision = 19% means 55 false alarms for every 13 caught frauds. ROC-AUC of 0.964 shows strong overall ranking. The trade-off: catching more fraud (high recall) requires tolerating more false alerts (low precision).'
      },
      {
        title: '4. Analyze the Cost Trade-off',
        description: 'Quantify the business impact of false positives vs false negatives.',
        code: 'avg_fraud_amount = 378.66  # Average fraud transaction value\nfp_review_cost = 5.00     # Cost to manually review a flagged transaction\n\nfraud_caught = tp * avg_fraud_amount\nfraud_missed = fn * avg_fraud_amount\nreview_cost = fp * fp_review_cost\n\nprint("=== Business Impact Analysis ===")\nprint("Fraud Caught (TP={}):   ${:,.2f} saved".format(tp, fraud_caught))\nprint("Fraud Missed (FN={}):    ${:,.2f} lost".format(fn, fraud_missed))\nprint("False Alarms (FP={}):   ${:,.2f} review cost".format(fp, review_cost))\nprint("\\nNet Benefit: ${:,.2f}".format(\n    fraud_caught - fraud_missed - review_cost\n))\nprint("\\nKey Insight: Even with 55 false alarms, the system")\nprint("saves ${:,.2f} net per test batch.".format(\n    fraud_caught - fraud_missed - review_cost\n))',
        output: '=== Business Impact Analysis ===\nFraud Caught (TP=13):   $4,922.58 saved\nFraud Missed (FN=2):    $757.32 lost\nFalse Alarms (FP=55):   $275.00 review cost\n\nNet Benefit: $3,890.26\n\nKey Insight: Even with 55 false alarms, the system\nsaves $3,890.26 net per test batch.',
        explanation: 'Despite low precision (19%), the system generates positive ROI because each caught fraud saves hundreds of dollars while each false alarm costs only $5 to review. Business context determines whether precision or recall matters more.'
      }
    ],
    keyFindings: [
      'A naive "all-legitimate" model scores 99.5% accuracy while catching zero fraud.',
      'class_weight="balanced" dramatically improves minority-class recall.',
      'Recall = 87% catches most fraud; Precision = 19% generates many false alarms.',
      'ROC-AUC (0.964) proves strong discrimination despite extreme imbalance.',
      'Business cost analysis shows positive ROI despite low precision.'
    ],
    reflection: 'This project demonstrated why accuracy is meaningless on imbalanced datasets. The key insight is that evaluation metrics must align with business costs: in fraud detection, missing a $400 fraud is 80x worse than reviewing a $5 false alarm. Real fraud systems use anomaly detection, ensemble methods, and adaptive thresholds.'
  }
];

// ─── Component ─────────────────────────────────────────────────────

export default function ProjectLab() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<Record<string, Set<number>>>({});
  const [showDataPreview, setShowDataPreview] = useState(false);
  const [showFindings, setShowFindings] = useState(false);

  const project = PROJECTS[activeProject];
  const step = project.steps[activeStep];
  const projectCompleted = completed[project.id] || new Set<number>();
  const allStepsDone = projectCompleted.size === project.steps.length;

  const markComplete = useCallback((stepIdx: number) => {
    setCompleted(prev => {
      const s = new Set(prev[project.id] || []);
      s.add(stepIdx);
      return { ...prev, [project.id]: s };
    });
  }, [project.id]);

  const totalCompleted = Object.values(completed).reduce((sum, s) => sum + s.size, 0);
  const totalSteps = PROJECTS.reduce((sum, p) => sum + p.steps.length, 0);

  return (
    <div className="rounded-xl border border-white/10 bg-navy-950/70 p-4 sm:p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-bold text-white">End-to-End ML Project Lab</h3>
          <p className="text-xs text-slate-400 mt-0.5">5 hands-on projects connecting every ML concept into complete workflows.</p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Progress: <span className="text-cyan-300">{totalCompleted}</span>/{totalSteps} steps
        </div>
      </div>

      {/* Project Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {PROJECTS.map((p, i) => {
          const done = (completed[p.id] || new Set()).size === p.steps.length;
          return (
            <button
              key={p.id}
              onClick={() => { setActiveProject(i); setActiveStep(0); setShowDataPreview(false); setShowFindings(false); }}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs transition-all ${
                activeProject === i
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-bold'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              <span className="mr-1">{p.emoji}</span>
              <span className="hidden sm:inline">{p.title}</span>
              <span className="sm:hidden">P{i + 1}</span>
              {done && <span className="ml-1 text-emerald-400">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Project Header */}
      <div className="p-4 rounded-lg bg-navy-900/60 border border-white/5 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl">{project.emoji}</span>
          <h4 className="text-sm font-bold text-white">{project.title}</h4>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            project.difficulty === 'Beginner' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' :
            project.difficulty === 'Intermediate' ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' :
            'border-amber-500/40 bg-amber-500/10 text-amber-300'
          }`}>{project.difficulty}</span>
        </div>
        <p className="text-xs text-slate-300">{project.problem}</p>
        <p className="text-[10px] text-slate-500 font-mono">Dataset: {project.dataset}</p>
      </div>

      {/* Dataset Preview Toggle */}
      <button
        onClick={() => setShowDataPreview(!showDataPreview)}
        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
      >
        <span>{showDataPreview ? '▼' : '▶'}</span>
        <span>Dataset Preview ({project.dataPreview.length} sample rows)</span>
      </button>
      {showDataPreview && (
        <div className="overflow-x-auto rounded-lg border border-white/5">
          <table className="min-w-full text-[10px] font-mono">
            <thead>
              <tr className="bg-navy-900/80">
                {project.dataHeaders.map(h => (
                  <th key={h} className="px-2 py-1.5 text-left text-cyan-400 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.dataPreview.map((row, ri) => (
                <tr key={ri} className="border-t border-white/5">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-2 py-1 text-slate-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step Navigation */}
      <div className="flex gap-1.5 flex-wrap">
        {project.steps.map((s, i) => {
          const isDone = projectCompleted.has(i);
          return (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-mono transition-all ${
                activeStep === i
                  ? 'border-purple-500/50 bg-purple-500/10 text-purple-300 font-bold'
                  : isDone
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                    : 'border-white/10 text-slate-500 hover:border-white/20'
              }`}
            >
              {isDone ? '✓ ' : ''}{s.title.split('.')[0]}
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="space-y-3">
        <div>
          <h5 className="text-xs font-bold text-white">{step.title}</h5>
          <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
        </div>

        {/* Code Block */}
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-navy-900/80 border-b border-white/5">
            <span className="text-[10px] font-mono text-slate-500">Python</span>
            <span className="text-[10px] font-mono text-amber-400">📋 Educational Demonstration</span>
          </div>
          <pre className="p-3 text-[11px] leading-relaxed font-mono text-slate-200 bg-navy-950/90 overflow-x-auto whitespace-pre">
            {step.code}
          </pre>
        </div>

        {/* Expected Output */}
        <div className="rounded-lg border border-white/5 overflow-hidden">
          <div className="px-3 py-1.5 bg-navy-900/60 border-b border-white/5">
            <span className="text-[10px] font-mono text-emerald-400">Expected Output</span>
          </div>
          <pre className="p-3 text-[10px] leading-relaxed font-mono text-emerald-200/80 bg-navy-950/60 overflow-x-auto whitespace-pre">
            {step.output}
          </pre>
        </div>

        {/* Explanation */}
        <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200">
          <strong>Explanation:</strong> {step.explanation}
        </div>

        {/* Mark Complete */}
        <button
          onClick={() => { markComplete(activeStep); if (activeStep < project.steps.length - 1) setActiveStep(activeStep + 1); }}
          className={`w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
            projectCompleted.has(activeStep)
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30'
          }`}
        >
          {projectCompleted.has(activeStep) ? '✓ Step Completed' : 'Mark Step Complete & Continue →'}
        </button>
      </div>

      {/* Key Findings (show when all steps done) */}
      {allStepsDone && (
        <button
          onClick={() => setShowFindings(!showFindings)}
          className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
        >
          <span>{showFindings ? '▼' : '▶'}</span>
          <span>🏆 Project Key Findings & Reflection</span>
        </button>
      )}
      {showFindings && allStepsDone && (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
            <div className="text-xs font-mono text-emerald-400 font-bold mb-2">KEY FINDINGS</div>
            <ul className="space-y-1.5">
              {project.keyFindings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-emerald-200">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-950/20 border border-purple-500/20">
            <div className="text-xs font-mono text-purple-400 font-bold mb-2">REFLECTION & LIMITATIONS</div>
            <p className="text-xs text-purple-200">{project.reflection}</p>
          </div>
        </div>
      )}

      {/* Overall Completion */}
      <div className="p-3 rounded-lg bg-navy-900/40 border border-white/5 flex items-center justify-between">
        <div className="text-[10px] text-slate-500 font-mono">
          Projects completed: {PROJECTS.filter(p => (completed[p.id] || new Set()).size === p.steps.length).length} / {PROJECTS.length}
        </div>
        <div className="h-1.5 flex-1 mx-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(totalCompleted / totalSteps) * 100}%` }}
          />
        </div>
        <div className="text-[10px] font-mono text-cyan-300">
          {Math.round((totalCompleted / totalSteps) * 100)}%
        </div>
      </div>
    </div>
  );
}

