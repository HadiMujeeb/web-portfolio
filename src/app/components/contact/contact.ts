import { Component } from '@angular/core';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading],
  templateUrl: './contact.html',
})
export class Contact {
  /**
   * The form deliberately does not import FormsModule, so the browser's native
   * `required` / `type="email"` validation runs before this handler is called.
   */
  protected onSubmit(event: Event): void {
    event.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
    (event.target as HTMLFormElement).reset();
  }
}
