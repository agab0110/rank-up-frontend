import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPrizesPagePage } from './admin-prizes-page.page';

describe('AdminPrizesPagePage', () => {
  let component: AdminPrizesPagePage;
  let fixture: ComponentFixture<AdminPrizesPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminPrizesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
