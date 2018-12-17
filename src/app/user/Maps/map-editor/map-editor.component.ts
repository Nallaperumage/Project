import { Component, OnInit } from '@angular/core';
import { AgmMap, MouseEvent, AgmDataLayer, GoogleMapsScriptProtocol, LatLngLiteral, AgmPolygon, PolyMouseEvent, PolygonManager, GoogleMapsAPIWrapper } from '@agm/core';
import { } from '@types/googlemaps';
import { Polygon,Marker,Point,LatLng } from '@agm/core/services/google-maps-types';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})


export class MapEditorComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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

  constructor( private mapsWrapper:GoogleMapsAPIWrapper, private _formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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
    var x = new google.maps.LatLng(51.673858, 7.815982)
    var isValidDeliveryAddress = Boolean(this.mapsWrapper.containsLocation(x, this.mypolygon));
    console.log(isValidDeliveryAddress);
  }
   
  workit(){
    this.myArray = this.markers ;
    this.myArray.push(this.markers[0]);
    this.paths = this.myArray;
    this.mypolygon = new google.maps.Polygon({paths: this.paths})   
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
  //    }
  //  ]

}

interface marker {
	lat: number;
	lng: number;
	// label?: string;
	// draggable: boolean;
}
