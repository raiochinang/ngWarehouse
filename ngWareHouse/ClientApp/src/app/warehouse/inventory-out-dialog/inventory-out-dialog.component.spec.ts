import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutDialogComponent } from './inventory-out-dialog.component';

describe('InventoryOutDialogComponent', () => {
  let component: InventoryOutDialogComponent;
  let fixture: ComponentFixture<InventoryOutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
