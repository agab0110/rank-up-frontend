import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTeamProfilePage } from './user-team-profile.page';

describe('UserTeamProfilePage', () => {
  let component: UserTeamProfilePage;
  let fixture: ComponentFixture<UserTeamProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserTeamProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
