import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Patient } from "../../../shared/services/Patient";
@Component({
  selector: "patient-list",
  templateUrl: "./dialog.component.html",
})
export class PatientList {
  pageSize:number;
  page = 4;
  list: Patient[] = [
    {
      pID: -1,
      firstName: 'Rajeev',
      lastName: 'Pakki',
      dob: '20/02/2020', email: 'example@example.com',
      gender: 'Male',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Sarvetha',
      lastName: 'Pakki',
      dob: '20/02/2020',
      gender: 'Male', email: 'example@example.com',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Sarvetha',
      lastName: 'Pakki',
      dob: '20/02/2020',
      gender: 'Male', email: 'example@example.com',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Sarvetha',
      lastName: 'Pakki',
      dob: '20/02/2020',
      gender: 'Male', email: 'example@example.com',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Naseef',
      lastName: 'Pakki',
      dob: '20/02/2020',
      gender: 'Male', email: 'example@example.com',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Ashfq',
      lastName: 'Pakki', email: 'example@example.com',
      dob: '20/02/2020',
      gender: 'Male',
      phone: '0773599879',
      address: '18 b hellow street',
    },
    {
      pID: -1,
      firstName: 'Vasee',
      lastName: 'Pakki',
      email: 'example@example.com',
      dob: '20/02/2020',
      gender: 'Male',
      phone: '0773599879',
      address: '18 b hellow street',
    },
  ];
  pageOfPatients: Array<Patient>;


  constructor(
    public dialogRef: MatDialogRef<PatientList>,
    @Inject(MAT_DIALOG_DATA)
    public data: Patient
    ) {

      this.pageSize = this.list.length;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }


  select(p: Patient) {
    console.log(p);
    this.data = p;
    this.dialogRef.close();
  }
}
