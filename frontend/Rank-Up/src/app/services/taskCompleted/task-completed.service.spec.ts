import { TestBed } from '@angular/core/testing';

import { TaskCompletedService } from './task-completed.service';

describe('TaskCompletedService', () => {
  let service: TaskCompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
