import { TestBed } from '@angular/core/testing';

import { RuleCompletedService } from './rule-completed.service';

describe('RuleCompletedService', () => {
  let service: RuleCompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleCompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
