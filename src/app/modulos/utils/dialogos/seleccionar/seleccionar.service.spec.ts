import { TestBed, inject } from '@angular/core/testing';

import { SeleccionarService } from './seleccionar.service';

describe('SeleccionarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeleccionarService]
    });
  });

  it('should be created', inject([SeleccionarService], (service: SeleccionarService) => {
    expect(service).toBeTruthy();
  }));
});
