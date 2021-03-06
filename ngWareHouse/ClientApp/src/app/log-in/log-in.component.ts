import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private logService: LogService, private router: Router) {
    logService.getlogin.subscribe(res => {
      if (res) {
        if (res.role_name == "Administrator") {
          this.router.navigateByUrl('/inv-in');
        }
        else if (res.role_name == "Auditor") {
          this.router.navigateByUrl('/inv-adj');
        }
        else {
          this.router.navigateByUrl('/inv-in');
        }
       
        this.showWarning = false;
      }
      else {
        this.username.setValue('');
        this.password.setValue('');
        this.showWarning = true;
      }
    });
  }

  //
  //Variables
  //
  username = new FormControl('');
  password = new FormControl('');
  showWarning: boolean = false;
  hide = true;

  ngOnInit() {
    this.showWarning = false;
  }

  //
  //Methods
  //
  login() {
    var user = {
      'user_name': this.username.value,
      'password': this.password.value
    } as User;
    this.logService.login(user);
  }
}
