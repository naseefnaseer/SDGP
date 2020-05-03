import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: "confirmation",
  templateUrl: "./confirmation.html",
})
export class ConfirmationComponent {

  name: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.name = data;
  }

  ngOnInit() {

  }

  no() {
    this.dialogRef.close(false);
  }

  yes() {
    this.dialogRef.close(true);
  }


}
