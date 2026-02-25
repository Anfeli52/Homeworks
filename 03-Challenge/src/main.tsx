import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SongsNames from './SongsNames'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SongsNames/>
  </StrictMode>,
)
