import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../services/notification.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserStoreService } from '../../services/user-store.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ToastModule, ButtonModule, RippleModule],
  providers:[NotificationService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username:string;
constructor(private auth:AuthService,private notify:NotificationService,private userStore:UserStoreService,private router:Router){
}
ngOnInit(){
  this.userStore.getUser().subscribe({
    next:(res)=>{
    this.username=this.auth.getUsername();
    }
  })
}
onClickLogout(){
  this.notify.showSuccess("success","Logged Out")
  this.auth.signOut();
  this.router.navigate(['login'])
}

}
