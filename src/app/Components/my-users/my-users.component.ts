import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService, UserDetails } from '../../Services/authentication.service';

@Component({
  selector: 'app-my-users',
  templateUrl: './my-users.component.html',
  styleUrls: ['./my-users.component.scss']
})
export class MyUsersComponent implements OnInit {

  panelOpenState: boolean = false;
  isClicked = false;
  isAccountClicked = false;
  isEditorClicked = false;
  isFormClicked = false;
  isChartsClicked = false;
  isMapsClicked = false;
  isTablesClicked = false;
  isDocumentsClicked = false;

  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor( private auth: AuthenticationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.largeQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.largeQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
  }

  hideArrow(){
    this.isClicked = !this.isClicked;
  }
  mobileRouteAccount(){
    this.isClicked = !this.isClicked;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isAccountClicked = true;
  }
  mobileRouteEditor(){
    this.isClicked = !this.isClicked;
    this.isAccountClicked = false;
    this.isFormClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isEditorClicked = true;
  }
  mobileRouteForm(){
    this.isClicked = !this.isClicked;
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isFormClicked = true;
  }
  mobileRouteCharts(){
    this.isClicked = !this.isClicked;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isChartsClicked = true;
  }
  mobileRouteMaps(){
    this.isClicked = !this.isClicked;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
    this.isMapsClicked = true;
  }
  mobileRouteTables(){
    this.isClicked = !this.isClicked;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = true;
    this.isDocumentsClicked = false;
  }
  mobileRouteDocuments(){
    this.isClicked = !this.isClicked;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isAccountClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = true;
  }



  routeAccount(){
    this.isAccountClicked = true;
    this.isFormClicked = false;
    this.isEditorClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeEditor(){
    this.isAccountClicked = false;
    this.isEditorClicked = true;
    this.isFormClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;

  }
  routeForm(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormClicked = true;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeCharts(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormClicked = false;
    this.isChartsClicked = true;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeMaps(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = true;
    this.isTablesClicked = false;
    this.isDocumentsClicked = false;
  }
  routeTables(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = true;
    this.isDocumentsClicked = false;
  }
  routeDocuments(){
    this.isAccountClicked = false;
    this.isEditorClicked = false;
    this.isFormClicked = false;
    this.isChartsClicked = false;
    this.isMapsClicked = false;
    this.isTablesClicked = false;
    this.isDocumentsClicked = true;
  }

  leftClick(){
    document.getElementById('my-mat-nav').scrollLeft -= 200;
  }

  rightClick(){
    document.getElementById('my-mat-nav').scrollLeft +=200;
  }

}
