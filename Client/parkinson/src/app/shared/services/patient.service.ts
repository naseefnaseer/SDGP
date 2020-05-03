import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PatientService {


  private url = 'http://localhost:4000/api';

  constructor(private httpClient: HttpClient) { }

  // post request
  public sendPostRequest(data: any): any {
    return this.httpClient.post<any>(
      this.url + '/patients', // url
      data // patient details
    );
  }

  public upload(formData: FormGroup) {
    return this.httpClient.post<any>('https://www.file.io/', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public analyseSample(formData: FormGroup): any {

    return this.httpClient.post<any>(
      this.url + '/patients', // url
      formData // patient details
    );

  }

  public getList() {
    return this.httpClient.get<any>(
      this.url + '/patients/list' // url
      );
  }


}
