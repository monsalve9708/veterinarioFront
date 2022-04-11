import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHuellasComponent } from './plan-huellas.component';

describe('PlanHuellasComponent', () => {
  let component: PlanHuellasComponent;
  let fixture: ComponentFixture<PlanHuellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanHuellasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanHuellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
