import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaComponent } from './caja.component';

describe('CajaComponent', () => {
  let component: CajaComponent;
  let fixture: ComponentFixture<CajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
