import { TestBed, async, inject } from '@angular/core/testing';

import { CajaGuard } from './caja.guard';

describe('CajaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CajaGuard]
    });
  });

  it('should ...', inject([CajaGuard], (guard: CajaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
