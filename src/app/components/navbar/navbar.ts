import { Component, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';

interface Pill {
  left: number;
  width: number;
  visible: boolean;
  /** Jump to the link instead of gliding (used when the pill first appears). */
  snap: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  protected readonly pill = signal<Pill>({ left: 0, width: 0, visible: false, snap: true });

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Glide the highlight pill under whichever link is hovered or focused. */
  protected movePill(event: Event): void {
    const link = event.currentTarget as HTMLElement;
    const wasVisible = this.pill().visible;
    this.pill.set({ left: link.offsetLeft, width: link.offsetWidth, visible: true, snap: !wasVisible });
  }

  protected hidePill(): void {
    this.pill.update((p) => ({ ...p, visible: false }));
  }
}
