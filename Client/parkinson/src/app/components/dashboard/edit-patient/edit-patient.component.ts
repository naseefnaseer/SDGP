import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewPatientFormComponent } from '../new-patient-form/new-patient-form.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient, EditPatient } from 'src/app/shared/services/Patient';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  gender = 'Not Specified';
  isMatchMail = true;
  isLoading = false;
  isSuccess = false;

  response: any;

  f: NgForm;
  isClosed: any;
  details: Patient;


  constructor(
    public dialogRef: MatDialogRef<EditPatientComponent>,
    public notify: NotificationService,
    public patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {
    this.details = data;
  }

  ngOnInit() {
    this.details = this.data;
    this.gender = this.data.gender;
  }


  // POST
  submitDetails(f: NgForm) {

    console.log(f.value);

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
      const patient: EditPatient = {
        id: this.details._id,
        data: {
          firstName: f.value.fName,
          lastName: f.value.lName,
          dob: f.value.dob,
          email: f.value.email.includes('@')
            &&
            f.value.email.includes('.') ? f.value.email : '-'
          ,
          gender: this.gender,
          phone: f.value.phone,
          address: f.value.address,
        }
      };

      console.log(patient);

      // console.log(patient);
      this.isLoading = true;

      this.patientService.sendEditChanges(patient).subscribe(
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
    if (this.isSuccess) {
      this.dialogRef.close(true);
    } else {
      this.close()
    }
  }

  select(p: Patient) {
    this.dialogRef.close(p);
  }

}
