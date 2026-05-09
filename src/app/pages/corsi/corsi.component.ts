import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';
import type { Lingua, LivelloCorso } from '../../data/types';

const LIVELLI_CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type LivelloCefr = typeof LIVELLI_CEFR[number];

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, NgClass, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Corsi di Lingue</h1>
        <p>5 lingue · 6 livelli CEFR · corsi di gruppo e lezioni private</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="corsiData() as data; else loading">
      <!-- Filtri -->
      <section class="filters" aria-label="Filtra i corsi">
        <div class="filter-group">
          <span class="filter-label">Lingua:</span>
          <div class="filter-pills" role="group" aria-label="Filtra per lingua">
            <button
              class="pill"
              [class.pill--active]="linguaSelezionata() === null"
              (click)="setLingua(null)"
              type="button"
            >
              Tutte
            </button>
            <button
              *ngFor="let l of data.lingue"
              class="pill"
              [class.pill--active]="linguaSelezionata() === l.id"
              (click)="setLingua(l.id)"
              type="button"
            >
              {{ l.flag }} {{ l.nome }}
            </button>
          </div>
        </div>
        <div class="filter-group">
          <span class="filter-label">Livello:</span>
          <div class="filter-pills" role="group" aria-label="Filtra per livello CEFR">
            <button
              class="pill"
              [class.pill--active]="livelloSelezionato() === null"
              (click)="setLivello(null)"
              type="button"
            >
              Tutti
            </button>
            <button
              *ngFor="let lv of livelli"
              class="pill"
              [class.pill--active]="livelloSelezionato() === lv"
              (click)="setLivello(lv)"
              type="button"
            >
              {{ lv }}
            </button>
          </div>
        </div>
      </section>

      <!-- Griglia Lingue × Livelli -->
      <section class="corsi-section">
        <div *ngFor="let lingua of lingueFiltrate()" class="lingua-block">
          <div class="lingua-block__header">
            <span class="lingua-block__flag" aria-hidden="true">{{ lingua.flag }}</span>
            <h2>{{ lingua.nome }}</h2>
          </div>
          <p class="lingua-block__desc">{{ lingua.descrizione }}</p>
          <ul class="corsi-grid">
            <li
              *ngFor="let livello of livelliFiltrati()"
              class="corso-card"
            >
              <div class="corso-card__badge">{{ livello.codice }}</div>
              <h3 class="corso-card__title">{{ lingua.nome }} {{ livello.codice }} — {{ livello.nome }}</h3>
              <p class="corso-card__desc">{{ livello.descrizione }}</p>
              <dl class="corso-card__meta">
                <dt>Durata</dt>
                <dd>{{ livello.durataMesi }} mesi</dd>
                <dt>Frequenza</dt>
                <dd>{{ livello.oreSettimanali }} ore/sett.</dd>
                <dt>Gruppo</dt>
                <dd>{{ livello.prezzoMensileGruppo | currency: 'EUR':'symbol':'1.0-0' }}/mese</dd>
                <dt>Privato</dt>
                <dd>{{ livello.prezzoOraPrivata | currency: 'EUR':'symbol':'1.0-0' }}/ora</dd>
              </dl>
              <a routerLink="/iscriviti" class="corso-card__cta">Iscriviti →</a>
            </li>
          </ul>
        </div>
        <p *ngIf="lingueFiltrate().length === 0" class="no-results">
          Nessun corso trovato con i filtri selezionati.
        </p>
      </section>

      <!-- Pacchetti -->
      <section class="pacchetti">
        <h2>Formule e prezzi</h2>
        <ul class="pacchetti-grid">
          <li *ngFor="let p of data.pacchetti" class="pacchetto-card" [class.pacchetto-card--highlight]="p.highlight">
            <div *ngIf="p.highlight" class="pacchetto-badge">Più scelto</div>
            <h3>{{ p.nome }}</h3>
            <p class="pacchetto-prezzo">
              {{ p.prezzo | currency: 'EUR':'symbol':'1.0-0' }}<span class="pacchetto-unit">/{{ p.unitaMisura }}</span>
            </p>
            <p class="pacchetto-desc">{{ p.descrizione }}</p>
            <ul class="pacchetto-incluso">
              <li *ngFor="let item of p.incluso">{{ item }}</li>
            </ul>
            <a routerLink="/iscriviti" class="btn" [class.btn-primary]="p.highlight" [class.btn-secondary]="!p.highlight">
              Inizia ora
            </a>
          </li>
        </ul>
      </section>
    </article>

    <ng-template #loading>
      <div class="demo-container loading-state">
        <p>Caricamento corsi...</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .filters {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2.5rem;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .filter-group {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .filter-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        padding-top: 0.35rem;
        white-space: nowrap;
      }
      .filter-pills {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .pill {
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        border: 1px solid var(--color-border);
        background: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.12s ease;
      }
      .pill:hover { border-color: var(--color-accent); color: var(--color-accent); }
      .pill--active {
        background: var(--color-accent);
        color: #ffffff;
        border-color: var(--color-accent);
      }
      .corsi-section { margin-bottom: 4rem; }
      .lingua-block { margin-bottom: 3rem; }
      .lingua-block__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .lingua-block__flag { font-size: 2rem; }
      .lingua-block__header h2 {
        margin: 0;
        font-size: 1.5rem;
        padding-bottom: 0.25rem;
        border-bottom: 3px solid var(--color-accent);
      }
      .lingua-block__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1.5rem;
        max-width: 700px;
      }
      .corsi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .corso-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .corso-card__badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-sm);
        background: #fdf2f8;
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1rem;
        border: 1px solid #fbcfe8;
      }
      .corso-card__title {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .corso-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.85rem;
        margin: 0;
        line-height: 1.5;
      }
      .corso-card__meta {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.25rem 0.75rem;
        font-size: 0.82rem;
        margin: 0;
      }
      .corso-card__meta dt {
        color: var(--color-fg-muted);
        font-weight: 600;
      }
      .corso-card__meta dd {
        margin: 0;
        font-weight: 500;
      }
      .corso-card__cta {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.88rem;
        margin-top: auto;
      }
      .no-results {
        text-align: center;
        color: var(--color-fg-muted);
        padding: 3rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .pacchetti h2 { margin-bottom: 1.5rem; }
      .pacchetti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.25rem;
      }
      .pacchetto-card {
        position: relative;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.75rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .pacchetto-card--highlight {
        border-color: var(--color-accent);
        border-width: 2px;
      }
      .pacchetto-badge {
        position: absolute;
        top: -0.6rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-accent);
        color: #ffffff;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.2rem 0.75rem;
        border-radius: 9999px;
        white-space: nowrap;
      }
      .pacchetto-card h3 { margin: 0; font-size: 1.15rem; }
      .pacchetto-prezzo {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-accent);
        margin: 0;
      }
      .pacchetto-unit { font-size: 1rem; font-weight: 400; color: var(--color-fg-muted); }
      .pacchetto-desc { color: var(--color-fg-muted); font-size: 0.9rem; margin: 0; }
      .pacchetto-incluso {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .pacchetto-incluso li::before {
        content: '✓ ';
        color: var(--color-success);
        font-weight: 700;
      }
      .pacchetto-incluso li { font-size: 0.88rem; }
      .btn {
        display: inline-block;
        text-align: center;
        padding: 0.65rem 1.25rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
        margin-top: auto;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #be185d; }
      .btn-secondary { background: #ffffff; color: var(--color-fg-default); border: 1px solid var(--color-border); }
      .btn-secondary:hover { background: var(--color-bg-subtle); }
      .loading-state { padding: 4rem 1rem; text-align: center; color: var(--color-fg-muted); }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorsiComponent {
  private readonly mockData = inject(MockDataService);

  readonly livelli = LIVELLI_CEFR;
  readonly linguaSelezionata = signal<string | null>(null);
  readonly livelloSelezionato = signal<LivelloCefr | null>(null);

  readonly corsiData = toSignal(this.mockData.corsi$);

  readonly lingueFiltrate = computed<Lingua[]>(() => {
    const data = this.corsiData();
    if (!data) return [];
    const lingua = this.linguaSelezionata();
    return lingua === null ? data.lingue : data.lingue.filter((l) => l.id === lingua);
  });

  readonly livelliFiltrati = computed<LivelloCorso[]>(() => {
    const data = this.corsiData();
    if (!data) return [];
    const livello = this.livelloSelezionato();
    return livello === null ? data.livelli : data.livelli.filter((l) => l.codice === livello);
  });

  setLingua(id: string | null): void {
    this.linguaSelezionata.set(id);
  }

  setLivello(codice: LivelloCefr | null): void {
    this.livelloSelezionato.set(codice);
  }
}
