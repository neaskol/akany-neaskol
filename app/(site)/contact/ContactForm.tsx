'use client'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { sendContactMessage } from './actions'

export default function ContactForm() {
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [sentName, setSentName] = useState('')
  const searchParams = useSearchParams()

  // Pré-remplissage du sujet depuis le query param ?sujet=...
  const prefilledSubject = searchParams.get('sujet') ?? ''

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    setSentName(name)
    startTransition(async () => {
      const result = await sendContactMessage(data)
      if (result.ok) {
        setStatus('success')
        setErrorMsg('')
        // On ne reset pas automatiquement — l'utilisateur peut relire son message
      } else {
        setStatus('error')
        setErrorMsg(result.error ?? 'Une erreur est survenue.')
      }
    })
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="display h-fluid-48" style={{ color: 'var(--ink-900)', marginBottom: 8 }}>
          Message <span className="it">envoyé.</span>
        </h2>
        <div
          role="status"
          aria-live="polite"
          style={{
            background: 'var(--lemon-100)',
            border: '1px solid var(--lemon-500)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 28px',
          }}
        >
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink-900)', marginBottom: 8 }}>
            Merci{sentName ? `, ${sentName}` : ''} !
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            Votre message a bien été envoyé. Nous vous répondrons dans les 48h.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ alignSelf: 'flex-start', color: 'var(--ink-900)', borderColor: 'var(--ink-900)' }}
          onClick={() => { setStatus('idle'); setSentName(''); setErrorMsg('') }}
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={pending} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 className="display h-fluid-48" style={{ color: 'var(--ink-900)', marginBottom: 8 }}>
        Écrire un <span className="it">message.</span>
      </h2>
      <p className="sr-only">Les champs marqués d&rsquo;un * sont obligatoires.</p>

      <Field
        label="Votre nom"
        name="name"
        required
        placeholder="Hasina Rakoto"
        autoComplete="name"
      />
      <Field
        label="Votre email"
        name="email"
        type="email"
        required
        placeholder="hasina@example.com"
        autoComplete="email"
      />
      <Field
        label="Sujet"
        name="subject"
        placeholder="Rejoindre l'association, partenariat…"
        defaultValue={prefilledSubject}
        autoComplete="off"
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        required
        placeholder="Votre message…"
        rows={6}
        autoComplete="off"
      />

      {/* Honeypot anti-spam — champ caché, ne pas remplir */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        aria-hidden
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
      />

      {status === 'error' && (
        <div
          role="alert"
          style={{
            background: 'var(--flame-100)',
            border: '1px solid var(--flame-500)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'var(--ink-700)',
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-flame"
        style={{ alignSelf: 'flex-start', opacity: pending ? 0.6 : 1 }}
      >
        {pending ? 'Envoi…' : 'Envoyer'}
        <span className="arrow">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </form>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  as?: 'input' | 'textarea'
  rows?: number
  defaultValue?: string
  autoComplete?: string
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  as = 'input',
  rows,
  defaultValue,
  autoComplete,
}: FieldProps) {
  const id = `contact-${name}`
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--sans)',
    fontSize: 15,
    color: 'var(--ink-900)',
    background: 'var(--cream-300)',
    resize: as === 'textarea' ? 'vertical' : undefined,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        htmlFor={id}
        style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-500)' }}
      >
        {label}{required && <><span aria-hidden="true" style={{ color: 'var(--flame-500)', marginLeft: 4 }}>*</span><span className="sr-only"> (obligatoire)</span></>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          autoComplete={autoComplete}
          style={inputStyle}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          style={inputStyle}
        />
      )}
    </div>
  )
}
