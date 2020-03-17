import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { TitleDivComponent } from './main/title-div/title-div.component';
import { UserSigningComponent } from './main/pages_contents/user-signing/user-signing.component';
import { RegistrationComponent } from './main/pages_contents/registration/registration.component';
import { DashboardComponent } from './main/pages_contents/dashboard/dashboard.component';
import { MenuBarComponent } from './main/menu_controls/menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainComponent,
    TitleDivComponent,
    UserSigningComponent,
    RegistrationComponent,
    DashboardComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
