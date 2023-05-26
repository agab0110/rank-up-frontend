import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuleConfirmationPage } from './rule-confirmation.page';

describe('RuleConfirmationPage', () => {
  let component: RuleConfirmationPage;
  let fixture: ComponentFixture<RuleConfirmationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RuleConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
