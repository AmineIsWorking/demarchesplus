# Démarches+ 🇫🇷

> Toutes les démarches administratives françaises et leurs aides, simplifiées par l'IA.

Un MVP qui agrège les démarches françaises avec une UX type **iLovePDF** (situation de vie → clic → résultat) et un chatbot IA multilingue qui guide l'utilisateur.

---

## ✨ Ce que fait le MVP

- 🎯 **Grille de situations de vie** - "j'ai eu un bébé", "je déménage", "je perds mon emploi"... pas des catégories administratives obscures
- 💡 **Mise en avant des aides** - chaque tuile indique le nombre d'aides potentielles (CAF, MaPrimeRénov', AAH...)
- 🤖 **Chatbot IA multilingue** propulsé par Claude - détecte automatiquement la langue de l'utilisateur (arabe, anglais, espagnol, chinois...) et répond dans cette langue
- 🔒 **Clé API protégée côté serveur** - pas d'exposition de secrets dans le frontend
- 📱 **Responsive** - pensé mobile-first

---

## 🚀 Démarrage rapide

### 1. Cloner & installer

```bash
git clone <ton-repo-url> demarches-plus
cd demarches-plus
npm install
```

### 2. Configurer la clé API

```bash
cp .env.example .env.local
```

Édite `.env.local` et ajoute ta clé Anthropic :

```env
ANTHROPIC_API_KEY=sk-ant-...
```

> 🔑 Récupère ta clé sur [console.anthropic.com](https://console.anthropic.com/settings/keys)

### 3. Lancer en dev

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) - le chatbot est en bas à droite.

---

## 🏗️ Architecture

```
demarches-plus/
├── app/
│   ├── layout.tsx              # Layout racine + SEO
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles globaux + Tailwind
│   └── api/
│       └── chat/
│           └── route.ts        # 🔒 API route serveur → Anthropic
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx                # Headline + search bar
│   ├── SituationsGrid.tsx      # Tuiles iLovePDF-style
│   ├── AideStrip.tsx           # CTA "Bilan d'aides"
│   ├── FrequentSection.tsx     # CNI, passeport, etc.
│   └── ChatBot.tsx             # 💬 Chatbot multilingue
├── lib/
│   ├── system-prompt.ts        # 🧠 Cerveau de l'IA - à itérer
│   └── situations.ts           # Données des tuiles (facile à enrichir)
└── .env.example                # Template config
```

### Le flow chatbot

```
User (frontend)
    ↓ POST /api/chat avec historique
Next.js API route (serveur)
    ↓ utilise ANTHROPIC_API_KEY (jamais exposée au client)
Anthropic API (Claude Sonnet 4.5)
    ↓ réponse avec system prompt enrichi
User (UI mise à jour)
```

---

## 🛣️ Roadmap technique (post-MVP)

Le MVP actuel pose les fondations. Voici ce qu'il reste à brancher pour atteindre la vision complète :

### Phase 2 - Pipeline RAG

- [ ] **Scraping automatisé** des sources officielles via **n8n** (cron quotidien)
  - service-public.fr
  - caf.fr
  - ameli.fr
  - impots.gouv.fr
  - legifrance.gouv.fr
- [ ] **Chunking + embeddings** (OpenAI `text-embedding-3-small` ou Mistral)
- [ ] **Base vectorielle** : Qdrant Cloud ou Supabase `pgvector`
- [ ] **Retrieval contextuel** : injecter les 3-5 chunks pertinents dans le system prompt avant l'appel Claude

### Phase 3 - Personnalisation

- [ ] Auth via Clerk ou Supabase
- [ ] Profil citoyen (situation familiale, revenus, logement) → personnaliser les réponses
- [ ] Bilan d'éligibilité automatique sur toutes les aides
- [ ] Historique des démarches en cours
- [ ] Rappels et alertes (renouvellement CNI, échéances fiscales...)

### Phase 4 - Pages démarches

- [ ] Page wizard par situation (ex : `/situations/bebe` → étapes 1-2-3)
- [ ] Formulaires CERFA pré-remplis exportables PDF
- [ ] Tracking de la progression de chaque démarche

### Phase 5 - Streaming

- [ ] Passer les réponses chatbot en **streaming SSE** pour une UX plus réactive
- [ ] Voir [Anthropic streaming docs](https://docs.claude.com/en/api/streaming)

---

## ⚙️ Stack technique

| Couche | Tech |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Langage | **TypeScript** |
| Styling | **Tailwind CSS** |
| IA | **Anthropic Claude Sonnet 4.5** via SDK officiel |
| Déploiement (recommandé) | Vercel |
| Backend automation (futur) | n8n |
| Vector DB (futur) | Qdrant ou Supabase pgvector |

---

## 🔐 Sécurité

- ✅ La clé API Anthropic **n'est jamais exposée au navigateur**
- ✅ Le frontend appelle `/api/chat` (route Next.js côté serveur)
- ✅ `.env.local` est dans `.gitignore` - aucun secret committé
- ⚠️ **À ajouter en prod** : rate limiting (ex: Upstash), validation Zod côté API, auth

---

## 📝 Comment customiser

### Ajouter une situation de vie

Édite `lib/situations.ts` et ajoute un objet :

```ts
{
  slug: "voyage-etranger",
  icon: "✈️",
  label: "Voyager à l'étranger",
  sub: "Passeport, visa, santé",
  color: "#F59E0B",
  bg: "#FFFBEB",
}
```

### Modifier le comportement du chatbot

Tout est dans `lib/system-prompt.ts`. Le prompt est conçu pour évoluer vers un RAG (les chunks pertinents seront injectés en bas du prompt).

### Changer de modèle Claude

Dans `.env.local` :

```env
ANTHROPIC_MODEL=claude-opus-4-7        # qualité max
ANTHROPIC_MODEL=claude-sonnet-4-5      # équilibre (défaut)
ANTHROPIC_MODEL=claude-haiku-4-5       # rapide et économique
```

---

## 🤝 Contribuer

Ce repo est un MVP - open aux idées et PRs.

Ouvre une issue pour discuter des changements majeurs avant de coder.

---

## 📄 Licence

MIT - fais-en ce que tu veux.

---

**Démarches+ n'est pas un service officiel de l'État français. C'est un outil tiers qui agrège des informations publiques pour les rendre plus accessibles.**
