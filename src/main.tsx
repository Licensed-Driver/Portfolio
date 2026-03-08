import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <img src="../images/website-bg.jpg" className='absolute w-full h-full object-cover -z-50 pointer-events-none' alt="Desktop Background"/>
    <App />
  </StrictMode>,
)
