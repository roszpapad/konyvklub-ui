import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  username : string;
  firstName : string;
  lastName: string;
  email : string;

  constructor(private tokenService : TokenService) { }

  ngOnInit() {

    this.username = this.tokenService.getTokenProperty("user_name");
    this.email = this.tokenService.getTokenProperty("email");
    this.lastName = this.tokenService.getTokenProperty("lastName");
    this.firstName = this.tokenService.getTokenProperty("firstName");
  }

}
