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


  /** Constants used to fill up our data base. */
  COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
  NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
  ];

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
      'lastVisit'];

  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
    this.patientService.getList().subscribe(
      (response: HttpResponse<JSON>) => {


        var list = response.map(x => x);

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(list);
        this.openSnackBar('Patient Loaded Successfully.', 'ok');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpResponse<Patient>) => {
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
