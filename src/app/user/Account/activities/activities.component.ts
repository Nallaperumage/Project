import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  showSpinner=true;
  assignments = [
  //   {
  //   customerEmail :'',
  //   geologistEmail : '',
  //   investigationName : '',
  //   dueDate : '',
  //   startDate : '',
  //   fullCharge : 0,
  //   downPayment : 0,
  //   clearance : 0,
  //   fine : 0,
  //   completion : ''
  // }
  ];

  constructor( private auth: AuthenticationService ) { }

  ngOnInit() {
    this.auth.activityRead().subscribe(data=>{
      data.forEach(element => {
        this.assignments.push(element);
      })
      this.showSpinner=false;
    });
    
  }
   
  // newtok = this.paymentSvc.myintake();
  

}
