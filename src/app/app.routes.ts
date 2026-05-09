import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Babel Academy — Scuola di Lingue Verona | Corsi e Certificazioni'
  },
  {
    path: 'corsi',
    loadComponent: () => import('./pages/corsi/corsi.component').then((m) => m.CorsiComponent),
    title: 'Corsi di Lingue A1-C2 — Babel Academy Verona'
  },
  {
    path: 'docenti',
    loadComponent: () => import('./pages/docenti/docenti.component').then((m) => m.DocentiComponent),
    title: 'I nostri Docenti Madrelingua — Babel Academy'
  },
  {
    path: 'certificazioni',
    loadComponent: () => import('./pages/certificazioni/certificazioni.component').then((m) => m.CertificazioniComponent),
    title: 'Certificazioni Cambridge, DELE, Goethe, HSK — Babel Academy'
  },
  {
    path: 'iscriviti',
    loadComponent: () => import('./pages/iscriviti/iscriviti.component').then((m) => m.IscrivitiComponent),
    title: 'Iscriviti — Babel Academy Verona'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
