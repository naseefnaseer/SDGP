import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  isSuccess = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  form(): Object {
    if (this.isSuccess) {
      return { display: "none" };
    } else {
      return { display: "block" };
    }
  }
  message(): Object {
    if (this.isSuccess) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  }

  async SendRequest(mail: string) {
    this.isSuccess = await this.authService.ForgotPassword(mail);
  }
}
