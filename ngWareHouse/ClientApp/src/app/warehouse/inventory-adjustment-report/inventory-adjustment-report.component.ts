import { Component, OnInit, Inject } from '@angular/core';
import { WarehouseService } from '../service/warehouse.service';
import { Globals } from 'src/app/interfaces/globals';
import { WareHouseTransaction } from 'src/app/interfaces/ware-house-transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportModel } from 'src/app/interfaces/report-model';
import { LogService } from 'src/app/services/log.service';
import { MatTableDataSource } from '@angular/material/table';
import { Moment } from 'moment';

@Component({
  selector: 'app-inventory-adjustment-report',
  templateUrl: './inventory-adjustment-report.component.html',
  styleUrls: ['./inventory-adjustment-report.component.css']
})
export class InventoryAdjustmentReportComponent implements OnInit {

  report: ReportModel[] = [];
  transactionDate: Date;
  selected: { startDate: Moment, endDate: Moment };
  displayedColumns = ["branch", "product", "lotNumber", "quantity", "transactionDate", "reference", "comment", "userName"];
  dataSource = new MatTableDataSource([]);
  constructor(
    private warehouseService: WarehouseService,
    private globals: Globals,
    private http: HttpClient,
    private logService: LogService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    logService.setHeaderLabel("Inventory Adjustment Report");
  }

  ngOnInit() {

  }

  onGenerate() {
    let model = {
      transactionType: "adjustment",
      locationId: this.globals.user.branch_id,
      lastUpdate: this.selected.startDate.toDate(),
      lastUpdateTo: this.selected.endDate.toDate(),
    } as WareHouseTransaction;
    var url = this.baseUrl + 'api/Transaction/generateReport';
    this.http.post<ReportModel[]>(url, model).subscribe(report => {
      this.dataSource = new MatTableDataSource(report);
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
