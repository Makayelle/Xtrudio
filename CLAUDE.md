# Xtrudio — instructions pour Claude Code

Xtrudio est une petite PWA personnelle de **gestion de stock de filaments Bambu Lab** et de **simulation du coût d'impression 3D** (imprimante Bambu Lab H2S + AMS 2 Pro).
Elle est hébergée sur **GitHub Pages** : https://makayelle.github.io/Xtrudio/ et s'utilise surtout **sur téléphone**, installée comme une app.

L'utilisateur s'appelle Michou. Réponds-lui **en français**, simplement : ce qui a changé, ce qu'il doit vérifier.

## Architecture

Site 100 % statique : HTML, CSS et JavaScript « vanilla », **sans framework, sans build, sans backend, sans dépendance npm**. Les données sont stockées dans le `localStorage` du navigateur.

| Fichier | Rôle |
|---|---|
| `index.html` | Structure : en-tête, 3 vues (Stock, Simulateur, Réglages), barre de navigation en bas, écran de scan, fiche info |
| `style.css` | Tout le design (style « Néon Atelier ») |
| `catalog.js` | Données : `CATALOG_UPDATED`, `STORE` (liens store), `CATALOG` (matières → types → couleurs), `SUBTYPE_INFO` (fiches usages / avantages / inconvénients) |
| `app.js` | Toute la logique : navigation, stock, simulateur, réglages, scan code-barres |
| `service-worker.js` | Cache hors-ligne (stale-while-revalidate) |
| `manifest.json` | PWA installable |
| `icons/` | Icônes de l'app (hexagone régulier néon) |
| `CHANGELOG.md` | Journal des versions et des choix de l'application (voir règle 4) |
| `tests/check.js` | Script de vérification unique (voir « Avant de proposer une modification ») — ne fait pas partie de l'app |

## Règles impératives

### 1. Ne jamais faire perdre de données à l'utilisateur
Ces clés `localStorage` contiennent son stock et ses réglages. **Ne jamais les renommer ni changer leur format** :
- `q_${mat}_${sub}_${name}` (espaces remplacés par `_`) : quantité de bobines par couleur
- `spool_count` : bobines réutilisables
- `barcodeMap` : associations code-barres → `{mat, sub, name}`
- `xtrudio_settings_v1` : réglages (kWh, filaments, imprimantes, dernière simulation)
- `xtrudio_ui_v1` : préférences d'affichage

Conséquence : dans `CATALOG`, **ne jamais renommer ni supprimer** une matière (`mat`), un type (`name`) ou une couleur (`n`), car ces noms font partie des clés de stock. On **ajoute** seulement. Si une entrée semble fausse, le signaler à Michou au lieu de la modifier.

Pour ajouter des valeurs par défaut aux réglages, suivre le modèle existant (`EXTRA_FILAMENTS_V6` + `filVersion` dans `loadSettings`) : migration une seule fois, en ajoutant les éléments manquants, **sans écraser** les valeurs déjà réglées par l'utilisateur et sans remettre ce qu'il a supprimé.

### 2. Monter la version à chaque modification
Sinon le téléphone mélange anciens et nouveaux fichiers en cache. À chaque changement livré, incrémenter **le même numéro** partout :
- dans `index.html` : `style.css?v=N`, `catalog.js?v=N`, `app.js?v=N`
- dans `service-worker.js` : `CACHE_NAME = 'xtrudio-cache-vN'` et les mêmes `?v=N` dans `APP_SHELL`

Version actuelle : **13**.

### 3. Mettre à jour le catalogue à partir des sources officielles
- Couleurs et codes hexa : fichier officiel de Bambu Studio
  `https://raw.githubusercontent.com/bambulab/BambuStudio/master/resources/profiles/BBL/filament/filaments_color_codes.json`
  (champs `fila_type`, `fila_color_name.en`, `fila_color` ; plusieurs couleurs = dégradé `f:'g:#a,#b'` ou multicolore `f:'m:#a,#b'` ; translucide `f:'t'` ; métallisé `f:'metallic'`).
- Prix indicatifs : store Bambu Lab EU (https://eu.store.bambulab.com), prix d'une bobine à l'unité ramené au kilo, en tenant compte du poids réel de la bobine.
- Chaque nouveau type doit avoir sa fiche dans `SUBTYPE_INFO` et un lien dans `STORE` (recherche du store si pas de page produit connue).
- Mettre à jour `CATALOG_UPDATED`.
- Après une fusion, vérifier que **toutes les entrées existantes sont intactes** (mêmes noms, mêmes `hex`, mêmes `f`) : c'est fait par `node tests/check.js`.

### 4. Tenir le journal `CHANGELOG.md`
À chaque livraison, ajouter une entrée **en haut** du fichier, en français simple :
- titre `## vN — JJ/MM/AAAA · sujet` (même N que la règle 2) ; pour un changement sans nouvelle version (outillage, documentation) : `## Outillage — JJ/MM/AAAA (pas de nouvelle version de l'app)` ;
- lignes **Ajouté / Modifié / Corrigé / Retiré** pour ce qui change côté utilisateur ;
- ligne **Choix** quand une décision doit guider les demandes futures (pourquoi on a fait ainsi, ce qu'il ne faut pas défaire).

Avant de proposer une évolution, relire les lignes **Choix** pour rester cohérent avec les décisions passées.

## Design « Néon Atelier »

- Mode sombre uniquement. Utiliser les variables de `:root` (`--bg`, `--s1/2/3`, `--accent` vert néon `#c8f03a`, `--a2` orange, `--a3` cyan, `--a4` violet, `--danger`…), jamais de couleurs en dur quand une variable existe.
- Coins arrondis (`--r-sm/md/lg`, `--pill`), halos lumineux discrets (`--glow*`) sur les éléments actifs.
- Polices : **Syne** pour les titres et noms, **Space Mono** pour les libellés, chiffres et petits textes en majuscules.
- **Mobile d'abord** : tout doit tenir sur un écran de **390 px de large sans défilement horizontal** (`document.documentElement.scrollWidth` doit rester égal à la largeur). Prendre en compte les zones sûres (`env(safe-area-inset-*)`).
- En-tête : logo + nom uniquement (pas de titre d'onglet, déjà visible dans la barre du bas). Le bouton 🖨️ n'apparaît que dans l'onglet Stock.
- Barre de navigation en bas : 📦 Stock, 💶 Simulateur, ⚙️ Réglages.
- Sections repliables : même style que les profils d'imprimante (titre en petites capitales, compteur discret, petite flèche estompée à droite, marqueur natif masqué y compris sur iOS).
- Logo : hexagone **régulier** (`M11 3L17.93 7V15L11 19L4.07 15V7Z`, viewBox 22×22, point central r = 2,5).
- Textes de l'interface en français.

## Fonctionnement à connaître

- **Simulateur** : coût = filament (masse × €/kg) + électricité (watts du filament × durée × tarif kWh) + buse (coût / durée de vie, version « abrasif » si le filament est abrasif) + plateau (coût / nombre d'impressions) + filtre + maintenance + amortissement (coût machine / (heures par an × années)). Prix de vente affichés en haut (× 2, × 2,5, × 3), coût de revient total en bas.
- **Profils d'imprimante** multiples, définis dans Réglages ; le simulateur ne demande que masse, durée, filament et imprimante.
- **Scan** : `BarcodeDetector` + caméra arrière ; ne fonctionne que sur Chrome Android et en HTTPS (donc sur GitHub Pages, pas en local). Un code inconnu est associé une fois à une référence, puis reconnu automatiquement.
- **Impression** : imprime l'état du stock selon les filtres actifs, avec la date.

## Avant de proposer une modification

**Ne pas réécrire de tests à chaque demande : lancer le script du projet.**

```bash
node tests/check.js            # tout : statique + navigateur 390 × 844 + PDF d'impression (~5 s)
node tests/check.js --static   # sans navigateur (syntaxe, version, catalogue)
node tests/check.js --base REF # référence de comparaison (défaut : origin/main, faire `git fetch` avant)
```

Il vérifie, et sort en erreur (code 1) au moindre problème :
1. **Syntaxe** : `node --check` sur tous les `.js`.
2. **Version** (règles 2 et 4) : même numéro dans `index.html`, `service-worker.js` et ce fichier ; numéro monté si un fichier de l'app a changé par rapport à `origin/main` ; entrée `## vN` présente dans `CHANGELOG.md`.
3. **Catalogue** (règles 1 et 3) : chaque type a son lien `STORE` et sa fiche `SUBTYPE_INFO`, hex et finitions `f` valides, pas de doublon ni de collision de clé de stock ; **aucune entrée de `origin/main` supprimée, renommée ou modifiée**.
4. **Navigateur** (Playwright global + Chromium de l'environnement, serveur local intégré) avec des données « existantes » dans le `localStorage` : les 3 onglets s'affichent sans débordement horizontal, bouton 🖨️ seulement dans Stock, nuancier, fiche info, association d'un code-barres (couleurs triées, bobine comptée), **stock et réglages conservés** après migration, aucune erreur console, PDF A4 du nuancier et de la liste sans élément coupé entre deux pages.

Captures (`stock.png`, `sim.png`, `settings.png`, `swatch.png`) et PDF (`print-swatch.pdf`, `print-list.pdf`) sont écrits dans `tests/out/` (ignoré par git) : les regarder seulement si le changement est visuel.

Quand une nouvelle fonctionnalité est ajoutée, **compléter `tests/check.js`** avec son contrôle plutôt que d'écrire un test jetable.

Ensuite :
- Monter la version (règle 2) si un fichier de l'app a changé — `tests/`, `CLAUDE.md`, `CHANGELOG.md` et `.gitignore` seuls n'en ont pas besoin.
- Ajouter l'entrée correspondante dans `CHANGELOG.md` (règle 4).
- Résumer les changements en français dans la pull request, en indiquant le résultat du script.
