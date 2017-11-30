import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient
  ) {
    this.http.get(window.location.origin + '/backend').subscribe(urlBackend => {
      this.urlPrefix = urlBackend['url'];
      localStorage.setItem('url_backend', urlBackend['url']);
    }, error => {
      console.log('Error al obtener URL del backend, usando testing: vea1-backend-test');
      this.urlPrefix = 'https://vea1-backend-test.herokuapp.com';
      localStorage.setItem('url_backend', this.urlPrefix); // guardar la URL en el sessionStorage para que los servicios no volteen
    });
  }

  login(usuario: string, clave: string) {
    const body = {
      usuario: usuario,
      clave: clave,
      cliente: '$2a$06$haVRFwEuOBH5oV/8LT0CQOXssTCHUtIQLJUy.Tjhmtz.gdZubp8VO'
    };
    return this.http.post(this.urlPrefix + '/login', body)
      .map(response => {
        sessionStorage.setItem('usuario', usuario);
        sessionStorage.setItem('token', response['token']);
        sessionStorage.setItem('roles', response['rolesToken']);
      });
  }

  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('url_backend');
  }
}
