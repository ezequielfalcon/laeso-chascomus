import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductosService } from '../../../../servicios/datos/productos.service';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Menu } from '../../../../modelos/menu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];

  constructor(
    private productosService: ProductosService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private vcr: ViewContainerRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarMenus();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarMenus() {
    this.productosService.verMenus().subscribe(
      menusDb => {
        this.menus = menusDb;
        console.log(menusDb);
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

}
