import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutReportComponent } from './inventory-out-report.component';

describe('InventoryOutReportComponent', () => {
  let component: InventoryOutReportComponent;
  let fixture: ComponentFixture<InventoryOutReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryOutReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
