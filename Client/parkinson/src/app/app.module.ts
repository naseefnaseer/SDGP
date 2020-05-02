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
import { Error404Component } from './components/pages/error404/error404.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { SignInComponent } from '../app/components/pages/sign-in/sign-in.component';
import { MatSelectModule } from '@angular/material/select';
import { SignUpComponent } from '../app/components/pages/sign-up/sign-up.component';
import { MatMenuModule } from '@angular/material/menu';
import { VerifyEmailComponent } from './components/pages/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
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
import { EmailConrollerComponent } from './components/pages/email-conroller/email-conroller.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { PatientRegistrationComponent } from './components/pages/patient-registration/patient-registration.component';
import { SpeechTestComponent } from './components/dashboard/speech-test/speech-test.component';
import { PatientsComponent } from './components/dashboard/patients/patients.component';
import { PatientList } from './components/dashboard/patient-list/dialog.component';
import { TestResultComponent } from './components/dashboard/test-result/test-result.component';
import { MatPaginatorModule } from '@angular/material';
import { AccountManageComponent } from './components/pages/account-manage/account-manage.component';
import { RegisterResponseComponent } from './components/dashboard/new-patient-form/register-response/register-response.component';
import { NewPatientFormComponent } from './components/dashboard/new-patient-form/new-patient-form.component';


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
    SpeechTestComponent,
    PatientsComponent,
    PatientList,
    TestResultComponent,
    AccountManageComponent,
    RegisterResponseComponent,
    NewPatientFormComponent,
  ],
  imports: [
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  entryComponents: [PatientList, TestResultComponent, NewPatientFormComponent],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
