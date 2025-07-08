import SongDisc from "./SongDisc";
import { useRecoilState } from 'recoil';
import { genre, song } from '../store/prediction';

export default function AudioScreen() {
    const [genrePrediction, setGenrePrediction] = useRecoilState(genre)
    const [songGenre, setSongGenre] = useRecoilState(song)

    return (
      <div className="text-center aspect-square bg-neutral-800 px-20 py-10 rounded-xl">
        <h1 className="text-3xl font-medium mb-2">{songGenre.genre ? songGenre.filename.replace(/\.(mp3|wav)$/i, "") : "Your Audio"}
        </h1>
        <p className="text-gray-400 mb-8">{songGenre.genre ? songGenre.filename : "your uploaded audio.mp3"}
        </p>

        <div className="flex justify-center mb-12">
          <SongDisc />
        </div>

        <div className="flex justify-center space-x-12 mb-4">
          <div className="w-full">
            <p className="text-xl mb-2">Genre:</p>
            <button className="w-full px-12 py-3 bg-teal-600 text-white rounded-md font-medium ">
              {genrePrediction
               ? genrePrediction : "Please Upload Your Audio First!"}
            </button>
          </div>

          {/* <div>
            <p className="text-xl mb-2">Tempo:</p>
            <button className="px-12 py-3 bg-teal-500 text-white rounded-md font-medium w-40">
              48
            </button>
          </div> */}
        </div>
      </div>
    );
  }
