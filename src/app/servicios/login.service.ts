import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor(
    private http: Http
  ) {

  }

  login(usuario: string, clave: string) {
    const body = {
      usuario: usuario,
      clave: clave,
      cliente: '$2a$06$haVRFwEuOBH5oV/8LT0CQOXssTCHUtIQLJUy.Tjhmtz.gdZubp8VO'
    };
    const apiUrl = 'https://vea1-backend-test.herokuapp.com';
    return this.http.post(apiUrl + '/login', body)
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
