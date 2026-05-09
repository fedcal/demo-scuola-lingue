import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-iscriviti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Iscriviti a Babel Academy</h1>
        <p>Placement test gratuito incluso. Il corso inizia il mese successivo alla tua iscrizione.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="iscriviti-layout">
        <section class="form-section">
          <h2>Modulo di iscrizione</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono *</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" required />
            </div>

            <div class="row-2">
              <div class="field">
                <label for="lingua">Lingua *</label>
                <select id="lingua" formControlName="lingua" required>
                  <option value="">— Seleziona —</option>
                  <option value="inglese">🇬🇧 Inglese</option>
                  <option value="spagnolo">🇪🇸 Spagnolo</option>
                  <option value="tedesco">🇩🇪 Tedesco</option>
                  <option value="francese">🇫🇷 Francese</option>
                  <option value="cinese">🇨🇳 Cinese Mandarino</option>
                </select>
              </div>
              <div class="field">
                <label for="livello">Livello stimato *</label>
                <select id="livello" formControlName="livello" required>
                  <option value="">— Seleziona —</option>
                  <option value="A1">A1 — Principiante</option>
                  <option value="A2">A2 — Elementare</option>
                  <option value="B1">B1 — Intermedio</option>
                  <option value="B2">B2 — Intermedio Superiore</option>
                  <option value="C1">C1 — Avanzato</option>
                  <option value="C2">C2 — Padronanza</option>
                  <option value="non-so">Non so — voglio il placement test</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="tipologia">Tipologia corso *</label>
              <select id="tipologia" formControlName="tipologia" required>
                <option value="">— Seleziona —</option>
                <option value="gruppo">Corso di gruppo (€120/mese)</option>
                <option value="individuale">Lezioni private (€35/ora)</option>
                <option value="certificazione">Preparazione certificazione (€280/mese)</option>
              </select>
            </div>

            <div class="field">
              <label for="obiettivo">Obiettivo principale</label>
              <select id="obiettivo" formControlName="obiettivo">
                <option value="">— Opzionale —</option>
                <option value="lavoro">Lavoro / Business</option>
                <option value="certificazione">Conseguire una certificazione</option>
                <option value="viaggi">Viaggi e cultura</option>
                <option value="universita">Università / Studio</option>
                <option value="generico">Interesse personale</option>
              </select>
            </div>

            <div class="field">
              <label for="note">Note aggiuntive</label>
              <textarea id="note" formControlName="note" rows="3"
                placeholder="Es. disponibilità oraria, esigenze particolari..."></textarea>
            </div>

            <div class="field field--checkbox">
              <input id="placementTest" type="checkbox" formControlName="placementTest" />
              <label for="placementTest">
                Voglio il placement test gratuito per valutare il mio livello prima del corso.
              </label>
            </div>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto il trattamento dei dati personali ai sensi del GDPR per gestire la mia richiesta di iscrizione. *
              </label>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta di iscrizione
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene inviato. In un sito reale riceveresti una email di conferma entro 24h.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <div class="thankyou__icon" aria-hidden="true">🎉</div>
              <h3>Richiesta ricevuta, {{ form.value.nome }}!</h3>
              <p>
                Hai selezionato il corso di <strong>{{ form.value.lingua }}</strong>
                (livello <strong>{{ form.value.livello }}</strong>) —
                <strong>{{ form.value.tipologia }}</strong>.
              </p>
              <p *ngIf="form.value.placementTest">
                Il tuo placement test gratuito verrà organizzato entro 48h.
              </p>
              <p>In un sito reale riceveresti un'email di conferma con tutti i dettagli e i prossimi passi.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>

        <aside class="info-aside">
          <section class="aside-block">
            <h3>Come funziona</h3>
            <ol class="steps">
              <li><strong>Compila il modulo</strong> con la tua lingua e il livello desiderato.</li>
              <li><strong>Placement test gratuito</strong> (se richiesto) entro 48h per convalidare il livello.</li>
              <li><strong>Conferma e pagamento</strong> — ricevi via email il link per il primo mese.</li>
              <li><strong>Prima lezione</strong> — entra in aula o collegati online.</li>
            </ol>
          </section>

          <section class="aside-block" *ngIf="faq$ | async as faqData">
            <h3>Domande frequenti</h3>
            <dl class="faq-mini">
              <ng-container *ngFor="let item of faqData.faq.slice(0, 3)">
                <dt>{{ item.domanda }}</dt>
                <dd>{{ item.risposta }}</dd>
              </ng-container>
            </dl>
          </section>

          <section class="aside-block aside-block--contact">
            <h3>Preferisci chiamarci?</h3>
            <p>Segreteria aperta lun–ven 08:30–20:00, sab 09:00–13:00.</p>
            <a href="tel:+390455550100" class="btn btn-primary aside-btn">+39 045 555 0100</a>
            <a href="mailto:info@babelacademy.it" class="btn btn-secondary aside-btn">info@babelacademy.it</a>
          </section>
        </aside>
      </div>
    </article>
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
      .iscriviti-layout {
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: 3rem;
        align-items: start;
      }
      @media (max-width: 800px) {
        .iscriviti-layout { grid-template-columns: 1fr; }
      }
      .form-section h2 { margin: 0 0 1.5rem; }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        color: var(--color-fg-default);
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .field--checkbox input { width: 1rem; height: 1rem; margin-top: 0.2rem; flex-shrink: 0; }
      .field--checkbox label { font-weight: 400; font-size: 0.85rem; color: var(--color-fg-muted); }
      .row-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      @media (max-width: 480px) {
        .row-2 { grid-template-columns: 1fr; }
      }
      .btn {
        display: inline-block;
        padding: 0.65rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #be185d; }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-secondary { background: #ffffff; color: var(--color-fg-default); border: 1px solid var(--color-border); }
      .btn-secondary:hover { background: var(--color-bg-subtle); }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
      }
      .thankyou__icon { font-size: 3rem; margin-bottom: 0.75rem; }
      .thankyou h3 { color: var(--color-success); margin: 0 0 0.75rem; }
      .thankyou p { color: var(--color-fg-muted); font-size: 0.9rem; margin-bottom: 0.5rem; }
      .info-aside { display: flex; flex-direction: column; gap: 1.5rem; }
      .aside-block {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .aside-block h3 { margin: 0 0 1rem; font-size: 1rem; }
      .steps {
        margin: 0;
        padding-left: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .steps li { font-size: 0.88rem; line-height: 1.5; }
      .faq-mini { margin: 0; }
      .faq-mini dt {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .faq-mini dd {
        margin: 0 0 1rem;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.55;
      }
      .aside-block--contact p {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
      }
      .aside-btn {
        display: block;
        margin-bottom: 0.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IscrivitiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly faq$ = this.mockData.faq$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    lingua: ['', Validators.required],
    livello: ['', Validators.required],
    tipologia: ['', Validators.required],
    obiettivo: [''],
    note: [''],
    placementTest: [false],
    privacy: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ placementTest: false, privacy: false });
    this.submitted.set(false);
  }
}
