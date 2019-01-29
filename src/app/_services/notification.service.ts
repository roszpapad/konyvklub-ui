import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private resourceService : ResourceService) { }

  getUserNotifications(userId){
    return this.resourceService.getResourceFromApi('/notifications/' + userId);
  }

  getUserNotificationsSize(userId){
    return this.resourceService.getResourceFromApi('/notifications/' + userId + '/size');
  }
}
