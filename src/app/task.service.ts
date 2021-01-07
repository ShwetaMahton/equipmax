import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  checklistlogPK : 'number';
  dataitempoolPK : 'number';
  serviceDoneDate : 'string'; 
  checklistoperationDate : 'string';
  upcomingCheckDate : 'string';
  
}
