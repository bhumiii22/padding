console.log("My Supabase URL is:", import.meta.env.VITE_SUPABASE_URL);
import "./styles/global.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
)