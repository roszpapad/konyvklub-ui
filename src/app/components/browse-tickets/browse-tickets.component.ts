import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NewTicketDialogComponent } from '../new-ticket-dialog/new-ticket-dialog.component';

@Component({
  selector: 'app-browse-tickets',
  templateUrl: './browse-tickets.component.html',
  styleUrls: ['./browse-tickets.component.css']
})
export class BrowseTicketsComponent implements OnInit {

  ticketList;

  isFound;

  constructor(private ticketService: TicketService,
              public dialog: MatDialog,
              private router : Router) { }

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

  openNewTicketDialog(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      
    };


    const dialogRef = this.dialog.open(NewTicketDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) this.router.navigateByUrl('/tickets/' + data);}
    );
  }

}
