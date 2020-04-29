import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  private url = "http://localhost:4000/api";

  constructor(private httpClient: HttpClient) {}

  // post request
  sendPostRequest(data: any): any {
    return this.httpClient.post<any>(
      this.url + "/patients", // url
      data // patient details
    );
  }

  public upload(formData) {
    return this.httpClient.post<any>("https://www.file.io/", formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
