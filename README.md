# 🛡️ Scanner Meme Solana

Controlla se un memecoin su **Solana** è a rischio scam prima di comprarlo.
App web (PWA) gratuita, installabile su telefono, senza account né backend.

> 🇮🇹 Guida completa in italiano: vedi [`LEGGIMI.md`](./LEGGIMI.md)

## Cosa fa

- ✅ Analizza liquidità, autorità del contratto (mint/freeze) e concentrazione
  dei possessori usando i dati pubblici di [RugCheck.xyz](https://rugcheck.xyz)
- ✅ Verifica che nessuno dei top 10 holder superi una soglia configurabile
  (default 3%) della supply
- ✅ Controlla lo storico delle transazioni dei top holder sulla blockchain
  Solana per individuare vendite recenti (finestra di 30 giorni)
- ✅ Genera un giudizio finale in linguaggio naturale tramite l'API di
  Claude (opzionale, richiede una chiave API personale)
- ✅ Funziona come PWA: installabile sulla schermata Home di Android/iPhone

## Perché esiste

Nato per dare a chiunque uno strumento gratuito e trasparente per
riconoscere i segnali tipici dei rug pull, senza fidarsi solo del
marketing di un progetto.

## Demo rapida / Pubblicazione

Il modo più veloce per pubblicarlo è il drag & drop gratuito su Netlify:

1. Clona o scarica questo repository
2. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
3. Trascina la cartella del progetto
4. Apri il link generato dal telefono e installalo sulla schermata Home

Istruzioni dettagliate passo passo (in italiano) in [`LEGGIMI.md`](./LEGGIMI.md).

## Stack tecnico

Nessun framework, nessun build step: HTML + CSS + JavaScript vanilla in un
unico file `index.html`, pensato per essere ospitato gratuitamente su
qualsiasi hosting statico (Netlify, Vercel, GitHub Pages, ecc.).

```
index.html          → app completa (markup, stile, logica)
manifest.json        → metadati PWA (nome, icona, colori)
service-worker.js    → cache della shell per caricamento rapido
icons/                → icone dell'app
```

### Fonti dati

| Dato | Fonte |
|---|---|
| Rischio token, liquidità, holder | [RugCheck.xyz API](https://api.rugcheck.xyz) (gratuita, no key) |
| Storico transazioni wallet | RPC pubblico Solana (`api.mainnet-beta.solana.com`) |
| Giudizio in linguaggio naturale | [Anthropic API](https://console.anthropic.com) (richiede chiave personale) |

## Configurazione della chiave API (opzionale)

Il giudizio AI è una funzione opzionale. **La chiave API non va mai
inserita nel codice sorgente.** Viene chiesta dall'interfaccia al primo
utilizzo e salvata solo in `localStorage`, nel browser della persona che
la usa — non finisce mai nel repository né viene condivisa con altri
utenti dell'app.

## Limiti noti

- L'RPC pubblico di Solana ha rate limit: la scansione dei top holder può
  risultare "non verificata" in caso di traffico elevato
- Il rilevamento "ha venduto" è un segnale indiretto (movimento sul
  token negli ultimi 30 giorni), non una prova definitiva di rug pull
- Nessuno strumento automatico sostituisce una due diligence completa:
  usalo come supporto, non come unica fonte di verità

## Contribuire

Pull request benvenute. Idee aperte:
- Supporto multi-chain (Ethereum, BSC) tramite GoPlus Security API
- Cache locale dei risultati per ridurre le chiamate ripetute
- Soglia holder configurabile dall'interfaccia invece che nel codice

## Licenza

[MIT](./LICENSE) — usalo, modificalo, ridistribuiscilo liberamente.

## Disclaimer

Questo strumento fornisce un'analisi automatica basata su dati pubblici
on-chain. **Non è consulenza finanziaria.** Anche un punteggio di rischio
basso non garantisce l'assenza di rischio. Verifica sempre più fonti
prima di investire.
