import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';   
   
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
  
@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  saveUser(user){    
    console.log(user);  
    return this.http.post('http://localhost:8000/login/', user)  
            .map((response: Response) =>response.json())              
  }  
  
  GetUser(){       
    return this.http.get('http://localhost:8000/login/')  
            .map((response: Response) => response.json())              
  }  
 deleteUser(id){   
    return this.http.post('http://localhost:8000/api/deleteUser/',{'id': id})  
            .map((response: Response) =>response.json())               
  }

}
