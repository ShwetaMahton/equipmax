import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dataitempool } from './dataitempool';

@Injectable({
  providedIn: 'root'
})
export class DataitempoolService {

  constructor(private http: HttpClient) { }

  getDataitempool() {

    return this.http.get<Dataitempool[]>('http://localhost/equipmax/list.php');
  }
}
