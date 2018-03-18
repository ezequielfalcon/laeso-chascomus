import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Pedido } from '../../../../../modelos/pedido';
import { Menu } from '../../../../../modelos/menu';
import { Producto } from '../../../../../modelos/producto';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpinnerService } from '../../../../utils/directivas/spinner/spinner.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmarService } from '../../../../utils/dialogos/confirmar/confirmar.service';
import { CocinaService } from '../../../../../servicios/datos/cocina.service';
import { AgregarMenuPedidoService } from '../../../dialogos/agregar-menu-pedido/agregar-menu-pedido.service';

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
    private cocina: CocinaService,
    private agregar: AgregarMenuPedidoService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.cocina.verPedido(+params['id']))
      .subscribe(pedidoDb => {
        this.pedido = pedidoDb;
        this.cargarMenusPedido();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
        if (error.status === 404) {
          this.router.navigate(['/cocina/pedidos']);
        }
      });
    this.cargarMenus();
    this.cargarAdicionales();
  }

  cargarMenus() {
    this.cocina.verMenus().subscribe(
      menusDb => {
        this.menus = menusDb;
        for (const menu of this.menus) {
          menu.color = this.getRandomColor();
        }
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

  cargarMenusPedido() {
    this.cocina.verMenusPedido(this.pedido.id).subscribe(menusPedidoDb => {
      this.menusPedido = menusPedidoDb;
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  agregarMenuPedido(menu: Menu) {
    this.agregar.agregarMenuPedido(menu, this.pedido, this.adicionales, this.vcr).subscribe();
  }

}
