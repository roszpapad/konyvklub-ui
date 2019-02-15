import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ban-users',
  templateUrl: './ban-users.component.html',
  styleUrls: ['./ban-users.component.css']
})
export class BanUsersComponent implements OnInit {

  form: FormGroup;
  users;
  displayedColumns: string[];

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    
    this.displayedColumns = ['username', 'isActive', 'ban', 'unban'];
    this.form = this.formBuilder.group({
      username: ['', Validators.required]
    });

  }

  submit() {
    if (this.form.valid) {
      this.userService.getAllUsersFiltered(this.form.get("username").value).subscribe(
        data => {
          this.users = data;
        }
      );
    }
  }

  showIsActive(isActive){
    return isActive ? "Aktív" : "Letiltott";
  }

  switchStatus(username) {
    this.userService.switchStatus(username).subscribe(
      data => {
        if (this.form.valid) {
          this.submit();
        } else {
          this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
            () => { this.router.navigateByUrl('/banUsers'); });
        }
      }
    );
  }

  get username() { return this.form.get("username"); }
}
