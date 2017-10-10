import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmarComponent>) {

  }

}
