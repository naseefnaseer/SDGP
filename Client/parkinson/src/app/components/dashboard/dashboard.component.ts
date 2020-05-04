import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from "@angular/router";
import { DoctorService } from '../../shared/services/doctor.service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  users: any;

  displayName: string;

  noName: boolean;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public doctorService: DoctorService
  ) {


  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user == null) {

      } else {

        this.doctorService.getDoctorDetails(user['email']).

          subscribe(
            duser => {

              console.log(duser);

              this.users = duser;

              if (this.users.firstName === undefined) {

                this.noName = true;
                this.displayName = `Dr. ${this.authService.userDocor.displayName}`;

              }
              else {
                // Assigning the logged in users name to be displayed
                this.displayName = `Dr. ${this.users.firstName} ${this.users.lastName}`;

              }


            },
            (error) => {
              console.log(error);
            }
          );

      }

    } catch (error) {

    }

  }
}
