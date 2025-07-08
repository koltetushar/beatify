import { genre, song, visualize } from '../store/prediction';
import { useRecoilState } from 'recoil';
import RawHTMLWithScripts from './RawHTMLWithScripts';

export default function PropertiesScreen() {
    const [visuals, setVisuals] = useRecoilState(visualize);

    return (
      <div className="w-full h-full py-10">
        <h1 className="text-3xl font-medium mb-2">Properties & Visualization</h1>
        <p className="text-gray-400 mb-8">These are the properties & visualization of the provided audio file!</p>

        {
            visuals.tempo ? (

                <div>
                    <div className='w-full flex justify-between items-center flex-row gap-5 mb-5'>
                    <p className='bg-neutral-800 w-full flex justify-center items-center rounded py-5 px-5 border border-neutral-700'>Tempo: {visuals.tempo}</p>
                <p className='bg-neutral-800 w-full flex justify-center items-center rounded py-5 px-5 border border-neutral-700'>Key: {visuals.key}</p>
                <p className='bg-neutral-800 w-full flex justify-center items-center rounded py-5 px-5 border border-neutral-700'>Scale: {visuals.scale}</p>
                <p className='bg-neutral-800 w-full flex justify-center items-center rounded py-5 px-5 border border-neutral-700'>Energy: {visuals.energy}</p>
                    </div>

                <RawHTMLWithScripts htmlString={visuals.waveform_html} />
                <br/>
                <RawHTMLWithScripts htmlString={visuals.spectrogram_html} />
                <br />
                <RawHTMLWithScripts htmlString={visuals.chroma_html} />
                <br />
                <RawHTMLWithScripts htmlString={visuals.mfcc_html} />
              </div>

        ) : (
                <div>
                Please Upload Audio First!
                </div>
            )
        }

        {/* <div className="grid grid-cols-1 gap-6">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <div className="bg-black rounded-lg p-4">
              <div className="h-48 w-full bg-teal-500 opacity-80 rounded"></div>
              <p className="text-center mt-2">Spectogram of Audio</p>
            </div>
          </div>

          <div className="bg-neutral-900 p-4 rounded-lg">
            <div className="bg-black rounded-lg p-4">
              <div className="h-48 w-full bg-green-500 opacity-70 rounded"></div>
              <p className="text-center mt-2">MFCC of Audio</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
