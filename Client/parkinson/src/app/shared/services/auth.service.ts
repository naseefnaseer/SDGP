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

  userDocor: any;
  // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public _snackBar: MatSnackBar
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userDocor = user;
        localStorage.setItem("user", JSON.stringify(this.userDocor));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
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
        this.router.navigate(["dashboard-g"]);
      });
      result.user.emailVerified
        ? this.openSnackBar("Welcom Back", "OK")
        : this.SendVerificationMail();

      // return true;
    } catch (error) {
      window.alert(error.message);
      return false;

      // return false;
    }
  }

  // Sign up with email/password
  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(["verify-email-address", "null"]);
  }

  async VerifyEmail(code: string): Promise<boolean> {
    await this.afAuth.auth
      .applyActionCode(code)
      .then(function (_resp) {
        return true;
      })
      .catch(function (_error) {
        return false;
      });
    return false;
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string): Promise<boolean> {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      this.openSnackBar("Request sent successfull.! ", "");
      return true;
    } catch (error) {
      this.openSnackBar(error.message, error.action);
      return false;
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
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
        this.openSnackBar("Welcome", "");
        await this.router.navigate(["dashboard-g"]);
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
    localStorage.removeItem("user");
    this.router.navigate(["sign-in"]);
  }

  SetNewPassword(code: string, newPassword: string) {
    firebase
      .auth()
      .confirmPasswordReset(code, newPassword)
      .then(function () {
        this.router.navigate("/");
      })
      .catch(function (e) {
        this.openSnackBar(e.message, "OK");
      });
  }

  /**
   * @param msg the message of the nasck bar
   * @param btn button
   */
  openSnackBar(msg: string, btn: string) {
    this._snackBar.open(msg, btn, {
      duration: 2000
    });
  }
}
