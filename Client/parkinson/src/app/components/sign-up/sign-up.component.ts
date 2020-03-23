import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  isLoading: boolean;
  isMatchPass: boolean;
  isMatchMail: boolean;
  constructor(public authService: AuthService) {}

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
    this.isMatching(pass1, pass2);
    if (this.isMatchPass) {
      if (email.includes("@") && email.includes(".")) {
        this.isLoading = true;
        this.authService.SignUp(email, pass2);
      } else {
        this.isMatchMail = false;
        this.isLoading = true;
      }
    }
  }

  passerror(): Object {
    return this.isMatchPass
      ? { visibility: "hidden" }
      : { visibility: "visible" };
  }

  mailerror(): Object {
    return this.isMatchMail
      ? { visibility: "hidden" }
      : { visibility: "visible" };
  }

  isMatching(pass1: string, pass2: string) {
    if (pass1 != pass2 || pass1.length != pass2.length) {
      this.isMatchPass = false;
    } else {
      this.isMatchPass = true;
    }
  }
}
