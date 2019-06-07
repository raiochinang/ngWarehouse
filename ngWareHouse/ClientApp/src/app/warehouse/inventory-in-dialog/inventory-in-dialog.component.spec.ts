import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInDialogComponent } from './inventory-in-dialog.component';

describe('InventoryInDialogComponent', () => {
  let component: InventoryInDialogComponent;
  let fixture: ComponentFixture<InventoryInDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
