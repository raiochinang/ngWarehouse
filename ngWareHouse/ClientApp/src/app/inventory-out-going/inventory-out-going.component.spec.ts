import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutGoingComponent } from './inventory-out-going.component';

describe('InventoryOutGoingComponent', () => {
  let component: InventoryOutGoingComponent;
  let fixture: ComponentFixture<InventoryOutGoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutGoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutGoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
