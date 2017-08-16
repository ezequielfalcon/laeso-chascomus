import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {NotificationsService} from 'angular2-notifications/dist';

@Injectable()
export class CajaGuard implements CanActivate, CanActivateChild {

  constructor(
    private notifications: NotificationsService
  ) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (sessionStorage.getItem('roles').includes('caja') || sessionStorage.getItem('roles').includes('admin')) {
      return true;
    }
    this.notifications.error('Error', 'Permiso denegado!');
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('roles').includes('caja') || sessionStorage.getItem('roles').includes('admin')) {
      return true;
    }
    this.notifications.error('Error', 'Permiso denegado!');
    return false;
  }
}
