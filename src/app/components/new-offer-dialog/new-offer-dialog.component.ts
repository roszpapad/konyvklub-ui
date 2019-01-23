import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-new-offer-dialog',
  templateUrl: './new-offer-dialog.component.html',
  styleUrls: ['./new-offer-dialog.component.css']
})
export class NewOfferDialogComponent implements OnInit {

  form : FormGroup;

  books;

  constructor(private dialogRef: MatDialogRef<NewOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private formBuilder: FormBuilder,
    private bookService : BookService) { }

  ngOnInit() {
    console.log("----------------");
    console.log(this.data.ticketId);
    console.log("----------------");
    this.bookService.getAllOfferableBooks().subscribe(
      data => {this.books = data;}
    );

    console.log(this.books);

    this.form = this.formBuilder.group({
      bookId : ['',Validators.required],
      description : ['',Validators.required]
    });
  }

  submit(){

  }

  get bookId(){return this.form.get("bookId");}
  get description(){return this.form.get("description");}

}
