# Scanner Meme Solana — Guida alla pubblicazione (PWA)

Questo pacchetto contiene un'app web completa e pronta da pubblicare.
Non serve "compilare" nulla: sono solo file HTML/CSS/JS che un hosting
gratuito può servire così come sono.

## Cosa contiene

```
index.html          → l'app vera e propria
manifest.json        → dice al telefono come installarla (nome, icona, colori)
service-worker.js    → permette il caricamento rapido / parzialmente offline
icons/               → le icone dell'app (192px, 512px, versione "maskable")
```

## Passo 1 — Crea un account hosting gratuito

Scegline uno (entrambi gratuiti, bastano pochi minuti):

- **Netlify** → https://app.netlify.com/signup
- **Vercel** → https://vercel.com/signup

Ti consiglio **Netlify** perché ha la modalità "drag and drop" più semplice.

## Passo 2 — Carica i file (metodo più semplice: drag & drop)

1. Vai su https://app.netlify.com/drop
2. Trascina l'intera cartella `pwa-app` (quella con dentro `index.html`,
   `manifest.json`, ecc.) nella pagina
3. In pochi secondi Netlify ti darà un indirizzo tipo:
   `https://nome-a-caso-12345.netlify.app`
4. Funziona già! Apri quel link dal telefono per provarlo

### Se vuoi un nome più carino
Dentro Netlify, in "Site settings" → "Change site name", puoi scegliere
un nome tipo `scanner-meme-mortaz.netlify.app` (gratis, nessun dominio
da comprare).

## Passo 3 — Installa l'app sul telefono

Apri il link che hai ottenuto dal browser del telefono:

**Android (Chrome):**
- Si apre un banner "Installa l'app sulla schermata Home" dentro l'app stessa
- Oppure: tre puntini in alto a destra → "Installa app"

**iPhone (Safari — obbligatorio usare Safari, non Chrome):**
- Tocca l'icona di condivisione (il quadrato con la freccia in su)
- Scorri e tocca "Aggiungi a Home"

Da quel momento l'icona a scudo verde apparirà sulla tua schermata Home
come una vera app, a schermo intero, senza barra del browser.

## Note tecniche importanti

- **Niente CORS**: una volta ospitata su un dominio vero (netlify.app o
  simili), molte API funzionano meglio rispetto a quando l'app girava
  dentro l'anteprima di Claude. Se dovessi comunque vedere errori di
  rete, il codice include già un fallback automatico su due proxy CORS
  pubblici.
- **Aggiornamenti**: se in futuro vuoi modificare l'app (es. aggiungere
  funzioni), basta ricaricare la cartella aggiornata su Netlify — non
  serve ripubblicare da zero, puoi anche collegare Netlify a GitHub per
  aggiornamenti automatici.
- **Costi**: zero. Netlify e Vercel hanno piani gratuiti più che
  sufficienti per un'app personale come questa.
- **Privacy**: l'app non raccoglie dati tuoi. La cronologia degli
  indirizzi controllati resta salvata solo sul tuo telefono
  (`localStorage`), non su nessun server.

## Analisi dei top holder (novità)

Dopo aver controllato un token, compare un pulsante "Analizza top 10
holder" che:

1. Controlla che nessuno dei primi 10 possessori detenga più del **3%**
   della supply
2. Interroga la blockchain Solana per lo storico delle transazioni di
   ogni wallet negli ultimi **30 giorni**, per capire se hanno già
   venduto il token

**Tempo di attesa:** questa scansione interroga la blockchain in tempo
reale per ogni wallet, quindi richiede circa **15-25 secondi**. È
normale: c'è una barra di progresso che mostra l'avanzamento.

**Limite onesto:** usa l'RPC pubblico gratuito di Solana, che ha dei
limiti di velocità. Se in quel momento il servizio è molto trafficato,
alcuni wallet potrebbero risultare "non verificato" invece di
"pulito/ha venduto" — in quel caso riprova tra qualche minuto.

## Giudizio AI (novità — richiede un piccolo passo extra)

Dopo ogni controllo, l'app prova a generare un **giudizio finale scritto
in italiano semplice**, come se un esperto ti spiegasse la situazione,
basandosi su tutti i dati raccolti (rischi, liquidità, holder, e — se
l'hai eseguita — l'analisi dei top 10 holder).

Questa funzione usa l'API di Anthropic (Claude) e **richiede una chiave
API personale**, perché un sito statico pubblico non può usare la mia
chiave: dovrebbe condividerla con chiunque visiti il sito, il che non è
sicuro.

### Come attivarlo (5 minuti)

1. Vai su **console.anthropic.com** e crea un account (se non l'hai già)
2. Nella sezione "API Keys", crea una nuova chiave
3. Apri il file `index.html` con un editor di testo (anche il Blocco
   Note va bene) e cerca questa riga vicino all'inizio dello script:

   ```js
   const ANTHROPIC_API_KEY = "";
   ```

4. Incolla la tua chiave tra le virgolette:

   ```js
   const ANTHROPIC_API_KEY = "sk-ant-...";
   ```

5. Salva il file e ripubblica la cartella su Netlify (drag & drop di
   nuovo, come la prima volta)

**⚠️ Attenzione importante sulla sicurezza:** mettere una chiave API
direttamente nel codice di un sito pubblico significa che **chiunque
visiti il sito può vederla** (basta aprire gli strumenti sviluppatore
del browser) e usarla a tue spese. Per un uso solo personale, dove sei
l'unica persona a conoscere il link del sito, il rischio è basso ma non
zero. Se in futuro vuoi condividere il link con altre persone, è meglio
spostare questa chiamata su un piccolo server (fammelo sapere, è un
passo successivo che posso aiutarti a fare).

**Senza chiave**, l'app funziona comunque normalmente: il pannello
mostrerà "Giudizio AI non disponibile" ma tutti i dati tecnici (rischio,
liquidità, holder) restano pienamente funzionanti.

## Vuoi pubblicarla anche su Play Store / App Store in futuro?

Una volta che la PWA funziona, è possibile "incartarla" con uno
strumento come **Capacitor** per pubblicarla anche sugli store veri.
Richiede un account sviluppatore Google (~25$ una tantum) o Apple
(~99$/anno). Fammelo sapere quando vuoi affrontare questo passo.
