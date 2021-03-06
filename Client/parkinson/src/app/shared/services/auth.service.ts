import { DoctorService } from './doctor.service.service';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDocor: any;
  // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private doctorService: DoctorService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public notify: NotificationService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userDocor = user;
        localStorage.setItem('user', JSON.stringify(this.userDocor));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );

      this.SetUserData(result.user);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard-g']);
      });
      result.user.emailVerified
        ? this.notify.infoSnack('Welcom Back')
        : this.SendVerificationMail();

      // return true;
    } catch (error) {
      window.alert(error.message);
      return false;

      // return false;
    }
  }

  // Sign up with email/password
  async SignUp(email: string, password: string, lName: string, fName: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const data = {
        "firstName": fName,
        "lastName": lName,
        "email": email,
        "password": password
      }
      console.log("async SignUp(" + data);
      this.doctorService.sendPostRequest(data).subscribe(arg => console.log(arg));


      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);

      this.notify.successSnack('Please check your e-mail for verification link');

    } catch (error) {
      this.notify.errorSnack(error.message);

      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email-address', 'null']);
  }

  async VerifyEmail(code: string): Promise<boolean> {
    await this.afAuth.auth
      .applyActionCode(code)
      .then((resp) => {
        this.notify.successSnack('Verification successful E-Mail');
        return true;
      })
      .catch((error) => {
        this.notify.errorSnack(error.message);
        return false;
      });
    return false;
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string): Promise<boolean> {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      this.notify.infoSnack('Request sent successfull.!');
      return true;
    } catch (error) {

      this.notify.errorSnack(error.message);
      return false;
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.SetUserData(result.user);

      this.ngZone.run(async () => {
        this.notify.infoSnack('Welcome');
        await this.router.navigate(['dashboard-g']);
      });
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userDocor: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isEmailVerified: user.emailVerified
    };
    return userRef.set(userDocor, {
      merge: true
    });
  }

  // Sign out
  async SignOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  SetNewPassword(code: string, newPassword: string) {
    firebase
      .auth()
      .confirmPasswordReset(code, newPassword)
      .then(() => {
        this.router.navigate(['/']);
        return;
      })
      .catch((e) => {
        this.notify.errorSnack(e.message);
      });
  }

}
