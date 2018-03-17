import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../modelos/menu';
import { Producto } from '../../../../modelos/producto';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { NotificationsService } from 'angular2-notifications';
import { CocinaService } from '../../../../servicios/datos/cocina.service';
import { MatDialogRef } from '@angular/material';
import { Pedido } from '../../../../modelos/pedido';

@Component({
  selector: 'app-agregar-menu-pedido',
  templateUrl: './agregar-menu-pedido.component.html',
  styleUrls: ['./agregar-menu-pedido.component.css']
})
export class AgregarMenuPedidoComponent implements OnInit {

  public menu: Menu;
  public pedido: Pedido;
  public adicionales: Producto[];

  adicionalesMenu: Producto[] = [];
  observaciones = '';

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocina: CocinaService,
    public dialogRef: MatDialogRef<AgregarMenuPedidoComponent>
  ) { }

  ngOnInit() {
  }

}
