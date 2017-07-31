import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmarComponent>) {

  }

}
