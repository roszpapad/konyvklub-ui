import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TokenService } from 'src/app/_services/token.service';
import { PasswordValidator } from 'src/app/validators/password-validator';
import { UserService } from 'src/app/_services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  myErrors = [];
  form: FormGroup;
  @Output() passwordChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private tokenService: TokenService,
    private userService: UserService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'password': new FormControl('', Validators.required),
      'passwordAgain': new FormControl('', Validators.required)
    }, PasswordValidator.MatchPassword);

  }

  getErrorMessage() {
    return this.myErrors[0].defaultMessage;
  }

  onSubmit() {
    if (this.form.valid) {
      $("#submit-btn").prop( "disabled", true );
      let data = {
        "username" : this.tokenService.getTokenProperty("user_name"),
        "password" : this.form.get("password").value
      };

      this.userService.sendChangePasswordEmail(data).subscribe(
        data => {
          this.myErrors = [];
          this.passwordChangeEvent.emit(data);
          $("#submit-btn").prop( "disabled", false );
        },
        error => {
          this.myErrors = JSON.parse(error.error).errors;
          $("#submit-btn").prop( "disabled", false );
        }
        
      );
    }
  }

  get password() { return this.form.get("password"); }
  get passwordAgain() { return this.form.get("passwordAgain"); }

}
