import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/_services/ticket.service';
import { TokenService } from 'src/app/_services/token.service';
import { OfferService } from 'src/app/_services/offer.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewOfferDialogComponent } from '../new-offer-dialog/new-offer-dialog.component';

@Component({
  selector: 'app-ticket-show',
  templateUrl: './ticket-show.component.html',
  styleUrls: ['./ticket-show.component.css']
})
export class TicketShowComponent implements OnInit {

  ticket;

  ticketId;

  isOwner: boolean;

  constructor(private route: ActivatedRoute,
    private ticketService: TicketService,
    private tokenService: TokenService,
    private router: Router,
    private offerService : OfferService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
    });

    this.ticketService.getTicketById(this.ticketId).subscribe(
      data => {
        this.ticket = data;
      }
    );

    if (this.tokenService.getTokenProperty('user_name') == this.ticket.seller.username) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

  }

  refreshList() {
    
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
      () => {this.router.navigateByUrl('/tickets/' + this.ticketId );})
  }

  afterRejected(isRejected: boolean) {
    this.refreshList();
  }

  afterAccepted(offerId){
    this.offerService.acceptOffer(this.ticketId, offerId).subscribe();
    this.router.navigateByUrl('/dummy');
  }

  openNewOfferDialog(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      'ticketId' : this.ticketId
    };


    const dialogRef = this.dialog.open(NewOfferDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) this.refreshList();}
    );
  }

}
