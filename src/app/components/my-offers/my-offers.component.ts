import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  offers;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getUserOffers().subscribe(
      data => {
        var offersReverse : [] = data as [];
        this.offers = offersReverse.reverse();
      }
    );
  }

}
