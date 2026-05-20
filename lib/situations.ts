export type Situation = {
  slug: string;
  icon: string;
  label: string;
  sub: string;
  color: string;
  bg: string;
  badge?: { text: string; type: "aides" | "new" };
};

export const SITUATIONS: Situation[] = [
  {
    slug: "bebe",
    icon: "👶",
    label: "Avoir un bébé",
    sub: "CAF, congés, aides",
    color: "#3B82F6",
    bg: "#EFF6FF",
    badge: { text: "8 aides", type: "aides" },
  },
  {
    slug: "mariage",
    icon: "💍",
    label: "Se marier / Pacser",
    sub: "Mairie, notaire, CAF",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    slug: "demenagement",
    icon: "🏠",
    label: "Déménager",
    sub: "APL, adresse, EDF",
    color: "#F59E0B",
    bg: "#FFFBEB",
    badge: { text: "Nouveau", type: "new" },
  },
  {
    slug: "perdre-emploi",
    icon: "💼",
    label: "Perdre mon emploi",
    sub: "Chômage, ARE, droits",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    slug: "creer-entreprise",
    icon: "🚀",
    label: "Créer mon entreprise",
    sub: "SIREN, statuts, aides",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    badge: { text: "5 aides", type: "aides" },
  },
  {
    slug: "etudier",
    icon: "🎓",
    label: "Étudier",
    sub: "Bourses, logement, APL",
    color: "#06B6D4",
    bg: "#ECFEFF",
    badge: { text: "3 aides", type: "aides" },
  },
  {
    slug: "retraite",
    icon: "🏖️",
    label: "Partir en retraite",
    sub: "Simulation, dossier",
    color: "#F97316",
    bg: "#FFF7ED",
  },
  {
    slug: "acheter-logement",
    icon: "🔑",
    label: "Acheter un logement",
    sub: "PTZ, notaire, prêts",
    color: "#64748B",
    bg: "#F8FAFC",
    badge: { text: "4 aides", type: "aides" },
  },
  {
    slug: "maladie",
    icon: "🏥",
    label: "Tomber malade",
    sub: "Arrêt, IJ, CSS",
    color: "#EC4899",
    bg: "#FDF2F8",
  },
  {
    slug: "renover",
    icon: "🔨",
    label: "Rénover mon logement",
    sub: "MaPrimeRénov', CEE",
    color: "#14B8A6",
    bg: "#F0FDFA",
    badge: { text: "6 aides", type: "aides" },
  },
  {
    slug: "titre-sejour",
    icon: "🌍",
    label: "Titre de séjour",
    sub: "Visa, carte résident",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    slug: "handicap",
    icon: "♿",
    label: "Handicap & RQTH",
    sub: "AAH, MDPH, aides",
    color: "#7C3AED",
    bg: "#EDE9FE",
    badge: { text: "9 aides", type: "aides" },
  },
];

export const FREQUENT = [
  { icon: "🪪", title: "Renouveler sa CNI", sub: "Carte nationale d'identité", bg: "#EFF6FF" },
  { icon: "🛂", title: "Passeport", sub: "Demande ou renouvellement", bg: "#ECFDF5" },
  { icon: "📋", title: "Extrait casier judiciaire", sub: "Bulletin n°3 en ligne", bg: "#FFF7ED" },
  { icon: "🎫", title: "Permis de conduire", sub: "Points, perte, échange", bg: "#FDF2F8" },
];
