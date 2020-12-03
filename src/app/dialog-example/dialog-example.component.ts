import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

   
  constructor() { }

 
  
  topics = ['item1', 'item2', 'item3'];
  
  
// userForm: NgForm;
 selectedValue: string= 'Choose';
 

 onSubmit(userForm) {
   console.log(userForm);
 }
 selectedItemsList = [];
 checkedIDs = [];

 checkboxesDataList = [
   {
     id: 'C001',
     label: 'Asset1',
     isChecked: false
   },
   {
     id: 'C002',
     label: 'Asset2',
     isChecked: false
   },
   {
     id: 'C003',
     label: 'Asset3',
     isChecked: false
   },
   {
     id: 'C004',
     label: 'Asset4',
     isChecked: false
   },
   {
     id: 'C004',
     label: 'Asset5',
     isChecked: false
   },
   
   
   {
     id: 'C006',
     label: 'Asset6',
     isChecked: false
   }
 ]

 ngOnInit(): void {
   this.fetchSelectedItems()
   this.fetchCheckedIDs()
  
 }
 

 changeSelection() {
   this.fetchSelectedItems()
 }

 fetchSelectedItems() {
   this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
     return value.isChecked
   });
 
}
fetchCheckedIDs() {
  this.checkedIDs = []
  this.checkboxesDataList.forEach((value, index) => {
    if (value.isChecked) {
      this.checkedIDs.push(value.id);
    }
  });
}

}
