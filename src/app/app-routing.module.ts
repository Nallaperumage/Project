import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { PricingComponent } from './pricing/pricing.component';
import { MapsComponent } from './maps/maps.component';
import { ForumComponent } from './forum/forum.component';
import { UserComponent } from './user/user.component';
  import { UserPageComponent } from './user/user-page/user-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
  


const routes: Routes = [
  {
    path: 'profile',
    component: UserComponent
  },

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
    children: [
      {
        path: 'profile',
        component: UserPageComponent,
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
