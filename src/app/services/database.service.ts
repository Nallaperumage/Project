import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';   
   
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
  
@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  saveUser(user){     
    return this.http.post('http://localhost:8000/signUp/', user)  
            .map((response: Response) =>response.json())              
  }  

  loginUser(){

  }
  
  GetUser(){       
    return this.http.get('http://localhost:8000/userPage/')  
            .map((response: Response) => response.json())              
  }  
 deleteUser(id){   
    return this.http.post('http://localhost:8000/user/user-page/deleteUser/',{'id': id})  
            .map((response: Response) =>response.json())               
  }

}
