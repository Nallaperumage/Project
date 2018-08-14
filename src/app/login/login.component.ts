import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms'
import { DatabaseService } from '../database.service';  
   
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Repdata;
  valbutton ="Save";  
  
  constructor( private DataService :DatabaseService ) { }

  ngOnInit() {
    this.DataService.GetUser().subscribe(data =>  this.Repdata = data) ;
  } 
   
 
  onSave = function(user,isValid: boolean) {    
    user.mode= this.valbutton;  
     this.DataService.saveUser(user)  
     .subscribe(data =>  {  alert(data.data);  
          
       this.ngOnInit();    
     }   
     , error => this.errorMessage = error )  
       
   } 

}
