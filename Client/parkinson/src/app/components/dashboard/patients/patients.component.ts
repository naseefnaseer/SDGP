import { Patient } from './../../../shared/services/Patient';
import { PatientService } from './../../../shared/services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { NewPatientFormComponent } from '../new-patient-form/new-patient-form.component';
import { PatientList } from '../patient-list/dialog.component';
import { ConfirmationComponent } from '../../../shared/services/confirmation/confirmation';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {


  columnHeader: string[] =
    [
      'id',
      'firstName',
      'lastName',
      'gender',
      'dob',
      'age',
      'address',
      'email',
      'phone',
      'lastVisit',
      'manage',
    ];

  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  isError: boolean;
  isModified: boolean;


  constructor(
    private patientService: PatientService,
    public dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.isLoading = true;
    this.getPatientList();
  }


  ngOnInit() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPatientList() {
    this.patientService.getList().subscribe(
      (response: JSON) => {

        const list = response.map((x: any) => x);

        // populate the data to the adapter
        this.dataSource = new MatTableDataSource(list);

        if (!this.isModified) {
          this.notify.infoSnack('Patient Loaded Successfully.');
        }
        this.isModified = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

      },
      (err: HttpResponse<JSON>) => {
        this.isError = true;
        // error notifier
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        this.notify.errorSnack('Patient creation Unsuccessful !');
      }
    );
  }


  refresh() {
    this.getPatientList();
    const filterValue = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePatient(p: number, name: string) {

    const dialogRef = this.dialog.open(ConfirmationComponent, { data: name });

    dialogRef.afterClosed().subscribe(
      (decision) => {
        if (decision) {
          this.patientService.delete(p).subscribe(
            (res) => {
              this.notify.successSnack(`Deleting of patient data : ${p} is successful`);
              this.isModified = true;
              this.refresh();
            }, (error: HttpResponse<JSON>) => {
              this.notify.errorSnack("Patient " + error.statusText + " | Deletion Unsuccessful!!!");
            }
          );
        }
      }
    );
  }


  editPatient(patient: Patient) {

    console.log(patient);

    const dialogRef = this.dialog.open(EditPatientComponent, { data: patient });

    dialogRef.afterClosed().subscribe(
      (state) => {

        if (state) {
          this.isModified = true;
          this.refresh();
        } else {
          this.notify.errorSnack("Session cancelled or error");
        }

      }
    );
  }



}
