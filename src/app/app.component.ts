import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isCollapsed = true;

  constructor(private router : Router){}

  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }


  notification(){
    this.router.navigate(['notification']);
  }

  setting(){
    this.router.navigate(['home']);
  }

  login(){
    this.router.navigate(['login']);
  }

}
