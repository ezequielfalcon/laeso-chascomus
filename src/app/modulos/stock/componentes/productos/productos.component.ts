import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { ProductosService } from './../../../../servicios/datos/productos.service';
import { ProductoFull } from './../../../../modelos/producto-full';
import {Component, HostListener, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import { NuevoProductoService } from '../../dialogos/nuevo-producto/nuevo-producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  productosFull: ProductoFull[] = [];
  dialogoAbierto = false;
  columnas = [
    { name: 'id', label: 'ID' },
    { name: 'nombre', label: 'Nombre', sortable: true },
    { name: 'stock_minimo', label: 'Stock mínimo', numeric: true, sortable: true },
    { name: 'iva', label: 'IVA', numeric: true, sortable: true },
    { name: 'codigo', label: 'Código', sortable: true },
    { name: 'categoria', label: 'Categoría', sortable: true },
    { name: 'unidad', label: 'Unidad', sortable: true }
  ];

  constructor(
    private productosService: ProductosService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private nuevoProductoService: NuevoProductoService,
    private vcr: ViewContainerRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 13 && !this.dialogoAbierto) {
      this.nuevoProducto();
      this.dialogoAbierto = true;
    }
  }

  cargarProductos() {
    this.productosService.verProductosFull().subscribe(productosDb => {
      this.productosFull = productosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  nuevoProducto() {
    this.nuevoProductoService.crearProducto(this.vcr).subscribe(() => {
      this.cargarProductos();
      this.dialogoAbierto = false;
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
      this.dialogoAbierto = false;
    });
  }

}
