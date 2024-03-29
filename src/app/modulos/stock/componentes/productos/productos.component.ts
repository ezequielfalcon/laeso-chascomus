import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { ProductosService } from '../../../../servicios/datos/productos.service';
import { Component, HostListener, OnDestroy, OnInit, ViewContainerRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import { NuevoProductoService } from '../../dialogos/nuevo-producto/nuevo-producto.service';
import {Categoria} from '../../../../modelos/categoria';
import {Producto} from '../../../../modelos/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy, AfterViewInit {

  productosFull: Producto[] = [];
  categorias: Categoria[] = [];
  dialogoAbierto = false;
  filtroNombre = '';
  filtroCat = '';
  filtroCodigo = '';
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

  @ViewChild('nuevoProd', {read: ElementRef}) BotonNuevoProd: ElementRef;

  ngOnInit() {
    this.cargarCategorias();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  ngAfterViewInit() {
    this.sacarFoco();
  }

  sacarFoco() {
    this.BotonNuevoProd.nativeElement.blur();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
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
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarCategorias() {
    this.productosService.verCategorias().subscribe(categoriasDb => {
      this.categorias = categoriasDb;
      this.cargarProductos();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  nuevoProducto() {
    this.sacarFoco();
    this.nuevoProductoService.crearProducto(this.vcr).subscribe(() => {
      this.cargarProductos();
      this.dialogoAbierto = false;
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
      this.dialogoAbierto = false;
    });
  }

  sacarFiltro() {
    this.filtroCat = '';
    this.filtroNombre = '';
    this.filtroCodigo = '';
  }

}
