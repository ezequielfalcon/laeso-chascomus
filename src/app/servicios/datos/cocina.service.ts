import { Injectable } from '@angular/core';
import { HttpVeaService } from '../http-vea.service';
import { Menu } from '../../modelos/menu';

@Injectable()
export class CocinaService {

constructor(
    private http: HttpVeaService
) { }

verMenus() {
    return this.http.get('/cocina/menus').map(response => response['datos']);
  }

  crearMenu(nuevoMenu: Menu) {
    return this.http.post('/cocina/menus', nuevoMenu).map(response => response['id']);
  }

  verIngredientes() {
    return this.http.get('/cocina/ingredientes').map(response => response['datos']);
  }

  verMenu(menuId: number) {
    return this.http.get('/cocina/menus/' + menuId).map(response => response['datos']);
  }

}
