import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpVeaService {
  private urlPrefix: string; // La URL acá es seteada por el servicio de Login

  constructor(
    private http: HttpClient,
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


  static createAuthorizationHeader() {
    return new HttpHeaders({
      'x-access-token': sessionStorage.getItem('token')
    });
  }

  get(url) {
    return this.http.get(this.urlPrefix + url, {
      headers: HttpVeaService.createAuthorizationHeader()
    });
  }

  post(url, data) {
    return this.http.post(this.urlPrefix + url, data, {
      headers: HttpVeaService.createAuthorizationHeader()
    });
  }

  put(url, data) {
    return this.http.put(this.urlPrefix + url, data, {
      headers: HttpVeaService.createAuthorizationHeader()
    });
  }

  del(url) {
    return this.http.delete(this.urlPrefix + url, {
      headers: HttpVeaService.createAuthorizationHeader()
    });
  }
}
