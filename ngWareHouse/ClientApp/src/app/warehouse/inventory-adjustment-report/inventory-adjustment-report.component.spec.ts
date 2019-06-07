import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAdjustmentReportComponent } from './inventory-adjustment-report.component';

describe('InventoryAdjustmentReportComponent', () => {
  let component: InventoryAdjustmentReportComponent;
  let fixture: ComponentFixture<InventoryAdjustmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAdjustmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAdjustmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
