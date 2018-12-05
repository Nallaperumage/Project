import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service'

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  details: UserDetails;

  constructor( private auth: AuthenticationService ) { }

  ngOnInit() {
    // this.auth.profile().subscribe(user => {
    //   this.details = user;
    // }, (err) => {
    //   console.error(err);
    // });
    this.details = this.auth.getUserDetails();
  }

}
