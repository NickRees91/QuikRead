import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayOutputPage } from './display-output.page';

describe('DisplayOutputPage', () => {
  let component: DisplayOutputPage;
  let fixture: ComponentFixture<DisplayOutputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayOutputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
