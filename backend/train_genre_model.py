import os
import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay, accuracy_score

# Paths
CSV_PATH = 'data/gtzan/features_30_sec.csv'
MODEL_FOLDER = 'models'
os.makedirs(MODEL_FOLDER, exist_ok=True)

print("[INFO] Loading GTZAN features...")
df = pd.read_csv(CSV_PATH)

# Feature columns
features = [
    'chroma_stft_mean', 'chroma_stft_var',
    'rms_mean', 'rms_var',
    'spectral_centroid_mean', 'spectral_centroid_var',
    'spectral_bandwidth_mean', 'spectral_bandwidth_var',
    'rolloff_mean', 'rolloff_var',
    'zero_crossing_rate_mean', 'zero_crossing_rate_var'
] + [f'mfcc{i}_mean' for i in range(1, 21)] + [f'mfcc{i}_var' for i in range(1, 21)]

# Extract features and labels
X = df[features].values
y = df['label'].values

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save preprocessing tools
joblib.dump(scaler, f'{MODEL_FOLDER}/scaler.pkl')
joblib.dump(label_encoder, f'{MODEL_FOLDER}/label_encoder.pkl')

# Initialize and train Random Forest model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=25,
    random_state=42,
    class_weight='balanced'
)

print("[INFO] Training Random Forest classifier...")
model.fit(X_train_scaled, y_train)

# Save trained model
joblib.dump(model, f'{MODEL_FOLDER}/genre_classifier.pkl')

# Evaluate on training set
y_train_pred = model.predict(X_train_scaled)
train_acc = accuracy_score(y_train, y_train_pred)
print(f"[INFO] Training accuracy: {train_acc:.2f}")

# Evaluate on test set
y_test_pred = model.predict(X_test_scaled)
test_acc = accuracy_score(y_test, y_test_pred)
print(f"[INFO] Test accuracy: {test_acc:.2f}")
print("[INFO] Classification Report:")
print(classification_report(y_test, y_test_pred, target_names=label_encoder.classes_))

# Confusion matrix
cm = confusion_matrix(y_test, y_test_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=label_encoder.classes_)
disp.plot(cmap='Blues')
plt.title('Random Forest Confusion Matrix')
plt.tight_layout()
plt.savefig(f'{MODEL_FOLDER}/rf_confusion_matrix.png')

# Optional: cross-validation
cv_score = cross_val_score(model, X_train_scaled, y_train, cv=5).mean()
print(f"[INFO] Cross-validation accuracy: {cv_score:.2f}")

print("[SUCCESS] Random Forest model, Scaler, and LabelEncoder saved!")
