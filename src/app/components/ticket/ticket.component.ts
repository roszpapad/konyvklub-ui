import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket;
  image;
  interestedButtonShow : boolean;
  endDate;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => { this.getUserPicture(); }, 500);
    this.setInterestedButtonShow();
    this.setEndDate();
  }

  setInterestedButtonShow(){
    var url = this.router.url;
    this.interestedButtonShow = url.indexOf("tickets") > -1 ? false : true;
  }

  setEndDate(){
    this.endDate = this.ticket.endDate.replace("T"," - ");
  }

  getUserPicture() {
    let userId = this.ticket.seller.id;
    this.userService.getProfilePictureWithId(userId).subscribe(
      data => {
        if (data) {
          this.image = data;
        }
      });
  }

  navigateToTicket(ticketId) {
    this.router.navigateByUrl('/tickets/' + ticketId);
  }

}
