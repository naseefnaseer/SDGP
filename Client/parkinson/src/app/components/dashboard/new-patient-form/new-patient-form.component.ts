import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../../shared/services/Patient';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PatientService } from '../../../shared/services/patient.service';
import { NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss'],
})
export class NewPatientFormComponent implements OnInit {

  gender = 'Not Specified';
  isMatchMail = true;
  isLoading = false;
  isSuccess = true;

  response: any;

  f: FormGroup;
  isClosed: any;

  constructor(
    public dialogRef: MatDialogRef<NewPatientFormComponent>,
    public snackBar: MatSnackBar,
    public patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) { }

  ngOnInit() {
    this.patientService.analyseSample(this.data).subscribe(
      (observer: HttpResponse<JSON>) => {
        console.log(observer);

        this.openSnackBar('Test carried out successful', 'ok');
      },
      (err: HttpErrorResponse) => {
        // error notifier

        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);

        this.openSnackBar('Test Unsuccessful !', 'ok');

      }
    );
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
      if (!this.isClosed) {
        this.openSnackBar('Inalid Details', 'ok')
      }
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

  close(): void {
    this.isClosed = true;
    this.dialogRef.close();
  }

  select(p: Patient) {
    this.dialogRef.close(p);
  }

  /**
    * @param msg the message of the nasck bar
    * @param btn button
    */
  openSnackBar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 2000
    });
  }

}
