import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-remito-completo',
  templateUrl: './remito-completo.component.html',
  styleUrls: ['./remito-completo.component.css']
})
export class RemitoCompletoComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      console.log('hay id: ' + this.id);
    } else {
      console.log('no hay id');
    }
  }

}
