import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  isLoading: boolean;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  async SignIn(email: string, pass: string) {
    this.isLoading = true;

    this.isLoading = await this.authService.SignIn(email, pass);
  }
}
