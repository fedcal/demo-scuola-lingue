# Funzionalità per Tier — Babel Academy Verona

Tre livelli di template per scuola lingue private, dal booking lezioni base alle certificazioni CEFR con gamification.

## Tier Base — €500-800 (consegna 2-3 settimane)

**Per chi**: Scuola lingue piccola che vuole gestire booking online.  
**Sforzo stimato**: ~80h.

### Funzionalità incluse

- **Home Hero** con foto aule + CTA "Prenota Lezione"
- **Booking Lezioni**
  - Calendario insegnanti realtime
  - Slot 1h/1.5h selezionabili
  - Lingue offerte (inglese, spagnolo, tedesco, francese)
  - Conferma email + SMS
  
- **Livelli CEFR**
  - Menu esplicito (A1-B1-B2-C1-C2)
  - Descrizione competenze per livello
  - Pre-requisiti lineari
  
- **Profilo Studente**
  - Storico lezioni prenotate
  - Certificati scaricati
  - Contatti insegnante assegnato
  
- **Listino Prezzi**
  - €50-80/h lezione singola
  - Pacchetti 5/10/20 ore
  - Corsi gruppo €15-25/h
  
- **Schema EducationEvent JSON-LD** per SEO
- **Mobile-first responsive** (LCP <2.5s)
- **HTTPS + SSL certificate** gratis Let's Encrypt

### Cosa NON è incluso

- Classi virtuali
- Test placement AI
- Certificati ufficiali Cambridge/DELE
- Fatturazione automatica
- Tracking progresso CEFR
- Gamification

---

## Tier Intermedio — €1.500-2.200 (consegna 4-6 settimane)

**Per chi**: Scuola lingue consolidata che vuole integrazione video e test placement.  
**Sforzo stimato**: ~250h.

### Funzionalità incluse (oltre al Base)

- **Classi Virtuali Integrate**
  - Zoom/Meet embed prenotazione
  - Recording automatico lezione (con consenso)
  - Chat room studenti
  - Screen sharing e lavagna condivisa
  
- **Test Placement AI**
  - Ollama Qwen2.5 genera test A1-B2
  - 20 domande personalizzate per livello
  - Scoring automatico
  - Consiglio livello intelligente
  
- **Tracking Progresso CEFR**
  - Dashboard studentessa con abilità check
  - Skills per categoria (speaking, writing, listening, reading)
  - Attività suggerite per gap
  - Report genitori (studenti minori)
  
- **Certificati Competenza**
  - Generazione PDF con timestamp
  - QR code verificabile online
  - Template ufficiale Cambridge-style
  
- **Fatturazione Automatica**
  - Stripe pagamenti per ore svolte
  - Crediti prepagati sistema
  - Ricevute automatiche pdf
  
- **Multi-lingua IT/EN/DE/ES** (studenti EU)
- **Admin Dashboard** modifica calendario/prezzi
- **Newsletter opt-in** new level courses

### Integrazioni disponibili

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Stripe | 1.4% + €0.30 per transazione | Payment processor |
| Zoom API | €229/anno pro | Classi virtuali |
| SendGrid Email | Free (100/giorno) | Comunicazioni |
| Twilio SMS | €15-30 | Reminder lezioni |

---

## Tier Avanzato — €4.000-6.000 (consegna 10-12 settimane)

**Per chi**: Scuola lingue catena regionale con esigenze certificazioni ufficiali Cambridge/DELE.  
**Sforzo stimato**: ~700h.

### Funzionalità incluse (oltre all'Intermedio)

- **Certificati Ufficiali**
  - Integration Cambridge English + DELE + Goethe + HSK (cinese)
  - Prenotazione esame nella piattaforma
  - Calendario esami ufficiali sincronizzato
  - Pagamento esame diretto (Cambridge €130-240)
  
- **Gamification Completa**
  - Punti per lezione completata
  - Badge achievement (first lesson, 10 hours, first certificate)
  - Leaderboard settimanale/mensile
  - Sconti unlock con punti (€10 off next lesson)
  
- **Parent Portal Mobile App**
  - Visualizza progresso figli (minori)
  - Ricevi alert assenze
  - Comunicazione diretta insegnante
  - Fatture e pagamenti centralizzati
  
- **Automazione Curriculum**
  - Sequenza lezioni consigliata per livello
  - Esercizi homework AI-generated Ollama
  - Feedback vocale insegnante (Whisper ASR)
  - Tracking completion homework
  
- **Multi-Location Admin**
  - Gestisci 2-3 sedi scuola da dashboard
  - Menu prezzi/insegnanti diverse per location
  - Consolidation revenue cross-sede
  - Report insegnanti per location
  
- **Advanced Analytics**
  - Completion rate per level
  - Time-to-certificate trend
  - Insegnante KPI (student satisfaction, pass rate)
  - Revenue per lingua + location

### Integrazioni Enterprise

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Ollama AI (on-prem) | €0 | Test placement + homework generation |
| Zoom API | €229/anno | Classi virtuali enterprise |
| Cambridge/DELE API | Variable | Esami ufficiali integration |
| SendGrid | Free tier | Email bulk marketing |

---

## Confronto Tier

| Funzionalità | Base | Intermedio | Avanzato |
|---|:---:|:---:|:---:|
| Booking Lezioni | ✓ | ✓ | ✓ |
| Menu Livelli CEFR | ✓ | ✓ | ✓ |
| Profilo Studente | ✓ | ✓ | ✓ |
| **Classi Virtuali** | — | ✓ | ✓ |
| **Test Placement AI** | — | ✓ | ✓ |
| **Tracking Progresso** | — | ✓ | ✓ |
| **Certificati** | — | ✓ | ✓ |
| **Cert. Ufficiali** | — | — | ✓ |
| **Gamification** | — | — | ✓ |
| **Parent Portal** | — | — | ✓ |
| **Multi-Location** | — | — | ✓ |

---

## Manutenzione Ricorrente

| Piano | €/mese | Incluso |
|-------|---------|---------|
| **Basic** | €50 | Hosting + SSL + backup + email support |
| **Standard** | €100 | Basic + 4h modifiche/mese + monitoring + phone support |
| **Premium** | €200 | Standard + 12h modifiche/mese + CDN + AI tuning + cert sync |

---

## Partnership & Supporto

**Hosting** — Hetzner VPS (EU-based, GDPR compliant)  
**SSL/CDN** — Cloudflare free tier  
**Payment** — Stripe + Pagamenti italiani  
**Support** — Federico Calò, email + Telegram

---

**Scegli il tier adatto. Contatta Federico per quotazione personalizzata.**
