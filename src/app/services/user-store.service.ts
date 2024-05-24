import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private username$=new BehaviorSubject<string>("");
  
  getUser(){
    return this.username$.asObservable();
  }
  setUser(name:string){
    this.username$.next(name);
  }

  constructor() { }
}
