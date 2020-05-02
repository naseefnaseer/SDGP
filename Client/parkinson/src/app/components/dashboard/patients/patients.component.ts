import { Patient } from './../../../shared/services/Patient';
import { PatientService } from './../../../shared/services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from './user';
import { element } from 'protractor';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  columnHeader: string[] =
    ['id',
      'firstName',
      'lastName',
      'gender',
      'dob',
      'age',
      'address',
      'email',
      'phone',
      'lastVisit',
      'manage'];

  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  isError: boolean;

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
    this.isLoading = true;
    this.patientService.getList().subscribe(
      (response: HttpResponse<JSON>) => {

        const list = response.map(x => x);

        // populate the data to the adapter
        this.dataSource = new MatTableDataSource(list);

        this.openSnackBar('Patient Loaded Successfully.', 'ok');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = true;

      },
      (err: HttpResponse<Patient>) => {
        this.isError = true;
        // error notifier
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        this.openSnackBar('Patient creation Unsuccessful !', 'ok');
      }
    );
  }


  ngOnInit() {


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    const filterValue = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
