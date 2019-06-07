import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConsumptionComponent } from './inventory-consumption.component';

describe('InventoryConsumptionComponent', () => {
  let component: InventoryConsumptionComponent;
  let fixture: ComponentFixture<InventoryConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
