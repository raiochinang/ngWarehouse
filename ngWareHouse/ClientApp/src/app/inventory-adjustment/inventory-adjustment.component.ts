import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory-adjustment',
  templateUrl: './inventory-adjustment.component.html',
  styleUrls: ['./inventory-adjustment.component.css']
})
export class InventoryAdjustmentComponent implements OnInit {

  form = new FormGroup({
    barcode: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    debugger;
  }

  onUpdate() {
    debugger;
  }

}
