import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { ServiceComponent } from './Components/service/service.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { MapsComponent } from './Components/maps/maps.component';
import { ForumComponent } from './Components/forum/forum.component';
import { UserComponent } from './user/user.component';
  import { UserPageComponent } from './user/user-page/user-page.component';
  import { PersonalDataComponent } from './user/Account/personal-data/personal-data.component';
  import { CreditCardsComponent } from './user/Account/credit-cards/credit-cards.component';
  import { ActivitiesComponent } from './user/Account/activities/activities.component';
  import { TextEditorComponent } from './user/Editor/text-editor/text-editor.component';
  import { MapEditorComponent } from './user/Maps/map-editor/map-editor.component';
  import { ChartEditorComponent } from './user/Charts/chart-editor/chart-editor.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { EditorComponent } from './Components/editor/editor.component';
import { NotificationComponent } from './Components/notification/notification.component';
  


const routes: Routes = [
  {
 
    path: 'login',
    component: LoginComponent
  
  },

  {
  
    path: 'signUp',
    component: SignupComponent
     
  },

  {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: UserPageComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'personal-data',
        component: PersonalDataComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'text-editor',
        component: TextEditorComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'map-editor',
        component: MapEditorComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'chart-editor',
        component: ChartEditorComponent,
        // canActivate: [AuthGuardService]
      }
    ]
  },

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'service',
    component: ServiceComponent
  },

  {
    path: 'pricing',
    component: PricingComponent
  },

  {
    path: 'maps',
    component: MapsComponent
  },

  {
    path: 'forum',
    component: ForumComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'editor',
    component: EditorComponent
  },

  {
    path: 'notifications',
    component: NotificationComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
