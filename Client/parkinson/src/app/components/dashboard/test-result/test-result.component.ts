import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Patient } from 'src/app/shared/services/Patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../../../shared/services/doctor.service.service';
import { FormGroup } from '@angular/forms';
import { TestsServiceService } from '../../../shared/services/tests.service.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit, AfterViewInit {


  isloading = false;


  constructor(
    public dialogRef: MatDialogRef<TestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private testsService: TestsServiceService
  ) {


  }
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.isloading = true;
    this.testsService.proceedTest(this.data).subscribe
      (async response => {

        console.log(response);
        this.isloading = false;

      },
        (error => {

          console.log(error);
          this.isloading = false;


        })
      );

  }



  close(): void {
    this.dialogRef.close(true);
  }
}
