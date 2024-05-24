import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const token=localStorage.getItem("token");
  const route = inject(Router);
  // const notifyService=inject(NotificationService);
  req=req.clone({ setHeaders:{Authorization:`Bearer ${token}`}})
  return next(req).pipe(catchError((err)=>{
    if(err instanceof HttpErrorResponse ){
      if(err.status===401){
        // notifyService.showError("error","Unauthorized Access!!! Please Login!!!")
        alert("Unauthorized Access!!! Please Login!!!");  
        route.navigate(['login'])
      }  
    }
    return throwError(()=>new Error());
  }));

  
}
