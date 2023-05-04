import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesAndTasksRulesPage } from './rules-and-tasks-rules.page';

describe('RulesAndTasksRulesPage', () => {
  let component: RulesAndTasksRulesPage;
  let fixture: ComponentFixture<RulesAndTasksRulesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RulesAndTasksRulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
