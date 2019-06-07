import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConsumptionReportComponent } from './inventory-consumption-report.component';

describe('InventoryConsumptionReportComponent', () => {
  let component: InventoryConsumptionReportComponent;
  let fixture: ComponentFixture<InventoryConsumptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConsumptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConsumptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
