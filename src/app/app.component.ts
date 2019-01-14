import { ChangeDetectorRef, Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


import { AuthenticationService, UserDetails } from './Services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnDestroy, DoCheck {

  isCollapsed = true;
  userCollapsed = true;
  wasClicked = false;
  userClicked = false;
  details: UserDetails;
  userLogged = false;
  showFooter = false;
  errorMsg;
  userName;


  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;
  transition: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor( public auth: AuthenticationService, private router: Router,
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, public route: ActivatedRoute ) {

    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(max-width: 767px)');
    this.transition = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
    this.transition.addListener(this._mobileQueryListener);

    

  }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.details = this.auth.getUserDetails();
      this.userName = this.auth.getUserDetails().userName;
    }
    else{
      this.userName ='#';
    }
  }

  ngDoCheck() {
    if(this.auth.isLoggedIn()){
      this.userLogged = true;
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

  toggleUser() {
    this.userCollapsed = !this.userCollapsed;
    this.userClicked = !this.userClicked;
  }

  getUserName(){
    if(this.auth.isLoggedIn()){
      this.details = this.auth.getUserDetails()
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
    this.router.navigate(['user/personal-data']);
  }

  profilePic() {
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
      this.router.navigate(['home']);
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

  about() {
    this.userCollapsed = true;
    this.userClicked = false;
    if (this.mobileQuery.matches) {
      this.toggleMenu();
    }
    this.router.navigate(['about']); 
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

  register(){
    this.toggleUser();
    this.router.navigate(['register']);
  }
}
