import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInReportComponent } from './inventory-in-report.component';

describe('InventoryInReportComponent', () => {
  let component: InventoryInReportComponent;
  let fixture: ComponentFixture<InventoryInReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
