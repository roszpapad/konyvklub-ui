import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private resourceService : ResourceService) { }

  createReport(data){
    return this.resourceService.postData("/reports/create",data);
  }

  filterReportsByReported(reported){
    return this.resourceService.getResourceFromApiWithParams("/reports/filtered",{reported});
  }
}
