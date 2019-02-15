import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private resourceService : ResourceService) { }

  createRequest(data){
    return this.resourceService.postData('/friendRequests/create',data);
  }

  acceptRequest(requestId){
    return this.resourceService.getResourceFromApiAsText('/friendRequests/' + requestId + '/accept');
  }

  rejectRequest(requestId){
    return this.resourceService.getResourceFromApiAsText('/friendRequests/' + requestId + '/reject');
  }

  getRequestsByStarter(requestStarter){
    return this.resourceService.getResourceFromApiWithParams('/friendRequests/getByStarter',{requestStarter});
  }

  getRequestsByDestination(requestDestination){
    return this.resourceService.getResourceFromApiWithParams('/friendRequests/getByDestination',{requestDestination});
  }

  wasRequestedYet(requestStarter, requestDestination){
    return this.resourceService.getResourceFromApiAsTextWithParams('/friendRequests/wasRequestedYet',{requestStarter,requestDestination});
  }
}
