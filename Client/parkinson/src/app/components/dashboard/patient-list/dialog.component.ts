import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../shared/services/Patient';
import { PatientService } from '../../../shared/services/patient.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({

  // tslint:disable-next-line: component-selector
  selector: 'patient-list',
  templateUrl: './dialog.component.html',
})
export class PatientListComponent implements OnInit {

  list: HttpResponse<JSON>;

  constructor(
    public dialogRef: MatDialogRef<PatientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private patientService: PatientService,
    private notify: NotificationService
  ) {
  }

  ngOnInit() {

    this.patientService.getList().subscribe(
      (response: HttpResponse<JSON>) => {

        this.list = response;
      },

      (err: HttpResponse<JSON>) => {
        // error notifier
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        this.notify.errorSnack(`Server error code:${err.body} ! `);
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
