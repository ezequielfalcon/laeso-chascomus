import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../../modelos/pedido';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent implements OnInit {

  nuevoPedido: Pedido = new Pedido();

  constructor() { }

  ngOnInit() {
  }

}
