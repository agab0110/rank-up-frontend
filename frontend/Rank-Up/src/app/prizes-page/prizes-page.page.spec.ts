import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrizesPagePage } from './prizes-page.page';

describe('PrizesPagePage', () => {
  let component: PrizesPagePage;
  let fixture: ComponentFixture<PrizesPagePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(PrizesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
