import { Component } from '@angular/core';

import { PROFILE } from '../../data/portfolio.data';
import { Spotlight } from '../../directives/spotlight';

@Component({
  selector: 'app-resume',
  imports: [Spotlight],
  templateUrl: './resume.html',
})
export class Resume {
  protected readonly resumeHref = PROFILE.resumeFile;
  protected readonly resumeFileName = PROFILE.resumeFileName;
}
