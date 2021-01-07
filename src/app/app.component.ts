import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { WebRequestService } from './web-request.service';
import { DialogOverviewExampleDialogComponent} from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
 constructor(public dialog: MatDialog, private service: WebRequestService) {}

openDialog() {
  this.dialog.open(DialogExampleComponent ,{height:'90%',width:'100%'});
  }

   ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi(){
    this.service.getData().subscribe((response) => {
    console.log('Response from API is ', response)
  } ,(error) => {
    console.log('Error is' , error);
  })
  this.service.create({id:1}).subscribe((r)=>{
    console.log(r);
  })
}
}