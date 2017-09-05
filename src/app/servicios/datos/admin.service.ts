import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response} from '@angular/http';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpVeaService
  ) { }

  verUsuarios() {
    return this.http.get('/usuarios').map((response: Response) => response.json().datos);
  }

}
