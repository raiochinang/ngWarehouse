import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../interfaces/globals';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  baseURL: string = "";
  items: Data[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private globals: Globals) {
    this.baseURL = baseUrl;
    var url = this.baseURL + 'api/Product/GetInventoryByLocation';
    var item = {
      locationId: globals.user.branch_id
    } as Data;
    this.http.post<Data[]>(url, item).subscribe(res => {
      this.items = res;
    });
  }

  ngOnInit() {
  }

}
