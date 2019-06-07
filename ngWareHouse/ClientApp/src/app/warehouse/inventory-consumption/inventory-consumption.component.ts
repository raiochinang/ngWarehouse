import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseService } from '../service/warehouse.service';
import { InventoryConsumptionDialogComponent } from '../inventory-consumption-dialog/inventory-consumption-dialog.component';



@Component({
  selector: 'app-inventory-consumption',
  templateUrl: './inventory-consumption.component.html',
  styleUrls: ['./inventory-consumption.component.css']
})
export class InventoryConsumptionComponent implements OnInit {

  index: number = 0;
  animal: string;
  transactionType: string;
  transactionData: WareHouseTransaction[];
  displayedColumns = ["product", "lotNumber", "quantity", "reference", "comment"];

  dataSource = new MatTableDataSource([]);
  constructor(
    private logService: LogService,
    public dialog: MatDialog,
    private warehouseService: WarehouseService
  ) {
    logService.setHeaderLabel("Inventory Out");
  }

  ngOnInit() {
    this.transactionData = [];
    this.dataSource = new MatTableDataSource([]);
    this.warehouseService.transaction.subscribe(result => {
      result.product = this.warehouseService.productName;
      this.transactionData.push(result);
      this.dataSource = new MatTableDataSource(this.transactionData);
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(InventoryConsumptionDialogComponent, {
      width: '650px',
      data: {
        transactionType: this.transactionType,
        animal: this.animal
      }
    });

  }
}
