import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendRulePage } from './send-rule.page';

describe('SendRulePage', () => {
  let component: SendRulePage;
  let fixture: ComponentFixture<SendRulePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendRulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
