import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { Link } from './interfaces/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private logService: LogService, private router: Router) {
    logService.getlogin.subscribe(result => {
      if (result) {
        this.show = true;
        this.user = result;
        //Administrator
        if (result.role_name == "Administrator") {
          this.links = [
            { routerDesc: "Inventory-In", routerLink: "/inventory-entry" },
            { routerDesc: "Inventory-Out", routerLink: "/inventory-out-going" },
            { routerDesc: "Consumption", routerLink: "/inventory-consumption" },
            { routerDesc: "Adjustment", routerLink: "/inventory-adjustment" },
            { routerDesc: "Inventory Report", routerLink: "/inventory-report" },
          ];
        }
        //Auditor
        else if (result.role_name == "Auditor") {
          this.links = [
            { routerDesc: "Adjustment", routerLink: "/inventory-adjustment" },
            { routerDesc: "Inventory Report", routerLink: "/inventory-report" },
          ];
        }
        //User
        else  {
          this.links = [
            { routerDesc: "Inventory-In", routerLink: "/inventory-entry" },
            { routerDesc: "Inventory-Out", routerLink: "/inventory-out-going" },
            { routerDesc: "Consumption", routerLink: "/inventory-consumption" },
            { routerDesc: "Inventory Report", routerLink: "/inventory-report" },
          ];
        }
      }
      else {
        this.show = false;
      }
    });
  }

  ngOnInit(): void {
    this.router.navigateByUrl('');
    this.user = {
      full_name_fld: '',
      role_name: ''

    } as User;

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
