import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})

export class TestsServiceService {


  url = 'http://localhost:4000/api/tests';

  constructor(private httpClient: HttpClient) { }

  public proceedTest(data: any): any {

    return this.httpClient.post<any>(this.url, data);

  }

}
