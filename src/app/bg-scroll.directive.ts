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
  ) {}

  @HostListener('ionScroll', ['$event']) onContentScroll(event: ScrollCustomEvent) {
    const scrollTop = event.detail.scrollTop;

    /**
     * When tweaking this number, we also have to consider the
     * transitionDuration & transitionTimingFunction settings below.
     */
    let bgTop = -scrollTop * 0.5;

    /**
     * If the background has been scrolled up and off the screen, bail out.
     */
    if (Math.abs(bgTop) > this.bg.offsetHeight) {
      return;
    }

    this.domCtrl.write(() => {
      /**
       * The background scrolls up with the content, but we don't let
       * it go down when rubberbanding or when pulling to refresh.
       * This way, the background in the header properly matches up
       * with the header in the content.
       * TODO It would be cool to add a bottom drop shadow when you
       * scroll up and remove it when you're at the top.
       */
      bgTop = scrollTop >= 0 ? bgTop : 0;
      this.renderer.setStyle(this.bg, 'transform', `translateY(${bgTop}px)`);
    });
  }

  ngOnInit(): void {
    // console.log(`appBgScroll>ngOnInit`, this.bg);
    /**
     * might need this.domCtrl.read() to get the toolbar height if I want to
     * build that into the scrolling equation:
     * https://youtu.be/NHTpZV-Dcw4?t=303
     */

    /**
     * https://www.youtube.com/watch?v=yOWB4P1Nz9A
     * This technique reduces paints as shown in the video, but I
     * still see janky-ness with it. The transitionDuration below
     * is what really smooths things out.
     */
     this.renderer.setStyle(this.bg, 'will-change', 'transform');

     /**
      * We add a slight duration to the the animation transition so the
      * background parallax scrolling is smoother. Without this, there
      * is a noticeable stutter. By adding it, the background is just barely
      * playing catch-up to the scroll content. The default easing function
      * is `ease`, which is similar to `ease-in-out`. We switch to `ease-out`
      * because it works with the catching-up idea.
      *
      * 70ms feels about right on iPhone 13 Pro / iOS 15.4.1
      * <60ms the animation is a little janky.
      * >100ms the lag is noticeable, especially with quick scrolls.
      */
     this.renderer.setStyle(this.bg, 'transitionDuration', '70ms');
     this.renderer.setStyle(this.bg, 'transitionTimingFunction', 'ease-out');
  }

}
