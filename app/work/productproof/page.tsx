'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'top', label: 'Overview' },
  { id: 'problem', label: 'The Problem' },
  { id: 'system', label: 'The System' },
  { id: 'model', label: 'Readiness Model' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'next', label: 'What’s Next' },
]

export default function ProductProofCaseStudy() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
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
        .sb-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; color: #6E7480; text-decoration: none;
          margin-bottom: 36px; letter-spacing: -0.005em;
          transition: color 160ms ease;
        }
        .sb-back:hover { color: #C9C3B6; }
        .sb-name {
          font-size: 13px; font-weight: 600; letter-spacing: -0.005em;
          color: #F2EEE7; margin-bottom: 2px;
        }
        .sb-project {
          font-size: 11.5px; color: #8B9EFF;
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
        .sb-footer { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 10px; }
        .sb-cta {
          font-size: 12px; font-weight: 600; text-align: center;
          padding: 10px; border-radius: 7px; text-decoration: none;
          background: #8B9EFF; color: #15171D;
        }
        .sb-cta-ghost {
          font-size: 12px; text-align: center; padding: 10px;
          border-radius: 7px; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6;
        }

        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 740px; margin: 0 auto; padding: 0 56px; }

        .section-block {
          padding: 100px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          opacity: 0; transform: translateY(14px);
          animation: rise 700ms ease forwards;
        }
        .section-block:last-child { border-bottom: none; }
        @keyframes rise { to { opacity: 1; transform: translateY(0); } }

        .eyebrow {
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: #C9C3B6; opacity: 0.5; margin-bottom: 24px;
        }

        /* ── Top ── */
        .top-block { padding-top: 64px; min-height: auto; }
        .status-row {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: #6FD6A8; margin-bottom: 22px;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #6FD6A8; }
        .top-title {
          font-size: clamp(36px, 5.5vw, 56px); font-weight: 600;
          letter-spacing: -0.035em; line-height: 1.02; color: #F2EEE7;
          margin-bottom: 14px;
        }
        .top-tagline {
          font-size: 17px; color: #8B9EFF;
          margin-bottom: 28px; letter-spacing: -0.005em;
        }
        .top-lede {
          font-size: 16px; color: #C9C3B6; line-height: 1.75;
          max-width: 600px; margin-bottom: 32px;
        }
        .top-links { display: flex; gap: 10px; flex-wrap: wrap; }
        .top-link {
          font-size: 13px; font-weight: 500; padding: 10px 18px;
          border-radius: 8px; text-decoration: none; letter-spacing: -0.005em;
        }
        .top-link-primary { background: #8B9EFF; color: #15171D; }
        .top-link-secondary { border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6; }

        .stat-row {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 56px;
          padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .stat-num {
          font-size: 26px; font-weight: 600; letter-spacing: -0.02em;
          color: #F2EEE7; margin-bottom: 4px;
          font-family: ui-monospace, 'SF Mono', monospace;
        }
        .stat-label { font-size: 12px; color: #6E7480; line-height: 1.4; }

        /* ── Prose ── */
        .lede {
          font-size: 17px; color: #C9C3B6; line-height: 1.8;
          letter-spacing: -0.005em; max-width: 600px; margin-bottom: 20px;
        }
        .lede b { color: #F2EEE7; font-weight: 500; }

        /* ── System steps ── */
        .step {
          display: grid; grid-template-columns: 44px 1fr;
          gap: 20px; padding: 28px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .step:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .step-num {
          font-size: 11px; font-family: ui-monospace, 'SF Mono', monospace;
          color: #565B65; padding-top: 4px;
        }
        .step-title {
          font-size: 16px; font-weight: 600; color: #F2EEE7;
          letter-spacing: -0.015em; margin-bottom: 8px;
        }
        .step-desc { font-size: 14px; color: #AAB4C0; line-height: 1.7; }

        /* ── Readiness model ── */
        .verdict-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px; margin-top: 32px;
        }
        .verdict-card {
          border-radius: 10px; padding: 20px 18px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .verdict-ready { background: rgba(111,214,168,0.06); border-color: rgba(111,214,168,0.2); }
        .verdict-caution { background: rgba(242,182,109,0.06); border-color: rgba(242,182,109,0.2); }
        .verdict-blocked { background: rgba(232,155,111,0.06); border-color: rgba(232,155,111,0.2); }
        .verdict-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
          margin-bottom: 8px; text-transform: uppercase;
        }
        .verdict-ready .verdict-label { color: #6FD6A8; }
        .verdict-caution .verdict-label { color: #F2B66D; }
        .verdict-blocked .verdict-label { color: #E89B6F; }
        .verdict-desc { font-size: 12.5px; color: #AAB4C0; line-height: 1.6; }

        /* ── Evidence cards ── */
        .ticket-card {
          background: #1C1F27;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 28px 26px;
          margin-bottom: 16px;
        }
        .ticket-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 14px; flex-wrap: wrap;
        }
        .ticket-id {
          font-family: ui-monospace, 'SF Mono', monospace;
          font-size: 12px; color: #6E7480; letter-spacing: 0.02em;
        }
        .ticket-verdict {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 5px;
        }
        .tv-not-ready { background: rgba(232,155,111,0.12); color: #E89B6F; }
        .tv-caution { background: rgba(242,182,109,0.12); color: #F2B66D; }
        .tv-ready { background: rgba(111,214,168,0.12); color: #6FD6A8; }

        .ticket-summary {
          font-size: 14.5px; color: #F2EEE7; line-height: 1.6;
          margin-bottom: 18px; font-weight: 500;
        }
        .check-row {
          display: flex; gap: 12px; padding: 11px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          align-items: flex-start;
        }
        .check-row:first-of-type { border-top: none; }
        .check-icon {
          width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; margin-top: 1px;
        }
        .check-verified { background: rgba(111,214,168,0.15); color: #6FD6A8; }
        .check-assumed { background: rgba(242,182,109,0.15); color: #F2B66D; }
        .check-text { font-size: 13px; color: #AAB4C0; line-height: 1.55; }
        .check-text b { color: #C9C3B6; font-weight: 500; }

        /* ── Decisions (reused pattern) ── */
        .decision {
          display: grid; grid-template-columns: 110px 1fr;
          gap: 18px; padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .decision:first-child { border-top: none; }
        .decision:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .decision-tag { font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em; padding-top: 2px; }
        .decision-tag.chose { color: #6FD6A8; }
        .decision-tag.rejected { color: #565B65; }
        .decision-text { font-size: 14px; color: #C9C3B6; line-height: 1.7; }
        .decision-text b { color: #F2EEE7; font-weight: 500; }

        /* ── Next ── */
        .next-item {
          display: flex; gap: 14px; padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .next-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .next-bullet {
          width: 5px; height: 5px; border-radius: 50%;
          background: #383C46; flex-shrink: 0; margin-top: 8px;
        }
        .next-text { font-size: 14px; color: #AAB4C0; line-height: 1.65; }
        .next-text b { color: #F2EEE7; font-weight: 500; }

        @media (max-width: 880px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 24px; }
          .stat-row { grid-template-columns: 1fr; gap: 20px; }
          .verdict-grid { grid-template-columns: 1fr; }
          .decision { grid-template-columns: 1fr; gap: 6px; }
        }
      `}</style>

      <div className="layout">

        <aside className="sidebar">
          <a className="sb-back" href="/">&larr;&nbsp; Back to portfolio</a>
          <div>
            <div className="sb-name">Ali Saeed</div>
            <div className="sb-project">ProductProof &mdash; Case Study</div>
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
            <a className="sb-cta" href="https://healthy-humans.vercel.app" target="_blank" rel="noopener noreferrer">
              Try the live demo
            </a>
            <a className="sb-cta-ghost" href="https://github.com/alisaeed786-hub/healthy-humans" target="_blank" rel="noopener noreferrer">
              View the code
            </a>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            {/* Top */}
            <section id="top" className="section-block top-block">
              <div className="status-row">
                <span className="status-dot" />
                Live product &middot; in active use
              </div>
              <h1 className="top-title">ProductProof</h1>
              <p className="top-tagline">A readiness engine for product tickets</p>
              <p className="top-lede">
                ProductProof reads a Jira ticket the way an experienced engineer
                would in refinement &mdash; checking every claim against what the
                team has actually documented, and separating what&apos;s confirmed
                from what&apos;s been assumed. The result is a clear verdict: ready,
                needs review, or not ready &mdash; with the specific gaps named,
                not implied.
              </p>
              <div className="top-links">
                <a className="top-link top-link-primary" href="https://healthy-humans.vercel.app" target="_blank" rel="noopener noreferrer">
                  Try the live demo
                </a>
                <a className="top-link top-link-secondary" href="https://github.com/alisaeed786-hub/healthy-humans" target="_blank" rel="noopener noreferrer">
                  View the code
                </a>
              </div>

              <div className="stat-row">
                <div>
                  <div className="stat-num">3</div>
                  <div className="stat-label">specialized agents, each with one job</div>
                </div>
                <div>
                  <div className="stat-num">10</div>
                  <div className="stat-label">distinct compliance gaps caught on a single test ticket</div>
                </div>
                <div>
                  <div className="stat-num">0</div>
                  <div className="stat-label">facts invented &mdash; every verified claim is traceable to a source</div>
                </div>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="section-block">
              <p className="eyebrow">The Problem</p>
              <p className="lede">
                Most tickets fail quietly. They read as complete &mdash; clear user
                story, reasonable acceptance criteria &mdash; but somewhere inside
                them is a claim nobody actually checked. <b>&ldquo;The system will
                notify the user by SMS&rdquo;</b> sounds like a requirement. If the
                team&apos;s own documentation says SMS is opt-in only, or that no
                PHI can appear in a message body, that line isn&apos;t a
                requirement &mdash; it&apos;s an assumption wearing the costume
                of one.
              </p>
              <p className="lede">
                These gaps almost never get caught in planning, because planning
                runs on trust and time pressure. They get caught mid-sprint, by an
                engineer who has to stop and ask, or worse, after the fact, by
                whoever reviews for compliance. By then the cost has already moved
                from &ldquo;a few minutes in refinement&rdquo; to &ldquo;rework
                after code is written.&rdquo;
              </p>
              <p className="lede">
                ProductProof exists to move that check earlier &mdash; to the
                moment a ticket is written, not the moment it&apos;s built.
              </p>
            </section>

            {/* System */}
            <section id="system" className="section-block">
              <p className="eyebrow">The System</p>
              <p className="lede" style={{ marginBottom: 36 }}>
                Three agents, run in sequence, each with a single responsibility.
                No single model is asked to read the ticket, check it, and rewrite
                it all at once &mdash; that produces confident-sounding output
                that&apos;s much harder to verify.
              </p>

              <div className="step">
                <span className="step-num">01</span>
                <div>
                  <div className="step-title">Structural check</div>
                  <p className="step-desc">
                    Before anything else, the ticket is checked on its own terms:
                    is this written as a real user story, are the acceptance
                    criteria testable, is the scope actually defined. This catches
                    the basics independent of any external documentation.
                  </p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">02</span>
                <div>
                  <div className="step-title">Verification against documentation</div>
                  <p className="step-desc">
                    Every significant claim in the ticket is checked against the
                    team&apos;s own source material &mdash; architecture decisions,
                    compliance constraints, prior product calls. A claim is only
                    marked <b style={{ color: '#6FD6A8' }}>verified</b> if an exact
                    sentence in the documentation backs it up. Everything else is
                    marked <b style={{ color: '#F2B66D' }}>assumed</b>, including
                    claims that sound entirely reasonable.
                  </p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">03</span>
                <div>
                  <div className="step-title">Rewrite, using only what was verified</div>
                  <p className="step-desc">
                    The ticket is rewritten to fix structural issues &mdash; but
                    this step never sees the list of assumed claims, only the
                    verified ones. That constraint is deliberate: it&apos;s the
                    difference between a rewrite that&apos;s clean and one that&apos;s
                    actually trustworthy.
                  </p>
                </div>
              </div>
            </section>

            {/* Readiness model */}
            <section id="model" className="section-block">
              <p className="eyebrow">Readiness Model</p>
              <p className="lede">
                The output isn&apos;t a quality score. A number like 72 doesn&apos;t
                tell a PM what to fix or how urgent it is. Instead, every ticket
                gets a verdict, driven directly by how many claims couldn&apos;t
                be verified:
              </p>

              <div className="verdict-grid">
                <div className="verdict-card verdict-ready">
                  <div className="verdict-label">Ready</div>
                  <div className="verdict-desc">0&ndash;1 unverified claims. Safe to bring into planning as written.</div>
                </div>
                <div className="verdict-card verdict-caution">
                  <div className="verdict-label">Needs review</div>
                  <div className="verdict-desc">2&ndash;3 unverified claims. Worth a second pass before commitment.</div>
                </div>
                <div className="verdict-card verdict-blocked">
                  <div className="verdict-label">Not ready</div>
                  <div className="verdict-desc">4+ unverified claims. Should not enter a sprint as is.</div>
                </div>
              </div>
            </section>

            {/* Evidence */}
            <section id="evidence" className="section-block">
              <p className="eyebrow">Evidence</p>
              <p className="lede" style={{ marginBottom: 32 }}>
                Three real test tickets, run through the system as written &mdash;
                no edits, no cherry-picking the output.
              </p>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-33</span>
                  <span className="ticket-verdict tv-not-ready">Not ready &middot; 10 unverified</span>
                </div>
                <p className="ticket-summary">
                  &ldquo;As a parent, I want to see my 14-year-old&apos;s full medical
                  record, including mental health notes, so I can monitor their health.&rdquo;
                </p>
                <div className="check-row">
                  <span className="check-icon check-assumed">!</span>
                  <p className="check-text">
                    <b>Full record access for a minor&apos;s proxy</b> &mdash; the
                    team&apos;s own access policy explicitly scopes proxy access to
                    the minimum necessary, not the full record.
                  </p>
                </div>
                <div className="check-row">
                  <span className="check-icon check-assumed">!</span>
                  <p className="check-text">
                    <b>Mental health notes included</b> &mdash; no documentation
                    supports exposing this category to a proxy account.
                  </p>
                </div>
                <div className="check-row">
                  <span className="check-icon check-assumed">!</span>
                  <p className="check-text">
                    <b>No age restriction stated</b> &mdash; contradicts the
                    documented age-based access rules for minors.
                  </p>
                </div>
              </div>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-22</span>
                  <span className="ticket-verdict tv-caution">Needs review &middot; 2 unverified</span>
                </div>
                <p className="ticket-summary">
                  &ldquo;As a patient, I want to cancel or reschedule an appointment
                  online without calling the clinic.&rdquo;
                </p>
                <div className="check-row">
                  <span className="check-icon check-verified">&#10003;</span>
                  <p className="check-text">
                    <b>Cancellation window</b> &mdash; matches the documented
                    24-hour cancellation policy exactly.
                  </p>
                </div>
                <div className="check-row">
                  <span className="check-icon check-assumed">!</span>
                  <p className="check-text">
                    <b>Rescheduling fee waiver</b> &mdash; no documentation
                    confirms whether a fee applies on reschedule.
                  </p>
                </div>
              </div>

              <div className="ticket-card">
                <div className="ticket-head">
                  <span className="ticket-id">SCRUM-11</span>
                  <span className="ticket-verdict tv-ready">Ready &middot; 0 unverified</span>
                </div>
                <p className="ticket-summary">
                  &ldquo;As a patient, I want to view my upcoming appointments so I
                  can plan around them.&rdquo;
                </p>
                <div className="check-row">
                  <span className="check-icon check-verified">&#10003;</span>
                  <p className="check-text">
                    <b>Every claim in the ticket</b> &mdash; traced directly to
                    documented scheduling and display behavior. No gaps found.
                  </p>
                </div>
              </div>
            </section>

            {/* Decisions */}
            <section id="decisions" className="section-block">
              <p className="eyebrow">Decisions</p>

              <div className="decision">
                <span className="decision-tag chose">I chose</span>
                <p className="decision-text">
                  <b>To withhold the assumed list from the rewrite step.</b> Early
                  versions passed everything to the final agent, on the
                  assumption that more context would produce a better rewrite.
                  In practice, the model would quietly treat assumed claims as
                  settled fact. Removing them from that step&apos;s context was a
                  simpler and more reliable fix than trying to prompt around the
                  behavior.
                </p>
              </div>

              <div className="decision">
                <span className="decision-tag rejected">I considered, then rejected</span>
                <p className="decision-text">
                  <b>A single confidence score per ticket.</b> It&apos;s the
                  obvious first design. But a score doesn&apos;t tell a PM which
                  part of the ticket is the problem, or what to go check. Naming
                  the specific unverified claims does both.
                </p>
              </div>

              <div className="decision">
                <span className="decision-tag chose">I chose</span>
                <p className="decision-text">
                  <b>To require an exact source sentence for anything marked
                  verified.</b> A looser standard &mdash; &ldquo;this seems
                  consistent with the docs&rdquo; &mdash; would have produced more
                  green checkmarks and fewer real findings. The stricter bar
                  produces fewer verified claims, but every one of them can be
                  defended in a planning meeting.
                </p>
              </div>
            </section>

            {/* Next */}
            <section id="next" className="section-block">
              <p className="eyebrow">What&rsquo;s Next</p>
              <div className="next-item">
                <span className="next-bullet" />
                <p className="next-text">
                  <b>Multi-team rollout.</b> The current version is built against
                  one team&apos;s documentation set. Generalizing the verification
                  step to work across teams with different documentation
                  structures is the next real test of the approach.
                </p>
              </div>
              <div className="next-item">
                <span className="next-bullet" />
                <p className="next-text">
                  <b>Confidence in the &ldquo;ready&rdquo; verdict.</b> Right now,
                  a low assumed-claim count is treated as ready. I want to stress
                  test that threshold against tickets that are technically
                  well-documented but still wrong in practice.
                </p>
              </div>
              <div className="next-item">
                <span className="next-bullet" />
                <p className="next-text">
                  <b>Closing the loop back into the docs.</b> Right now
                  ProductProof reads documentation but doesn&apos;t flag where the
                  documentation itself is incomplete. A ticket with five
                  unverifiable claims might mean the ticket is bad &mdash; or it
                  might mean the docs haven&apos;t caught up.
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  )
}
