import { TestBed } from '@angular/core/testing';

import { ChartResolverService } from './chart-resolver.service';

describe('ChartResolverService', () => {
  let service: ChartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
