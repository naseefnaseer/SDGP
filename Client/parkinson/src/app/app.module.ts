import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from "./shared/routes/app-routing.module";

// App components
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Error404Component } from "./components/error404/error404.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { NewPasswordComponent } from "./components/new-password/new-password.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";

// Firebase services + enviorment module
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { environment } from "../environments/environment";

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { EmailConrollerComponent } from "../app/components/email-conroller/email-conroller.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmailConrollerComponent,
    Error404Component,
    ForgotPasswordComponent,
    NewPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    FooterComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
