import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  indiceTab: number;

  ngOnInit() {
    switch (this.route.snapshot.params['id']) {
      case 'categorias':
        this.indiceTab = 0;
        break;
      case 'unidades':
        this.indiceTab = 1;
        break;
      default:
        this.indiceTab = 0;
    }
  }

}
