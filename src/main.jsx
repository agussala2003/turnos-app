import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { init } from "@emailjs/browser";
import { BrowserRouter } from 'react-router-dom';

init("inR8CgQJms6kwEcME"); // Reemplazá con tu Public Key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)