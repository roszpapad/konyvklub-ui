import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';
import { OfferService } from 'src/app/_services/offer.service';

@Component({
  selector: 'app-update-offer-dialog',
  templateUrl: './update-offer-dialog.component.html',
  styleUrls: ['./update-offer-dialog.component.css']
})
export class UpdateOfferDialogComponent implements OnInit {

  books = new Array();
  form;

  constructor(private dialogRef: MatDialogRef<UpdateOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private formBuilder: FormBuilder,
    private bookService : BookService,
    private offerService : OfferService) { }

  ngOnInit() {
    this.bookService.getAllOfferableBooks().subscribe(
      data => {
        this.books = data as [];
        this.books.push(this.data.offer.bookToPay);
      }
    );

    this.form = this.formBuilder.group({
      bookId : [this.data.offer.bookToPay.id,Validators.required],
      description : [this.data.offer.description,Validators.required]
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  submit(){

    if (this.form.valid){
      
      let offerdata = {
        "id": this.data.offer.id,
        "bookId": this.form.get("bookId").value,
        "description": this.form.get("description").value
      };
      
      this.offerService.updateOffer(offerdata).subscribe(
        data => {
          this.dialogRef.close(true);
        }
      );
      
    }
  }

  get bookId(){return this.form.get("bookId");}
  get description(){return this.form.get("description");}

}
