import { Search, Loader, Music, User, Clock, Activity, BarChart2, Home, ListMusic } from 'lucide-react';
import React, { useState } from "react";

// Similar Songs Screen with Dark Theme
export default function SimilarSongsScreen() {
  const [songName, setSongName] = useState('');
  const [numRecommendations, setNumRecommendations] = useState(5);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]);
    setError('');

    const formData = new FormData();
    formData.append('song_name', songName);
    formData.append('num_recommendations', numRecommendations);

    try {
      const res = await fetch('http://localhost:5000/recommend-song', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setRecommendations(data.results || []);
      }
    } catch (err) {
      setError('Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-neutral-200 mx-auto h-full  justify-start items-start">

      {/* Main Content */}
      <div className=" p-8">
        <h1 className="text-2xl font-bold mb-8">Find Similar Songs</h1>

        <div className="mb-12 w-full">
          <div className="">
            <div className="relative w-full ">
              <input
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Enter song name"
                className="w-full bg-neutral-800 border border-neutral-700 p-3 pl-10 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
              <Search size={18} className="absolute left-3 top-3.5 text-neutral-500" />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="px-1 block text-sm text-neutral-400 mb-1">Number of recommendations</label>
                <input
                  type="number"
                  value={numRecommendations}
                  onChange={(e) => setNumRecommendations(parseInt(e.target.value))}
                  min={1}
                  max={20}
                  className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>
              <div className="self-end">
                <button
                  onClick={handleSubmit}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-md transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    'Find Similar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader size={32} className="animate-spin text-neutral-500" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-neutral-800 border border-neutral-700 p-5 rounded-md hover:border-neutral-600 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium">{rec.song_name}</h3>
                <div className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-400">
                  #{index + 1}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-neutral-400">
                <User size={14} />
                <span className="text-sm">{rec.artist}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <BarChart2 size={16} className="text-neutral-500" />
                  <div className="text-sm">
                    <div className="text-neutral-400">Popularity</div>
                    <div>{rec.popularity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-neutral-500" />
                  <div className="text-sm">
                    <div className="text-neutral-400">Tempo</div>
                    <div>{rec.tempo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-neutral-500" />
                  <div className="text-sm">
                    <div className="text-neutral-400">Energy</div>
                    <div>{rec.energy}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-neutral-500" />
                  <div className="text-sm">
                    <div className="text-neutral-400">Danceability</div>
                    <div>{rec.danceability}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
