import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConsumptionDialogComponent } from './inventory-consumption-dialog.component';

describe('InventoryConsumptionDialogComponent', () => {
  let component: InventoryConsumptionDialogComponent;
  let fixture: ComponentFixture<InventoryConsumptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConsumptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConsumptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
