import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class SignUpComponent implements OnInit {
  isLoading = false;
  isMatchPass: boolean;
  isMatchMail: boolean;

  constructor(public snackBar: NotificationService, public authService: AuthService) { }

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

    this.isLoading = true;

    if (fname === '' || lname === '') {
      this.snackBar.errorSnack('Name cannot be empty !');
    }
    else {
      this.isLoading = false;
    }

    this.isMatching(pass1, pass2);
    if (this.isMatchPass) {
      if (email.includes('@') && email.includes('.')) {
        this.isLoading = true;

        this.snackBar.infoSnack('Please Wait...');

        this.authService.SignUp(email, pass2, fname, lname).finally
          (() => { this.isLoading = false; }
          );

      } else {
        this.isMatchMail = false;
        this.isLoading = true;
      }
    } else {

      this.isLoading = false;
    }
    this.isLoading = false;
  }

  passerror(): any {
    return this.isMatchPass
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
}
