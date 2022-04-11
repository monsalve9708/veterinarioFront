import { TestBed } from '@angular/core/testing';

import { MaetlistaService } from './maetlista.service';

describe('MaetlistaService', () => {
  let service: MaetlistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaetlistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
