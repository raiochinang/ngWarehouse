import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { WarehouseService } from '../service/warehouse.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debug } from 'util';
import { Product } from 'src/app/interfaces/product';
import { Globals } from 'src/app/interfaces/globals';

@Component({
  selector: 'app-inventory-adjustment-dialog',
  templateUrl: './inventory-adjustment-dialog.component.html',
  styleUrls: ['./inventory-adjustment-dialog.component.css']
})
export class InventoryAdjustmentDialogComponent implements OnInit {

  public products: Product[];
  public itemLabel: string = "";
  public productId: number = 0;
  public barcode: string = "";
  public lotnumber: string = "";
  public quantity: number = 0;
  public expirationDate: Date = new Date();
  public reference: string = "";
  public comments: string = "";
  public error: boolean = false;
  public remainingQty: number = 0;
  public errorMessage: string = "";

  constructor(
    public dialogRef: MatDialogRef<InventoryAdjustmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WareHouseTransaction,
    private globals: Globals,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.products = this.warehouseService.products;

    this.warehouseService.master.subscribe(response => {
      if (response === null) {
        this.remainingQty = 0;
      }
      else {
        this.remainingQty = response.quantity;
      }

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onScan(value: string) {
    if (value.length > 11) {
      let barcode = value.substring(0, 5);
      let lotnumber = value.substring(5, 12);
      var productList = this.products.filter(product => product.barcode === barcode);
      if (productList.length > 0) {
        this.itemLabel = productList[0].item;
        this.productId = productList[0].id;
        this.lotnumber = lotnumber;
        this.barcode = "";
        this.warehouseService.productName = productList[0].item;
        let model = {
          locationId: this.globals.user.branch_id,
          productId: this.productId,
          lotNumber: this.lotnumber
        } as WareHouseTransaction;
        this.warehouseService.getRemainingQuantity(model);


      }
      else {
        this.itemLabel = "ITEM NOT FOUND!"
        this.warehouseService.productName = "";
        this.remainingQty = 0;
        this.formReset();
      }
    }
  }

  formReset(): void {
    this.barcode = "";
    this.lotnumber = "";
    this.quantity = 0;
    this.reference = "";
    this.comments = "";
    this.productId = 0;
    this.itemLabel = "";
    this.remainingQty = 0;
  }

  onCheckInput(): void {
    if (this.productId == 0) {
      this.error = true;
      this.errorMessage = "No Product in the inventory to be adjusted.";
      return;
    }

    if (this.quantity == 0) {
      this.error = true;
      this.errorMessage = "Quantity must greater the zero.";
      return;
    }

    if (this.expirationDate == null) {
      this.error = true;
      this.errorMessage = "Check the Expiration date.";
      return;
    }
    this.error = false;
  }

  onSaveClick(): void {
    this.onCheckInput();
    let model = {
      locationId: this.globals.user.branch_id,
      productId: this.productId,
      lotNumber: this.lotnumber,
      comment: this.comments,
      reference: this.reference,
      userId: this.globals.user.branch_id,
      lastUpdate: new Date(),
      quantity: this.quantity,
      transactionType: "adjustment"
    } as WareHouseTransaction;

    if (!this.error) {
      this.warehouseService.postTransaction(model);
      this.formReset();
    }
    else {
      this.productId = 0;
      this.barcode = "";
      this.itemLabel = "";
      this.lotnumber = "";
    }


  }
}
