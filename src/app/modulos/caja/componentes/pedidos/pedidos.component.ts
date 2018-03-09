import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Pedido } from '../../../../modelos/pedido';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { NotificationsService } from 'angular2-notifications';
import { CocinaService } from '../../../../servicios/datos/cocina.service';
import { NuevoPedidoService } from '../../dialogos/nuevo-pedido/nuevo-pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {

  pedidosPendientes: Pedido[] = [];
  pedidosCerrados: Pedido[] = [];

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocina: CocinaService,
    private pedidos: NuevoPedidoService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.cargarPedidos();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarPedidos() {
    this.cocina.verPedidosPendientes().subscribe(pedidosPendientesDb => {
      this.pedidosPendientes = pedidosPendientesDb;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
    this.cocina.verPedidosCerrados().subscribe(pedidosCerradosDb => {
      this.pedidosCerrados = pedidosCerradosDb;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  crearPedido() {
    this.pedidos.nuevoPedido(this.vcr).subscribe(pedidoId => {
      if (pedidoId) {
        console.log('Hay pedido:');
        console.log(pedidoId);
      }
    });
  }

}
