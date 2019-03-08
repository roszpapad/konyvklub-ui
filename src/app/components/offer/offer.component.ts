import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfferService } from 'src/app/_services/offer.service';
import { UserService } from 'src/app/_services/user.service';
import { TokenService } from 'src/app/_services/token.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateOfferDialogComponent } from '../update-offer-dialog/update-offer-dialog.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  image;

  @Input() offer;

  @Input() isOwner: boolean;

  isOfferOwner: boolean;

  @Output() rejectedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() acceptedEvent: EventEmitter<any> = new EventEmitter<any>();

  isRejected;

  constructor(private offerService: OfferService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.setIsRejected();
    this.setIsOfferOwner();
    setTimeout(() => { this.getUserPicture(); }, 500);
  }

  setIsRejected() {
    if (this.offer.status == "PENDING") {
      this.isRejected = false;
    } else {
      this.isRejected = true;
    }
  }

  setIsOfferOwner() {
    var username = this.tokenService.getTokenProperty("user_name");
    this.isOfferOwner = username == this.offer.customer.username;
  }

  showStatus(status) {
    if (status == "PENDING") {
      return "VÁRAKOZIK";
    } else {
      return "ELUTASÍTVA";
    }
  }

  rejectOffer(offerId) {

    this.offerService.rejectOffer(offerId).subscribe();
    this.rejectedEvent.emit(true);
  }

  acceptOffer(offerId) {
    this.acceptedEvent.emit(offerId);
  }

  getUserPicture() {
    let userId = this.offer.customer.id;
    this.userService.getProfilePictureWithId(userId).subscribe(
      data => {
        if (data) {
          this.image = data;
        }
      });
  }

  refreshPage() {
    var url = this.router.url;
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
      () => { this.router.navigateByUrl(url); });
  }

  deleteOffer(offerId) {
    this.offerService.deleteOffer(offerId).subscribe(
      data => {
        this.refreshPage();
      }
    );
  }

  updateOffer(offer) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      'offer': this.offer
    };


    const dialogRef = this.dialog.open(UpdateOfferDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) this.refreshPage(); }
    );
  }

}
