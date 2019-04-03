import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory-out-going',
  templateUrl: './inventory-out-going.component.html',
  styleUrls: ['./inventory-out-going.component.css']
})
export class InventoryOutGoingComponent implements OnInit, AfterViewInit {
  form = new FormGroup({
    barcode: new FormControl(''),
    location: new FormControl('')
  });

 locations = [
    { value: 1, text: 'Location1' },
    { value: 2, text: 'Location2' },
  ]

  barcodeValue;
  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;

  ngAfterViewInit(): void {
    this.barecodeScanner.start();
  }

  constructor() { }

  ngOnInit() {
  }

  onValueChanges(result) {
    debugger;
    this.barcodeValue = result.codeResult.code;
  }

  scan(ev: any) {
    
    var x = this.form.value;
    var value = x.barcode.split('*');
    debugger;
    if (value.length > 1) {
      //quantity + barcode
      console.log('quantity + barcode');
    }
    else {
      //1 item only
      console.log('barcode only');
    }

    if (x.barcode.length > 11) {

    }   
  }

}

interface Data1 {
  branch: string;
  barcode: string;
  lotNumber: string;
  item: string;
  quantity: number;
  expiryDate: string;
  comment: string;
  productId: number;
  locationId: number;
  userId: number;
}
