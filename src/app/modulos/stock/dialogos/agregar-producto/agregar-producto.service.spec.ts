import { TestBed, inject } from '@angular/core/testing';

import { AgregarProductoService } from './agregar-producto.service';

describe('AgregarProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgregarProductoService]
    });
  });

  it('should be created', inject([AgregarProductoService], (service: AgregarProductoService) => {
    expect(service).toBeTruthy();
  }));
});
