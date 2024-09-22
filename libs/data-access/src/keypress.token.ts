import { inject, InjectionToken, Signal } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { filter, fromEvent, map, Observable, shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

const IGNORE_KEYS = ['Shift', 'Control', 'Alt', 'Meta'];

export interface KeyPress {
  readonly stream$: Observable<string>;
  readonly signal: Signal<string>;
}

export const KEY_PRESSED = new InjectionToken<KeyPress>('KEY_PRESSED', {
  factory: () => {
    const document = inject(DOCUMENT);
    const stream$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      map(({key}) => key),
      filter(key => !IGNORE_KEYS.includes(key)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    const signal = toSignal(stream$, { initialValue: '' });


    return {stream$, signal};
  },
});