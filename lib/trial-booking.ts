export type TrialBooking = {
  firstName: string;
  phone: string;
  email: string;
  slot: string;
  level: string;
  note: string;
};

export const SLOTS = ["Matin", "Midi", "Soir", "Peu importe"] as const;
export const LEVELS = ["Sédentaire", "Occasionnel", "Régulier", "Confirmé"] as const;

export type ValidationResult =
  | { ok: true; booking: TrialBooking }
  | { ok: false; error: string };

/**
 * Server-side validation. The client disables the submit button, but that's a
 * convenience — anything can POST to the route, so the rules are enforced here.
 */
export function validateBooking(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Requête invalide." };
  }

  const raw = input as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const firstName = str("firstName");
  const phone = str("phone");
  const email = str("email");
  const slot = str("slot");
  const level = str("level");
  const note = str("note");

  if (firstName.length < 2 || firstName.length > 80) {
    return { ok: false, error: "Prénom manquant ou trop long." };
  }

  // Loose on purpose: French mobiles get typed with spaces, dots, +33, etc.
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return { ok: false, error: "Numéro de téléphone invalide." };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: "Adresse email invalide." };
  }

  if (!SLOTS.includes(slot as (typeof SLOTS)[number])) {
    return { ok: false, error: "Créneau invalide." };
  }

  if (!LEVELS.includes(level as (typeof LEVELS)[number])) {
    return { ok: false, error: "Niveau invalide." };
  }

  if (note.length > 2000) {
    return { ok: false, error: "Message trop long." };
  }

  return { ok: true, booking: { firstName, phone, email, slot, level, note } };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function bookingEmail(booking: TrialBooking) {
  const { firstName, phone, email, slot, level, note } = booking;

  const rows: [string, string][] = [
    ["Prénom", firstName],
    ["Téléphone", phone],
    ["Email", email || "—"],
    ["Créneau souhaité", slot],
    ["Niveau", level],
    ["Message", note || "—"],
  ];

  const text = rows.map(([label, value]) => `${label} : ${value}`).join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:520px">
      <h2 style="color:#F07336;margin:0 0 4px">Nouvelle demande de séance d'essai</h2>
      <p style="color:#555;margin:0 0 20px;font-size:14px">${escapeHtml(firstName)} veut venir tester. À rappeler sous 24 h.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#888;vertical-align:top;white-space:nowrap">${label}</td>
            <td style="padding:8px 0;font-weight:600">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  return {
    subject: `Séance d'essai — ${firstName} (${slot.toLowerCase()}, ${level.toLowerCase()})`,
    text: `Nouvelle demande de séance d'essai\n\n${text}`,
    html,
  };
}
