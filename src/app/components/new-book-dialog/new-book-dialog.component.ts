import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<NewBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

}
