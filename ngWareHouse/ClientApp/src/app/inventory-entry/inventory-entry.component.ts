import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory-entry',
  templateUrl: './inventory-entry.component.html',
  styleUrls: ['./inventory-entry.component.css']
})
export class InventoryEntryComponent implements OnInit {
  items: Data[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //  this.forecasts = result;
    //}, error => console.error(error));
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

  onConfirm() {
    var x = this.entryForm.value;
    var item = {
      barcode: x.barcode,
      item: x.barcode,
      quantity: x.quantity,
      expiryDate: x.expiryDate.toDateString(),
      comment: x.comment
    } as Data;

    this.items.push(item);
    this.entryForm.reset();
  }

  onCancel() {
    this.entryForm.reset();
  }
}

interface Data {
  barcode: string;
  item: string;
  quantity: number;
  expiryDate: string;
  comment: string;
}
