import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  image;

  userId;

  constructor(private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private userService: UserService) {
    this.authenticationService.getUserId.subscribe(id => {
      this.userId = id;
      this.getUserPicture();
    });
    this.userService.getUserId.subscribe(id => {
      this.getUserPicture();
    });
  }

  ngOnInit() {
    this.userId = this.tokenService.getTokenProperty("id");
    this.getUserPicture();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  getUserName() {
    return this.tokenService.getTokenProperty("user_name");
  }

  getUserPicture() {
    this.userService.getProfilePictureWithId(this.userId).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.image = data;
        }
      });
  }

}
