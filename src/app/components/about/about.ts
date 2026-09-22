import { Component } from '@angular/core';
import { HIGHLIGHTS } from '../../data/portfolio.data';
import { Spotlight } from '../../directives/spotlight';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [SectionHeading, Spotlight],
  templateUrl: './about.html',
})
export class About {
  protected readonly highlights = HIGHLIGHTS;
}
