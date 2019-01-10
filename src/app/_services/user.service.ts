import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authencticationService: AuthenticationService, private _resourceService: ResourceService) { }

  getUserInfo() {
    return this.authencticationService.getUserInfo();
  }

  registerUser(user: User) {
    return this._resourceService.postData('/register', user);
  }

  getAllUsers() {
    return this._resourceService.getResourceFromApi('/users');
  }

  deleteUser(userId) {
    return this._resourceService.deleteResourceFromApi('/users/' + userId);
  }

  changePassword(id, oldPass, newPass) {
    return this._resourceService.postData("/users/changePassword", {
      "id": id,
      "oldPassword": oldPass,
      "newPassword": newPass
    })
  }


}
