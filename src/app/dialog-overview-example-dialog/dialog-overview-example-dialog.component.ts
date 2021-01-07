import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebRequestService } from '../web-request.service';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] 

  constructor(public dialog: MatDialog, private webservice: WebRequestService) { }


  checklistAssign() {
    this.dialog.open(DialogOverviewExampleDialogComponent ,{height:'90%',width:'100%'});
    }
  ngOnInit(): void {

this.webservice.getchecklist().subscribe(data =>{
console.log(data)
this.toppingList = JSON.parse(JSON.stringify(data))
})
  }

}
