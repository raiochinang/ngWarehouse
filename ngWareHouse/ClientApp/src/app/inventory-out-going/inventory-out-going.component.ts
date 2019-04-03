import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../interfaces/globals';
import { Branch } from '../interfaces/branch';
import { Product } from '../interfaces/product';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-inventory-out-going',
  templateUrl: './inventory-out-going.component.html',
  styleUrls: ['./inventory-out-going.component.css']
})
export class InventoryOutGoingComponent implements OnInit {
  form = new FormGroup({
    barcode: new FormControl(''),
    location: new FormControl(''),
  });
  baseURL: string = "";
  locations: Branch[];
  products: Product[];
  barcode: string = "";
  lotnumber: string = "";
  items: Data[];
  branch: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private globals: Globals) {
    this.baseURL = baseUrl;
    http.get<Branch[]>(baseUrl + 'api/Product/GetBranches').subscribe(result => {
      this.locations = result;
    }, error => console.error(error));

    http.get<Product[]>(baseUrl + 'api/Product/GetProducts').subscribe(result => {
      this.products = result;
    }, error => console.error(error));

    this.branch = globals.user.branch;
  }

  ngOnInit() {
    this.items = [];
  }

  scan(ev: any) {

    var x = this.form.value;
    var value = x.barcode.split('*');
    var branchList = this.locations.filter(b => b.id === x.location);
    var branchName = "";
    var branchId = 0;
    if (branchList.length > 0) {
      branchName = branchList[0].name;
      branchId = branchList[0].id;
    }
    var quantity = 1;
    if (value.length > 1) {
      //quantity + barcode
      console.log('quantity + barcode');
      quantity = parseInt(value[0]);
      if (value[1].length > 11) {
        this.barcode = value[1].substring(0, 5);
        this.lotnumber = value[1].substring(5, 12);
      }
    }
    else {
      //1 item only
      console.log('barcode only');
      if (value[0].length > 11) {
        this.barcode = value[0].substring(0, 5);
        this.lotnumber = value[0].substring(5, 12);
      }
    }

    var productList = this.products.filter(product => product.barcode === this.barcode);
    if (productList.length > 0) {
      var item = {
        branch: branchName,
        barcode: this.barcode,
        lotNumber: this.lotnumber,
        item: productList[0].item,
        productId: productList[0].id,
        quantity: quantity,
        locationId: branchId,
        userId: this.globals.user.id,
        expiryDate: '',
        comment: '',
        locationIdFrom: this.globals.user.branch_id
      } as Data;
      this.items.push(item);
      this.saveToDataBase(item);
    }
  }

  saveToDataBase(item: Data) {
    var url = this.baseURL + 'api/Product/ProductOutGoing';
    debugger;
    this.http.post<boolean>(url, item).subscribe();
  }

}

