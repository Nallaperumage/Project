import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { RegisterUser } from '../../user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: RegisterUser = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  

  ngOnInit() {
    this.resetForm();
  }

  register() {
    this.auth.register(this.user).subscribe( data => {
      alert(data.data);
      this.router.navigate(['user/profile']);
    }, (err) => {
      console.error(err);
    });
  }

  // onSave = function( user, isValid: boolean ) {    
  //   user.mode= this.valbutton;  
  //    this.DataService.saveUser(user)  
  //    .subscribe(data =>  {  alert(data.data); 
  //    }   
  //    , error => this.errorMessage = error )  
       
  //  } 

  resetForm = function( form? : NgForm ){
    if( form != null )
      form.reset();
      this.user = {
        firstName : '',
        lastName : '',
        userName : '',
        email : '',
        password : '',
        role : ''
      }
    
  }

  afterSubmit(){
    this.router.navigate(['user/personal-data']);
  }

}
