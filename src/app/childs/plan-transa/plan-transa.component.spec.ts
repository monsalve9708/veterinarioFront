import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTransaComponent } from './plan-transa.component';

describe('PlanTransaComponent', () => {
  let component: PlanTransaComponent;
  let fixture: ComponentFixture<PlanTransaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTransaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTransaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
