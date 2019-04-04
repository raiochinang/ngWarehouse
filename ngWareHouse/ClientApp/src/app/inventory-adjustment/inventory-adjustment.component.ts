import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../interfaces/globals';
import { Product } from '../interfaces/product';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-inventory-adjustment',
  templateUrl: './inventory-adjustment.component.html',
  styleUrls: ['./inventory-adjustment.component.css']
})
export class InventoryAdjustmentComponent implements OnInit {

  form = new FormGroup({
    barcode: new FormControl(''),
    quantity: new FormControl(''),
    comment: new FormControl('')
  });
  products: Product[];
  itemLabel: string = '';
  baseURL: string = "";
  barcode: string = "";
  lotnumber: string = "";
  itemId: number;
  quantity: number = 0;
  item: Data;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private globals: Globals) {
    var url = baseUrl + 'api/Product/GetProducts';
    this.baseURL = baseUrl;
    http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));

  }

  ngOnInit() {
  }

  onScan() {
    var x = this.form.value;
    if (x.barcode.length > 11) {
      this.barcode = x.barcode.substring(0, 5);
      this.lotnumber = x.barcode.substring(5, 12);

      var productList = this.products.filter(product => product.barcode === this.barcode);
      if (productList.length > 0) {
        this.itemLabel = productList[0].item;
        this.itemId = productList[0].id;

        //get the item
        this.item = {
          branch: this.globals.user.branch,
          barcode: this.barcode,
          lotNumber: this.lotnumber,
          item: this.itemLabel,
          productId: this.itemId,
          locationId: this.globals.user.branch_id,
          userId: this.globals.user.id,
          locationIdFrom: this.globals.user.branch_id
        } as Data;

        var url = this.baseURL + 'api/Product/GetProductByBarcode';
        this.http.post<Data>(url, this.item).subscribe(res => {
          this.quantity = res.quantity;
        });
      }
      else {
        this.itemLabel = "";
        this.barcode = "";
        this.lotnumber = "";
        this.form.reset();
      }
    }
  }

  onUpdate() {
    var url = this.baseURL + 'api/Product/ProductAdjust';
    var x = this.form.value;
    if (x.quantity == "") {
      this.item.quantity = 0;
    }
    else {
      this.item.quantity = x.quantity;
    }
    debugger;
    this.item.comment = x.comment;
    this.http.post<boolean>(url, this.item).subscribe(res => {
      this.form.reset();
      this.itemLabel = "";
    });
  }

}
