import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTeamPage } from './search-team.page';

describe('SearchTeamPage', () => {
  let component: SearchTeamPage;
  let fixture: ComponentFixture<SearchTeamPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(SearchTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
