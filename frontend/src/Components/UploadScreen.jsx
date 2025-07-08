import { Check, Upload } from 'lucide-react';
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useRecoilState } from 'recoil';
import { genre, song, visualize } from '../store/prediction';
import { CheckCircle } from 'lucide-react';

export default function UploadScreen() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [genrePrediction, setGenrePrediction] = useRecoilState(genre)
    const [songGenre, setSongGenre] = useRecoilState(song)
    const [visuals, setVisuals] = useRecoilState(visualize);
    const [error, setError] = useState('');

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file.name);
        setFileData(file);
      }
    };

    const handleSubmit = async () => {

        setLoader(true)
      if (!fileData) {
        alert("Please select a file first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", fileData);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload-genre", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Upload success:", data);

        alert("Genre Prediction Completed!");
        if(data){
            setGenrePrediction(data.genre)
            setSongGenre(data)
        }

        setLoader(false)
      } catch (error) {
        console.error("Upload failed:", error);
        setLoader(false)
        alert("Upload failed. Please try again.");
      }


      try {
        setLoader(true)
        const response = await fetch("http://127.0.0.1:5000/upload-visualize", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Upload success:", data);

        alert("Visualization & Properties Extracted successfully!");
        if(data){
                setVisuals(data)
        }

        setLoader(false)
      } catch (error) {
        console.error("Upload failed:", error);
        setLoader(false)
        alert("Upload failed. Please try again.");
      }

    };

  return (
    <div className="text-center">

        <div className='absolute right-10 top-10'>
            <button
            type="button"
            className={`
            inline-flex cursor-not-allowed items-center rounded-md px-4 py-2 text-sm leading-6 font-semibold ${loader ? `bg-red-950 hover:bg-red-900 text-red-100` : `bg-neutral-800 hover:bg-neutral-700 text-white`} transition duration-150 ease-in-out
            `} disabled="">
                {loader ? (<div className='w-full flex justify-center items-center'>
                    <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                    Loading…
                </div>) :
                (
                    <div className='w-full flex justify-center items-center gap-2'>
                        <CheckCircle size={18}/>
                        Completed
                    </div>
                )}
            </button>
        </div>

        {/* {loader ? "Loading...." : "Completed"}
        {genrePrediction ? genrePrediction : "Not Yet"} */}
      <h1 className="text-3xl font-medium mb-2">Please Upload Your Audio File</h1>
      <p className="text-gray-400 mb-8">Click On The Select File Button</p>

      <div className="border border-dashed border-gray-600 rounded-lg p-12 mb-8 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        <Upload size={32} className="text-white mb-4" />
        <p className="mb-2">Select a file or drag and drop here</p>
        <p className="text-gray-400 text-sm mb-6">
          Supports .mp3, .ogg, .flac, .m4a files
        </p>

        <input
          type="file"
          name="file"
          accept=".mp3,.ogg,.flac,.m4a,.wav"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button
          onClick={handleButtonClick}
          className={`cursor-pointer px-8 py-3 ${selectedFile ? `bg-teal-800` : `bg-teal-500`}  text-white rounded-full font-medium transition-colors hover:bg-teal-600 mb-4`}
        >
          SELECT FILE
        </button>

        <p className="text-gray-400 mb-6">
          {selectedFile ? `Selected: ${selectedFile}` : "No file selected"}
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`px-8 py-3 w-full ${selectedFile ? `bg-teal-500` : `bg-teal-800`} text-white rounded-xl font-medium hover:bg-teal-600 transition-all duration-300`}
        >
          SUBMIT
        </button>
      </div>
    </div>

      <div className="flex justify-center space-x-4">
        <Link to="/genre" className="px-8 py-3 bg-white text-black rounded-full font-medium">
          Classify Genre
        </Link>
        <Link to="/visualize" className="px-8 py-3 bg-white text-black rounded-full font-medium">
          Get Properties & Visualization
        </Link>
        <Link to="/similar" className="px-8 py-3 bg-white text-black rounded-full font-medium">
          Suggest Similar Songs
        </Link>
      </div>

      <div className="mt-8">
        {/* <h2 className="text-xl mb-2">Recently Uploaded:</h2> */}
        <div className="text-gray-400">

        </div>
      </div>
    </div>
  );
}
