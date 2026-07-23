import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { bookingEmail, validateBooking } from "@/lib/trial-booking";

export async function POST(request: Request) {
  // Anti-spam : 5 demandes / 10 min / IP. Une vraie personne n'en envoie qu'une ;
  // au-delà, on protège la boîte du club et le quota Resend d'un envoi en boucle.
  const limited = rateLimit(clientIp(request), { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessaie dans quelques minutes ou appelle-nous." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const result = validateBooking(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TRIAL_TO_EMAIL;
  const from = process.env.TRIAL_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Fail loudly rather than showing a confirmation for a lead nobody received.
    console.error(
      "[trial-booking] Envoi impossible : RESEND_API_KEY / TRIAL_TO_EMAIL / TRIAL_FROM_EMAIL manquants.",
      result.booking,
    );
    return NextResponse.json(
      { error: "L'envoi n'est pas configuré. Appelle-nous directement." },
      { status: 500 },
    );
  }

  // Stopgap guard: leads are meant to reach the club's own inbox. Anything else
  // is a temporary workaround that must not survive into production unnoticed.
  const CLUB_INBOX = "court.circuit.coaching@gmail.com";
  if (to !== CLUB_INBOX) {
    console.warn(
      `[trial-booking] ⚠️ DÉPANNAGE : les demandes partent vers ${to} au lieu de ${CLUB_INBOX}. ` +
        "Vérifier le domaine sur resend.com/domains puis rétablir TRIAL_TO_EMAIL.",
    );
  }

  const { subject, text, html } = bookingEmail(result.booking);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: `Court-Circuit <${from}>`,
      to: [to],
      subject,
      text,
      html,
      // Coaches reply straight to the prospect when they left an email.
      ...(result.booking.email ? { replyTo: result.booking.email } : {}),
    });

    if (error) {
      // The lead is in the logs at least — it must not vanish silently.
      console.error("[trial-booking] Resend a refusé l'envoi :", error, result.booking);
      return NextResponse.json({ error: "L'envoi a échoué." }, { status: 502 });
    }

    console.info("[trial-booking] Demande transmise :", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[trial-booking] Erreur réseau vers Resend :", err, result.booking);
    return NextResponse.json({ error: "L'envoi a échoué." }, { status: 502 });
  }
}
