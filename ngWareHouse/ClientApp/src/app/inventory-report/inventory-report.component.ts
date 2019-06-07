import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../interfaces/globals';
import { Data } from '../interfaces/data';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  public transactionDate: Date;
  public brandCode: string;
  public item: string;
  baseURL: string = "";
  items: Data[] = [];
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private globals: Globals,
    private logService: LogService
  ) {
    logService.setHeaderLabel("Inventory Report");
  }

  ngOnInit() {
  }

  search() {
    var item = {
      locationId: this.globals.user.branch_id,
      item: this.item,
      brandCode: this.brandCode,
      transactionDate: this.transactionDate
    } as Data;

    this.http.post<Data[]>(this.baseURL + 'api/Product/GetInventoryByLocation', item).subscribe(res => {
      this.items = res;
    });
  }



}
