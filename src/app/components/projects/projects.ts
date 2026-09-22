import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { Spotlight } from '../../directives/spotlight';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-projects',
  imports: [SectionHeading, Spotlight],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
