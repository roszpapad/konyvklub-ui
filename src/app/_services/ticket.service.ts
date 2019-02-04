import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private resourceService : ResourceService) { }

  filterTickets(title, writer, city){
    return this.resourceService.getResourceFromApiWithParams('/tickets/filter',{title, writer, city});
  }

  getAllTickets(){
    return this.resourceService.getResourceFromApi('/tickets/all');
  }

  getTicketById(id){
    return this.resourceService.getResourceFromApi('/tickets/' + id);
  }

  createTicket(ticketdata){
    return this.resourceService.postData('/tickets/new',ticketdata);
  }
}
