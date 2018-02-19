/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NuevoMenuService } from './nuevo-menu.service';

describe('Service: NuevoMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuevoMenuService]
    });
  });

  it('should ...', inject([NuevoMenuService], (service: NuevoMenuService) => {
    expect(service).toBeTruthy();
  }));
});