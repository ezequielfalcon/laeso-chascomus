import { TestBed, inject } from '@angular/core/testing';

import { SeleccionarProveedorService } from './seleccionar-proveedor.service';

describe('SeleccionarProveedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeleccionarProveedorService]
    });
  });

  it('should be created', inject([SeleccionarProveedorService], (service: SeleccionarProveedorService) => {
    expect(service).toBeTruthy();
  }));
});
