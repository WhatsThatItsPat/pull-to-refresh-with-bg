import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-full-bg',
  templateUrl: './full-bg.page.html',
  styleUrls: ['./full-bg.page.scss'],
})
export class FullBgPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event){
    setTimeout(() => {
      console.log('refreshing complete');
      (event as RefresherCustomEvent).target.complete();
    }, 2000);
  }

  clickLink() {
    console.log('link clicked');
  }

}
