import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(public snackBar : MatSnackBar) { }

  ngOnInit() {
    
  }

  onPasswordChange(text){
    this.snackBar.open(text,'Bezár', {
      duration: 6000
    });
  }

  

  

}
