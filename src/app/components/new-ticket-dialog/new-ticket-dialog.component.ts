import { Component, OnInit, Inject } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { BookService } from 'src/app/_services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-ticket-dialog',
  templateUrl: './new-ticket-dialog.component.html',
  styleUrls: ['./new-ticket-dialog.component.css']
})
export class NewTicketDialogComponent implements OnInit {

  form: FormGroup;

  books;

  constructor(private ticketService: TicketService,
    private bookService: BookService,
    private dialogRef: MatDialogRef<NewTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.bookService.getAllOfferableBooks().subscribe(
      data => { this.books = data; }
    );

    this.form = this.formBuilder.group({
      bookId: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  close() {
    this.dialogRef.close(false);
  }

  submit() {

    if (this.form.valid) {

      let ticketdata = {
        "bookId": this.form.get("bookId").value,
        "description": this.form.get("description").value
      };

      this.ticketService.createTicket(ticketdata).subscribe(
        data => { this.dialogRef.close(data); }
      );
    }

  }

  get bookId(){return this.form.get("bookId");}
  get description(){return this.form.get("description");}
}
