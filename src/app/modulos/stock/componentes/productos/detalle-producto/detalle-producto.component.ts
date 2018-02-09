import { ConfirmarService } from './../../../../utils/dialogos/confirmar/confirmar.service';
import { ProductosService } from './../../../../../servicios/datos/productos.service';
import { SpinnerService } from './../../../../utils/directivas/spinner/spinner.service';
import { Unidad } from './../../../../../modelos/unidad';
import { Categoria } from './../../../../../modelos/categoria';
import { Producto } from './../../../../../modelos/producto';
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit, OnDestroy {

  producto: Producto;
  returnUrl: string;
  edicion = false;
  cargado = false;
  ivas: any[] = [
    {label: '21%', valor: '21'},
    {label: '10.5%', valor: '10.5'},
    {label: '27%', valor: '27'},
    {label: '0%', valor: '0'}
  ];
  categorias: Categoria[] = [];
  unidades: Unidad[] = [];

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private router: Router,
    private productosService: ProductosService,
    private confirmar: ConfirmarService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.cargarUnidades();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/stock/productos';
  }

  cargarProducto() {
    this.route.params.switchMap((params: Params) => this.productosService.verProducto(params['id'])).subscribe(
      productoDb => {
        this.producto = productoDb;
        this.spinner.stop();
        this.cargado = true;
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

  cargarCategorias() {
    this.productosService.verCategorias().subscribe(categoriasDb => {
      this.categorias = categoriasDb;
      this.cargarProducto();
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarUnidades() {
    this.productosService.verUnidades().subscribe(unidadesDb => {
      this.unidades = unidadesDb;
      this.cargarCategorias();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  editar(edit: boolean) {
    this.edicion = edit;
  }

  modificar() {
    this.spinner.start();
    this.productosService.modificarProducto(this.producto)
      .subscribe(() => {
        this.spinner.stop();
        this.edicion = false;
        this.notificationsService.success('OK', 'Producto modificado');
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
    });
  }

  borrar() {
    this.confirmar.confirmar('Confirmar borrado', 'Está seguro que desea borrar el producto ' + this.producto.nombre + '?', this.vcr)
      .subscribe(confirmado => {
        if (confirmado) {
          this.spinner.start();
          this.productosService.borrarProducto(this.producto.id).subscribe(() => {
            this.notificationsService.success('OK', 'Producto borrado correctamente');
            this.router.navigate([this.returnUrl]);
          }, error => {
            this.notificationsService.error('Error', error.error.mensaje);
            this.spinner.stop();
          });
        }
      });
  }

}
