import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { Link } from './interfaces/link';
import { debug } from 'util';
import { WarehouseService } from './warehouse/service/warehouse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public headerLabel: string = "";
  constructor(private logService: LogService, private router: Router,
    private warehouseService: WarehouseService) {
    
    
  }

  ngOnInit(): void {
    this.router.navigateByUrl('');
    this.user = {
      full_name_fld: '',
      role_name: ''

    } as User;
    this.logService.getlogin.subscribe(result => {
      if (result) {
        this.show = true;
        this.user = result;
        //Administrator
        if (result.role_name == "Administrator") {
          this.links = [
            { routerDesc: "Inventory In", routerLink: "/inv-in" },
            { routerDesc: "Inventory Out", routerLink: "/inv-out" },
            { routerDesc: "Inventory Adjustment", routerLink: "/inv-adj" },
            { routerDesc: "Inventory Consumption", routerLink: "/inv-con" },

           
            { routerDesc: "Inventory In Report", routerLink: "/inventory-report" },
          ];
        }
        //Auditor
        else if (result.role_name == "Auditor") {
          this.links = [
            { routerDesc: "Inventory Adjustment", routerLink: "/inv-adj" },

            { routerDesc: "Inventory In Report", routerLink: "/inventory-report" },
          ];
        }
        //User
        else {
          this.links = [
            { routerDesc: "Inventory In", routerLink: "/inv-in" },
            { routerDesc: "Inventory Out", routerLink: "/inv-out" },
            { routerDesc: "Inventory Consumption", routerLink: "/inv-con" },

            { routerDesc: "Inventory In Report", routerLink: "/inventory-report" },
          ];
        }
      }
      else {
        this.show = false;
      }
    });

    this.logService.headerLabel.subscribe(response => {
      this.headerLabel = response;
    });

    this.warehouseService.getProducts();

  }

  //
  //Variables
  //
  title = 'app';
  show: boolean = false;
  showFiller = false;
  user: User;
  links: Link[] = [];

}
