from flask import Flask, jsonify, request, render_template
import os
import librosa
import numpy as np
import pandas as pd
import joblib
import plotly.graph_objs as go
from flask_cors import CORS
import plotly.io as pio
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

model = joblib.load('models/genre_classifier.pkl')
scaler = joblib.load('models/scaler.pkl')
label_encoder = joblib.load('models/label_encoder.pkl')

ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_features(file_path):
    y, sr = librosa.load(file_path, duration=30)
    chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
    rms = librosa.feature.rms(y=y)
    spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
    spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
    rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
    zcr = librosa.feature.zero_crossing_rate(y)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)

    features = [
        np.mean(chroma_stft), np.var(chroma_stft),
        np.mean(rms), np.var(rms),
        np.mean(spec_cent), np.var(spec_cent),
        np.mean(spec_bw), np.var(spec_bw),
        np.mean(rolloff), np.var(rolloff),
        np.mean(zcr), np.var(zcr)
    ]
    for i in range(20):
        features.append(np.mean(mfcc[i]))
        features.append(np.var(mfcc[i]))

    return features

@app.route('/upload-genre', methods=['GET', 'POST'])
def upload_genre():
    if request.method == 'POST':
        file = request.files.get('file')
        if not file or file.filename == '':
            return "No file selected"
        if allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            features = extract_features(filepath)
            features_scaled = scaler.transform([features])
            prediction_encoded = model.predict(features_scaled)[0]
            genre_prediction = label_encoder.inverse_transform([prediction_encoded])[0]
            os.remove(filepath)
            return jsonify({"genre": genre_prediction, "filename": filename})
    return render_template('form_upload_genre.html')

@app.route('/upload-visualize', methods=['GET', 'POST'])
def upload_visualize():
    if request.method == 'POST':
        file = request.files.get('file')
        if not file or file.filename == '':
            return "No file selected"
        if allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            try:
                y, sr = librosa.load(filepath, duration=60)
                os.remove(filepath)
                tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
                chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
                chroma_mean = np.mean(chroma, axis=1)
                key_idx = np.argmax(chroma_mean)
                keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
                key = keys[key_idx]
                scale = "Major" if chroma_mean[(key_idx + 4) % 12] > chroma_mean[(key_idx + 3) % 12] else "Minor"
                energy = np.mean(librosa.feature.rms(y=y)).item()
                time = np.linspace(0, len(y)/sr, len(y))
                waveform_fig = go.Figure([go.Scatter(x=time, y=y, mode='lines')])
                waveform_fig.update_layout(title='Waveform')
                D = librosa.amplitude_to_db(np.abs(librosa.stft(y)), ref=np.max)
                spectrogram_fig = go.Figure(data=go.Heatmap(z=D, colorscale='Viridis'))
                spectrogram_fig.update_layout(title='Spectrogram')
                chroma_fig = go.Figure(data=go.Heatmap(z=chroma, colorscale='Blues'))
                chroma_fig.update_layout(title='Chroma')
                mfcc = librosa.feature.mfcc(y=y, sr=sr)
                mfcc_fig = go.Figure(data=go.Heatmap(z=mfcc, colorscale='Jet'))
                mfcc_fig.update_layout(title='MFCCs')
                return jsonify({
                        "tempo": round(float(tempo), 2),
                        "key": key,
                        "scale": scale,
                        "energy": round(float(energy), 3),
                        "waveform_html": pio.to_html(waveform_fig, full_html=False),
                        "spectrogram_html": pio.to_html(spectrogram_fig, full_html=False),
                        "chroma_html": pio.to_html(chroma_fig, full_html=False),
                        "mfcc_html": pio.to_html(mfcc_fig, full_html=False)
                    })
            except Exception as e:
                return f"Error: {str(e)}"
    return jsonify({
    "tempo": round(float(tempo), 2),
    "key": key,
    "scale": scale,
    "energy": round(float(energy), 3),
    "waveform_html": pio.to_html(waveform_fig, full_html=False),
    "spectrogram_html": pio.to_html(spectrogram_fig, full_html=False),
    "chroma_html": pio.to_html(chroma_fig, full_html=False),
    "mfcc_html": pio.to_html(mfcc_fig, full_html=False)
})

@app.route('/recommend-song', methods=['GET', 'POST'])
def recommend_song():
    if request.method == 'POST':
        song_name = request.form['song_name'].strip().lower()
        num = int(request.form.get('num_recommendations', 5))
        try:
            df = pd.read_csv('main_dataset.csv')
            df = df[['name', 'artists_names', 'popularity', 'tempo', 'energy', 'danceability']].dropna()
            df.columns = ['song_name', 'artist', 'popularity', 'tempo', 'energy', 'danceability']
            df['match'] = df['song_name'].str.lower().str.contains(song_name)
            target_song = df[df['match']].head(1)
            if target_song.empty:
                return f"No match found for '{song_name}'"
            target = target_song.iloc[0]
            same_artist = df[df['artist'] == target['artist']]
            similar_tempo = df[np.abs(df['tempo'] - target['tempo']) <= 10]
            similar_energy = df[np.abs(df['energy'] - target['energy']) <= 0.1]
            candidates = pd.concat([same_artist, similar_tempo, similar_energy]).drop_duplicates()
            candidates = candidates[~candidates['song_name'].str.lower().str.contains(song_name)]
            recommendations = candidates.sort_values(by='popularity', ascending=False).head(num)
            return jsonify({
                "song_input": song_name.title(),
                "results": recommendations.to_dict(orient='records')
            })
        except Exception as e:
            return f"Error: {str(e)}"
    return jsonify({
            "song_input": song_name.title(),
            "results": recommendations.to_dict(orient='records')
        })

if __name__ == '__main__':
    app.run(debug=True)
