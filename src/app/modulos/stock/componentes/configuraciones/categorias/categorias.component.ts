import { ConfirmarService } from './../../../../utils/dialogos/confirmar/confirmar.service';
import { SpinnerService } from './../../../../utils/directivas/spinner/spinner.service';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NuevaCategoriaService } from '../../../dialogos/nueva-categoria/nueva-categoria.service';
import { ProductosService } from '../../../../../servicios/datos/productos.service';
import { Categoria } from '../../../../../modelos/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy {

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private nuevaCategoria: NuevaCategoriaService,
    private vcr: ViewContainerRef,
    private confirmar: ConfirmarService
  ) { }

  categorias: Categoria[] = [];

  ngOnInit() {
    this.cargarCategorias();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarCategorias() {
    this.productosService.verCategorias().subscribe(categoriasDb => {
      this.categorias = categoriasDb;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  nuevaCategoriaDialog() {
    this.nuevaCategoria.crearCategoria(this.vcr).subscribe(() => {
      this.cargarCategorias();
    });
  }

  borrarCategoria(categoria: Categoria) {
    this.confirmar.confirmar('Confirmar borrado', 'Está seguro que desea borrar la categoría ' + categoria.nombre + '?', this.vcr)
      .subscribe(confirmado => {
        if (confirmado) {
          this.productosService.borrarCategoria(categoria.id).subscribe(() => {
            this.notificationsService.success('OK', 'Categoría borrada!');
            this.cargarCategorias();
          }, error => {
            this.notificationsService.error('Error', error.error.mensaje);
            this.spinner.stop();
          });
        }
      });
  }

}
