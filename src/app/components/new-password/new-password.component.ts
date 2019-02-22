import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  token;
  statusParam;

  constructor(private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.token = this.route.snapshot.queryParams['token'] || '';

    this.form = new FormGroup({
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])),
    });
  }

  actAfterStatusParam() {
    if (this.statusParam == 'notFound') {
      this.snackBar.open("Érvénytelen token. Kérjük ellenőrizze, hogy be van-e jelentkezve, illete, hogy érvényes linkre kattintott-e.", "Bezár", {
        duration: 6000
      });
    }
    if (this.statusParam == 'expired') {
      this.snackBar.open("Lejárt a token. Kérjük ismételje meg az új jelszó kérését a 'Profilom' oldalon", "Bezár", {
        duration: 6000
      });
    }
    if (this.statusParam == 'success'){
      this.router.navigate(['/login'], { queryParams: { status: this.statusParam } });
    }
  }

  submit() {
    if (this.form.valid) {
      let data = {
        "token": this.token,
        "password": this.form.get("password").value
      };

      this.userService.changePassword(data).subscribe(
        data => {
          this.statusParam = data;
          this.actAfterStatusParam();
        }
      );
    }
  }

  get password() { return this.form.get("password"); }

}
