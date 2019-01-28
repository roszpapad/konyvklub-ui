import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  file;
  image;
  mySrc;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.file = null;
    this.userService.getProfilePicture().subscribe(
      data => { if (data) this.mySrc = data; else this.mySrc = ''; }
    );
    
  }

  fileChange(event) {

    this.readImage(event.target);
  }

  readImage(input) {
    this.file = input.files[0];

    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }

    myReader.readAsDataURL(this.file);
  }

  isFileChosen() {
    return this.file != null;
  }

  submit() {
    if (this.file != null) {

      /*let formData:FormData = new FormData();
        formData.append('file', this.file, this.file.name);*/

      let imageDTO = {
        'file': this.image
      };
      this.userService.changePicture(imageDTO).subscribe();
    }
  }

}
