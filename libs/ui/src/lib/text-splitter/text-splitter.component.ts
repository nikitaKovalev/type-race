import { KEY_PRESSED } from '@type-race/data-access';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { letterClass, splitText, splitWords } from './helper';
import { LetterToHtml } from './letter-to-html.pipe';

@Component({
  selector: 'lib-text-splitter',
  standalone: true,
  imports: [LetterToHtml],
  template: `
    @for (word of words(); track word; let wordIndex = $index) {
      @for (letter of word; track letter; let letterIndex = $index) {
        <span 
          [innerHTML]="letter | letterToHtml"
          [class]="getCurrentLetterClass(wordIndex, letterIndex)"
        ></span>
      }
    }
  `,
  styleUrl: './text-splitter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSplitterComponent {
  readonly text = input.required<string>();
  readonly words = computed(() => splitText(this.text()));
  readonly letters = computed(() => splitWords(this.words()));
  
  readonly currentWordIndex = signal(0);
  readonly currentWordLength = computed(() => this.words()[this.currentWordIndex()].length);
  
  readonly currentLetterIndex = signal(0);
  readonly currentLetter = computed(() => this.letters()[this.currentLetterIndex()]);
  readonly currentLetterClass = computed(() => letterClass(this.keyPressed.signal(), this.currentLetter()));
  
  private readonly keyPressed = inject(KEY_PRESSED);

  constructor() {
    effect(() => {
      if (this.currentLetter() === this.keyPressed.signal()) {
        console.log('currentLetter', this.currentLetter());
        untracked(() => this.currentLetterIndex.set(this.currentLetterIndex() + 1));
      }
    });
  }

  getCurrentLetterClass(wordIndex: number, letterIndex: number): string {
    if (wordIndex !== this.currentWordIndex() || letterIndex !== this.currentLetterIndex()) {
      return '';
    }

    return this.currentLetterClass();
  }
}
