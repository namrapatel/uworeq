import { useState } from 'react'
import './App.css'
import { Homepage } from './pages/Homepage'
import { AppContext, stores } from "./AppContext";

function App() {

  return (
      <div className="App">
        <Homepage />
      </div>
  )
}

export default App;