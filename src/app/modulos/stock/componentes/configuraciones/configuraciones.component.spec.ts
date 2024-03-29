import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesComponent } from './configuraciones.component';

describe('ConfiguracionesComponent', () => {
  let component: ConfiguracionesComponent;
  let fixture: ComponentFixture<ConfiguracionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
