import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../interfaces/status';

@Component({
  selector: 'app-purchase-recieve-entry',
  templateUrl: './purchase-recieve-entry.component.html',
  styleUrls: ['./purchase-recieve-entry.component.css']
})
export class PurchaseRecieveEntryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  //
  //Variables
  //
  id: number;
  sub: any;
  status: Status[] = [
    { value: 'draft', viewValue: 'Draft' },
    { value: 'final', viewValue: 'Final' }
  ];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
