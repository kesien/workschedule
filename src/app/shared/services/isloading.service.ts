import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class IsLoadingService {
    constructor() {}
  
    public isLoading = false;
  }