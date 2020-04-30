import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from 'src/app/shared/services/Patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { patients } from '../patient-list/list';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent {

  list: Patient[];

  constructor(
    public dialogRef: MatDialogRef<TestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {
    this.list = patients;
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
