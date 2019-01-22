import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-browse-tickets',
  templateUrl: './browse-tickets.component.html',
  styleUrls: ['./browse-tickets.component.css']
})
export class BrowseTicketsComponent implements OnInit {

  ticketList;

  isFound;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.isFound = true;

    this.ticketService.getAllTickets().subscribe(
      data => {
          this.ticketList = data;
      }
    );

    
  }

  ticketListEvent(tickets) {
    this.ticketList = tickets;
    if (tickets == ""){
      this.isFound = false;
    } else {
      this.isFound = true;
    }
  }

}
