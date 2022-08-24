import { useState } from 'react';
import './App.css';
import { HomePage } from './Pages/HomePage';
import { AppContext, stores } from "./AppContext";

function App() {

  return (
      <div className="App">
        <HomePage />
      </div>
  )
}

export default App;