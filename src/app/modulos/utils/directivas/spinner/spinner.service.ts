import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SpinnerService {

  public status: Subject<boolean> = new Subject();
  private _active = false;

  public get active(): boolean {
    return this._active;
  }

  public set active(v: boolean) {
    this._active = v;
    this.status.next(v);
  }

  public start(): void {
    this.active = true;
  }

  public stop(): void {
    this.active = false;
  }

}
