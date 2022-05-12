import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appBgScroll]'
})
export class BgScrollDirective implements OnInit {

  @Input('appBgScroll') bg: HTMLDivElement;

  constructor(
    private domCtrl: DomController,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    console.log(`nativeElement`, this.el.nativeElement);
    console.log(`parentNode`, this.el.nativeElement.parentNode);
    console.log(`attributes`, this.el.nativeElement.attributes);
    console.log(`getContentAttr in constructor`, this.getContentAttr());

    const newDiv = this.renderer.createElement('div');
    this.renderer.setAttribute(newDiv, 'slot', 'fixed');
    this.renderer.setAttribute(newDiv, this.getContentAttr(), '');
    this.renderer.addClass(newDiv, 'howdy');
    const newText = this.renderer.createText('howdy');
    this.renderer.appendChild(newDiv, newText);
    this.renderer.appendChild(this.el.nativeElement, newDiv);
  }

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
