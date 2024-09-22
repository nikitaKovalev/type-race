import { inject, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export const SPACE_HTML = '&nbsp;';

@Pipe({
  name: 'letterToHtml',
  standalone: true,
})
export class LetterToHtml implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);
  
  transform(letter: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(letter === ' ' ? SPACE_HTML : letter);
  }
}