# Court-Circuit — site vitrine

Site de la salle Court-Circuit à Saint-Herblain. Next.js (App Router) + Tailwind,
déployé sur Vercel.

```bash
npm install
cp .env.example .env.local   # puis remplir
npm run dev
```

## Intégrations externes

Chacune se dégrade proprement : si l'appel échoue, la section concernée disparaît
ou retombe sur des valeurs statiques, plutôt que d'afficher des données inventées.

| Intégration | Variables | Sans configuration |
| --- | --- | --- |
| Avis Google (Places API) | `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Note et total statiques, pas de lien vers la fiche |
| Feed Instagram | `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID` | Section masquée |
| Formulaire d'essai (Resend) | `RESEND_API_KEY`, `TRIAL_FROM_EMAIL`, `TRIAL_TO_EMAIL` | Erreur affichée + numéro de téléphone |

## Cron : renouvellement du jeton Instagram

Le jeton Instagram longue durée **expire au bout de 60 jours**. Passé ce délai, le
feed disparaît du site sans autre signal qu'une ligne de log. La route
`/api/cron/refresh-instagram-token` le renouvelle et écrit la nouvelle valeur
dans les variables d'environnement Vercel du projet.

### Fréquence

`vercel.json` la déclenche **le 1er et le 15 de chaque mois**, pas tous les
45 jours. Deux raisons :

- une expression cron ne sait pas exprimer « tous les 45 jours » ; la maille est
  le jour du mois. `0 4 1 */2 *` (tous les deux mois) donnerait 59 à 62 jours
  d'écart — au-delà de la fenêtre de validité une fois sur deux ;
- surtout, un passage tous les 15 jours laisse **trois occasions de rattrapage**
  avant l'échéance. Un renouvellement calé pile sur 45 jours n'en laisse aucune :
  une seule exécution ratée et le jeton meurt.

Chaque renouvellement réussi repart pour 60 jours. Repasser plus souvent ne coûte
rien — sauf à descendre sous 24 h, délai en dessous duquel Instagram refuse de
rafraîchir un jeton.

### Variables nécessaires

À créer dans **Settings → Environment Variables** du projet Vercel, sur les cibles
*Production* **et** *Preview*.

| Variable | Où la trouver |
| --- | --- |
| `CRON_SECRET` | À générer : `openssl rand -hex 32`. Vercel l'envoie automatiquement en `Authorization: Bearer` sur les appels de cron. |
| `VERCEL_API_TOKEN` | vercel.com/account/tokens → *Create Token*. Portée : **la seule équipe du projet**, pas « all teams ». |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` après `vercel link`, ou Settings → General. |
| `VERCEL_TEAM_ID` | Idem (`orgId`), ou Settings → General de l'équipe. |
| `VERCEL_DEPLOY_HOOK_URL` | Settings → Git → *Deploy Hooks*, sur la branche de production. |

### Pourquoi le Deploy Hook n'est pas optionnel

**Vercel fige les variables d'environnement au moment du build.** Écrire un
nouveau jeton via l'API ne change rien au déploiement en cours : il continue
d'utiliser l'ancien jusqu'à son expiration.

Sans `VERCEL_DEPLOY_HOOK_URL`, le cron s'exécute, réussit, écrit la valeur — et le
feed tombe quand même au bout de 60 jours. La route journalise un avertissement
explicite dans ce cas, mais elle ne peut pas s'en passer à votre place.

### Permissions

Le jeton Vercel sert **uniquement** à modifier `INSTAGRAM_ACCESS_TOKEN` sur ce
projet. Vercel ne propose pas de portée plus fine que l'équipe : ce jeton peut
donc, techniquement, agir sur tous les projets de l'équipe. Deux conséquences :

- ne jamais le créer avec la portée « all teams » ;
- le révoquer et le régénérer au moindre doute. Le site continue de fonctionner
  sans lui — seul le renouvellement automatique s'arrête.

### Vérifier que ça marche

La route refuse tout appel sans le bon `CRON_SECRET` et répond alors `404`, pour
ne pas confirmer son existence. Pour un test manuel :

```bash
curl -i -H "Authorization: Bearer $CRON_SECRET" \
  https://<domaine>/api/cron/refresh-instagram-token
```

Réponse attendue :

```json
{ "ok": true, "expiresInDays": 60, "targets": ["production", "preview"], "redeployed": true }
```

Le jeton lui-même n'apparaît ni dans la réponse ni dans les logs.

⚠️ **Ne pas enchaîner deux appels manuels** : Instagram refuse de rafraîchir un
jeton de moins de 24 heures, le second échouera en HTTP 502.

## Secrets

`.env.local` est ignoré par git et ne doit jamais être committé. Aucune valeur
réelle ne figure dans ce dépôt — `.env.example` ne contient que des clés vides.
