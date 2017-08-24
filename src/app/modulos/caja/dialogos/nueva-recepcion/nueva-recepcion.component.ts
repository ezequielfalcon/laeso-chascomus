import { Component, OnInit } from '@angular/core';
import {Proveedor} from '../../../../modelos/proveedor';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.css']
})
export class NuevaRecepcionComponent implements OnInit {

  proveedorSeleccionado = false;
  proveedor: Proveedor = new Proveedor;

  constructor() { }

  ngOnInit() {
  }

}
