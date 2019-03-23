import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styleUrls: ['./not-found-error.component.css']
})
export class NotFoundErrorComponent implements OnInit {

  message;

  constructor(private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = this.route.snapshot.queryParams['message'] || '';
  }

  goBack() {
    this.location.back();
  }

}
