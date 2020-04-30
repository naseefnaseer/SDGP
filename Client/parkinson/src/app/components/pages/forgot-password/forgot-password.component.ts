import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean;
  isSuccess: boolean;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  // tslint:disable-next-line: ban-types
  form(): Object {
    if (this.isSuccess) {
      return { display: "none" };
    } else {
      return { display: "block" };
    }
  }
  // tslint:disable-next-line: ban-types
  message(): Object {
    if (this.isSuccess) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  }

  async SendRequest(mail: string) {
    this.isLoading = true;
    this.isSuccess = await this.authService.ForgotPassword(mail);
    this.isLoading = this.isSuccess;
  }
}
