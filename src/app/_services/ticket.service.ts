import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private resourceService : ResourceService,
              private tokenService : TokenService) { }

  filterTickets(title, writer, city, owned){
    let id = this.tokenService.getTokenProperty("id");
    return this.resourceService.getResourceFromApiWithParams('/tickets/filter',{title, writer, city, owned, id});
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
