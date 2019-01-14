import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService, UserDetails } from '../Services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  panelOpenState: boolean = false;
  isClicked = false;
  isAccountClicked = false;
  isEditorClicked = false;
  isFormClicked = false;
  isChartsClicked = false;
  isMapsClicked = false;
  isTablesClicked = false;
  isDocumentsClicked = false;
  sideNav = {
    raw:''
  }

  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  navLinks1 = [
    { path: 'personal-data', label: 'Personal Data' },
    { path: 'credit-cards', label: 'Credit Cards' },
    { path: 'activities', label: 'Activilies' }
  ];

  navLinks2 = [
    { path: 'text-editor', label: 'Text Editor' }
  ];

  navLinks3 = [
    { path: 'map-editor', label: 'Insert on Map' }
  ];

  navLinks4 = [
    { path: 'chart-editor', label: 'Chart Editor' }
  ];
  navLinks5 = [
    { path: 'sieve-analysis-test', label: 'Sieve Analysis test' },
    { path: 'plastic-limit-test', label: 'Plastic Limit test' },
    { path: 'liquid-limit-test', label: 'Liquid Limit test' },
  ];

  navLinks6 = [
    { path: 'tables', label: 'Tables' }
  ];
  
  navLinks7 = [
    { path: 'documents', label: 'Documents' },
  ];

  
  constructor( private auth: AuthenticationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public route: ActivatedRoute, public router: Router ) { 
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
    // this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);

    if(this.route.firstChild){
      this.route.firstChild.url.subscribe( UrlSegment => {
        if(UrlSegment[0].path=='personal-data' || UrlSegment[0].path=='credit-cards'|| UrlSegment[0].path=='activities'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteAccount();
          }
          return this.routeAccount();
        }
        if(UrlSegment[0].path=='text-editor'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteEditor();
          }
          return this.routeEditor();
        }
        if(UrlSegment[0].path=='sieve-analysis-test'|| UrlSegment[0].path=='plastic-limit-test'|| UrlSegment[0].path=='liquid-limit-test'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteForm();
          }
          return this.routeForm();
        }
        if(UrlSegment[0].path=='chart-editor'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteCharts();
          }
          return this.routeCharts();
        }
        if(UrlSegment[0].path=='map-editor'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteMaps();
          }
          return this.routeMaps();
        }
        if(UrlSegment[0].path=='tables'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteTables();
          }
          return this.routeTables();
        }
        if(UrlSegment[0].path=='documents'){
          if(this.mobileQuery){
            this.isClicked = true;
            return this.mobileRouteDocuments();
          }
          return this.routeDocuments();
        }
      })
    }
  }


  ngOnInit() {
  }

  hideArrow(){
    this.isClicked = !this.isClicked;
  }
  mobileRouteAccount(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Account';
  }
  mobileRouteEditor(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Editor';
  }
  mobileRouteForm(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Form';
  }
  mobileRouteCharts(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Charts';
  }
  mobileRouteMaps(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Maps';
  }
  mobileRouteTables(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Tables';
  }
  mobileRouteDocuments(){
    this.isClicked = !this.isClicked;
    this.sideNav.raw='Documents';
  }

  routeAccount(){
    this.sideNav.raw='Account';
  }
  routeEditor(){
    this.sideNav.raw='Editor';

  }
  routeForm(){
    this.sideNav.raw='Form';
  }
  routeCharts(){
    this.sideNav.raw='Charts';
  }
  routeMaps(){
    this.sideNav.raw='Maps';
  }
  routeTables(){
    this.sideNav.raw='Tables';
  }
  routeDocuments(){
    this.sideNav.raw='Documents';
  }

  leftClick(){
    document.getElementById('my-mat-nav').scrollLeft -= 200;
  }

  rightClick(){
    document.getElementById('my-mat-nav').scrollLeft +=200;
  }
}
