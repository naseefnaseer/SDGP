import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../../shared/services/Patient';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../../shared/services/patient.service';
import { NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss'],
})
export class NewPatientFormComponent implements OnInit {

  gender = 'Not Specified';
  isMatchMail = true;
  isLoading = false;
  isSuccess = false;

  response: any;

  f: FormGroup;
  isClosed: any;

  constructor(
    public dialogRef: MatDialogRef<NewPatientFormComponent>,
    public notify: NotificationService,
    public patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
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
      if (!this.isClosed) {
        this.notify.errorSnack('Inalid Details');
      }
    } else {

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
          this.notify.successSnack('Patient Added Successfully.');
        },
        (err: HttpResponse<JSON>) => {
          // error notifier
          this.isSuccess = false;

          console.log(err.status);
          console.log(err.statusText);
          console.log(err.headers);
          this.isLoading = false;


          this.notify.errorSnack('Patient creation Unsuccessful !');

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

}
