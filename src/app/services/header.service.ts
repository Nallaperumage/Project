import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
  } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HeaderService {

  constructor() { }
  
  private _data;
  set data(value) {
      this._data = value;
  }
  get data() {
      return this._data;
  }
}
