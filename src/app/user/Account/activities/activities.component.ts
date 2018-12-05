import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  constructor( private paymentSvc: AuthenticationService ) { }

  ngOnInit() {
  }
   
  // newtok = this.paymentSvc.myintake();
  

}
