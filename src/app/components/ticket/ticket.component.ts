import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigateToTicket(ticketId){
    this.router.navigateByUrl('/tickets/' + ticketId);
  }

}
