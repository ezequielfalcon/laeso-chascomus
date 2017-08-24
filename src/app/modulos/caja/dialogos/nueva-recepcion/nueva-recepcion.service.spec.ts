import { TestBed, inject } from '@angular/core/testing';

import { NuevaRecepcionService } from './nueva-recepcion.service';

describe('NuevaRecepcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuevaRecepcionService]
    });
  });

  it('should be created', inject([NuevaRecepcionService], (service: NuevaRecepcionService) => {
    expect(service).toBeTruthy();
  }));
});
