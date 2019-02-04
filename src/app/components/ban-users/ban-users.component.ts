import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ban-users',
  templateUrl: './ban-users.component.html',
  styleUrls: ['./ban-users.component.css']
})
export class BanUsersComponent implements OnInit {

  form : FormGroup;
  users;
  displayedColumns: string[];

  constructor(private userService : UserService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.userService.getAllUsersFiltered("roszpapa").subscribe(
      data => {
        this.users = data;
      }
    );
    this.displayedColumns = ['username','isActive','ban','unban'];
    this.form = this.formBuilder.group({
      username : ['', Validators.required]
    });

  }

  submit(){
    if (this.form.valid){
      this.userService.getAllUsersFiltered(this.form.get("username").value).subscribe(
        data => {
          this.users = data;
        }
      );
    }
  }


  get username(){return this.form.get("username");}
}
