import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { AgmMap, MouseEvent, AgmDataLayer, GoogleMapsScriptProtocol, LatLngLiteral, AgmPolygon, PolyMouseEvent, PolygonManager, GoogleMapsAPIWrapper } from '@agm/core';
import { } from '@types/googlemaps';
import { Polygon, Marker, Point, LatLng } from '@agm/core/services/google-maps-types';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../../Services/authentication.service';
import { marker } from '../../Models/data.model';

import { environment } from '../../../environments/environment';

declare var Wkt: any;
declare var jsts: any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  showFloodCheckContent = false;
  showLandslideCheckContent = false;
  showStabilityCheckContent = false;
  showWaterTableCheckContent = false;
  showWaterConstituentCheckContent = false;
  showMappingCheckContent = false;

  isLinear = true;
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

  message;

  handler:any;
  amount = 2000;
  paymentMessage;
  payment= {
    charge: 0,
    discount: 0,
    email: '',
    paid: false,
    payment: 0,
    status: ''
  }

  // google maps zoom level
  zoom: number = 5;
  
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

  constructor( private mapsWrapper:GoogleMapsAPIWrapper, private _formBuilder: FormBuilder, private auth: AuthenticationService,
    public router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private paymentSvc: AuthenticationService) {
      this.mobileQuery = media.matchMedia('(max-width: 800px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }
 
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [{value: '',disabled: false}, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [{value: '',disabled: false}, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [{value: '',disabled: false}, Validators.required]
    });

    //**Payment Lifecycles Start **
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        var service = this.firstFormGroup.value;
        this.paymentSvc.processPayment2(token, service.firstCtrl).subscribe( data =>{
          this.payment.paid = data.paid;
          this.payment.charge = data.charge;
          this.payment.discount = data.discount;
          this.payment.email = data.email;
          this.payment.status = data.status;
          this.payment.payment = data.payment;
          this.thirdFormGroup.setValue({
            thirdCtrl : data.status
          });
        }); 
      }
    })

  }

  getPolygons(){
    this.router.navigate(['user/map-editor','getCheck']);
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {
        // console.log(element.polygon)
      });
    });
  }

  getFloodDetail(){
    this.polygon1 = this.mypolygon;
    this.auth.dataCheck().subscribe(data=>{
      var pathToHell = data.polygon
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
                "letter": " Flood Coverage",
                "color": "blue",
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
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {
        console.log(element);
        var pathToHell = element.polygon
        this.polygon2 = new google.maps.Polygon({paths:pathToHell}) ;
        var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);
        if(this.UseJstsToTestForIntersects(wkt[0], wkt[1])){
          if(this.UseJstsToTestForIntersection(wkt[0], wkt[1])!= null){
            var intersectionWkt = this.UseJstsToTestForIntersection(wkt[0], wkt[1]);
            var intersectionGeoJSON = this.UseWicketToCreateGeoJSON(intersectionWkt);
            console.log(intersectionGeoJSON.coordinates[0])
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
      // console.log('Intersects');
      return true;
    } else {
      // alert('..no intersection.');
      // console.log('No intersection');
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
  }

  submitService(){
    var formValue = this.firstFormGroup.value;

      if(formValue.firstCtrl == 'flood'){
        return this.showFloodCheckContent = true;
      }
      if(formValue.firstCtrl == 'landslide'){
        this.showFloodCheckContent = true;
      }
      if(formValue.firstCtrl == 'stability'){
        this.showFloodCheckContent = true;
      }
      if(formValue.firstCtrl == 'waterTable'){
        this.showFloodCheckContent = true;
      }
      if(formValue.firstCtrl == 'WaterConstituent'){
        this.showFloodCheckContent = true;
      }
      if(formValue.firstCtrl == 'mapping'){
        this.showFloodCheckContent = true;
      }
   
  }

  UseJstsToTestForCovers(wkt1, wkt2){
      // Instantiate JSTS WKTReader and get two JSTS geometry objects
      var wktReader = new jsts.io.WKTReader();
      var wktWriter = new jsts.io.WKTWriter();
      var geom1 = wktReader.read(wkt1);
      var geom2 = wktReader.read(wkt2);
  
      if (geom2.covers(geom1)) {
        // console.log('covers');
        return true;
      } else {
        // console.log('Not cover');
        return false;
      }
  }

  dataCheckButton(){
    this.polygon1 = this.mypolygon;
    this.auth.dataCheck().subscribe(data=>{
      console.log(data)
      var pathToHell = data.polygon
      this.polygon2 = new google.maps.Polygon({paths:pathToHell}) ;
      var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);

      if(this.UseJstsToTestForCovers(wkt[0], wkt[1])){

        this.message = 'Requested Data can be Served ! Please click "Next" to continue';
        this.secondFormGroup.setValue({
          secondCtrl : wkt[0]
        });
        document.getElementById("status").classList.add("success-status");

        return setTimeout(t=>{
          this.message='';
          document.getElementById("status").classList.remove("success-status");
        },2000);
      }
      if(this.UseJstsToTestForIntersects(wkt[0], wkt[1])){

        this.message = 'Part of requested Data can be Served ! Please click "Next" to continue';
        this.secondFormGroup.setValue({
          secondCtrl : wkt[1]
        });
        document.getElementById("status").classList.add("success-status");

        return setTimeout(t=>{
          this.message='';
          document.getElementById("status").classList.remove("success-status");
        },2000);
      }

      this.message='Requested Data can "NOT" be Served ! Please request for a investigation';
      document.getElementById("status").classList.add("fail-status");
      return setTimeout(t=>{
        document.getElementById("status").classList.remove("fail-status");
        this.message='';
      },2000)

    }, error =>{
      console.log(error)
      this.message='Error Occured '+error;
      document.getElementById("status").classList.add("fail-status");
      return setTimeout(t=>{
        document.getElementById("status").classList.remove("fail-status");
        this.message='';
      },2000)
    });
  
  }

  floodCheckButton(){
    this.polygon1 = this.mypolygon;
    this.auth.floodCheck().subscribe(data=>{
      data.forEach(element => {

        var pathToHell = element.polygon
        this.polygon2 = new google.maps.Polygon({paths:pathToHell}) ;
        var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);

        if(this.UseJstsToTestForIntersects(wkt[0], wkt[1])){

          this.message = 'Requested Data can be Served ! Please click "Next" to continue';
          this.secondFormGroup.setValue({
            secondCtrl : wkt[1]
          });
          document.getElementById("status").classList.add("success-status");

          return setTimeout(t=>{
            this.message='';
            document.getElementById("status").classList.remove("success-status");
          },2000);
        } 
      });
console.log('movinon')
      this.message = 'You are Safe!';
      document.getElementById("status").classList.add("success-status");
      return setTimeout(t=>{
        this.message='';
        document.getElementById("status").classList.remove("success-status");
      },4000);

    }, error =>{
      console.log('closinon')
      this.message='Requested Data can "NOT" be Served ! Please request for a investigation';
        document.getElementById("status").classList.add("fail-status");
        return setTimeout(t=>{
          document.getElementById("status").classList.remove("fail-status");
          this.message='';
        },2000)
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
    this.myArray = this.markers ;
    this.myArray.push(this.markers[0]);
    this.paths = this.myArray;
    this.auth.floodInsert(this.thirdFormGroup.value,this.paths);
  }
   
  createDummyPolygon(){
    if(this.markers.length>2){
      this.myArray = this.markers ;
      this.myArray.push(this.markers[0]);
      this.paths = this.myArray;
      this.mypolygon = new google.maps.Polygon({paths: this.paths});
      document.getElementById("status").classList.add("success-status");
      this.message='Polygon has been created !';
      return setTimeout(t=>{
        document.getElementById("status").classList.remove("success-status");
        this.message='';
      },2000);  
    }
    this.message='Polygon has "NOT" been created !';
    document.getElementById("status").classList.add("fail-status");
    return setTimeout(t=>{
      document.getElementById("status").classList.remove("fail-status");
      this.message='';
    },2000)
  }

  resetDummyPolygon(){
    this.markers= [];
    this.paths = [];
    this.secondFormGroup.setValue({
      secondCtrl : ''
    })
    document.getElementById("status").classList.add("fail-status");
    this.message='Polygon has been disposed !';
    return setTimeout(t=>{
      document.getElementById("status").classList.remove("fail-status");
      this.message='';
    },2000); 
  }
    
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  } 

  // **Payment Function division Starts**

  // document.getElementById('customButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handlePayment() {
      this.handler.open({
        name: 'SLGSP',
        description: 'Service Payment',
        amount: this.amount
      });
      //   e.preventDefault();
      // });
    }
      
      // Close Checkout on page navigation:
    @HostListener('window:popstate')
    onPopstate() {
      // window.addEventListener('popstate', function() {
        this.handler.close();
      // });
    }

}