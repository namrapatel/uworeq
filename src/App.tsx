import { useState } from 'react'
import './App.css'
import { Homepage } from './pages/Homepage'
import { AppContext, stores } from "./AppContext";

function App() {

  return (
    <AppContext.Provider value={stores}>
      <div className="App">
        <Homepage />
      </div>
    </AppContext.Provider>
  )
}

export default App
