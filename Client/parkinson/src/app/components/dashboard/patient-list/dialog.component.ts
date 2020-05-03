import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Patient } from '../../../shared/services/Patient';
import { PatientService } from '../../../shared/services/patient.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: "patient-list",
  templateUrl: "./dialog.component.html",
})
export class PatientList {

  list: Patient[];
  patients: HttpResponse<JSON>;

  constructor(
    public dialogRef: MatDialogRef<PatientList>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.patientService.getList().subscribe(
      (response: HttpResponse<JSON>) => {
        this.patients = response;
        console.log(this.patients);
        this.openSnackBar('Patient Loaded Successfully.', 'ok');
      },
      (err: HttpResponse<JSON>) => {
        // error notifier
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        this.openSnackBar('Patient creation Unsuccessful !', 'ok');
      }
    );
  }

  close(): void {
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
