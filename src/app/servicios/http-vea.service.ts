import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpVeaService {
  private urlPrefix: string; // La URL acá es seteada por el servicio de Login

  constructor(
    private http: Http,
    private notif: NotificationsService,
    private router: Router
  ) {
    this.http = http;
    if (localStorage.getItem('url_backend')) {
      this.urlPrefix = localStorage.getItem('url_backend');
    } else {
      this.notif.error('Error', 'Error de comunicación con el servicio de VEA, ingrese sus credenciales nuevamente!');
      this.router.navigate(['/login']); // Si la URL todavía no está seteada, la única forma de seguir es volver al login
    }
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
