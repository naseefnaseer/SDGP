import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/shared/services/Patient";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {
  ngOnInit(): void {
  }
  list: Patient[] = [
    {
      pID: -1,
      firstName: "Rajeev",
      lastName: "Pakki",
      dob: "20/02/2020",
      email: "example@example.com",
      gender: "Male",
      phone: "0773599879",
      address: "18 b hellow street",
    },
    {
      pID: -1,
      firstName: "Sarvetha",
      lastName: "Pakki",
      dob: "20/02/2020",
      gender: "Male",
      email: "example@example.com",
      phone: "0773599879",
      address: "18 b hellow street",
    },
    {
      pID: -1,
      firstName: "Naseef",
      lastName: "Pakki",
      dob: "20/02/2020",
      gender: "Male",
      email: "example@example.com",
      phone: "0773599879",
      address: "18 b hellow street",
    },
    {
      pID: -1,
      firstName: "Ashfq",
      lastName: "Pakki",
      email: "example@example.com",
      dob: "20/02/2020",
      gender: "Male",
      phone: "0773599879",
      address: "18 b hellow street",
    },
    {
      pID: -1,
      firstName: "Vasee",
      lastName: "Pakki",
      email: "example@example.com",
      dob: "20/02/2020",
      gender: "Male",
      phone: "0773599879",
      address: "18 b hellow street",
    },
  ];
  OnInit() {}
}
