import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  host: { class: 'block' },
  template: `
    <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
      <h2 class="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{{ eyebrow() }}</h2>
      <h3 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">{{ title() }}</h3>
      @if (subtitle()) {
        <p class="text-neutral-400 text-base">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  eyebrow = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
}
