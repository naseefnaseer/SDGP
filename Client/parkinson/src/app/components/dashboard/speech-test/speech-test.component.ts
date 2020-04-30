import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";
import { MatDialog } from "@angular/material/dialog";
import { PatientList } from "../patientList/dialog.component";

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

  // files imoported
  lable = 'Click here to import the audio';


  constructor(public dialog: MatDialog) { }
  ngOnInit() { }



  openDialog(): void {
    const dialogRef = this.dialog.open(PatientList);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The list was closed");

        console.log(result);


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



  getSample(samples: FileList) {
    this.audioSample = samples;
    this.lable = '';

    for (let i = 0; i < samples.length; i++) {

      console.log(
        this.lable += samples[i].name + ' | '
      );

    }
  }

  clear(){
    this.isSelected = false;
  }
}
