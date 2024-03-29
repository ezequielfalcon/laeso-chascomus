import { SpinnerService } from './../../modulos/utils/directivas/spinner/spinner.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  model: any = {};
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private notificationsService: NotificationsService,
    private spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.loginService.logout();
    this.spinner.stop();
    this.returnUrl = '/';
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  login() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
        () => {
          this.notificationsService.success('OK', 'Sesión iniciada!');
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.notificationsService.error('Error', error.error.mensaje);
          this.loading = false;
        }
      );
  }

}
