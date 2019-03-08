import { Component } from '@angular/core';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private logService: LogService, private router: Router) {
    logService.getlogin.subscribe(res => {
      if (res) {
        this.userName = res.full_name_fld;
      }
    });
  }

  //
  //Variables
  //
  isExpanded = false;
  userName: string = '';

  //
  //Methods
  //
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.logService.setlogin();
    this.router.navigateByUrl('');
  }
}
