import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Impara una nuova lingua a Verona</h1>
        <p class="hero-tagline">
          Inglese, spagnolo, tedesco, francese e cinese. 8 docenti madrelingua, livelli A1-C2,
          certificazioni internazionali riconosciute.
        </p>
        <div class="hero-actions">
          <a routerLink="/corsi" class="btn btn-primary">Scopri i corsi</a>
          <a routerLink="/iscriviti" class="btn btn-secondary">Placement test gratuito</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Babel Academy</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🌍</span>
          <h3>8 Docenti madrelingua</h3>
          <p>Tutti i nostri insegnanti sono parlanti nativi certificati con anni di esperienza nell'insegnamento.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📊</span>
          <h3>Placement test gratuito</h3>
          <p>Test di livello online + colloquio orale per collocarti nel corso giusto fin dal primo giorno.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏅</span>
          <h3>Certificazioni ufficiali</h3>
          <p>Sede d'esame accreditata Cambridge, DELE, Goethe e centro preparazione HSK.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💻</span>
          <h3>Online e in presenza</h3>
          <p>Lezioni in aula a Verona o online via Zoom. Stesso programma, stessa qualità.</p>
        </li>
      </ul>
    </section>

    <section class="lingue-featured demo-container" *ngIf="lingueFeatured$ | async as lingue">
      <div class="section-header">
        <h2>Le lingue più richieste</h2>
        <a routerLink="/corsi" class="link-more">Tutti i corsi →</a>
      </div>
      <ul class="lingue-grid">
        <li *ngFor="let lingua of lingue" class="lingua-card">
          <div class="lingua-card__header">
            <span class="lingua-card__flag" aria-hidden="true">{{ lingua.flag }}</span>
            <h3>{{ lingua.nome }}</h3>
          </div>
          <p class="lingua-card__desc">{{ lingua.descrizione }}</p>
          <ul class="lingua-card__certs">
            <li *ngFor="let cert of lingua.certificazioni">{{ cert }}</li>
          </ul>
          <a routerLink="/corsi" class="lingua-card__cta">Vedi livelli →</a>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Inizia il tuo percorso linguistico</h2>
        <p>Placement test gratuito. Prima lezione di prova senza impegno. Corsi mensili con inizio ogni mese.</p>
        <div class="hero-actions">
          <a routerLink="/iscriviti" class="btn btn-primary">Iscriviti ora</a>
          <a routerLink="/docenti" class="btn btn-secondary">Conosci i docenti</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #be185d;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .lingue-featured {
        padding: 4rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .lingue-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .lingua-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .lingua-card__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .lingua-card__flag {
        font-size: 2rem;
      }
      .lingua-card__header h3 {
        margin: 0;
        font-size: 1.25rem;
      }
      .lingua-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.6;
      }
      .lingua-card__certs {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .lingua-card__certs li {
        font-size: 0.72rem;
        background: #fdf2f8;
        color: var(--color-accent);
        border: 1px solid #fbcfe8;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .lingua-card__cta {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        margin-top: auto;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.35);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly lingueFeatured$ = this.mockData.corsi$.pipe(
    map((corsi) => corsi.lingue.filter((l) => ['inglese', 'spagnolo', 'tedesco'].includes(l.id)))
  );
}
