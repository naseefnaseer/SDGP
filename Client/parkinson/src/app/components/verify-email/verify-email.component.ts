import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.authService.userData != null
      ? this.openSnackBar(
          "Confirm the Mail ",
          "OK"
        )
      : this.router.navigate(["/404"]);
  }

  ngOnInit() {
    this.authService.userData;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500
    });
  }
}
