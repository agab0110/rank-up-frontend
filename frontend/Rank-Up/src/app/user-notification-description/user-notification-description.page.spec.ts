import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNotificationDescriptionPage } from './user-notification-description.page';

describe('UserNotificationDescriptionPage', () => {
  let component: UserNotificationDescriptionPage;
  let fixture: ComponentFixture<UserNotificationDescriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserNotificationDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
