import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../interfaces/product';
import { Globals } from '../interfaces/globals';
import { global } from '@angular/compiler/src/util';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-inventory-entry',
  templateUrl: './inventory-entry.component.html',
  styleUrls: ['./inventory-entry.component.css']
})
export class InventoryEntryComponent implements OnInit {
  items: Data[];
  products: Product[];
  barcode: string = '';
  lotnumber: string = '';
  itemLabel: string = '';
  itemId: number = 0;
  branch: string = '';
  baseURL: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private globals: Globals) {
    var url = baseUrl + 'api/Product/GetProducts';
    this.baseURL = baseUrl;
    http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));

    this.branch = globals.user.branch;
  }

  entryForm = new FormGroup({
    barcode: new FormControl(''),
    quantity: new FormControl(''),
    expiryDate: new FormControl(''),
    comment: new FormControl('')
  });

  ngOnInit() {
    this.items = [];
    
  }

  scan() {
    var x = this.entryForm.value;
    if (x.barcode.length > 11) {
      this.barcode = x.barcode.substring(0, 5);
      this.lotnumber = x.barcode.substring(5, 12);
      var productList = this.products.filter(product => product.barcode === this.barcode);
      if (productList.length > 0) {
        this.itemLabel = productList[0].item;
        this.itemId = productList[0].id;
      }
      else {
        this.itemLabel = "ITEM NOT FOUND!"
        this.barcode = "";
        this.lotnumber = "";
        this.entryForm.reset();
      }
    }
  }

  onConfirm() {
    var x = this.entryForm.value;
    var item = {
      branch: this.branch,
      barcode: this.barcode,
      lotNumber: this.lotnumber,
      item: this.itemLabel,
      productId: this.itemId,
      quantity: x.quantity,
      expiryDate: x.expiryDate.toDateString(),
      comment: x.comment,
      locationId: this.globals.user.branch_id,
      userId: this.globals.user.id
    } as Data;

    var url = this.baseURL + 'api/Product/ProductEntry';
    this.http.post<boolean>(url, item).subscribe(res => {
    });


    this.items.push(item);
    this.entryForm.reset();
    this.itemLabel = "";


  }

  onCancel() {
    this.entryForm.reset();
  }
}
