import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../../modelos/producto';
import {Precio} from '../../../../modelos/precio';

@Component({
  selector: 'app-historial-precios',
  templateUrl: './historial-precios.component.html',
  styleUrls: ['./historial-precios.component.css']
})
export class HistorialPreciosComponent implements OnInit {

  public producto: Producto;
  precios: Precio[] = [];

  constructor() { }

  ngOnInit() {
  }

}
