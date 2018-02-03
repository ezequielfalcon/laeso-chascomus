import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../../modelos/menu';
import { Route } from '@angular/router/src/config';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../../utils/directivas/spinner/spinner.service';
import { CocinaService } from '../../../../../servicios/datos/cocina.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-detalle-menu',
  templateUrl: './detalle-menu.component.html',
  styleUrls: ['./detalle-menu.component.css']
})
export class DetalleMenuComponent implements OnInit {

  public menuId: number;

  menu: Menu;

  constructor(
    private cocinaService: CocinaService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.cocinaService.verMenu(+params['id']))
      .subscribe(menuDb => {
        this.menu = menuDb;
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
        if (error.status === 404) {
          this.router.navigate(['/stock/menus']);
        }
      });
  }

}
