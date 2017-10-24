import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RemitoRecibido} from '../../../../../modelos/remito-recibido';
import {HistorialRemito} from '../../../../../modelos/historial-remito';
import {StockService} from '../../../../../servicios/datos/stock.service';
import {SpinnerService} from '../../../../utils/directivas/spinner/spinner.service';
import {NotificationsService} from 'angular2-notifications';
import {ProductoFull} from '../../../../../modelos/producto-full';
import {ProductosService} from '../../../../../servicios/datos/productos.service';
import {ProductoRemito} from '../../../../../modelos/producto-remito';
import {AgregarProductoService} from '../../../dialogos/agregar-producto/agregar-producto.service';
import {Proveedor} from '../../../../../modelos/proveedor';
import {ProveedoresService} from '../../../../../servicios/datos/proveedores.service';

@Component({
  selector: 'app-remito-completo',
  templateUrl: './remito-completo.component.html',
  styleUrls: ['./remito-completo.component.css']
})
export class RemitoCompletoComponent implements OnInit, OnDestroy {

  remitoCarga: RemitoRecibido;
  historialRemito: HistorialRemito[] = [];
  productosFull: ProductoFull[] = [];
  productosRemito: ProductoRemito[] = [];
  proveedorRemito: Proveedor;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private agregarProd: AgregarProductoService,
    private vcr: ViewContainerRef,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.stockService.verRemitosParaCarga(+params['id']))
      .subscribe(remitoDb => {
        this.remitoCarga = remitoDb;
        this.histoRemito(this.remitoCarga.id);
        this.cargarProveedor(this.remitoCarga.id_proveedor);
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
    this.cargarProductos();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarProveedor(proveedorId: number) {
    this.proveedoresService.verProveedor(proveedorId).subscribe(proveedorDb => {
      this.proveedorRemito = proveedorDb;
    });
  }

  histoRemito(remitoId: number) {
    this.stockService.verHistorialRemito(remitoId).subscribe(historialDb => {
      this.historialRemito = historialDb;
      this.cargarProductosRemito(remitoId);
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductos() {
    this.productosService.verProductosFull().subscribe(productosDb => {
      this.productosFull = productosDb;
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductosRemito(remitoId: number) {
    this.stockService.verProductosPorRemito(remitoId).subscribe(productosDb => {
      this.productosRemito = productosDb;
      console.log(this.productosRemito);
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  agregarProducto() {
    this.agregarProd.agregarProductos(this.productosFull, this.remitoCarga.id, this.vcr).subscribe(cargoProducto => {
      if (cargoProducto) {
        this.spinner.start();
        if (this.productosRemito.length === 0) {
          this.stockService.confirmarRemito(this.remitoCarga.id).subscribe(() => {
            // nada
          }, error => {
            const body = JSON.parse(error._body);
            this.notificationsService.error('Error', body.mensaje);
            this.spinner.stop();
          });
        }
        this.cargarProductosRemito(this.remitoCarga.id);
      }
    });
  }

  verNombreProducto(productoId: number): string {
    for (const prod of this.productosFull) {
      if (prod.id === productoId) {
        return prod.nombre;
      }
    }
    return 'error';
  }

  verCodigoProducto(productoId: number): string {
    for (const prod of this.productosFull) {
      if (prod.id === productoId) {
        return prod.codigo;
      }
    }
    return 'error';
  }

  sacarProducto(remitoId: number, productoId: number) {
    this.spinner.start();
    this.stockService.quitarProductoRemito(remitoId, productoId).subscribe(() => {
      this.cargarProductosRemito(remitoId);
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  intentarFecha(fecha: string): string {
    if (fecha) {
      return fecha.substr(0, 10);
    } else {
      return 'N/A';
    }
  }

  calcularCosto(producto: ProductoRemito): number {
    if (producto.iva_incluido === true) {
      return +producto.costo;
    } else {
      switch (producto.iva) {
        case '21':
          return producto.costo * 1.21;
        case '10.5':
          return producto.costo * 1.105;
        case '27':
          return producto.costo * 1.27;
        default:
          return producto.costo;
      }
    }
  }

}
