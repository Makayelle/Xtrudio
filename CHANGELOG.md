# Journal des modifications — Xtrudio

Historique des versions de l'application et des choix qui l'ont façonnée.
Le numéro de version est celui du cache (`?v=N` dans `index.html`, `xtrudio-cache-vN` dans `service-worker.js`).
Les entrées les plus récentes sont en haut.

Chaque entrée suit le même modèle :
- **Ajouté / Modifié / Corrigé / Retiré** : ce qui change pour l'utilisateur.
- **Choix** : pourquoi, quand une décision mérite d'être retenue pour la suite.

---

## Outillage — 20/10/2026 (pas de nouvelle version de l'app)
- **Ajouté** : `CHANGELOG.md` (ce fichier), reconstitué depuis l'historique Git pour les versions 1 à 12.
- **Ajouté** : règle 4 du `CLAUDE.md`, qui demande de tenir ce journal à chaque livraison. Le script de test vérifie qu'une entrée existe pour la version en cours.
- **Choix** : on garde une trace du *pourquoi* (lignes « Choix »), pas seulement du *quoi*, pour que les demandes futures restent cohérentes avec les décisions passées.

## Outillage — 17/10/2026 (pas de nouvelle version de l'app)
- **Ajouté** : `tests/check.js`, un script unique qui vérifie le projet : syntaxe, version, intégrité du catalogue, test sur un écran de téléphone avec des données déjà présentes, PDF d'impression. Lancement : `node tests/check.js`.
- **Choix** : un seul script, complété au fil des fonctionnalités, plutôt que des tests réécrits à chaque demande. Il n'ajoute aucune dépendance npm au projet (il utilise Playwright déjà installé). Ses sorties vont dans `tests/out/`, ignoré par git.

## v12 — 17/10/2026 · Impression du stock
- **Corrigé** : à l'impression, une pastille du nuancier ou une ligne de la liste n'est plus coupée entre deux pages. Le titre d'un type reste collé à ses premières couleurs.
- **Modifié** : nuancier imprimé avec des pastilles beaucoup plus grandes (64 px au lieu de 30 px, 6 par ligne) et la quantité affichée en « N bob. ».
- **Modifié** : marges de page réduites (8 mm), mise en page plus compacte.
- **Choix** : l'impression sert aussi à partager un rendu visuel du stock. Elle doit donc rester lisible et propre, même si elle prend un peu plus de pages.

## v11 — 17/10/2026 · Scan
- **Modifié** : à l'association d'un code-barres inconnu, la liste des couleurs est triée par ordre alphabétique.
- **Choix** : seul l'affichage est trié. La valeur de chaque choix reste la position de la couleur dans le catalogue, donc le stock et les codes déjà associés ne changent pas.

## v10 — 17/10/2026 · Réglages
- **Modifié** : nouvel ordre des sections : Électricité → Imprimantes → Types de filaments → Codes-barres associés → Réinitialiser.
- **Choix** : on va du plus général (énergie, machine) au plus détaillé (filaments, codes).

## v9 — 17/10/2026 · Mise en conformité avec le CLAUDE.md
- **Corrigé** : les sections repliables des Réglages ont une marge intérieure, leur contenu ne touche plus les bords.
- **Corrigé** : le favicon reprend exactement le logo de l'en-tête (trait 1,4, point central r = 2,5).
- **Modifié** : couleurs du thème toujours prises dans les variables (`var(--bg)`, `var(--accent)`) au lieu de valeurs en dur.
- **Modifié** : durées du simulateur avec une virgule (« 2,08 h »).
- **Corrigé** : ASA Aero pointe vers sa propre page produit du store EU.
- **Retiré** : `icons/Test.txt`, un fichier resté par erreur.
- **Choix** : à partir de cette version, les modifications passent par une pull request avec un résumé en français. Michou fusionne lui-même.

## Règles du projet — 17/10/2026
- **Ajouté** : `CLAUDE.md`, les instructions du projet : architecture, règles impératives (ne jamais perdre de données, monter la version, catalogue tiré des sources officielles), design « Néon Atelier », vérifications à faire avant de livrer.
- **Choix** : les clés `localStorage` et les noms du catalogue (matière, type, couleur) ne sont **jamais** renommés ni supprimés, car ce sont les clés du stock. On ajoute seulement.

## v8 — 17/10/2026 · Cache
- **Corrigé** : les fichiers CSS et JS sont appelés avec `?v=N`, y compris dans le cache du service worker, pour que le téléphone ne mélange plus anciens et nouveaux fichiers.
- **Modifié** : la section « Filaments » des Réglages devient « Types de filaments ». Le marqueur natif des sections repliables est masqué partout, iOS compris.
- **Choix** : un seul numéro de version, monté à chaque livraison et identique dans tous les fichiers.

## v7 — 17/10/2026 · Réglages repliables
- **Ajouté** : les sections « Filaments » et « Codes-barres associés » se replient, avec un compteur et une recherche de filament.
- **Choix** : la liste des filaments étant devenue longue (39 types), on la replie par défaut. Les sections repliables suivent le style des profils d'imprimante.

## v6 — 17/10/2026 · Filaments du simulateur
- **Ajouté** : 37 filaments supplémentaires dans les réglages du simulateur, avec un prix au kilo tiré du store Bambu Lab EU et une consommation estimée pour la H2S + AMS.
- **Choix** : ajout par une migration unique (`EXTRA_FILAMENTS_V6` + `filVersion`). Elle complète ce qui manque sans écraser les prix déjà modifiés et sans remettre ce que l'utilisateur a supprimé. C'est le modèle à suivre pour toute nouvelle valeur par défaut.

## v5 — 16/10/2026 · Catalogue étendu
- **Ajouté** : le catalogue passe de 16 à 47 types : PLA Lite, Silk+, Tough, Metal, Marble, Galaxy, Wood, Glow, Pure, Aero et Dynamic, PETG Matte et Translucent, TPU 95A, 85A et for AMS, ABS, ABS-GF, PC, PC FR, nylons PA6/PAHT, PET-CF, PPA-CF, PPS-CF, PVA et supports. Chacun a sa fiche info et son lien store.
- **Ajouté** : affichage des dégradés (`g:`), des multicolores (`m:`), des translucides teintés (`t`) et des métallisés.
- **Choix** : couleurs et codes hexa tirés du fichier officiel de Bambu Studio, prix du store EU ramenés au kilo.
- *(La version 4 n'a pas été publiée : passage direct de la v3 à la v5.)*

## v3 — 14/10/2026 · Fiches info et simulateur
- **Ajouté** : bouton ⓘ sur chaque type de filament, qui ouvre une fiche « Usages / Avantages / Inconvénients » avec un lien vers le store.
- **Modifié** : le simulateur affiche les prix de vente conseillés en haut (× 2, × 2,5, × 3) et le coût de revient total en bas.
- **Retiré** : le titre d'onglet dans l'en-tête, déjà visible dans la barre du bas.

## v2 — 13/10/2026 · Refonte « Néon Atelier »
- **Modifié** : refonte complète de l'interface. Elle passe à 3 vues (Stock, Simulateur, Réglages) avec une barre de navigation en bas, en mode sombre néon.
- **Ajouté** : profils d'imprimante multiples. Les réglages (kWh, filaments, imprimantes) sont regroupés dans l'onglet Réglages, le simulateur ne demande que masse, durée, filament et imprimante.
- **Ajouté** : nouvelles icônes (hexagone régulier néon).
- **Choix** : application pensée d'abord pour le téléphone (390 px de large, zones sûres), et logique du simulateur séparée du paramétrage.

## v1 — 12/10/2026 · Première version
- **Ajouté** : gestion du stock de filaments Bambu Lab par couleur, bobines réutilisables, scan de code-barres (réception / sortie) avec association d'un code inconnu, simulateur de coût d'impression, impression de l'état du stock.
- **Ajouté** : PWA installable et utilisable hors ligne (manifest, service worker, icônes).
- **Choix** : site 100 % statique hébergé sur GitHub Pages, sans framework, sans build, sans backend, avec les données stockées dans le `localStorage` du téléphone. Le premier fichier unique `index.html` a été découpé en `index.html`, `style.css`, `catalog.js` et `app.js`.
