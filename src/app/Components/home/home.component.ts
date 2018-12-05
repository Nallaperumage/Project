import { Component, ChangeDetectorRef, OnInit, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  }
)

export class HomeComponent implements OnInit, DoCheck, OnDestroy {

  title: string = 'My first AGM project';
  latitudes: number = 7.258950542133587;
  longitudes: number = 80.59765040874481;
  zoom: number = 15;
  locationChosen = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  // @ViewChild('map') gmapElement: any;
  // map: google.maps.Map;
  
  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router ) {
      this.mobileQuery = media.matchMedia('(max-width: 991px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

     
  }

  ngOnInit() {
    if (this.router.isActive('/',true)) {
      window.onscroll = function() { 
        var middle = document.getElementById('middle-column');
        // var boundingMiddle = middle.getBoundingClientRect();

        let y = window.pageYOffset;
        let x = window.screen.width;
 
        if(y>50){
          document.getElementById("caro-ctrl").classList.add("caro-remover");
          // document.getElementById("left-column").classList.add("move-right");
          // document.getElementById("right-column").classList.add("move-left");
        }
        else{
          document.getElementById("caro-ctrl").classList.remove("caro-remover");
          // document.getElementById("left-column").classList.remove("move-right");
          // document.getElementById("right-column").classList.remove("move-left");
        }
      }

        
    }
  
    //   // let x = window.screen.width;
  
  
    //   function topInView(){
    //     var top = document.getElementById('left-column');
    //     var boundingTop = top.getBoundingClientRect();

    //     if(x<=991 && (window.innerHeight-boundingTop.top)>100){
    //       document.getElementById("left-column").classList.add("move-right");
    //     }
    //     else{
    //       document.getElementById("left-column").classList.remove("move-right");
    //     }
    //   }
    //   function middleInView(){
    //     var middle = document.getElementById('middle-column');
    //     var boundingMiddle = middle.getBoundingClientRect();

    //     if(x<=991 && (window.innerHeight-boundingMiddle.top)>100){
    //       document.getElementById("middle-column").classList.add("move-left");
    //     }
    //     else{
    //       document.getElementById("middle-column").classList.remove("move-left");
    //     }
    //   }
    //   function bottomInView(){
    //     var bottom = document.getElementById('right-column');
    //     var boundingBottom = bottom.getBoundingClientRect(); 

    //     if(x<=991 && (window.innerHeight-boundingBottom.top)>100){
    //       document.getElementById("right-column").classList.add("move-right");
    //     }
    //     else{
    //       document.getElementById("right-column").classList.remove("move-right");
    //     }
    //   }
  
    //   topInView();
    //   bottomInView();
    //   middleInView();
    // }
         
      // }


    
    
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

   

  ngDoCheck(){
    
  }

  ngOnDestroy(){
    window.onscroll;
    window.removeEventListener;
  }


  onChoseLocation(event){
    console.log(event);
    this.latitudes = event.coords.lat;
    this.longitudes = event.coords.lng;
    this.locationChosen = true;
  }

  login() {
    this.router.navigate(['login']);
  }

}