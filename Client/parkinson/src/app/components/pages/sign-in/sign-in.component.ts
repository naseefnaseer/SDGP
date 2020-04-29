import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],

})

export class SignInComponent implements OnInit {
  isLoading: boolean;


  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.isLoading = false;
  }

  async SignIn(email: string, pass: string) {
    this.isLoading = true;
    this.isLoading = await this.authService.SignIn(email, pass);
  }
}
