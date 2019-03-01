import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { ChatService } from 'src/app/_services/chat.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  username: String;
  chatChannels;

  constructor(private tokenService: TokenService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.username = this.tokenService.getTokenProperty("user_name");
    this.chatService.getUserFriendlyChannels(this.username).subscribe(
      data => {
        this.chatChannels = data;
      }
    );

  }

}
