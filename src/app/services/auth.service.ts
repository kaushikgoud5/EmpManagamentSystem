import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { inject } from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:44369/api/Auth/";
  private userPayload;
  constructor(private http:HttpClient ) {
    this.userPayload=this.decodedToken();
  }
  login(loginObj:any){
    return this.http.post(`${this.baseUrl}login`,loginObj)
  }
  signUp(userObj:any){
    console.log(userObj)
    return this.http.post(`${this.baseUrl}register`,userObj)
  }
  storeToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }
  getToken(){
    return localStorage.getItem("token");
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }
  signOut(){
    localStorage.clear();
  }
  decodedToken(){
    const jwtHelper=new JwtHelperService();
    const token=localStorage.getItem("token");
    return jwtHelper.decodeToken(token);
  }
  getUsername(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }
}
