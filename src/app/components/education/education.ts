import { Component } from '@angular/core';
import { EDUCATION } from '../../data/portfolio.data';
import { Spotlight } from '../../directives/spotlight';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-education',
  imports: [SectionHeading, Spotlight],
  templateUrl: './education.html',
})
export class Education {
  protected readonly items = EDUCATION;
}
