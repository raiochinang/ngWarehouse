import { Injectable, Inject } from '@angular/core';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  transaction: Subject<WareHouseTransaction> = new Subject<WareHouseTransaction>();
  products: Product[] = [];
  productName: string = "";

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
    var url = this.baseUrl + 'api/Product/GetProducts';
    this.http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
}
