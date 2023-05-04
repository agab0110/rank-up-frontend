import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTeamSettingsPage } from './admin-team-settings.page';

describe('AdminTeamSettingsPage', () => {
  let component: AdminTeamSettingsPage;
  let fixture: ComponentFixture<AdminTeamSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminTeamSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
