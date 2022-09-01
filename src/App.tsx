import { useState } from 'react';
import './App.css';
import { AppContext, stores } from "./AppContext";
import { LandingPage } from './pages/LandingPage';
import { SelectionPage } from './pages/SelectionPage';

function App() {

  return (
      <div className="App">
          <AppContext.Provider value={stores}>
            {
                stores.uiStateStore.page === "LandingPage" ? <LandingPage></LandingPage> 
                :  <SelectionPage></SelectionPage> 
            }
          </AppContext.Provider>
      </div>
  )
}

export default App;