
// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';


// Components
import { MainComponent } from './main/main.component';
import { TitleDivComponent } from './main/title-div/title-div.component';
import { MenuBarComponent } from './main/menu_controls/menu-bar/menu-bar.component';
import { DashboardComponent } from './main/pages_contents/dashboard/dashboard.component';
import { UserSigningComponent } from './main/pages_contents/user-signing/user-signing.component';
import { RegistrationComponent } from './main/pages_contents/registration/registration.component';
import { ContactUsComponent } from './main/pages_contents/contact-us/contact-us.component';



@NgModule({
  declarations: [
    MainComponent,
    MenuBarComponent,
    TitleDivComponent,
    DashboardComponent,
    UserSigningComponent,
    RegistrationComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([

      { path: '', component: DashboardComponent },
      { path: 'signIn', component: UserSigningComponent },
      { path: 'Registration', component: RegistrationComponent },
      { path: 'ContactUs', component: ContactUsComponent },

    ])
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
