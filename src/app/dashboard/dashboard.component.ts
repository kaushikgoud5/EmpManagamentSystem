import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,NgFor,NgIf,FormsModule,MessagesModule,ToastModule, ButtonModule, RippleModule,ReactiveFormsModule],
  providers: [NotificationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private api:ApiService,private notifyService:NotificationService) {
  }
  reactiveForm:FormGroup;
  ngOnInit(){
    this.reactiveForm=new FormGroup({
      empId:new FormControl('', [
        Validators.required,
        Validators.pattern('^TZ\\d{4}$')
      ]),
      firstname:new FormControl(),
      lastname:new FormControl(),
      department:new FormControl(),
      location:new FormControl(),
      project:new FormControl(),
      manager:new FormControl(),
      joinDate:new FormControl()

    });
  }

  data:any[]=[];

  onClickCloseBtn(){
    this.data=[];
  }
  onGetEmpDetails(){
    this.api.GetEmployees().subscribe({
      next:(res)=>{
        this.notifyService.showSuccess("success","successfully fetched from the backend")
        this.data=res;
      },
      error:(err)=>{
        this.notifyService.showError("error",err);
      }
    });
  }

  @ViewChild('id') EmpId: ElementRef;
  onGetOneEmpDetails(){
    this.api.GetOneEmployee(this.EmpId.nativeElement.value).subscribe({
      next:(res)=>{
        this.data=[res];
        this.notifyService.showSuccess("success","successfully fetched from the backend")
      } ,
      error:(err)=>{
        console.log(err)
        this.notifyService.showError("error",err);
      }
    
    });
  }
  deleteEmp(id: HTMLInputElement) {
   this.api.DeleteEmployee(id.value).subscribe({
    next:(res)=>{
      this.notifyService.showSuccess("success","successfully deleted")
    },
    error:(err)=>{
      this.notifyService.showError("error","Some Error Has Occured!");
    }
   })
  }
  addData: any[] = [];
  onSubmit(form: any) {
    console.log(this.reactiveForm)
    this.addData = form.value;
    this.api.AddEmployee(this.reactiveForm.value).subscribe({
      next:(res)=>{
          this.notifyService.showSuccess("success","successfully added")
      },error:(err)=>{
        this.notifyService.showError("error","Some Error Has Occured!");
      }
    })
  }
  updateData: any[] = [];
  @ViewChild('formUpdate') updateForm: any;
  updateId: string;
  onUpdateEmployee(id) {
    this.api.GetOneEmployee(id.value).subscribe({
      next: (res: any[]) => {
        this.updateData = res;
        this.updateForm.controls['empId'].setValue(this.updateData['empId']);
        this.updateForm.controls['firstName'].setValue(
          this.updateData['firstName']
        );
        this.updateForm.controls['lastName'].setValue(
          this.updateData['lastName']
        );
        this.updateForm.controls['location'].setValue(
          this.updateData['location']
        );
        this.updateForm.controls['department'].setValue(
          this.updateData['department']
        );
        this.updateForm.controls['manager'].setValue(
          this.updateData['manager']
        );
        this.updateForm.controls['project'].setValue(
          this.updateData['project']
        );
        this.updateForm.controls['joinDate'].setValue(
          new Date(this.updateData['joinDate']).toISOString().split('T')[0]
        );
      }
    })

  }
  onSubmitUpdate(form: NgForm, id) {
    const data = form.value;
    this.api.UpdateEmployee(data['empId'],data).subscribe({
      next:(res)=>{
        this.notifyService.showSuccess("success","successfully updated")
      },
      error:()=>{
        this.notifyService.showError("error","Some Error Has Occured!");
      }
    });









  }
}
