import { Component, OnInit } from '@angular/core';
import { AssetTableComponent } from '../asset-table/asset-table.component';
import { ActivatedRoute , Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';



@Component({
  selector: 'app-asset-table-index',
  templateUrl: './asset-table-index.component.html',
  styleUrls: ['./asset-table-index.component.scss']
})
export class AssetTableIndexComponent implements OnInit {
  private _id:number;
  assetIndex : AssetTableIndexComponent;

  data: any;
  id: any;
  constructor(private _router: ActivatedRoute, private webservice: WebRequestService) { }

  ngOnInit(): void {
   console.log(this._router.snapshot.params)
   this.id = this._router.snapshot.params.id
   console.log("id" , this.id);
   this.getOne();
    
  }

  getOne()
  {
    this.webservice.getOne(this.id).subscribe(data=>
      {
        console.log(this.data);
        this.data=JSON.parse(JSON.stringify(data));
       
      })
  }
  deleteData(id)
  {
    this.data.splice(id.poolItemKeyPK,2)
    
     this.webservice.deleteData(id).subscribe((data) =>{
      console.log("deleted sucessfully",data);
     })
  }

  edit(id, i ) 
  {
    console.log("id",id);
    this.webservice.updateData(this).subscribe(data=>{

    })
  }
}
