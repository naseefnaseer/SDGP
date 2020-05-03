import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Reactive Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routes/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { SignInComponent } from '../app/components/pages/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/pages/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

// Auth service
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AuthService } from './shared/services/auth.service';
import { ConfirmationComponent } from './shared/services/confirmation/confirmation';
import { EditPatientComponent } from './components/dashboard/edit-patient/edit-patient.component';
import { EmailConrollerComponent } from './components/pages/email-conroller/email-conroller.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { NewPatientFormComponent } from './components/dashboard/new-patient-form/new-patient-form.component';
import { NotificationService } from './shared/services/notification.service';
import { PatientListComponent } from './components/dashboard/patient-list/dialog.component';
import { PatientsComponent } from './components/dashboard/patients/patients.component';
import { RegisterResponseComponent } from './components/dashboard/new-patient-form/register-response/register-response.component';
import { SpeechTestComponent } from './components/dashboard/speech-test/speech-test.component';
import { TestResultComponent } from './components/dashboard/test-result/test-result.component';


@NgModule({
  declarations: [
    AppComponent,
    AudioUploadComponent,
    ConfirmationComponent,
    DashboardComponent,
    EditPatientComponent,
    EmailConrollerComponent,
    Error404Component,
    FooterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    NewPatientFormComponent,
    PatientListComponent,
    PatientsComponent,
    RegisterResponseComponent,
    SignInComponent,
    SignUpComponent,
    SpeechTestComponent,
    EditPatientComponent,
    TestResultComponent,
    VerifyEmailComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ConfirmationComponent,
    NewPatientFormComponent,
    PatientListComponent,
    TestResultComponent,
    EditPatientComponent
  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthService, NotificationService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
