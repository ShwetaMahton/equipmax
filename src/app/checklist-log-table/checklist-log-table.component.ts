import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-checklist-log-table',
  templateUrl: './checklist-log-table.component.html',
  styleUrls: ['./checklist-log-table.component.scss']
})
export class ChecklistLogTableComponent implements OnInit {
  displayedColumns: string[] = ['upcomingCheckdate','checklistoperationDate','serviceDoneDate'];
  dataSource = new MatTableDataSource();

  constructor(private webservice: WebRequestService) { }

  ngOnInit(): void {

    this.webservice.getchecklistlog().subscribe((data:any ) =>{
      console.log(data)
     this.dataSource.data=data.req_log;
      
      
  })
      
    }
  }

