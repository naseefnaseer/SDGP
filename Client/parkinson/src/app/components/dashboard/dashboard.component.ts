import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

import { User } from '../../shared/services/user';
import { DoctorService } from '../../shared/services/doctor.service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;

  displayName: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public doctorService: DoctorService
  ) {


  }

  ngOnInit() {



  }
  ngAfterViewInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {

    } else {
      this.doctorService.getDoctorDetails(user['email']).
        subscribe(
          _user => {

            console.log(_user);

            this.user = _user;

            // Assigning the logged in users name to be displayed
            this.displayName =
              // is not null
              this.authService.userDocor.displayName ?
                this.authService.userDocor.displayName :
                `${this.user.firstName} ${this.user.lastName}`;

          },
          (error) => {
            console.log(error);
          }
        );

    }
  }

  setData() {

    return "- - -";
  }

}
