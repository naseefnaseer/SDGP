import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

import {AngularFireAuth} from 'angularfire2/auth';
import { WindowService } from '../../../window.service';

import 'firebase/app';
import * as firebase from 'firebase';

export class MobileNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  get e164() {
    const num = +94773599879;
    return '+${num}';
  }
}


/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-registeration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})


export class RegistrationComponent implements OnInit {
  firebase = require('firebase/app');
  windowRef: any;

  mobileNo = new MobileNumber()

  otpCode: string;

  user: any;

  valid: boolean;

  validotp: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private win: WindowService,
  ) { }

  ngOnInit() {
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // this.windowRef.recaptchaVerifier.render();
    this.sendLoginCode();
  }


  validate(phoneNumber: string, stepper: MatStepper) {
    //  Validating the phone number input
    // Range check
    if (phoneNumber.length > 8 && phoneNumber.length < 11) {

      this.valid = true;
      stepper.next()

    } else {
      this.valid = false;
    }

  }


  sendLoginCode() {

    // const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.mobileNo.e164;

    firebase.auth().signInWithPhoneNumber(num, null)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log("****************" + error));

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.otpCode)
      .then(result => {

        this.user = result.user;

      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  onInputEntry(otp: string, stepper: MatStepper) {
    this.validotp = true;
    if (otp.length == 6) {
      console.log(otp);
      this.otpValidate(parseInt(otp), stepper);
    }

  }

  otpValidate(otp: number, stepper: MatStepper) {
    if (otp == 773599) {
      document.getElementById('invalid-otp').style.visibility = 'hidden';
      this.validotp = true;
      stepper.next();
    }
    else {
      this.validotp = false;
      document.getElementById('invalid-otp').style.visibility = 'visible';
    }
  }

  resendOTP() {
    this.openSnackBar("Resending OTP, please wait.", "OK")
  }


  openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}