import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './library.css'
import Library from './Components/Library'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Library/>
  </StrictMode>,
)
