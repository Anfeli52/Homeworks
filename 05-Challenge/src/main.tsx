import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ATM from './Components/ATM'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ATM />
  </StrictMode>,
)
