'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-saeed1/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'GitHub', href: 'https://github.com/alisaeed786-hub', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: 'Email', href: 'mailto:alisaeed786@gmail.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
]

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #15171D; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; }

        /* Nav */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 56px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          background: ${scrolled ? 'rgba(21,23,29,0.92)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(12px)' : 'none'};
          border-bottom: ${scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none'};
          transition: all 0.2s ease;
        }
        .nav-logo { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: #F2EEE7; text-decoration: none; }
        .nav-links { display: flex; align-items: center; gap: 36px; }
        .nav-link { font-size: 14px; color: #6E7480; text-decoration: none; letter-spacing: -0.005em; transition: color 160ms ease; }
        .nav-link:hover { color: #C9C3B6; }
        .nav-socials { display: flex; gap: 18px; }
        .nav-social { color: #6E7480; text-decoration: none; display: flex; align-items: center; transition: color 160ms ease; }
        .nav-social:hover { color: #C9C3B6; }

        /* Sections */
        .section { padding: 120px 56px; max-width: 1100px; margin: 0 auto; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .section:last-child { border-bottom: none; }
        .section-hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding-top: 64px; }

        /* Hero */
        .hero-eyebrow { font-size: 13px; color: #F2B66D; letter-spacing: -0.005em; margin-bottom: 20px; }
        .hero-name { font-size: clamp(52px, 7vw, 88px); font-weight: 600; letter-spacing: -0.04em; line-height: 0.96; color: #F2EEE7; margin-bottom: 14px; }
        .hero-role { font-size: clamp(18px, 2.5vw, 24px); font-weight: 400; color: #8B9EFF; letter-spacing: -0.01em; margin-bottom: 40px; }
        .hero-socials { display: flex; gap: 20px; margin-bottom: 44px; }
        .hero-social { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #6E7480; text-decoration: none; transition: color 160ms ease; }
        .hero-social:hover { color: #C9C3B6; }
        .hero-body { max-width: 560px; }
        .hero-p { font-size: 18px; color: #C9C3B6; line-height: 1.75; letter-spacing: -0.01em; margin-bottom: 16px; }
        .hero-p:last-child { margin-bottom: 0; }

        /* Experience preview */
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
        .exp-card { background: #1C1F27; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 28px 24px; }
        .exp-card-company { font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 4px; }
        .exp-card-role { font-size: 13px; color: #8B9EFF; margin-bottom: 14px; }
        .exp-card-body { font-size: 14.5px; color: #AAB4C0; line-height: 1.7; }
        .exp-card-dates { font-size: 12px; color: #565B65; margin-top: 12px; }

        /* Projects preview */
        .project-preview { background: #1C1F27; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 32px 28px; margin-bottom: 32px; position: relative; overflow: hidden; transition: border-color 220ms ease, transform 220ms ease; }
        .project-preview::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #8B9EFF, #F2B66D); opacity: 0; transition: opacity 220ms ease; }
        .project-preview:hover { border-color: rgba(139,158,255,0.28); transform: translateY(-2px); }
        .project-preview:hover::after { opacity: 1; }
        .project-status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6FD6A8; margin-bottom: 14px; }
        .project-dot { width: 5px; height: 5px; border-radius: 50%; background: #6FD6A8; }
        .project-title { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 8px; }
        .project-tagline { font-size: 14px; color: #8B9EFF; margin-bottom: 14px; }
        .project-desc { font-size: 15px; color: #AAB4C0; line-height: 1.7; max-width: 560px; }

        /* About preview */
        .about-preview { max-width: 600px; }
        .about-p { font-size: 18px; color: #C9C3B6; line-height: 1.8; letter-spacing: -0.005em; margin-bottom: 16px; }
        .about-p:last-child { margin-bottom: 0; }

        /* Contact */
        .contact-list { display: flex; flex-direction: column; max-width: 480px; }
        .contact-row { display: flex; align-items: center; gap: 16px; padding: 18px 0; border-top: 1px solid rgba(255,255,255,0.06); text-decoration: none; }
        .contact-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .contact-icon { color: #565B65; flex-shrink: 0; transition: color 160ms ease; }
        .contact-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #565B65; width: 80px; flex-shrink: 0; }
        .contact-value { font-size: 16px; color: #C9C3B6; letter-spacing: -0.01em; transition: color 160ms ease; }
        .contact-row:hover .contact-value { color: #8B9EFF; }
        .contact-row:hover .contact-icon { color: #8B9EFF; }

        /* Section header */
        .section-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9C3B6; opacity: 0.45; margin-bottom: 36px; }
        
        /* More link */
        .more-link { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: #8B9EFF; text-decoration: none; letter-spacing: -0.005em; transition: gap 160ms ease; }
        .more-link:hover { gap: 12px; }

        /* Tags */
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .tag { font-size: 11px; padding: 4px 10px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8A8C92; letter-spacing: 0.02em; }

        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links { display: none; }
          .section { padding: 80px 24px; }
          .exp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className="nav">
        <Link className="nav-logo" href="/">Ali Saeed</Link>
        <div className="nav-links">
          {NAV.map(n => <Link key={n.label} className="nav-link" href={n.href}>{n.label}</Link>)}
        </div>
        <div className="nav-socials">
          {SOCIALS.map(s => (
            <a key={s.label} className="nav-social" href={s.href} target={s.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </nav>

      <main>
        {/* Hero */}
        <div className="section section-hero">
          <p className="hero-eyebrow">Welcome.</p>
          <h1 className="hero-name">Ali Saeed</h1>
          <p className="hero-role">AI Product Manager</p>
          <div className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.label} className="hero-social" href={s.href} target={s.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer">
                {s.icon}<span>{s.label}</span>
              </a>
            ))}
          </div>
          <div className="hero-body">
            <p className="hero-p">
              I got into product management because I enjoy the conversations and finding the missing piece of the puzzle. It is a thrill that no other role really gets.
            </p>
            <p className="hero-p">
              Five years building operational infrastructure at healthtech and transit companies. Now building AI systems that solve the problems I kept running into along the way.
            </p>
          </div>
        </div>

        {/* Experience preview */}
        <div className="section">
          <p className="section-eyebrow">Experience</p>
          <div className="exp-grid">
            <div className="exp-card">
              <div className="exp-card-company">10x Health System</div>
              <div className="exp-card-role">Product Manager, Platform and API Operations</div>
              <p className="exp-card-body">Built the operational infrastructure from scratch across a six-product healthtech operation. No playbook, six concurrent workstreams, a live system where a wrong data point meant the wrong order shipped to a real patient.</p>
              <p className="exp-card-dates">Jan 2023 — Present</p>
            </div>
            <div className="exp-card">
              <div className="exp-card-company">HNTB / WMATA</div>
              <div className="exp-card-role">Product Manager, Transit Technology</div>
              <p className="exp-card-body">Managed technology programs across a 200-person PMO at one of the largest transit agencies in the country. Secured C-suite approval for the agency's first Agile adoption and owned executive reporting directly to agency leadership.</p>
              <p className="exp-card-dates">Aug 2020 — Jan 2023</p>
            </div>
          </div>
          <Link className="more-link" href="/experience">Read the full story &rarr;</Link>
        </div>

        {/* Projects preview */}
        <div className="section">
          <p className="section-eyebrow">Projects</p>
          <div className="project-preview">
            <div className="project-status"><span className="project-dot" />Live Product</div>
            <div className="project-title">ProductProof</div>
            <div className="project-tagline">Prove every ticket before you build it</div>
            <p className="project-desc">An AI verification system for product tickets. Three specialized agents check every claim against a team's own documentation, separating what is confirmed from what is assumed before a ticket reaches sprint planning.</p>
            <div className="tags">
              <span className="tag">Multi-agent systems</span>
              <span className="tag">RAG</span>
              <span className="tag">Jira API</span>
              <span className="tag">TypeScript</span>
            </div>
          </div>
          <Link className="more-link" href="/projects">See all projects &rarr;</Link>
        </div>

        {/* About preview */}
        <div className="section">
          <p className="section-eyebrow">About</p>
          <div className="about-preview">
            <p className="about-p">
              Product management is less about the product than most people think. It is about the room, the conversation, and the thing nobody has said yet that changes everything once you find it.
            </p>
            <p className="about-p">
              I studied Information Technology and Systems at UT Dallas. I have spent five years working in transit and healthtech, mostly in environments where the infrastructure I needed did not exist yet.
            </p>
          </div>
          <br />
          <Link className="more-link" href="/about">More about me &rarr;</Link>
        </div>

        {/* Contact */}
        <div className="section" id="contact">
          <p className="section-eyebrow">Contact</p>
          <div className="contact-list">
            <a className="contact-row" href="mailto:alisaeed786@gmail.com">
              <span className="contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <span className="contact-label">Email</span>
              <span className="contact-value">alisaeed786@gmail.com</span>
            </a>
            <a className="contact-row" href="https://www.linkedin.com/in/ali-saeed1/" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">linkedin.com/in/ali-saeed1</span>
            </a>
            <a className="contact-row" href="https://github.com/alisaeed786-hub" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/alisaeed786-hub</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
