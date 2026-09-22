import { Component } from '@angular/core';

import { Spotlight } from '../../directives/spotlight';

@Component({
  selector: 'app-resume',
  imports: [Spotlight],
  templateUrl: './resume.html',
})
export class Resume {
  protected downloadResume(): void {
    alert('Resume download started successfully!');
  }
}
