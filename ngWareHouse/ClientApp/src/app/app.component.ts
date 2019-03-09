import { Component, OnInit } from '@angular/core';
import { LogService } from './services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
  constructor(private logService: LogService, private router: Router) {
    logService.getlogin.subscribe(res => {
      if (res) {
        this.show = true;
      }
      else {
        this.show = false;
      }
    });
  }

  ngOnInit(): void {
    this.router.navigateByUrl('');
  }

  //
  //Variables
  //
  title = 'app';
  show: boolean = false;
  showFiller = false;
  
}
