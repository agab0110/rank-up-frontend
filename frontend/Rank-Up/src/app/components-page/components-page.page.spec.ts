import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsPagePage } from './components-page.page';

describe('ComponentsPagePage', () => {
  let component: ComponentsPagePage;
  let fixture: ComponentFixture<ComponentsPagePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ComponentsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
