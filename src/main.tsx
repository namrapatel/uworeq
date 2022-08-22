import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppContext, stores } from "./AppContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContext.Provider value={stores}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContext.Provider>
)
