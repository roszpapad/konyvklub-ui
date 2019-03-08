import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private resourceService : ResourceService) { }

  rejectOffer(offerId){
    return this.resourceService.getResourceFromApi('/offers/' + offerId);
  }

  acceptOffer(ticketId, offerId){
    return this.resourceService.getResourceFromApi('/tickets/' + ticketId + '/offers/' + offerId);
  }

  createOffer(ticketId, offerdata){
    return this.resourceService.postData('/tickets/' + ticketId + '/offer', offerdata);
  }

  updateOffer(data){
    return this.resourceService.putResourceToApi('/offers/update', data);
  }

  deleteOffer(offerId){
    return this.resourceService.deleteResourceFromApi('/offers/' + offerId + '/delete');
  }
}
