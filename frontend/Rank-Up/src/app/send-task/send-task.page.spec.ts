import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendTaskPage } from './send-task.page';

describe('SendTaskPage', () => {
  let component: SendTaskPage;
  let fixture: ComponentFixture<SendTaskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
