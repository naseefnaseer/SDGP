import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from 'src/app/shared/services/Patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent {

  constructor(
    public dialogRef: MatDialogRef<TestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
