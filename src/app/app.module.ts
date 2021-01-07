import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { ChecklistpoolComponent } from './checklistpool/checklistpool.component';
import { AssetTableIndexComponent } from './asset-table-index/asset-table-index.component';
import { DialogAssetTableComponent } from './dialog-asset-table/dialog-asset-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    routingcomponents,
    DialogOverviewExampleDialogComponent,
    AssetTableComponent,
    ChecklistpoolComponent,
    AssetTableIndexComponent,
    DialogAssetTableComponent
   
  ],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
