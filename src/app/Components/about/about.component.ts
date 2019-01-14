import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService, UserDetails } from '../../Services/authentication.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  panelOpenState: boolean = false;
  isClicked = false;
  isAccountClicked = false;
  isEditorClicked = false;
  isFormClicked = false;
  sideNav = {
    raw:''
  }

  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;

  navLinks1 = [
    { path: 'personal-data', label: 'Personal Data' },
    { path: 'credit-cards', label: 'Credit Cards' },
    { path: 'activities', label: 'Activilies' }
  ];

  navLinks2 = [
    { path: 'text-editor', label: 'Text Editor' },
  ];

  navLinks3 = [
    { path: 'map-editor', label: 'Map Editor' },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public router:Router, public route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);

    if(this.route.firstChild){
      this.route.firstChild.url.subscribe( UrlSegment => {
        if(UrlSegment[0].path=='personal-data' || UrlSegment[0].path=='credit-cards'|| UrlSegment[0].path=='activities'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteWebSite();
          }
          return this.routeWebSite();
        }
        if(UrlSegment[0].path=='text-editor'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteGeologists();
          }
          return this.routeGeologists();
        }
        if(UrlSegment[0].path=='map-editor'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteLabs();
          }
          return this.routeLabs();
        }
        
      })
    }
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  hideArrow(){
    this.isClicked = !this.isClicked;
  }
  mobileRouteWebSite(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw = 'WebSite'
  }
  mobileRouteGeologists(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw = 'Geologist'
  }
  mobileRouteLabs(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw = 'Labs'

  }

  routeWebSite(){
    this.sideNav.raw = 'WebSite'
  }
  routeGeologists(){
    this.sideNav.raw = 'Geologists'
  }
  routeLabs(){
    this.sideNav.raw = 'Labs'
  }
  
  leftClick(){
    document.getElementById('my-mat-nav').scrollLeft -= 200;
  }

  rightClick(){
    document.getElementById('my-mat-nav').scrollLeft +=200;
  }

}
