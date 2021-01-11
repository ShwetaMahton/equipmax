import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {  Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const baseUrl = 'http://localhost:4200/api/createchecklist';
const baseurl = 'http://localhost:4200/asset-table';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) {}
  sendData: any;

  public poolAssetID:number;

  getchecklist() {
      return this.http.get(environment.url+'/checklist')
  }


  getOne(id) {
    return this.http.get('http://localhost:3000/assetid/'+id)
 }

 deleteData(id)  {
   return this.http.delete(`${baseurl}/${id}`)
 }

 updateData(info)
 {
  return this.http.put('http://localhost:3000/assetid/update/'+info.id,info)
 }

  getassetid()  {
    return this.http.get(environment.url + '/assetid')
  }

  getchecklistpool()  {
    return this.http.get(environment.url + '/checklistpool')
  }

  getRecord() {
    return this.http.get(environment.url + '/asset-table-index')
  }
  open() {
    return this.http.get(environment.url + '/dialog-asset-table')
  }

handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getData() {
  return this.http.get('http://localhost:3000/equipmax')
  }

  create(data) {
    return this.http.post('http://localhost:3000/equipmax', data);
  }

  fetchAssetDetails(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getAssetDetails';
    console.log('data', data);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('fetched getAssetDetails For SelectedAsset', [])
      )
    );
  }


  fetchCheckListFields(): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getCheckListFields';
    console.log('url', url);

    return this.http.post(url, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('fetched CheckListFields', [])
      )
    );
  }
  // savechecklistCreationLogNDataValue(data): any {
  //   const headers = new HttpHeaders();
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
  //   headers.append('Accept', 'application/json');
  //   headers.append('content-type', 'application/json');

  //   const url = environment.url + '/savechecklistCreationLogNDataValue';
  //   console.log('url', url);

  //   return this.http.post(url, data, { headers })
  //   .pipe(
  //     tap((_) => console.log('saved successfully')),
  //     catchError(
  //       this.handleError<any>('save checklistCreation Log', [])
  //     )
  //   );
  // }

  fetchExistingCheckListFieldsForSelectedAsset(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getExistingCheckListFieldsForSelectedAsset';
    console.log('data Jyoti', data);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('fetched ExistingCheckListFields For SelectedAsset', [])
      )
    );
  }
  getchecklistlog()  {
    console.log(this.poolAssetID);
    var poolAssetID= this.poolAssetID;
   return this.http.post('http://localhost:3000/getlog', {poolAssetID});

  }
saveDataDialog(serviceDoneDate,localISOTime,localTime){
console.log(serviceDoneDate,localISOTime,localTime);
console.log("poolid",this.poolAssetID);
this.http.post('http://localhost:3000/savedata', {serviceDoneDate:serviceDoneDate,localISOTime:localISOTime,localTime:localTime,poolid:this.poolAssetID})
      .subscribe((ResData) => {
        console.log(ResData);
      });
}
  fetchChecklistLogDetails(data): any {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const url = environment.url + '/getChecklistLogDetails';
    console.log('data', data);

    return this.http.post(url, data, { headers })
    .pipe(
      tap((_) => console.log('fetched successfully')),
      catchError(
        this.handleError<any>('fetched getAssetDetails For SelectedAsset', [])
      )
    );
  }

  
}
