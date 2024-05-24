import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl="https://localhost:44369/api/Employee/";
  constructor(private http:HttpClient) { }
  GetEmployees(){
    return this.http.get<any>(this.baseUrl);
  }
  GetOneEmployee(id:string){
    return this.http.get<any>(`https://localhost:44369/api/Employee/id?id=${id}`);
  }
  DeleteEmployee(id:string){
    return this.http.delete<any>(`https://localhost:44369/api/Employee/id?id=${id}`)
  }
  AddEmployee(data){
    return this.http.post("https://localhost:44369/api/Employee",data);
  }
  UpdateEmployee(id,data){
    return this.http.put(`https://localhost:44369/api/Employee/id?id=${id}`,data);
  }
}
