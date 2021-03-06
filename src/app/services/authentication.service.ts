import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { RegisterUser } from '../Models/user.model'; 
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

//Interfaces
export interface UserDetails {
  _id: string;
  firstName: String;
  lastName: String;
  userName: String;
  email: string;
  role: String;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface LoginUser {
  email: string;
  password: string;
  userName?: string;
}


@Injectable()
export class AuthenticationService {
  private token: string;

  constructor( private http: HttpClient, private router: Router ) {}

  // private saveSessionToken( token: string ): void {
  //   sessionStorage.setItem( 'login-token', token)
  //   this.token = token;
  // }

  private saveToken( token: string ): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'signUp'|'user/personal-data'|'user/activity', user?: LoginUser|RegisterUser): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(`/${type}`, user);
    } else {
      base = this.http.get(`/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          // this.saveSessionToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }

  public register(user: RegisterUser): Observable<any> {
    return this.request('post', 'signUp', user);
  }
  
  public login(user: LoginUser): Observable<any> {
    return this.request('post', 'login', user).pipe(catchError(this.errorHandler));
  }

  errorHandler( error: HttpErrorResponse){
    return Observable.throw( error.error.message || "server Error" );
  }
  
  public profileRead(): Observable<any> {
    return this.request('get', 'user/personal-data');
  }
  public activityRead(): Observable<any> {
    return this.request('get', 'user/activity');
  }

  public profileSet(data: any): Observable<any> {
    var param = {
      data: data,
      email: this.getUserDetails().email
    }
    return this.http.post('user/personal-data',param);
  }


  public processPayment(token: any, amount: number) {
    
    if(this.isLoggedIn()){
      const user = this.getUserDetails();
      const email = user.email;
      const payment = { token, amount, email }
      return this.http.post('user/credit-cards',payment).subscribe(data => {
        console.log(data);
      });
    }
    const payment = { token, amount }
    return this.http.post('user/credit-cards',payment)
    .subscribe(data => {
      console.log(data);
    });
  }

  public processPayment2(token: any, service: String): Observable<any> {
    if(this.isLoggedIn()){
      const user = this.getUserDetails();
      const email = user.email;
      const payment = { token, service, email }
      return this.http.post('service/payment',payment);
    }
    const payment = { token, service }
    return this.http.post('service/payment',payment);
  }

  public chartData(test: String, location:any){
    const params = {test, location};

    return this.http.post('user/chart-editor', params);
  }

  public forgotEmail(email){
    var data = {
      email: email
    }
    return this.http.post('/login/forgot-password',data).subscribe( response => {
      console.log(response);
    }, (err)=>{

    })
  }

  public floodInsert(token: any, polygon:any){

    const params = {token, polygon};

    return this.http.post('user/map-editor', params);
  }

  public floodCheck(): Observable<any>{
    return this.http.get('user/map-editor/getCheck')
  }

  public dataCheck(): Observable<any>{
    return this.http.get('service/dataCheck');
  }


}
