import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-certificazioni',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Certificazioni Internazionali</h1>
        <p>Cambridge · DELE · Goethe-Zertifikat · HSK — sede d'esame accreditata a Verona</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="certificazioni$ | async as data; else loading">
      <div class="cert-list">
        <section *ngFor="let c of data.certificazioni" class="cert-block">
          <div class="cert-block__header">
            <span class="cert-block__flag" aria-hidden="true">{{ c.flag }}</span>
            <div>
              <h2>{{ c.ente }}</h2>
              <p class="cert-block__ente">{{ c.nomeEnte }}</p>
            </div>
          </div>
          <p class="cert-block__desc">{{ c.descrizione }}</p>
          <dl class="cert-block__meta">
            <dt>Sede</dt><dd>{{ c.sede }}</dd>
            <dt>Riconoscimento</dt><dd>{{ c.riconoscimento }}</dd>
            <dt>Validità</dt><dd>{{ c.validita }}</dd>
            <dt>Preparazione consigliata</dt><dd>{{ c.periodoPreparazione }}</dd>
          </dl>

          <h3>Livelli e tasse d'esame</h3>
          <ul class="livelli-grid">
            <li *ngFor="let lv of c.livelli" class="livello-item">
              <div class="livello-item__code">{{ lv.codice }}</div>
              <div class="livello-item__body">
                <p class="livello-item__nome">{{ lv.nome }}</p>
                <p class="livello-item__info">
                  <span>Tassa: <strong>{{ lv.tassa | currency: 'EUR':'symbol':'1.0-0' }}</strong></span>
                  <span>Durata: {{ lv.durata }}</span>
                </p>
              </div>
            </li>
          </ul>

          <div class="cert-block__sessioni">
            <strong>Sessioni d'esame:</strong>
            <ul class="sessioni-list">
              <li *ngFor="let s of c.sessioniAnno">{{ s }}</li>
            </ul>
          </div>

          <a routerLink="/iscriviti" class="btn btn-primary">Preparati con noi</a>
        </section>
      </div>

      <section class="note-block">
        <h2>Informazioni utili</h2>
        <ul>
          <li>Le tasse d'esame riportate sono indicative e aggiornate al 2026. Verificare sempre sul sito ufficiale dell'ente.</li>
          <li>Babel Academy è sede d'esame accreditata per Cambridge e centro preparazione per DELE, Goethe e HSK.</li>
          <li>I corsi di preparazione certificazioni includono materiale ufficiale e simulazioni d'esame.</li>
          <li>Per l'iscrizione agli esami è necessario contattare la segreteria con almeno 6 settimane di anticipo.</li>
        </ul>
      </section>
    </article>

    <ng-template #loading>
      <div class="demo-container loading-state">
        <p>Caricamento certificazioni...</p>
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
      .cert-list { display: flex; flex-direction: column; gap: 3rem; }
      .cert-block {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        background: #ffffff;
      }
      .cert-block__header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .cert-block__flag { font-size: 2.5rem; }
      .cert-block__header h2 { margin: 0; font-size: 1.4rem; }
      .cert-block__ente { margin: 0.25rem 0 0; font-size: 0.85rem; color: var(--color-fg-muted); }
      .cert-block__desc {
        color: var(--color-fg-muted);
        line-height: 1.65;
        margin-bottom: 1.25rem;
        max-width: 800px;
      }
      .cert-block__meta {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.4rem 1.5rem;
        font-size: 0.88rem;
        margin: 0 0 1.5rem;
        padding: 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .cert-block__meta dt { font-weight: 600; color: var(--color-fg-muted); }
      .cert-block__meta dd { margin: 0; }
      .cert-block h3 { margin: 0 0 1rem; font-size: 1.05rem; }
      .livelli-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 0.75rem;
      }
      .livello-item {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        padding: 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        background: #fafafa;
      }
      .livello-item__code {
        min-width: 2.4rem;
        height: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        background: #fdf2f8;
        color: var(--color-accent);
        font-weight: 700;
        font-size: 0.85rem;
        border: 1px solid #fbcfe8;
        flex-shrink: 0;
      }
      .livello-item__body { flex: 1; }
      .livello-item__nome { margin: 0 0 0.25rem; font-size: 0.9rem; font-weight: 600; }
      .livello-item__info {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin: 0;
        flex-wrap: wrap;
      }
      .cert-block__sessioni {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.88rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .sessioni-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .sessioni-list li {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-size: 0.8rem;
      }
      .btn {
        display: inline-block;
        padding: 0.65rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.15s ease;
        border: none;
        cursor: pointer;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #be185d; }
      .note-block {
        margin-top: 3rem;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .note-block h2 { margin: 0 0 0.75rem; font-size: 1.1rem; }
      .note-block ul { margin: 0; padding-left: 1.25rem; }
      .note-block li { font-size: 0.88rem; color: var(--color-fg-muted); margin-bottom: 0.4rem; line-height: 1.5; }
      .loading-state { padding: 4rem 1rem; text-align: center; color: var(--color-fg-muted); }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificazioniComponent {
  private readonly mockData = inject(MockDataService);
  readonly certificazioni$ = this.mockData.certificazioni$;
}
