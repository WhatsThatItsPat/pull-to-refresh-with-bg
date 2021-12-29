import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomController, IonContent, RefresherCustomEvent, ScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-bg-scroll',
  templateUrl: './bg-scroll.page.html',
  styleUrls: ['./bg-scroll.page.scss'],
})
export class BgScrollPage implements OnInit, AfterViewInit {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild('bg') bg: ElementRef;

  constructor(
    private dom: DomController,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    console.log(`ngOnInit content`, this.content);
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit content`, this.content);
    console.log(`ngAfterViewInit bg`, this.bg);
  }

  doScrolling(event: ScrollCustomEvent) {
    const top = event.detail.scrollTop;
    // console.log(`...scrolling`, event.detail.scrollTop);

    this.dom.write(() => {
      if (top >= 0) {
        /**
         * If we do it this way, we might as well have fun with parallax...
         * in fact, we have to because otherwise it just looks like it's barely
         * behind the animation.
         */
        this.renderer.setStyle(this.bg.nativeElement, 'background-position-y', `${-top*.6}px`);
        // would changing the bg top / transform3d be more performant?
      } else {
        // can this go below 0?
        this.renderer.setStyle(this.bg.nativeElement, 'background-position-y', `0px`);
      }
    });
  }

  doRefresh(event: RefresherCustomEvent){
    console.log(`...refreshing`, event);
    setTimeout(() => {
      console.log('refreshing complete');
      event.target.complete();
    }, 2000);
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  scrollToBottom() {
    this.content.scrollToBottom(1000);
  }


}
