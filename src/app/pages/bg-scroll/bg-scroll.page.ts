import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-bg-scroll',
  templateUrl: './bg-scroll.page.html',
  styleUrls: ['./bg-scroll.page.scss'],
})
export class BgScrollPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor() { }

  ngOnInit() {
    // console.log(`ngOnInit content`, this.content);
  }

  doRefresh(event){
    // console.log(`...refreshing`, event);
    setTimeout(() => {
      console.log('refreshing complete');
      (event as RefresherCustomEvent).target.complete();
    }, 2000);
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  scrollToBottom() {
    this.content.scrollToBottom(1000);
  }


}
