'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'intro', label: 'How I got here' },
  { id: 'tenx', label: '10x Health' },
  { id: 'hntb', label: 'HNTB' },
  { id: 'craft', label: 'How I work' },
]

export default function Experience() {
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
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
        body { background: #15171D; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; }
        .layout { display: flex; min-height: 100vh; }

        .sidebar {
          width: 268px; flex-shrink: 0; position: fixed; top: 0; left: 0;
          height: 100vh; padding: 44px 32px; display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6E7480; text-decoration: none; margin-bottom: 32px; transition: color 160ms ease; }
        .sb-back:hover { color: #C9C3B6; }
        .sb-section-title { font-size: 28px; font-weight: 600; letter-spacing: -0.03em; color: #F2EEE7; margin-bottom: 48px; line-height: 1.1; }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; }
        .sb-link { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 7px; font-size: 13.5px; color: #6E7480; cursor: pointer; background: none; border: none; text-align: left; font-family: inherit; transition: color 160ms ease, background 160ms ease; }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-link.active { color: #F2EEE7; background: rgba(139,158,255,0.1); }
        .sb-dot { width: 5px; height: 5px; border-radius: 50%; background: #383C46; flex-shrink: 0; transition: background 160ms ease, box-shadow 160ms ease; }
        .sb-link.active .sb-dot { background: #8B9EFF; box-shadow: 0 0 8px rgba(139,158,255,0.65); }
        .sb-footer { margin-top: auto; }
        .sb-name { font-size: 13px; color: #565B65; }

        .main { margin-left: 268px; flex: 1; min-width: 0; }
        .wrap { max-width: 720px; margin: 0 auto; padding: 0 60px; }

        .block { min-height: auto; display: flex; flex-direction: column; padding: 56px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .block:last-child { border-bottom: none; }

        .eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9C3B6; opacity: 0.45; margin-bottom: 24px; }
        .block-title { font-size: 32px; font-weight: 600; letter-spacing: -0.03em; color: #F2EEE7; margin-bottom: 8px; }
        .block-role { font-size: 15px; color: #8B9EFF; margin-bottom: 12px; }
        .block-dates { font-size: 13px; color: #565B65; margin-bottom: 36px; }
        .narrative { font-size: 17px; color: #C9C3B6; line-height: 1.85; letter-spacing: -0.005em; margin-bottom: 24px; max-width: 640px; }
        .narrative:last-child { margin-bottom: 0; }
        .narrative b { color: #F2EEE7; font-weight: 500; }

        .highlight-list { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06); }
        .highlight { display: flex; gap: 14px; align-items: flex-start; }
        .h-dot { width: 4px; height: 4px; border-radius: 50%; background: #8B9EFF; flex-shrink: 0; margin-top: 10px; }
        .h-text { font-size: 15px; color: #AAB4C0; line-height: 1.7; }
        .h-text b { color: #C9C3B6; font-weight: 500; }

        .story-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #F2B66D; margin-bottom: 16px; margin-top: 40px; }
        .story-label:first-child { margin-top: 0; }

        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 40px 0; }

        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 32px; }
        .skill-group-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #565B65; margin-bottom: 10px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-tag { font-size: 12px; padding: 4px 10px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8A8C92; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 24px; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/">&larr; Back</Link>
          <div className="sb-section-title">Experience</div>
          <nav className="sb-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className={`sb-link ${active === s.id ? 'active' : ''}`} onClick={() => scrollTo(s.id)}>
                <span className="sb-dot" />{s.label}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <div className="sb-name">Ali Saeed</div>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            <div id="intro" className="block">
              <p className="eyebrow">How I got here</p>
              <p className="narrative">
                I studied Information Technology and Systems at UT Dallas, which gave me just enough technical grounding to be dangerous in a product role. I understood how systems were built, which meant I could sit with engineers and talk through the details rather than hand over a document and hope for the best.
              </p>
              <p className="narrative">
                What pulled me toward product management was not a plan. It was a pattern I kept noticing. In every room I was in, there was always a missing piece, something nobody had said yet that changed the whole picture once it was named. I realized at some point that finding that piece and doing something useful with it was what I actually wanted to spend my time on. Product management was the role that made that the job.
              </p>
              <p className="narrative">
                I started in transit technology at a large government agency, where I learned that stakeholder alignment is its own engineering problem. Then moved into healthtech, where I learned what it actually means to build from scratch with real stakes. Those two environments shaped everything about how I work.
              </p>
            </div>

            <div id="tenx" className="block">
              <p className="eyebrow">2023 — Present</p>
              <h2 className="block-title">10x Health System</h2>
              <p className="block-role">Product Manager, Platform and API Operations</p>
              <p className="block-dates">Remote — Healthtech, 300 employees</p>

              <p className="narrative">
                I joined 10x Health as the person responsible for figuring out what the platform should measure and making sure it actually did. There was no framework, no documentation, no one who had done this before me. A six-product operation, six concurrent workstreams, and a live system where a wrong data point did not just break a report. It meant the wrong order shipped to a real patient.
              </p>
              <p className="narrative">
                The first thing I did was define what mattered. Not at a dashboard level but at the individual event level. Which order state changes needed to be captured. Which delivery milestones needed timestamps. What a valid record looked like versus a corrupted one. I wrote the requirements for engineering to instrument each data point, then validated that the captured data was accurate at the record level before it touched any downstream system. That work is invisible when it goes right and catastrophic when it does not.
              </p>
              <p className="narrative">
                I was also the person engineers came to when something broke at scale. When a critical ecommerce API failure took down Salesforce order sync across a live operation, I coordinated triage across thirty people and restored service in under a day. There was no playbook. I built the response in real time.
              </p>

              <div className="highlight-list">
                <div className="highlight"><span className="h-dot" /><p className="h-text">Built Salesforce-integrated order routing logic that kept data consistent across CRM, 3PL, and lab systems in real time. Scaled it from one product to four after the first deployment held.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text">Owned the Hyros attribution integration end to end, wrote engineering requirements for spend-to-revenue instrumentation, and delivered the reporting layer leadership used to track ROAS across all paid channels.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text"><b>Accelerated a high-priority API integration</b> to ship in one-third its projected timeline with zero scope surprises, doubling sprint velocity and establishing the delivery model adopted across all subsequent platform initiatives.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text">Built CAB governance and Jira intake framework from scratch. Cut ad-hoc escalations and improved on-time delivery by 25%.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text">Worked directly with the customer success team on escalated support calls, read tickets to understand where the product was breaking down in practice, and designed flows from real pain points. Built a system to aggregate reviews across third-party platforms for root cause analysis at scale.</p></div>
              </div>
            </div>

            <div id="hntb" className="block">
              <p className="eyebrow">2020 — 2023</p>
              <h2 className="block-title">HNTB / Washington Metro</h2>
              <p className="block-role">Product Manager, Transit Technology</p>
              <p className="block-dates">Washington DC Metro Area — Transit, 200-person PMO</p>

              <p className="narrative">
                Working inside a government transit agency is a different kind of hard. The technical problems are solvable. The organizational ones are not, at least not quickly. Every stakeholder has a different definition of done and a different reason why the previous approach did not work. Your job is to earn enough trust from enough of them that things actually move.
              </p>
              <p className="narrative">
                The biggest thing I did there was convince C-suite leadership to launch the agency's first Agile adoption across a 200-person PMO. That was not a technical decision. It was a change management project that required months of relationship building before a single process changed. When it did, it changed how every technology initiative at the agency was planned and delivered.
              </p>
              <p className="narrative">
                I also owned executive reporting for transit technology programs, presenting delivery status, risks, and milestone updates directly to C-suite and Washington Metro agency leadership. Presenting to a room of executives who have seen every project fail before means learning how to be precise, honest about risk, and confident without overpromising. I got good at that.
              </p>

              <div className="highlight-list">
                <div className="highlight"><span className="h-dot" /><p className="h-text">Secured C-suite approval to launch the agency's first Agile adoption across a 200-person PMO, directly driving the framework rollout.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text">Built a UAT framework from scratch that cut testing cycles by 15% within 14 days of launch through structured cross-team training and reusable documentation.</p></div>
                <div className="highlight"><span className="h-dot" /><p className="h-text">Owned executive reporting for transit technology programs, presenting directly to C-suite and Washington Metro agency leadership.</p></div>
              </div>
            </div>

            <div id="craft" className="block">
              <p className="eyebrow">How I work</p>

              <p className="story-label">A real example of how I make calls</p>
              <p className="narrative">
                At 10x Health, leadership wanted to launch a product called Bring Your Own Blood. The concept was simple: a patient uploads their existing lab results and we qualify them for our products based on what they submit. The ask was reasonable on the surface. The problem was the price point. We were asking someone to pay $399 for a possibility.
              </p>
              <p className="narrative">
                I pushed back, but not with an opinion. I went looking for comparable products in the market and found none. No one was doing this at that price point, which either meant we had discovered something or we were about to learn why nobody had tried. We ran a paid ad campaign across platforms specifically to gauge interest, measuring views, clicks, and conversion intent across our actual demographic. The numbers came back flat.
              </p>
              <p className="narrative">
                The product did not ship. That is not a story about being right. It is a story about what happens when you go find the data instead of debating the idea. In environments where everything feels urgent and leadership has strong opinions, that instinct is the most useful thing I bring to a room.
              </p>

              <div className="divider" />

              <p className="story-label">Skills and tooling</p>
              <div className="skills-grid">
                <div>
                  <div className="skill-group-label">Data and measurement</div>
                  <div className="skill-tags">
                    <span className="skill-tag">Power BI</span>
                    <span className="skill-tag">Tableau</span>
                    <span className="skill-tag">Mixpanel</span>
                    <span className="skill-tag">Amplitude</span>
                    <span className="skill-tag">SQL</span>
                  </div>
                </div>
                <div>
                  <div className="skill-group-label">Systems and integrations</div>
                  <div className="skill-tags">
                    <span className="skill-tag">Salesforce</span>
                    <span className="skill-tag">EHR API</span>
                    <span className="skill-tag">Hyros</span>
                    <span className="skill-tag">Azure DevOps</span>
                  </div>
                </div>
                <div>
                  <div className="skill-group-label">AI tooling</div>
                  <div className="skill-tags">
                    <span className="skill-tag">Claude</span>
                    <span className="skill-tag">ChatGPT</span>
                    <span className="skill-tag">GitHub Copilot</span>
                    <span className="skill-tag">Cursor</span>
                  </div>
                </div>
                <div>
                  <div className="skill-group-label">Product ops</div>
                  <div className="skill-tags">
                    <span className="skill-tag">Jira</span>
                    <span className="skill-tag">Confluence</span>
                    <span className="skill-tag">Figma</span>
                    <span className="skill-tag">Linear</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
