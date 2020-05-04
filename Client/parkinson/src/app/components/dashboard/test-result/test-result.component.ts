import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Patient } from 'src/app/shared/services/Patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../../../shared/services/doctor.service.service';
import { FormGroup } from '@angular/forms';
import { TestsServiceService } from '../../../shared/services/tests.service.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit, AfterViewInit {


  isloading = false;
  result: any;


  constructor(
    public dialogRef: MatDialogRef<TestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private testsService: TestsServiceService,
    private notifiy: NotificationService
  ) {
    this.notifiy.infoSnack('Processing analysis...');

    this.testsService.proceedTest(this.data).subscribe
      (async response => {

        this.isloading = false;
        this.result = response;

      },
        (error => {

          this.isloading = false;
          this.notifiy.infoSnack('Error occoured, Please start over.');

          // console.log(error);
          this.dialogRef.close();

        })
      );
  }
  ngOnInit(): void { this.isloading = true; }

  ngAfterViewInit() {

  }


  close(): void {
    this.dialogRef.close(true);
  }
}
