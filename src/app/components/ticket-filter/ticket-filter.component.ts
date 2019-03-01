import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TicketService } from 'src/app/_services/ticket.service';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {

  form: FormGroup;

  @Output() ticketList: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private ticketService: TicketService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: [''],
      writer: [''],
      city: [''],
      owned: [false]
    });
  }

  submit() {
    if (this.owned.value == false && this.title.value == "" && this.writer.value == "" && this.city.value == "") {
      this.ticketService.getAllTickets().subscribe(
        data => {
          this.ticketList.emit(data);
        }
      );
    } else {
      this.ticketService
        .filterTickets(this.form.get("title").value, this.form.get("writer").value, this.form.get("city").value, this.form.get("owned").value).subscribe(
          data => {
            this.ticketList.emit(data);
          }
        );
    }
  }

  get title() { return this.form.get("title"); }
  get writer() { return this.form.get("writer"); }
  get owned() { return this.form.get("owned"); }
  get city() { return this.form.get("city"); }

}
