import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import { DataitempoolService } from './dataitempool.service';
import { Dataitempool } from './dataitempool';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
 
dataitempool: Dataitempool[];

  constructor(public dialog: MatDialog , private _dataitempoolService: DataitempoolService) {}


  openDialog() {
  this.dialog.open(DialogExampleComponent ,{height:'90%',width:'100%'});
  }

  ngOnInit() {
    this._dataitempoolService.getDataitempool()
    .subscribe((data: Dataitempool[]) => {
     this.dataitempool= data;
     console.log(this.dataitempool);

    });
   
    }

  userForm: NgForm;
 selectedValue: string= 'others';
 

 onSubmit() {
   console.log(this.userForm.value);
 }

}