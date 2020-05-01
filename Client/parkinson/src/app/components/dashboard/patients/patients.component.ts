import { PatientService } from './../../../shared/services/patient.service';
import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";
import { DoctorService } from '../../../shared/services/doctor.service.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {

  patients: any;

  constructor(
    public patientService: PatientService,
    private snackBar: MatSnackBar
  ) {  }

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

  OnInit() { }

  editPatient() { }

  deletePatient() { }

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
