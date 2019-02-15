import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from 'src/app/_services/friend-request.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {

  requestsGot;

  constructor(private friendRequestService : FriendRequestService,
              private router : Router,
              private tokenService : TokenService) { }

  ngOnInit() {
    this.getRequests();

  }

  getRequests(){
    let username = this.tokenService.getTokenProperty("user_name");
    this.friendRequestService.getRequestsByDestination(username).subscribe(
      data => {
        this.requestsGot = data;
      }
    );
  }

  refreshPage() {
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
      () => {this.router.navigateByUrl('/friendRequests');});
  }

  acceptRequest(requestId){
    this.friendRequestService.acceptRequest(requestId).subscribe(
      data => {
        this.getRequests();
      }
    );
  }

  rejectRequest(requestId){
    this.friendRequestService.rejectRequest(requestId).subscribe(
      data => {
        this.getRequests();
      }
    );
  }

}
