import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DomController, IonContent, ScrollCustomEvent } from '@ionic/angular';

/**
 * This directive works with some styling in global.scss under
 *    ion-content[appBgScroll] { ... }
 * There's are several z-index adjutments to get layering to
 * work with the refresher.
 */
@Directive({
  selector: 'ion-content[appBgScroll]'
})
export class BgScrollDirective implements AfterViewInit {

  content: IonContent;
  background: HTMLDivElement;

  constructor(
    private domController: DomController,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    /**
     * Get the nativeElement. This directive is attached to an `ion-content`.
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
     * I'm currently just using this div for both backgrounds.
     * Using `::before` & `::after` psuedo elements should work
     * for more complicated situations, but sub divs might help.
     */
    this.background = this.renderer.createElement('div');

    /**
     * Use Ionic's `slot="fixed"` attribute to pull the background
     * out of the scrollable area:
     * https://ionicframework.com/docs/api/content#fixed-content
     */
    this.renderer.setAttribute(this.background, 'slot', 'fixed');

    /**
     * Give the newly created div a matching Content Attribute so it can be
     * styled like everything else. See `getContentAttribute()` for more.
     */
    this.renderer.setAttribute(this.background, this.getContentAttribute(), '');

    /**
     * Give the div a class to be used in the component's SCSS.
     */
    this.renderer.addClass(this.background, 'parallax-background');

    /**
     * Set the width so we don't have to in each page's SCSS.
     */
    this.renderer.setStyle(this.background, 'width', '100%');

    /**
     * https://www.youtube.com/watch?v=yOWB4P1Nz9A
     * This technique reduces paints as shown in the video, but I
     * still see janky-ness with it. The `transitionDuration` below
     * is what really smooths things out.
     */
    this.renderer.setStyle(this.background, 'will-change', 'transform');

    /**
     * We add a slight duration to the the animation transition so the
     * background parallax scrolling is smoother. Without this, there
     * is a noticeable stutter. By adding it, the background is just barely
     * playing catch-up to the scroll content. The default easing function
     * is `ease`, which is similar to `ease-in-out`. We switch to `ease-out`
     * because it works better with the catching-up idea.
     *
     * 70ms feels about right on iPhone 13 Pro / iOS 15.4.1
     * <60ms the animation is a little janky.
     * >100ms the lag is noticeable, especially with quick scrolls.
     */
    this.renderer.setStyle(this.background, 'transitionDuration', '70ms');
    this.renderer.setStyle(this.background, 'transitionTimingFunction', 'ease-out');

    /**
     * Add the div to `ion-content`.
     */
    this.renderer.appendChild(this.content, this.background);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(event: ScrollCustomEvent) {
    /**
     * Rather than use the passed in event here to get `scrollTop`, like you'll
     * see in typical Ionic scrolling examples, we pull it off `getScrollElement`
     * in `moveBackground`.
     */
    this.moveBackground();
  }

  async ngAfterViewInit() {
    /**
     * Here's a reported bug and long discussion about child components
     * of `ion-content` having zero sizes, which is related to what I'm
     * doing with this directive (though I think the issue exists for IonContent
     * itself and it isn't specifically related to children).
     * https://github.com/ionic-team/ionic-framework/issues/17920
     *
     * Checking for `componentOnReady` on both `ion-app` and `ion-content` seems
     * to work the best (actually, I think the `ion-app` one does the trick by
     * itself). Without these, I can hit refresh over and over and sometimes the
     * sizes work, sometimes not.
     *
     * In normal use of an app (with normal loading, navigation, etc.), this probably
     * isn't a big deal anyway, but it's noticeable when refreshing on the same page.
     *
     * The Ionic issue also mentions using `this.domCtrl.read()` for this, and there's
     * a related comment in this video, but a quick attempt didn't work:
     * https://youtu.be/NHTpZV-Dcw4?t=303
     */
    await document.querySelector('ion-app').componentOnReady();
    await document.querySelector('ion-content').componentOnReady();
    // console.log('BgScrollDirective ngAfterViewInit after ion-app & ion-content componentOnReady');

    /**
     * Initialize the background size once everything is ready.
     */
    this.moveBackground();
  }

  async moveBackground() {
    const {
      /**
       * We could also get `scrollTop` off of the ionScroll event, but since we're
       * getting other values from `getScrollElement()`, we might as well combine them.
       */
      scrollTop,
      offsetHeight, // Height of the ion-content
      scrollHeight, // Height of all the scrollable content
    } = await this.content.getScrollElement();

    // console.log({scrollTop, offsetHeight, scrollHeight});

    /**
     * To achieve the parallax effect, we move the background at a slower rate
     * than that of the content. When tweaking this number, we also have to consider
     * the `transitionDuration` & `transitionTimingFunction` numbers.
     */
    const movementFactor = 0.5;

    /**
     * The height of the `inner-scroll` (`scrollHeight`) is typically taller than
     * the viewable area (`offsetHeight`). This is the difference between the two,
     * and is the measurement of how far 'inner-scroll` can move from the top
     * boundary to the bottom boundary.
     */
    const maxScrollDistance = scrollHeight - offsetHeight;

    /**
     * Since the background is moving slower than the content, it will have a smaller
     * maximum distance of movment.
     */
    const maxScrollDistanceOfBackground = maxScrollDistance * movementFactor;

    /**
     * The background is smaller and slower than the content. But how tall
     * should the background be? We need to know this so any bottom backgrounds
     * will be in the correct place. We add the `offsetHeight` back to the
     * `maxScrollDistanceOfBackground` to get the correct height, which we set later.
     */
    const backgroundHeight = maxScrollDistanceOfBackground + offsetHeight;

    /**
     * When we move the background below in `domController.write...`, we move it
     * negatively with `translateY`. `scrollTop` is a positive number so we make it
     * negative and slow its scroll movement.
     *
     * This variable can be overwritten below when we check to make sure the
     * background stays within the rubberbanding limits.
     */
    let bgTop = -scrollTop * movementFactor;

    this.domController.write(() => {
      /**
       * The whole point of this is to stop the background from joining the content
       * when it rubberbands past the top and bottom limits.
       *
       * We want the header background to nicely bleed to the top content background,
       * and we never want them to separate when rubberbanding at the top, or
       * when pulling-to-refresh.
       *
       * While we're at it, we want the bottom background to stop in its place
       * when the content rubberbands past the bottom.
       */
      if (scrollTop < 0) {
        /**
         * The top limit is easy to figure out because it's the same for both
         * the scroll area and the background. If `scrollTop` is srolled past zero,
         * we stop the background at zero.
         */
        bgTop = 0;
      } else if (scrollTop > maxScrollDistance) {
        /**
         * When the scrollable content rubberbands past the bottom, `scrollTop` will
         * exceed the `maxScrollDistance`. We've already translated that measurment to
         * the smaller background  with `maxScrollDistanceOfBackground` but we have to
         * flip it to negative.
         */
        bgTop = -maxScrollDistanceOfBackground;
      }

      /**
       * Finally, we set the height of the background and move it along the y-axis.
       *
       * TODO If we ever have a desktop version of the app, `backgroundHeight` will
       * probably need to be changed for screen resizes.
       */
      this.renderer.setStyle(this.background, 'height', `${backgroundHeight}px`);
      this.renderer.setStyle(this.background, 'transform', `translateY(${bgTop}px)`);

      /**
       * Add a closs which we can use to add a header drop shadow in the global
       * styles (actually, it's an inset shadow on `ion-content` that looks like
       * it's from the header).
       *
       * The top card has a 24px margin, so this is the same as the space
       * between the header and the content. This looks fine using zero,
       * but looks nice when the drop shadow appears right when the content
       * starts going underneath the header.
       */
      if (scrollTop > 24) {
        this.renderer.addClass(this.content, 'content-is-scrolling');
      } else {
        this.renderer.removeClass(this.content, 'content-is-scrolling');
      }

    });
  }

  /**
   * Angular View Encapsulation creates unique _nghost and _ngcontent IDs
   * for a component and its children respectively. This function gets the
   * _ngcontent of ion-content (which is a child of the page component)
   * so we can apply the same attribute to the background div we are
   * dynamically creating. This lets us use CSS on it like normal by putting
   * it in the SCSS file linked to in the @Component decorator.
   *
   * This is a bit hacky, but it reduces the boilerplate quite a bit. Otherwise,
   * we'd have to add an empty div to each `ion-content`, give it a Template
   * Reference Variable, and pass that variable to the directive.
   *
   *    https://angular.io/guide/view-encapsulation#inspecting-generated-css
   *    > The exact values of these attributes are a private implementation
   *        detail of Angular. They are automatically generated and you
   *        should never refer to them in application code.
   *
   * We don't really care about the "exact value" as the docs warn against (the
   * exact value has a random suffix like `-juo-c141` that is created each time
   * the app runs, so we could never know or use that specific value), so I think
   * we're OK.
   */
   getContentAttribute(): string {
    return [
      // Turn NamedNodeMap into an array so we can use `find()`
      ...this.el.nativeElement.attributes
    ].find(attribute => attribute.name.startsWith('_ngcontent')).name;
  }

}
