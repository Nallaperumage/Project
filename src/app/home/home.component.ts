import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  }
)

export class HomeComponent implements OnInit {

  msg ="";
  tab:number=0;
  name="";

  constructor() { }

  ngOnInit() {
  }

  addItem(){
    this.tab = this.tab+1;
    this.msg ="clicked : "+ this.tab;
  }

}
