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
  busquedaNombre = '';

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocina: CocinaService,
    public dialogRef: MatDialogRef<AgregarMenuPedidoComponent>
  ) { }

  ngOnInit() {
  }

  agregarAdicionalMenu(adicional: Producto) {
    this.adicionalesMenu.push(adicional);
  }

  sacarAdicionalMenu(adicional: Producto) {
    const index = this.adicionalesMenu.indexOf(adicional, 0);
    if (index > -1) {
      this.adicionalesMenu.splice(index, 1);
    }
  }

  confirmarMenuPedido() {
    this.spinner.start();
    this.cocina.agregarMenuPedido(this.pedido.id, this.menu, this.observaciones)
      .subscribe(nuevoId => {
        if (this.adicionalesMenu.length > 0) {
          let adicionalesCargados = 0;
          for (const adicional of this.adicionalesMenu) {
            this.cocina.agregarAdicionalMenuPedido(nuevoId.id, adicional.id).subscribe(() => {
              adicionalesCargados++;
              if (adicionalesCargados === this.adicionalesMenu.length) {
                this.notificationsService.success('OK', 'Menú con adicionales cargado!');
                this.dialogRef.close(true);
              }
            }, error => {
              this.notificationsService.error('Error', error.error.mensaje);
              this.spinner.stop();
            });
          }
        } else {
          this.notificationsService.success('OK', 'Menú cargado!');
          this.dialogRef.close(true);
        }
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      });
  }

}
