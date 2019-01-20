import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  books;

  constructor(private bookService : BookService, public dialog: MatDialog) { }

  ngOnInit() {

    this.bookService.getAllCurrentUserBooks().subscribe(
      data => {this.books = data;}
    );
  }

  openCreateBookDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {

    };


    const dialogRef = this.dialog.open(NewBookDialogComponent, dialogConfig);
  }

}
