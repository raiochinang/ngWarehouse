import { Component, OnInit, Inject } from '@angular/core';
import { WarehouseService } from '../service/warehouse.service';
import { Globals } from 'src/app/interfaces/globals';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportModel } from 'src/app/interfaces/report-model';
import { LogService } from 'src/app/services/log.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  report: ReportModel[] = [];
  transactionDate: Date = new Date();
  displayedColumns = ["branch", "product", "lotNumber", "quantity", "expirationDate"];
  dataSource = new MatTableDataSource([]);
  constructor(
    private warehouseService: WarehouseService,
    private globals: Globals,
    private http: HttpClient,
    private logService: LogService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    logService.setHeaderLabel("Inventory Report");
  }

  ngOnInit() {

  }

  onGenerate() {
    let model = {
      locationId: this.globals.user.branch_id
    } as WareHouseTransaction;
    var url = this.baseUrl + 'api/Transaction/generateInventoryReport';
    this.http.post<ReportModel[]>(url, model).subscribe(report => {
      this.dataSource = new MatTableDataSource(report);
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
