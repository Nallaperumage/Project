import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { RegisterUser } from '../user/user.model'; 

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

  private request(method: 'post'|'get', type: 'login'|'signUp'|'user/profile', user?: LoginUser|RegisterUser): Observable<any> {
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
    return this.request('post', 'login', user);
  }
  
  public profile(): Observable<any> {
    return this.request('get', 'user/profile');
  }

}
