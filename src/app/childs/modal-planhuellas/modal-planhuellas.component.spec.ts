import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanhuellasComponent } from './modal-planhuellas.component';

describe('ModalPlanhuellasComponent', () => {
  let component: ModalPlanhuellasComponent;
  let fixture: ComponentFixture<ModalPlanhuellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlanhuellasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanhuellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
