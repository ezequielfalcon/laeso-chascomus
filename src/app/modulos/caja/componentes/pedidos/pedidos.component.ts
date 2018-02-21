import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../modelos/menu';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  menus: Menu[] = [];

  constructor() { }

  ngOnInit() {
  }

}
