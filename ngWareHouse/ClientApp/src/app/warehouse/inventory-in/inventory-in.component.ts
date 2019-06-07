import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { InventoryInDialogComponent } from '../inventory-in-dialog/inventory-in-dialog.component';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseService } from '../service/warehouse.service';



@Component({
  selector: 'app-inventory-in',
  templateUrl: './inventory-in.component.html',
  styleUrls: ['./inventory-in.component.css']
})
export class InventoryInComponent implements OnInit {

  index: number = 0;
  animal: string;
  transactionType: string;
  transactionData: WareHouseTransaction[];
  displayedColumns = ["product", "lotNumber", "quantity", "expirationDate", "reference", "comment"];

  dataSource = new MatTableDataSource([]);
  constructor(
    private logService: LogService,
    public dialog: MatDialog,
    private warehouseService: WarehouseService
  ) {
    logService.setHeaderLabel("Inventory In");
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
    const dialogRef = this.dialog.open(InventoryInDialogComponent, {
      width: '650px',
      data: {
        transactionType: this.transactionType,
        animal: this.animal
      }
    });
    
  }
}
