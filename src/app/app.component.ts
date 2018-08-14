import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


import { AuthenticationService, LoginUser } from './services/authentication.service';
import { headersToString } from 'selenium-webdriver/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  aboutCollapsed = true;
  userCollapsed = true;
  wasClicked = false;
  aboutClicked = false;
  userClicked = false;
  details: LoginUser;


  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;
  transition: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public auth: AuthenticationService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(max-width: 767px)');
    this.transition = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
    this.transition.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

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

  removeIt(){
    this.userCollapsed = true;
    this.userClicked = false;
  }

  notification() {
    setTimeout(() => {
      this.router.navigate(['notification']);
    }, 100);
  }

  viewProfile() {
    setTimeout(() => {
      this.router.navigate(['user/profile']);
    }, 100);
  }

  tanh() {
    setTimeout(() => {
      this.router.navigate(['/']);
      this.toggleUser();
    }, 100);
  }

  home() {
    setTimeout(() => {
      this.userCollapsed = true;
      this.userClicked = false;
      this.router.navigate(['/']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  service() {
    setTimeout(() => {
      this.userCollapsed = true;
      this.userClicked = false;
      this.router.navigate(['service']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  pricing() {
    setTimeout(() => {
      this.userCollapsed = true;
      this.userClicked = false;
      this.router.navigate(['pricing']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  maps() {
    setTimeout(() => {
      this.userCollapsed = true;
      this.userClicked = false;
      this.router.navigate(['maps']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
  }

  forum() {
    setTimeout(() => {
      this.userCollapsed = true;
      this.userClicked = false;
      this.router.navigate(['forum']);
      if (this.mobileQuery.matches) {
        this.toggleMenu();
      }
    }, 100);
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
    setTimeout(() => {
      this.auth.logout();
    }, 100);
  }

  login() {
    setTimeout(() => {
      this.router.navigate(['login']);
      this.toggleUser();
    }, 100);
  }
}
