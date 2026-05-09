import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-docenti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri docenti madrelingua</h1>
        <p>8 insegnanti certificati, tutti parlanti nativi con anni di esperienza nell'insegnamento L2.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="docenti$ | async as data; else loading">
      <ul class="docenti-grid">
        <li *ngFor="let d of data.docenti" class="docente-card">
          <div class="docente-card__avatar" [attr.aria-label]="'Avatar ' + d.nome">
            {{ d.nome.charAt(0) }}
          </div>
          <div class="docente-card__body">
            <div class="docente-card__head">
              <h2>{{ d.nome }}</h2>
              <span class="docente-card__flag" aria-hidden="true">{{ d.flag }}</span>
            </div>
            <p class="docente-card__lingua">
              <strong>Lingua:</strong> {{ d.nome.split(' ')[0] }}&nbsp;— {{ d.nazionalita }}, {{ d.citta }}
            </p>
            <p class="docente-card__spec">{{ d.specializzazione }}</p>
            <p class="docente-card__bio">{{ d.bio }}</p>
            <div class="docente-card__footer">
              <span class="docente-card__anni">{{ d.anni }} anni di esperienza</span>
              <ul class="docente-card__certs">
                <li *ngFor="let c of d.certificazioni">{{ c }}</li>
              </ul>
            </div>
            <div class="docente-card__livelli">
              <span class="livello-badge" *ngFor="let lv of d.livelli">{{ lv }}</span>
            </div>
          </div>
        </li>
      </ul>
    </article>

    <ng-template #loading>
      <div class="demo-container loading-state">
        <p>Caricamento docenti...</p>
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
      .docenti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.5rem;
      }
      .docente-card {
        display: flex;
        gap: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #ffffff;
        align-items: flex-start;
      }
      .docente-card__avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        flex-shrink: 0;
      }
      .docente-card__body { flex: 1; min-width: 0; }
      .docente-card__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.35rem;
      }
      .docente-card__head h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .docente-card__flag { font-size: 1.5rem; }
      .docente-card__lingua {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.25rem;
      }
      .docente-card__spec {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-accent);
        margin: 0 0 0.75rem;
      }
      .docente-card__bio {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.6;
      }
      .docente-card__footer { margin-bottom: 0.75rem; }
      .docente-card__anni {
        font-size: 0.8rem;
        font-weight: 700;
        display: block;
        margin-bottom: 0.4rem;
      }
      .docente-card__certs {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
      }
      .docente-card__certs li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .docente-card__livelli {
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .livello-badge {
        font-size: 0.72rem;
        font-weight: 700;
        background: #fdf2f8;
        color: var(--color-accent);
        border: 1px solid #fbcfe8;
        padding: 0.15rem 0.45rem;
        border-radius: var(--radius-sm);
      }
      .loading-state { padding: 4rem 1rem; text-align: center; color: var(--color-fg-muted); }
      @media (max-width: 480px) {
        .docente-card { flex-direction: column; }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocentiComponent {
  private readonly mockData = inject(MockDataService);
  readonly docenti$ = this.mockData.docenti$;
}
