import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: String;
  chatChannels;

  constructor(private tokenService: TokenService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.username = this.tokenService.getTokenProperty("user_name");
    this.chatService.getUserChannels(this.username).subscribe(
      data => {
        this.chatChannels = data;
      }
    );

  }

  getChatPartner(channel) {
    if (channel.usernameOne == this.username) {
      return channel.usernameTwo;
    } else {
      return channel.usernameOne;
    }
  }

}
