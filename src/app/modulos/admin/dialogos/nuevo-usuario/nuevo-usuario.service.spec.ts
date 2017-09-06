import { TestBed, inject } from '@angular/core/testing';

import { NuevoUsuarioService } from './nuevo-usuario.service';

describe('NuevoUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuevoUsuarioService]
    });
  });

  it('should be created', inject([NuevoUsuarioService], (service: NuevoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
