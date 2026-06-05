import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/axiosToaster'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: '12px',
          fontSize: '14px',
          padding: '12px 14px',
        },
      }}
    />
  </StrictMode>,
)
