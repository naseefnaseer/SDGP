import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/services/Patient';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { PatientService } from '../../shared/services/patient.service';
import { NgForm, FormsModule } from '@angular/forms';
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

  constructor(
    public snackBar: MatSnackBar,
    public patientService: PatientService
  ) {}

  ngOnInit() {}

  // POST
  submitDetails(f: NgForm) {
    // console.log(f.value);
    console.log(this.gender);
    const patient: Patient = {
      pID: -1,
      firstName: f.value.fName,
      lastName: f.value.lName,
      dob: f.value.dob,
      gender: this.gender,
      phone: f.value.phone,
      address: f.value.address,
    };

    // console.log(patient);
    this.isLoading = true;

    this.patientService.sendPostRequest(patient).subscribe(
      (observer: HttpResponse<JSON>) => {
        this.isSuccess = true;
        this.isLoading = false;
        this.openSnackBar('Patient Added Successfully.', 'ok');
      },
      (err: HttpErrorResponse) => {
        // error notifier
        this.isSuccess = false;

        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        this.isLoading = false;

        this.openSnackBar('Patient creation Unsuccessful !', 'ok');

      }
    );
  }

  message(): Object {
    if (this.isSuccess) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  }

  form(): Object {
    if (this.isSuccess) {
      return { display: 'none' };
    } else {
      return { display: 'block' };
    }
  }

  mailerror(): Object {
    return this.isMatchMail
      ? { visibility: 'hidden' }
      : { visibility: 'visible' };
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
