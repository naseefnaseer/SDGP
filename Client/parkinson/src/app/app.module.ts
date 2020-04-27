import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Reactive Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routes/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/error404/error404.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatSelectModule } from '@angular/material/select';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DoTestComponent } form './components/test/do-test.component';


// Firebase services + enviorment module
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { EmailConrollerComponent } from '../app/components/email-conroller/email-conroller.component';
import { FooterComponent } from './components/footer/footer.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { DoTestComponent } from './components/test/do-test.component';

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
    FooterComponent,
    AudioUploadComponent,
    PatientRegistrationComponent,
    DoTestComponent,
  ],
  imports: [
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
