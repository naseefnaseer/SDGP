import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {


  private url = 'http://localhost:4000/api/';

  constructor(private httpClient: HttpClient) { }

  // post request
  public sendPostRequest(data: any): any {
    return this.httpClient.post<any>(
      this.url + '/patients', // url
      data // patient details
    );
  }

  public analyseSample(formData: FormGroup): any {

    return this.httpClient.post<any>(
      this.url + '/patients', // url
      formData // patient details
    );

  }
}
