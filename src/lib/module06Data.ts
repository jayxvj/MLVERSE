import { Lesson, Module } from './types';

export const MODULE_06_LESSONS: Lesson[] = [
  // 1. What is data visualization?
  {
    id: 'les-6-1',
    moduleId: 'mod-6',
    title: '1. What is Data Visualization?',
    slug: 'what-is-data-visualization',
    estimatedMinutes: 14,
    simpleDefinition: 'Data visualization is the graphical representation of information and data, using visual elements like charts, graphs, and maps to provide an accessible way to see and understand trends, outliers, and patterns.',
    whyItExists: 'Human cognitive perception processes visual patterns in parallel via the visual cortex in under 200 milliseconds, whereas reading and cross-referencing large tabular arrays of raw numbers places heavy strain on short-term working memory.',
    howItWorks: [
      'Visual Encoding: Map abstract data variables to retinal channels (position, length, area, angle, color, shape).',
      'Preattentive Processing: Leverage rapid visual detection of length and color differences before conscious thought.',
      'Data-to-Ink Ratio: Maximize informative visual cues while removing unnecessary clutter, gridlines, and decorations.',
      'Exploration & Discovery: Uncover anomalies, clusters, skewness, and non-linear relationships prior to modeling.'
    ],
    practicalExamples: [
      'Anscombe Quartet: 4 distinct datasets with identical summary statistics (mean, variance, correlation = 0.816) that reveal completely different shapes when plotted.',
      'Loss Curves: Tracking training loss vs validation loss curves over epochs to instantly diagnose underfitting or overfitting.',
      'Dimensionality Reduction: Visualizing high-dimensional embeddings in 2D using t-SNE or UMAP scatter plots.'
    ],
    commonMisconceptions: [
      {
        myth: 'Visualization is merely cosmetic formatting for business presentations after modeling is complete.',
        reality: 'Visualization is an indispensable diagnostic tool throughout the entire ML workflow—from data cleaning and feature engineering to residual diagnostics.'
      }
    ],
    conceptSummary: 'Data visualization maps quantitative dimensions to spatial visual channels, unlocking rapid preattentive pattern recognition.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Anscombe Quartet Diagnostic',
      scenario: 'Four datasets share identical summary statistics (Mean X=9, Mean Y=7.5, Pearson r=0.816, regression line y=3+0.5x). Plotting them immediately shows Dataset 1 is linear, Dataset 2 is quadratic, Dataset 3 has one outlier, and Dataset 4 is vertical with one outlier.',
      impact: 'Without plotting, an engineer would mistakenly apply the exact same linear regression model to all four datasets.'
    },
    keyTakeaways: [
      'Summary statistics alone can hide critical structural truths',
      'Visual cortex processes positional and length encodings in milliseconds',
      'Visualizations guide data preprocessing, hypothesis testing, and model evaluation'
    ],
    mathematics: {
      title: 'Tufte Data-to-Ink Ratio & Lie Factor',
      latex: '\\text{Data-Ink Ratio} = \\frac{\\text{Data-Ink}}{\\text{Total Ink Used}}, \\quad \\text{Lie Factor} = \\frac{\\text{Size of effect shown in graphic}}{\\text{Size of effect in data}}',
      plainText: 'Data-Ink Ratio = (Data-Ink) / (Total Ink Used); Lie Factor = (Size of effect in graphic) / (Size of effect in data)',
      explanation: 'Edward Tufte established that ethical visualizations should maximize data-ink (approaching 1.0) and keep the Lie Factor equal to 1.0.',
      breakdown: [
        { id: 'dir', symbol: 'DIR', name: 'Data-Ink Ratio', description: 'Proportion of non-erasable graphic ink dedicated to displaying data' },
        { id: 'lf', symbol: 'LF', name: 'Lie Factor', description: 'Ratio of visual distortion to true numeric change; values != 1 distort reality' }
      ]
    },
    pythonSnippet: {
      title: 'Anscombe Quartet Demonstration',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load Anscombe quartet
df = sns.load_dataset("anscombe")

# Plot the 4 distinct datasets
g = sns.lmplot(
    data=df, x="x", y="y", col="dataset",
    hue="dataset", col_wrap=2, ci=None,
    height=3, scatter_kws={"s": 60}
)
g.set_axis_labels("Feature X", "Target Y")
plt.show()`,
      expectedOutput: 'Four subplots rendered: one linear, one curved parabola, one linear with outlier, one vertical line with single outlier.',
      explanation: 'Anscombe quartet visually proves why data visualization is mandatory before training any statistical or ML model.'
    },
    knowledgeCheck: [
      {
        id: 'q6-1-1',
        question: 'What does the Anscombe Quartet fundamentally demonstrate?',
        options: [
          'That datasets with identical summary statistics can have completely different underlying patterns',
          'That 3D charts are superior to 2D charts',
          'That machine learning models never require data visualization',
          'That Pearson correlation is always equal to 1.0'
        ],
        correctIndex: 0,
        explanation: 'The Anscombe Quartet demonstrates that numerical summary statistics can completely mask non-linear patterns, clusters, and extreme outliers.'
      },
      {
        id: 'q6-1-2',
        question: 'Which visual channel is perceived most accurately by the human visual system for quantitative data?',
        options: [
          'Position along a common aligned scale',
          'Area of a 2D shape',
          'Color hue / saturation',
          'Angle / curvature'
        ],
        correctIndex: 0,
        explanation: 'William Cleveland and Robert McGill showed that position along a common scale is decoded with the highest cognitive accuracy, far outperforming angle, area, and color.'
      },
      {
        id: 'q6-1-3',
        question: 'What is a Lie Factor of 1.0 according to Edward Tufte?',
        options: [
          'A graph where the visual effect accurately reflects the exact mathematical effect in the data',
          'A graph that exaggerates differences by 100%',
          'A graph with zero data points',
          'A graph containing only pie charts'
        ],
        correctIndex: 0,
        explanation: 'A Lie Factor of 1.0 indicates an honest, undistorted visualization where the visual representation is directly proportional to the numerical data.'
      }
    ],
    revisionNotes: [
      'Visualizations bypass working memory limits by utilizing the brain preattentive visual system.',
      'Always inspect data visually before training algorithms.',
      'Maximal data-to-ink ratio minimizes cognitive distraction.'
    ]
  },

  // 2. Why visualization matters in ML
  {
    id: 'les-6-2',
    moduleId: 'mod-6',
    title: '2. Why Visualization Matters in Machine Learning',
    slug: 'why-visualization-matters-in-ml',
    estimatedMinutes: 15,
    simpleDefinition: 'In machine learning, visualization serves as the vital link between abstract mathematical algorithms and human domain understanding, guiding dataset curation, diagnostic debugging, and model interpretability.',
    whyItExists: 'Machine learning algorithms operate as black-box matrix multiplication pipelines. Without visual introspection tools (ROC curves, confusion matrices, SHAP summary plots, learning curves), practitioners cannot diagnose catastrophic failure modes.',
    howItWorks: [
      'Sanity-Check Training Dynamics: Detect exploding/vanishing gradients or divergence via loss trajectory graphs.',
      'Inspect Feature Relationships: Detect multicollinearity and non-linear boundaries via pair plots and correlation heatmaps.',
      'Diagnose Errors: Segment residual plots to identify heteroscedasticity (unequal error variances across targets).',
      'Explain Predictions: Render partial dependence plots and feature importance charts for regulatory compliance.'
    ],
    practicalExamples: [
      'Decision Boundary Inspection: Visualizing 2D projections of SVM margins vs Random Forest orthogonal splits.',
      'Residual Plotting: Checking if regression errors are randomly scattered around zero (homoscedasticity).',
      'Class Imbalance Detection: Displaying count plots showing a 99:1 fraud ratio before training.'
    ],
    commonMisconceptions: [
      {
        myth: 'If test accuracy is 95%, you do not need to visualize confusion matrices or ROC curves.',
        reality: 'A 95% accuracy on an imbalanced dataset where 95% of samples belong to the majority class means the model learned nothing but trivial guessing.'
      }
    ],
    conceptSummary: 'Visualization guides every phase of ML engineering: dataset sanity checking, boundary inspection, and residual error diagnostics.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Deep Learning Training Divergence',
      scenario: 'A computer vision team trains a 50-layer ResNet. By plotting loss curves on an interactive dashboard, they observe training loss oscillating wildly before reaching NaN in epoch 4 due to an excessive learning rate.',
      impact: 'Early visual intervention saved days of compute and thousands of dollars in cloud GPU budget.'
    },
    keyTakeaways: [
      'Visualization prevents training on flawed or imbalanced data',
      'Residual plots reveal violations of regression assumptions',
      'Learning curves diagnose bias, variance, and convergence rates'
    ],
    mathematics: {
      title: 'Residual Error Distribution',
      latex: 'e_i = y_i - \\hat{y}_i, \\quad \\mathbb{E}[e_i | x_i] = 0, \\quad \\text{Var}(e_i | x_i) = \\sigma^2',
      plainText: 'Residual e_i = y_i - y_hat_i; Expected error given x should be 0, and variance should be constant sigma^2 (homoscedasticity).',
      explanation: 'A healthy residual plot exhibits a uniform horizontal band of errors around zero without fan shapes or curvature.',
      breakdown: [
        { id: 'res', symbol: 'e_i', name: 'Residual', description: 'Difference between ground truth and predicted output' },
        { id: 'homo', symbol: 'Var(e|x) = sigma^2', name: 'Homoscedasticity', description: 'Constant error variance across all feature predictions' }
      ]
    },
    pythonSnippet: {
      title: 'Plotting Residual Errors in Seaborn',
      code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Generate synthetic linear data with heteroscedastic noise
np.random.seed(42)
x = np.linspace(1, 10, 100)
noise = np.random.normal(0, 0.4 * x, 100)
y = 2.5 * x + noise

# Plot residual distribution
plt.figure(figsize=(7, 4))
sns.residplot(x=x, y=y, lowess=True, color="#00f0ff")
plt.title("Residual Diagnostic Plot (Heteroscedasticity Check)")
plt.xlabel("Independent Variable X")
plt.ylabel("Residuals (y - y_hat)")
plt.grid(True, alpha=0.3)
plt.show()`,
      expectedOutput: 'Scatter plot of residuals showing a fanning-out pattern indicating heteroscedasticity.',
      explanation: 'The fanning out of points as X increases proves the constant variance assumption is violated.'
    },
    knowledgeCheck: [
      {
        id: 'q6-2-1',
        question: 'What pattern in a residual plot indicates heteroscedasticity (violating linear model assumptions)?',
        options: [
          'A funnel or fan shape where residuals spread wider as predictions grow larger',
          'A perfectly flat horizontal stripe centered at 0',
          'Residuals that sum to exactly 0',
          'A vertical line of points'
        ],
        correctIndex: 0,
        explanation: 'A funnel/cone shape where error spread changes across the prediction range indicates heteroscedasticity.'
      },
      {
        id: 'q6-2-2',
        question: 'Why is an ROC curve preferable to raw accuracy for evaluating imbalanced classifiers?',
        options: [
          'It plots True Positive Rate vs False Positive Rate across all classification thresholds, independent of class distribution',
          'It always shows 100% accuracy',
          'It only works on regression problems',
          'It eliminates the need for test datasets'
        ],
        correctIndex: 0,
        explanation: 'The ROC curve visualizes the trade-off between sensitivity and specificity across every possible probability cutoff threshold.'
      },
      {
        id: 'q6-2-3',
        question: 'When diagnosing a learning curve, what does a large persistent gap between training and validation error indicate?',
        options: [
          'High Variance / Overfitting',
          'High Bias / Underfitting',
          'Zero error / Perfect Generalization',
          'Data Leakage'
        ],
        correctIndex: 0,
        explanation: 'A wide gap where training error is very low but validation error remains high is the classic visual signature of high variance (overfitting).'
      }
    ],
    revisionNotes: [
      'Visualizing residuals validates mathematical assumptions of algorithms.',
      'Learning curves diagnose whether more training data or regularization is needed.',
      'ROC and Precision-Recall curves prevent deceptive accuracy traps on skewed data.'
    ]
  },

  // 3. Bar chart
  {
    id: 'les-6-3',
    moduleId: 'mod-6',
    title: '3. Bar Chart: Categorical Magnitude Comparison',
    slug: 'bar-chart',
    estimatedMinutes: 15,
    simpleDefinition: 'A bar chart represents categorical data with rectangular bars whose heights or lengths are proportional to the numerical values they represent.',
    whyItExists: 'Bar charts align quantitative values along a shared, common baseline (usually zero), allowing the human eye to compare relative magnitudes with the highest level of perceptual precision.',
    howItWorks: [
      'Categorical Axis: Groups discrete classes along one axis (X or Y).',
      'Quantitative Axis: Displays a continuous scale starting strictly at zero to preserve physical proportions.',
      'Bar Length: Encodes metric quantity (frequency, mean, sum, median).',
      'Ordering: Sorting categories by descending value drastically improves readability and fast cognitive parsing.'
    ],
    practicalExamples: [
      'Feature Importance: Plotting the top 10 most predictive features from a Random Forest regressor.',
      'Class Frequencies: Displaying customer count per subscription tier (Free, Pro, Enterprise).',
      'Average Revenue: Comparing average transaction value across sales regions.'
    ],
    commonMisconceptions: [
      {
        myth: 'Bar charts and Histograms are identical charts with different names.',
        reality: 'Bar charts plot discrete categorical labels with intentional gaps between bars. Histograms plot continuous numerical intervals (bins) without gaps.'
      }
    ],
    conceptSummary: 'Bar charts compare numeric metrics across discrete categories using aligned 1D lengths starting from zero.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'Feature Importance Evaluation',
      scenario: 'A credit scoring ensemble yields 45 feature weights. A horizontal bar chart of the top 8 features instantly shows "Debt-to-Income Ratio" and "Payment History" account for 68% of total model split gains.',
      impact: 'Engineers prune 30 noisy low-gain features, slashing latency by 45% without reducing AUC.'
    },
    keyTakeaways: [
      'Always start quantitative axes at zero to prevent Lie Factor distortion',
      'Use horizontal bars when category labels are long or exceed 6 categories',
      'Sort bars logically (by descending value) rather than arbitrary alphabetical order'
    ],
    mathematics: {
      title: 'Categorical Aggregation Metric',
      latex: '\\bar{y}_c = \\frac{1}{N_c} \\sum_{i \\in C} y_i, \\quad h_c \\propto \\bar{y}_c',
      plainText: 'Mean bar height h_c is proportional to the average of target y within category c.',
      explanation: 'The visual length of bar c is directly proportional to its computed aggregate metric.',
      breakdown: [
        { id: 'h_c', symbol: 'h_c', name: 'Bar Height', description: 'Visual length of category bar' },
        { id: 'y_bar', symbol: 'y_c', name: 'Group Aggregate', description: 'Sample mean, sum, or frequency for category c' }
      ]
    },
    pythonSnippet: {
      title: 'Sorted Horizontal Bar Chart in Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Feature importances dataframe
data = pd.DataFrame({
    "feature": ["Debt-to-Income", "Credit Score", "Annual Income", "Age", "Employment Yrs"],
    "importance": [0.38, 0.28, 0.18, 0.10, 0.06]
}).sort_values(by="importance", ascending=False)

plt.figure(figsize=(8, 4))
sns.barplot(data=data, x="importance", y="feature", palette="mako")
plt.title("Random Forest Feature Importances", fontsize=13)
plt.xlabel("Relative Gini Gain")
plt.ylabel("")
plt.xlim(0, 0.45)
plt.show()`,
      expectedOutput: 'Clean horizontal bar chart ordered from highest importance to lowest importance.',
      explanation: 'Horizontal orientation guarantees long feature names remain fully readable without diagonal rotation.'
    },
    knowledgeCheck: [
      {
        id: 'q6-3-1',
        question: 'Why MUST the quantitative axis of a standard bar chart always start at zero?',
        options: [
          'Because bar height directly encodes quantity; truncating the baseline distorts the ratio of bar lengths',
          'Because computer screens cannot render negative numbers',
          'Because Python throws an exception if the axis starts above zero',
          'Because zero is the average of all datasets'
        ],
        correctIndex: 0,
        explanation: 'Bar charts encode values through length. If the axis starts at 90 instead of 0, a value of 95 looks half the size of 100, manufacturing a false 10x visual difference.'
      },
      {
        id: 'q6-3-2',
        question: 'When is a horizontal bar chart strongly preferred over a vertical bar chart?',
        options: [
          'When category labels are lengthy or when displaying more than 7 categories',
          'Only when plotting negative numbers',
          'When plotting continuous time-series dates',
          'Never; vertical bar charts are always better'
        ],
        correctIndex: 0,
        explanation: 'Horizontal bars leave ample room on the Y-axis for long, descriptive category labels without awkward diagonal text tilting.'
      },
      {
        id: 'q6-3-3',
        question: 'What distinguishes a bar chart from a histogram?',
        options: [
          'Bar charts compare discrete categories with gaps; histograms show continuous frequency distributions without gaps',
          'Histograms only use circular slices',
          'Bar charts cannot display numbers',
          'There is no difference between them'
        ],
        correctIndex: 0,
        explanation: 'Bar charts display discrete, qualitative categories with visual gaps. Histograms display continuous numeric data partitioned into adjacent intervals.'
      }
    ],
    revisionNotes: [
      'Bar charts compare categorical groups along a shared zero-anchored baseline.',
      'Sort categories descending by value for instant ranking.',
      'Use horizontal layouts to prevent awkward angled text.'
    ]
  },

  // 4. Grouped bar chart
  {
    id: 'les-6-4',
    moduleId: 'mod-6',
    title: '4. Grouped Bar Chart: Bivariate Categorical Comparison',
    slug: 'grouped-bar-chart',
    estimatedMinutes: 15,
    simpleDefinition: 'A grouped bar chart (clustered bar chart) places side-by-side bars within primary categories to compare a quantitative variable across two distinct categorical dimensions simultaneously.',
    whyItExists: 'When analyzing interactions between two categorical features (e.g. customer churn rate broken down by both Subscription Tier AND Billing Cycle), a standard bar chart fails. Grouped bars reveal sub-group differences side-by-side.',
    howItWorks: [
      'Primary Categorical Axis: Defines major clusters (e.g. Free, Pro, Enterprise).',
      'Secondary Hue Grouping: Subdivides each cluster into adjacent colored bars (e.g. Monthly vs Annual billing).',
      'Quantitative Axis: Measures the continuous target metric across all sub-bars.',
      'Legend: Identifies the secondary categorical variable by color encoding.'
    ],
    practicalExamples: [
      'Model Comparison Across Datasets: Comparing Accuracy of Logistic Regression, Random Forest, and XGBoost across 3 client benchmark datasets.',
      'SaaS Churn Analysis: Comparing monthly churn % across plans segmented by payment method.',
      'A/B Experimentation: Comparing click-through rates across device types (Mobile vs Desktop) for Variant A vs Variant B.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can add 5 or 6 sub-groups within each cluster without hurting readability.',
        reality: 'Beyond 3 or 4 sub-groups, visual clutter explodes and cognitive comparison breaks down. Use faceted subplots instead.'
      }
    ],
    conceptSummary: 'Grouped bar charts cluster sub-bars side-by-side to compare metrics across two categorical variables at once.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Multi-Model Benchmark Evaluation',
      scenario: 'An ML platform evaluates 3 algorithms (LightGBM, XGBoost, CatBoost) across 4 domain datasets (Finance, Healthcare, E-Commerce, Sensors). Grouped bar charts immediately reveal CatBoost dominates on Categorical E-Commerce, while LightGBM leads in latency.',
      impact: 'Enables precise algorithmic deployment matching specific client domain constraints.'
    },
    keyTakeaways: [
      'Best for comparing 2 categorical features + 1 numeric metric',
      'Limit secondary grouping to 2–4 distinct categories to avoid clutter',
      'Keep color legends consistent and high contrast'
    ],
    mathematics: {
      title: 'Bivariate Subgroup Mean',
      latex: '\\bar{y}_{c, g} = \\frac{1}{N_{c,g}} \\sum_{i \\in C \\cap G} y_i',
      plainText: 'Metric is computed for the intersection of primary category c and secondary subgroup g.',
      explanation: 'Each bar represents an empirical statistic calculated on the joint subset C intersect G.',
      breakdown: [
        { id: 'c', symbol: 'c', name: 'Primary Group', description: 'Major cluster on the X-axis' },
        { id: 'g', symbol: 'g', name: 'Secondary Hue Group', description: 'Color-encoded sub-bar within each cluster' }
      ]
    },
    pythonSnippet: {
      title: 'Grouped Bar Chart with Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Multi-algorithm benchmark data
df = pd.DataFrame({
    "Dataset": ["Finance", "Finance", "Healthcare", "Healthcare", "Retail", "Retail"],
    "Model": ["LightGBM", "CatBoost", "LightGBM", "CatBoost", "LightGBM", "CatBoost"],
    "F1_Score": [0.89, 0.91, 0.84, 0.87, 0.92, 0.93]
})

plt.figure(figsize=(8, 4.5))
sns.barplot(data=df, x="Dataset", y="F1_Score", hue="Model", palette="crest")
plt.title("Model F1-Score Benchmark Across Industry Datasets")
plt.ylim(0.7, 1.0)
plt.legend(title="Algorithm", loc="lower right")
plt.show()`,
      expectedOutput: 'Pairs of side-by-side colored bars comparing LightGBM vs CatBoost across three sectors.',
      explanation: 'Using the hue parameter automatically splits bars into side-by-side grouped clusters.'
    },
    knowledgeCheck: [
      {
        id: 'q6-4-1',
        question: 'What types of variables are required to generate a grouped bar chart?',
        options: [
          'Two categorical variables and one quantitative metric',
          'Three continuous numeric variables',
          'One single categorical variable only',
          'Only datetime series'
        ],
        correctIndex: 0,
        explanation: 'Grouped bar charts display one continuous numeric metric partitioned across two categorical factors (primary axis and hue grouping).'
      },
      {
        id: 'q6-4-2',
        question: 'What is the primary risk of adding too many subgroups inside each cluster of a grouped bar chart?',
        options: [
          'Severe visual clutter that overwhelms cognitive comparison',
          'Underfitting the machine learning model',
          'Automatic zero-division error in Python',
          'The chart converting into a 3D surface'
        ],
        correctIndex: 0,
        explanation: 'Clustering more than 3 or 4 bars together forces tiny widths, confusing legends, and high cognitive load. Faceting is preferred for higher cardinality.'
      },
      {
        id: 'q6-4-3',
        question: 'When comparing algorithms across multiple metrics, what is a cleaner alternative to an overloaded grouped bar chart?',
        options: [
          'Faceted small multiples (separate subplots sharing identical axes)',
          'A 3D pie chart',
          'A table with random colors',
          'Deleting half the algorithms'
        ],
        correctIndex: 0,
        explanation: 'Small multiples (faceting) break complex multi-group charts into an aligned grid of simple, easily digestible subplots.'
      }
    ],
    revisionNotes: [
      'Grouped bars display two categorical variables against one numeric metric.',
      'Ideal for comparing 2–3 competing models across benchmark datasets.',
      'Switch to faceted subplots when secondary categories exceed 4.'
    ]
  },

  // 5. Stacked bar chart
  {
    id: 'les-6-5',
    moduleId: 'mod-6',
    title: '5. Stacked Bar Chart: Part-to-Whole Composition',
    slug: 'stacked-bar-chart',
    estimatedMinutes: 15,
    simpleDefinition: 'A stacked bar chart places sub-segment bars on top of one another within each category, showing both the total aggregate magnitude and the part-to-whole relative breakdown.',
    whyItExists: 'When both the total sum of a category AND its constituent composition matter (e.g. Total Cloud Computing Bill broken down by Compute, Storage, and Networking), stacking allows viewing macro totals and micro parts simultaneously.',
    howItWorks: [
      'Segment Stacking: Each subcategory sits directly atop the previous subcategory.',
      'Total Bar Height: Represents the grand cumulative sum of all segments.',
      'Baseline Baseline: Only the bottom segment shares a consistent baseline (0); intermediate segments start at floating heights.',
      '100% Normalized Variant: Scales all total heights to 100%, emphasizing relative percentage share over absolute sums.'
    ],
    practicalExamples: [
      'Customer Retention: Stacked bars showing active, churned, and newly acquired users per quarter.',
      'Classification Confusion Matrix Breakdown: Stacking True Positives, False Positives, and False Negatives per class.',
      'Infrastructure Costs: Monthly AWS bill broken down by EC2, S3, RDS, and CloudFront.'
    ],
    commonMisconceptions: [
      {
        myth: 'It is easy to accurately compare the sizes of middle segments across different bars in a stacked chart.',
        reality: 'Because middle segments do not share a common horizontal baseline, human observers struggle to compare their relative lengths accurately.'
      }
    ],
    conceptSummary: 'Stacked bars display cumulative totals alongside internal composition, with 100% normalized variants highlighting proportions.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'SaaS Monthly Recurring Revenue (MRR) Breakdown',
      scenario: 'A finance team tracks MRR quarterly. A stacked bar chart stacks New Customer MRR, Expansion MRR from upgrades, and Churn MRR contraction. The overall height displays Net MRR, while colored segments reveal if growth is driven by new signups or upsells.',
      impact: 'Revealed that 70% of revenue growth stemmed from existing customer expansion rather than new ad signups.'
    },
    keyTakeaways: [
      'Displays both cumulative totals and internal part-to-whole breakdown',
      'Middle segments lack a common baseline, making precise comparison difficult',
      'Use the 100% stacked bar chart when proportional share matters more than absolute volume'
    ],
    mathematics: {
      title: 'Segment Cumulative Summation',
      latex: 'H_c = \\sum_{k=1}^K v_{c,k}, \\quad p_{c,k} = \\frac{v_{c,k}}{H_c} \\times 100\\%',
      plainText: 'Total height H_c is sum of all K segments v_(c,k); normalized percentage p_(c,k) divides segment by total.',
      explanation: 'The bar height represents total sum; in 100% stacked mode, each segment is scaled to its relative percentage p.',
      breakdown: [
        { id: 'H_c', symbol: 'H_c', name: 'Total Bar Height', description: 'Cumulative sum of all sub-components' },
        { id: 'p_k', symbol: 'p_{c,k}', name: 'Normalized Share', description: 'Percentage contribution of sub-segment k' }
      ]
    },
    pythonSnippet: {
      title: '100% Normalized Stacked Bar Chart',
      code: `import pandas as pd
import matplotlib.pyplot as plt

# User retention cohort data
df = pd.DataFrame({
    "Cohort": ["Q1", "Q2", "Q3", "Q4"],
    "Active": [650, 720, 810, 890],
    "Churned": [200, 180, 150, 120]
}).set_index("Cohort")

# Normalize to 100%
df_norm = df.div(df.sum(axis=1), axis=0) * 100

ax = df_norm.plot(kind="bar", stacked=True, color=["#00f0ff", "#f43f5e"], figsize=(7, 4.5))
plt.title("100% Stacked Retention Breakdown by Cohort", fontsize=12)
plt.ylabel("Percentage (%)")
plt.ylim(0, 100)
plt.legend(loc="upper right")
plt.show()`,
      expectedOutput: 'Normalized stacked bars reaching exactly 100% showing rising active retention proportion across quarters.',
      explanation: 'Normalizing by row sums allows clean evaluation of percentage trends over time.'
    },
    knowledgeCheck: [
      {
        id: 'q6-5-1',
        question: 'What is the main cognitive weakness of stacked bar charts for middle segments?',
        options: [
          'Middle segments do not share a common baseline, making length comparisons difficult',
          'They cannot display more than 1 bar',
          'They cannot be rendered in Python',
          'They require log transforms'
        ],
        correctIndex: 0,
        explanation: 'Because intermediate segments start at varying heights determined by the segments below them, the human eye cannot easily compare their lengths across categories.'
      },
      {
        id: 'q6-5-2',
        question: 'When should a 100% stacked bar chart be selected over a standard stacked bar chart?',
        options: [
          'When comparing relative percentage proportions across categories of different total sizes',
          'When all categories have zero elements',
          'When plotting continuous sensor waveforms',
          'When measuring correlation coefficients'
        ],
        correctIndex: 0,
        explanation: '100% stacked bar charts eliminate absolute size differences, focusing purely on compositional proportions.'
      },
      {
        id: 'q6-5-3',
        question: 'Which segment in a stacked bar chart is easiest for humans to compare accurately?',
        options: [
          'The bottom segment, because it is aligned to a flat zero baseline',
          'The middle segment',
          'The top segment',
          'All segments are equally easy to compare'
        ],
        correctIndex: 0,
        explanation: 'Only the bottom-most segment shares an aligned common baseline (0), preserving the full perceptual advantage of length comparison.'
      }
    ],
    revisionNotes: [
      'Stacked bars show cumulative totals and subsegment contributions.',
      'Middle segments suffer from floating baselines.',
      'Place the most critical segment at the bottom aligned to 0.'
    ]
  },

  // 6. Histogram
  {
    id: 'les-6-6',
    moduleId: 'mod-6',
    title: '6. Histogram: Continuous Distribution & Frequency Analysis',
    slug: 'histogram',
    estimatedMinutes: 16,
    simpleDefinition: 'A histogram visualizes the distribution of a continuous numerical variable by dividing the data range into a series of contiguous intervals (bins) and counting how many observations fall into each bin.',
    whyItExists: 'Continuous features (e.g. house prices, patient blood pressure, transaction amounts) have infinitely many possible values. Histograms discretize continuous space into bins, instantly unveiling shape, central tendency, spread, skewness, and modality.',
    howItWorks: [
      'Bin Partitioning: Divide the span [min, max] into K equal-width intervals.',
      'Frequency Counting: Count data observations falling within each bin interval [b_k, b_{k+1}).',
      'Bar Representation: Draw adjacent rectangles whose heights equal counts (or probability density) with NO gaps between bars.',
      'Shape Diagnosis: Identify whether the distribution is Gaussian (bell-shaped), right-skewed, bimodal, or uniform.'
    ],
    practicalExamples: [
      'Target Skewness Check: Inspecting whether house prices are heavily right-skewed, requiring a log-transform before linear regression.',
      'Feature Discretization: Diagnosing natural cluster boundaries in customer age before binning.',
      'Sensor Noise Inspection: Confirming accelerometer measurement noise is zero-mean Gaussian.'
    ],
    commonMisconceptions: [
      {
        myth: 'The choice of bin width does not affect the interpreted distribution shape.',
        reality: 'Bin width dramatically alters perceived shape. Too few bins (oversmoothing) hides multi-modal peaks; too many bins (undersmoothing) introduces noisy jagged spikes.'
      }
    ],
    conceptSummary: 'Histograms partition continuous numbers into adjacent bins to reveal distribution shape, spread, and modality.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'Algorithmic Trading Latency Analysis',
      scenario: 'A quantitative fund measures execution latency in microseconds across 50,000 trades. A histogram reveals a sharp primary peak at 12 microseconds, but a secondary bimodal hump at 450 microseconds.',
      impact: 'Investigation revealed garbage-collection pauses in their messaging broker, which was patched to save execution slippage.'
    },
    keyTakeaways: [
      'Bars touch each other because the underlying variable scale is continuous',
      'Use Freedman-Diaconis or Sturges rule to set optimal bin widths mathematically',
      'Crucial first step for determining whether to apply Log or Box-Cox transformations'
    ],
    mathematics: {
      title: 'Freedman-Diaconis Optimal Bin Width Rule',
      latex: 'h = 2 \\cdot \\frac{\\text{IQR}(x)}{\\sqrt[3]{N}}, \\quad K = \\left\\lceil \\frac{\\max(x) - \\min(x)}{h} \\right\\rceil',
      plainText: 'Optimal bin width h = 2 * IQR(x) / (N^(1/3)); Number of bins K = Range / h',
      explanation: 'Freedman-Diaconis rule uses the Interquartile Range (IQR) to determine bin size resilient against extreme outliers.',
      breakdown: [
        { id: 'h', symbol: 'h', name: 'Bin Width', description: 'Width of each interval on the continuous scale' },
        { id: 'iqr', symbol: 'IQR', name: 'Interquartile Range', description: '75th percentile minus 25th percentile' },
        { id: 'N', symbol: 'N', name: 'Sample Size', description: 'Total number of observations' }
      ]
    },
    pythonSnippet: {
      title: 'Histogram with KDE Curve in Seaborn',
      code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Generate log-normal skewed data (e.g. income or prices)
np.random.seed(42)
data = np.random.lognormal(mean=2.5, sigma=0.6, size=1000)

plt.figure(figsize=(8, 4.5))
sns.histplot(data, bins="fd", kde=True, color="#00f0ff", edgecolor="white", alpha=0.6)
plt.title("Continuous Feature Distribution (Freedman-Diaconis Bins + KDE)")
plt.xlabel("Value Range")
plt.ylabel("Observation Count")
plt.show()`,
      expectedOutput: 'Histogram showing right-skewed distribution with fitted smooth cyan Kernel Density Estimation line.',
      explanation: 'bins="fd" applies the Freedman-Diaconis rule; kde=True overlays a smooth non-parametric density estimate.'
    },
    knowledgeCheck: [
      {
        id: 'q6-6-1',
        question: 'Why are there no visual gaps between bars in a standard histogram?',
        options: [
          'Because the underlying data represents a continuous numerical interval where boundaries touch',
          'To save ink and screen pixels',
          'Because Seaborn does not support bar spacing',
          'Because all datasets have zero variance'
        ],
        correctIndex: 0,
        explanation: 'The absence of gaps signifies continuous data: the right edge of one bin interval is the exact left edge of the next interval.'
      },
      {
        id: 'q6-6-2',
        question: 'What is the danger of setting an excessively large number of bins (undersmoothing)?',
        options: [
          'The histogram becomes noisy and jagged, showing random sampling fluctuations rather than the true distribution shape',
          'The data becomes right-skewed automatically',
          'The computer will run out of memory',
          'It deletes all outliers'
        ],
        correctIndex: 0,
        explanation: 'Undersmoothing (too many bins) fragments data into 1-count spikes, obscuring underlying population characteristics.'
      },
      {
        id: 'q6-6-3',
        question: 'What does a histogram with two distinct prominent peaks represent?',
        options: [
          'A bimodal distribution indicating two distinct underlying sub-populations',
          'A calculation error in pandas',
          'A perfectly standard normal distribution',
          'Severe data leakage'
        ],
        correctIndex: 0,
        explanation: 'A bimodal distribution shows two local maxima, often signaling that two different groups (e.g. weekday vs weekend users) are mixed together.'
      }
    ],
    revisionNotes: [
      'Histograms discretize continuous features into adjacent bin intervals.',
      'Check for skewness, kurtosis, and modality before modeling.',
      'Use Freedman-Diaconis rule to balance smoothing and detail.'
    ]
  },

  // 7. Pie chart
  {
    id: 'les-6-7',
    moduleId: 'mod-6',
    title: '7. Pie Chart: Proportions, Pitfalls and Alternatives',
    slug: 'pie-chart',
    estimatedMinutes: 14,
    simpleDefinition: 'A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions, where the arc length, central angle, and area of each slice are proportional to the quantity it represents.',
    whyItExists: 'Pie charts are ubiquitous in popular media for showing simple part-to-whole relationships when a small number of categories sum to exactly 100%.',
    howItWorks: [
      'Angle Calculation: Converts fraction to degrees: Angle = (Category Value / Grand Total) * 360 degrees.',
      'Area Encoding: Slices fill a 2D circular disc representing 100%.',
      'Cognitive Decoding: Human perception must decode values using angles and wedge areas.',
      'Strict Limitation: Highly vulnerable to misinterpretation when categories have similar values or exceed 4-5 slices.'
    ],
    practicalExamples: [
      'Binary Split: Simple 70% vs 30% split between Train and Test sets.',
      'Device OS Distribution: Quick breakdown of Mobile vs Desktop visitors when only 2 categories exist.',
      'Budget Allocation: High-level executive overview of 3 major cost buckets.'
    ],
    commonMisconceptions: [
      {
        myth: '3D Pie Charts look more professional and are easier to read.',
        reality: '3D pie charts are the single most misleading chart type in data science. Perspective distortion makes front wedges appear up to 40% larger than identical back wedges.'
      }
    ],
    conceptSummary: 'Pie charts encode fractions through circular angles; best restricted to 2-3 categories, with bar charts preferred for accurate comparisons.',
    interactiveExperienceType: 'chart-interpretation-lab',
    realWorldExample: {
      domain: 'Executive Dashboard Distortion',
      scenario: 'A startup displays a 3D tilted pie chart of market share with 8 competitor products. Product A (22%) is in front, appearing larger than Product B (26%) in the back due to 3D perspective distortion.',
      impact: 'Board members make misinformed capital allocations based on a deceptive visual artifact.'
    },
    keyTakeaways: [
      'Humans decode angles and 2D areas far less accurately than 1D linear bar lengths',
      'Never use 3D pie charts under any circumstances',
      'Replace with sorted horizontal bar charts when categories exceed 3'
    ],
    mathematics: {
      title: 'Radial Angle Mapping',
      latex: '\\theta_i = \\frac{x_i}{\\sum_{j=1}^K x_j} \\cdot 360^\\circ, \\quad \\sum_{i=1}^K \\theta_i = 360^\\circ',
      plainText: 'Slice angle theta_i = (x_i / Total) * 360 degrees; sum of all slice angles equals 360 degrees.',
      explanation: 'The central angle theta of slice i is directly proportional to its fractional contribution.',
      breakdown: [
        { id: 'theta', symbol: '\\theta_i', name: 'Central Angle', description: 'Degree angle of the slice in the circular disc' },
        { id: 'ratio', symbol: 'x_i / Total', name: 'Fractional Share', description: 'Proportion of category i relative to the whole' }
      ]
    },
    pythonSnippet: {
      title: 'Pie Chart vs Donut Chart in Matplotlib',
      code: `import matplotlib.pyplot as plt

# 3-class distribution
labels = ["Class A", "Class B", "Class C"]
sizes = [55, 30, 15]
colors = ["#00f0ff", "#7000ff", "#3b82f6"]

plt.figure(figsize=(6, 6))
# Create clean donut chart (center hole reduces angle misperception)
wedges, texts, autotexts = plt.pie(
    sizes, labels=labels, autopct="%1.1f%%",
    startangle=140, colors=colors,
    pctdistance=0.8, textprops={"color": "white"}
)
# Draw center circle to form donut
centre_circle = plt.Circle((0, 0), 0.60, fc="#070b19")
plt.gca().add_artist(centre_circle)
plt.title("Class Balance (Donut Representation)", color="white")
plt.show()`,
      expectedOutput: 'Clean high-contrast donut chart showing 55%, 30%, and 15% slices.',
      explanation: 'A donut chart removes the center apex, steering the eye toward outer arc length rather than distorted central angles.'
    },
    knowledgeCheck: [
      {
        id: 'q6-7-1',
        question: 'Why do data visualization experts generally discourage pie charts with more than 4 or 5 slices?',
        options: [
          'Human perception is poor at comparing non-aligned angles and 2D slice areas',
          'Pie charts cannot be drawn in modern web browsers',
          'Angles cannot add up to 360 degrees in mathematics',
          'They cannot display percentages'
        ],
        correctIndex: 0,
        explanation: 'Empirical perceptual research proves humans struggle to judge differences in angles and areas without an aligned baseline.'
      },
      {
        id: 'q6-7-2',
        question: 'What is the primary visual defect introduced by a 3D perspective pie chart?',
        options: [
          'Slices in the foreground appear artificially larger than identical slices in the background due to perspective projection',
          'The chart changes colors randomly',
          'It converts continuous features into discrete ones',
          'It rounds all numbers to zero'
        ],
        correctIndex: 0,
        explanation: 'Perspective foreshortening expands the visual area of foreground slices while compressing background slices, severely violating data integrity.'
      },
      {
        id: 'q6-7-3',
        question: 'What is the most effective drop-in replacement for a cluttered 7-slice pie chart?',
        options: [
          'A sorted horizontal bar chart with percentages',
          'An animated 3D cone chart',
          'A correlation heatmap',
          'A pair plot matrix'
        ],
        correctIndex: 0,
        explanation: 'A sorted horizontal bar chart shows categories on a common zero baseline, allowing immediate and error-free ranking.'
      }
    ],
    revisionNotes: [
      'Pie charts encode data as angular slices of a 360-degree circle.',
      'Restrict usage to 2–3 easily distinguishable categories.',
      'Prefer donut or horizontal bar charts for analytical clarity.'
    ]
  },

  // 8. Box plot
  {
    id: 'les-6-8',
    moduleId: 'mod-6',
    title: '8. Box Plot: Five-Number Summary & Outlier Detection',
    slug: 'box-plot',
    estimatedMinutes: 16,
    simpleDefinition: 'A box plot (box-and-whisker plot) displays the distribution of a continuous variable through its five-number statistical summary: Minimum, First Quartile (Q1), Median (Q2), Third Quartile (Q3), and Maximum, with isolated points for outliers.',
    whyItExists: 'Histograms can be bulky when comparing distributions across 10 different categories simultaneously. Box plots provide an ultra-compact summary that exposes median shift, variance spread, skewness, and extreme anomalies side-by-side.',
    howItWorks: [
      'The Box: Spans the Interquartile Range (IQR = Q3 - Q1), encapsulating the middle 50% of the data.',
      'Median Line: Drawn inside the box at Q2 (50th percentile); off-center medians indicate skewness.',
      'Whiskers: Extend to the furthest data point within 1.5 * IQR from the box edges.',
      'Outlier Points: Any observations lying outside the whiskers [Q1 - 1.5*IQR, Q3 + 1.5*IQR] are plotted as discrete individual dots.'
    ],
    practicalExamples: [
      'Salary Comparison across Job Roles: Comparing salary distributions across Software Engineers, Data Scientists, and Product Managers.',
      'Outlier Identification in Preprocessing: Flagging extreme house square footage values before fitting linear models.',
      'Model Latency Testing: Evaluating inference latency variations across GPU batch sizes.'
    ],
    commonMisconceptions: [
      {
        myth: 'The ends of the whiskers always represent the absolute minimum and maximum values of the dataset.',
        reality: 'Whiskers extend only to the most extreme data point within 1.5 * IQR. Points beyond this threshold are defined as outliers and rendered as individual markers.'
      }
    ],
    conceptSummary: 'Box plots display median, IQR spread, skewness, and outliers using John Tukey five-number summary.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'Credit Card Fraud Detection',
      scenario: 'Fraud analysts compare transaction amount distributions for Legitimate vs Fraudulent transactions. A side-by-side box plot shows legitimate transactions have a tight IQR below $85, while fraud displays extreme outliers extending beyond $5,000.',
      impact: 'Engineers set dynamic transaction review thresholds based on upper whisker boundaries.'
    },
    keyTakeaways: [
      'Middle box holds the central 50% of observations (IQR)',
      'Outliers are mathematically flagged beyond 1.5 * IQR from quartiles',
      'Ideal for comparing continuous distributions across multiple categories'
    ],
    mathematics: {
      title: 'Tukey Outlier Boundaries',
      latex: '\\text{IQR} = Q_3 - Q_1, \\quad \\text{Lower Fence} = Q_1 - 1.5 \\cdot \\text{IQR}, \\quad \\text{Upper Fence} = Q_3 + 1.5 \\cdot \\text{IQR}',
      plainText: 'IQR = Q3 - Q1; Lower Fence = Q1 - 1.5*IQR; Upper Fence = Q3 + 1.5*IQR; Outliers lie outside fences.',
      explanation: 'Any observation x < Lower Fence or x > Upper Fence is classified as a statistical outlier.',
      breakdown: [
        { id: 'q1', symbol: 'Q_1', name: 'First Quartile', description: '25th percentile of the sorted distribution' },
        { id: 'q3', symbol: 'Q_3', name: 'Third Quartile', description: '75th percentile of the sorted distribution' },
        { id: 'iqr', symbol: 'IQR', name: 'Interquartile Range', description: 'Spread of the central 50% of values' }
      ]
    },
    pythonSnippet: {
      title: 'Categorical Box Plot with Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
tips = sns.load_dataset("tips")

plt.figure(figsize=(8, 4.5))
sns.boxplot(
    data=tips, x="day", y="total_bill",
    palette="dark:#00f0ff", flierprops={"marker": "o", "color": "#f43f5e"}
)
plt.title("Bill Distribution & Outliers across Weekdays", fontsize=12)
plt.xlabel("Day of Week")
plt.ylabel("Total Bill ($)")
plt.show()`,
      expectedOutput: 'Four side-by-side box plots with highlighted outlier dots beyond upper whiskers.',
      explanation: 'Box plots provide immediate comparison of median bill amounts and variance across Thursday through Sunday.'
    },
    knowledgeCheck: [
      {
        id: 'q6-8-1',
        question: 'What percentage of data observations fall inside the central box of a box plot?',
        options: [
          'Exactly 50% (between Q1 and Q3)',
          '95% (two standard deviations)',
          '100% of all data points',
          '25%'
        ],
        correctIndex: 0,
        explanation: 'The box spans from the 25th percentile (Q1) to the 75th percentile (Q3), capturing exactly the middle 50% of the sample distribution.'
      },
      {
        id: 'q6-8-2',
        question: 'How is a data point classified as an outlier in Tukey standard box plot formula?',
        options: [
          'If it falls more than 1.5 * IQR below Q1 or above Q3',
          'If it is greater than the mean plus one standard deviation',
          'If it is a negative number',
          'If it is located inside the box'
        ],
        correctIndex: 0,
        explanation: 'John Tukey established the standard rule where points beyond 1.5 times the Interquartile Range outside the quartiles are marked as outliers.'
      },
      {
        id: 'q6-8-3',
        question: 'What does an off-center median line closer to Q1 inside the box indicate?',
        options: [
          'The distribution is positively (right) skewed',
          'The distribution is perfectly symmetric Gaussian',
          'The data contains zero variance',
          'The distribution is negatively skewed'
        ],
        correctIndex: 0,
        explanation: 'When the median line is closer to Q1 with a longer upper box segment to Q3, the distribution has a longer upper tail (right-skewed).'
      }
    ],
    revisionNotes: [
      'Box plots condense distributions into a 5-number summary.',
      'The central box encapsulates the middle 50% (IQR = Q3 - Q1).',
      'Outliers are plotted individually outside 1.5 * IQR fences.'
    ]
  },

  // 9. Violin plot
  {
    id: 'les-6-9',
    moduleId: 'mod-6',
    title: '9. Violin Plot: Box Plot Meets Kernel Density',
    slug: 'violin-plot',
    estimatedMinutes: 16,
    simpleDefinition: 'A violin plot combines a traditional box plot with a mirrored continuous Kernel Density Estimate (KDE) curve on both sides, revealing both summary quartiles and multi-modal probability density shapes.',
    whyItExists: 'A traditional box plot cannot differentiate between a single bell-shaped peak and a double bimodal peak if their medians and quartiles match. Violin plots solve this blindspot by displaying the full probability density silhouette.',
    howItWorks: [
      'Mirrored Density Silhouette: The width of the violin body at any given Y-value represents the relative frequency of observations at that level.',
      'Internal Box Element: A miniature box plot (or median dot with quartile bar) is embedded inside the central axis of the violin.',
      'Multi-Modal Detection: Valleys and bulges in the violin body visually reveal multi-modal or clustered distributions.',
      'Split Violin Mode: Can split left and right halves to compare two binary conditions (e.g. Male vs Female) on the same violin.'
    ],
    practicalExamples: [
      'Exam Score Distributions: Revealing that a class had two distinct passing/failing clusters that a box plot masked.',
      'Customer Spending Habits: Showing bimodal behavior between discount coupon shoppers vs enterprise buyers.',
      'Gene Expression Levels: Comparing multimodal cellular RNA counts across clinical drug trial cohorts.'
    ],
    commonMisconceptions: [
      {
        myth: 'Violin plots are always better than box plots for all sample sizes.',
        reality: 'For very small sample sizes (e.g. N < 30), Kernel Density Estimation produces artificial smooth bulges that do not reflect reality. Box plots or raw strip plots are safer for small samples.'
      }
    ],
    conceptSummary: 'Violin plots fuse box plot quartiles with mirrored KDE curves to reveal multi-modal distribution silhouettes.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'Education Assessment Diagnostics',
      scenario: 'A university physics department reviews final exam scores. A box plot showed a healthy median of 74%. A violin plot immediately revealed two distinct bulges at 45% and 88%, showing the class was split into struggling students and advanced students.',
      impact: 'Instructors restructured the curriculum into foundation and honors tracks rather than assuming a uniform average class.'
    },
    keyTakeaways: [
      'Reveals bimodal, multimodal, and irregular distribution shapes that box plots conceal',
      'Internal markers preserve median and quartile summaries',
      'Split-violins allow direct pairwise categorical comparison without doubling plot width'
    ],
    mathematics: {
      title: 'Kernel Density Estimation Formula',
      latex: '\\hat{f}_h(y) = \\frac{1}{N h} \\sum_{i=1}^N K\\left( \\frac{y - y_i}{h} \\right), \\quad W(y) \\propto \\hat{f}_h(y)',
      plainText: 'Density f_hat(y) = 1/(N*h) * sum(K((y - y_i)/h)); Violin width W(y) is proportional to density estimate f_hat(y).',
      explanation: 'The visual width of the violin at coordinate y is directly proportional to its estimated continuous probability density.',
      breakdown: [
        { id: 'f_hat', symbol: '\\hat{f}_h(y)', name: 'Probability Density', description: 'Smooth continuous probability density at value y' },
        { id: 'h', symbol: 'h', name: 'Bandwidth', description: 'Smoothing parameter controlling KDE curve sensitivity' },
        { id: 'K', symbol: 'K(u)', name: 'Kernel Function', description: 'Standard Gaussian weighting function' }
      ]
    },
    pythonSnippet: {
      title: 'Split Violin Plot in Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
tips = sns.load_dataset("tips")

plt.figure(figsize=(8, 4.5))
# Split violin comparing smokers vs non-smokers across days
sns.violinplot(
    data=tips, x="day", y="total_bill", hue="smoker",
    split=True, inner="quart", palette=["#00f0ff", "#7000ff"]
)
plt.title("Total Bill Distribution by Day & Smoker Status (Split Violin)", fontsize=12)
plt.xlabel("Day of Week")
plt.ylabel("Total Bill ($)")
plt.show()`,
      expectedOutput: 'Split bilateral violin shapes showing smooth distributions with internal dashed quartile markers.',
      explanation: 'split=True halves each violin, enabling direct side-by-side comparison of binary subgroups.'
    },
    knowledgeCheck: [
      {
        id: 'q6-9-1',
        question: 'What critical structural detail can a violin plot reveal that a box plot completely hides?',
        options: [
          'Bimodal or multimodal distribution peaks with valleys in between',
          'The maximum value of the data',
          'The number of rows in the CSV file',
          'The Pearson correlation coefficient'
        ],
        correctIndex: 0,
        explanation: 'Because a box plot only draws quartiles, two datasets with identical 25th, 50th, and 75th percentiles look identical even if one is uniform and the other has two peaks.'
      },
      {
        id: 'q6-9-2',
        question: 'Why should violin plots be avoided when dealing with tiny sample sizes (e.g. N = 12)?',
        options: [
          'Kernel density estimation over-smooths small samples, manufacturing fictitious probability curves not supported by data',
          'Computers cannot calculate medians for small sample sizes',
          'Violin plots require at least 1,000,000 data points',
          'They always crash Python on small arrays'
        ],
        correctIndex: 0,
        explanation: 'Kernel density estimation requires sufficient sample density. For tiny samples, KDE creates deceptive curves; raw jittered points or strip plots are far more honest.'
      },
      {
        id: 'q6-9-3',
        question: 'In a split violin plot, what do the left and right halves of each violin represent?',
        options: [
          'Two different levels of a binary categorical variable sharing the same axis',
          'The positive and negative values of the dataset',
          'The training and testing split error',
          'Outliers on the left, normal data on the right'
        ],
        correctIndex: 0,
        explanation: 'Split violins divide the symmetrical halves to compare two conditions (e.g., Treatment vs Control) side-by-side in half the space.'
      }
    ],
    revisionNotes: [
      'Violin plots fuse box plots with mirrored kernel density curves.',
      'Uncovers multimodal clusters hidden by standard box plots.',
      'Use split-violins for compact binary subgroup comparisons.'
    ]
  },

  // 10. Scatter plot
  {
    id: 'les-6-10',
    moduleId: 'mod-6',
    title: '10. Scatter Plot: Bivariate Relationship & Correlation',
    slug: 'scatter-plot',
    estimatedMinutes: 15,
    simpleDefinition: 'A scatter plot uses Cartesian coordinates to display values for two continuous numerical variables as a cloud of individual points, revealing correlation direction, strength, clustering, and non-linear associations.',
    whyItExists: 'Scatter plots are the primary diagnostic tool for inspecting relationships between continuous features and targets, detecting linear vs non-linear patterns, homoscedasticity, and bivariate outliers.',
    howItWorks: [
      'Cartesian Mapping: Variable X sets horizontal coordinate; Variable Y sets vertical coordinate.',
      'Point Rendering: Each observation is plotted as an individual point marker.',
      'Pattern Recognition: Direction (positive, negative, null) and linearity (straight line vs curve) become instantly visible.',
      'Multivariate Extensions: Additional dimensions can be mapped to marker color (hue), marker size, or marker shape.'
    ],
    practicalExamples: [
      'Feature vs Target Exploration: Plotting House Square Footage (X) vs Sale Price (Y) to assess linearity before linear regression.',
      'Cluster Visualization: Plotting 2D PCA or t-SNE projections to evaluate cluster separation in customer segmentation.',
      'Anomaly Detection: Identifying high-leverage outliers that deviate from the regression trendline.'
    ],
    commonMisconceptions: [
      {
        myth: 'A strong linear pattern in a scatter plot proves that Variable X causes Variable Y.',
        reality: 'Scatter plots show correlation, never causation. Confounding variables or reverse causality often explain observed relationships.'
      }
    ],
    conceptSummary: 'Scatter plots map two continuous variables to 2D Cartesian space to expose correlation, linearity, and clusters.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Semiconductor Manufacturing Quality Control',
      scenario: 'Engineers plot Silicon Wafer Bake Temperature (X) vs Microchip Defect Rate (Y). Rather than a straight line, the scatter plot reveals a U-shaped parabola: defects are lowest between 320°C and 340°C, but spike when too cold or too hot.',
      impact: 'Prevented the team from fitting a flawed linear regression model and pinpointed the optimal thermal operating window.'
    },
    keyTakeaways: [
      'Primary visualization tool for bivariate continuous relationships',
      'Easily reveals non-linear curves (quadratic, exponential, sinusoidal)',
      'Combat overplotting in large datasets using alpha transparency or hexbin density plots'
    ],
    mathematics: {
      title: 'Pearson Product-Moment Correlation Coefficient',
      latex: 'r_{xy} = \\frac{\\sum_{i=1}^N (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^N (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^N (y_i - \\bar{y})^2}}, \\quad -1 \\le r_{xy} \\le +1',
      plainText: 'Pearson r = Cov(x, y) / (Std(x) * Std(y)); ranges strictly between -1 and +1.',
      explanation: 'Scatter plot point alignment corresponds directly to Pearson r (+1 perfect positive, -1 perfect negative, 0 no linear correlation).',
      breakdown: [
        { id: 'r', symbol: 'r_{xy}', name: 'Correlation Coefficient', description: 'Strength and direction of linear relationship' },
        { id: 'cov', symbol: 'Cov(x,y)', name: 'Covariance', description: 'Degree to which two variables vary together' }
      ]
    },
    pythonSnippet: {
      title: 'Scatter Plot with OLS Trendline in Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
tips = sns.load_dataset("tips")

plt.figure(figsize=(8, 4.5))
sns.regplot(
    data=tips, x="total_bill", y="tip",
    scatter_kws={"color": "#00f0ff", "alpha": 0.6, "s": 50},
    line_kws={"color": "#f43f5e", "linewidth": 2}
)
plt.title("Total Bill vs Tip Amount (Linear Relationship & Confidence Band)")
plt.xlabel("Total Bill ($)")
plt.ylabel("Tip ($)")
plt.show()`,
      expectedOutput: 'Scatter plot of individual points overlaid with a red linear regression line and translucent 95% confidence interval band.',
      explanation: 'regplot fits and plots a linear regression line along with a 95% bootstrap confidence interval.'
    },
    knowledgeCheck: [
      {
        id: 'q6-10-1',
        question: 'What technique best prevents severe overplotting when rendering a scatter plot of 500,000 data points?',
        options: [
          'Applying high alpha transparency (e.g. alpha=0.05) or switching to a 2D hexbin density plot',
          'Making all points three times larger',
          'Setting all points to 100% opacity',
          'Switching to a 3D pie chart'
        ],
        correctIndex: 0,
        explanation: 'Alpha transparency and hexbins prevent thousands of overlapping opaque dots from turning into an illegible solid blob, preserving density visibility.'
      },
      {
        id: 'q6-10-2',
        question: 'If a scatter plot exhibits a clear U-shaped parabolic curve, what will Pearson correlation coefficient r approximate?',
        options: [
          'Approximately 0, because Pearson r only measures linear relationships',
          'Exactly +1.0',
          'Exactly -1.0',
          'Infinity'
        ],
        correctIndex: 0,
        explanation: 'Pearson r only measures linear relationships. Symmetrical non-linear shapes (like parabolas) can have a Pearson r near 0 despite having a deterministic relationship.'
      },
      {
        id: 'q6-10-3',
        question: 'What third continuous dimension can be visually represented on a 2D scatter plot?',
        options: [
          'Point area (bubble size) or color intensity (continuous colormap)',
          'Bar height',
          'Pie angles',
          'Grid line thickness'
        ],
        correctIndex: 0,
        explanation: 'Continuous colormaps and marker sizes (bubble charts) allow encoding a 3rd and 4th continuous variable on a standard 2D scatter plot.'
      }
    ],
    revisionNotes: [
      'Scatter plots map bivariate continuous relationships.',
      'Check for linearity, clusters, heteroscedasticity, and outliers.',
      'Use alpha transparency or hexbins for massive datasets.'
    ]
  },

  // 11. Line chart
  {
    id: 'les-6-11',
    moduleId: 'mod-6',
    title: '11. Line Chart: Continuous Sequence & Temporal Trends',
    slug: 'line-chart',
    estimatedMinutes: 15,
    simpleDefinition: 'A line chart connects individual data observations in chronological or sequential order with straight line segments, visualizing continuous trends, acceleration, cycles, and volatility over time.',
    whyItExists: 'When data has a natural sequential ordering (such as time, epochs, or distance), isolated scatter points fail to communicate continuity. Connecting points with lines guides the eye along continuous trajectories.',
    howItWorks: [
      'Ordered X-Axis: Arranges sequential observations chronologically (dates, timestamps, training epochs).',
      'Continuous Metric Y-Axis: Measures the changing target quantity.',
      'Line Segments: Connect consecutive (x_t, y_t) coordinates, visually communicating rates of change (slopes).',
      'Multi-Line Comparison: Allows comparing multiple categories or models over identical timeframes.'
    ],
    practicalExamples: [
      'ML Training Loss Curves: Plotting loss across 100 epochs for both training and validation sets.',
      'Stock Market Prices: Tracking closing share prices of tech stocks across a 5-year timeframe.',
      'Sensor Telemetry Monitoring: Visualizing engine RPM and temperature over continuous flight hours.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can use a line chart to connect unordered categorical labels like Apple, Orange, and Banana.',
        reality: 'Connecting unordered categories with lines creates deceptive false slopes. Lines imply a continuous, ordered progression that does not exist between independent fruits.'
      }
    ],
    conceptSummary: 'Line charts connect ordered sequential data points to reveal trajectories, growth rates, and temporal cycles.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Deep Learning Overfitting Diagnosis',
      scenario: 'A researcher plots Training Loss and Validation Loss over 50 epochs on a multi-line chart. At epoch 18, Training Loss continues to fall while Validation Loss begins to climb steadily upward.',
      impact: 'Pinpoints epoch 18 as the exact early stopping checkpoint, preventing model degradation.'
    },
    keyTakeaways: [
      'Only use line charts when the X-axis has an inherent continuous order (time, epochs, distance)',
      'Slope of the line communicates rate of change (derivative dy/dx)',
      'Keep multi-line charts under 5 series to avoid Spaghetti Chart confusion'
    ],
    mathematics: {
      title: 'Discrete Rate of Change (Slope)',
      latex: 'm_t = \\frac{\\Delta y}{\\Delta t} = \\frac{y_t - y_{t-1}}{t - (t-1)}, \\quad y_t = y_0 + \\sum_{k=1}^t \\Delta y_k',
      plainText: 'Slope m_t = (y_t - y_(t-1)) / Delta t; current value is cumulative sum of increments.',
      explanation: 'The visual steepness of each line segment represents the instantaneous discrete derivative between sequential observations.',
      breakdown: [
        { id: 'm_t', symbol: 'm_t', name: 'Segment Slope', description: 'Velocity of change between consecutive timestamps' },
        { id: 'dy', symbol: '\\Delta y', name: 'Metric Delta', description: 'Net increase or decrease during time interval' }
      ]
    },
    pythonSnippet: {
      title: 'Training vs Validation Loss Trajectory',
      code: `import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, 26)
train_loss = 1.0 / (epochs ** 0.6) + np.random.normal(0, 0.01, 25)
val_loss = 1.0 / (epochs ** 0.5) + np.maximum(0, (epochs - 14) * 0.03)

plt.figure(figsize=(8, 4.5))
plt.plot(epochs, train_loss, label="Training Loss", color="#00f0ff", lw=2)
plt.plot(epochs, val_loss, label="Validation Loss", color="#f43f5e", lw=2, linestyle="--")
plt.axvline(x=14, color="#a855f7", linestyle=":", label="Early Stopping Point")
plt.title("Model Convergence & Overfitting Trajectory", fontsize=12)
plt.xlabel("Training Epoch")
plt.ylabel("Cross-Entropy Loss")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()`,
      expectedOutput: 'Line chart showing diverging train/validation curves with a vertical early-stopping dashed line at epoch 14.',
      explanation: 'Line charts make inflection points and diverging trends instantly recognizable.'
    },
    knowledgeCheck: [
      {
        id: 'q6-11-1',
        question: 'Under what condition is using a line chart fundamentally inappropriate?',
        options: [
          'When the X-axis represents unordered, independent categorical variables (e.g. countries or animal species)',
          'When the X-axis represents chronological calendar dates',
          'When measuring continuous temperature changes',
          'When monitoring training epochs in deep learning'
        ],
        correctIndex: 0,
        explanation: 'Line charts imply continuity and progression. Connecting independent nominal categories with lines implies non-existent intermediate values.'
      },
      {
        id: 'q6-11-2',
        question: 'What is a Spaghetti Chart in data visualization?',
        options: [
          'A line chart with too many overlapping, tangled lines, making individual series unreadable',
          'A chart plotting Italian restaurant sales',
          'A 3D surface plot',
          'A line chart rendered in yellow'
        ],
        correctIndex: 0,
        explanation: 'A spaghetti chart occurs when 10+ lines are plotted on a single graph, creating an unreadable visual tangle. Use small multiples or highlight single series.'
      },
      {
        id: 'q6-11-3',
        question: 'What does the steepness of a line segment communicate on a line chart?',
        options: [
          'The rate of change (derivative dy/dx) over that interval',
          'The sample variance of the population',
          'The accuracy of the data collection',
          'The number of missing rows'
        ],
        correctIndex: 0,
        explanation: 'The slope directly reflects velocity: steeper upward slopes indicate rapid growth, flat lines indicate stability, and steep downward slopes indicate sharp contraction.'
      }
    ],
    revisionNotes: [
      'Line charts connect sequentially ordered data points.',
      'Indispensable for monitoring training loss and temporal metrics.',
      'Avoid spaghetti charts by limiting active lines or faceting.'
    ]
  },

  // 12. Area chart
  {
    id: 'les-6-12',
    moduleId: 'mod-6',
    title: '12. Area Chart: Volume Accumulation Over Time',
    slug: 'area-chart',
    estimatedMinutes: 15,
    simpleDefinition: 'An area chart is based on a line chart, where the region between the line and the horizontal baseline is filled with color or shading, emphasizing the cumulative volume or magnitude of a trend over time.',
    whyItExists: 'While line charts emphasize subtle rates of change (slopes), area charts emphasize physical quantity, weight, and volume accumulation over sequential intervals.',
    howItWorks: [
      'Line Baseline: Plots the sequential metric trajectory as the upper ceiling boundary.',
      'Surface Fill: Fills the region between the metric trajectory and Y=0 with translucent color shading.',
      'Stacked Area Variant: Stacks multiple continuous series on top of each other, showing total volume alongside compositional breakdown over time.',
      '100% Normalized Area Variant: Displays percentage share composition across a continuous timeline.'
    ],
    practicalExamples: [
      'Network Bandwidth Consumption: Tracking total gigabytes streamed across streaming services over 24 hours.',
      'Cumulative Active Users: Visualizing total platform user growth month-over-month.',
      'Server Resource Utilization: Tracking total RAM gigabytes consumed across database, cache, and API worker processes.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can overlay multiple opaque area charts on top of each other without stacking.',
        reality: 'Overlaying unstacked area charts causes foreground fills to completely hide and occlude background series. Use high transparency (alpha) or stacked area charts.'
      }
    ],
    conceptSummary: 'Area charts fill the space beneath trajectory lines to emphasize cumulative volume, capacity, and composition.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Cloud Infrastructure Capacity Planning',
      scenario: 'A DevOps lead monitors server memory usage. A stacked area chart tracks RAM consumption by Service A, Service B, and Database over 30 days against a red threshold line at 128 GB total server capacity.',
      impact: 'Identified a slow memory leak in Service B 3 weeks before it would have triggered a catastrophic cluster crash.'
    },
    keyTakeaways: [
      'Emphasizes total volume and capacity over simple rate of change',
      'Always start the quantitative baseline at zero for filled areas',
      'Use semi-transparent fills (alpha = 0.3) if comparing unstacked lines'
    ],
    mathematics: {
      title: 'Definite Area Integral (Cumulative Volume)',
      latex: 'A = \\int_{t_0}^{t_1} y(t) \\, dt \\approx \\sum_{i=1}^N \\frac{y(t_{i-1}) + y(t_i)}{2} \\Delta t',
      plainText: 'Total Area A = Integral of y(t) dt; approximated by trapezoidal sum of slice areas.',
      explanation: 'The shaded area visually represents the mathematical definite integral of the rate function over the time window.',
      breakdown: [
        { id: 'A', symbol: 'A', name: 'Shaded Area', description: 'Cumulative volume accumulated over the time window' },
        { id: 'trap', symbol: '\\text{Trapezoid}', name: 'Trapezoidal Rule', description: 'Discrete numerical approximation of continuous volume' }
      ]
    },
    pythonSnippet: {
      title: 'Stacked Area Chart in Matplotlib',
      code: `import numpy as np
import matplotlib.pyplot as plt

days = np.arange(1, 15)
service_a = np.array([12, 14, 15, 18, 20, 22, 24, 25, 26, 28, 30, 31, 33, 35])
service_b = np.array([8, 9, 11, 12, 14, 15, 17, 18, 19, 21, 22, 23, 24, 25])
database = np.array([20, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33])

plt.figure(figsize=(8, 4.5))
plt.stackplot(
    days, service_a, service_b, database,
    labels=["Service A (API)", "Service B (Workers)", "Database"],
    colors=["#00f0ff", "#7000ff", "#3b82f6"], alpha=0.8
)
plt.title("Cluster RAM Consumption Over Time (Stacked Area)")
plt.xlabel("Day of Month")
plt.ylabel("Total RAM (GB)")
plt.legend(loc="upper left")
plt.show()`,
      expectedOutput: 'Stacked multi-colored area chart showing cumulative RAM consumption rising smoothly toward 93 GB.',
      explanation: 'stackplot stacks areas vertically, displaying cumulative load alongside individual service consumption.'
    },
    knowledgeCheck: [
      {
        id: 'q6-12-1',
        question: 'What is the primary difference in visual emphasis between a line chart and an area chart?',
        options: [
          'Line charts emphasize subtle rates of change (slopes), whereas area charts emphasize total volume and magnitude',
          'Area charts can only display negative values',
          'Line charts cannot display time-series data',
          'There is no difference'
        ],
        correctIndex: 0,
        explanation: 'Filling the area under the curve visually anchors the quantity to zero, highlighting the physical mass or volume of the metric.'
      },
      {
        id: 'q6-12-2',
        question: 'Why must the Y-axis of an area chart always start at zero?',
        options: [
          'Because the shaded area visually represents quantity from the baseline; truncating the axis distorts the shaded area proportions',
          'Because math libraries throw syntax errors below zero',
          'Because area is always equal to 1.0',
          'To make the lines appear flat'
        ],
        correctIndex: 0,
        explanation: 'Because human perception judges the entire colored surface area, starting anywhere other than zero manufactures a false visual volume.'
      },
      {
        id: 'q6-12-3',
        question: 'What is the primary visual hazard when displaying multiple overlapping unstacked area charts?',
        options: [
          'The front area will completely occlude and hide the areas behind it',
          'The chart converts into a pie chart',
          'The dates on the X-axis become corrupted',
          'The cumulative sum decreases to zero'
        ],
        correctIndex: 0,
        explanation: 'Opaque foreground fills block the view of background lines. To avoid occlusion, use stacked areas or high transparency (alpha).'
      }
    ],
    revisionNotes: [
      'Area charts emphasize cumulative magnitude over time.',
      'Quantitative baseline must always start at zero.',
      'Stacked area charts display compositional share alongside total volume.'
    ]
  },

  // 13. Heatmap
  {
    id: 'les-6-13',
    moduleId: 'mod-6',
    title: '13. Heatmap: 2D Matrix Grid & Density Color Encoding',
    slug: 'heatmap',
    estimatedMinutes: 16,
    simpleDefinition: 'A heatmap represents data values contained in a 2D matrix or tabular grid as colors, using a progressive color gradient to reveal hotspots, clusters, and patterns across two categorical dimensions.',
    whyItExists: 'When analyzing a table with 20 rows and 20 columns (400 numbers), reading individual digits is cognitively impossible. Heatmaps transform numerical matrices into color-coded sensory maps, allowing the brain to instantly spot high-density clusters and anomalies.',
    howItWorks: [
      'Matrix Layout: Arranges discrete entities along rows (Y-axis) and columns (X-axis).',
      'Colormap Mapping: Maps numerical cell values to a continuous color scale (e.g. viridis, magma, coolwarm).',
      'Perceptual Uniformity: High-quality colormaps ensure equal numeric steps produce equal perceived color differences.',
      'Colorbar Scale: An adjacent reference bar maps colors back to exact numerical values.'
    ],
    practicalExamples: [
      'User Activity Heatmap: Showing server traffic by Hour of Day (0-23) vs Day of Week (Mon-Sun).',
      'Hyperparameter Tuning Grid: Visualizing validation accuracy across combinations of Learning Rate and Batch Size.',
      'Confusion Matrix: Mapping True Labels vs Predicted Labels in multi-class classification.'
    ],
    commonMisconceptions: [
      {
        myth: 'The rainbow (jet) colormap is the best choice because it uses every color.',
        reality: 'The rainbow colormap is notoriously flawed because color transitions (especially yellow) create sharp artificial visual boundaries where the underlying data is completely smooth, and it is unreadable for colorblind users.'
      }
    ],
    conceptSummary: 'Heatmaps convert 2D numerical matrices into color-coded sensory maps for instant pattern recognition.',
    interactiveExperienceType: 'chart-interpretation-lab',
    realWorldExample: {
      domain: 'Hyperparameter Optimization Tuning Grid',
      scenario: 'An ML engineer trains an XGBoost model across a grid of 6 learning rates and 5 max_depth values (30 combinations). A heatmap reveals a bright cyan plateau around learning_rate=0.05 and max_depth=6, while extreme depths exhibit dark overfitting zones.',
      impact: 'Quickly narrowed the hyperparameter search space without training hundreds of wasted models.'
    },
    keyTakeaways: [
      'Always use perceptually uniform colormaps (viridis, plasma, coolwarm)',
      'Never use rainbow/jet colormaps for scientific or ML visualization',
      'Include clear colorbar legends and text annotations on small matrices'
    ],
    mathematics: {
      title: 'Perceptual Colormap Mapping Function',
      latex: 'C: [v_{\\min}, v_{\\max}] \\to [0, 1]^3, \\quad \\mathbf{c}_{i,j} = C\\left( \\frac{M_{i,j} - v_{\\min}}{v_{\\max} - v_{\\min}} \\right)',
      plainText: 'Colormap C maps normalized matrix values into RGB color space [0, 1]^3.',
      explanation: 'Each matrix entry M_(i,j) is normalized between minimum and maximum bounds and mapped to an RGB vector.',
      breakdown: [
        { id: 'M_ij', symbol: 'M_{i,j}', name: 'Matrix Value', description: 'Quantitative metric at row i and column j' },
        { id: 'C', symbol: 'C(u)', name: 'Colormap Function', description: 'Continuous transfer function mapping unit scalar to RGB color' }
      ]
    },
    pythonSnippet: {
      title: 'Server Activity Heatmap with Seaborn',
      code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Generate synthetic activity (7 days x 24 hours)
np.random.seed(42)
days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
hours = [f"{h}:00" for h in range(24)]
activity = np.random.poisson(lam=15, size=(7, 24))
activity[:, 9:18] += 25  # Daytime spike

plt.figure(figsize=(10, 4.5))
sns.heatmap(activity, xticklabels=hours, yticklabels=days, cmap="viridis", cbar_kws={"label": "Requests / sec"})
plt.title("Server Traffic Load by Day & Hour (Heatmap)")
plt.xticks(rotation=45)
plt.show()`,
      expectedOutput: '2D matrix heatmap showing clear bright daytime traffic band between 9:00 and 18:00 across weekdays.',
      explanation: 'Seaborn heatmap automatically applies color scaling and builds the legend colorbar.'
    },
    knowledgeCheck: [
      {
        id: 'q6-13-1',
        question: 'Why are perceptually uniform colormaps like "viridis" preferred over the classic "rainbow / jet" colormap?',
        options: [
          'They ensure constant perceived lightness changes across the scale and are accessible to colorblind individuals',
          'They use fewer computer processing cycles',
          'They only work with binary datasets',
          'They prevent matrix inversion errors'
        ],
        correctIndex: 0,
        explanation: 'Rainbow/jet creates false visual artifacts due to non-linear luminance spikes (especially at yellow) and is illegible to individuals with red-green colorblindness.'
      },
      {
        id: 'q6-13-2',
        question: 'What is a confusion matrix heatmap used for in classification evaluation?',
        options: [
          'Visualizing true labels vs predicted labels to identify which classes are frequently confused',
          'Tuning the learning rate of neural networks',
          'Calculating missing values in columns',
          'Plotting training epochs'
        ],
        correctIndex: 0,
        explanation: 'A confusion matrix heatmap highlights misclassifications as off-diagonal hotspots, exposing class confusion.'
      },
      {
        id: 'q6-13-3',
        question: 'What type of colormap should be used when data has a meaningful neutral midpoint (e.g. 0 for correlation or profits)?',
        options: [
          'A diverging colormap (e.g. "coolwarm" or "vlag") with neutral white/grey at center',
          'A sequential single-color ramp',
          'A random qualitative colormap',
          'Monochrome solid black'
        ],
        correctIndex: 0,
        explanation: 'Diverging colormaps emphasize deviations in both positive and negative directions away from a critical central neutral value (like 0).'
      }
    ],
    revisionNotes: [
      'Heatmaps encode 2D matrix numbers into intuitive color scales.',
      'Use diverging colormaps (coolwarm) when data has a critical zero midpoint.',
      'Adopt perceptually uniform palettes (viridis) to prevent visual artifacts.'
    ]
  },

  // 14. Correlation heatmap
  {
    id: 'les-6-14',
    moduleId: 'mod-6',
    title: '14. Correlation Heatmap: Multicollinearity Detection',
    slug: 'correlation-heatmap',
    estimatedMinutes: 16,
    simpleDefinition: 'A correlation heatmap visualizes the square symmetric Pearson correlation matrix of all numerical features in a dataset, using a diverging colormap centered at zero to expose multicollinearity and predictive relationships.',
    whyItExists: 'In datasets with dozens of numerical features, multicollinearity (highly correlated predictors like "sqft_living" and "sqft_above") inflates coefficient standard errors in linear models. A correlation heatmap spots redundant features in seconds.',
    howItWorks: [
      'Correlation Matrix Computation: Computes pairwise Pearson correlation r for all pairs (i, j).',
      'Diverging Colormap: Sets neutral zero to grey/white, positive correlations to electric cyan/blue, and negative correlations to red/magenta.',
      'Symmetric Masking: Masks the redundant upper triangle (above the diagonal) to eliminate duplicate visual information.',
      'Target Inspection: Highlights features with high correlation to the target variable for feature selection.'
    ],
    practicalExamples: [
      'Multicollinearity Pruning: Detecting r = 0.98 between "Engine Displacement" and "Horsepower", allowing deletion of one feature.',
      'Target Correlation Ranking: Scanning the bottom row to identify which features correlate most strongly with House Price.',
      'Sanity Checking Sensor Arrays: Verifying redundant sensors agree before feeding them into safety-critical Kalman filters.'
    ],
    commonMisconceptions: [
      {
        myth: 'A feature with 0.00 linear correlation to the target has no predictive value and should be discarded.',
        reality: 'Pearson correlation only measures linear relationships. A feature with r = 0 can have a strong non-linear relationship (e.g. y = x^2) that non-linear models like Random Forests exploit effectively.'
      }
    ],
    conceptSummary: 'Correlation heatmaps use masked diverging grids to detect multicollinear redundancies and target associations.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'FinTech Credit Default Modeling',
      scenario: 'A risk team models loan default risk across 40 applicant features. A correlation heatmap reveals that "Total Debt", "Unpaid Revolving Balance", and "Credit Utilization" have pairwise correlations exceeding 0.92.',
      impact: 'Eliminating two collinear features stabilized logistic regression weights and reduced overfitting on unseen test applicants.'
    },
    keyTakeaways: [
      'Square matrix is symmetric along the diagonal (r = 1.0)',
      'Always mask the redundant upper triangle to cut visual clutter by 50%',
      'Use a diverging colormap anchored with 0 at the neutral center'
    ],
    mathematics: {
      title: 'Correlation Matrix Formulation',
      latex: '\\mathbf{R} = \\mathbf{D}^{-1} \\mathbf{\\Sigma} \\mathbf{D}^{-1}, \\quad R_{i,j} = \\frac{\\text{Cov}(X_i, X_j)}{\\sigma_{X_i} \\sigma_{X_j}}, \\quad -1 \\le R_{i,j} \\le 1',
      plainText: 'Correlation matrix R is standardized covariance matrix Sigma; entries R_ij range from -1 to +1.',
      explanation: 'Matrix R has 1s along its main diagonal, and values between -1 and +1 off-diagonal.',
      breakdown: [
        { id: 'R', symbol: '\\mathbf{R}', name: 'Correlation Matrix', description: 'Symmetric N x N matrix of pairwise linear correlations' },
        { id: 'diag', symbol: 'R_{i,i} = 1', name: 'Main Diagonal', description: 'Self-correlation of each feature with itself' }
      ]
    },
    pythonSnippet: {
      title: 'Masked Correlation Heatmap in Seaborn',
      code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
iris = sns.load_dataset("iris").drop(columns=["species"])
corr = iris.corr()

# Mask upper triangle to remove duplicate information
mask = np.triu(np.ones_like(corr, dtype=bool))

plt.figure(figsize=(7, 5))
sns.heatmap(
    corr, mask=mask, annot=True, fmt=".2f",
    cmap="coolwarm", vmin=-1, vmax=1, center=0,
    square=True, linewidths=0.5
)
plt.title("Iris Feature Correlation Heatmap (Lower Triangle)")
plt.show()`,
      expectedOutput: 'Lower triangular heatmap with annotated correlation coefficients from -1.0 to +1.0 using coolwarm palette.',
      explanation: 'np.triu masks the upper diagonal, doubling readability and halving cognitive load.'
    },
    knowledgeCheck: [
      {
        id: 'q6-14-1',
        question: 'Why is masking the upper triangle of a correlation heatmap considered best practice?',
        options: [
          'Because the matrix is symmetric across the diagonal, making the upper triangle 100% redundant duplicate information',
          'Because Python cannot calculate upper matrices',
          'Because upper correlations are always negative',
          'To hide bad features from the user'
        ],
        correctIndex: 0,
        explanation: 'Since correlation is symmetric (corr(A, B) = corr(B, A)), displaying both halves duplicates information and clutters the visual field.'
      },
      {
        id: 'q6-14-2',
        question: 'What serious problem in linear regression models does high multicollinearity between features cause?',
        options: [
          'It inflates standard errors of regression coefficients, making weights erratic, unstable, and uninterpretable',
          'It guarantees an accuracy of 100%',
          'It prevents the model from predicting continuous numbers',
          'It turns all residuals to zero'
        ],
        correctIndex: 0,
        explanation: 'Collinear predictors share overlapping variance, causing matrix inversion instability in Ordinary Least Squares and wild coefficient swings.'
      },
      {
        id: 'q6-14-3',
        question: 'What colormap scaling parameter must always be anchored at 0 when plotting a correlation matrix?',
        options: [
          'The center value (e.g. center=0 in Seaborn) with vmin=-1 and vmax=1',
          'Setting vmin=0 and vmax=100',
          'Setting center=0.5',
          'Setting vmin=-100 and vmax=+100'
        ],
        correctIndex: 0,
        explanation: 'Correlation naturally ranges from -1 to +1 with 0 representing no correlation; anchoring the diverging palette at center=0 ensures zero is neutral.'
      }
    ],
    revisionNotes: [
      'Correlation heatmaps identify feature multicollinearity.',
      'Mask the upper triangle using np.triu to cut visual noise.',
      'Anchor diverging palettes with center=0 between -1 and +1.'
    ]
  },

  // 15. Pair plot
  {
    id: 'les-6-15',
    moduleId: 'mod-6',
    title: '15. Pair Plot: High-Dimensional Feature Space Matrix',
    slug: 'pair-plot',
    estimatedMinutes: 17,
    simpleDefinition: 'A pair plot (scatterplot matrix) renders an N x N grid of subplots for all pairwise combinations of numerical features in a dataset, displaying bivariate scatter plots in off-diagonal cells and univariate distributions on the diagonal.',
    whyItExists: 'When exploring high-dimensional datasets with 4 to 8 continuous features, plotting individual scatter plots one by one is tedious. A pair plot surveys all bivariate interactions, correlations, and class separations in a single holistic visual overview.',
    howItWorks: [
      'Off-Diagonal Cells: Display scatter plots comparing row feature Y against column feature X.',
      'Diagonal Cells: Display univariate histograms or KDE curves for the single feature where X = Y.',
      'Categorical Hue Coloring: Points are colored by class label (e.g. benign vs malignant tumor), revealing linear separability.',
      'Corner Masking Option: Can display only the lower corner to remove redundant flipped pairs.'
    ],
    practicalExamples: [
      'Classification Separability Check: Iris dataset pair plot showing Petal Length vs Petal Width cleanly separates Setosa from Versicolor.',
      'Anomaly Cluster Detection: Spotting isolated multi-feature outliers that are invisible when looking at any single 1D feature alone.',
      'Feature Interaction Discovery: Finding non-linear interaction terms to engineer for tree or regression models.'
    ],
    commonMisconceptions: [
      {
        myth: 'You should run a pair plot on raw datasets with 100 features.',
        reality: 'A pair plot on 100 features creates a 100 x 100 grid (10,000 subplots!), freezing your computer and generating an illegible canvas. Restrict pair plots to 4-8 key features.'
      }
    ],
    conceptSummary: 'Pair plots display an N x N matrix of bivariate scatter plots and diagonal distributions to explore high-dimensional feature spaces.',
    interactiveExperienceType: 'pair-plot-matrix',
    realWorldExample: {
      domain: 'Cancer Tumor Malignancy Diagnosis',
      scenario: 'An oncology ML team examines 6 cell biopsy features (radius, texture, perimeter, area, smoothness, compactness). A pair plot colored by diagnosis (Malignant vs Benign) reveals that Radius vs Concavity provides near-perfect linear class separation.',
      impact: 'Engineers confidently selected a lightweight linear model with ultra-fast inference and high clinical explainability.'
    },
    keyTakeaways: [
      'Displays all pairwise bivariate relationships in one structured grid',
      'Diagonal cells reveal univariate distributions (KDE / Histograms)',
      'Add categorical hue to instantly evaluate class separability'
    ],
    mathematics: {
      title: 'Pairwise Combinatorial Complexity',
      latex: 'N_{\\text{plots}} = D^2, \\quad N_{\\text{unique pairs}} = \\frac{D(D - 1)}{2}',
      plainText: 'Total subplots = D^2; unique bivariate pairings = D*(D-1)/2 for D features.',
      explanation: 'A dataset with D dimensions yields D*(D-1)/2 unique off-diagonal bivariate combinations.',
      breakdown: [
        { id: 'D', symbol: 'D', name: 'Feature Dimensions', description: 'Number of continuous numerical variables plotted' },
        { id: 'pairs', symbol: 'D(D-1)/2', name: 'Unique Pairs', description: 'Number of distinct off-diagonal scatter plots' }
      ]
    },
    pythonSnippet: {
      title: 'Pair Plot with Hue and KDE Diagonal in Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load classic Iris dataset
df = sns.load_dataset("iris")

# Generate pairplot colored by class species
g = sns.pairplot(
    df, hue="species",
    palette="bright", diag_kind="kde",
    corner=False, height=2.2
)
plt.suptitle("Pairwise Bivariate Feature Matrix (Iris)", y=1.02)
plt.show()`,
      expectedOutput: '4x4 grid of scatter plots with diagonal KDE curves showing distinct class separation.',
      explanation: 'corner=True can be set to hide the upper triangle and reduce rendering load.'
    },
    knowledgeCheck: [
      {
        id: 'q6-15-1',
        question: 'What is displayed on the main diagonal cells of a standard pair plot?',
        options: [
          'Univariate distributions (Histograms or KDE density curves) of the single feature',
          'Blank white squares',
          'A single correlation number equal to 0',
          'A 3D pie chart'
        ],
        correctIndex: 0,
        explanation: 'Because row feature equals column feature on the diagonal (X = Y), pair plots collapse that cell into a 1D distribution histogram or KDE curve.'
      },
      {
        id: 'q6-15-2',
        question: 'Why should you avoid generating a pair plot on a dataset with 50 numerical features?',
        options: [
          'It would generate 2,500 subplots (50 x 50), consuming immense memory and rendering an unreadable microscopic grid',
          'Seaborn only works with datasets of 3 features',
          'Pair plots only accept text columns',
          'It would delete 50% of the dataset'
        ],
        correctIndex: 0,
        explanation: 'Subplot count scales quadratically (D^2). A 50-variable pair plot requires 2,500 individual chart axes, overwhelming RAM and human comprehension.'
      },
      {
        id: 'q6-15-3',
        question: 'What insight does coloring pair plot points by a categorical class label (hue parameter) immediately provide?',
        options: [
          'Whether features provide clean linear or non-linear separability between the target classes',
          'The exact hyperparameter weights for neural networks',
          'The training time of the algorithm',
          'The database storage format'
        ],
        correctIndex: 0,
        explanation: 'Coloring markers by class highlights whether distinct classes cluster in separate spatial regions across feature combinations.'
      }
    ],
    revisionNotes: [
      'Pair plots systematically explore all pairwise bivariate relationships.',
      'Diagonal cells show 1D histograms or KDE distributions.',
      'Hue coloring tests feature separability for classification.'
    ]
  },

  // 16. Count plot
  {
    id: 'les-6-16',
    moduleId: 'mod-6',
    title: '16. Count Plot: Categorical Class Frequency & Imbalance',
    slug: 'count-plot',
    estimatedMinutes: 14,
    simpleDefinition: 'A count plot (frequency bar chart) counts and displays the number of occurrences of each discrete categorical class in a single column, acting as an essential diagnostic for detecting class imbalance.',
    whyItExists: 'Severe class imbalance (e.g. 99.8% non-fraud vs 0.2% fraud) causes standard classification algorithms to deceptively predict only the majority class. Count plots visually flag distribution skews before model training begins.',
    howItWorks: [
      'Frequency Tabulation: Automatically counts occurrences of each unique categorical level.',
      'Bar Rendering: Draws a vertical or horizontal bar whose length equals the row count.',
      'Imbalance Identification: Visually flags extreme ratios (10:1, 100:1) requiring SMOTE or class-weight adjustments.',
      'Secondary Hue Splitting: Breaks down counts by a second categorical condition.'
    ],
    practicalExamples: [
      'Fraud Detection Diagnostic: Spotting 995 legitimate transactions vs 5 fraudulent transactions.',
      'Customer Churn Dataset: Visualizing active vs cancelled subscription counts.',
      'Disease Diagnosis Dataset: Checking positive vs negative patient test balance.'
    ],
    commonMisconceptions: [
      {
        myth: 'A count plot and a standard bar plot are identical.',
        reality: 'A standard bar plot computes aggregate statistics (like mean or median of a second continuous column). A count plot simply counts row occurrences in a single categorical column.'
      }
    ],
    conceptSummary: 'Count plots tally occurrences of discrete categories, serving as the primary diagnostic for class imbalance.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Rare Medical Disease Screening',
      scenario: 'An ML team builds a model to detect rare cardiovascular anomalies. A count plot reveals 19,800 healthy scans and 200 anomaly scans (a 99:1 imbalance).',
      impact: 'Prevented the team from relying on misleading 99% accuracy and prompted the adoption of Balanced Cross-Entropy and PR-AUC metrics.'
    },
    keyTakeaways: [
      'Primary visual check for classification class imbalance',
      'No secondary Y aggregation needed; Y automatically represents frequency',
      'Directly informs choice of sampling techniques (SMOTE, class weighting)'
    ],
    mathematics: {
      title: 'Class Ratio & Imbalance Factor',
      latex: 'N_c = \\sum_{i=1}^N \\mathbb{I}(y_i = c), \\quad \\text{Imbalance Ratio} = \\frac{\\max_c N_c}{\\min_c N_c}',
      plainText: 'Count N_c sums occurrences of class c; Imbalance Ratio is majority count divided by minority count.',
      explanation: 'When Imbalance Ratio exceeds 10:1, standard accuracy metrics fail and class-weighted loss functions become mandatory.',
      breakdown: [
        { id: 'N_c', symbol: 'N_c', name: 'Class Frequency', description: 'Total row count for class c' },
        { id: 'IR', symbol: '\\text{IR}', name: 'Imbalance Ratio', description: 'Ratio of dominant class frequency to rarest class frequency' }
      ]
    },
    pythonSnippet: {
      title: 'Count Plot for Class Imbalance in Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Synthetic loan default data with severe imbalance
df = pd.DataFrame({
    "Loan_Status": ["Approved"] * 920 + ["Defaulted"] * 80
})

plt.figure(figsize=(7, 4))
ax = sns.countplot(data=df, x="Loan_Status", palette=["#00f0ff", "#f43f5e"])
plt.title("Class Balance Audit (Approved vs Defaulted)")
plt.ylabel("Observation Count")

# Annotate percentages atop bars
total = len(df)
for p in ax.patches:
    pct = f"{100 * p.get_height() / total:.1f}%"
    ax.annotate(pct, (p.get_x() + p.get_width() / 2., p.get_height() + 15),
                ha="center", fontsize=11, color="white", weight="bold")
plt.show()` ,
      expectedOutput: 'Bar chart showing 92.0% approved vs 8.0% defaulted with clear percentage labels.',
      explanation: 'Annotating percentages directly on count plot bars highlights class imbalance at a glance.'
    },
    knowledgeCheck: [
      {
        id: 'q6-16-1',
        question: 'What critical danger does a count plot help detect before training a classifier?',
        options: [
          'Severe class imbalance that could render accuracy a deceptive evaluation metric',
          'Multicollinearity between features',
          'High memory usage in GPU caches',
          'Heteroscedasticity in residual errors'
        ],
        correctIndex: 0,
        explanation: 'Count plots reveal severe class imbalance (e.g. 98% vs 2%), warning practitioners that naive models will simply predict the majority class.'
      },
      {
        id: 'q6-16-2',
        question: 'How does sns.countplot differ from sns.barplot in Seaborn?',
        options: [
          'countplot only requires one categorical column and tallies row frequencies; barplot computes an aggregate statistic (like mean) on a second continuous column',
          'countplot only works with dates',
          'barplot cannot display colors',
          'There is no difference'
        ],
        correctIndex: 0,
        explanation: 'countplot handles binning and counting of categories internally without needing a second quantitative column.'
      },
      {
        id: 'q6-16-3',
        question: 'When a count plot reveals a 99:1 class imbalance, which evaluation metric should replace standard classification accuracy?',
        options: [
          'PR-AUC (Precision-Recall Area Under Curve) and F1-Score',
          'Mean Squared Error',
          'R-squared',
          'Mean Absolute Percentage Error'
        ],
        correctIndex: 0,
        explanation: 'On highly imbalanced datasets, PR-AUC and F1-score evaluate performance on the rare minority class without being masked by majority class accuracy.'
      }
    ],
    revisionNotes: [
      'Count plots display raw observation tallies per category.',
      'Indispensable for diagnosing class imbalance in classification.',
      'Annotate bars with percentage shares for fast assessment.'
    ]
  },

  // 17. Density plot
  {
    id: 'les-6-17',
    moduleId: 'mod-6',
    title: '17. Density Plot: Continuous Probability Landscapes',
    slug: 'density-plot',
    estimatedMinutes: 15,
    simpleDefinition: 'A density plot visualizes the underlying continuous probability density function of a random variable using Kernel Density Estimation (KDE), producing a smooth, continuous curve that is independent of arbitrary histogram bin boundaries.',
    whyItExists: 'Histograms depend heavily on arbitrary bin widths and bin origins: shifting bin edges by 1 unit can visibly change the shape of the plot. Density plots solve this by fitting a smooth, continuous probability curve.',
    howItWorks: [
      'Kernel Placement: Places a smooth mathematical kernel (typically a Gaussian bump) at every individual data point.',
      'Bandwidth Tuning: Bandwidth parameter h controls the width of each kernel (smoothing strength).',
      'Kernel Summation: Sums all individual kernels together across the X-axis.',
      'Normalization: Normalizes total area under the resulting continuous curve to integrate to exactly 1.0.'
    ],
    practicalExamples: [
      'Comparing Subgroup Distributions: Overlapping density curves of customer spending for Mobile vs Desktop users.',
      'Sensor Calibration Verification: Confirming temperature sensor noise conforms to a smooth Gaussian bell curve.',
      'Target Transformation Validation: Comparing feature density before and after Box-Cox or Log transformation.'
    ],
    commonMisconceptions: [
      {
        myth: 'The height of a density curve represents the exact percentage of data at that exact point.',
        reality: 'In continuous probability, the probability of any single exact real number is 0. Height represents probability density; only the integral (area under the curve over an interval) represents probability.'
      }
    ],
    conceptSummary: 'Density plots use Kernel Density Estimation to produce smooth probability distributions free of histogram bin artifacts.',
    interactiveExperienceType: 'chart-selection-guide',
    realWorldExample: {
      domain: 'Speech Recognition Audio Normalization',
      scenario: 'An audio ML engineer analyzes decibel loudness distributions across 10,000 voice recordings. An overlaid density plot reveals that 80% of recordings cluster tightly around -24 dB, but a low-density tail extends to -60 dB.',
      impact: 'Designed an adaptive audio gain preprocessor that boosted whisper-quiet audio into the optimal recognition range.'
    },
    keyTakeaways: [
      'Free from arbitrary histogram bin width artifacts',
      'Total area under the continuous density curve always integrates to 1.0',
      'Overlapping semi-transparent density curves allow elegant multi-group distribution comparisons'
    ],
    mathematics: {
      title: 'Kernel Density Estimation (KDE) Integral',
      latex: '\\hat{f}(x) = \\frac{1}{n h} \\sum_{i=1}^n K\\left( \\frac{x - x_i}{h} \\right), \\quad \\int_{-\\infty}^{+\\infty} \\hat{f}(x) \\, dx = 1',
      plainText: 'Density estimate f_hat(x) sums kernels scaled by bandwidth h; total integral equals 1.0.',
      explanation: 'Every observation contributes a Gaussian kernel of width h; their sum forms a smooth continuous density curve.',
      breakdown: [
        { id: 'h', symbol: 'h', name: 'Bandwidth', description: 'Smoothing parameter; larger h oversmooths, smaller h creates noisy ripples' },
        { id: 'K', symbol: 'K(u)', name: 'Kernel Function', description: 'Standard Gaussian probability function centered at zero' }
      ]
    },
    pythonSnippet: {
      title: 'Overlaid Density Plot with Seaborn KDE',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample dataset
penguins = sns.load_dataset("penguins").dropna()

plt.figure(figsize=(8, 4.5))
sns.kdeplot(
    data=penguins, x="flipper_length_mm", hue="species",
    fill=True, common_norm=False, palette=["#00f0ff", "#7000ff", "#3b82f6"],
    alpha=0.3, linewidth=2
)
plt.title("Flipper Length Probability Density Across Penguin Species")
plt.xlabel("Flipper Length (mm)")
plt.ylabel("Probability Density")
plt.show()`,
      expectedOutput: 'Three smooth, overlapping, translucent probability density curves cleanly separating species distributions.',
      explanation: 'common_norm=False normalizes each group independently so their individual areas integrate to 1.0.'
    },
    knowledgeCheck: [
      {
        id: 'q6-17-1',
        question: 'What is the mathematical value of the total area under an entire continuous density curve?',
        options: [
          'Exactly 1.0 (representing 100% total probability)',
          '100.0',
          'Equal to the sample mean',
          'Zero'
        ],
        correctIndex: 0,
        explanation: 'By definition of a continuous probability density function, the total integral over the entire real line must equal 1.0.'
      },
      {
        id: 'q6-17-2',
        question: 'What effect does choosing an excessively small bandwidth parameter h have on a density plot?',
        options: [
          'It undersmooths the curve, producing a jagged, noisy estimate with artificial spikes at every data point',
          'It turns the plot into a flat line',
          'It forces the distribution to become Gaussian',
          'It deletes the negative numbers'
        ],
        correctIndex: 0,
        explanation: 'An overly small bandwidth fits tiny individual spikes around each individual sample point, obscuring population shape.'
      },
      {
        id: 'q6-17-3',
        question: 'Why are overlaid semi-transparent density plots superior to overlaid histograms for comparing 3 groups?',
        options: [
          'Overlapping histogram bars occlude and visually collide with each other, whereas smooth translucent density curves remain clearly readable',
          'Density plots require zero data points',
          'Histograms cannot show numbers above 50',
          'Density curves only work with text'
        ],
        correctIndex: 0,
        explanation: 'Overlaid histogram bars create a messy visual tangle of overlapping rectangles; smooth translucent KDE lines overlap cleanly.'
      }
    ],
    revisionNotes: [
      'Density plots compute smooth probability distributions via KDE.',
      'Total area under the curve integrates to 1.0.',
      'Ideal for comparing continuous distributions across 2–4 categories.'
    ]
  },

  // 18. Bubble chart
  {
    id: 'les-6-18',
    moduleId: 'mod-6',
    title: '18. Bubble Chart: Multi-Dimensional Multivariate Synthesis',
    slug: 'bubble-chart',
    estimatedMinutes: 16,
    simpleDefinition: 'A bubble chart is a multi-variable extension of a scatter plot where each data point is represented as a circle, encoding two variables via X and Y Cartesian positions, a third variable via bubble area (size), and a fourth variable via color (hue).',
    whyItExists: 'Standard scatter plots can only display two continuous variables at once. Bubble charts enable displaying 3 or 4 continuous and categorical dimensions on a single 2D plane without resorting to confusing 3D isometric projections.',
    howItWorks: [
      'X & Y Positions: Encode the primary two continuous dimensions along Cartesian axes.',
      'Bubble Area Encoding: Encodes the third numerical dimension proportionally to circle AREA (never radius).',
      'Color Hue: Encodes a fourth variable (categorical group or continuous heatmap gradient).',
      'Interactive Tooltips: Crucial in digital dashboards for inspecting crowded clusters.'
    ],
    practicalExamples: [
      'Hans Rosling Gapminder: Plotting GDP per Capita (X) vs Life Expectancy (Y), where bubble size equals Population, and color equals Continent.',
      'Marketing Campaign Analysis: Customer Acquisition Cost (X) vs Lifetime Value (Y), where bubble size equals Total Ad Spend, and color equals Channel.',
      'Cloud Server Fleet Monitoring: CPU Utilization (X) vs Memory Usage (Y), where bubble size equals Network Bandwidth, and color equals Cluster Region.'
    ],
    commonMisconceptions: [
      {
        myth: 'When sizing bubbles by a metric, you should scale the circle RADIUS directly by the value.',
        reality: 'Scaling circle radius directly by value squares the visual area (Area = pi * r^2). A value 2x larger will look 4x larger on screen, severely distorting perception.'
      }
    ],
    conceptSummary: 'Bubble charts synthesize 3 to 4 variables onto a 2D plane using Cartesian position, bubble area, and color.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Venture Capital Portfolio Risk Analysis',
      scenario: 'A VC fund visualizes 40 portfolio startups: Monthly Revenue Growth % (X) vs Customer Retention Rate (Y). Bubble size represents Cash Burn Rate ($/mo), and bubble color represents Funding Stage (Seed, Series A, Series B).',
      impact: 'Quickly spotted high-growth startups whose outsized bubble size signaled an imminent cash runway crisis.'
    },
    keyTakeaways: [
      'Enables simultaneous display of 3 to 4 variables on a 2D canvas',
      'Scale bubble AREA proportionally to data value, never radius',
      'Use semi-transparent bubbles (alpha = 0.5) to prevent larger bubbles from hiding smaller ones'
    ],
    mathematics: {
      title: 'Perceptual Bubble Area Scaling',
      latex: 'A_i \\propto v_i \\implies r_i = c \\cdot \\sqrt{v_i}, \\quad \\text{NOT } r_i = c \\cdot v_i',
      plainText: 'Area must be proportional to value; radius r_i must scale with square root of value sqrt(v_i).',
      explanation: 'Because circle area A = pi * r^2, scaling radius directly squares the perceptual size, exaggerating differences by a power of 2.',
      breakdown: [
        { id: 'A_i', symbol: 'A_i', name: 'Bubble Area', description: 'Perceived 2D surface area of the bubble' },
        { id: 'v_i', symbol: 'v_i', name: 'Data Value', description: 'Quantitative metric being encoded' },
        { id: 'r_i', symbol: 'r_i', name: 'Radius', description: 'Physical radius drawn by graphics engine' }
      ]
    },
    pythonSnippet: {
      title: 'Four-Variable Bubble Chart in Matplotlib',
      code: `import matplotlib.pyplot as plt
import numpy as np

# Synthetic company metrics
np.random.seed(42)
cac = np.array([45, 80, 120, 200, 310, 420, 500])       # X: Acquisition Cost ($)
ltv = np.array([180, 290, 450, 780, 1100, 1350, 1400])   # Y: Lifetime Value ($)
spend = np.array([10, 25, 45, 90, 180, 320, 550])        # Size: Ad Spend ($k)
roi = ltv / cac                                          # Color: LTV/CAC Ratio

plt.figure(figsize=(8, 5))
# Sizing proportional to square root (area scaling)
scatter = plt.scatter(
    cac, ltv, s=spend * 8, c=roi,
    cmap="viridis", alpha=0.6, edgecolors="white", linewidth=1.5
)
plt.colorbar(scatter, label="LTV / CAC Efficiency Ratio")
plt.title("SaaS Acquisition Efficiency (Bubble Size = Total Ad Spend)")
plt.xlabel("Customer Acquisition Cost ($)")
plt.ylabel("Customer Lifetime Value ($)")
plt.grid(True, alpha=0.3)
plt.show()`,
      expectedOutput: 'Scatter plot of translucent colored bubbles where area represents spend and color encodes LTV/CAC ratio.',
      explanation: 's=spend * 8 maps value directly to circle area in points^2, ensuring honest visual scaling.'
    },
    knowledgeCheck: [
      {
        id: 'q6-18-1',
        question: 'Why MUST bubble size in a bubble chart be mapped to circle AREA rather than circle RADIUS?',
        options: [
          'Because mapping to radius squares the visual area (A = pi * r^2), causing a 2x increase in data to look 4x larger on screen',
          'Because computer monitors cannot calculate square roots',
          'Because radius cannot be negative',
          'Because area is always equal to perimeter'
        ],
        correctIndex: 0,
        explanation: 'Human eyes perceive 2D physical area. Scaling radius directly squares the perceived difference, severely distorting magnitude.'
      },
      {
        id: 'q6-18-2',
        question: 'What is the primary visual challenge when plotting a bubble chart with high data density?',
        options: [
          'Large bubbles in the foreground can completely occlude and hide smaller bubbles behind them',
          'The bubbles will burst on the screen',
          'It will only run on supercomputers',
          'Python cannot handle more than 3 colors'
        ],
        correctIndex: 0,
        explanation: 'Large bubbles easily mask smaller points underneath. Using alpha transparency and sorting bubbles to draw largest first mitigates occlusion.'
      },
      {
        id: 'q6-18-3',
        question: 'How many distinct variables can a 2D bubble chart simultaneously display effectively?',
        options: [
          'Up to 4 variables: X-position, Y-position, Bubble Size (Area), and Color Hue',
          'Only 1 variable',
          'Exactly 100 variables',
          'Only 2 variables'
        ],
        correctIndex: 0,
        explanation: 'Bubble charts synthesize 4 dimensions: X-axis, Y-axis, area (3rd continuous), and hue (4th continuous or categorical).'
      }
    ],
    revisionNotes: [
      'Bubble charts encode 3–4 dimensions on a 2D plane.',
      'Always scale circle AREA (not radius) to preserve honest proportions.',
      'Use transparency (alpha) to prevent occlusion by large bubbles.'
    ]
  },

  // 19. Time-series chart
  {
    id: 'les-6-19',
    moduleId: 'mod-6',
    title: '19. Time-Series Chart: Temporal Dynamics, Seasonality & Forecasting',
    slug: 'time-series-chart',
    estimatedMinutes: 16,
    simpleDefinition: 'A time-series chart visualizes data points ordered sequentially across calendar time or clock intervals, designed specifically to isolate long-term trends, recurring seasonality, cyclical fluctuations, and irregular anomalies.',
    whyItExists: 'Temporal data possesses auto-correlation: observation t is dependent on t-1. Standard charts ignore this sequential dependency. Time-series charts leverage temporal axes with rolling averages, confidence envelopes, and seasonal decompositions.',
    howItWorks: [
      'Continuous Temporal Axis: Uses true datetime intervals (hourly, daily, monthly) rather than arbitrary categorical indices.',
      'Decomposition Layers: Deconstructs raw series into Trend + Seasonality + Residual components.',
      'Rolling Averages: Applies moving windows (e.g. 7-day or 30-day rolling mean) to smooth high-frequency noise.',
      'Forecast Confidence Envelopes: Shades prediction uncertainty intervals (e.g. 95% confidence bands) for future dates.'
    ],
    practicalExamples: [
      'Retail E-Commerce Demand Forecasting: Plotting daily sales revenue with a 7-day rolling average and Christmas seasonality peaks.',
      'Server Request Telemetry: Tracking requests-per-second to detect denial-of-service traffic spikes.',
      'IoT Sensor Monitoring: Monitoring industrial turbine vibration frequencies over months of continuous operation.'
    ],
    commonMisconceptions: [
      {
        myth: 'You can treat dates as plain text strings on the X-axis without parsing them into datetime objects.',
        reality: 'Treating dates as text strings ignores missing days and uneven time gaps, distorting temporal distance. Datetime parsing ensures true chronological spacing.'
      }
    ],
    conceptSummary: 'Time-series charts plot chronological data to isolate long-term trends, seasonality, rolling averages, and forecast intervals.',
    interactiveExperienceType: 'chart-playground',
    realWorldExample: {
      domain: 'Cloud GPU Spot Instance Price Forecasting',
      scenario: 'A machine learning lab tracks hourly AWS GPU spot instance prices. A time-series chart with classical STL decomposition isolates a weekly seasonal dip every Sunday morning from 2 AM to 7 AM UTC.',
      impact: 'The lab scheduled heavy batch model training jobs during low-cost Sunday windows, slashing compute costs by 65%.'
    },
    keyTakeaways: [
      'Always parse timestamps into true datetime objects to preserve temporal spacing',
      'Use rolling averages (moving means) to separate macro trends from high-frequency noise',
      'Display confidence intervals around future forecasted trajectories'
    ],
    mathematics: {
      title: 'Time Series Additive Decomposition & Rolling Mean',
      latex: 'Y_t = T_t + S_t + R_t, \\quad \\text{SMA}_k(t) = \\frac{1}{k} \\sum_{i=0}^{k-1} Y_{t-i}',
      plainText: 'Observation Y_t = Trend T_t + Seasonal S_t + Residual R_t; Simple Moving Average SMA averages past k points.',
      explanation: 'Additive decomposition separates raw observations into long-term secular trend, repeating periodic seasonality, and irregular noise.',
      breakdown: [
        { id: 'T_t', symbol: 'T_t', name: 'Trend Component', description: 'Low-frequency macro trajectory over multiple cycles' },
        { id: 'S_t', symbol: 'S_t', name: 'Seasonal Component', description: 'Repeating periodic pattern (daily, weekly, annual)' },
        { id: 'R_t', symbol: 'R_t', name: 'Residual Noise', description: 'Unexplained random high-frequency fluctuations' }
      ]
    },
    pythonSnippet: {
      title: 'Time-Series with 7-Day Rolling Mean & Confidence Band',
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate 90 days of daily telemetry
dates = pd.date_range(start="2026-01-01", periods=90, freq="D")
np.random.seed(42)
trend = np.linspace(100, 220, 90)
seasonality = 25 * np.sin(2 * np.pi * dates.dayofweek / 7)
noise = np.random.normal(0, 10, 90)
y = trend + seasonality + noise

df = pd.DataFrame({"Date": dates, "Traffic": y}).set_index("Date")
df["7D_MA"] = df["Traffic"].rolling(window=7).mean()
df["Upper"] = df["7D_MA"] + 1.96 * df["Traffic"].rolling(7).std()
df["Lower"] = df["7D_MA"] - 1.96 * df["Traffic"].rolling(7).std()

plt.figure(figsize=(9, 4.5))
plt.plot(df.index, df["Traffic"], color="#3b82f6", alpha=0.4, label="Daily Raw Traffic")
plt.plot(df.index, df["7D_MA"], color="#00f0ff", lw=2.5, label="7-Day Rolling Average")
plt.fill_between(df.index, df["Lower"], df["Upper"], color="#00f0ff", alpha=0.15, label="95% Volatility Band")
plt.title("E-Commerce Web Traffic Trend & Weekly Seasonality")
plt.ylabel("Daily Visitors (k)")
plt.legend()
plt.show()`,
      expectedOutput: 'Time-series chart showing noisy daily traffic alongside a clean cyan 7-day rolling average with shaded volatility band.',
      explanation: 'The rolling average filters out weekly fluctuations, exposing the steady underlying upward growth trend.'
    },
    knowledgeCheck: [
      {
        id: 'q6-19-1',
        question: 'What are the three fundamental components of classical time-series decomposition?',
        options: [
          'Trend, Seasonality, and Residual (Irregular) noise',
          'Mean, Median, and Mode',
          'Training, Testing, and Validation sets',
          'Bias, Variance, and Overfitting'
        ],
        correctIndex: 0,
        explanation: 'Classical decomposition breaks time-series data into Trend (macro direction), Seasonality (periodic cycles), and Residual noise (random irregularities).'
      },
      {
        id: 'q6-19-2',
        question: 'What is the primary benefit of applying a moving average (rolling mean) to a time-series plot?',
        options: [
          'It smooths out high-frequency random noise and short-term volatility, making the macro underlying trend visible',
          'It predicts the stock market with 100% certainty',
          'It converts all datetime objects to Unix integers',
          'It eliminates the need for test datasets'
        ],
        correctIndex: 0,
        explanation: 'Rolling averages act as low-pass filters, smoothing short-term spikes to highlight sustained secular trajectories.'
      },
      {
        id: 'q6-19-3',
        question: 'Why should date strings on the X-axis always be parsed into datetime objects rather than treated as plain text strings?',
        options: [
          'Datetime parsing maintains accurate chronological spacing, properly accounting for uneven time intervals and missing days',
          'Text strings cannot be drawn in blue',
          'Computers crash if a date contains letters',
          'Datetime objects eliminate all outliers'
        ],
        correctIndex: 0,
        explanation: 'Treating dates as plain text assumes every observation is equidistant, distorting temporal gaps when days or hours are missing.'
      }
    ],
    revisionNotes: [
      'Time-series charts preserve chronological continuity.',
      'Decompose series into Trend, Seasonality, and Residuals.',
      'Use rolling averages and shaded confidence envelopes to communicate uncertainty.'
    ]
  }
];

export const MODULE_06_COMPREHENSIVE_QUIZ = [
  {
    id: 'm6-final-1',
    question: 'You need to compare sales revenue across 14 product categories where category names are long sentences (e.g. "Cloud Computing Enterprise Infrastructure"). Which visualization is most appropriate?',
    options: [
      'A sorted horizontal bar chart',
      'A 14-slice 3D pie chart',
      'A vertical bar chart with rotated diagonal text',
      'A scatter plot'
    ],
    correctIndex: 0,
    explanation: 'A horizontal bar chart leaves ample horizontal margin for lengthy category titles without requiring awkward diagonal text rotation.'
  },
  {
    id: 'm6-final-2',
    question: 'A data scientist notices that their regression model residuals fan out into a cone shape as predicted values increase. What does this visual signature indicate?',
    options: [
      'Heteroscedasticity (non-constant error variance), violating linear regression assumptions',
      'Perfect linear model convergence',
      'The presence of zero bias',
      'Data leakage from the test set'
    ],
    correctIndex: 0,
    explanation: 'A fanning cone in residual diagnostics proves heteroscedasticity, signaling that error variance increases with prediction magnitude.'
  },
  {
    id: 'm6-final-3',
    question: 'Why does John Tukey standard box plot define outlier fences at 1.5 * IQR beyond Q1 and Q3 rather than using standard deviations?',
    options: [
      'Because Quartiles and IQR are non-parametric and robust against outliers, whereas mean and standard deviation are heavily distorted by the very outliers being detected',
      'Because IQR only works with small datasets',
      'Because standard deviation cannot be calculated in Python',
      'Because Tukey formula was created for pie charts'
    ],
    correctIndex: 0,
    explanation: 'Mean and standard deviation are non-robust statistics: a single massive outlier pulls the mean toward it and inflates standard deviation, masking anomalies.'
  },
  {
    id: 'm6-final-4',
    question: 'What is the primary advantage of a violin plot over a standard box plot when analyzing complex distributions?',
    options: [
      'Violin plots reveal multi-modal peaks and internal distribution valleys that box plots completely conceal',
      'Violin plots use fewer pixels',
      'Violin plots can only display positive numbers',
      'Violin plots do not require a quantitative axis'
    ],
    correctIndex: 0,
    explanation: 'A box plot summarizes data with only 5 summary points. A violin plot displays the full continuous probability density silhouette, immediately exposing bimodal distributions.'
  },
  {
    id: 'm6-final-5',
    question: 'You have a scatter plot containing 800,000 transaction records that appears as a solid black blob due to overplotting. What two techniques resolve this visual defect?',
    options: [
      'Applying high alpha transparency (e.g. alpha=0.03) or using a 2D hexbin density plot',
      'Making each marker 10x larger and using 100% opacity',
      'Switching to a 3D pie chart',
      'Deleting 99% of the dataset permanently'
    ],
    correctIndex: 0,
    explanation: 'Alpha blending and 2D hexbin aggregation reveal density gradients in ultra-high-density scatter plots without discarding data.'
  },
  {
    id: 'm6-final-6',
    question: 'What is the mathematical flaw of scaling bubble size in a bubble chart directly by circle RADIUS instead of circle AREA?',
    options: [
      'Because Area = pi * r^2, scaling radius directly squares the visual area, exaggerating differences by a power of 2',
      'It causes negative numbers to become positive',
      'It violates the Law of Large Numbers',
      'It prevents the chart from being saved as a PNG'
    ],
    correctIndex: 0,
    explanation: 'Human visual cognition estimates quantitative magnitude through 2D surface area. Doubling the radius quadruples the area, manufacturing a deceptive 4x visual explosion.'
  },
  {
    id: 'm6-final-7',
    question: 'Why should the upper triangle of a correlation heatmap generally be masked before presentation?',
    options: [
      'Because the correlation matrix is symmetric across the main diagonal, making the upper triangle 100% redundant duplicate information',
      'Because the upper triangle contains imaginary numbers',
      'To prevent copyright infringement',
      'Because upper correlations are always zero'
    ],
    correctIndex: 0,
    explanation: 'Since corr(A, B) = corr(B, A), the upper and lower triangles contain identical numbers. Masking one half halves cognitive load and data-to-ink waste.'
  },
  {
    id: 'm6-final-8',
    question: 'What visual channel is perceived with the HIGHEST quantitative accuracy by the human visual system according to Cleveland and McGill perceptual hierarchy?',
    options: [
      'Position along a common aligned scale',
      'Color saturation / intensity',
      'Curvature and angular orientation',
      '2D area of an irregular shape'
    ],
    correctIndex: 0,
    explanation: 'Cleveland & McGill perceptual experiments proved that position along a common scale is decoded with the highest precision, far outperforming angle, area, and color.'
  }
];

export const MODULE_06_METADATA: Module = {
  id: 'mod-6',
  trackId: 'track-foundations',
  title: 'Module 06: Data Visualization Masterclass',
  slug: 'data-visualization-masterclass',
  level: 'Beginner',
  category: 'Foundations',
  iconName: 'BarChart2',
  shortDescription: 'Master the science and art of visual exploratory analysis: 17 core graphs, cognitive perception, Seaborn/Matplotlib, and honest chart ethics.',
  description: 'Data visualization is the indispensable sensory bridge between complex multi-dimensional datasets and machine learning algorithms. Master every major chart type in depth: Bar, Grouped Bar, Stacked Bar, Histogram, Pie/Donut, Box Plot, Violin Plot, Scatter Plot, Line Chart, Area Chart, Heatmap, Correlation Heatmap, Pair Plot, Count Plot, Density Plot, Bubble Chart, and Time-Series Chart. Learn cognitive perception rules, Tufte Lie Factor, and Python implementations in Matplotlib and Seaborn.',
  estimatedHours: 6,
  prerequisites: [
    'Module 01: Introduction to Machine Learning',
    'Module 02: How Machine Learning Learns',
    'Module 03: Errors, Bias, Variance & Model Performance',
    'Module 04: Exploratory Data Analysis (EDA)',
    'Module 05: Data Preprocessing & Encoding'
  ],
  objectives: [
    'Select the exact right chart type for any analytical goal: comparison, distribution, relationship, or composition',
    'Master in-depth construction, interpretation, and pitfalls of all 17 fundamental statistical graphs',
    'Implement publication-grade visualizations using Seaborn and Matplotlib with clean color palettes and zero clutter',
    'Diagnose machine learning model performance visually using loss trajectories, residual plots, and confusion matrices',
    'Identify and eliminate visual distortion techniques: truncated baselines, 3D pie distortions, and overplotting',
    'Explore high-dimensional feature spaces using correlation heatmaps, small multiples, and pair plot matrices'
  ],
  badgeReward: {
    id: 'badge-visualization-master',
    title: 'Visualization Master',
    icon: 'BarChart2',
    description: 'Mastered all 19 lessons on Data Visualization, statistical charting architectures, Seaborn, Matplotlib, and ethical visualization design.'
  },
  lessons: MODULE_06_LESSONS,
  finalQuiz: MODULE_06_COMPREHENSIVE_QUIZ
};

