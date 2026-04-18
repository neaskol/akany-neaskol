'use server'

import { Resend } from 'resend'
import { getPayloadClient, withTimeout } from '@/lib/payload'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactMessage(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  // Honeypot anti-spam
  const honeypot = String(formData.get('_hp') ?? '')
  if (honeypot) return { ok: false, error: 'Formulaire invalide.' }

  if (!name || !email || !message) {
    return { ok: false, error: 'Nom, email et message sont obligatoires.' }
  }

  // Regex basique — Payload valide plus finement
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Adresse email invalide.' }
  }

  // Stocker dans Payload (inbox admin)
  let saved = false
  try {
    const payload = await getPayloadClient()
    await withTimeout(
      payload.create({
        collection: 'contact-submissions',
        data: { name, email, subject, message },
      }),
      5000,
      'payload:create-contact-submission',
    )
    saved = true
  } catch (err) {
    console.error('[contact] Payload save error:', err)
  }

  // Envoyer un email de notification
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim()
  let emailed = false

  if (process.env.RESEND_API_KEY && toEmail) {
    try {
      await withTimeout(
        resend.emails.send({
          from: 'Akany Neaskol <contact@akany-neaskol.org>',
          to: toEmail,
          replyTo: email,
          subject: subject ? `[Neaskol] ${subject}` : `[Neaskol] Message de ${name}`,
          text: `Nouveau message de ${name} (${email})\n\n${message}`,
        }),
        5000,
        'resend:contact-email',
      )
      emailed = true
    } catch (err) {
      console.error('[contact] Resend error:', err)
    }
  }

  if (saved || emailed) {
    return { ok: true }
  }

  if (!process.env.RESEND_API_KEY || !toEmail) {
    return {
      ok: false,
      error: "Le message n'a pas pu être transmis. Vérifiez la configuration du formulaire.",
    }
  }

  return { ok: false, error: "Le message n'a pas pu être transmis. Merci de réessayer." }
}
