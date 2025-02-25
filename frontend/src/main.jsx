import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./AppContext"; 
import {CookiesProvider} from "react-cookie";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CookiesProvider>
  </StrictMode>
)
