import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-with-ptr',
  templateUrl: './current-with-ptr.page.html',
  styleUrls: ['./current-with-ptr.page.scss'],
})
export class CurrentWithPtRPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log(`...refreshing`);
    setTimeout(() => {
      console.log('refreshing complete');
      event.target.complete();
    }, 2000);
  }

}
