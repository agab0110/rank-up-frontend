import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomeTeamPage } from './admin-home-team.page';

describe('AdminHomeTeamPage', () => {
  let component: AdminHomeTeamPage;
  let fixture: ComponentFixture<AdminHomeTeamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminHomeTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
