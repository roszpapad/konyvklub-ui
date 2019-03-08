import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenService } from 'src/app/_services/token.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UpdateTicketDialogComponent } from '../update-ticket-dialog/update-ticket-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket;
  image;
  isOwner;
  interestedButtonShow: boolean;
  endDate;

  constructor(private router: Router,
              private userService: UserService,
              private tokenService : TokenService,
              private ticketService : TicketService,
              public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.getUserPicture(); 
      this.setInterestedButtonShow();
      this.setIsOwner();
      this.setEndDate();
    }, 500);
  }

  setIsOwner(){
    var username = this.tokenService.getTokenProperty("user_name");
    this.isOwner = username == this.ticket.seller.username;
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

  refreshPage() {
    var url = this.router.url;
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
      () => { this.router.navigateByUrl(url); });
  }

  updateTicket(ticket){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      'ticketId': this.ticket.id,
      'description': this.ticket.description 
    };


    const dialogRef = this.dialog.open(UpdateTicketDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) this.refreshPage(); }
    );
  }

  deleteTicket(ticketId){
    this.ticketService.deleteTicket(ticketId).subscribe(
      data => {
        this.router.navigateByUrl("/browse");
      }
    );
  }
}
