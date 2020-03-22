import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.css"]
})
export class NewPasswordComponent implements OnInit {
  code: string = "Code";
  match: boolean = true;
  success: boolean = false;

  constructor(
    public _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {

    // Fetching the code from the URL
    // oobCode wchi is athe access token to reset the password
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params["oobCode"];
    });
  }

  ngOnInit() {
    
    this.match = true;

    if (this.code == "") {
      this.router.navigate(["notFound"]);
    }
  }

  /**
   * this method validates the password and reset it to the user account
   * the code will authenticate the token reference of the user account
   * to set the password
   *
   * @param pass1 password
   * @param pass2 to confirm the password is correct
   * @param code from the mail server to reset the passswortd
   */
  resetPassword(pass1: string, pass2: string, code: string) {
    this.openSnackBar(code, pass2);
    if (pass1 == pass2) {
      this.match = true;

      this.success = true;

      // Setting new password to thee user
      this.authService.SetNewPassword(code, pass2);
    } else {
      this.match = false;

      this.success = false;
    }
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
