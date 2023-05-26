import { TestBed } from '@angular/core/testing';

import { AdminManageTeamService } from './admin-manage-team.service';

describe('AdminManageTeamService', () => {
  let service: AdminManageTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminManageTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
