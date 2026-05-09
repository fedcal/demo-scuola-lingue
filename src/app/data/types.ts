// Tipi TypeScript per i dati mock di Babel Academy

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziScuola {
  placementTestGratuito: boolean;
  lezioniOnline: boolean;
  lezioniInPresenza: boolean;
  lezioniPrivate: boolean;
  corsiGruppo: boolean;
  preparazioneCertificazioni: boolean;
  corsiAziende: boolean;
  wifiGratuito: boolean;
  accessibileDisabili: boolean;
  bibliotecaMultilingue: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazioneAnno: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziScuola;
  metaSeo: MetaSeo;
}

// --- Corsi ---

export interface Lingua {
  id: string;
  nome: string;
  flag: string;
  descrizione: string;
  certificazioni: string[];
  colore: string;
}

export interface LivelloCorso {
  codice: string;
  nome: string;
  descrizione: string;
  durataMesi: number;
  oreSettimanali: number;
  prezzoMensileGruppo: number;
  prezzoOraPrivata: number;
}

export interface PacchettoCorso {
  id: string;
  nome: string;
  prezzo: number;
  unitaMisura: string;
  descrizione: string;
  incluso: string[];
  highlight: boolean;
}

export interface Corsi {
  lingue: Lingua[];
  livelli: LivelloCorso[];
  pacchetti: PacchettoCorso[];
}

// --- Docenti ---

export interface Docente {
  id: number;
  nome: string;
  lingua: string;
  flag: string;
  nazionalita: string;
  citta: string;
  anni: number;
  specializzazione: string;
  bio: string;
  certificazioni: string[];
  livelli: string[];
  corsiAttivi: string[];
}

export interface Docenti {
  docenti: Docente[];
}

// --- Certificazioni ---

export interface LivelloCertificazione {
  codice: string;
  nome: string;
  tassa: number;
  durata: string;
}

export interface Certificazione {
  id: string;
  lingua: string;
  flag: string;
  ente: string;
  nomeEnte: string;
  descrizione: string;
  sede: string;
  riconoscimento: string;
  validita: string;
  livelli: LivelloCertificazione[];
  sessioniAnno: string[];
  periodoPreparazione: string;
}

export interface Certificazioni {
  certificazioni: Certificazione[];
}

// --- FAQ ---

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
