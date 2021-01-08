import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { findIndex } from 'rxjs/operators';
import { WebRequestService } from '../web-request.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssetTableComponent } from '../dialog-asset-table/dialog-asset-table.component';


export interface PeriodicElement {
  poolItemKeyPK: number;
  AssetId: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { poolItemKeyPK:5, AssetId: 'Hydrogen' },
  {poolItemKeyPK:3, AssetId: 'Helium'},
  {poolItemKeyPK:4, AssetId: 'Lithium'},
  {poolItemKeyPK:6, AssetId: 'Beryllium'}
  
];
@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent implements OnInit {
  displayedColumns: string[] = ['id','poolAssetID', "getdetails","Create","viewdetails"];
  dataSource = ELEMENT_DATA;
  

  constructor(private _router: Router, private webservice: WebRequestService, public dialog: MatDialog) { }
  open(index : number) {
    const dialogRef = this.dialog.open(DialogAssetTableComponent ,{height:'80%',width:'70%'});
    this._router.navigate(['/asset-table',index]);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }
  ngOnInit(): void {
    this.webservice.getassetid().subscribe(data =>{
      console.log(data)
      let assetData = JSON.parse(JSON.stringify(data))
      
      this.dataSource = assetData
      
  })
 }
  getRecord(index: number): void 
  {
    this._router.navigate(['/asset-table',index]);
   }
   
  
}
  

