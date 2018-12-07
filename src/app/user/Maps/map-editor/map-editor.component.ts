import { Component, OnInit, DoCheck } from '@angular/core';
import { AgmMap, MouseEvent, AgmDataLayer, GoogleMapsScriptProtocol, LatLngLiteral, AgmPolygon, PolyMouseEvent, PolygonManager, GoogleMapsAPIWrapper } from '@agm/core';
import { } from '@types/googlemaps';
import { Polygon,Marker,Point,LatLng } from '@agm/core/services/google-maps-types';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})


export class MapEditorComponent implements OnInit, DoCheck {

  markers: marker[]=[];
  myArray: LatLngLiteral[]=[];
  paths : Array<LatLngLiteral> = [];
  mypolygon;
  
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  mylatlng:LatLngLiteral={lat:51.673858, lng:7.815982};

  constructor( private mapsWrapper:GoogleMapsAPIWrapper ) { }

  ngOnInit() {
  }
  
  ngDoCheck(){
  }

  clickedMarker(label: string, index: number) {
   console.log(`clicked the marker: ${label || index}`)
  }
   
  mapClicked($event: MouseEvent) {
     this.markers.push({
     lat: $event.coords.lat,
     lng: $event.coords.lng,
    //  draggable: true
   });
  }

  clicked(clickEvent) {
    console.log(clickEvent);
  }
   
  styleFunc(feature) {
    return ({
      clickable: false,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }
  check1(){
    // this.mylatlng.Latlng(-10,10);
    var x = new google.maps.LatLng(51.673858, 7.815982)
    var isValidDeliveryAddress = Boolean(this.mapsWrapper.containsLocation(x, this.mypolygon));
    console.log(isValidDeliveryAddress);
  }
   
  workit(){
    this.myArray = this.markers ;
    this.myArray.push(this.markers[0]);
    this.paths = this.myArray;

    this.mypolygon = new google.maps.Polygon({paths: this.paths})
    // .then((polygon: any) => {
    //   this.mypolygon = polygon
    // });
     
    //   var isValidDeliveryAddress = Boolean(this.mapsWrapper.containsLocation(mylatlng, 
    //    mypolygon));

    // console.log(isValidDeliveryAddress)

    // var mylatlng: LatLngLiteral
    // mylatlng={lat:this.lat, lng:this.lng};
    
    // this.marks.addListener('event', function(e){});
      // var e = new function(){
      //   var lat:number=51.673858;
      //   var lng:number=7.815982;
      //   // lat()
      //   this.mapsWrapper.containsLocation(e , mypolygon)
      //   var mn : Point={51.673858,7.815982}
      //   mn=
      //   // mn.constructor(51.673858,7.815982)
      //   mn.lat();
      //   // mn.lng();
        
      // }


  //  var mapMarker = this.mapsWrapper.createMarker({
  //   position: mylatlng,
  //   draggable: true,
  //   clickable: false
  // }).then((data) => {
  //   console.log(data);
  //   data.addListener('dragend', (e) => {
  //     console.log(e.latLng);

  //   });
  // });
    
  }

  workitnot(){
    this.markers= [];
    this.paths = [];
  }
    
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  } 
   
  //  markers: marker[] = [
  //    {
  //      lat: 51.673858,
  //      lng: 7.815982,
  //     //  label: 'A',
  //     //  draggable: true
  //    },
  //    {
  //      lat: 51.373858,
  //      lng: 7.215982,
  //     //  label: 'B',
  //     //  draggable: false
  //    },
  //    {
  //      lat: 51.723858,
  //      lng: 7.895982,
  //     //  label: 'C',
  //     //  draggable: true
  //    }
  //  ]

}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	// label?: string;
	// draggable: boolean;
}


// interface LatLng {
//   constructor(lat: number, lng: number): void;
//   LatLng(lat: number, lng: number , noWrap: boolean)
//   lat(): number;
//   lng(): number;
//   toString(): string;
// }
