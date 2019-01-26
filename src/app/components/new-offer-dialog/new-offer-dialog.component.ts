import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';
import { OfferService } from 'src/app/_services/offer.service';

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
    private bookService : BookService,
    private offerService : OfferService) { }

  ngOnInit() {
    this.bookService.getAllOfferableBooks().subscribe(
      data => {this.books = data;}
    );

    this.form = this.formBuilder.group({
      bookId : ['',Validators.required],
      description : ['',Validators.required]
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  submit(){

    if (this.form.valid){
      
      let offerdata = {
        "ticketId": this.data.ticketId,
        "bookId": this.form.get("bookId").value,
        "description": this.form.get("description").value
      };
      
      this.offerService.createOffer(this.data.ticketId, offerdata).subscribe();
      this.dialogRef.close(true);
    }
  }

  get bookId(){return this.form.get("bookId");}
  get description(){return this.form.get("description");}

}
