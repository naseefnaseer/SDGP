import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

import { User } from '../../shared/services/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: User;
  showAccount = false;


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.users = this.authService.userDocor;
    console.log(this.users);

  }

  ngOnInit() { }

  accManage() {
    this.showAccount = !this.showAccount;
  }

}
