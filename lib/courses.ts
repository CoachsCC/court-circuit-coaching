import { routes } from "@/lib/site";

export type Testimonial = {
  quote: string;
  author: string;
  /** TODO: real member photos — the carousel falls back to a neutral disc. */
  photo: string | null;
};

export type Course = {
  slug: string;
  href: string;
  /** Display name — used in the schedule heading and the eyebrow. */
  name: string;
  /** Hero title, split so the orange segment can be placed freely. */
  hero: { before: string; accent: string; after: string };
  tagline: string;
  image: string;
  imageAlt: string;
  audience: { title: string; forYou: string[]; notForYou: string[] };
  session: {
    title: string;
    /** The 35' block description differs per discipline. */
    mainBlock: string;
    /** Cross training themes sit on a 3-col grid; boxing badges flow inline. */
    badges: string[];
    badgeLayout: "grid" | "flow";
  };
  milestones: { label: string; text: string }[];
  schedule: { day: string; slots: string }[];
  testimonials: Testimonial[];
};

const MILESTONE_LABELS = ["1 séance", "1 mois", "6 mois", "1 an"];

function milestones(texts: string[]) {
  return MILESTONE_LABELS.map((label, i) => ({ label, text: texts[i] }));
}

export const CROSS_TRAINING: Course = {
  slug: "cross-training",
  href: routes.crossTraining,
  name: "Cross Training",
  hero: { before: "Ici, on ", accent: "construit,", after: "on ne pose pas" },
  tagline:
    "Force, cardio et mobilité en 45 min. Un entraînement différent chaque jour, encadré par deux coachs diplômés.",
  image: "/assets/gym-rig.jpg",
  imageAlt: "Groupe en séance de cross training à Court-Circuit",
  audience: {
    title: "Le cross training, pour qui ?",
    forYou: [
      "Tu pars de zéro, ou tu reprends après une pause",
      "Tu veux progresser sans te blesser",
      "Tu aimes varier — jamais deux séances identiques",
      "Tu cherches un cadre, pas juste un plateau libre",
    ],
    notForYou: [
      "Tu cherches de la compétition ou du chrono à tout prix",
      "Tu veux t'entraîner seul, sans coach",
      "Tu cherches un abonnement sans engagement d'assiduité",
    ],
  },
  session: {
    title: "45 min, un circuit différent chaque jour",
    mainBlock: "Un thème différent à chaque séance, jamais deux jours identiques.",
    badges: ["Poids de corps", "Full-body", "Push pull legs", "Leg day", "Jambes & bras", "HIIT"],
    badgeLayout: "grid",
  },
  milestones: milestones([
    "Tu as transpiré, tu as ri, tu sais déjà si ça te correspond.",
    "Les mouvements de base sont acquis. Tu tiens la distance sans t'effondrer.",
    "Force, souffle, posture — un autre corps. Et un groupe qui compte sur toi.",
    "Ce n'est plus une question de corps. Tu ne te demandes plus si tu vas y arriver — tu sais que tu tiens, même dans les jours difficiles.",
  ]),
  schedule: [
    { day: "Lundi", slots: "12h30 · 18h25 · 19h30" },
    { day: "Mardi", slots: "12h20 · 17h25 · 18h25 · 19h30" },
    { day: "Mercredi", slots: "7h30 · 11h15 · 12h35 · 18h25 · 19h30" },
    { day: "Jeudi", slots: "12h20 · 17h25 · 19h30" },
    { day: "Vendredi", slots: "7h30 · 11h15 · 12h30 · 18h25" },
    { day: "Samedi", slots: "10h · 11h" },
  ],
  testimonials: [
    {
      quote:
        "« Je n'avais plus fait de sport depuis 10 ans. La première séance, j'ai cru mourir. Un an après, je fais des tractions que je n'imaginais même pas possibles. »",
      author: "Marc — adhérent depuis 1 an, cross training",
      photo: null,
    },
    {
      quote:
        "« Ce que je retiens, c'est qu'on ne me compare jamais aux autres. Chacun avance à son niveau, dans le même groupe. »",
      author: "Léa — adhérente depuis 6 mois, cross training",
      photo: null,
    },
    {
      quote:
        "« Les coachs adaptent chaque mouvement si besoin. J'ai repris après une blessure au dos sans aucune appréhension. »",
      author: "Yann — adhérent depuis 3 ans, cross training",
      photo: null,
    },
  ],
};

export const CARDIO_BOXING: Course = {
  slug: "cardio-boxing",
  href: routes.cardioBoxing,
  name: "Cardio Boxing",
  hero: { before: "Tape fort,", accent: "respire mieux", after: "" },
  tagline:
    "Frappe, cardio et défoulement en 45 min. Encadré, jamais de combat — juste toi contre ta fatigue.",
  image: "/assets/gym-boxes.jpg",
  imageAlt: "Groupe en séance de cardio boxing à Court-Circuit",
  audience: {
    title: "Le cardio boxing, pour qui ?",
    forYou: [
      "Tu as besoin de te défouler, pas juste de transpirer",
      "Tu veux évacuer la pression de la semaine",
      "Tu cherches du cardio qui ne ressemble pas à du cardio",
      "Tu aimes frapper juste — technique avant tout",
    ],
    notForYou: [
      "Tu cherches du combat ou du sparring",
      "Tu veux de la compétition, pas du défoulement",
      "Tu cherches un abonnement sans engagement d'assiduité",
    ],
  },
  session: {
    title: "45 min, jamais la même séance",
    mainBlock:
      "Un peu de tout à chaque fois — sac, pao, technique, cardio — dans un dosage qui change à chaque séance.",
    badges: ["Sac de frappe", "Pao", "Technique poings/pieds", "Cardio combat", "Gainage"],
    badgeLayout: "flow",
  },
  milestones: milestones([
    "Tu as tapé, tu as ri, et tu es sorti plus léger qu'en entrant.",
    "Tes combinaisons sont plus propres, ton souffle tient sur toute la séance.",
    "La semaine te pèse moins. Tu as trouvé où déposer la pression.",
    "Ce n'est plus une séance de sport. C'est ton sas — celui où tu redeviens toi-même.",
  ]),
  schedule: [
    { day: "Lundi", slots: "19h45" },
    { day: "Mardi", slots: "12h35 · 19h" },
    { day: "Mercredi", slots: "12h20" },
    { day: "Jeudi", slots: "18h25" },
    { day: "Vendredi", slots: "17h25" },
  ],
  testimonials: [
    {
      quote:
        "« Je venais évacuer le stress du boulot. Je ne pensais pas que taper dans un sac pouvait faire autant de bien à la tête. »",
      author: "Sarah — adhérente depuis 8 mois, cardio boxing",
      photo: null,
    },
    {
      quote:
        "« La première fois, je n'osais pas frapper fort. Maintenant c'est mon moment préféré de la semaine. »",
      author: "Nadia — adhérente depuis 1 an, cardio boxing",
      photo: null,
    },
    {
      quote:
        "« Aucun combat, aucune pression — juste du cardio, de la technique, et une bonne fatigue. »",
      author: "Julien — adhérent depuis 4 mois, cardio boxing",
      photo: null,
    },
  ],
};
