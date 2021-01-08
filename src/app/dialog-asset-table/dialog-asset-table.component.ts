import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebRequestService } from '../web-request.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TaskService } from '../task.service' ;
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subject, of, from} from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import { AssetTableComponent } from '../asset-table/asset-table.component';

@Component({
  selector: 'app-dialog-asset-table',
  templateUrl: './dialog-asset-table.component.html',
  styleUrls: ['./dialog-asset-table.component.scss']
})
export class DialogAssetTableComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] 
  assetKey: number;
  assetDetails;
  checklistLogDetails: any[] = [];   
  assetChecklistFields: any[] = [];
  upcomingCheckDate;
  checklistoperationDate;
  serviceDoneDate;
  temp; 
  humidity;
  private _id:number;
  data: any;
  id: any;
  poolItemKeyPK: number;
  AssetId: string;
  assetIndex : DialogAssetTableComponent;

  constructor(public dialog: MatDialog,
     private webservice: WebRequestService,
      public datepicker: MatDatepickerModule,
       private taskservice: TaskService, 
       private route: ActivatedRoute,
        private _router: ActivatedRoute,
    private router: Router,) { }
  additem(usermodel) {
    console.log(usermodel);
  }
  checklistAssign() {
    this.dialog.open(DialogAssetTableComponent ,{height:'90%',width:'100%'});
    }
 


  ngOnInit(): void {
    console.log(this._router.snapshot.params)
  this.id = this._router.snapshot.params.id
  this.getOne();
    this.webservice.getchecklist().subscribe(data =>{
      console.log(data)
      this.temp=data[0].checklistField;
      this.humidity=data[1].checklistField;
      console.log(this.humidity);
      console.log(this.temp);
      this.toppingList = JSON.parse(JSON.stringify(data))
   })

     
    //   this.webservice.getassetid().subscribe(data =>{
    //     console.log(data)
    //     let assetData = JSON.parse(JSON.stringify(data))
        
    //    console.log(assetData);
        
    // })
      this.route.queryParams.subscribe(params => {
        console.log('params', params);
        if (params && params.assetKey) {
          this.assetKey = JSON.parse(params.assetKey);
          console.log('params',this.assetKey);
        }
      });
      // let assetKeyObj = {
      //   assetKey: JSON.stringify(this.assetKey)
        
      // };
      console.log(this.assetKey);
      this.webservice.fetchAssetDetails(JSON.stringify(this.assetKey)).subscribe(value => {
        console.log(value);
        this.assetDetails = value;
        console.log('assetDetails', this.assetDetails);
      });


   
     
   }
   getOne()
   {
      this.webservice.getOne(this.id).subscribe(data=>
       {
         console.log(this.data);
          this.data=JSON.parse(JSON.stringify(data));
        
       })
   }

   ionViewWillEnter() {

   let assetKeyObj = {
    assetKey: JSON.stringify(this.assetKey)
  };

 
  

  this.webservice.fetchChecklistLogDetails(assetKeyObj).subscribe(value => {
    // console.log(value);
    this.checklistLogDetails = value;
    console.log('checklistLogDetails', this.checklistLogDetails);
  });

  this.assetChecklistFields = [];
this.webservice.fetchExistingCheckListFieldsForSelectedAsset(assetKeyObj).subscribe(value => {
  console.log("value",value);
  this.assetChecklistFields = value;

  for(let obj of this.assetChecklistFields) {
    obj.fieldValue = '';
  }
  console.log('assetChecklistFields', this.assetChecklistFields);
});

}
Submit() {
  var hasError: boolean = false;

  var date = new Date(); 
  var offset = date.getTimezoneOffset() * 60000;
  var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
  console.log("date////",localISOTime);
  console.log("date////",this.serviceDoneDate);
  //console.log(this.id.poolItemKeyPK);

 
  
  this.webservice.saveDataDialog(this.serviceDoneDate,localISOTime,localISOTime);
  if (!hasError) {
    let saveObject = {
      itemkey: this.assetKey,
      //upcomingCheckDate: this.getUpcomingCheckDate(),
      upcomingCheckDate:localISOTime,
      checklistoperationDate: localISOTime,
      serviceDoneDate: this.serviceDoneDate,
      
      
      checkListFieldsDataArrJson: JSON.stringify(this.assetChecklistFields)
    };
    console.log("date////",this.serviceDoneDate);

    console.log('saveObject', saveObject);
    //this.webservice.saveDataDialog()
    // this.webservice.savechecklistCreationLogNDataValue(saveObject).subscribe(value => {
      
    //   // console.log(value);
    //   this.serviceDoneDate = '';
    //   this.router.navigate(['/checklistcreation-assignedassets']);
    // });
  }
  
}



getUpcomingCheckDate() {

  let noOfHours = this.assetDetails[0].poolfrequency;
  console.log(noOfHours);
  let noOfTimes = this.assetDetails[0].poolfrequencyRate;
  console.log(noOfTimes);
  let dateAfterNoOfHours;
  let newEntryafterHours = noOfHours / noOfTimes; // 24-11-2020 10:00 + 12

  let nextDate;

  if (this.checklistLogDetails.length !== 0) {
    // get firstChecklist Operation Date + poolfrequency
    var firstChecklistOperationDate = this.checklistLogDetails[0].checklistoperationDate;
    var firstChkOperation_date = new Date(firstChecklistOperationDate);

    // add the maximm date value
    dateAfterNoOfHours = this.addhours(firstChkOperation_date, noOfHours);
    firstChkOperation_date = new Date(firstChecklistOperationDate);
  }


  // get current DateTime
  let date = new Date();
  let offset = date.getTimezoneOffset() * 60000;
  let localTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);

  if (localTime < dateAfterNoOfHours && this.checklistLogDetails.length !== 0) {
    // console.log('A');

    if (this.checklistLogDetails.length == (noOfTimes-1)) {
      // console.log('A1');
      // No of time entry for the hours is completed so set next day date.
      nextDate = dateAfterNoOfHours;
    } else {
      // console.log('A2');
      // Still Entries for the day is left
      var date_afterHours = this.addhours(firstChkOperation_date, newEntryafterHours);
      firstChkOperation_date = new Date(firstChecklistOperationDate);

      if ( date_afterHours < dateAfterNoOfHours) {
        // console.log('A21');
          nextDate = date_afterHours;
      } else if ( date_afterHours < dateAfterNoOfHours) {

      }
       else {
        // console.log('A22');
          nextDate =  this.addhours(firstChkOperation_date, (noOfHours - 1));
          firstChkOperation_date = new Date(firstChecklistOperationDate);
      }
    }
  } else {
    // console.log('B');
    nextDate = this.addhours(date, newEntryafterHours);
  }

  console.log('nextDate', nextDate);
  return nextDate;
}

addhours(date, hrs) {
  date.setHours(date.getHours() + hrs);
  let offsetVal = date.getTimezoneOffset() * 60000;
  let ISODate = (new Date(date - offsetVal)).toISOString().slice(0, -1);
  // console.log('ISODate', ISODate);

  return ISODate;
}

validateSaveObj() {
  var hasError: boolean = false;
  var msg = '';

  for (let obj of this.assetChecklistFields) {
    if (obj.fieldValue === '') {
      msg = 'Please provide ' + obj.checklistField;
      hasError = true;
      break;
    }
  }

  if (hasError) {
    this.validationMessageBox(msg);
  }

  return hasError;
}
validationMessageBox(msg) {
   // const confirm = this.alertCtrl.create({
   //   header: 'Alert',
   //   message: msg,
   //   buttons: [
    //    {
     //     text: 'OK',
     //     handler: () => {
            // console.log('Agree clicked', this.selectedcheckListFields);
    //      }
     //   }
   //   ]
  //  }).then(alert => alert.present());
  }



// calendarServiceDoneDate() {
//   var date = new Date();
//   var offset = date.getTimezoneOffset() * 60000;
//   var test = (new Date(moment(Date.now() - offset).add(1, 'days').toISOString())).valueOf();
//   var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
//   console.log("testDate", localISOTime);
//   // var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
//   this.datepicker.show({
//     date: new Date(),
//     mode: 'datetime',
//     maxDate: new Date().valueOf(),
//     // (new Date(moment(Date.now() - offset).toISOString())).valueOf(),
//     androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
//   }).then(
//     date => {
//       // const newDate = dateTime.getDate()+"/"+dateTime.toLocaleString('default', { month: 'long' })+"/"+dateTime.getFullYear()+" "+dateTime.getHours()+":"+dateTime.getMinutes();
//       const newDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate() + ' ' + date.getHours()+ ':' + date.getMinutes();
//       this.serviceDoneDate = newDate;
//     },
//     err => console.log(err)
//   );

  
}



