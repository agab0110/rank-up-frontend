import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRulePage } from './create-rule.page';

describe('CreateRulePage', () => {
  let component: CreateRulePage;
  let fixture: ComponentFixture<CreateRulePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateRulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
