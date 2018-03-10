import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Pedido } from '../../../../../modelos/pedido';
import { Menu } from '../../../../../modelos/menu';
import { Producto } from '../../../../../modelos/producto';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpinnerService } from '../../../../utils/directivas/spinner/spinner.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmarService } from '../../../../utils/dialogos/confirmar/confirmar.service';
import { CocinaService } from '../../../../../servicios/datos/cocina.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  pedido: Pedido;
  menus: Menu[] = [];
  menusPedido: Menu[] = [];
  adicionales: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private vcr: ViewContainerRef,
    private confirmar: ConfirmarService,
    private router: Router,
    private cocina: CocinaService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.cocina.verPedido(+params['id']))
    .subscribe(pedidoDb => {
      this.pedido = pedidoDb;
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
        if (error.status === 404) {
          this.router.navigate(['/cocina/pedidos']);
        }
    });
  }

  cargarMenus() {
    this.cocina.verMenus().subscribe(
      menusDb => {
        this.menus = menusDb;
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

  cargarAdicionales() {
    this.cocina.verAdicionales().subscribe(adicionalesDb => {
      this.adicionales = adicionalesDb;
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

}
