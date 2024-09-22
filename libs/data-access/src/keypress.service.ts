import { Injectable } from '@angular/core';
import { fromEvent, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeypressService {
  readonly keyPressed$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map(event => event.key),
    tap(key => console.log(key)),
  );
}

