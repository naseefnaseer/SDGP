import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Patient } from "../../../shared/services/Patient";
import { patients } from "./list";
@Component({
  selector: "patient-list",
  templateUrl: "./dialog.component.html",
})
export class PatientList {

  list: Patient[];

  constructor(
    public dialogRef: MatDialogRef<PatientList>,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {
    this.list = patients;
  }

  close(): void {
    this.dialogRef.close();
  }

  select(p: Patient) {
    this.dialogRef.close(p);
  }

}
