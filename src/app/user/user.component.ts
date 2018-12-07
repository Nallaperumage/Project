import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

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
  isFormsClicked = false;
  isChartsClicked = false;
  isMapsClicked = false;
  isTablesClicked = false;
  isDocumentsClicked = false;

  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;

  // fillerNav = Array(10).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array(10).fill(0).map(() =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat.`);

  private _mobileQueryListener: () => void;

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

  navLinks4 = [
    { path: 'chart-editor', label: 'Chart Editor' },
  ];

  navLinks6 = [
    { path: 'tables', label: 'Tables' },
  ];
  
  navLinks7 = [
    { path: 'documents', label: 'Documents' },
  ];

  
  constructor( private auth: AuthenticationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ) { 
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
    // this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);
  }


  ngOnInit() {

  }

  hideArrow(){
    this.isClicked = !this.isClicked;
  }
  mobileRouteAccount(){
    this.isClicked = !this.isClicked;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isAccountClicked = !this.isAccountClicked;
  }
  mobileRouteEditor(){
    this.isClicked = !this.isClicked;
    this.isAccountClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isEditorClicked = !this.isEditorClicked;
  }
  mobileRouteforms(){
    this.isClicked = !this.isClicked;
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = !this.isFormsClicked;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  mobileRouteCharts(){
    this.isClicked = !this.isClicked;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = !this.isChartsClicked;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  mobileRouteMaps(){
    this.isClicked = !this.isClicked;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = !this.isMapsClicked;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  mobileRouteTables(){
    this.isClicked = !this.isClicked;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = !this.isTablesClicked;
    this.isDocumentsClicked = false;
  }
  mobileRouteDocuments(){
    this.isClicked = !this.isClicked;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = !this.isDocumentsClicked;
  }



  routeAccount(){
    this.isAccountClicked = true;
    this.isFormsClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeEditor(){
    this.isAccountClicked = false;
    this.isEditorClicked = true;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;

  }
  routeforms(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = true;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeCharts(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = true;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeMaps(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = true;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeTables(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = true;
    this.isDocumentsClicked = false;
  }
  routeDocuments(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormsClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = true;
  }

  leftClick(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    document.getElementById('my-mat-nav').scrollLeft -= 200;
  }

  rightClick(){
    let y = document.getElementById('my-mat-nav').scrollLeft +=200;

  }
}
