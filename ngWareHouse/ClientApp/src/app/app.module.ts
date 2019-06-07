import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LogInComponent } from './log-in/log-in.component';
import { PurchaseRecieveComponent } from './purchase-recieve/purchase-recieve.component';
import { PurchaseRecieveEntryComponent } from './purchase-recieve-entry/purchase-recieve-entry.component';
import { Globals } from './interfaces/globals';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InventoryEntryComponent } from './inventory-entry/inventory-entry.component';
import { InventoryOutGoingComponent } from './inventory-out-going/inventory-out-going.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { InventoryAdjustmentComponent } from './inventory-adjustment/inventory-adjustment.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { WarehouseModule } from './warehouse/warehouse.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LogInComponent,
    PurchaseRecieveComponent,
    PurchaseRecieveEntryComponent,
    InventoryEntryComponent,
    InventoryOutGoingComponent,
    InventoryReportComponent,
    InventoryAdjustmentComponent,
    ConsumptionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    WarehouseModule,
    RouterModule.forRoot([
      { path: '', component: LogInComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'log-in', component: LogInComponent },
      { path: 'home', component: HomeComponent },
      { path: 'purchase-receive', component: PurchaseRecieveComponent },
      { path: 'purchase-receive-entry/:id', component: PurchaseRecieveEntryComponent },
      { path: 'inventory-entry', component: InventoryEntryComponent, pathMatch: 'full' },
      { path: 'inventory-out-going', component: InventoryOutGoingComponent, pathMatch: 'full' },
      { path: 'inventory-adjustment', component: InventoryAdjustmentComponent, pathMatch: 'full' },
      { path: 'inventory-report', component: InventoryReportComponent, pathMatch: 'full' },
      { path: 'inventory-consumption', component: ConsumptionComponent, pathMatch: 'full' },



      //new Approach

    ])
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
