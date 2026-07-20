import { SectionHeading } from "@/components/SectionHeading";

const QUESTIONS = [
  {
    q: "Que comprend l'abonnement ?",
    a: "L'accès aux séances selon ta formule (1×, 2× par semaine ou illimité), sur le cross training comme le cardio boxing, avec le suivi des deux coachs. Aucun supplément : matériel, vestiaires et douches inclus.",
  },
  {
    q: "Je peux changer de formule ?",
    a: "Oui, à tout moment. Tu montes ou descends de formule d'un mois sur l'autre, sans frais. On ajuste avec toi selon ton rythme et tes objectifs.",
  },
  {
    q: "Comment fonctionne la résiliation ?",
    a: "Sur les formules sans engagement, tu arrêtes quand tu veux avec un simple préavis d'un mois. Sur les formules 3, 6 ou 12 mois, l'engagement court jusqu'à son terme — à la fin du contrat, on te recontacte pour savoir si tu souhaites continuer ou non, sans reconduction automatique.",
  },
  {
    q: "Y a-t-il des frais d'inscription ?",
    a: "Non. Zéro frais d'inscription, zéro frais de dossier. Tu paies ta formule, c'est tout.",
  },
];

export function Faq() {
  return (
    <section className="pad faq pt-[34px] pb-3">
      <SectionHeading eyebrow="Questions fréquentes" title="Tout est clair" className="mb-4" />
      {QUESTIONS.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <span className="plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="text-justify">{item.a}</p>
        </details>
      ))}
    </section>
  );
}
