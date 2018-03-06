import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Menu } from '../../../../../modelos/menu';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../../utils/directivas/spinner/spinner.service';
import { CocinaService } from '../../../../../servicios/datos/cocina.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Producto } from '../../../../../modelos/producto';
import { AgregarIngredienteService } from '../../../dialogos/agregar-ingrediente/agregar-ingrediente.service';
import { ConfirmarService } from '../../../../utils/dialogos/confirmar/confirmar.service';

@Component({
  selector: 'app-detalle-menu',
  templateUrl: './detalle-menu.component.html',
  styleUrls: ['./detalle-menu.component.css']
})
export class DetalleMenuComponent implements OnInit, OnDestroy {

  menu: Menu;
  ingredientes: Producto[] = [];
  ingredientesMenu: Producto[] = [];

  constructor(
    private cocinaService: CocinaService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private agregarIngredienteService: AgregarIngredienteService,
    private vcr: ViewContainerRef,
    private confirmarService: ConfirmarService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.cocinaService.verMenu(+params['id']))
      .subscribe(menuDb => {
        this.menu = menuDb;
        this.cargarIngredientesMenu(this.menu.id);
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
        if (error.status === 404) {
          this.router.navigate(['/stock/menus']);
        }
      });
    this.cargarIngredientes();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarIngredientes() {
    this.cocinaService.verIngredientes().subscribe(ingredientesDb => {
      this.ingredientes = ingredientesDb;
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
      if (error.status === 404) {
        this.router.navigate(['/stock']);
      }
    });
  }

  cargarIngredientesMenu(menuId: number) {
    this.cocinaService.verIngredientesMenu(menuId).subscribe(ingredientesDbMenu => {
      this.ingredientesMenu = ingredientesDbMenu;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
      if (error.status === 404) {
        this.router.navigate(['/stock']);
      }
    });
  }

  agregarIngrediente() {
    this.agregarIngredienteService.agregarIngredientes(this.ingredientes, this.menu, this.vcr).subscribe(cargoIngrediente => {
      if (cargoIngrediente) {
        this.spinner.start();
        this.cargarIngredientesMenu(this.menu.id);
        if (cargoIngrediente === -1) {
          this.agregarIngrediente();
        }
      }
    });
  }

  quitarIngrediente(ingrediente: Producto) {
    this.confirmarService.confirmar('Quitar Ingrediente', 'Desea quitar el ingrediente ' +
    ingrediente.nombre + ' del menú ' + this.menu.nombre + '?', this.vcr)
    .subscribe(confirmado => {
      if (confirmado) {
        this.spinner.start();
        this.cocinaService.borrarIngredienteMenu(this.menu.id, ingrediente.id).subscribe(() => {
          this.cargarIngredientesMenu(this.menu.id);
        }, error => {
          this.notificationsService.error('Error', error.error.mensaje);
          this.spinner.stop();
        });
      }
    });
  }
}
