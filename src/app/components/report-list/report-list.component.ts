import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/_services/report.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  displayedColumns: string[];
  form: FormGroup;
  reports;

  constructor(private formBuilder: FormBuilder,
    private reportService: ReportService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.reportService.getAllReports().subscribe(
      data => {
        this.reports = data;
      }
    );
    
    this.displayedColumns = ['reporter', 'reported', 'image', 'ban'];
    this.form = this.formBuilder.group({
      reported: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {

      this.reportService.filterReportsByReported(this.form.get("reported").value).subscribe(
        data => {
          this.reports = data;
        }
      );
    }
  }

  switchStatus(reported) {
    this.reportService.deleteReportsByReported(reported).subscribe();
    this.userService.switchStatus(reported).subscribe(
      data => {
        if (this.form.valid) {
          this.submit();
        } else {
          this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(
            () => { this.router.navigateByUrl('/reports'); });
        }
      }
    );
  }


  get reported() { return this.form.get("reported"); }


}
