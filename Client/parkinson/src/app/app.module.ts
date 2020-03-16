import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { TitleDivComponent } from './main/title-div/title-div.component';

@NgModule({
  declarations: [
    MainComponent,
    TitleDivComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
