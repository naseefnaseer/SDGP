import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { PatientRegistrationComponent } from '../../components/patient-registration/patient-registration.component';

// Import canActivate guard services
import { AuthGuard } from '../guard/auth.guard';
import { NewPasswordComponent } from 'src/app/components/new-password/new-password.component';
import { PreSignedGuard } from '../guard/secure-inner-pages.guard';
import { Error404Component } from 'src/app/components/error404/error404.component';
import { EmailConrollerComponent } from 'src/app/components/email-conroller/email-conroller.component';


// Include route guard in routes array
const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },

  {
    path: '404',
    component: Error404Component
  },

  {
    path: '***',
    redirectTo: '/404'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-g',
    component: DashboardComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'forgot-password/:oobCode',
    component: ForgotPasswordComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'new-password/:oobCode',
    component: NewPasswordComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'verify-email-address/:oobCode',
    component: VerifyEmailComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'email-controller',
    component: EmailConrollerComponent,
    canActivate: [PreSignedGuard]
  },
  {
    path: 'new-patient',
    component: PatientRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: VerifyEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
