import { DestroyRef, Directive, ElementRef, NgZone, inject } from '@angular/core';

/**
 * Soft white light that follows the pointer across an element.
 *
 * The directive only writes two CSS variables (--mx / --my); the glow and the
 * lit-up border are drawn by the `.spotlight` styles in styles.css, so it costs
 * nothing until the element is hovered. Listeners run outside Angular's zone so
 * moving the mouse never triggers change detection.
 */
@Directive({
  selector: '[appSpotlight]',
  host: { class: 'spotlight' },
})
export class Spotlight {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    const update = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    zone.runOutsideAngular(() => {
      el.addEventListener('pointerenter', update, { passive: true });
      el.addEventListener('pointermove', update, { passive: true });
    });

    destroyRef.onDestroy(() => {
      el.removeEventListener('pointerenter', update);
      el.removeEventListener('pointermove', update);
    });
  }
}
