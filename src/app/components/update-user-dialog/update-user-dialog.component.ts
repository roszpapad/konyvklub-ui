import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  form;
  myErrors = new Array();

  constructor(private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      lastName: [this.data.lastName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      firstName: [this.data.firstName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      city: [this.data.address.city, Validators.required],
      street: [this.data.address.street],
      number: [this.data.address.number]
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  submit() {

    if (this.form.valid) {

      let addressdata = {
        "city" : this.form.get("city").value,
        "street" : this.form.get("street").value,
        "number" : this.form.get("number").value
      };

      let userdata = {
        "id": this.data.id,
        "firstName": this.form.get("firstName").value,
        "lastName": this.form.get("lastName").value,
        "address" : addressdata
      };

      this.userService.updateUser(userdata).subscribe(
        data => {
          this.myErrors = [];
          this.dialogRef.close(true);
        },
        error => {
          this.myErrors = error.error.errors;
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

  get lastName() { return this.form.get("lastName") };
  get firstName() { return this.form.get("firstName") };
  get street() { return this.form.get("street") };
  get city() { return this.form.get("city") };
  get number() { return this.form.get("number") };
}
