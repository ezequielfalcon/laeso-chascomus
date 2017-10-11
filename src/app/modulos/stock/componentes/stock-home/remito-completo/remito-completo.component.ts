import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-remito-completo',
  templateUrl: './remito-completo.component.html',
  styleUrls: ['./remito-completo.component.css']
})
export class RemitoCompletoComponent implements OnInit {

  codigoRemito: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.codigoRemito = this.route.snapshot.queryParams['codigo'];
  }

}
