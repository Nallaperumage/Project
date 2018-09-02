import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  }
)

export class HomeComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  // @ViewChild('map') gmapElement: any;
  // map: google.maps.Map;
  
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

    

    // var mapProp = {
    //   center: new google.maps.LatLng(28.4595, 77.0266),
    //   zoom: 14,
    //   // mapTypeId: google.maps.MapTypeId.ROADMAP
    //   mapTypeId: google.maps.MapTypeId.HYBRID
    //   // mapTypeId: google.maps.MapTypeId.SATELLITE
    //   // mapTypeId: google.maps.MapTypeId.TERRAIN
    //   };
      
    //   this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    //   var marker = new google.maps.Marker({ position: mapProp.center });
    //   marker.setMap(this.map);
      
    //   var infowindow = new google.maps.InfoWindow({
    //   content: "Hey, We are here"
    //   });
    //  infowindow.open(this.map, marker); 
  }

 
}