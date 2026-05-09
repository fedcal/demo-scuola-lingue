import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, Corsi, Docenti, Certificazioni, Faq } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly corsi$: Observable<Corsi> = this.http
    .get<Corsi>('/assets/mock/corsi.json')
    .pipe(shareReplay(1));

  readonly docenti$: Observable<Docenti> = this.http
    .get<Docenti>('/assets/mock/docenti.json')
    .pipe(shareReplay(1));

  readonly certificazioni$: Observable<Certificazioni> = this.http
    .get<Certificazioni>('/assets/mock/certificazioni.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<Faq> = this.http
    .get<Faq>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
