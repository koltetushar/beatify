import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container, UploadScreen, PropertiesScreen, AudioScreen, SimilarSongsScreen } from './Components/index.js'
import {RecoilRoot} from "recoil";

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>
            <RecoilRoot>
                    <Container>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path='/upload' element = {<UploadScreen />} />
                            <Route path='/visualize' element = {<PropertiesScreen />} />
                            <Route path='/genre' element = {<AudioScreen />} />
                            <Route path='/similar' element = {<SimilarSongsScreen />} />
                        </Routes>
                    </Container>
                </RecoilRoot>
        </BrowserRouter>

    </StrictMode>,
)
