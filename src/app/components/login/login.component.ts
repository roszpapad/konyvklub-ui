import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/_services/logout.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  confirmationSuccess;

  showSuccessMessage;

  form: FormGroup;

  myErrors = new Array();

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private logoutService: LogoutService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.logoutService.logout();

    this.confirmationSuccess = this.route.snapshot.queryParams['success'] || '';

    this.showSuccessMessage = this.route.snapshot.queryParams['showSuccessMessage'] || '';

    if (this.showSuccessMessage != '') {
       this.openSnackbar();
    }

  }

  openSnackbar() {
    this.snackBar.open('Regisztracios emailt kuldtunk az On email cimere, kerem aktivalja fiokjat!','Bezar', {
      duration: 20000
    });
  }

  onSubmit() {

    if (this.form.valid) {

      this.loginService.login(this.form.get("username").value, this.form.get("password").value).pipe(first())
        .subscribe(
          data => {
            this.loginService.loggedIn = true;
            this.router.navigate(["/"]);
          },
          error => {
            this.myErrors = Array.of(error.error);
          });
    }
  }

  get username() { return this.form.get("username"); }
  get password() { return this.form.get("password"); }
}


