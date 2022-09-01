import * as React from "react";
import { ApplicationStore, UIStateStore } from "./stores";

export function createStores() {
  return { 
    applicationStore: new ApplicationStore(),
    uiStateStore: new UIStateStore(),
   };
}

export const stores = createStores();

export const AppContext = React.createContext(stores);