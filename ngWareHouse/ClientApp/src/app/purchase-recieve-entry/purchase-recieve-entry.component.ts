import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../interfaces/status';
import { FormControl } from '@angular/forms';
import { LogService } from '../services/log.service';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { log } from 'util';
import { Globals } from '../interfaces/globals';
import { map, startWith } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-purchase-recieve-entry',
  templateUrl: './purchase-recieve-entry.component.html',
  styleUrls: ['./purchase-recieve-entry.component.css']
})
export class PurchaseRecieveEntryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private globals: Globals) {
  }

  //
  //Variables
  //
  id: number;
  sub: any;
  status: Status[] = [
    { value: 'draft', viewValue: 'Draft' },
    { value: 'final', viewValue: 'Final' }
  ];
  user: User;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];

  poNumber = new FormControl('');
  branch = new FormControl('');
  product = new FormControl();
  options: Product[] = [
    { id: 1, item_name_fld: 'apple' }, { id: 2, item_name_fld: 'banana' }, { id: 3, item_name_fld: 'bananapple' },
    { id: 4, item_name_fld: 'avocado' }, { id: 5, item_name_fld: 'melon' }, { id: 6, item_name_fld: 'watermelon' },
    { id: 7, item_name_fld: 'mango' }, { id: 8, item_name_fld: 'star apple' }, { id: 9, item_name_fld: 'pineapple' },
    { id: 10, item_name_fld: 'chico' }, { id: 11, item_name_fld: 'grapes' }, { id: 12, item_name_fld: 'oranges' },
    { id: 13, item_name_fld: 'strawberries' }, { id: 14, item_name_fld: 'peaches' }, { id: 15, item_name_fld: 'apricots' },
  ];
  filteredOptions: Observable<Product[]>;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      var poNum = this.padLeft(this.id.toString(), '0', 8);
      this.poNumber.setValue('PO-' + poNum);
    });

    this.poNumber.disable();
    this.branch.disable();
    this.branch.setValue(this.globals.user.branch);

    this.filteredOptions = this.product.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  itemSelected(event: MatAutocompleteSelectedEvent) {
    debugger;
  }

  onDisplayWith(id: number) {
    if (!id) return '';

    let index = this.options.findIndex(item => item.id === id);
    return this.options[index].item_name_fld;
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }

  private _filter(value: string): Product[] {    
    if (Number(value)) {
      var filterValue = Number(value);
      return this.options.filter(option => option.id === filterValue);
    }
    else {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.item_name_fld.toLowerCase().includes(filterValue));
    }
  }  
}
