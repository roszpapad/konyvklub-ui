import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {

  form : FormGroup;

  @Output() ticketList = [];

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title : [],
      writer : []
    });

  }

  submit(){

  }

  get title() {return this.form.get("title");}
  get writer(){return this.form.get("writer");}

}
