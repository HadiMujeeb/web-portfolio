import { Component } from '@angular/core';
import { EXPERIENCES } from '../../data/portfolio.data';
import { Spotlight } from '../../directives/spotlight';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading, Spotlight],
  templateUrl: './experience.html',
})
export class Experience {
  protected readonly experiences = EXPERIENCES;
}
