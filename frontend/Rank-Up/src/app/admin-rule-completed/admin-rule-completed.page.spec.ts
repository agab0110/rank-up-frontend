import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRuleCompletedPage } from './admin-rule-completed.page';

describe('AdminRuleCompletedPage', () => {
  let component: AdminRuleCompletedPage;
  let fixture: ComponentFixture<AdminRuleCompletedPage>;

  beforeEach (async() => {
    fixture = TestBed.createComponent(AdminRuleCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
