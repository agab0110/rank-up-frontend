import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminInsertBarNoselectComponent } from './admin-insert-bar-noselect.component';

describe('AdminInsertBarNoselectComponent', () => {
  let component: AdminInsertBarNoselectComponent;
  let fixture: ComponentFixture<AdminInsertBarNoselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInsertBarNoselectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInsertBarNoselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
