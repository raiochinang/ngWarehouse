import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryInComponent } from './inventory-in/inventory-in.component';
import { InventoryOutComponent } from './inventory-out/inventory-out.component';
import { InventoryAdjustmentComponent } from './inventory-adjustment/inventory-adjustment.component';
import { InventoryConsumptionComponent } from './inventory-consumption/inventory-consumption.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryInDialogComponent } from './inventory-in-dialog/inventory-in-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InventoryOutDialogComponent } from './inventory-out-dialog/inventory-out-dialog.component';
import { InventoryAdjustmentDialogComponent } from './inventory-adjustment-dialog/inventory-adjustment-dialog.component';
import { InventoryConsumptionDialogComponent } from './inventory-consumption-dialog/inventory-consumption-dialog.component';
import { InventoryInReportComponent } from './inventory-in-report/inventory-in-report.component';
import { InventoryOutReportComponent } from './inventory-out-report/inventory-out-report.component';
import { InventoryAdjustmentReportComponent } from './inventory-adjustment-report/inventory-adjustment-report.component';
import { InventoryConsumptionReportComponent } from './inventory-consumption-report/inventory-consumption-report.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    InventoryInComponent,
    InventoryOutComponent,
    InventoryAdjustmentComponent,
    InventoryConsumptionComponent,
    InventoryInDialogComponent,
    InventoryOutDialogComponent,
    InventoryAdjustmentDialogComponent,
    InventoryConsumptionDialogComponent,
    InventoryInReportComponent,
    InventoryOutReportComponent,
    InventoryAdjustmentReportComponent,
    InventoryConsumptionReportComponent,
    InventoryReportComponent
  ],
  entryComponents: [
    InventoryInDialogComponent,
    InventoryOutDialogComponent,
    InventoryAdjustmentDialogComponent,
    InventoryConsumptionDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forRoot([
      { path: 'inv-in', component: InventoryInComponent, pathMatch: 'full' },
      { path: 'inv-out', component: InventoryOutComponent, pathMatch: 'full' },
      { path: 'inv-adj', component: InventoryAdjustmentComponent, pathMatch: 'full' },
      { path: 'inv-con', component: InventoryConsumptionComponent, pathMatch: 'full' },

      { path: 'inv-in-report', component: InventoryInReportComponent, pathMatch: 'full' },
      { path: 'inv-out-report', component: InventoryOutReportComponent, pathMatch: 'full' },
      { path: 'inv-adj-report', component: InventoryAdjustmentReportComponent, pathMatch: 'full' },
      { path: 'inv-con-report', component: InventoryConsumptionReportComponent, pathMatch: 'full' },
      { path: 'inv-report', component: InventoryReportComponent, pathMatch: 'full' }
    ])
  ]
})
export class WarehouseModule { }
