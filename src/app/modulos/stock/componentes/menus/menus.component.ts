import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Menu } from '../../../../modelos/menu';
import { NuevoMenuService } from '../../dialogos/nuevo-menu/nuevo-menu.service';
import { CocinaService } from '../../../../servicios/datos/cocina.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];

  constructor(
    private cocinaService: CocinaService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private nuevoMenuService: NuevoMenuService,
    private vcr: ViewContainerRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarMenus();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  nuevoMenu() {
    this.nuevoMenuService.crearMenu(this.vcr).subscribe(
      res => {
        if (res) {
          this.abrirMenu(res);
        }
      }
    );
  }

  abrirMenu(menuId) {
    this.router.navigate(['/stock/menus/' + menuId]);
  }

  cargarMenus() {
    this.cocinaService.verMenus().subscribe(
      menusDb => {
        this.menus = menusDb;
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

}
