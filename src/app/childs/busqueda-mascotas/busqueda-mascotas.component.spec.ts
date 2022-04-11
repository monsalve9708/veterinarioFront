import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaMascotasComponent } from './busqueda-mascotas.component';

describe('BusquedaMascotasComponent', () => {
  let component: BusquedaMascotasComponent;
  let fixture: ComponentFixture<BusquedaMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
