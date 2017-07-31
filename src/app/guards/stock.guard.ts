import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockGuard implements CanActivate, CanActivateChild {

  constructor(
    private notifications: NotificationsService
  ) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (sessionStorage.getItem('rolesToken').includes('stock')) {
      return true;
    }
    this.notifications.error('Error', 'Permiso denegado!');
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('rolesToken').includes('stock')) {
      return true;
    }
    this.notifications.error('Error', 'Permiso denegado!');
    return false;
  }
}
