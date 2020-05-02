import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class SignUpComponent implements OnInit {
  isLoading: boolean;
  isMatchPass: boolean;
  isMatchMail: boolean;
  constructor(public snackBar: MatSnackBar, public authService: AuthService) {}

  ngOnInit() {
    this.isMatchPass = true;
    this.isMatchMail = true;
  }

  signUpUser(
    email: string,
    fname: string,
    lname: string,
    pass1: string,
    pass2: string
  ) {

    if (fname === '' || lname === '') {
      this.openSnackBar('Name cannot be empty !', 'ok');
    }

    this.isMatching(pass1, pass2);
    if (this.isMatchPass) {
      if (email.includes('@') && email.includes('.')) {
        this.isLoading = true;
        this.authService.SignUp(email, pass2);
      } else {
        this.isMatchMail = false;
        this.isLoading = true;
      }
    }
    this.isLoading = false;
  }

  passerror(): any {
    return this.isMatchPass
      ? { visibility: 'hidden' }
      : { visibility: 'visible' };
  }

  mailerror(): any {
    return this.isMatchMail
      ? { visibility: 'hidden' }
      : { visibility: 'visible' };
  }

  isMatching(pass1: string, pass2: string) {
    if (pass1 !== pass2 || pass1.length !== pass2.length) {
      this.isMatchPass = false;
    } else {
      this.isMatchPass = true;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}
