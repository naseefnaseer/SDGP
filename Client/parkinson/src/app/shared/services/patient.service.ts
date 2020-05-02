import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class PatientService {


  url = 'http://localhost:4000/api/patients';

  constructor(private httpClient: HttpClient) { }

  // post request
  public sendPostRequest(data: any): any {
    return this.httpClient.post<any>(
      this.url + '/', // url
      data // patient details
    );
  }

  // post request
  public sendEditChanges(data: any): any {
    return this.httpClient.put<any>(
      this.url + '/update/id', // url
      data // patient details
    );
  }


  public analyseSample(formData: FormGroup): any {

    return this.httpClient.post<any>(
      this.url, // url
      formData // patient details
    );
  }

  public getList() {
    return this.httpClient.get<any>(
      this.url + '/list' // url
    );
  }


  public delete(id: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id
      },
    };
    console.log(options);

    return this.httpClient.delete(this.url + '/delete', options);

  }


}
