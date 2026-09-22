import { Component } from '@angular/core';
import { PROFILE, SOCIAL_LINKS } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIAL_LINKS;
}
