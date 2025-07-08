# 🎵 Beatify

Beatify is an AI-powered music analysis and recommendation web app. It predicts the genre of any uploaded song, visualizes its audio features, and suggests similar songs based on tempo, energy, and mood.

---

## 🚀 Features

✅ **Genre Prediction**

* Predicts music genre using a Random Forest classifier trained on the GTZAN dataset.

✅ **Audio Visualizations**

* Waveform, Spectrogram, Chroma Map, MFCC Heatmaps (Interactive with Plotly).

✅ **Song Recommendations**

* Suggests similar tracks based on audio features like tempo, energy, and artist similarity.


---

## 🛠 Tech Stack

* **Backend**: Flask, Python 3, Librosa, Scikit-learn
* **Frontend**: ReactJS, TailwindCSS, Plotly
* **Machine Learning**: Random Forest Classifier (GTZAN dataset)

---

## 🗺️ Architecture Diagram

![Beatify Diagram](https://github.com/user-attachments/assets/497f143c-d9ad-4800-abd6-b5970327fd5c)

---

## 📂 Project Structure

```
Beatify/
│
├── backend/
│   ├── app.py                # Flask API
│   ├── train_genre_model.py  # ML model training script
│   ├── models/               # Saved Random Forest model
│   ├── templates/            # HTML Templates for testing
│   ├── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── src/                  # React source code
│   ├── public/               # Static assets
│   ├── package.json           # React dependencies
│   ├── vite.config.js         # Vite config
│
└── README.md
```

---

## 🏃‍♂️ Getting Started

### Backend (Flask API)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 📜 License

This project is licensed under MIT – feel free to use and modify.
