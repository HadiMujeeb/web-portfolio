import { Component } from '@angular/core';
import { Spotlight } from '../../directives/spotlight';
import { HERO_STATS, PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [Spotlight],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly stats = HERO_STATS;

  /** Swap to a placeholder portrait if the remote image fails to load. */
  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== PROFILE.heroImageFallback) {
      img.src = PROFILE.heroImageFallback;
    }
  }
}
