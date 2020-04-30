import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";
import { MatDialog } from "@angular/material/dialog";
import { PatientList } from "../patientList/dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }
  ngOnInit() { }


  // Pop up dialog to select the patient from the list
  openDialog(): void {
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
    this.audioSample = samples;

    // re setting the lable
    this.lable = samples.length + " Sample(s) Attached";

    // test can be proceeded
    this.canProceed = true;
    this.proceedBtnLable ='Proceed Test';

  }

  // Clear the selection
  clear() {
    this.lable = 'Click here to import the audio';
    this.isSelected = false;
    this.canProceed = false;

  }
  proceedTest() {
    if (this.canProceed) {
      this.openSnackBar("Proceeding the test","OK");
    }
    else {
      this.openSnackBar("Please select the audio samples","close");
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