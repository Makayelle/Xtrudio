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

Version actuelle : **10**.

### 3. Mettre à jour le catalogue à partir des sources officielles
- Couleurs et codes hexa : fichier officiel de Bambu Studio
  `https://raw.githubusercontent.com/bambulab/BambuStudio/master/resources/profiles/BBL/filament/filaments_color_codes.json`
  (champs `fila_type`, `fila_color_name.en`, `fila_color` ; plusieurs couleurs = dégradé `f:'g:#a,#b'` ou multicolore `f:'m:#a,#b'` ; translucide `f:'t'` ; métallisé `f:'metallic'`).
- Prix indicatifs : store Bambu Lab EU (https://eu.store.bambulab.com), prix d'une bobine à l'unité ramené au kilo, en tenant compte du poids réel de la bobine.
- Chaque nouveau type doit avoir sa fiche dans `SUBTYPE_INFO` et un lien dans `STORE` (recherche du store si pas de page produit connue).
- Mettre à jour `CATALOG_UPDATED`.
- Après une fusion, vérifier par un script que **toutes les entrées existantes sont intactes** (mêmes noms, mêmes `hex`, mêmes `f`).

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

1. `node --check` sur chaque fichier `.js` modifié.
2. Ouvrir la page dans un navigateur à 390 × 844 px : aucune erreur console, aucun débordement horizontal, les trois onglets s'affichent.
3. Si le stock ou les réglages sont touchés : tester avec des données existantes dans le `localStorage` et vérifier qu'elles sont conservées.
4. Monter la version (règle 2).
5. Résumer les changements en français dans la pull request.
