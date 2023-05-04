import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNotificationDescriptionPage } from './admin-notification-description.page';

describe('AdminNotificationDescriptionPage', () => {
  let component: AdminNotificationDescriptionPage;
  let fixture: ComponentFixture<AdminNotificationDescriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminNotificationDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
