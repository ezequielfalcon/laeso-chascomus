import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Producto} from '../../../../modelos/producto';
import {NotificationsService} from 'angular2-notifications/dist';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {StockService} from '../../../../servicios/datos/stock.service';
import {Categoria} from '../../../../modelos/categoria';
import {ProductosService} from '../../../../servicios/datos/productos.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  productosPrecios: Producto[] = [];
  filtroNombre = '';
  filtroCat = '';
  filtroCodigo = '';
  categorias: Categoria[] = [];
  columnas = [
    { name: 'id', label: 'ID' },
    { name: 'nombre', label: 'Nombre', sortable: true },
    { name: 'codigo', label: 'Código', sortable: true },
    { name: 'categoria', label: 'Categoría', sortable: true },
    { name: 'precio', label: 'Precio de venta', numeric: true, sortable: true }
  ];

  constructor(
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.productosService.verCategorias().subscribe(categoriasDb => {
      this.categorias = categoriasDb;
      this.cargarProductos();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductos() {
    this.stockService.verProductosPrecios().subscribe(productosDb => {
      this.productosPrecios = productosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  sacarFiltro() {
    this.filtroCat = '';
    this.filtroNombre = '';
    this.filtroCodigo = '';
  }

}