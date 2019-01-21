import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { ignoreElements } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  books;

  displayedColumns: string[];

  constructor(private bookService: BookService, public dialog: MatDialog, breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['title','delete'] :
        ['title', 'writer', 'publisher', 'yearOfPublishing', 'offerable','delete'];
    });
  }

  ngOnInit() {

    this.bookService.getAllCurrentUserBooks().subscribe(
      data => { this.books = data; }
    );
  }

  openCreateBookDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {

    };


    const dialogRef = this.dialog.open(NewBookDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) { } },
      error => { },
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteBook(bookId) {
    this.bookService.deleteBook(bookId).subscribe();
    this.ngOnInit();
  }

  isOfferable(offerable) {
    if (offerable == true) {
      return 'igen';
    }
    else {
      return 'nem';
    }
  }

}
