import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCompletedPage } from './task-completed.page';

describe('TaskCompletedPage', () => {
  let component: TaskCompletedPage;
  let fixture: ComponentFixture<TaskCompletedPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(TaskCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
