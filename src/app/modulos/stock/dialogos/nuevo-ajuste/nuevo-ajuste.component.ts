import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProductoStock} from '../../../../modelos/producto-stock';
import {SeleccionarService} from '../../../utils/dialogos/seleccionar/seleccionar.service';

@Component({
  selector: 'app-nuevo-ajuste',
  templateUrl: './nuevo-ajuste.component.html',
  styleUrls: ['./nuevo-ajuste.component.css']
})
export class NuevoAjusteComponent implements OnInit {

  public productos: ProductoStock[];

  prodSeleccionado = false;
  producto: ProductoStock = new ProductoStock();

  constructor(
    private seleccionar: SeleccionarService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  seleccionarProducto() {
    this.seleccionar.seleccionarElemento(this.productos, 'Seleccionar Producto', this.vcr)
      .subscribe(seleccionado => {
        if (seleccionado) {
          for (const prod of this.productos) {
            if (prod.id === seleccionado) {
              this.producto = prod;
            }
          }
          this.prodSeleccionado = true;
        }
      });
  }

}
