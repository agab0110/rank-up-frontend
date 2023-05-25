import { TestBed } from '@angular/core/testing';

import { UserReciveNotificationService } from './user-recive-notification.service';

describe('UserReciveNotificationService', () => {
  let service: UserReciveNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReciveNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
