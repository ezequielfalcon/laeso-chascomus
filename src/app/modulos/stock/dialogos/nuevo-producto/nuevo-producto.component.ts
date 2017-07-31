import { ProductosService } from './../../../../servicios/datos/productos.service';
import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { Producto } from './../../../../modelos/producto';
import { Unidad } from './../../../../modelos/unidad';
import { Categoria } from './../../../../modelos/categoria';
import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  categorias: Categoria[] = [];
  unidades: Unidad[] = [];
  nuevoProducto: Producto = new Producto();
  ivas: any[] = [
    {label: '21%', valor: '21'},
    {label: '10.5%', valor: '10.5'},
    {label: '27%', valor: '27'},
    {label: '0%', valor: '0'}
  ];

  static encontrarUnidad(unidades: Unidad[]): number {
    for (const unidad of unidades) {
      if (unidad.nombre.toUpperCase() === 'UNIDAD') {
        return unidad.id;
      }
    }
    return 0;
  }

  static encontrarOtros(categorias: Categoria[]): number {
    for (const categoria of categorias) {
      if (categoria.nombre.toUpperCase() === 'OTROS') {
        return categoria.id;
      }
    }
    return 0;
  }

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    public dialogRef: MdDialogRef<NuevoProductoComponent>
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarUnidades();
    this.nuevoProducto.iva = this.ivas[0].valor;
    this.nuevoProducto.stock_minimo = 0;
  }

  cargarCategorias() {
    this.productosService.verCategorias().subscribe(categoriasDb => {
      this.categorias = categoriasDb;
      this.nuevoProducto.id_categoria = NuevoProductoComponent.encontrarOtros(this.categorias);
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarUnidades() {
    this.productosService.verUnidades().subscribe(unidadesDb => {
      this.unidades = unidadesDb;
      this.nuevoProducto.id_unidad = NuevoProductoComponent.encontrarUnidad(this.unidades);
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  crearProducto() {
    if (isNaN(this.nuevoProducto.stock_minimo)) {
      this.notificationsService.error('Error', 'El stock mínimo debe ser sólo en números!');
      return;
    }
    if (!this.nuevoProducto.nombre) {
      this.notificationsService.error('Error', 'Complete todos los datos!');
      return;
    }
    if (this.nuevoProducto.codigo) {
      this.spinner.start();
      this.productosService.nuevoProducto(this.nuevoProducto.nombre, this.nuevoProducto.stock_minimo,
        this.nuevoProducto.codigo, this.nuevoProducto.iva,
        this.nuevoProducto.id_categoria, this.nuevoProducto.id_unidad).subscribe(() => {
        this.notificationsService.success('OK', 'Producto creado con Código ' + this.nuevoProducto.codigo);
        this.spinner.stop();
        this.dialogRef.close();
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
    } else {
      this.spinner.start();
      this.productosService.nuevoProductoRand(this.nuevoProducto.nombre, this.nuevoProducto.stock_minimo,
        this.nuevoProducto.iva,
        this.nuevoProducto.id_categoria, this.nuevoProducto.id_unidad).subscribe(nuevoCod => {
        this.notificationsService.success('OK', 'Producto creado con Código ' + nuevoCod.nuevoCodigo);
        this.spinner.stop();
        this.dialogRef.close();
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
    }
  }

}
