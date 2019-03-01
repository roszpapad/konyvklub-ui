import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private resourceService : ResourceService,
              private tokenService : TokenService) { }

  getUserBusinessChannels(username){
    return this.resourceService.getResourceFromApi('/users/' + username + '/businessChannels');
  }

  getUserFriendlyChannels(username){
    return this.resourceService.getResourceFromApi('/users/' + username + '/friendlyChannels');
  }

  getChannelById(channelId){
    return this.resourceService.getResourceFromApi('/users/channels/' + channelId);
  }

  getMessagesByChannel(channelId){
    return this.resourceService.getResourceFromApi('/channels/' + channelId + '/messages')
  }

}
