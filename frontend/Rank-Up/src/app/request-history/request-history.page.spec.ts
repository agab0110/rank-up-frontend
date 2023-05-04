import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestHistoryPage } from './request-history.page';

describe('RequestHistoryPage', () => {
  let component: RequestHistoryPage;
  let fixture: ComponentFixture<RequestHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
