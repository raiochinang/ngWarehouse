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


@NgModule({
  declarations: [
    InventoryInComponent,
    InventoryOutComponent,
    InventoryAdjustmentComponent,
    InventoryConsumptionComponent,
    InventoryInDialogComponent
  ],
  entryComponents: [
    InventoryInDialogComponent
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
    RouterModule.forRoot([
      { path: 'inv-in', component: InventoryInComponent, pathMatch: 'full' },
      { path: 'inv-out', component: InventoryOutComponent, pathMatch: 'full' },
      { path: 'inv-adj', component: InventoryAdjustmentComponent, pathMatch: 'full' },
      { path: 'inv-con', component: InventoryConsumptionComponent, pathMatch: 'full' }
    ])
  ]
})
export class WarehouseModule { }
