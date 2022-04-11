import { TestBed } from '@angular/core/testing';

import { PlanhuellasTransaService } from './planhuellasTransa.service';

describe('PlanhuellasService', () => {
  let service: PlanhuellasTransaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanhuellasTransaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
