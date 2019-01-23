import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private resourceService : ResourceService, private tokenService : TokenService) { }

  getAllCurrentUserBooks(){
    let userId = this.tokenService.getTokenProperty("id");
    if (userId) {
        return this.resourceService.getResourceFromApi('/users/' + userId + '/books')
    }
  }

  addNewBookToUser(book){
    let userId = this.tokenService.getTokenProperty("id");
    if (userId) {
        return this.resourceService.postData('/users/' + userId + '/books',book);
    }
  }

  deleteBook(bookId){
    return this.resourceService.deleteResourceFromApi('/books/' + bookId);
  }

  getAllOfferableBooks(){
    let userId = this.tokenService.getTokenProperty("id");
    if (userId) {
        return this.resourceService.getResourceFromApi('/users/' + userId + '/offerableBooks')
    }
  }

}
