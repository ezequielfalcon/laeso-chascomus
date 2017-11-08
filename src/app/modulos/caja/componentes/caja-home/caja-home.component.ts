import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NuevaRecepcionService} from '../../../utils/dialogos/nueva-recepcion/nueva-recepcion.service';

@Component({
  selector: 'app-caja-home',
  templateUrl: './caja-home.component.html',
  styleUrls: ['./caja-home.component.css']
})
export class CajaHomeComponent implements OnInit {

  constructor(
    private nuevaRecepcion: NuevaRecepcionService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  nuevaRecep() {
    this.nuevaRecepcion.nuevaRecepcionDialogo(this.vcr);
  }

}
