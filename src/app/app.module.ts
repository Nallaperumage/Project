import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';


import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { DatabaseService } from './services/database.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderService } from './services/header.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditorComponent } from './editor/editor.component';
import { UserComponent } from './user/user.component';
  import { UserPageComponent } from './user/user-page/user-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from './notification/notification.component';
import { ServiceComponent } from './service/service.component';
import { PricingComponent } from './pricing/pricing.component';
import { MapsComponent } from './maps/maps.component';
import { ForumComponent } from './forum/forum.component';
import { PersonalDataComponent } from './user/personal-data/personal-data.component';
import { CreditCardsComponent } from './user/credit-cards/credit-cards.component';
import { ActivitiesComponent } from './user/activities/activities.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    EditorComponent,
    UserComponent,
      LoginComponent,
      SignupComponent,
      UserPageComponent,
    NotificationComponent,
    ServiceComponent,
    PricingComponent,
    MapsComponent,
    ForumComponent,
    PersonalDataComponent,
    CreditCardsComponent,
    ActivitiesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9mI2mmvzIk8307ENb_7QTXQYPi_slRfU'
    })
  ],
  providers: [ DatabaseService, AuthenticationService, AuthGuardService, HeaderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
