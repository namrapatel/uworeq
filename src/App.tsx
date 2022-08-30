import { useState } from 'react';
import './App.css';
import { HomePage } from './Pages/HomePage';
import { AppContext, stores } from "./AppContext";

function App() {

  return (
      <div className="App">
          <AppContext.Provider value={stores}>
              <HomePage />
          </AppContext.Provider>
      </div>
  )
}

export default App;