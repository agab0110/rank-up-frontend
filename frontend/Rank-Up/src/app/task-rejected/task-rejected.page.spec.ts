import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskRejectedPage } from './task-rejected.page';

describe('TaskRejectedPage', () => {
  let component: TaskRejectedPage;
  let fixture: ComponentFixture<TaskRejectedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskRejectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
