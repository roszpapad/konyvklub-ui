import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form : FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      oldPassword : ['',Validators.required],
      oldPasswordAgain : ['',Validators.required],
      newPassword : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });

  }

  onSubmit(){ 
    //TODO
  }

  get oldPassword(){return this.form.get("oldPassword");}
  get oldPasswordAgain(){return this.form.get("oldPasswordAgain");}
  get newPassword(){return this.form.get("newPassword");}

}
