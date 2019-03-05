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
  interestedButtonShow: boolean;
  endDate;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getUserPicture(); 
      this.setInterestedButtonShow();
      this.setEndDate();
    }, 500);
  }

  setInterestedButtonShow() {
    var url = this.router.url;
    this.interestedButtonShow = url.indexOf("tickets") > -1 ? false : true;
  }

  setEndDate() {
    var ending = this.ticket.endDate.replace("T", " - ");
    this.endDate = ending;
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
