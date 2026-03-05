import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sala from './Components/Sala'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sala/>
  </StrictMode>,
)
