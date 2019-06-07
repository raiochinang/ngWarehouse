import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAdjustmentDialogComponent } from './inventory-adjustment-dialog.component';

describe('InventoryAdjustmentDialogComponent', () => {
  let component: InventoryAdjustmentDialogComponent;
  let fixture: ComponentFixture<InventoryAdjustmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAdjustmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAdjustmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
