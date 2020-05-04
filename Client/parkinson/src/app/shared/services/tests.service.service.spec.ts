import { TestBed } from '@angular/core/testing';

import { TestsServiceService } from './tests.service.service';

describe('TestsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestsServiceService = TestBed.get(TestsServiceService);
    expect(service).toBeTruthy();
  });
});
