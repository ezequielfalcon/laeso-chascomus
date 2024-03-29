import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {StockService} from '../../../../servicios/datos/stock.service';
import {Categoria} from '../../../../modelos/categoria';
import {ProductosService} from '../../../../servicios/datos/productos.service';
import {NuevoAjusteService} from '../../dialogos/nuevo-ajuste/nuevo-ajuste.service';
import {Producto} from '../../../../modelos/producto';

@Component({
  selector: 'app-stock-productos',
  templateUrl: './stock-productos.component.html',
  styleUrls: ['./stock-productos.component.css']
})
export class StockProductosComponent implements OnInit {

  filtroNombre = '';
  filtroCat = '';
  filtroCodigo = '';
  productosStock: Producto[] = [];
  categorias: Categoria[] = [];
  columnas = [
    { name: 'id', label: 'ID' },
    { name: 'nombre', label: 'Nombre', sortable: true },
    { name: 'codigo', label: 'Código', sortable: true },
    { name: 'categoria', label: 'Categoría', sortable: true },
    { name: 'stock_minimo', label: 'Stock mínimo', numeric: true, sortable: true },
    { name: 'cantidad', label: 'Stock actual', numeric: true, sortable: true }
  ];

  constructor(
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private ajuste: NuevoAjusteService,
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
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductos() {
    this.stockService.verProductosStock().subscribe(productosDb => {
      this.productosStock = productosDb;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  sacarFiltro() {
    this.filtroCat = '';
    this.filtroNombre = '';
    this.filtroCodigo = '';
  }

  clickAjuste() {
    this.ajuste.crearAjuste(this.productosStock, this.vcr).subscribe(ajustado => {
      if (ajustado) {
        this.spinner.start();
        this.cargarCategorias();
      }
    });
  }

}
