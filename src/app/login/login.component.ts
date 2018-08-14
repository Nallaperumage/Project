import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DatabaseService } from '../services/database.service';  
import { AuthenticationService, LoginUser } from '../services/authentication.service';
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: LoginUser = {
    email: '',
    password: ''
  };
  

  constructor(private auth: AuthenticationService, private router: Router, private modalService: NgbModal) {
  }

  valbutton ="Save";
  closeResult: string;  
  
  
  // constructor( private DataService :DatabaseService ) { }

  ngOnInit() {
    document.getElementById('btnTrigger').click();
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
    document.getElementById('btnTrigger').click();
    this.auth.login(this.credentials).subscribe( data => {
      alert(data.data);
      this.router.navigate(['user/profile']);
    }, (err) => {
      console.error(err);
    });
  }

  loginClose(){
    document.getElementById('btnTrigger').click();
    this.router.navigate(['/']);
  }


  signUp(){
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
