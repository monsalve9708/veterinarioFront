import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeluqueriaComponent } from './modal-peluqueria.component';

describe('ModalPeluqueriaComponent', () => {
  let component: ModalPeluqueriaComponent;
  let fixture: ComponentFixture<ModalPeluqueriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPeluqueriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPeluqueriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
