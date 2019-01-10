import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'username': new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])),
    'passwordAgain': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])),
    'email': new FormControl('', Validators.compose([Validators.email, Validators.required])),
    'firstName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
    'lastName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)]))
  }, this.passwordMatchValidator);;

  myErrors = new Array();

  constructor(public router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  submit() {

    if (this.form.valid) {

      this.userService.registerUser({
        'username': this.form.get("username").value,
        'email': this.form.get("email").value,
        'firstName': this.form.get("firstName").value,
        'lastName': this.form.get("lastName").value,
        'password': this.form.get("password").value
      }).subscribe(
        result => { },

        error => { this.myErrors = error.error.errors },

        () => {
          setTimeout(() => {
            this.router.navigate([''])
          }, 3000);
        }

      );

    }
  }

  private passwordMatchValidator(f: FormGroup) {
    return f.get('password').value === f.get('passwordAgain').value
      ? null : { 'mismatch': true };
  }

  get username() {return this.form.get("username")};
  get lastName() {return this.form.get("lastName")};
  get firstName() {return this.form.get("firstName")};
  get password() {return this.form.get("password")};
  get passwordAgain() {return this.form.get("passwordAgain")};
  get email() {return this.form.get("email")};

}
