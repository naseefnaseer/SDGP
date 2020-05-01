import { TestBed } from '@angular/core/testing';

import { Doctor.ServiceService } from './doctor.service.service';

describe('Doctor.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Doctor.ServiceService = TestBed.get(Doctor.ServiceService);
    expect(service).toBeTruthy();
  });
});
