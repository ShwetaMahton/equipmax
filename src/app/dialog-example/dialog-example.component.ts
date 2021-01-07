import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';



@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

   
  constructor(public dialog: MatDialog) { }
  openDialogg() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent ,{height:'80%',width:'70%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }
  
 selectedValue : any;

// userForm: NgForm;
 

 onSubmit(userForm) {
   console.log(userForm);
 }

 ngOnInit(): void {
   
  
 }
}