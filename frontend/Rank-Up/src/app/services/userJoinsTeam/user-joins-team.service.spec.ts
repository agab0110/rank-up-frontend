import { TestBed } from '@angular/core/testing';

import { UserJoinsTeamService } from './user-joins-team.service';

describe('UserJoinsTeamService', () => {
  let service: UserJoinsTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserJoinsTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
