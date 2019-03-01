import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications;

  constructor(private notificationService : NotificationService,
              private tokenService : TokenService) { }

  ngOnInit() {
    let userId = this.tokenService.getTokenProperty("id");
    this.notificationService.getUserNotifications(userId).subscribe(
      data => {
        var notificationsReverse : [] = data as [];
        this.notifications = notificationsReverse.reverse();        
      }
    );
  }

}
