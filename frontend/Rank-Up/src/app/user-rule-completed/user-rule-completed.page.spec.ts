import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRuleCompletedPage } from './user-rule-completed.page';

describe('UserRuleCompletedPage', () => {
  let component: UserRuleCompletedPage;
  let fixture: ComponentFixture<UserRuleCompletedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserRuleCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
