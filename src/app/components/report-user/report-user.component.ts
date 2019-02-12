import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_services/report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {

  form : FormGroup;

  constructor(private reportService : ReportService,
              private formBuilder : FormBuilder,
              private tokenService : TokenService) { }

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

      this.reportService.createReport(report).subscribe();
    }
  }

  onChange(event){
    let file = event.target.files[0];

    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.form.get("image").setValue(myReader.result);
    }

    myReader.readAsDataURL(file);
  }

  get reported(){return this.form.get("reported");}
  get image(){return this.form.get("image");}

}
