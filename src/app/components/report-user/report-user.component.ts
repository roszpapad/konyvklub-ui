import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_services/report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_services/token.service';
import { MatSnackBar } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {

  form : FormGroup;
  file : File;
  myErrors = [];

  constructor(private reportService : ReportService,
              private formBuilder : FormBuilder,
              private tokenService : TokenService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      reported : ['',Validators.required],
      image : ['', Validators.required]
    });
  }

  submit(){
    if(this.form.valid){
      let username = this.tokenService.getTokenProperty("user_name");
      let report = {
        "reporter" : username,
        "reported" : this.form.get("reported").value,
        "image" : this.form.get("image").value 
      };

      this.reportService.createReport(report).subscribe(
        data => {
          this.clearFields();
          this.openSnackBar();
        },
        error => {
          this.myErrors = error.error.errors;
          $("#submit-btn").prop( "disabled", false );
        }
      );
    }
  }

  openSnackBar(){
    this.snackBar.open('Jelentését elküldtük!','Bezár', {
      duration: 5000
    })
  }

  errorArrayContainsValue(propertyValue) {
    return this.myErrors.some(e => e.field == propertyValue);
  }

  getErrorMessage(type) {
    return this.myErrors.find(error => error['field'] == type).defaultMessage;
  }

  clearFields(){
    this.form.get("reported").setValue('');
    this.file = null;
    this.form.get("image").setValue('');
    this.myErrors = [];
  }

  onChange(event){
    this.file = event.target.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.form.get("image").setValue(myReader.result);
    }

    myReader.readAsDataURL(this.file);
  }

  get reported(){return this.form.get("reported");}
  get image(){return this.form.get("image");}

}
