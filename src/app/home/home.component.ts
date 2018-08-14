import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  }
)

export class HomeComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
    window.onscroll = function() {
      let y = window.pageYOffset;
      if (y>50) {
        document.getElementById("caro-ctrl").classList.add("caro-remover");
      } 
      else {
        document.getElementById("caro-ctrl").classList.remove("caro-remover");
      }
    }
  }

}