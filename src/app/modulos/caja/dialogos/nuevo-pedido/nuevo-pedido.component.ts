import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../../modelos/pedido';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { CocinaService } from '../../../../servicios/datos/cocina.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent implements OnInit {

  nuevoPedido: Pedido = new Pedido();

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocina: CocinaService,
    public dialogRef: MatDialogRef<NuevoPedidoComponent>
  ) { }

  ngOnInit() {
  }

  crearPedido() {
    if (this.nuevoPedido.nombre) {
      this.spinner.start();
      this.cocina.crearPedido(this.nuevoPedido).subscribe(nuevoPedidoId => {
        this.notificationsService.success('Éxito!', 'Pedido creado con ID ' + nuevoPedidoId);
        this.dialogRef.close(nuevoPedidoId);
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      });
    } else {
      this.notificationsService.warn('Error', 'Debe completar el campo Nombre!');
    }
  }

}
