import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/services/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: User;


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.users = this.authService.userDocor;
    console.log(this.users);

   }

  ngOnInit() {}

  sets(){
    this.users = this.authService.userDocor;
  }

}
