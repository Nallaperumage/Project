import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../../services/database.service';  
import { AuthenticationService, LoginUser } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {

  credentials: LoginUser = {
    email: '',
    password: ''
  };
  errorMsg;
  

  constructor( private auth: AuthenticationService, private router: Router, private modalService: NgbModal) {
  }

  valbutton ="Save";
  closeResult: string;  
  details: LoginUser;
  successFlag = false;
  tree = false;
  wrongEmail = false;
  wrongPassword = false;
  loginClicked = false;
  
  
  // constructor( private DataService :DatabaseService ) { }

  ngOnInit() {
    document.getElementById('btnTrigger').click();
    
  } 

  ngDoCheck(){
    // this.auth.login(this.credentials).subscribe(user => {
    //   this.details = user;
    //   this.successFlag = true;
    // }, (err) => {
    //   // let x = Observable.throw(this.errorHandler.message);
    //   let x = err;
    //   console.error(err);
    // });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  

  login() {
    this.auth.login(this.credentials).subscribe( data => {
      alert(data.data);
      document.getElementById('btnTrigger').click();
      this.router.navigate(['user/personal-data']);
    }, (err) => {
      this.errorMsg = err;
      console.error(err);
    });

    // if(this.errorMsg = "Password is wrong"){
    //   this.wrongPassword = true;
    // }
    // if(this.errorMsg = "User not found"){
    //   this.wrongEmail = true;
    // }
    
    this.tree = true;
  }

  loginClose(){
    document.getElementById('btnTrigger').click();
    this.router.navigate(['/']);
  }


  signUp(){
    document.getElementById('btnTrigger').click();
    this.router.navigate(['signUp']);
  }



 
  // onSave = function(user,isValid: boolean) {    
  //   user.mode= this.valbutton;  
  //    this.DataService.saveUser(user)  
  //    .subscribe(data =>  {  alert(data.data);  
          
  //      this.ngOnInit();    
  //    }   
  //    , error => this.errorMessage = error )  
       
  //  } 

}
