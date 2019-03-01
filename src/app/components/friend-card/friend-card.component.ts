import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  @Input() username;
  @Input() channel;
  chatPartner;
  image;

  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.chatPartner = this.getChatPartner();
    this.getChatPartnerPicture();
  }

  getChatPartner() {
    if (this.channel.usernameOne == this.username) {
      return this.channel.usernameTwo;
    } else {
      return this.channel.usernameOne;
    }
  }

  getChatPartnerPicture(){
    this.userService.getProfilePictureWithUsername(this.chatPartner).subscribe(
      data => {
        this.image = data;
      }
    );
  }

  navigateToChat(){
    this.router.navigateByUrl("/privateChat/" + this.channel.id);
  }

}
