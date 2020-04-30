import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";
import { patients } from '../patient-list/list';

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {

  patients: Patient[];

  constructor(){
    this.patients = patients;
  }

  ngOnInit(): void {
  }
  OnInit() {}
}
