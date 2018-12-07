import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';
import { Chart } from 'chart.js';
import { location} from './data.model';

import {} from '@types/googlemaps';

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
  latitudes: number = 7.258950542133587;
  longitudes: number = 80.59765040874481;
  zoom: number = 15;
  locationChosen = false;
 


  constructor( private chartData: AuthenticationService, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // var mydata;
    // var ctx = document.getElementById("myChart");
    // var myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //     //   labels: [],
    //       datasets: [{
    //         // label: '# of Votes',
    //         data: mydata ,
    //         // [
    //         //     {
    //         //         x: 0.075,
    //         //         y: 0.08
    //         //     },
    //         //     {
    //         //         x: 0.150,
    //         //         y: 1.62
    //         //     },
    //         //     {
    //         //         x: 0.300,
    //         //         y: 3.98
    //         //     },
    //         //     {
    //         //         x: 0.425,
    //         //         y: 9.98
    //         //     },
    //         //     {
    //         //         x: 0.600,
    //         //         y: 16.13
    //         //     },
    //         //     {
    //         //         x: 1.180,
    //         //         y: 23.80
    //         //     },
    //         //     {
    //         //         x: 2.000,
    //         //         y: 48.38
    //         //     },
    //         //     {
    //         //         x: 4.750,
    //         //         y: 67.74
    //         //     },
    //         //     {
    //         //         x: 8.00,
    //         //         y: 90.32
    //         //     }],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)'
    //         ],
    //         borderColor: [
    //           'rgba(255,99,132,1)'
    //         ],
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
                 
    //             min: 0,
    //             max: 100,
    //             beginAtZero: true
    //           }
    //         }],
    //         xAxes:[{
    //             type: 'logarithmic',
    //             ticks: {
    //                 min: 0,
    //                 max: 10,
    //                 beginAtZero: true,
    //                 callback: function(value, index, values) {
    //                     return value;
    //                 }
    //             }
    //         }]
    //       }
    //     }
    // });
    // console.log(myChart);
    
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
    this.chartData.chartData(this.test, this.location);
  }

  onChoseLocation(event){
    console.log(event);
  }

}
