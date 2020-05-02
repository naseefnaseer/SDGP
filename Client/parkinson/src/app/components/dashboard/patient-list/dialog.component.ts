import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Patient } from '../../../shared/services/Patient';
import { PatientService } from '../../../shared/services/patient.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/services/notification.service';
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
    private notify: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.patientService.getList().subscribe(
      (response: HttpResponse<JSON>) => {

        this.patients = response;
        console.log(this.patients);
        this.notify.successSnack('Patient Loaded Successfully.');

      },
      (err: HttpResponse<JSON>) => {

        // error notifier
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        this.notify.errorSnack('Patient creation Unsuccessful !');

      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  select(p: Patient) {
    this.dialogRef.close(p);
  }

}
