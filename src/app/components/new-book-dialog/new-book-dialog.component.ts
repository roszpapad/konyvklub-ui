import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<NewBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, private formBuilder: FormBuilder,
    private bookService: BookService) { }

  ngOnInit() {
    let year = new Date().getFullYear();

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      writer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      publisher: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      yearOfPublishing: ['', [Validators.required, Validators.max(year), Validators.min(0)]]
    });

  }

  close() {
    this.dialogRef.close(false);
  }

  submit() {

    if (this.form.valid) {

      let book = {
        "title": this.form.get("title").value,
        "writer": this.form.get("writer").value,
        "publisher": this.form.get("publisher").value,
        "yearOfPublishing": this.form.get("yearOfPublishing").value
      };

      this.bookService.addNewBookToUser(book).subscribe();
      this.dialogRef.close(true);
    }
  }

  get title() { return this.form.get("title"); }
  get writer() { return this.form.get("writer"); }
  get publisher() { return this.form.get("publisher"); }
  get yearOfPublishing() { return this.form.get("yearOfPublishing"); }

}
