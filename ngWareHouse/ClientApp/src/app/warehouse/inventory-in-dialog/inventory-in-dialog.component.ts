import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { WarehouseService } from '../service/warehouse.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debug } from 'util';
import { Product } from 'src/app/interfaces/product';
import { Globals } from 'src/app/interfaces/globals';

@Component({
  selector: 'app-inventory-in-dialog',
  templateUrl: './inventory-in-dialog.component.html',
  styleUrls: ['./inventory-in-dialog.component.css']
})
export class InventoryInDialogComponent implements OnInit {

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
  public errorMessage: string = "";

  constructor(
    public dialogRef: MatDialogRef<InventoryInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WareHouseTransaction,
    private globals: Globals,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.products = this.warehouseService.products;
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
      }
      else {
        this.itemLabel = "ITEM NOT FOUND!"
        this.warehouseService.productName = "";
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
  }

  onCheckInput(): void {
    if (this.productId == 0) {
      this.error = true;
      this.errorMessage = "Check require fields.";
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
      expirationDate: this.expirationDate,
      userId: this.globals.user.id,
      lastUpdate: new Date(),
      quantity: this.quantity,
      transactionType: "in"
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
