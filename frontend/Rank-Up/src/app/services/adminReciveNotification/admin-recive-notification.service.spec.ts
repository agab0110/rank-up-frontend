import { TestBed } from '@angular/core/testing';

import { AdminReciveNotificationService } from './admin-recive-notification.service';

describe('AdminReciveNotificationService', () => {
  let service: AdminReciveNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReciveNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
