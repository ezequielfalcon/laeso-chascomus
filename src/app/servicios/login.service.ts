import { HttpVeaService } from './http-vea.service';
import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private urlPrefix: string;

  constructor(
    private http: Http,
    private httpVea: HttpVeaService
  ) {
    this.http.get(window.location.origin + '/backend').map((response: Response) => response.json()).subscribe(urlBackend => {
      this.urlPrefix = urlBackend.url;
      this.httpVea.urlPrefix = urlBackend.url;
    }, error => {
      console.error(error);
    });
  }

  login(usuario: string, clave: string) {
    const body = {
      usuario: usuario,
      clave: clave,
      cliente: '$2a$06$haVRFwEuOBH5oV/8LT0CQOXssTCHUtIQLJUy.Tjhmtz.gdZubp8VO'
    };
    return this.http.post(this.urlPrefix + '/login', body)
      .map((response: Response) => {
        sessionStorage.setItem('usuario', usuario);
        sessionStorage.setItem('token', response.json().token);
        sessionStorage.setItem('roles', response.json().rolesToken);
      });
  }

  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }
}
