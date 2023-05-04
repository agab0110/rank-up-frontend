import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamRulesTasksPage } from './team-rules-tasks.page';

describe('TeamRulesTasksPage', () => {
  let component: TeamRulesTasksPage;
  let fixture: ComponentFixture<TeamRulesTasksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamRulesTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
