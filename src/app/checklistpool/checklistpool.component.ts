import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../web-request.service';


export interface PeriodicElement {
  checklistPoolPK: number;
  dataitempoolFK: number;
  checklistFK: number;
  isActive: number;
  }

const ELEMENT_DATA: PeriodicElement[] = [
  ];

@Component({
  selector: 'app-checklistpool',
  templateUrl: './checklistpool.component.html',
  styleUrls: ['./checklistpool.component.scss']
})
export class ChecklistpoolComponent implements OnInit {

  displayedColumnss: string[] = [ 'dataitempoolFK','checklistFK', 'isActive'];
  dataSource = ELEMENT_DATA;

  constructor(private webservice: WebRequestService) { }

  ngOnInit(): void {
    this.webservice.getchecklistpool().subscribe(data =>{
      console.log(data)
      let checklistData  = JSON.parse(JSON.stringify(data))
      this.dataSource = checklistData
      

  })

  }
}
