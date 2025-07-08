import React, { useState } from 'react'
import {NavItem, Logo} from './'
import { Upload, Home, Layers, BarChart2, ListMusic, User, Play } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { genre, song } from '../store/prediction';
import { CheckCircle } from 'lucide-react';

const Container = ({children}) => {

    const [currentScreen, setCurrentScreen] = useState("upload")

    const [genrePrediction, setGenrePrediction] = useRecoilState(genre)
    const [songGenre, setSongGenre] = useRecoilState(song)

     // Screens component mapping
    // const screens = {
    //     upload: <UploadScreen />,
    //     properties: <PropertiesScreen />,
    //     audio: <AudioScreen />,
    //     similar: <SimilarSongsScreen />
    // };

  return (
    <div className='w-full h-full grid grid-cols-6 min-h-screen bg-neutral-900 text-neutral-100'>
        <div className="bg-neutral-900 p-6 w-full flex justify-between flex-col">
            <div>
        <div className="flex items-center justify-center">
          <Logo />
          {/* <span className="text-2xl font-medium">Beatify</span> */}
        </div>

        {/* <NavItem icon={<Home size={20} />} label="Home" />
          <NavItem
            icon={<Upload size={20} />}
            label="Upload Song"
            link="upload"
            active={currentScreen === 'upload'}
            onClick={() => setCurrentScreen('upload')}
          /> */}
        <nav className="space-y-1">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            link="upload"
            active={currentScreen === 'upload'}
            onClick={() => setCurrentScreen('upload')}
          />
          <NavItem
            icon={<Layers size={20} />}
            label="Genre"
            link="genre"
            active={currentScreen === 'audio'}
            onClick={() => setCurrentScreen('audio')}
          />
          <NavItem
            icon={<BarChart2 size={20} />}
            label="Visualization"
            link="visualize"
            active={currentScreen === 'properties'}
            onClick={() => setCurrentScreen('properties')}
          />
          <NavItem
            icon={<ListMusic size={20} />}
            label="Similar Songs"
            link="similar"
            active={currentScreen === 'similar'}
            onClick={() => setCurrentScreen('similar')}
          />
        </nav>
        </div>
        <div>
                    {
                songGenre.genre ? (
                    <div className='flex justify-between items-center flex-row gap-2 bg-green-950 px-5 w-full mx-auto py-3 rounded-full border border-green-400 text-green-200'>
                        {/* <h2>{songGenre.genre}</h2> */}
                        <h2>{songGenre.filename}</h2>
                        <CheckCircle size={18} />
                    </div>
                ) : (
                        <div className='flex justify-between items-center flex-row gap-2 bg-red-950 px-5 w-full mx-auto py-3 rounded-full border border-red-400 text-red-200'>
                        {/* <h2>{songGenre.genre}</h2> */}
                        <h2>Upload File First!</h2>
                    </div>
                )
            }
        </div>
      </div>
      {/* bg-neutral-950/50 */}
      <div className="bg-neutral-950/50 col-span-5 p-6 w-full h-full mx-auto flex justify-center items-center">

        {children}
      </div>
    </div>
  )
}

export default Container
