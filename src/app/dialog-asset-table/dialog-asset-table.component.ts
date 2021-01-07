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

@Component({
  selector: 'app-dialog-asset-table',
  templateUrl: './dialog-asset-table.component.html',
  styleUrls: ['./dialog-asset-table.component.scss']
})
export class DialogAssetTableComponent implements OnInit {
  
  assetKey: number;
  assetDetails;
  checklistLogDetails: any[] = [];
  assetChecklistFields: any[] = [];
  upcomingCheckDate;
  checklistoperationDate;
  serviceDoneDate;

  constructor(public dialog: MatDialog, private webservice: WebRequestService, public datepicker: MatDatepickerModule, private taskservice: TaskService, private route: ActivatedRoute,
    private router: Router,) { }
  additem(usermodel) {
    console.log(usermodel);
  }
  checklistAssign() {
    this.dialog.open(DialogAssetTableComponent ,{height:'90%',width:'100%'});
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // console.log('params', params);
      if (params && params.assetKey) {
        this.assetKey = JSON.parse(params.assetKey);
      }
    });
     
   }

   ionViewWillEnter() {

   let assetKeyObj = {
    assetKey: JSON.stringify(this.assetKey)
  };


  this.webservice.fetchAssetDetails(assetKeyObj).subscribe(value => {
    // console.log(value);
    this.assetDetails = value;
    console.log('assetDetails', this.assetDetails);
  });

  this.webservice.fetchChecklistLogDetails(assetKeyObj).subscribe(value => {
    // console.log(value);
    this.checklistLogDetails = value;
    console.log('checklistLogDetails', this.checklistLogDetails);
  });

  this.assetChecklistFields = [];
this.webservice.fetchExistingCheckListFieldsForSelectedAsset(assetKeyObj).subscribe(value => {
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

  if (!hasError) {
    let saveObject = {
      itemkey: this.assetKey,
      upcomingCheckDate: this.getUpcomingCheckDate(),
      checklistoperationDate: localISOTime,
      serviceDoneDate: this.serviceDoneDate,
      checkListFieldsDataArrJson: JSON.stringify(this.assetChecklistFields)
    };

    console.log('saveObject', saveObject);
    this.webservice.savechecklistCreationLogNDataValue(saveObject).subscribe(value => {
      // console.log(value);
      this.serviceDoneDate = '';
      this.router.navigate(['/checklistcreation-assignedassets']);
    });
  }
}

getUpcomingCheckDate() {
  let noOfHours = this.assetDetails[0].poolfrequency;
  let noOfTimes = this.assetDetails[0].poolfrequencyRate;
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



calendarServiceDoneDate() {
  var date = new Date();
  var offset = date.getTimezoneOffset() * 60000;
  var test = (new Date(moment(Date.now() - offset).add(1, 'days').toISOString())).valueOf();
  var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);
  console.log("testDate", localISOTime);
  // var localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, -1);


  
}


}
