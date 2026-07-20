/**
 * Monthly prices per commitment tier. Source of truth for the Tarifs page and
 * the home-page preview — update here when the club changes its rates.
 *
 * `oncePerWeek` is null where the formula isn't offered: the 1×/semaine plan
 * only exists on the 1-year and 6-month commitments.
 */
export type Engagement = {
  id: string;
  label: string;
  oncePerWeek: number | null;
  twicePerWeek: number;
  unlimited: number;
  /** Line shown under the toggle. */
  saving: string;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    id: "1-an",
    label: "1 an",
    oncePerWeek: 44,
    twicePerWeek: 79,
    unlimited: 96,
    saving: "Le meilleur prix — jusqu'à 48€/mois d'économie",
  },
  {
    id: "3-mois",
    label: "3 mois",
    oncePerWeek: null,
    twicePerWeek: 99,
    unlimited: 124,
    saving: "Jusqu'à 20€/mois d'économie",
  },
  {
    id: "6-mois",
    label: "6 mois",
    oncePerWeek: 50,
    twicePerWeek: 89,
    unlimited: 112,
    saving: "Jusqu'à 6€/mois d'économie",
  },
  {
    id: "sans-engagement",
    label: "Sans engagement",
    oncePerWeek: null,
    twicePerWeek: 109,
    unlimited: 144,
    saving: "Le tarif le plus souple, arrête quand tu veux",
  },
];

export const PAY_AS_YOU_GO = {
  single: 20,
  pack: 150,
  packSize: 10,
  validity: "valable 6 mois",
} as const;
