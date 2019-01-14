import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Chart } from 'chart.js';
import { location} from '../../../Models/data.model';

import {} from '@types/googlemaps';

import { MediaMatcher } from '@angular/cdk/layout';
import { AgmMap, MouseEvent, AgmDataLayer, GoogleMapsScriptProtocol, LatLngLiteral, AgmPolygon, PolyMouseEvent, PolygonManager, GoogleMapsAPIWrapper } from '@agm/core';
import { Polygon, Marker, Point, LatLng } from '@agm/core/services/google-maps-types';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { marker } from '../../../Models/data.model';

import { environment } from '../../../../environments/environment';

declare var Wkt: any;
declare var jsts: any;

@Component({
  selector: 'app-chart-editor',
  templateUrl: './chart-editor.component.html',
  styleUrls: ['./chart-editor.component.scss']
})

export class ChartEditorComponent implements OnInit, OnDestroy {

  test;
  location? ={
    latitudes : '',
    longitudes : ''
  }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  title: string = 'My first AGM project';
  lat: number = 7.258950542133587;
  lng: number = 80.59765040874481;

  zoom: number = 8;
  locationChosen = false;
 

  showSieveAnalysisContent = false;
  showDirectShearContent = false;
  showTriaxialContent = false;
  showLiquidLimitContent = false;
  showPlasticLimitContent = false;

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
  amount = 20.00;
  paymentMessage;
  payment= {
    charge: 0,
    discount: 0,
    email: '',
    paid: false,
    payment: 0,
    status: ''
  }


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor( private chartData: AuthenticationService,private mapsWrapper:GoogleMapsAPIWrapper,
     private auth: AuthenticationService, private _formBuilder: FormBuilder, public router: Router, 
     media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private paymentSvc: AuthenticationService) {
      this.mobileQuery = media.matchMedia('(max-width: 900px)');
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
  
  ngOnDestroy(){
      // this.done();
  }

  done(){
    var ctr = document.getElementById("myChart") as HTMLCanvasElement;
    var url_base64jp = ctr.toDataURL("image/jpg");
    var url_base64 = ctr.toDataURL("image/png");
    var url_base64pdf = ctr.toDataURL("image/pdf");

    var link1=document.getElementById("link1") as HTMLAnchorElement;
    var link2=document.getElementById("link2") as HTMLAnchorElement;

    link1.href = url_base64;
    link2.href = url_base64pdf;

    var url = link1.href.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  }

  clickme(){
    this.test='test001',
    this.location.latitudes = '7.5555';
    this.location.longitudes = '81.5555';
    this.chartData.chartData(this.test, this.location).subscribe(data=>{
      var mydata = data;
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
          //   labels: [],
            datasets: [{
              // label: '# of Votes',
              data: mydata ,
              // [
              //     {
              //         x: 0.075,
              //         y: 0.08
              //     },
              //     {
              //         x: 0.150,
              //         y: 1.62
              //     },
              //     {
              //         x: 0.300,
              //         y: 3.98
              //     },
              //     {
              //         x: 0.425,
              //         y: 9.98
              //     },
              //     {
              //         x: 0.600,
              //         y: 16.13
              //     },
              //     {
              //         x: 1.180,
              //         y: 23.80
              //     },
              //     {
              //         x: 2.000,
              //         y: 48.38
              //     },
              //     {
              //         x: 4.750,
              //         y: 67.74
              //     },
              //     {
              //         x: 8.00,
              //         y: 90.32
              //     }],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                   
                  min: 0,
                  max: 100,
                  beginAtZero: true
                }
              }],
              xAxes:[{
                  type: 'logarithmic',
                  ticks: {
                      min: 0,
                      max: 10,
                      beginAtZero: true,
                      callback: function(value, index, values) {
                          return value;
                      }
                  }
              }]
            }
          }
      });
    });
  }

  onChoseLocation(event){
    console.log(event);
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
    var x = new google.maps.LatLng(7.258950542133587, 80.59765040874481)
    var isValidDeliveryAddress = Boolean(this.mapsWrapper.containsLocation(x, this.mypolygon));
    if(isValidDeliveryAddress){
      this.message = 'Part of requested Data can be Served ! Please click "Next" to continue';
      this.secondFormGroup.setValue({
        secondCtrl : 'newCreate'
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
  }

  submitService(){
    var formValue = this.firstFormGroup.value;

      if(formValue.firstCtrl == 'sieve'){
        return this.showSieveAnalysisContent = true;
      }
      if(formValue.firstCtrl == 'direct'){
        this.showDirectShearContent = true;
      }
      if(formValue.firstCtrl == 'triaxial'){
        this.showTriaxialContent = true;
      }
      if(formValue.firstCtrl == 'liquid'){
        this.showLiquidLimitContent = true;
      }
      if(formValue.firstCtrl == 'plastic'){
        this.showPlasticLimitContent = true;
      }
  
  }


  

  floodCheckButton(){
 
    this.message = 'Requested Data can be Served ! Please click "Next" to continue';
    this.secondFormGroup.setValue({
      secondCtrl : ''
    });
    document.getElementById("status").classList.add("success-status");

    return setTimeout(t=>{
      this.message='';
      document.getElementById("status").classList.remove("success-status");
    },2000);
        

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
        amount: 2000
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
