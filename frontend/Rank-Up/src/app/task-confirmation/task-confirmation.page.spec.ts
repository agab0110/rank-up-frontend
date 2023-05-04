import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskConfirmationPage } from './task-confirmation.page';

describe('TaskConfirmationPage', () => {
  let component: TaskConfirmationPage;
  let fixture: ComponentFixture<TaskConfirmationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
