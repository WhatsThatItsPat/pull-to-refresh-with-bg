import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appBgScroll]'
})
export class BgScrollDirective implements OnInit {

  @Input('appBgScroll') bg: HTMLDivElement;

  constructor(
    private domCtrl: DomController,
    private renderer: Renderer2
  ) {
    console.log(`appBgScroll>constructor`, this.bg);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(event: ScrollCustomEvent) {
    const top = event.detail.scrollTop;
    // console.log(`...scrolling`, top);

    this.domCtrl.write(() => {
      if (top >= 0) {
        /**
         * If we do it this way, we might as well have fun with parallax...
         * in fact, we have to because otherwise it just looks like it has a
         * slight delay and is a hair behind the scrolling.
         */
        this.renderer.setStyle(this.bg, 'background-position-y', `${-top*.6}px`);

        // would changing the bg top / transform3d be more performant?
        // this.renderer.setStyle(this.bg.nativeElement, 'top', `${-top*.6}px`);
      } else {
        // can this go below 0?
        this.renderer.setStyle(this.bg, 'background-position-y', `0px`);
      }
    });
  }

  ngOnInit(): void {
    console.log(`appBgScroll>ngOnInit`, this.bg);
    /**
     * might need this.domCtrl.read() to get the toolbar height if I want to
     * build that into the scrolling equation:
     * https://youtu.be/NHTpZV-Dcw4?t=303
     */
  }

}
