import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.css']
})
export class SeleccionarComponent implements OnInit {

  public elementos: any[];
  public titulo: string;

  filtro = '';

  constructor(
    public dialogRef: MatDialogRef<SeleccionarComponent>
  ) { }

  ngOnInit() {
  }

}
