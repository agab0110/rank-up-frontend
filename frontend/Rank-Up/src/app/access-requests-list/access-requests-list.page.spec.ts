import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRequestsListPage } from './access-requests-list.page';

describe('AccessRequestsListPage', () => {
  let component: AccessRequestsListPage;
  let fixture: ComponentFixture<AccessRequestsListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccessRequestsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
