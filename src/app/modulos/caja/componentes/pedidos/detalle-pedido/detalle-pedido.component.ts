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
        this.cargarMenus();
        this.cargarAdicionales();
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
        for (const menu of this.menus) {
          menu.color = this.getRandomColor();
        }
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

  cargarAdicionales() {
    this.cocina.verAdicionales().subscribe(adicionalesDb => {
      this.adicionales = adicionalesDb;
      this.cargarMenusPedido();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarMenusPedido() {
    this.cocina.verMenusPedido(this.pedido.id).subscribe(menusPedidoDb => {
      if (menusPedidoDb.length > 0) {
        this.menusPedido = menusPedidoDb;
        this.cargarAdicionalesMenu();
      } else {
        this.spinner.stop();
      }
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
    this.agregar.agregarMenuPedido(menu, this.pedido, this.adicionales, this.vcr)
      .subscribe(res => {
        if (res) {
          this.spinner.start();
          this.cargarMenusPedido();
        }
      });
  }

  cargarAdicionalesMenu() {
    let menusProcesados = 0;
    for (const menu of this.menusPedido) {
      menu.adicionales = [];
      this.cocina.verAdicionalesMenuPedido(menu.id_menu_pedido).subscribe(
        adicionalesMenu => {
          for (const adic of adicionalesMenu) {
            for (const adicionalProd of this.adicionales) {
              if (+adic.id_producto === adicionalProd.id) {
                menu.adicionales.push(adicionalProd);
              }
            }
          }
          menusProcesados++;
          if (menusProcesados === this.menusPedido.length) {
            this.spinner.stop();
          }
        }, error => {
          this.notificationsService.error('Error', error.error.mensaje);
          this.spinner.stop();
        });
    }
  }

  quitarMenuPedido(menu: Menu) {
    this.spinner.start();
    this.cocina.quitarMenuPedido(menu.id_menu_pedido).subscribe(() => {
      this.notificationsService.success('OK', 'Menú borrado del pedido');
      this.cargarMenusPedido();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  borrarPedido() {
    this.confirmar.confirmar('Borrar pedido', 'Está seguro que desea borrar el pedido ' + this.pedido.id + ' ?', this.vcr)
      .subscribe(res => {
        if (res) {
          this.cocina.borrarPedido(this.pedido.id).subscribe(() => {
            this.notificationsService.success('OK', 'Pedido borrado!');
            this.router.navigate(['/caja/pedidos']);
          }, error => {
            this.notificationsService.error('Error', error.error.mensaje);
            this.spinner.stop();
          });
        }
      });
  }

}
