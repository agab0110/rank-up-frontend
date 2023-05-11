import { TestBed } from '@angular/core/testing';

import { UserGetPrizeService } from './user-get-prize.service';

describe('UserGetPrizeService', () => {
  let service: UserGetPrizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGetPrizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
