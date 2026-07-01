'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SECTIONS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'industry', label: 'Industry Evidence' },
  { id: 'system', label: 'The System' },
  { id: 'readiness', label: 'Readiness Model' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'next', label: 'What\'s Next' },
]

export default function ProductProofCaseStudy() {
  const [active, setActive] = useState('problem')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
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
        body { background: #0D0F14; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .layout { display: flex; min-height: 100vh; padding-top: 64px; }

        /* Sidebar */
        .sidebar {
          width: 260px; flex-shrink: 0; position: fixed;
          top: 64px; left: 0; height: calc(100vh - 64px);
          padding: 40px 28px; display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
          overflow-y: auto;
        }
        .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6E7480; text-decoration: none; margin-bottom: 28px; transition: color 160ms ease; }
        .sb-back:hover { color: #C9C3B6; }
        .sb-product { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 6px; }
        .sb-section-title { font-size: 22px; font-weight: 700; letter-spacing: -0.025em; color: #F2EEE7; margin-bottom: 36px; line-height: 1.15; }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; }
        .sb-link { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 7px; font-size: 13px; color: #6E7480; cursor: pointer; background: none; border: none; text-align: left; font-family: inherit; transition: color 160ms ease, background 160ms ease; }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-link.active { color: #F2EEE7; background: rgba(139,158,255,0.1); }
        .sb-dot { width: 5px; height: 5px; border-radius: 50%; background: #383C46; flex-shrink: 0; transition: background 160ms ease, box-shadow 160ms ease; }
        .sb-link.active .sb-dot { background: #8B9EFF; box-shadow: 0 0 8px rgba(139,158,255,0.65); }
        .sb-footer { margin-top: auto; padding-top: 28px; display: flex; flex-direction: column; gap: 10px; }
        .sb-cta { font-size: 13px; font-weight: 600; text-align: center; padding: 11px; border-radius: 8px; text-decoration: none; background: #8B9EFF; color: #0D0F14; transition: background 160ms ease; }
        .sb-cta:hover { background: #A4B3FF; }
        .sb-cta-ghost { font-size: 13px; text-align: center; padding: 11px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.12); color: #C9C3B6; transition: border-color 160ms ease, color 160ms ease; }
        .sb-cta-ghost:hover { border-color: rgba(255,255,255,0.25); color: #F2EEE7; }

        /* Main */
        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 700px; margin: 0 auto; padding: 0 52px; }

        /* Hero */
        .hero { padding: 56px 0 64px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .hero-status { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6FD6A8; margin-bottom: 20px; }
        .hero-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #6FD6A8; }
        .hero-title { font-size: clamp(36px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.05; color: #F2EEE7; margin-bottom: 12px; }
        .hero-tagline { font-size: 18px; color: #8B9EFF; margin-bottom: 20px; letter-spacing: -0.01em; }
        .hero-lede { font-size: 17px; color: #AAB4C0; line-height: 1.75; max-width: 580px; margin-bottom: 32px; }
        .hero-links { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
        .hero-link { font-size: 14px; font-weight: 600; padding: 11px 20px; border-radius: 8px; text-decoration: none; transition: all 160ms ease; }
        .hero-link-primary { background: #8B9EFF; color: #0D0F14; }
        .hero-link-primary:hover { background: #A4B3FF; }
        .hero-link-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.12); color: #C9C3B6; }
        .hero-link-ghost:hover { border-color: rgba(255,255,255,0.25); color: #F2EEE7; }

        /* Stat row */
        .stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; }
        .stat-cell { padding: 24px 20px; background: #13161C; }
        .stat-cell:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.06); }
        .stat-num { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; color: #F2EEE7; margin-bottom: 4px; font-family: ui-monospace, 'SF Mono', monospace; }
        .stat-num.green { color: #6FD6A8; }
        .stat-num.amber { color: #F2B66D; }
        .stat-num.violet { color: #8B9EFF; }
        .stat-label { font-size: 13px; color: #6E7480; line-height: 1.45; }

        /* Blocks */
        .block { padding: 64px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .block:last-child { border-bottom: none; padding-bottom: 80px; }
        .block-title { font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 28px; }

        /* Narrative */
        .narrative { font-size: 17px; color: #C9C3B6; line-height: 1.85; letter-spacing: -0.005em; margin-bottom: 24px; max-width: 620px; }
        .narrative:last-child { margin-bottom: 0; }
        .narrative b { color: #F2EEE7; font-weight: 500; }

        /* Industry stat callout */
        .stat-callout { background: #13161C; border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #F2B66D; border-radius: 0 8px 8px 0; padding: 20px 24px; margin: 28px 0; }
        .stat-callout-num { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; color: #F2B66D; margin-bottom: 4px; }
        .stat-callout-text { font-size: 14px; color: #AAB4C0; line-height: 1.55; }
        .stat-callout-source { font-size: 11px; color: #565B65; margin-top: 8px; letter-spacing: 0.02em; }

        /* Agents */
        .agent-list { display: flex; flex-direction: column; gap: 2px; margin-top: 8px; }
        .agent { display: grid; grid-template-columns: 80px 1fr; gap: 20px; align-items: start; padding: 24px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .agent-num { font-size: 11px; font-family: ui-monospace, 'SF Mono', monospace; color: #565B65; letter-spacing: 0.08em; padding-top: 3px; }
        .agent-content {}
        .agent-title { font-size: 17px; font-weight: 600; color: #F2EEE7; letter-spacing: -0.015em; margin-bottom: 8px; }
        .agent-desc { font-size: 15px; color: #AAB4C0; line-height: 1.7; }

        /* Readiness verdicts */
        .verdict-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px; }
        .verdict { border-radius: 10px; padding: 22px 18px; border: 1px solid rgba(255,255,255,0.07); }
        .verdict-ready { background: rgba(111,214,168,0.06); border-color: rgba(111,214,168,0.2); }
        .verdict-caution { background: rgba(242,182,109,0.06); border-color: rgba(242,182,109,0.2); }
        .verdict-blocked { background: rgba(232,155,111,0.06); border-color: rgba(232,155,111,0.2); }
        .verdict-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px; }
        .verdict-ready .verdict-badge { color: #6FD6A8; }
        .verdict-caution .verdict-badge { color: #F2B66D; }
        .verdict-blocked .verdict-badge { color: #E89B6F; }
        .verdict-range { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 6px; }
        .verdict-desc { font-size: 13px; color: #AAB4C0; line-height: 1.55; }

        /* Ticket evidence */
        .ticket-card { background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 28px; margin-bottom: 14px; }
        .ticket-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
        .ticket-id { font-family: ui-monospace, 'SF Mono', monospace; font-size: 12px; color: #6E7480; letter-spacing: 0.04em; }
        .ticket-verdict-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 10px; border-radius: 5px; }
        .tv-ready { background: rgba(111,214,168,0.12); color: #6FD6A8; }
        .tv-caution { background: rgba(242,182,109,0.12); color: #F2B66D; }
        .tv-blocked { background: rgba(232,155,111,0.12); color: #E89B6F; }
        .ticket-summary { font-size: 15px; color: #F2EEE7; line-height: 1.55; margin-bottom: 18px; font-weight: 500; }
        .check-list { display: flex; flex-direction: column; gap: 10px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .check-row { display: flex; gap: 12px; align-items: flex-start; }
        .check-icon { width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; margin-top: 1px; }
        .check-verified { background: rgba(111,214,168,0.15); color: #6FD6A8; }
        .check-assumed { background: rgba(242,182,109,0.15); color: #F2B66D; }
        .check-text { font-size: 14px; color: #AAB4C0; line-height: 1.6; }
        .check-text b { color: #C9C3B6; font-weight: 500; }

        /* Decisions */
        .decision-list { display: flex; flex-direction: column; gap: 2px; }
        .decision { padding: 28px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .decision-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
        .decision-tag.chose { color: #6FD6A8; }
        .decision-tag.rejected { color: #565B65; }
        .decision-text { font-size: 16px; color: #C9C3B6; line-height: 1.75; }
        .decision-text b { color: #F2EEE7; font-weight: 500; }

        /* Next */
        .next-list { display: flex; flex-direction: column; gap: 2px; }
        .next-item { display: flex; gap: 16px; align-items: flex-start; padding: 22px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .next-dot { width: 6px; height: 6px; border-radius: 50%; background: #383C46; flex-shrink: 0; margin-top: 8px; }
        .next-text { font-size: 16px; color: #AAB4C0; line-height: 1.7; }
        .next-text b { color: #F2EEE7; font-weight: 500; }

        /* Responsive */
        @media (max-width: 860px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 20px; }
          .stat-row { grid-template-columns: 1fr; }
          .stat-cell:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .verdict-grid { grid-template-columns: 1fr; }
          .agent { grid-template-columns: 60px 1fr; gap: 14px; }
          .block { padding: 48px 0; }
          .hero { padding: 40px 0 48px; }
        }
      `}</style>

      <Navbar />

      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/projects">← Projects</Link>
          <div className="sb-product">Case Study</div>
          <div className="sb-section-title">ProductProof</div>
          <nav className="sb-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className={`sb-link ${active === s.id ? 'active' : ''}`} onClick={() => scrollTo(s.id)}>
                <span className="sb-dot" />{s.label}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#565B65', marginBottom: 10 }}>ProductProof</p>
            <Link href="/work/productproof" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#AAB4C0', textDecoration: 'none', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Overview</Link>
            <Link href="/work/productproof/docs" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#AAB4C0', textDecoration: 'none', padding: '7px 0' }}>Technical Docs</Link>
          </div>
          <div className="sb-footer">
            <a className="sb-cta" href="https://productproof-demo.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo</a>
            <a className="sb-cta-ghost" href="https://github.com/alisaeed786-hub/healthy-humans" target="_blank" rel="noopener noreferrer">View the code</a>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            {/* Hero */}
            <div className="hero">
              <div className="hero-status"><span className="hero-status-dot" />Live Product</div>
              <h1 className="hero-title">ProductProof</h1>
              <p className="hero-tagline">Prove every ticket before you build it</p>
              <p className="hero-lede">
                I built ProductProof because I kept running into the same problem. Tickets would go into sprint planning looking complete, and engineers would find the gaps mid-sprint. This is a system that catches those gaps before the ticket ever reaches the team.
              </p>
              <div className="hero-links">
                <a className="hero-link hero-link-primary" href="https://productproof-demo.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo →</a>
                <a className="hero-link hero-link-ghost" href="https://github.com/alisaeed786-hub/healthy-humans" target="_blank" rel="noopener noreferrer">View the code</a>
              </div>
              <div className="stat-row">
                <div className="stat-cell">
                  <div className="stat-num green">4</div>
                  <div className="stat-label">Specialized agents, each with one job</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num amber">10+</div>
                  <div className="stat-label">Compliance gaps caught on a single test ticket</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num violet">0</div>
                  <div className="stat-label">Facts invented — every verified claim traces to a source</div>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div id="problem" className="block">
              <p className="block-title">The Problem I Lived</p>
              <p className="narrative">
                At 10x Health I was the person responsible for making sure what engineering built matched what the business actually needed. That meant I spent a lot of time in refinement, reading tickets, and asking the questions nobody had thought to ask yet.
              </p>
              <p className="narrative">
                The pattern was always the same. A ticket would come in looking complete — clear user story, reasonable acceptance criteria, a scope that made sense on paper. But somewhere inside it was a claim nobody had actually checked. <b>&ldquo;The system will notify the user by SMS&rdquo;</b> reads like a requirement. If your documentation says SMS is opt-in only, or that no PHI can appear in a message body, that line is not a requirement. It is an assumption that made it through planning because nobody had time to check.
              </p>
              <p className="narrative">
                Those gaps almost never surface in planning. They surface mid-sprint, when an engineer has to stop and ask. Or worse, after the fact, when compliance reviews the work. By then the cost has moved from a conversation in refinement to rework after code is written.
              </p>
            </div>

            {/* Industry */}
            <div id="industry" className="block">
              <p className="block-title">Industry Evidence</p>
              <p className="narrative">
                This was not just a problem at my company. Requirements defects are one of the most expensive and most common failure modes in software development — and the later they get caught, the worse the cost.
              </p>

              <div className="stat-callout">
                <div className="stat-callout-num">100x</div>
                <div className="stat-callout-text">The cost multiplier for fixing a requirements defect after release compared to catching it during design, according to IBM&apos;s Systems Sciences Institute.</div>
                <div className="stat-callout-source">Source: IBM Systems Sciences Institute</div>
              </div>

              <div className="stat-callout">
                <div className="stat-callout-num">64%</div>
                <div className="stat-callout-text">Of total software defect costs trace back to errors in the requirements and design phases — not implementation, not testing. The problem starts before anyone writes a line of code.</div>
                <div className="stat-callout-source">Source: Crosstalk, Journal of Defense Software Engineering</div>
              </div>

              <p className="narrative">
                The tools that exist to address this — ticket templates, definition of done checklists, refinement ceremonies — are all manual. They depend entirely on the PM knowing what to check, and having time to check it. They do not verify claims against actual documentation. They catch what you think to ask about, not what you missed.
              </p>
              <p className="narrative">
                ProductProof is the verification layer that was missing. It does not replace the PM. It checks the work the PM does not have time to check manually every time.
              </p>
            </div>

            {/* System */}
            <div id="system" className="block">
              <p className="block-title">The System</p>
              <p className="narrative">
                Four agents, run in sequence, each with a single job. No single model is asked to read the ticket, verify the claims, and rewrite it all at once — that produces output that sounds confident but is much harder to trust.
              </p>
              <div className="agent-list">
                <div className="agent">
                  <span className="agent-num">Agent 00</span>
                  <div className="agent-content">
                    <div className="agent-title">Keyword extraction</div>
                    <p className="agent-desc">Translates the language of the ticket into vocabulary the documentation search can actually use. This step is what makes the verification accurate — if you search the wrong terms, you find the wrong evidence.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Agent 01</span>
                  <div className="agent-content">
                    <div className="agent-title">Structural check</div>
                    <p className="agent-desc">Checks the ticket on its own terms before touching any documentation. Is this written as a real user story? Are the acceptance criteria testable? Is the scope defined? These are the basics, and they catch a lot on their own.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Agent 02</span>
                  <div className="agent-content">
                    <div className="agent-title">Verification against documentation</div>
                    <p className="agent-desc">Every significant claim in the ticket gets checked against the team&apos;s own source material — architecture decisions, compliance rules, prior product calls. A claim is only marked <b style={{color:'#6FD6A8'}}>verified</b> if an exact sentence in the documentation backs it up. Everything else is marked <b style={{color:'#F2B66D'}}>assumed</b>, including claims that sound completely reasonable.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Agent 03</span>
                  <div className="agent-content">
                    <div className="agent-title">Rewrite using only what was verified</div>
                    <p className="agent-desc">The ticket is rewritten to fix structural issues — but this agent never sees the list of assumed claims. Only what was verified. That constraint is the most important decision in the whole system. More on that below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Readiness */}
            <div id="readiness" className="block">
              <p className="block-title">Readiness Model</p>
              <p className="narrative">
                The output is not a quality score. A number like 72 does not tell a PM what to fix or how urgent it is. Every ticket gets a plain verdict based on how many claims could not be verified.
              </p>
              <div className="verdict-grid">
                <div className="verdict verdict-ready">
                  <div className="verdict-badge">Ready</div>
                  <div className="verdict-range">0 – 3</div>
                  <div className="verdict-desc">Unverified claims. Safe to bring into planning as written.</div>
                </div>
                <div className="verdict verdict-caution">
                  <div className="verdict-badge">Needs review</div>
                  <div className="verdict-range">4 – 6</div>
                  <div className="verdict-desc">Unverified claims. Worth a second pass before committing to sprint.</div>
                </div>
                <div className="verdict verdict-blocked">
                  <div className="verdict-badge">Not ready</div>
                  <div className="verdict-range">7+</div>
                  <div className="verdict-desc">Unverified claims. Should not enter a sprint as written.</div>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div id="evidence" className="block">
              <p className="block-title">Evidence</p>
              <p className="narrative">
                Three real tickets from the test environment, run through the system as written. No edits, no cherry-picked output.
              </p>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-33</span>
                  <span className="ticket-verdict-badge tv-blocked">Not ready · 10+ unverified</span>
                </div>
                <p className="ticket-summary">&ldquo;As a parent, I want to see my 14-year-old&apos;s full medical record, including mental health notes, so I can monitor their health.&rdquo;</p>
                <div className="check-list">
                  <div className="check-row"><span className="check-icon check-assumed">!</span><p className="check-text"><b>Full record access for a proxy</b> — the team&apos;s access policy explicitly scopes proxy access to the minimum necessary, not the full record.</p></div>
                  <div className="check-row"><span className="check-icon check-assumed">!</span><p className="check-text"><b>Mental health notes included</b> — no documentation supports exposing this category to a proxy account.</p></div>
                  <div className="check-row"><span className="check-icon check-assumed">!</span><p className="check-text"><b>No age restriction stated</b> — contradicts the documented age-based access rules for minors.</p></div>
                </div>
              </div>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-22</span>
                  <span className="ticket-verdict-badge tv-caution">Needs review · 4 unverified</span>
                </div>
                <p className="ticket-summary">&ldquo;As a patient, I want to cancel or reschedule an appointment online without calling the clinic.&rdquo;</p>
                <div className="check-list">
                  <div className="check-row"><span className="check-icon check-verified">✓</span><p className="check-text"><b>Cancellation window</b> — matches the documented 24-hour cancellation policy exactly.</p></div>
                  <div className="check-row"><span className="check-icon check-assumed">!</span><p className="check-text"><b>Rescheduling fee handling</b> — no documentation confirms whether a fee applies on reschedule.</p></div>
                </div>
              </div>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-11</span>
                  <span className="ticket-verdict-badge tv-ready">Ready · 0 unverified</span>
                </div>
                <p className="ticket-summary">&ldquo;As a patient, I want to view my lab results in the portal so I can review them after my appointment.&rdquo;</p>
                <div className="check-list">
                  <div className="check-row"><span className="check-icon check-verified">✓</span><p className="check-text"><b>Every claim in the ticket</b> — traced directly to documented behavior. Lab result viewing, notification timing, audit logging. No gaps found.</p></div>
                </div>
              </div>
            </div>

            {/* Decisions */}
            <div id="decisions" className="block">
              <p className="block-title">Decisions That Mattered</p>
              <p className="narrative">
                Two architectural decisions shaped how the system works. Both came from watching earlier versions fail in ways that looked fine on the surface.
              </p>
              <div className="decision-list">
                <div className="decision">
                  <div className="decision-tag chose">Decision 1 — Chose</div>
                  <p className="decision-text">
                    <b>To withhold the assumed list from the rewrite agent.</b> Early versions passed everything to the final agent — on the assumption that more context would produce a better rewrite. In practice the model would treat assumed claims as settled fact, quietly folding them into the output. Removing them from that agent&apos;s context entirely was simpler and more reliable than trying to prompt around the behavior. The rewrite is now trustworthy because it can only use what was verified.
                  </p>
                </div>
                <div className="decision">
                  <div className="decision-tag rejected">Decision 2 — Considered, then rejected</div>
                  <p className="decision-text">
                    <b>A single confidence score per ticket.</b> It is the obvious first design. A number feels clean. But a score does not tell a PM which part of the ticket is the problem, which claim to go verify, or how urgent it is. Naming the specific unverified claims does all three. The score would have been easier to build and less useful to act on.
                  </p>
                </div>
              </div>
            </div>

            {/* Next */}
            <div id="next" className="block">
              <p className="block-title">What&apos;s Next</p>
              <div className="next-list">
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Multi-team rollout.</b> The system is currently built against one team&apos;s documentation set. The real test is whether the verification step holds up across teams with different documentation structures and different levels of completeness.</p>
                </div>
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Flagging documentation gaps.</b> Right now ProductProof reads the docs but does not flag where the docs themselves are missing. A ticket with five unverifiable claims might mean the ticket is bad — or it might mean the documentation has not kept up. That distinction matters and the system should surface it.</p>
                </div>
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Stress-testing the ready verdict.</b> A low assumed-claim count is currently treated as ready. I want to run this against tickets that are technically well-documented but still wrong in practice — to understand where the threshold needs to move.</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
