import { inject } from "@angular/core";
import { AuthService } from '../services/auth.service';
import {Injectable} from '@angular/core';
import {Router } from "@angular/router";

Injectable({
  providedIn:'root'
})

   export const AuthGuard =()=>{
    const router=inject(Router);
    const authservice=inject(AuthService)
    if(authservice.isLoggedIn()){
      return true;
    }
    else{
      router.navigate(['login'])
      return false;
    }
};