'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.errors?.[0]?.message || 'Email ou mot de passe incorrect.')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="na-login-wrap">
      {/* Left panel */}
      <div className="na-login-left">
        <div className="na-login-grain" />
        <div className="na-login-brand">
          <span className="na-dot" />
          <span className="na-wm"><span className="na-it">N</span>easkol</span>
          <span className="na-tag">Admin</span>
        </div>
        <div className="na-login-quote">
          <blockquote>
            Gérer les mots,<br />
            <em>les visages,</em><br />
            les histoires.
          </blockquote>
          <div className="na-login-attr">— L'atelier interne de Neaskol</div>
        </div>
        <div className="na-login-meta">
          <span>© 2026 · Ankadivato</span>
          <span>v0.1 — aperçu</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="na-login-right">
        <div className="na-login-card">
          <h1>
            Bon retour,<br />
            <em>Neaskol</em>.
          </h1>
          <p className="na-login-sub">
            Connectez-vous pour gérer le site, les témoignages et les messages reçus.
          </p>

          <form className="na-login-form" onSubmit={handleSubmit}>
            <div className="na-field">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                type="email"
                className="na-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@neaskol.com"
                required
                autoFocus
              />
            </div>

            <div className="na-field">
              <label htmlFor="password">
                Mot de passe
                <a href="#" tabIndex={-1}>Oublié ?</a>
              </label>
              <div className="na-field-pw">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  className="na-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: 78 }}
                />
                <button type="button" className="na-pw-toggle" onClick={() => setShowPw(s => !s)}>
                  {showPw ? 'Cacher' : 'Voir'}
                </button>
              </div>
            </div>

            <label className="na-check">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <span>Rester connecté 30 jours</span>
            </label>

            {error && <div className="na-login-error">{error}</div>}

            <button type="submit" className="na-btn primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px 14px' }}>
              {loading ? 'Connexion…' : 'Se connecter →'}
            </button>
          </form>

          <div className="na-login-foot">
            Besoin d'un accès ?{' '}
            <a href="mailto:admin@neaskol.com">Contacter un admin</a>
          </div>
        </div>
      </div>
    </div>
  )
}
