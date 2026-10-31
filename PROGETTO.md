# Ipovisore – scheda del progetto

Ingranditore per ipovedenti che usa la fotocamera, fatto come PWA (app web installabile).
Si usa in orizzontale, tenuto con due mani: i tasti si premono con i pollici.

## Dove sta

| Cosa | Dove |
|---|---|
| Codice (fonte ufficiale) | GitHub `Forrom58/ipovisore`, ramo `main` |
| Indirizzo dell'app | https://forrom58.github.io/ipovisore/ |
| Copia sul PC | `C:\Appoggio-Claude\IPOVISORE` |
| Dispositivi | Samsung Galaxy Tab S5e, Realme 12 Pro+ |

Il vecchio repository `visore` è stato cancellato il 28/10/2026. Usare solo `ipovisore`.

## File

| File | A cosa serve |
|---|---|
| `index.html` | Tutta l'app: grafica, tasti, fotocamera, voce, memo, lettura del testo |
| `manifest.json` | Nome, icone, orientamento orizzontale, modo `fullscreen` (schermo intero senza scritte di Chrome) |
| `sw.js` | Funzionamento offline (cache) |
| `icon-192.png`, `icon-512.png` | Icona: lente beige su sfondo marrone, banda ambra in basso con scritta IPO (stile delle altre PWA) |

## Tasti

| Sinistra (pollice sinistro) | Destra (pollice destro) |
|---|---|
| Zoom − | Zoom + |
| Luce (diventa "Fuoco" se non c'è il flash). **Tenuto premuto 1 secondo: cambia fotocamera** | Foto |
| Blocca / Sblocca | Leggi |
| Colori | Memo / Stop memo |
| Ascolta memo | Esci (va toccato 2 volte) |

- Ogni tasto dice a voce cosa ha fatto.
- Con lo zoom attivo si sposta l'immagine col dito; un doppio tocco la ricentra.
- **Esci** spegne fotocamera, luce e schermo intero.
- **Cambio fotocamera**: tenendo premuto Luce la voce dice "Fotocamera 2 di 3" ecc. La scelta resta memorizzata. Quante fotocamere si vedono dipende dal telefono (Realme 12 Pro+: principale 50 MP, zoom 3x 64 MP, grandangolo 8 MP; nessuna macro dedicata).
- **Memo**: registrazioni vocali libere, non collegate a foto o testi. Si ascoltano con "Ascolta memo".
- All'apertura la fotocamera parte da sola. La pagina "Tocca per iniziare" compare solo se la fotocamera non parte (pulsante "Riprova") e dopo Esci (pulsante "Riapri Ipovisore").
- All'avvio la voce dice "Ipovisore pronto", poi i colori e lo zoom (provato sul Realme il 28/10/2026).

## Impostazioni nel codice (`index.html`)

| Cosa | Dove | Valore attuale |
|---|---|---|
| Livelli di zoom | `const ZOOM` | 1, 1.5, 2, 3, 4, 5, 6, 8, 10 (la voce dice "minimo" e "massimo" agli estremi) |
| Combinazioni di colori | `const MODI` | normale, scala di grigi, nero su bianco, bianco su nero, giallo su nero, nero su giallo |
| Velocità della voce | `const VELOCITA` | 0.8 (1 = normale) |
| Colori dei tasti | `:root` nel CSS | `--t:#4A3426` (marrone), `--g:#F5E6C8` (crema) |
| Spazio tra i tasti | `.bar` → `gap` | 2.5vh |

## Come si aggiorna

1. Modificare i file su GitHub. Claude lo fa direttamente.
2. In `sw.js` aumentare il numero della cache (`ipovisore-v12` diventa `ipovisore-v13`), altrimenti i telefoni non vedono la versione nuova.
3. Copiare gli stessi file in `C:\Appoggio-Claude\IPOVISORE`.
4. Aspettare circa 10 minuti, perché GitHub Pages può servire la versione vecchia per un po'. Poi chiudere e riaprire l'app.

## Problemi già risolti

| Problema | Soluzione |
|---|---|
| Chrome dice "Questa app è già installata" ma l'app non c'è, e poi "Impossibile aprire l'app" | Chrome, ⋮, Impostazioni, Impostazioni sito, Tutti i siti, `forrom58.github.io`, **Cancella e reimposta**. Le app restano installate, ma si perdono i dati salvati nel sito. Causa: un ricordo sbagliato di Chrome per tutto il sito. Non era colpa dei file né di Vault (verificato con ADB il 28/10/2026). |
| Voce di Google poco chiara | Impostazioni di Android, Sintesi vocale. Per una voce migliore serve un motore a pagamento (Vocalizer, Acapela). |
| Punto verde sopra Zoom + | È l'avviso di Android che la fotocamera è in uso. Non si può togliere. |
| Per chiudere l'app | Tasto Esci, oppure tasto delle app recenti di Android. |
| Pagina "Tocca per iniziare" inutile | Tolta: la fotocamera parte da sola (28/10/2026). |
| Scritta bianca all'apertura con il nome vecchio "Visore per ipovedenti" | È la schermata di avvio di Android. Si aggiorna da sola in qualche giorno, oppure subito disinstallando e reinstallando l'app. |
| Scritta di Chrome "è a schermo intero, per uscire…" | Tolta: lo schermo intero ora viene dal manifest (`fullscreen`). Serve l'aggiornamento automatico dell'app installata, oppure una reinstallazione. |

## Note

- Tutte le PWA su `forrom58.github.io` (DAISY, Vault, Ipovisore) condividono lo stesso sito: le loro cache devono avere nomi diversi. `sw.js` cancella solo le cache che iniziano con `ipovisore-`.
- Le preferenze (zoom, colori) sono salvate nel telefono; i memo audio pure (IndexedDB). Disinstallare l'app o fare "Cancella e reimposta" cancella i memo.
- La lettura del testo usa Tesseract (OCR in italiano): la prima volta serve internet.
- ADB sul PC: `C:\adb\adb.exe`. Realme via cavo: `2a1247ea`.
