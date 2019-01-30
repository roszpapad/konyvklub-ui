import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification;

  isRejected : boolean;

  constructor(private router : Router) { }

  ngOnInit() {
    this.setIsRejected();
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

}
