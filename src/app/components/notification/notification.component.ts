import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification;
  creationDate;

  isRejected : boolean;

  constructor(private router : Router) { }

  ngOnInit() {
    this.setIsRejected();
    this.setCreationDate();
  }

  navigateToTicket(ticketId){
    this.router.navigateByUrl("/tickets/" + ticketId);
  }

  setIsRejected(){
    if (this.notification.message == "Ajánlat elutasítva:"){
      this.isRejected = true;
    } else {
      this.isRejected = false;
    }
  }

  goToChat(chatId){
    this.router.navigateByUrl("/privateChat/" + chatId);
  }

  setCreationDate(){
    var creationTime : string = this.notification.createDate;
    creationTime = creationTime.replace("T"," - ");
    this.creationDate = creationTime;
  }

}
