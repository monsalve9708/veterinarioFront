import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeguimientoComponent } from './modal-seguimiento.component';

describe('ModalSeguimientoComponent', () => {
  let component: ModalSeguimientoComponent;
  let fixture: ComponentFixture<ModalSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
