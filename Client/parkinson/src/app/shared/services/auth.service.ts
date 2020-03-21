import { Injectable, NgZone } from "@angular/core";
import { User } from "../services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any; // Save logged in user data
  phoneAuthController: Promise<auth.ConfirmationResult>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public _snackBar: MatSnackBar
  ) {
    // Saving logged status in local system
    // Null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.ngZone.run(() => {
        this.router.navigate(["dashboard"]);
      });
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Sign up with email/password
  async EmailSignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      /*
      Call the SendVerificaitonMail() function when new user sign
      up and returns promise
      */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(["verify-email-address"]);
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      // TODO:
      window.alert("Password reset email sent, check your inbox.");
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  AuthGoogle() {
    return this.Login(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async Login(provider: auth.AuthProvider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);

      this.ngZone.run(() => {
        this.router.navigate(["dashboard"]);
      });

      this.SetUserData(result.user);
    } catch (error) {
      alert(error.message);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      proPicURL: user.photoURL,
      isEmailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  async SignOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.router.navigate(["sign-in"]);
  }

  // Sign up using phone number
  SendOTPcode(phonenum: string) {
    this.phoneAuthController = this.afAuth.auth.signInWithPhoneNumber(
      phonenum,
      null
    );

    this.phoneAuthController.catch(function(e) {
      this.openSnackBar(e.message, e.action);
    });
  }

  VerifyOTP(otpCode: string) {
    this.phoneAuthController.then(function(otp) {
      this.openSnackBar(otp.verificationId, "VID");
      otp.confirm(otpCode).then(verification => {
        this.openSnackBar(verification);
        console.log(verification);
      });
    });
  }

  newpass(code: string, newPassword: string) {
    firebase
      .auth()
      .confirmPasswordReset(code, newPassword)
      .then(function() {
        this.openSnackBar("Password changed successful.", "");
      })
      .catch(function(e) {
        this.openSnackBar(e.message, "OK");
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
