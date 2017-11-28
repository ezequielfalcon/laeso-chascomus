import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRecepcionComponent } from './nueva-recepcion.component';

describe('NuevaRecepcionComponent', () => {
  let component: NuevaRecepcionComponent;
  let fixture: ComponentFixture<NuevaRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
