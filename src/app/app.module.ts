import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {} from 'googlemaps';

import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { DatabaseService } from './services/database.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderService } from './services/header.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { EditorComponent } from './Components/editor/editor.component';
import { UserComponent } from './user/user.component';
  import { UserPageComponent } from './user/user-page/user-page.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { ServiceComponent } from './Components/service/service.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { MapsComponent } from './Components/maps/maps.component';
import { ForumComponent } from './Components/forum/forum.component';
import { PersonalDataComponent } from './user/Account/personal-data/personal-data.component';
import { CreditCardsComponent } from './user/Account/credit-cards/credit-cards.component';
import { ActivitiesComponent } from './user/Account/activities/activities.component';
import { TextEditorComponent } from './user/Editor/text-editor/text-editor.component';
import { MapEditorComponent } from './user/Maps/map-editor/map-editor.component';
import { ChartEditorComponent } from './user/Charts/chart-editor/chart-editor.component';
import { TablesComponent } from './user/Tables/tables/tables.component';
import { DocumentsComponent } from './user/Documents/documents/documents.component';



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
    ActivitiesComponent,
    TextEditorComponent,
    MapEditorComponent,
    ChartEditorComponent,
    TablesComponent,
    DocumentsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    EditorModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.agmApiKey
    })
  ],
  providers: [ DatabaseService, AuthenticationService, AuthGuardService, HeaderService, GoogleMapsAPIWrapper ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
