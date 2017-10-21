import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoCompletoComponent } from './remito-completo.component';

describe('RemitoCompletoComponent', () => {
  let component: RemitoCompletoComponent;
  let fixture: ComponentFixture<RemitoCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitoCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
