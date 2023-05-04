import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantsPointsPage } from './participants-points.page';

describe('ParticipantsPointsPage', () => {
  let component: ParticipantsPointsPage;
  let fixture: ComponentFixture<ParticipantsPointsPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ParticipantsPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
