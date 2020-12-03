import { Component, OnInit } from '@angular/core';
import { home } from '../home.model';



@Component({
  selector: 'app-createchecklist',
  templateUrl: './createchecklist.component.html',
  styleUrls: ['./createchecklist.component.scss']
})
export class CreatechecklistComponent implements OnInit {

  constructor() { }

  additem(usermodel) {
    console.log(usermodel);
  }
  
  home = new home()
  
  ngOnInit(): void {
  }
  
}
