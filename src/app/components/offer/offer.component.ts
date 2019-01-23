import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer;

  @Input() isOwner: boolean;

  @Output() rejectedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output() acceptedEvent : EventEmitter<any> = new EventEmitter<any>();

  isRejected;

  constructor(private offerService: OfferService) { }

  ngOnInit() {

    this.setIsRejected();
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

}
