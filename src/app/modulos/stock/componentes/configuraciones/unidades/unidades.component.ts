import { NuevaUnidadService } from './../../../dialogos/nueva-unidad/nueva-unidad.service';
import { ConfirmarService } from './../../../../utils/dialogos/confirmar/confirmar.service';
import { ProductosService } from './../../../../../servicios/datos/productos.service';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from './../../../../utils/directivas/spinner/spinner.service';
import { Unidad } from './../../../../../modelos/unidad';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit, OnDestroy {

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private vcr: ViewContainerRef,
    private confirmar: ConfirmarService,
    private nuevaUnidad: NuevaUnidadService
  ) { }

  unidades: Unidad[] = [];


  ngOnInit() {
    this.cargarUnidades();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarUnidades() {
    this.productosService.verUnidades().subscribe(unidadesDb => {
      this.unidades = unidadesDb;
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  borrarUnidad(unidad: Unidad) {
    this.confirmar.confirmar('Confirmar borrado', 'Está seguro que desea borrar la unidad ' + unidad.nombre + '?', this.vcr)
      .subscribe(confirmado => {
        if (confirmado) {
          this.productosService.borrarUnidad(unidad.id).subscribe(() => {
            this.notificationsService.success('OK', 'Categoría borrada!');
            this.cargarUnidades();
          }, error => {
            const body = JSON.parse(error._body);
            this.notificationsService.error('Error', body.mensaje);
            this.spinner.stop();
          });
        }
      });
  }

  nuevaUnidadDialog() {
    this.nuevaUnidad.crearUnidad(this.vcr).subscribe(() => {
      this.cargarUnidades();
    });
  }

}
