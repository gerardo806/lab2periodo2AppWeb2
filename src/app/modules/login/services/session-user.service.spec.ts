import { TestBed } from '@angular/core/testing';

import { SessioUserService } from './session-user.service';

describe('SessioUserService', () => {
  let service: SessioUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessioUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
