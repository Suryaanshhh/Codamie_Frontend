import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://codamie-backend.onrender.com";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
