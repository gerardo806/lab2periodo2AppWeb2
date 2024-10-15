import { TestBed } from '@angular/core/testing';

import { LowdbService } from './lowdb.service';

describe('LowdbService', () => {
  let service: LowdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LowdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
