import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PatientList } from "./dialog.component";

@Component({
  selector: "app-pick-patient",
  templateUrl: "./pick-patient.component.html",
  styleUrls: ["./pick-patient.component.scss"],
})
export class PickPatientComponent {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientList, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }
}
