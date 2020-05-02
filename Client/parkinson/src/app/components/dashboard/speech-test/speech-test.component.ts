import { NewPatientFormComponent } from './../new-patient-form/new-patient-form.component';
import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";
import { MatDialog } from "@angular/material/dialog";
import { PatientList } from "../patient-list/dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestResultComponent } from '../test-result/test-result.component';
import { PatientService } from '../../../shared/services/patient.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-speech-test",
  templateUrl: "./speech-test.component.html",
  styleUrls: ["./speech-test.component.scss"],
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


  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) { }
  ngOnInit() {
    this.newPatient()
    this.testForm = this.formBuilder.group({
      samples: [''],
      doctorID: [''],
      patientID: ['']

    });

  }


  // Pop up dialog to select the patient from the list
  newPatient(): void {
    const dialogRef = this.dialog.open(NewPatientFormComponent);
    dialogRef.disableClose = true;
  }

  // Pop up dialog to select the patient from the list
  showList(): void {
    const dialogRef = this.dialog.open(PatientList);

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

  }


  // Get audio samples
  getSample(samples: FileList) {
    if (samples.length !== 0) {

      this.testForm.get('samples').setValue(samples);

      // re setting the lable
      this.lable = samples.length + " Sample(s) Attached";

      // test can be proceeded
      this.canProceed = true;
      this.proceedBtnLable = 'Proceed Test';
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

      this.openSnackBar("Proceeding the test", "OK");

      const dialogRef = this.dialog.open(NewPatientFormComponent, { data: this.testForm });
      dialogRef.disableClose = true;

    }
    else {
      this.openSnackBar("Please select the audio samples", "close");
    }
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
