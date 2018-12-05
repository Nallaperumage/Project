import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

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
