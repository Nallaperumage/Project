import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AgmMap, MouseEvent, AgmDataLayer, GoogleMapsScriptProtocol, LatLngLiteral, AgmPolygon, PolyMouseEvent, PolygonManager, GoogleMapsAPIWrapper } from '@agm/core';
import { } from '@types/googlemaps';
import { Polygon,Marker,Point,LatLng } from '@agm/core/services/google-maps-types';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../../../Services/authentication.service';
import { marker } from '../../../Models/data.model'


declare var Wkt: any;
declare var jsts: any;


@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss'],
})


export class MapEditorComponent implements OnInit {
  
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  markers: marker[]=[];
  myArray: LatLngLiteral[]=[];
  paths : Array<LatLngLiteral> = [];
  paths2 : Array<LatLngLiteral> =[];
  mypolygon;
  polygon1;
  polygon2;
  databasePolygons;
  floodInsert =false;
  submitInfo;

  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 7.258950542133587;
  lng: number = 80.59765040874481;

  mylatlng:LatLngLiteral={lat:7.258950542133587, lng:80.59765040874481};

  geoJsonObject = {
    type: "FeatureCollection",
    features: []
  }
  intresection = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor( private mapsWrapper:GoogleMapsAPIWrapper, private _formBuilder: FormBuilder,
    private auth: AuthenticationService, public router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl1: ['', Validators.required],
      thirdCtrl2: ['', Validators.required],
      thirdCtrl3: ['', Validators.required]
    });
  }

  getPolygons(){
    this.router.navigate(['user/map-editor','getCheck']);
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {
        console.log(element.polygon)
      });
    });
  }

  getFloodDetail(){
    this.polygon1 = this.mypolygon;
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {
        var pathToHell = element.polygon
        this.polygon2 = new google.maps.Polygon({paths:pathToHell}) ;
        var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);
        if(this.UseJstsToTestForIntersects(wkt[0], wkt[1])){
          if(this.UseJstsToTestForIntersection(wkt[0], wkt[1])!= null){
            var intersectionWkt = this.UseJstsToTestForIntersection(wkt[0], wkt[1]);
            var intersectionGeoJSON = this.UseWicketToCreateGeoJSON(intersectionWkt);
            this.geoJsonObject.features.push(
              {
                "type": "Feature",
                "properties": {
                  "letter": " Flood Intersection",
                  "color": "red",
                  "rank": "7",
                  "ascii": "71"
                },
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [intersectionGeoJSON.coordinates[0]]
                }
              }
            ) 
          } 
        }
      });
    });
  }


  UseWicketToGoFromGooglePolysToWKT(poly1, poly2) {
    var wicket = new Wkt.Wkt();
    wicket.fromObject(poly1);
    var wkt1 = wicket.write();

    wicket.fromObject(poly2);
    var wkt2 = wicket.write();

    return [wkt1, wkt2];
  }

  UseWicketToCreateGeoJSON(poly1) {
    var wicket = new Wkt.Wkt(poly1);
    var geoJSON = wicket.toJson();
    return geoJSON;
  }

  UseJstsToTestForIntersection(wkt1, wkt2) {
    // Instantiate JSTS WKTReader and get two JSTS geometry objects
    var wktReader = new jsts.io.WKTReader();
    var wktWriter = new jsts.io.WKTWriter();
    var geom1 = wktReader.read(wkt1);
    var geom2 = wktReader.read(wkt2);

    if (geom2.intersects(geom1)) {
      // console.log('Intersects');
      var intersectionPath = wktWriter.write(geom2.intersection(geom1))
      return intersectionPath;
    } else {
      // console.log('No intersection');
      return null;
    }
  }

  UseJstsToTestForIntersects(wkt1, wkt2) {
    // Instantiate JSTS WKTReader and get two JSTS geometry objects
    var wktReader = new jsts.io.WKTReader();
    var geom1 = wktReader.read(wkt1);
    var geom2 = wktReader.read(wkt2);

    if (geom2.intersects(geom1)) {
      // alert('intersection confirmed!');
      console.log('Intersects');
      return true;
    } else {
      // alert('..no intersection.');
      console.log('No intersection');
      return false;
    }
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

  floodCheckButton(){
    this.polygon1 = this.mypolygon;
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {
        var pathToHell = element.polygon
        this.polygon2 = new google.maps.Polygon({paths:pathToHell}) ;
        var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);
        this.UseJstsToTestForIntersects(wkt[0], wkt[1]);
      });
    });  
  }

  floodDetailButton(){
    this.getFloodDetail();
    setTimeout(t=>{
      this.intresection = true;
    }, 100)
    
  }

  floodDetailsResetButton(){
    this.geoJsonObject.features = [];
    this.intresection = false;
  }

  floodInsertButton(){
    if(this.markers.length>2){
      this.myArray = this.markers ;
      this.myArray.push(this.markers[0]);
      this.paths = this.myArray;
      if(this.paths.length>2){
        if(this.thirdFormGroup.value.thirdCtrl3 != ''){
          var token1= {
            date: this.thirdFormGroup.value.thirdCtrl1.toDateString(),
            email: this.thirdFormGroup.value.thirdCtrl2,
            customerEmail: this.thirdFormGroup.value.thirdCtrl3
          }
          return this.auth.floodInsert(token1,this.paths).subscribe(info=>{
            if(info == 'Inserted'){
              this.submitInfo = 'You have successfully inserted data';
              document.getElementById("status").classList.add("success-status");
              return setTimeout(t=>{
                document.getElementById("status").classList.remove("success-status");
                this.submitInfo='';
                this.markers = [];
                this.paths = [];
                this.myArray =[];
              },2000); 
            }
            this.submitInfo = 'Data Insertion Unsuccessful!';
            document.getElementById("status").classList.add("fail-status");
            return setTimeout(t=>{
              document.getElementById("status").classList.remove("fail-status");
              this.submitInfo='';
              this.markers = [];
              this.paths = [];
                this.myArray =[];
            },2000)
          });
        }
        var token2= {
          date: this.thirdFormGroup.value.thirdCtrl1.toDateString(),
          email: this.thirdFormGroup.value.thirdCtrl2,
          customerEmail: ''
        }
        return this.auth.floodInsert(token2,this.paths).subscribe(info =>{
          if(info == 'Inserted'){
            this.submitInfo = 'You have successfully inserted data';
            document.getElementById("status").classList.add("success-status");
            return setTimeout(t=>{
              document.getElementById("status").classList.remove("success-status");
              this.submitInfo='';
              this.markers = [];
              this.paths = [];
              this.myArray =[];
            },2000); 
          }
          this.submitInfo = 'Data Insertion Unsuccessful!';
          document.getElementById("status").classList.add("fail-status");
          return setTimeout(t=>{
            document.getElementById("status").classList.remove("fail-status");
            this.submitInfo='';
            this.markers = [];
            this.paths = [];
            this.myArray =[];
          },2000)
        });
        
      }
    }
    this.submitInfo = 'No polygon detected';
    document.getElementById("status").classList.add("fail-status");
    return setTimeout(t=>{
      document.getElementById("status").classList.remove("fail-status");
      this.submitInfo='';
    },2000)
    
  }
   
  createDummyPolygon(){
    if(this.markers.length>2){
      this.myArray = this.markers ;
      this.myArray.push(this.markers[0]);
      this.paths = this.myArray;
      this.mypolygon = new google.maps.Polygon({paths: this.paths});
      this.secondFormGroup.setValue({
        secondCtrl: 'carryOn'
      });
    }
  }

  resetDummyPolygon(){
    this.markers= [];
    this.paths = [];
    this.secondFormGroup.setValue({
      secondCtrl: ''
    });
  }
    
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  } 

  typeInsert(){
    var value= this.firstFormGroup.value;
    if(value.firstCtrl != ''){
      if(value.firstCtrl == 'flood'){
        return this.floodInsert =true;
      }
    }
    return this.floodInsert =false;
    
    
  }
   
}
