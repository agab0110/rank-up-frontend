import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePrizePage } from './create-prize.page';

describe('CreatePrizePage', () => {
  let component: CreatePrizePage;
  let fixture: ComponentFixture<CreatePrizePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatePrizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
