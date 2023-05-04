import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserInsertBarNoselectComponent } from './user-insert-bar-noselect.component';

describe('UserInsertBarNoselectComponent', () => {
  let component: UserInsertBarNoselectComponent;
  let fixture: ComponentFixture<UserInsertBarNoselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInsertBarNoselectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInsertBarNoselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
