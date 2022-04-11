import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormulaComponent } from './modal-formula.component';

describe('ModalFormulaComponent', () => {
  let component: ModalFormulaComponent;
  let fixture: ComponentFixture<ModalFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
