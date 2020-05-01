import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {

  title: string;
  isVerified: boolean;
  code: any;

  constructor(
    public _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {
    this.code = this.activatedRoute.snapshot.paramMap.get("oobCode");

    if (this.code !== "null") {
      this.isVerified = true;
      if (this.authService.VerifyEmail(this.code)) {
        this.title = "Verification Successful";
      }
    } else {
      this.isVerified = false;
      this.title = "Registration Successful.";
    }
  }

  isVerifi(): Object {
    if (!this.isVerified) {
      return { display: "none" };
    } else {
      return { display: "block" };
    }
  }
  isRegisted(): Object {
    if (this.isVerified) {
      return { display: "none" };
    } else {
      return { display: "block" };
    }
  }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }
}
