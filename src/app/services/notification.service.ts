import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
providedIn:'root'
})
export class NotificationService{
constructor(private messageService:MessageService){
}
showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }
showSuccess(summary: string, detail: string) {
this.messageService.add({ severity: 'success', summary: summary, detail: detail });
 }
}