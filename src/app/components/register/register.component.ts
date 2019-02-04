import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/validators/password-validator';
import * as $ from 'jquery';

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
    'lastName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
    'city': new FormControl('', Validators.required),
    'street': new FormControl(''),
    'number': new FormControl('')
  }, PasswordValidator.MatchPassword);

  myErrors = new Array();

  constructor(public router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  submit() {

    if (this.form.valid) {
      $("#submit-btn").prop("disabled", true);
      this.userService.registerUser({
        'username': this.form.get("username").value,
        'email': this.form.get("email").value,
        'firstName': this.form.get("firstName").value,
        'lastName': this.form.get("lastName").value,
        'password': this.form.get("password").value,
        'passConfirm': this.form.get("passwordAgain").value,
        'address': {
          'city': this.form.get("city").value,
          'number': this.form.get("number").value,
          'street': this.form.get("street").value
        }
      }).subscribe(
        result => { this.router.navigate(['/login'], { queryParams: { showSuccessMessage: 'true' } }); },

        error => {
        this.myErrors = error.error.errors;
        $("#submit-btn").prop( "disabled", false );
        }
      );

    }
  }

  errorArrayContainsValue(propertyValue) {
    return this.myErrors.some(e => e.field == propertyValue);
  }

  getErrorMessage(type) {
    return this.myErrors.find(error => error['field'] == type).defaultMessage;
  }

  get username() { return this.form.get("username") };
  get lastName() { return this.form.get("lastName") };
  get firstName() { return this.form.get("firstName") };
  get password() { return this.form.get("password") };
  get passwordAgain() { return this.form.get("passwordAgain") };
  get email() { return this.form.get("email") };
  get street() { return this.form.get("street") };
  get city() { return this.form.get("city") };
  get number() { return this.form.get("number") };

}
