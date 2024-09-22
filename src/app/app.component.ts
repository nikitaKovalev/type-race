import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextSplitterComponent } from '@type-race/ui';

@Component({
  standalone: true,
  imports: [RouterModule, TextSplitterComponent],
  selector: 'app-root',
  template: `
    <main class="container">
      <lib-text-splitter [text]="text" />
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly text = 'Hello World !';
}
