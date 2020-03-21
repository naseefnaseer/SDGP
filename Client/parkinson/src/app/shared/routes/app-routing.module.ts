import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../guard/auth.guard";
import { NewPasswordComponent } from 'src/app/components/new-password/new-password.component';
import { PreSignedGuard } from "../guard/secure-inner-pages.guard";


// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [PreSignedGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [PreSignedGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [PreSignedGuard] },
  { path: 'new-password', component: NewPasswordComponent, canActivate: [PreSignedGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [PreSignedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
