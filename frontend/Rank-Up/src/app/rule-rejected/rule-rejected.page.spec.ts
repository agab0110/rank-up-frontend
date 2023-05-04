import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuleRejectedPage } from './rule-rejected.page';

describe('RuleRejectedPage', () => {
  let component: RuleRejectedPage;
  let fixture: ComponentFixture<RuleRejectedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RuleRejectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
