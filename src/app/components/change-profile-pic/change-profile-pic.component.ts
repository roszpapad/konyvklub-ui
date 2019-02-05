import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/_services/user.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private userService : UserService,
              private tokenService : TokenService) { }

  ngOnInit() {
  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  changeProfilePicture(){
    let imageDTO = {
      'file': this.croppedImage
    };
    this.userService.changePicture(imageDTO).subscribe(
      data => {
        this.userService.getUserId.emit(this.tokenService.getTokenProperty("id"));
      }
    );
  }

  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
