import { Injectable, Inject } from '@angular/core';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/interfaces/product';
import { WarehouseMaster } from 'src/app/interfaces/warehouse-master';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  transaction: Subject<WareHouseTransaction> = new Subject<WareHouseTransaction>();
  master: Subject<WarehouseMaster> = new Subject<WarehouseMaster>();
  products: Product[] = [];
  productName: string = "";
  report: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  public postTransaction(model: WareHouseTransaction) {
    var url = this.baseUrl + 'api/Transaction/postTransaction';
    this.http.post<WareHouseTransaction>(url, model).subscribe(response => {
      this.transaction.next(response);
    });
  }

  public getProducts() {
    var url = this.baseUrl + 'api/Transaction/GetProducts';
    this.http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  public getRemainingQuantity(model: WareHouseTransaction) {
    var url = this.baseUrl + 'api/Transaction/getRemainingQuantity';
    this.http.post<WarehouseMaster>(url, model).subscribe(response => {
      this.master.next(response);
    });
  }
}
