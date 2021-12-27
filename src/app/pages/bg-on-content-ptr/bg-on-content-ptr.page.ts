import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-on-content-ptr',
  templateUrl: './bg-on-content-ptr.page.html',
  styleUrls: ['./bg-on-content-ptr.page.scss'],
})
export class BgOnContentPtRPage implements OnInit {

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
