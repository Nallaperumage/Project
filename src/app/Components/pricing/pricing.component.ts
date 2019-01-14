import { Component, OnInit } from '@angular/core';
import { UrlResolver } from '@angular/compiler';
import {FormControl, Validators} from '@angular/forms';

import { Test } from '../../Models/data.model'

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  test: Test={
    name: '',
    duration: '',
    dataPrice: 0,
    carryOutPrice: 0,
    image: [],
    description: ''
  };
  testControl = new FormControl('', [Validators.required]);
  tests = [
    {name: 'SPT', hint: 'standard penetration test'},
    {name: 'direct', hint: 'direct shear test'},
    {name: 'triaxial', hint: 'triaxial shear test'},
    {name: 'thin', hint: 'creating rock thin section'},
  ];
  mine?='';
  showSearches= false;
  
  tiles = [
    {cols: 3, rows: 3},
    {cols: 1, rows: 1},
    {cols: 1, rows: 1},
    {cols: 1, rows: 1},
  ];

  constructor() { }

  ngOnInit() {
    
  }

  pushView1(){
    this.mine = this.test.image[0];
  }
  pushView2(){
    this.mine = this.test.image[1];
  }
  pushView3(){
    this.mine = this.test.image[2];
  }

  search(){
    this.test.name = 'SPT';
    this.test.dataPrice = 5.00;
    this.test.carryOutPrice = 20.00,
    this.test.duration = '1 week';
    this.test.description = 'this is Standard Penetration test. Which commonly called as SPT. Not much experience needed. But have to be done under experienced supervision.'
    this.test.image[0]='assets/SPT.jpeg';
    this.test.image[1]='assets/SPT(2).jpeg';
    this.test.image[2]='assets/SPT(3).jpeg';
    this.mine = this.test.image[0];

    if(this.testControl.value.name == this.test.name){
      this.showSearches = true;
      
    }
  }
  

}
