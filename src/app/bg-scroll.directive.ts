import { AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomController, IonContent, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appBgScroll]'
})
export class BgScrollDirective implements OnInit, AfterViewInit {

  // @Input('appBgScroll') bg: HTMLDivElement;
  content: IonContent;
  background: HTMLDivElement;


  constructor(
    private domController: DomController,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {

    // console.log(`nativeElement`, this.el.nativeElement);
    // console.log(`parentNode`, this.el.nativeElement.parentNode);
    // console.log(`attributes`, this.el.nativeElement.attributes);
    // console.log(`getContentAttr in constructor`, this.getContentAttr());

    /**
     * This directive is attached to an `ion-content` whose scroll events
     * need to be turned on with `scrollEvents="true"`.
     */
    this.content = this.el.nativeElement;

    /**
     * Turn on scroll events here so we don't have to do it in the template:
     *    `<ion-content scrollEvents="true">`
     */
    this.renderer.setProperty(this.content, 'scrollEvents', 'true');

    /**
     * Dynamically create a div to hold the background so we don't have
     * to do it in every page.
     *
     * TODO Consider creating sub divs for top and bottom backgrounds.
     * I'm currently just using this div for both backgrounds. And using
     * ::before & ::after should work for more complicated situations.
     * But sub divs might help.
     */
    this.background = this.renderer.createElement('div');

    /**
     * Use Ionic's `slot="fixed"` attribute to pull it out of the
     * scrollable area: https://ionicframework.com/docs/api/content#fixed-content
     */
    this.renderer.setAttribute(this.background, 'slot', 'fixed');

    /**
     * Give the newly created div a matching Content Attribute so it can by
     * styled like everything else. See `getContentAttr()` for more.
     */
    this.renderer.setAttribute(this.background, this.getContentAttr(), '');

    /**
     * Give the div a class to be used in the component's SCSS.
     */
    this.renderer.addClass(this.background, 'parallax-background');

    /**
     * I'm not sure about this. I'm setting this larger than it should be
     * to move the bottom bg off the screen. Once the user scrolls, it will
     * be adjusted in relation to the scrollHeight and offsetHeight. For some
     * reason, those are both 0 to start.
     */
    this.renderer.setStyle(this.background, 'height', `200%`);

    /**
     * Add the div to `ion-content`.
     */
    this.renderer.appendChild(this.content, this.background);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(event: ScrollCustomEvent) {

    this.moveBackground();

    // const movementFactor = 0.5;

    // const {
    //   /**
    //    * We could also get this off of the ionScroll event, but since we're
    //    * getting other values from getScrollElement(), might as well combine them.
    //    */
    //   scrollTop,
    //   scrollHeight,
    //   offsetHeight: contentHeight,
    // } = await this.content.getScrollElement();


    // // const scrollTop = event.detail.scrollTop;

    // /**
    //  * When tweaking this number, we also have to consider the
    //  * transitionDuration & transitionTimingFunction settings below.
    //  */
    // let bgTop = -scrollTop * movementFactor;

    // const bgHeight = ((scrollHeight - contentHeight) * movementFactor) + contentHeight;



    // /**
    //  * If the background has been scrolled up and off the screen, bail out.
    //  */
    // // if (Math.abs(bgTop) > this.bg.offsetHeight) {
    // //   return;
    // // }

    // const scrollElement = await this.content.getScrollElement();
    // // const scrollHeight = scrollElement.scrollHeight;
    // // const contentHeight = scrollElement.offsetHeight;
    // const howdyHeight = this.background.offsetHeight;
    
    // // const bgBottom = scrollHeight - scrollTop - howdyHeight; // exact
    // const exact = scrollHeight - scrollTop - howdyHeight; // exact

    // // close
    // // const bgBottom = bgTop + scrollHeight - contentHeight - howdyHeight;

    // const bottomZero = contentHeight - howdyHeight;


    // // const bgBottom = ((-scrollTop - contentHeight) * movementFactor) + scrollHeight  - howdyHeight;
    // // const bgBottom = ((-scrollTop - contentHeight - howdyHeight) * movementFactor) + scrollHeight  ;

    // // const bgBottom = scrollHeight + Math.abs(scrollTop) - bottomZero;

    // // works for 0.5
    // // const bgBottom = (scrollHeight * movementFactor) - Math.abs(bgTop) + howdyHeight;


    // // const bgBottom = (scrollHeight * (1 - movementFactor)) - scrollTop + contentHeight - howdyHeight;
    
    // // const bgBottom = contentHeight + (scrollHeight * (1 - movementFactor)) + bgTop;


    // console.log({
    //   scrollTop,
    //   scrollHeight,
    //   // howdyHeight,
    //   bgTop,
    //   // bgBottom,
    //   contentHeight,
    //   exact
    // });
  

    // this.domCtrl.write(() => {
    //   /**
    //    * The background scrolls up with the content, but we don't let
    //    * it go down when rubberbanding or when pulling to refresh.
    //    * This way, the background in the header properly matches up
    //    * with the header in the content.
    //    * TODO It would be cool to add a bottom drop shadow when you
    //    * scroll up and remove it when you're at the top.
    //    */
    //   bgTop = scrollTop >= 0 ? bgTop : 0;
    //   // this.renderer.setStyle(this.bg, 'transform', `translateY(${bgTop}px)`);


    //   // This is just attached...no moveFactor
    //   // this.renderer.setStyle(this.newDiv, 'height', `${scrollHeight}px`);
    //   // this.renderer.setStyle(this.newDiv, 'transform', `translateY(${-scrollTop}px)`);


    //   // const newHeight =  ((scrollHeight - contentHeight) * (movementFactor)) + contentHeight;
    //   console.log({bgHeight});
    //   this.renderer.setStyle(this.background, 'height', `${bgHeight}px`);
    //   this.renderer.setStyle(this.background, 'transform', `translateY(${bgTop}px)`);
    // });
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
    //  this.renderer.setStyle(this.bg, 'will-change', 'transform');
     this.renderer.setStyle(this.background, 'will-change', 'transform');

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
     this.renderer.setStyle(this.background, 'transitionDuration', '70ms');
     this.renderer.setStyle(this.background, 'transitionTimingFunction', 'ease-out');
  }

  async ngAfterViewInit() {
    /**
     * Here's a reported bug and long discussion about child components
     * of `ion-content` having zero sizes, which is related to what I'm
     * doing with a directive (though I think the issue exists for IonContent
     * itself and it isn't specifically related to children).
     * https://github.com/ionic-team/ionic-framework/issues/17920
     *
     * Checking for componentOnReady on both `ion-app` and `ion-content` seems
     * to work the best (actually, I think the `ion-app` one does the trick by
     * itself). Without these, I can hit refresh over and over and sometimes the
     * sizes work, sometimes not.
     *
     * In normal use of an app (with normal loading, navigation, etc.), this probably
     * isn't a big deal anyway, but it's noticeable when refreshing on the same page.
     */
    await document.querySelector('ion-app').componentOnReady();
    await document.querySelector('ion-content').componentOnReady();
    console.log('BgScrollDirective ngAfterViewInit after ion-app & ion-content componentOnReady');
    this.moveBackground();
  }

  async moveBackground() {
    const {
      /**
       * We could also get this off of the ionScroll event, but since we're
       * getting other values from getScrollElement(), might as well combine them.
       */
      scrollTop,
      offsetHeight, // Height of the ion-content
      scrollHeight, // Height of all the scrollable content
    } = await this.content.getScrollElement();

    console.log({scrollTop, offsetHeight, scrollHeight});

    /**
     * When scrolling, we move the background at a slower rate than the
     * content to achieve the parallax effect.
     *
     * When tweaking this number, we also have to consider the
     * transitionDuration & transitionTimingFunction settings below.
     */
    const movementFactor = 0.5;

    /**
     * TODO Explain this better.
     * To achieve the parallax effect, the background needs to be smaller than the
     * scroll content
     * 
     * scrollHeight - offsetHeight is the maxScrollDistance
     * muliplied by movementFactor is the maximum the smaller bg can move
     * add back in the offsetHeight (height of the view) gives us the new bg height
     */
    const backgroundHeight = ((scrollHeight - offsetHeight) * movementFactor) + offsetHeight;

    /**
     * rename? negativeYTranslation?
     * TODO Make scrollTop negative and mulitply by factor to get value for translateY
     */
    let bgTop = -scrollTop * movementFactor;

    /**
     * Just like we prevent rubberbanding at the top, we will do it for the bottom.
     * scrollBottomMax is as far as the scroll content can be pushed up.
     * 
     * Call this "maxScrollDistance"?
     * Move this before backgroundHeight and use this variable in there?
     */
    const scrollBottomMax = scrollHeight - offsetHeight;

    /**
     * This is as far as we want to allow the background div to move.
     */
    const bgTopForBottomMax = -scrollBottomMax * movementFactor;

    /**
     * If the background has been scrolled up and off the screen, bail out.
     */
    // if (Math.abs(bgTop) > this.bg.offsetHeight) {
    //   return;
    // }


    this.domController.write(() => {
      /**
       * The background scrolls up with the content, but we don't let
       * it go down when rubberbanding or when pulling to refresh.
       * This way, the background in the header properly matches up
       * with the header in the content.
       * TODO It would be cool to add a bottom drop shadow when you
       * scroll up and remove it when you're at the top.
       */
      // bgTop = scrollTop >= 0 ? bgTop : 0;

      console.log({scrollBottomMax, bgTop});


      if (scrollTop < 0) {
        bgTop = 0;
      } else if (scrollTop > scrollBottomMax) {
        // bgTop = -maybe;
        bgTop = bgTopForBottomMax;
      }

      this.renderer.setStyle(this.background, 'height', `${backgroundHeight}px`);
      this.renderer.setStyle(this.background, 'transform', `translateY(${bgTop}px)`);
    });
  }


  /**
   * Angular View Encapsulation creates unique _nghost and _ngcontent ids
   * for a component and its children respectively. This function gets the
   * _ngcontent of ion-content (which is a child of the page component)
   * so we can apply the same attribute to the background div we are
   * dynamically creating. This lets us use CSS on it like normal by putting
   * it in the SCSS file linked to in the @Component decorator.
   *
   * This is a bit hacky. It reduces the boilerplate a bit (otherwise we'd need
   * to create template reference variables and pass them in to the directive),
   * but Angular could change under our feet:
   *
   *    https://angular.io/guide/view-encapsulation#inspecting-generated-css
   *    > The exact values of these attributes are a private implementation
   *        detail of Angular. They are automatically generated and you
   *        should never refer to them in application code.
   *
   * We don't really care about the "exact value" as the docs warn against (the
   * exact value has a random suffix lik `-juo-c141` that is created each time
   * the app runs, so we could never know or use that specific value), so I think
   * we're OK. Without this, we'd have to add an empty div to each ion-content,
   * give it a Template Reference Variable, and pass that variable to the directive.
   *
   *  TODO add example
   */
   getContentAttr(): string {
    return [
      // Turn NamedNodeMap into an array so we can use `find()`
      ...this.el.nativeElement.attributes
    ].find(attribute => attribute.name.startsWith('_ngcontent')).name;
  }

}
