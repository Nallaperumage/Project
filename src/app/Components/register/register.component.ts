import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../Services/authentication.service';
import { RegisterUser } from '../../Models/user.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  userNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  roleFormControl = new FormControl('', [
    Validators.required,
  ]);
  roleTokenFormControl = new FormControl('', [
    Validators.required,
  ]);
  hide = true;

  matcher = new MyErrorStateMatcher();

  user: RegisterUser = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: ''
  };
  
 

  constructor( private auth: AuthenticationService, private router: Router ) { }

  ngOnInit() {
  }

  register() {
    this.user.firstName = this.firstNameFormControl.value;
    this.user.lastName= this.lastNameFormControl.value;
    this.user.userName= this.userNameFormControl.value;
    this.user.email= this.emailFormControl.value;
    this.user.password= this.passwordFormControl.value;
    this.user.role= this.roleFormControl.value;

    this.auth.register(this.user).subscribe( data => {
      this.router.navigate(['user/profile']);
    }, (err) => {
      console.error(err);
    });
  }

  afterSubmit(){
    this.router.navigate(['user/personal-data']);
  }


}
