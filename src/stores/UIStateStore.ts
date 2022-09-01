import { makeAutoObservable, observable, action, autorun } from 'mobx';
import { ApplicationStore } from './ApplicationStore';

export class UIStateStore {
    public page: string;
    
    constructor() {
        makeAutoObservable(this,
          {
            page: observable,
          });

          this.page = "LandingPage";
      }

      public setPage(page: string) {
        this.page = page;
        console.log("Page set to " + page);
      }
}