import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../interfaces/status';
import { FormControl } from '@angular/forms';
import { LogService } from '../services/log.service';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { log } from 'util';
import { Globals } from '../interfaces/globals';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-purchase-recieve-entry',
  templateUrl: './purchase-recieve-entry.component.html',
  styleUrls: ['./purchase-recieve-entry.component.css']
})
export class PurchaseRecieveEntryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private globals: Globals, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
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
  options: Product[] = [];
  filteredOptions: Observable<Product[]>;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      var poNum = this.padLeft(this.id.toString(), '0', 8);
      this.poNumber.setValue('PO-' + poNum);
    });

    var url = this.baseUrl + 'api/Product/GetProducts';
    this.http.get<Product[]>(url).subscribe(res => {
      this.options = res;
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
    return this.options[index].item;
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
      return this.options.filter(option => option.item.toLowerCase().includes(filterValue));
    }
  }
}
