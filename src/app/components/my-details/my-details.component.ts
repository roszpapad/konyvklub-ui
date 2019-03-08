import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  user;
  id;
  

  constructor(private tokenService: TokenService,
    private userService: UserService,
    public dialog: MatDialog,
    private router : Router) { }

  ngOnInit() {
    this.id = this.tokenService.getTokenProperty("id"); 
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
      }
    );
  }

  openUpdateDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      'firstName': this.user.firstName,
      'lastName' : this.user.lastName,
      'address' : this.user.address,
      'id' : this.id
    };


    const dialogRef = this.dialog.open(UpdateUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { if (data) this.refreshPage(); }
    );
  }

  refreshPage() {
    var url = this.router.url;
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
      () => { this.router.navigateByUrl(url); });
  }
}
