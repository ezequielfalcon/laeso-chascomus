import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../modelos/menu';
import { Producto } from '../../../../modelos/producto';
import { CocinaService } from '../../../../servicios/datos/cocina.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef } from '@angular/material';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  public menu: Menu;
  public ingredientes: Producto[];

  ingredienteNuevo: Producto = new Producto;
  busquedaCodigo = '';
  busquedaNombre = '';
  seleccionar = true;
  tieneIva = false;
  ingredientesAgregados = 0;

  constructor(
    private cocinaService: CocinaService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<AgregarIngredienteComponent>,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
  }

  seleccionarIngrediente(idIngrediente: number) {
    this.ingredienteNuevo.id_producto = idIngrediente;
    for (const prod of this.ingredientes) {
      if (prod.id === idIngrediente) {
        this.ingredienteNuevo.codigo = prod.codigo;
        this.ingredienteNuevo.nombre = prod.nombre;
      }
    }
    this.seleccionar = false;
  }

  guardarIngredienteNuevo(terminar: boolean) {
    if (this.ingredienteNuevo.cantidad) {
      this.spinner.start();
      this.cocinaService.agregarIngredienteMenu(this.menu.id, this.ingredienteNuevo.id_producto,
        this.ingredienteNuevo.cantidad).subscribe(() => {
        this.ingredientesAgregados++;
        if (terminar) {
          this.dialogRef.close(this.ingredientesAgregados);
        } else {
          this.dialogRef.close(-1);
        }
        this.notificationsService.success('OK', 'Ingrediente agregado al menú!');
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      });
    } else {
      this.notificationsService.warn('Error', 'Complete todos los campos!');
    }
  }

}
