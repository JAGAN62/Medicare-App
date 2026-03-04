import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from "react-router-dom";
import {ClerkProvider} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if(!PUBLISHABLE_KEY){
   throw new Error("publishable key is missing!")
}
createRoot(document.getElementById('root')).render(
   <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      allowedRedirectOrigins={[
        "https://medicare-p6g63628f-mamanduru-jagans-projects.vercel.app",
        "https://medicare-admin-otp5yo0af-mamanduru-jagans-projects.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
      ]}
   >
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ClerkProvider>
)