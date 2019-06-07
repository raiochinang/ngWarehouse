import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private logService: LogService) {
    this.logService.setHeaderLabel("Home");
  }
  ngOnInit(): void {

  }
}
