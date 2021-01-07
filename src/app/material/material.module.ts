import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import  { MatDialogModule } from '@angular/material/dialog'; 
import { MatBadgeModule } from '@angular/material/badge';

import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';

import {MatListModule} from '@angular/material/list';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




const material = [
  MatButtonModule,
  MatDialogModule,
  MatBadgeModule,
  
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule, 
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
];



@NgModule({
  
  imports: [ material ],
  exports: [ material ]

})
export class MaterialModule { }
