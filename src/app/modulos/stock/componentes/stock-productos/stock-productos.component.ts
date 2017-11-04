import { Component, OnInit } from '@angular/core';
import {ProductoStock} from '../../../../modelos/producto-stock';
import {NotificationsService} from 'angular2-notifications/dist';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {StockService} from '../../../../servicios/datos/stock.service';
import {Categoria} from '../../../../modelos/categoria';
import {ProductosService} from '../../../../servicios/datos/productos.service';

@Component({
  selector: 'app-stock-productos',
  templateUrl: './stock-productos.component.html',
  styleUrls: ['./stock-productos.component.css']
})
export class StockProductosComponent implements OnInit {

  filtroNombre = '';
  filtroCat = '';
  filtroCodigo = '';
  productosStock: ProductoStock[] = [];
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
    private productosService: ProductosService
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
    this.stockService.verProductosStock().subscribe(productosDb => {
      this.productosStock = productosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
