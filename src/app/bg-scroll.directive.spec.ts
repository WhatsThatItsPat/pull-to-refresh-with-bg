import { ElementRef, Renderer2 } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DomController } from '@ionic/angular';
import { BgScrollDirective } from './bg-scroll.directive';

describe('BgScrollDirective', () => {
  it('should create an instance', () => {

    inject(
      [DomController, Renderer2, ElementRef],
      (domController: DomController, renderer: Renderer2, el: ElementRef) => {
        const directive = new BgScrollDirective(domController, renderer, el);
        expect(directive).toBeTruthy();
      }
    );

  });
});
