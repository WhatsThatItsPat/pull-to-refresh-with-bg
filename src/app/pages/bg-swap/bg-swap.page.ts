import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RefresherCustomEvent, RefresherEventDetail, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-bg-swap',
  templateUrl: './bg-swap.page.html',
  styleUrls: ['./bg-swap.page.scss'],
})
export class BgSwapPage implements OnInit, AfterViewInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;

  refresherProgress = 0;
  refresherInterval;

  constructor() { }

  ngOnInit() {
    console.log(`ngOnInit refresher`, this.refresher);
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit refresher`, this.refresher);
  }

  async getProgress() {
    return await this.refresher.getProgress();
  }

  doRefresh(event){
    console.log(`refresher in doRefresh`, this.refresher);
    // console.log(`...refreshing`, event);
    setTimeout(() => {
      console.log('refreshing complete');
      (event as RefresherCustomEvent).target.complete();
    }, 2000);
  }

  doPull(event){
    // console.log(`...pulling`, (event as RefresherCustomEvent));
  }

  doStart(event){
    console.log(`...start`, (event as RefresherCustomEvent));

    this.refresherInterval = setInterval(async () => {
      this.refresherProgress = await this.refresher.getProgress();
      if (this.refresherProgress === 0) {
        // TODO also need to know if the user has ended the touch
        // cancelling it kind of fixes that, but introduces a white line
        this.refresher.cancel();

        clearInterval(this.refresherInterval);
      }
    });
  }

}
