import { SpinnerService } from './../../modulos/utils/directivas/spinner/spinner.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.spinner.stop();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

}
