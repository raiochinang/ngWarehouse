import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { WarehouseCost } from 'src/app/interfaces/warehouse-cost';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatOptgroup } from '@angular/material/core';
import { concat } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-inventory-cost',
  templateUrl: './inventory-cost.component.html',
  styleUrls: ['./inventory-cost.component.css']
})
export class InventoryCostComponent implements OnInit {

  public dataSource = new MatTableDataSource([]);
  public displayedColumns = ["productName", "cost"];
  public selectedRowIndex: number = -1;
  formData = {} as WarehouseCost;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private logService: LogService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    logService.setHeaderLabel("Inventory Cost");
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    
    this.initFormData();
    var url = this.baseUrl + 'api/Transaction/getInventoryCost';
    this.http.get<WarehouseCost[]>(url).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });


  }

  initFormData() {
    this.formData.productName = "";
    this.formData.cost = 0;
    this.formData.productId = 0;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getRow(row) {
    this.formData.productName = row.productName;
    this.formData.cost = row.cost;
    this.formData.productId = row.productId;
    this.selectedRowIndex = row.id;
  }

  public save() {
    var _this = this;
    if (this.formData.cost == null) {
      this.formData.cost = 0;
    }
    var url = this.baseUrl + 'api/Transaction/UpdateInventoryCost';
    this.http.post<WarehouseCost>(url, this.formData).subscribe(response => {
      if (response) {
        let index = _this.dataSource.data.findIndex(item => item.productId === _this.formData.productId);
        _this.dataSource.data[index].cost = _this.formData.cost;
      }
      _this.initFormData();
    });
  }
}
