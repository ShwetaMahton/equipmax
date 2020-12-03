import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrl = 'http://localhost:4200/api/createchecklist';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) {}

  getData() {
  return this.http.get('http://localhost:3000/equipmax')
  }

  create(data) {
    return this.http.post('http://localhost:3000/equipmax', data);
  }

  
  deleteAll() {
    return this.http.delete(baseUrl);
  }

  
}
