import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

import { DatabaseService } from '../../Services/database.service';  
import { AuthenticationService, LoginUser } from '../../Services/authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  recoverEmail?='';
  errorMsg?;
  errorPass?;
  errorUser?;
  errorServer?;
  forgotPass=false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  valbutton ="Save";
  closeResult: string;  
  details: LoginUser;
  successFlag = false;
  tree = false;
  wrongEmail = false;
  wrongPassword = false;
  loginClicked = false;
  token: string;
  viewResetPasswordPage = false;

  constructor( private auth: AuthenticationService, private router: Router, private modalService: NgbModal,
    public route: ActivatedRoute,) {
      this.route.params.subscribe( params => {
        if(params['token']){
          return this.routeParams(params['token']);
        }
        return setTimeout( callback=>{
          return document.getElementById('btnTrigger').click();
        },100)
      })
  } 

  ngOnInit() {
  //   if(this.route.params == null){setTimeout( callback=>{
  //     document.getElementById('btnTrigger').click();
  //   },1000)
  // }
    // if(this.viewResetPasswordPage==false){
      // document.getElementById('btnTrigger').click();
    // }
    
    // this.token = this.route.snapshot.params['token'];
    // if(this.token!=null){
    //   this.viewResetPasswordPage=true;
    // }
    
  } 

  ngDoCheck(){
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
      if(err=='User not found'){
        this.errorUser = err;
        this.errorMsg = 'Check and Retry';
        document.getElementById("user").classList.add("user-error");
        document.getElementById("error").classList.add("typing-error");
        return setTimeout(t=>{
          this.errorUser = '';
          this.errorMsg = '';
          document.getElementById("error").classList.remove("typing-error");
          document.getElementById("user").classList.remove("user-error");
        },2000);
      }
      if(err=='Password is wrong'){
        this.errorPass = err;
        this.errorMsg = 'Check and Retry';
        document.getElementById("password").classList.add("pass-error");
        document.getElementById("error").classList.add("typing-error");
        return setTimeout(t=>{
          this.errorPass = '';
          this.errorMsg = '';
          document.getElementById("error").classList.remove("typing-error");
          document.getElementById("password").classList.remove("pass-error");
        },2000);
      }
      this.errorServer = err;
      this.errorMsg = 'Error On Submision!'
      document.getElementById("server").classList.add("server-error");
      document.getElementById("error").classList.add("typing-error");
      return setTimeout(t=>{
        this.errorServer = '';
        this.errorMsg = '';
        document.getElementById("error").classList.remove("typing-error");
         document.getElementById("server").classList.remove("server-error");
      },2000);
    });

    // if(this.errorMsg = "Password is wrong"){
    //   this.wrongPassword = true;
    // }
    // if(this.errorMsg = "User not found"){
    //   this.wrongEmail = true;
    // }
    
    
  }

  loginClose(){
    document.getElementById('btnTrigger').click();
    this.router.navigate(['/']);
  }


  signUp(){
    document.getElementById('btnTrigger').click();
    this.router.navigate(['signUp']);
  }

  routeParams(token){
    if(token == 'reset'){
      return this.forgotPass = true;
    }
    return this.viewResetPasswordPage = true; 
  }

  buttonClickRecoverLink(){
      var reset='reset';
      document.getElementById('btnTrigger').click();
      this.router.navigate(['login',reset]);
  }

  recover(){
    this.auth.forgotEmail(this.emailFormControl.value);
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
