import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {


  private url = 'http://localhost:4000/api';

  constructor(private httpClient: HttpClient) { }

  // post request
  public sendPostRequest(data: any): any {
    return this.httpClient.post<any>(
      this.url + '/doctors', // url
      data
    );
  }

  public analyseSample(formData: FormGroup): any {
    return this.httpClient.post<any>(
      this.url + '/doctors/', // url
      formData // patient details
    );
  }

  public getDoctorDetails(email: string): any {

    return this.httpClient.get<any>(this.url + "/doctors/doctor/email/" + email);
  }
}
