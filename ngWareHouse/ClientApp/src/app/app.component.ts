import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { Router } from '@angular/router';
import { User } from './interfaces/user';

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

}
