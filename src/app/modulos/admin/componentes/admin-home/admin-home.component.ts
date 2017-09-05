import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

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
