import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private resourceService : ResourceService,
              private tokenService : TokenService) { }

  getUserChannels(username){
    return this.resourceService.getResourceFromApi('/users/' + username + '/channels');
  }

  getChannelById(channelId){
    return this.resourceService.getResourceFromApi('/users/channels/' + channelId);
  }

  getMessagesByChannel(channelId){
    return this.resourceService.getResourceFromApi('/channels/' + channelId + '/messages')
  }

}
