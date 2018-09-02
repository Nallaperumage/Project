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
  isPClicked = false;

  mobileQuery: MediaQueryList;
  largeQuery: MediaQueryList;

  // fillerNav = Array(10).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array(10).fill(0).map(() =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat.`);

  private _mobileQueryListener: () => void;

  navLinks = [
    { path: 'personal-data', label: 'Personal Data' },
    { path: 'credit-cards', label: 'Credit Cards' },
    { path: 'activities', label: 'Activilies' }
  ]

  
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

  leftClick(){
    document.getElementById('my-mat-nav').scrollLeft -= 200;
  }

  rightClick(){
    let y = document.getElementById('my-mat-nav').scrollLeft +=200;

  }
}
