import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfferService } from 'src/app/_services/offer.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  image;

  @Input() offer;

  @Input() isOwner: boolean;

  @Output() rejectedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() acceptedEvent : EventEmitter<any> = new EventEmitter<any>();

  isRejected;

  constructor(private offerService: OfferService,
              private userService : UserService) { }

  ngOnInit() {

    this.setIsRejected();
    setTimeout(() => { this.getUserPicture(); }, 500);
  }

  setIsRejected() {
    if (this.offer.status == "PENDING") {
      this.isRejected = false;
    } else {
      this.isRejected = true;
    }
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

  acceptOffer(offerId){
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

}
