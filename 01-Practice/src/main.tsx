import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Clases from './Clase'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Clases/>
  </StrictMode>,
)
