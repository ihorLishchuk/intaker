import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[scrollShadow]',
  standalone: true,
})
export class ScrollShadowDirective implements AfterViewInit {
  private host = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private scrollableEl: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.setParentClass();
    this.findScrollableChild();

    if (!this.scrollableEl) {
      console.warn('[scrollShadow] Scrollable element not found');
      return;
    }

    this.scrollableEl.addEventListener('scroll', this.updateShadows, { passive: true });
    window.addEventListener('resize', this.updateShadows, { passive: true });

    this.updateShadows();
  }

  private setParentClass(): void {
    this.host.nativeElement.classList.add('scroll-container');
  }

  private findScrollableChild() {
    const el = this.host.nativeElement.querySelector('*');

    const computed = getComputedStyle(el);
    const overflow = computed.overflow;
    const isScrollable = el.scrollWidth > el.clientWidth;

    if ((overflow === 'auto' || overflow === 'scroll') && isScrollable) {
      this.scrollableEl = el;
    }
  }

  private updateShadows = (): void => {
    if (!this.scrollableEl) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.scrollableEl;

    const showLeft = scrollLeft > 0;
    const showRight = scrollLeft + clientWidth < scrollWidth - 1;

    this.toggleClass('left-shadow', showLeft);
    this.toggleClass('right-shadow', showRight);
  };

  private toggleClass(className: string, shouldAdd: boolean): void {
    const hostEl = this.host.nativeElement;

    if (shouldAdd) {
      this.renderer.addClass(hostEl, className);
    } else {
      this.renderer.removeClass(hostEl, className);
    }
  }
}
