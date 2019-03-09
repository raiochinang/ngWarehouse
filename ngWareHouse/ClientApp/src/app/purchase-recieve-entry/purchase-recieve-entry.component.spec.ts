import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRecieveEntryComponent } from './purchase-recieve-entry.component';

describe('PurchaseRecieveEntryComponent', () => {
  let component: PurchaseRecieveEntryComponent;
  let fixture: ComponentFixture<PurchaseRecieveEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRecieveEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRecieveEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
