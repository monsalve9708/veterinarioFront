import { TestBed } from '@angular/core/testing';

import { PlanhuellasService } from './planhuellas.service';

describe('PlanhuellasService', () => {
  let service: PlanhuellasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanhuellasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
