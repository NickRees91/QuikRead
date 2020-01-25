import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewQRResourcePage } from './add-new-qrresource.page';

describe('AddNewQRResourcePage', () => {
  let component: AddNewQRResourcePage;
  let fixture: ComponentFixture<AddNewQRResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewQRResourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewQRResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
