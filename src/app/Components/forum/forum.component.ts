import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     var date = new Date();
     var days = 31;
     var x = date.setDate(date.getDate()+7);
     console.log(x)
  }

}
