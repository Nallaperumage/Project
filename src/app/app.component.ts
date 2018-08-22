import { ChangeDetectorRef, Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


import { AuthenticationService, UserDetails } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnDestroy, DoCheck {

  isCollapsed = true;
  aboutCollapsed = true;
  userCollapsed = true;
  wasClicked = false;
  aboutClicked = false;
  userClicked = false;
  details: UserDetails;
  userLogged = false;
  errorMsg;


  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;
  transition: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor( public auth: AuthenticationService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(max-width: 767px)');
    this.transition = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
    this.transition.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    
  }

  ngDoCheck() {
    if(this.auth.isLoggedIn()){
      this.userLogged = true;
      this.auth.profile().subscribe(user => {
        this.details = user;
      });
    }
    else{
      this.userLogged = false;
    }
  }

  // document.getElementById('tada').replaceChild(newchild, old child);
 
  ngOnDestroy(): void {
    // this.auth.profile().subscribe(user=>{
    //   this.details =user;
    // });
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.largeQuery.removeListener(this._mobileQueryListener);
    this.transition.removeListener(this._mobileQueryListener);
  }

  toggleMenu() {
    this.userCollapsed = true;
    this.userClicked = false;
    this.isCollapsed = !this.isCollapsed;
    this.wasClicked = !this.wasClicked;
  }

  toggleAbout() {
    this.aboutCollapsed = !this.aboutCollapsed;
    this.aboutClicked = !this.aboutClicked;
  }

  toggleUser() {
    this.userCollapsed = !this.userCollapsed;
    this.userClicked = !this.userClicked;
  }

  getUserName(){
    if(this.auth.isLoggedIn()){
      this.auth.profile().subscribe(user => {
        this.details = user;
      }, (err) => {
        console.error(err);
      });
    }
  }

  removeIt(){
    this.userCollapsed = true;
    this.userClicked = false;
  }

  notification() {
    setTimeout(() => {
      this.router.navigate(['notification']);
    }, 100);
  }

  user() {
    this.toggleUser();
    this.router.navigate(['user']);
  }

  tanh() {
    setTimeout(() => {
      this.router.navigate(['/']);
      this.toggleUser();
    }, 100);
  }

  home() {
      this.userCollapsed = true;
      this.userClicked = false;
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
      this.router.navigate(['/']);
  }

  service() {
      this.userCollapsed = true;
      this.userClicked = false;
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
      this.router.navigate(['service']);
  }

  pricing() {
      this.userCollapsed = true;
      this.userClicked = false;
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
      this.router.navigate(['pricing']);
  }

  maps() {
      this.userCollapsed = true;
      this.userClicked = false;
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
      this.router.navigate(['maps']);
  }

  forum() {
      this.userCollapsed = true;
      this.userClicked = false;
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
      this.router.navigate(['forum']); 
  }

  action() {
    setTimeout(() => {
      this.router.navigate(['about']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  action2() {
    setTimeout(() => {
      this.router.navigate(['about']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  action3() {
    setTimeout(() => {
      this.router.navigate(['about']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  logOut() {
    this.toggleUser();
    setTimeout(() => {
      this.router.navigate(['/home']);
      this.auth.logout();
    }, 300);
  }

  login() {
    this.toggleUser();
    this.router.navigate(['login']);
  }

  signUp(){
    this.toggleUser();
    this.router.navigate(['signUp']);
  }
}
