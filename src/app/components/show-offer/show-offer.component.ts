import { Component, OnInit, Input } from '@angular/core';
import { OfferComponent } from '../offer/offer.component';
import { TicketService } from 'src/app/_services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-offer',
  templateUrl: './show-offer.component.html',
  styleUrls: ['./show-offer.component.css']
})
export class ShowOfferComponent implements OnInit {

  @Input() offer;
  ticket;
  statusText;
  isRejected;

  constructor(private ticketService : TicketService,
              private router : Router) { }

  ngOnInit() {
    this.ticketService.getTicketById(this.offer.ticketId).subscribe(
      data => {
        this.ticket = data;
      }
    );
    this.statusText = this.showStatus(this.offer.status);
    this.setIsRejected();
  }

  navigateToTicket(ticketId){
    this.router.navigateByUrl('/tickets/' + ticketId);
  }

  showStatus(status) {
    if (status == "PENDING") {
      return "VÁRAKOZIK";
    } else {
      return "ELUTASÍTVA";
    }
  }

  setIsRejected() {
    if (this.offer.status == "PENDING") {
      this.isRejected = false;
    } else {
      this.isRejected = true;
    }
  }

}
