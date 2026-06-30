'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'approach', label: 'Approach' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Home() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #15171D; }

        .layout { display: flex; min-height: 100vh; }

        .sidebar {
          width: 260px;
          flex-shrink: 0;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sb-name {
          font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
          color: #F2EEE7; margin-bottom: 4px;
        }
        .sb-role {
          font-size: 12.5px; color: #8B9EFF;
          letter-spacing: -0.005em; margin-bottom: 56px;
        }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; }
        .sb-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 7px; font-size: 13px;
          color: #6E7480; letter-spacing: -0.005em; cursor: pointer;
          background: none; border: none; text-align: left;
          font-family: inherit;
          transition: color 160ms ease, background 160ms ease;
        }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-link.active { color: #F2EEE7; background: rgba(139,158,255,0.1); }
        .sb-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #383C46; flex-shrink: 0;
          transition: background 160ms ease, box-shadow 160ms ease;
        }
        .sb-link.active .sb-dot {
          background: #8B9EFF; box-shadow: 0 0 8px rgba(139,158,255,0.65);
        }
        .sb-footer { margin-top: auto; padding-top: 24px; }
        .sb-status {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: #565B65; letter-spacing: 0.02em;
        }
        .sb-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #F2B66D; opacity: 0.85;
        }

        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 760px; margin: 0 auto; padding: 0 56px; }

        .section-block {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 100px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          opacity: 0; transform: translateY(14px);
          animation: rise 700ms ease forwards;
        }
        .section-block:last-child { border-bottom: none; }
        @keyframes rise { to { opacity: 1; transform: translateY(0); } }

        .eyebrow {
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: #C9C3B6; opacity: 0.5; margin-bottom: 28px;
        }

        .hero-greeting {
          font-size: 15px; color: #F2B66D;
          letter-spacing: -0.005em; margin-bottom: 18px;
        }
        .hero-name {
          font-size: clamp(46px, 6.5vw, 74px); font-weight: 600;
          letter-spacing: -0.04em; line-height: 0.98;
          color: #F2EEE7; margin-bottom: 10px;
        }
        .hero-role {
          font-size: clamp(17px, 2.2vw, 21px); font-weight: 400;
          letter-spacing: -0.01em; color: #8B9EFF; margin-bottom: 44px;
        }
        .hero-copy { max-width: 560px; }
        .hero-primary {
          font-size: 17px; color: #C9C3B6; line-height: 1.7;
          letter-spacing: -0.01em; margin-bottom: 16px;
        }
        .hero-secondary { font-size: 14.5px; color: #8A8C92; line-height: 1.7; }

        .project-card {
          background: #1C1F27;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 36px 32px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }
        .project-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #8B9EFF, #F2B66D);
          opacity: 0; transition: opacity 220ms ease;
        }
        .project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(139,158,255,0.28);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .project-card:hover::after { opacity: 1; }

        .project-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #6FD6A8; margin-bottom: 18px;
        }
        .project-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #6FD6A8; }
        .project-title {
          font-size: 22px; font-weight: 600; letter-spacing: -0.02em;
          color: #F2EEE7; margin-bottom: 10px;
        }
        .project-tagline {
          font-size: 13.5px; color: #8B9EFF;
          margin-bottom: 18px; letter-spacing: -0.005em;
        }
        .project-desc {
          font-size: 14.5px; color: #C9C3B6; line-height: 1.75;
          margin-bottom: 8px; max-width: 600px;
        }

        .decision-log { margin-top: 28px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.07); }
        .decision-log-label {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #565B65; margin-bottom: 18px;
        }
        .decision {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 18px;
          padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .decision:first-child { border-top: none; }
        .decision-tag { font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em; padding-top: 2px; }
        .decision-tag.problem { color: #E89B6F; }
        .decision-tag.chose { color: #6FD6A8; }
        .decision-text { font-size: 13.5px; color: #C9C3B6; line-height: 1.65; }
        .decision-text b { color: #F2EEE7; font-weight: 500; }

        .project-meta {
          display: flex; flex-wrap: wrap; gap: 28px;
          margin: 24px 0; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .meta-item { min-width: 0; }
        .meta-label {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #565B65; margin-bottom: 6px;
        }
        .meta-value { font-size: 13px; color: #C9C3B6; line-height: 1.5; }

        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 22px; }
        .tag {
          font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #8A8C92;
        }
        .project-links { display: flex; gap: 10px; flex-wrap: wrap; }
        .project-link {
          font-size: 12.5px; font-weight: 500; padding: 9px 16px;
          border-radius: 7px; text-decoration: none; letter-spacing: -0.005em;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .project-link-primary { background: #8B9EFF; color: #15171D; }
        .project-link-primary:hover { background: #A4B3FF; }
        .project-link-secondary {
          background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6;
        }
        .project-link-secondary:hover { border-color: rgba(255,255,255,0.28); color: #F2EEE7; }

        .project-more {
          opacity: 0.45; text-align: center; padding: 28px;
          font-size: 13px; color: #565B65; letter-spacing: -0.005em;
        }

        .principle {
          display: grid; grid-template-columns: 44px 1fr; gap: 18px;
          align-items: start; padding: 26px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .principle:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .p-num {
          font-size: 10px; font-family: ui-monospace, 'SF Mono', monospace;
          color: #565B65; letter-spacing: 0.06em; padding-top: 4px;
        }
        .p-text {
          font-size: 17px; font-weight: 400; color: #F2EEE7;
          letter-spacing: -0.015em; line-height: 1.55;
        }

        .about-text {
          font-size: 16.5px; font-weight: 400; color: #C9C3B6;
          line-height: 1.8; letter-spacing: -0.005em;
          max-width: 560px; margin-bottom: 16px;
        }

        .contact-list { display: flex; flex-direction: column; gap: 4px; }
        .contact-row {
          display: flex; align-items: baseline; gap: 16px; padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.06); text-decoration: none;
        }
        .contact-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .contact-label {
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: #565B65; width: 90px; flex-shrink: 0;
        }
        .contact-value {
          font-size: 15px; color: #C9C3B6;
          letter-spacing: -0.01em; transition: color 160ms ease;
        }
        .contact-row:hover .contact-value { color: #8B9EFF; }

        @media (max-width: 880px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 24px; }
          .decision { grid-template-columns: 1fr; gap: 6px; }
        }
      `}</style>

      <div className="layout">

        <aside className="sidebar">
          <div>
            <div className="sb-name">Ali Saeed</div>
            <div className="sb-role">AI Product Manager</div>
          </div>
          <nav className="sb-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`sb-link ${active === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="sb-dot" />
                {s.label}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <div className="sb-status">
              <span className="sb-pulse" />
              Open to opportunities
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            <section id="overview" className="section-block">
              <p className="hero-greeting">Welcome.</p>
              <h1 className="hero-name">Ali Saeed</h1>
              <p className="hero-role">AI Product Manager</p>
              <div className="hero-copy">
                <p className="hero-primary">
                  I work on AI systems where the hard part isn&apos;t generating
                  an answer — it&apos;s knowing whether that answer can be trusted.
                </p>
                <p className="hero-secondary">
                  Below is a product I built end to end, including the reasoning
                  behind a few of the harder calls. It&apos;s live, so feel free
                  to try it yourself.
                </p>
              </div>
            </section>

            <section id="projects" className="section-block">
              <p className="eyebrow">Projects</p>

              <div className="project-card">
                <div className="project-status">
                  <span className="project-status-dot" />
                  Live Product
                </div>
                <h3 className="project-title">ProductProof</h3>
                <p className="project-tagline">Prove every ticket before you build it</p>
                <p className="project-desc">
                  An AI-powered verification system for product tickets. Three
                  specialized agents check every claim in a Jira ticket against a
                  team&apos;s own documentation — distinguishing what is confirmed
                  from what is assumed before a ticket reaches sprint planning.
                </p>

                <div className="decision-log">
                  <p className="decision-log-label">How I got there</p>

                  <div className="decision">
                    <span className="decision-tag problem">The problem</span>
                    <p className="decision-text">
                      Tickets carried assumptions that read like facts. A line
                      like <b>&ldquo;the system will send an SMS notification&rdquo;</b> looks
                      complete on the page — but if the documentation says SMS
                      is opt-in only, that requirement is wrong before it ever
                      reaches engineering.
                    </p>
                  </div>

                  <div className="decision">
                    <span className="decision-tag chose">I chose</span>
                    <p className="decision-text">
                      <b>Verification over generation.</b> Rather than a quality
                      score, every claim in a ticket is marked verified or assumed —
                      verified only when an exact sentence in the source
                      documentation backs it up. A score doesn&apos;t tell a PM
                      what to do next. A list of unverified claims does.
                    </p>
                  </div>

                  <div className="decision">
                    <span className="decision-tag chose">I chose</span>
                    <p className="decision-text">
                      <b>Three narrow agents instead of one broad prompt.</b> The
                      agent responsible for the rewrite never sees the list of
                      assumed claims, only what was verified. Models tend to use
                      whatever is in front of them, instructions aside — so the
                      simplest fix was to keep the unverified material out of
                      its context altogether.
                    </p>
                  </div>
                </div>

                <div className="project-meta">
                  <div className="meta-item">
                    <div className="meta-label">Stack</div>
                    <div className="meta-value">Next.js, Claude, Jira &amp; Confluence APIs</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Outcome</div>
                    <div className="meta-value">Surfaces gaps before sprint planning, not mid-sprint</div>
                  </div>
                </div>

                <div className="project-tags">
                  <span className="tag">Multi-agent systems</span>
                  <span className="tag">RAG</span>
                  <span className="tag">Jira API</span>
                  <span className="tag">Product Verification</span>
                </div>

                <div className="project-links">
                  <a className="project-link project-link-primary" href="/work/productproof">
                    Read the case study
                  </a>
                  <a className="project-link project-link-secondary" href="https://healthy-humans.vercel.app" target="_blank" rel="noopener noreferrer">
                    Try the live demo
                  </a>
                </div>
              </div>

              <p className="project-more">Additional case studies coming as they wrap up</p>
            </section>

            <section id="approach" className="section-block">
              <p className="eyebrow">Approach</p>
              <div>
                <div className="principle">
                  <span className="p-num">01</span>
                  <p className="p-text">
                    Start from the problem, not the model. AI is a means to an
                    end — the end has to be defined first.
                  </p>
                </div>
                <div className="principle">
                  <span className="p-num">02</span>
                  <p className="p-text">
                    Design for the cases where the system is wrong, not just
                    where it works. A system worth trusting tells you what it
                    doesn&apos;t know.
                  </p>
                </div>
                <div className="principle">
                  <span className="p-num">03</span>
                  <p className="p-text">
                    Build the thing, not just the spec. Product judgment holds
                    up best when it&apos;s been tested against something real.
                  </p>
                </div>
              </div>
            </section>

            <section id="about" className="section-block">
              <p className="eyebrow">About</p>
              <p className="about-text">
                I&apos;m a Product Manager working on AI systems, where the
                interesting problems tend to be less about what a model can
                generate and more about whether people can rely on what it
                produces.
              </p>
              <p className="about-text">
                I&apos;d rather build the thing than write the spec for it.
                Most of what I&apos;ve learned about a product has come from
                shipping it and watching where it breaks.
              </p>
            </section>

            <section id="contact" className="section-block">
              <p className="eyebrow">Contact</p>
              <div className="contact-list">
                <a className="contact-row" href="mailto:alisaeed786@gmail.com">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">alisaeed786@gmail.com</span>
                </a>
                <a className="contact-row" href="https://www.linkedin.com/in/alisaeed786" target="_blank" rel="noopener noreferrer">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">linkedin.com/in/alisaeed786</span>
                </a>
                <a className="contact-row" href="https://github.com/alisaeed786-hub" target="_blank" rel="noopener noreferrer">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/alisaeed786-hub</span>
                </a>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  )
}
