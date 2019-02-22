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

  statusParam;
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

    this.statusParam = this.route.snapshot.queryParams['status'] || '';
    this.confirmationSuccess = this.route.snapshot.queryParams['success'] || '';

    this.showSuccessMessage = this.route.snapshot.queryParams['showSuccessMessage'] || '';

    if (this.showSuccessMessage != '') {
       this.openSnackbar();
    }

    if (this.statusParam != '') {
      this.snackBar.open("Jelszava megváltozott. Kérjük jelentkezzen be új jelszavával!","Bezár", {
        duration : 6000
      });
    } 

  }

  openSnackbar() {
    this.snackBar.open('Regisztrációs emailt küldtünk az Ön email címére, kérjük aktiválja fiókját!','Bezár', {
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


