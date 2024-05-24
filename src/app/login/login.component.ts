import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm ,FormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgStyle,NgIf],
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogged:boolean=false;
  public resetPasswordEmail:string;
  public IsEmailValid(){

  }
  checkValidEmail(event:string){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value=event;
    return emailRegex.test(value);
  }
  onClickSend(resetPasswordEmail){
      console.log(resetPasswordEmail)
  }
  constructor(private authService:AuthService ,private router:Router,private messageService: MessageService) { }
  SwitchMode(){
    this.isLogged=!this.isLogged;
  }
  onClickLogin(formdata:NgForm){
    if(this.isLogged){
        this.authService.signUp(formdata.value).subscribe({
          next:(res:any)=>{
              formdata.reset();
              this.isLogged=true;
              this.showToaster(res.message)
          },
          error:(err)=>{
            console.log(err)
            this.showError(err.error.message);
          }
        });
    }
    else{
      console.log(formdata)
      this.authService.login(formdata.value).subscribe({
        next:(res:any)=>{
          formdata.reset();
          this.authService.storeToken(res.token);
          this.showToaster(res.message)
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          console.log(err)
          this.showError(err.error.message);
        }
      });
    }
    
  }
   showError(errorMessage: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
    showToaster(msg:string){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    }
 
}
