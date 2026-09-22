import { Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/portfolio.data';
import { SKILL_ICONS } from '../../data/skill-icons';
import { Spotlight } from '../../directives/spotlight';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading, Spotlight],
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;

  protected iconPath(key: string): string {
    return SKILL_ICONS[key] ?? '';
  }
}
