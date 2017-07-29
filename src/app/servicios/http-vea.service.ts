import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpVeaService {
  private urlPrefix: string;

  constructor(private http: Http) {
    this.http = http;
    this.urlPrefix = 'https://vea1-backend.herokuapp.com';
  }


  static createAuthorizationHeader(headers: Headers) {
    headers.append('x-access-token', sessionStorage.getItem('token'));
  }

  get(url) {
    const headers = new Headers();
    HttpVeaService.createAuthorizationHeader(headers);
    return this.http.get(this.urlPrefix + url, {
      headers: headers
    });
  }

  post(url, data) {
    const headers = new Headers();
    HttpVeaService.createAuthorizationHeader(headers);
    return this.http.post(this.urlPrefix + url, data, {
      headers: headers
    });
  }

  put(url, data) {
    const headers = new Headers();
    HttpVeaService.createAuthorizationHeader(headers);
    return this.http.put(this.urlPrefix + url, data, {
      headers: headers
    });
  }

  del(url) {
    const headers = new Headers();
    HttpVeaService.createAuthorizationHeader(headers);
    return this.http.delete(this.urlPrefix + url, {
      headers: headers
    });
  }
}
