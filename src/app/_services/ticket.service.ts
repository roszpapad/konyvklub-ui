import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private resourceService : ResourceService) { }

  filterTickets(title, writer){
    return this.resourceService.getResourceFromApiWithParams('/tickets/filter',{title, writer});
  }

  getAllTickets(){
    return this.resourceService.getResourceFromApi('/tickets/all');
  }
}
