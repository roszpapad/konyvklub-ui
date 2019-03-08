import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';
import { ResourceService } from './resource.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() getUserId: EventEmitter<any> = new EventEmitter();

  constructor(private authencticationService: AuthenticationService, private _resourceService: ResourceService,
              private tokenService : TokenService) { }

  getUserInfo() {
    return this.authencticationService.getUserInfo();
  }

  registerUser(user: User) {
    return this._resourceService.postData('/register', user);
  }

  getAllUsersFiltered(username) {
    return this._resourceService.getResourceFromApiWithParams('/users/filtered',{username});
  }

  deleteUser(userId) {
    return this._resourceService.deleteResourceFromApi('/users/' + userId);
  }

  changePassword(data) {
    return this._resourceService.postDataAndGetText("/users/changePassword", data);
  }

  sendChangePasswordEmail(data){
    return this._resourceService.postDataAndGetText('/users/sendChangePasswordEmail',data);
  }

  changePicture(data){
    let userId = this.tokenService.getTokenProperty("id");
    return this._resourceService.postDataAndGetText("/users/" + userId + "/changePicture", data);
  }

  getProfilePicture(){
    let userId = this.tokenService.getTokenProperty("id");
    return this._resourceService.getResourceFromApiAsText('/users/' + userId + '/picture');
  }

  getProfilePictureWithId(userId){
    return this._resourceService.getResourceFromApiAsText('/users/' + userId + '/picture');
  }

  getProfilePictureWithUsername(username){
    return this._resourceService.getResourceFromApiAsText('/users/' + username + '/pictureByUsername');
  }

  switchStatus(username){
    return this._resourceService.getResourceFromApiAsText('/user/' + username + '/switchActive');
  }

  getUserOffers(){
    let userId = this.tokenService.getTokenProperty("id");
    return this._resourceService.getResourceFromApi('/users/' + userId + '/offers');
  }

  getUserTickets(){
    let userId = this.tokenService.getTokenProperty("id");
    return this._resourceService.getResourceFromApi('/users/' + userId + '/tickets');
  }

  getUserAddress(){
    let userId = this.tokenService.getTokenProperty("id");
    return this._resourceService.getResourceFromApi('/users/' + userId + '/address');
  }

  updateUser(data){
    return this._resourceService.putResourceToApi('/users/update',data);
  }

  getUserById(id){
    return this._resourceService.getResourceFromApi('/users/' + id);
  }

}
