'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'AI Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-saeed1/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'GitHub', href: 'https://github.com/alisaeed786-hub', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: 'Email', href: 'mailto:alisaeed786@gmail.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.25s ease;
        }
        .nav.scrolled {
          background: rgba(13,15,20,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav.always-bg {
          background: rgba(13,15,20,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-logo {
          font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
          color: #F2EEE7; text-decoration: none; z-index: 101;
        }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link {
          font-size: 14px; color: #6E7480; text-decoration: none;
          letter-spacing: -0.005em; transition: color 160ms ease;
        }
        .nav-link:hover, .nav-link.active { color: #C9C3B6; }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .nav-socials { display: flex; gap: 16px; }
        .nav-social {
          color: #6E7480; text-decoration: none;
          display: flex; align-items: center; transition: color 160ms ease;
        }
        .nav-social:hover { color: #C9C3B6; }
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer;
          padding: 8px; z-index: 101;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: #C9C3B6; transition: all 0.2s ease;
          border-radius: 2px;
        }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 99;
          background: #0D0F14;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 80px 32px 48px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-nav-link {
          font-size: 32px; font-weight: 600; letter-spacing: -0.03em;
          color: #6E7480; text-decoration: none;
          padding: 12px 0; width: 100%; text-align: center;
          transition: color 160ms ease;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mobile-nav-link:last-of-type { border-bottom: none; }
        .mobile-nav-link:hover { color: #F2EEE7; }
        .mobile-socials {
          display: flex; gap: 28px; margin-top: 32px;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06);
          width: 100%; justify-content: center;
        }
        .mobile-social { color: #565B65; text-decoration: none; transition: color 160ms ease; }
        .mobile-social:hover { color: #C9C3B6; }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .nav-socials { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav ${isHome ? (scrolled ? 'scrolled' : '') : 'always-bg'}`}>
        <Link className="nav-logo" href="/">Ali Saeed</Link>
        <div className="nav-links">
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
          {NAV.map(n => (
            <Link key={n.label} className={`nav-link ${pathname === n.href ? 'active' : ''}`} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-socials">
            {SOCIALS.map(s => (
              <a key={s.label} className="nav-social" href={s.href} target={s.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#6E7480', fontSize: 28, cursor: 'pointer', lineHeight: 1, padding: 8 }}
        >×</button>
        <Link className="mobile-nav-link" href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {NAV.map(n => (
          <Link key={n.label} className="mobile-nav-link" href={n.href} onClick={() => setMenuOpen(false)}>
            {n.label}
          </Link>
        ))}
        <div className="mobile-socials">
          {SOCIALS.map(s => (
            <a key={s.label} className="mobile-social" href={s.href} target={s.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
