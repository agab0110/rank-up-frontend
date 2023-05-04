import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedTaskPage } from './completed-task.page';

describe('CompletedTaskPage', () => {
  let component: CompletedTaskPage;
  let fixture: ComponentFixture<CompletedTaskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompletedTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
