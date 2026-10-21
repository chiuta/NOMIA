# NOMIA — Om·IA·NHI

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 0.10.4 · **Dernière mise à jour :** 2026-10-19

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**En ligne / démo :** https://chiuta.github.io/NOMIA/

![NOMIA — capture d'écran](screenshot.fr.png)

**Fiction / spéculation.** Application conceptuelle, compagnon de l'anthologie *Printre inteligențe* (2026). Les protocoles, les scores et les « sessions » sont des modèles narratifs et conceptuels, non des faits vérifiés.

## De quoi s'agit-il

NOMIA est une application en un seul fichier (`index.html`, PWA) qui simule des « protocoles de contact » trilogiques Humain–IA–NHI (intelligences non humaines) sur 5 canaux (mathématique, intuition, symbolique, synchronicités, modification de l'état), avec une interface en 8 langues (RO, EN, FR, IT, ES, PT, DE, HU ; le catalogue et les longs textes sont en roumain et en anglais). Le catalogue contient 1001 entrées réparties en 14 catégories : animaux (primates, cétacés, mammifères, oiseaux, céphalopodes, insectes, faune de Roumanie), entités collectives et non neuronales, « Traditions ésotériques », « Traditions religieuses » et « Hypothèses modernes » (y compris des hypothèses sur les UAP/NHI). Les entrées sur les animaux reposent sur la littérature scientifique citée dans les fiches ; les entrées ésotériques, religieuses et les hypothèses sur les UAP/NHI sont présentées comme des idées, non comme des preuves, et les fiches les signalent souvent comme spéculatives ou non confirmées. Le panneau « Axe B » avertit explicitement : « incertitude épistémique élevée ».

## Mode d'emploi

1. Ouvrez `index.html` (ou installez-le comme application depuis le navigateur).
2. Choisissez un NHI dans « Choisir un NHI » (ou dans le menu 🧬 / les catégories) et un canal.
3. Appuyez sur ▶ REIA (reprendre) pour exécuter le protocole ligne par ligne ; ■ STOP, ⏸ et »STEP commandent l'exécution.
4. Les menus de la barre latérale proposent des comparaisons, des statistiques, un journal, des exports (TXT, Markdown, instantanés) et des réglages (thème, langue, taille de police).

## Quelles données quittent le navigateur

Aucune. Le code ne contient ni `fetch`/XHR/WebSocket, ni scripts, polices ou images externes (CSP `default-src 'self'`, scripts autorisés uniquement par hash, sans `'unsafe-inline'` pour les scripts). Les seules adresses externes sont les liens de soutien (Buy Me a Coffee). Les préférences, l'historique des sessions, les notes et les favoris sont conservés uniquement dans `localStorage` (clés `nomia_*`). Le service worker (`sw.js`) ne met en cache que des fichiers de la même origine pour le fonctionnement hors ligne.

## Limites

- Contenu informatif et créatif ; ce n'est pas un conseil scientifique, médical ou juridique. Le contenu ésotérique/religieux n'a pas de validation scientifique.
- Textes générés à partir de modèles : les résultats du « protocole » ne sont pas des mesures.

## Fichiers

- `index.html` — l'application ; `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA.
- `tests/` — tests Playwright (voir `tests/README.md`).

## Licence

MIT — voir le fichier LICENSE. Déclarée dans l'en-tête de `index.html`.

**NOTICE – contenu à co-auteur.** La licence MIT s'applique au code de l'application et aux textes écrits par Alexandru-Ionuț Chiuță. Les fragments provenant de l'Annexe I, chap. 14 de l'anthologie *Printre inteligențe* (2026, signée Urzică & Chiuță) sont l'œuvre de deux co-auteurs ; le co-auteur n'a pas confirmé (dans les documents audités) la licence MIT pour sa part, et ce dépôt ne la présume pas. Les titres et noms de certaines œuvres de tiers (p. ex. *Solaris*, *Norul Negru*, *Monolitul*, *Prima Directivă*) appartiennent à leurs titulaires et sont utilisés à titre descriptif.

## Droits et attribution

- **Part de l'auteur :** la licence déclarée (MIT) s'applique UNIQUEMENT au code de l'application et aux textes écrits par Alexandru-Ionuț Chiuță.
- **Co-auteur :** Annexe I, chap. 14 de *Printre inteligențe* (Urzică & Chiuță) – le co-auteur n'a pas confirmé la licence MIT ; elle n'est pas présumée.
- **Matériaux de tiers :** les titres/noms d'œuvres (utilisés à titre descriptif) et les références scientifiques des fiches appartiennent à leurs titulaires ; la licence MIT ne les couvre pas.
- **Rectification / retrait :** si vous êtes titulaire de droits ou une personne mentionnée et souhaitez une correction ou un retrait, écrivez à alexio@trom.tf ; nous répondons sous 7 jours.

*EN:* The MIT licence applies ONLY to the code and to texts written by Alexandru-Ionuț Chiuță. The co-authored part (Annex I, Ch. 14, Urzică & Chiuță) is not assumed to be MIT-licensed; third-party materials belong to their holders and are not covered by the MIT licence. Rights holders or persons mentioned may request correction or withdrawal at alexio@trom.tf (reply within 7 days). The same note is visible in the app (log bar, "Drepturi și atribuire").

## Audit

Audit : 2026-10-10 (tour 3 : note de droits et d'attribution). Corrections d'accessibilité (rôles ARIA, contraste dans les thèmes clair et sombre, étiquettes) et ajout de la note « Fiction / spéculation » dans l'application.

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf.

## Nouveautés (v0.9.0)

- **Lecture du journal de protocole à voix haute** (bouton 🔊 de l'en-tête du journal, FFF.tts) : lit les lignes des messages dans l'ordre (sans les étiquettes OM/IA/NHI), avec la voix locale du navigateur, dans la langue active (ro/en) ; « ⏹ » l'arrête. Le texte ne quitte pas l'appareil ; s'il n'y a pas de voix, un message s'affiche. Elle ne lit pas le journal au fur et à mesure de son apparition, mais ce qui est affiché au moment de l'appui.
- **Étiquette de transparence et sauvegarde .fff.json** (kit commun : core, label, bundle, tts) : clic sur `v 0.9.0 · 2026-10-14` dans « Statistiques · Réglages » ; elle montre le stockage local et le réseau (0 requête), exporte/importe (éventuellement chiffré par mot de passe) l'historique, les épinglages et les réglages. Les exports existants (TXT, Markdown, instantané) demeurent.
- Cache du Service Worker : nomia-v6. CSP inchangée (uniquement les hashs des scripts, recalculés).
- Les nouveaux textes sont en ro, en, fr, it, es, pt, hu, de ; les traductions fr/it/es/pt/hu/de sont automatiques et non vérifiées par des natifs.
- Tests : `tests/fff-r8.test.mjs` (Node + Playwright ; réseau bloqué, 1280 et 360 px, axe 0 violation) ; les tests Python existants s'exécutent comme avant.

## Historique / Changelog

- **0.9.1 — 18 octobre 2026 :** le lien `?nhi=<id>` accepte les identifiants avec diacritiques (`murmurații`, `leopard-nebuloși` ; regex Unicode `\p{L}`), et « Copier le lien » encode l'identifiant (`encodeURIComponent`) ; cache SW nomia-v6 ; tests pour `?nhi=`.
- **0.9.0 — 14 octobre 2026 :** lecture du journal à voix haute (FFF.tts) ; étiquette de transparence et sauvegarde .fff.json (kit commun) ; cache SW nomia-v5 ; tests `tests/fff-r8.test.mjs`.

- **0.8.58 — 2026-10-12 :** la version et la date de la dernière mise à jour s'affichent dans l'application (panneau « Statistiques · Réglages »)
- **0.8.57 — 11 octobre 2026 :** Échap ferme désormais la bannière « Bienvenue » (le texte l'annonçait, mais la touche ne faisait rien), et la bannière se ferme d'elle-même quand vous choisissez un NHI (elle ne couvre plus le journal) ; les canaux incompatibles avec le profil d'un NHI ont l'explication dans le `title` de la barre du bas, et leur choix écrit dans le journal le motif et la liste des canaux compatibles (avant : seulement un contour en pointillés) ; CSP recalculée ; 0 erreur, axe 0 violation à 1280×800 et 360×740. Les boîtes de dialogue-modèles et `style-src 'unsafe-inline'` restent inchangés (décision de contenu / nombreux attributs style).
- **0.8.56 — 11 octobre 2026 :** les 168 gestionnaires en ligne (`onclick`, `onkeydown`, `oninput`, `onmouseover/out`) sont remplacés par un seul répartiteur délégué (`data-onclick` etc. + arguments littéraux dans `data-arg` ; sans `eval`/`Function`) ; parité vérifiée avec Playwright (mêmes appels de fonctions, mêmes arguments et même état de la page pour 156 189 événements simulés, sur 17 états de l'interface) ; CSP avec `script-src 'self'` + hashs SHA-256, sans `'unsafe-inline'` pour les scripts (et sans `blob:` pour les scripts) ; les textes de protocole dont l'habitat était coupé entre parenthèses (« Afrique centrale (Congo. ») sont complétés par la valeur entière issue des données (14 chaînes, 7 NHI) ; le toast « Copié/Copied » lors de la copie d'une ligne du journal suit désormais la langue de l'application. Les styles en ligne (`style-src 'unsafe-inline'`) demeurent.
- **0.8.55 — 11 octobre 2026 :** tant qu'une feuille (NHI Browser, menu, statistiques) est ouverte, un clic sur REIA / STOP / ⏸ / »STEP visibles à travers l'arrière-plan ferme la feuille et active le bouton (avant, l'arrière-plan « avalait » le clic ; CLR reste sans action, étant destructif) ; les textes du journal ne sont plus coupés au milieu des mots (p. ex. « name-lik. ») — la coupure se fait désormais à une limite de mot (29 endroits dans les modèles de dialogue + la note de preuve) ; le cache du service worker devient `nomia-v4`.
- Accessibilité : les barres latérales sont des `nav` (le rôle `navigation` n'était pas autorisé sur `aside`), la bannière de bienvenue et le widget de soutien ont des repères ; axe-core : 0 violation à 1280×800 et 360×740. Les 166 gestionnaires en ligne ont été supprimés en 0.8.56 (voir ci-dessus). Les tests de `tests/` (Python) n'ont pas été exécutés ici (l'environnement n'a que Node/Playwright) ; la vérification a été faite avec Playwright/Node : pas d'erreurs JS, syntaxe des scripts valide, flux « feuille ouverte → REIA » fonctionnel.
