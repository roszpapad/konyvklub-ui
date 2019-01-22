import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @Input() ticketList;

  constructor() { }

  ngOnInit() {
  }

}
