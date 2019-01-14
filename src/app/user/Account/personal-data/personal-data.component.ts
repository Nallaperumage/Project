import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../../Services/authentication.service'

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  details: UserDetails;
  checked = false;

  constructor( private auth: AuthenticationService ) { }

  ngOnInit() {
    // this.auth.profile().subscribe(user => {
    //   this.details = user;
    // }, (err) => {
    //   console.error(err);
    // });

    this.details = this.auth.getUserDetails();
    this.auth.profileRead().subscribe(data =>{
      console.log(data)
      if(data == 'available'){
        return this.checked=true;
      }
      return this.checked=false;
    });
  }

  changed(){
    if(this.checked==false){
      console.log('in')
      return this.auth.profileSet('unavailable').subscribe(data =>{
        console.log('inin')
        console.log(data)
      });
    }
    console.log('out')
    return this.auth.profileSet('available').subscribe(data =>{
      console.log('outout')
      console.log(data)
    });
  }

}
