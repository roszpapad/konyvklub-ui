import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import "rxjs-compat/add/operator/catch";
import {HttpEvent, HttpRequest} from "../../../node_modules/@angular/common/http";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  putResourceToApi(url, data) {
    return this.http.put(API_URL + url, data);
  }

  deleteResourceFromApi(url) {
    return this.http.delete(API_URL + url);
  }

  constructor(private http: HttpClient) { }

  // getResourceFromApiBlob(resourceUrl:string){
  //   const options = {responseType: 'arrayBuffer' as 'arrayBuffer'};
  //   return this.http.get(API_URL + resourceUrl, {responseType: ResponseContentType.ArrayBuffer});
  // }



  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  getResourceFromApi(resourceUrl: string) {
    // var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    // var options = new RequestOptions({ headers: headers });
    return this.http.get(API_URL + resourceUrl);
    // .pipe(
    //   map((res: Response)=> res.json()),
    //   catchError(err => of(err))
    // );

  }
  getResourceFromApiWithParams(resourceUrl, data) {
    return this.http.get(API_URL + resourceUrl, { params: data });

  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    console.log("meghivodott resource");
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8083/pictures', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  postData(url, data) {
    return this.http.post(API_URL + url, data);
  }

}
