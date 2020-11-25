import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

  constructor() { }

  topics = ['item1', 'item2', 'item3'];
  ngOnInit(): void {
  }

}
