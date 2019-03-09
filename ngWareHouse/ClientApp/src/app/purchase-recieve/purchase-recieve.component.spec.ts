import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRecieveComponent } from './purchase-recieve.component';

describe('PurchaseRecieveComponent', () => {
  let component: PurchaseRecieveComponent;
  let fixture: ComponentFixture<PurchaseRecieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRecieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
