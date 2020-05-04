import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../../shared/services/auth.service';
import { DoctorService } from './../../../shared/services/doctor.service.service';
import { NewPatientFormComponent } from './../new-patient-form/new-patient-form.component';
import { Patient } from 'src/app/shared/services/Patient';
import { PatientListComponent } from '../patient-list/dialog.component';
import { TestResultComponent } from '../test-result/test-result.component';
import { HttpHeaders } from '@angular/common/http';
import { TestsServiceService } from '../../../shared/services/tests.service.service';
import { stringify } from 'querystring';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-speech-test',
  templateUrl: './speech-test.component.html',
  styleUrls: ['./speech-test.component.scss'],
})
export class SpeechTestComponent implements OnInit {

  isSelected: boolean;
  patient: Patient; // selected patient
  isValidsample: boolean;

  // sample array to upload
  audioSample: FileList = null;
  proceedBtnTitle = 'Cannot Proceed Test. Please add samples.';
  proceedBtnLable = 'attach samples to proceed test';


  // files imoported
  lable = 'Click here to import the audio';
  canProceed: boolean;
  testForm: FormGroup;
  docID: any;

  audio: FileList;


  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private doctorService: DoctorService,
    private authServices: AuthService,
    private notificationService: NotificationService
  ) { }
  ngOnInit() {

    this.docID = this.doctorService.getDoctorDetails(this.authServices.userDocor.email);

    console.log(this.docID);

  }


  // Pop up dialog to select the patient from the list
  newPatient(): void {
    const dialogRef = this.dialog.open(NewPatientFormComponent);
    dialogRef.disableClose = true;
  }

  // Pop up dialog to select the patient from the list
  showList(): void {
    const dialogRef = this.dialog.open(PatientListComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {

        // console.log(result);

        if (result !== undefined) {
          // Select the patient
          this.patient = result;
          // Hide the selector
          console.log(result);
          this.isSelected = true;

        } else {
          this.isSelected = false;
          // Snack bar
        }
      });


    this.doctorService.getDoctorDetails(
      this.authServices.userDocor.email
    ).subscribe(

      (e => {
        this.docID = e._id;
        console.log(e);
      }),

      (err => console.log(err))

    );
  }


  // Get audio samples
  getSample(samples: FileList) {

    if (samples.length !== 0) {
      if (samples.length < 6) {

        this.audio = samples;

        // re setting the lable
        this.lable = samples.length + ': Sample(s) Attached';

        // test can be proceeded
        this.canProceed = true;
        this.proceedBtnLable = 'Proceed Test';
      }
      else {
        this.notificationService.errorSnack('Please select 5 or less than 5 samples.')
      }
    }


  }

  // Clear the selection
  clear() {
    this.lable = 'Click here to import the audio';
    this.isSelected = false;
    this.canProceed = false;
  }



  proceedTest() {
    if (this.canProceed) {

      const formData = new FormData();

      formData.append('patientID', this.patient._id.toString());
      formData.append('doctorID', this.docID );



      for (let i = 0; i < this.audio.length; i++) {

        const element = this.audio[i];
        console.log(element);
        formData.append('audio', element);

      }

      var dialogRef = this.dialog.open(TestResultComponent, { data: formData });

      dialogRef.disableClose = true;

    } else {

      this.notificationService.errorSnack('Please select the audio samples');

    }
  }


}
