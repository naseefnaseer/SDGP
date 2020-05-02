import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../shared/services/Patient';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { PatientService } from '../../../shared/services/patient.service';
import { NgForm, FormsModule, FormGroup } from '@angular/forms';
import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {

  gender = 'Not Specified';
  isMatchMail = true;
  isLoading = false;
  isSuccess = false;

  response: any;

  f: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
    public patientService: PatientService
  ) { }

  ngOnInit() {

  }

  // POST
  submitDetails(f: NgForm) {

    if (
      f.value.fName === '' ||
      f.value.lName === '' ||
      f.value.dob === '' ||
      this.gender === 'Not Specified' ||
      f.value.phone === '' ||
      f.value.phone.length < 9 ||
      f.value.address === ''
    ) {
      this.openSnackBar('Inalid Details', 'ok')
    }
    else {

      // console.log(f.value);
      const patient: Patient = {
        _id: -1,
        firstName: f.value.fName,
        lastName: f.value.lName,
        dob: f.value.dob,
        email: f.value.email.includes('@')
          &&
          f.value.email.includes('.') ? f.value.email : '-'
        ,
        age: '-',
        gender: this.gender,
        phone: f.value.phone,
        address: f.value.address,
      };

      // console.log(patient);
      this.isLoading = true;

      this.patientService.sendPostRequest(patient).subscribe(
        (observer: HttpResponse<JSON>) => {
          console.log(observer);

          this.response = observer;

          this.isSuccess = true;
          this.isLoading = false;
          this.openSnackBar('Patient Added Successfully.', 'ok');
        },
        (err: HttpResponse<JSON>) => {
          // error notifier
          this.isSuccess = false;

          console.log(err.status);
          console.log(err.statusText);
          console.log(err.headers);
          this.isLoading = false;


          this.openSnackBar('Patient creation Unsuccessful !', 'ok');

        }
      );
    }
  }

  set selectGen(val: string) {
    this.gender = val;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
    });
  }


}
