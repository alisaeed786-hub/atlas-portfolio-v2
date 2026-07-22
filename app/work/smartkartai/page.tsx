'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SECTIONS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'landscape', label: 'Why Others Fail' },
  { id: 'system', label: 'The Pipeline' },
  { id: 'trust', label: 'Preference Learning' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'tradeoffs', label: 'Tradeoffs' },
  { id: 'learned', label: 'What I Learned' },
  { id: 'next', label: 'What\'s Next' },
]

export default function SmartKartAICaseStudy() {
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

        /* Landscape cards */
        .landscape-list { display: flex; flex-direction: column; gap: 2px; margin-top: 8px; }
        .landscape-item { padding: 22px 24px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .landscape-name { font-size: 15px; font-weight: 600; color: #F2EEE7; margin-bottom: 6px; }
        .landscape-desc { font-size: 15px; color: #AAB4C0; line-height: 1.7; }

        /* Agents / pipeline */
        .agent-list { display: flex; flex-direction: column; gap: 2px; margin-top: 8px; }
        .agent { display: grid; grid-template-columns: 90px 1fr; gap: 20px; align-items: start; padding: 24px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .agent-num { font-size: 11px; font-family: ui-monospace, 'SF Mono', monospace; color: #565B65; letter-spacing: 0.04em; padding-top: 3px; }
        .agent-title { font-size: 17px; font-weight: 600; color: #F2EEE7; letter-spacing: -0.015em; margin-bottom: 8px; }
        .agent-desc { font-size: 15px; color: #AAB4C0; line-height: 1.7; }

        /* Trust stages */
        .stage-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px; }
        .stage { border-radius: 10px; padding: 22px 18px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); }
        .stage-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 10px; }
        .stage-title { font-size: 16px; font-weight: 600; color: #F2EEE7; margin-bottom: 8px; }
        .stage-desc { font-size: 13px; color: #AAB4C0; line-height: 1.55; }

        /* Stat callout */
        .stat-callout { background: #13161C; border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #6FD6A8; border-radius: 0 8px 8px 0; padding: 20px 24px; margin-bottom: 14px; }
        .stat-callout-num { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; color: #6FD6A8; margin-bottom: 4px; font-family: ui-monospace, 'SF Mono', monospace; }
        .stat-callout-text { font-size: 14px; color: #AAB4C0; line-height: 1.55; }

        /* Decisions / tradeoffs */
        .decision-list { display: flex; flex-direction: column; gap: 2px; }
        .decision { padding: 28px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
        .decision-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; color: #6FD6A8; }
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
          .stage-grid { grid-template-columns: 1fr; }
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
          <div className="sb-section-title">SmartKartAI</div>
          <nav className="sb-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className={`sb-link ${active === s.id ? 'active' : ''}`} onClick={() => scrollTo(s.id)}>
                <span className="sb-dot" />{s.label}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <a className="sb-cta" href="https://smartkartai-six.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo</a>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            {/* Hero */}
            <div className="hero">
              <div className="hero-status"><span className="hero-status-dot" />Live Product</div>
              <h1 className="hero-title">SmartKartAI</h1>
              <p className="hero-tagline">The cheapest grocery run, planned for you</p>
              <p className="hero-lede">
                Every week I spent 30 to 45 minutes comparing prices across Kroger, Walmart, HEB, and Aldi before deciding where to shop. SmartKartAI does that comparison in about 30 seconds — it reads a plain-language grocery list, prices it across five retailers at once, and pushes a ready-to-checkout cart to whichever store wins.
              </p>
              <div className="hero-links">
                <a className="hero-link hero-link-primary" href="https://smartkartai-six.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo →</a>
              </div>
              <div className="stat-row">
                <div className="stat-cell">
                  <div className="stat-num green">~15s</div>
                  <div className="stat-label">Pipeline time, down from ~60s sequential</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num amber">1–2</div>
                  <div className="stat-label">Claude API calls per session, down from 10+</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num violet">$1–2</div>
                  <div className="stat-label">Total monthly infrastructure cost</div>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div id="problem" className="block">
              <p className="block-title">The Problem</p>
              <p className="narrative">
                I knew Aldi was usually cheapest for staples, Kroger had better meat, Walmart had rollback deals that changed weekly, and HEB had good produce prices. Figuring out which store was actually cheapest for my specific list required checking four apps manually and doing mental math — every single week.
              </p>
              <p className="narrative">
                No app solved this. Existing grocery apps show you deals; none of them optimize your specific basket across all nearby stores and push a cart to the winner. I built SmartKartAI to solve it for myself.
              </p>
            </div>

            {/* Landscape */}
            <div id="landscape" className="block">
              <p className="block-title">Why Existing Solutions Fail</p>
              <div className="landscape-list">
                <div className="landscape-item">
                  <div className="landscape-name">Flipp</div>
                  <div className="landscape-desc">Shows weekly circulars only — missing 80%+ of everyday items, and can&apos;t tell you which store is cheapest for a full basket.</div>
                </div>
                <div className="landscape-item">
                  <div className="landscape-name">GroceryChop</div>
                  <div className="landscape-desc">Closest to what I wanted, with live prices from 100+ stores. But no cart push, no preference learning, and no optimization for a specific list.</div>
                </div>
                <div className="landscape-item">
                  <div className="landscape-name">Kroger app</div>
                  <div className="landscape-desc">Great for Kroger. Useless for price comparison across stores.</div>
                </div>
                <div className="landscape-item">
                  <div className="landscape-name">Instacart</div>
                  <div className="landscape-desc">Compares prices but charges delivery fees that wipe out any savings — not designed for in-store shopping.</div>
                </div>
              </div>
              <p className="narrative" style={{ marginTop: 24 }}>
                The gap: true basket-level price optimization across stores with automatic cart push to the winner.
              </p>
            </div>

            {/* System / Pipeline */}
            <div id="system" className="block">
              <p className="block-title">The Pipeline</p>
              <p className="narrative">
                Kroger&apos;s official API and a stack of five free-tier search APIs run in parallel via <b>Promise.allSettled</b>, feeding a pure-math optimizer with zero Claude calls. Claude only touches the parts that genuinely need language understanding, batched into one to two calls per session.
              </p>
              <div className="agent-list">
                <div className="agent">
                  <span className="agent-num">Input</span>
                  <div className="agent-content">
                    <div className="agent-title">inputAgent.js</div>
                    <p className="agent-desc">Loads settings from Supabase in one batched query, takes a freeform grocery list, auto-fills trusted items silently, and makes one Claude call for anything unknown before confirming with the user.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Fetch</span>
                  <div className="agent-content">
                    <div className="agent-title">dataProcessor.js</div>
                    <p className="agent-desc">Fires Kroger API and the search router simultaneously for every item, matches products with one batched Claude call, detects genuine promos, and saves results to Supabase.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Optimize</span>
                  <div className="agent-content">
                    <div className="agent-title">matchOptimizer.js</div>
                    <p className="agent-desc">Pure math, zero Claude calls. Builds a complete basket per store, excludes stores missing any item, and ranks by total cost.</p>
                  </div>
                </div>
                <div className="agent">
                  <span className="agent-num">Output</span>
                  <div className="agent-content">
                    <div className="agent-title">outputAgent.js</div>
                    <p className="agent-desc">Final review screen, cart push via Kroger&apos;s API or Walmart deep link, and the shopping plan gets saved back to Supabase.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust / Preference learning */}
            <div id="trust" className="block">
              <p className="block-title">Preference Learning</p>
              <p className="narrative">
                A 3-stage trust system learns how you shop. After a few weeks of use, the entire list fills in automatically with no interaction required.
              </p>
              <div className="stage-grid">
                <div className="stage">
                  <div className="stage-badge">Stage 1</div>
                  <div className="stage-title">New item</div>
                  <div className="stage-desc">Claude generates size and type options. User picks one, saved to user_preferences.</div>
                </div>
                <div className="stage">
                  <div className="stage-badge">Stage 2</div>
                  <div className="stage-title">Seen before</div>
                  <div className="stage-desc">App suggests the last preference. User confirms or adjusts.</div>
                </div>
                <div className="stage">
                  <div className="stage-badge">Stage 3</div>
                  <div className="stage-title">Established</div>
                  <div className="stage-desc">Auto-fills silently. No questions asked.</div>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div id="evidence" className="block">
              <p className="block-title">Evidence</p>
              <div className="stat-callout">
                <div className="stat-callout-num">$8.81 vs $16.81</div>
                <div className="stat-callout-text">Real savings found on the first live run: Walmart beat Kroger by nearly half on a 5-item basket.</div>
              </div>
              <div className="stat-callout">
                <div className="stat-callout-num">8/8</div>
                <div className="stat-callout-text">Pipeline tests passing.</div>
              </div>
              <div className="stat-callout">
                <div className="stat-callout-num">1,250 / ~60</div>
                <div className="stat-callout-text">Free search API capacity per month versus actual usage — headroom that also enables cross-source confidence scoring.</div>
              </div>
            </div>

            {/* Decisions */}
            <div id="decisions" className="block">
              <p className="block-title">Decisions That Mattered</p>
              <div className="decision-list">
                <div className="decision">
                  <div className="decision-tag">Stacking 5 free search APIs instead of one paid one</div>
                  <p className="decision-text">The plan was $50/month for SerpApi. Instead, five free-tier services stacked with a credit-tracking router give 1,250 free searches per month against ~60 actual uses — and running two sources in parallel became a confidence-scoring feature almost by accident.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">One batched Claude call, not one per item</div>
                  <p className="decision-text">Calling Claude once per grocery item was slow and expensive. Batching all items into a single request cut Claude calls to 1–2 per session regardless of list length and API cost by roughly 90%.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">Key/value settings table</div>
                  <p className="decision-text">Column-based settings meant an ALTER TABLE for every new setting. A key/value table means adding a setting is just inserting a row — no migrations, same read pattern for every agent.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">Vercel for frontend, Render for the pipeline</div>
                  <p className="decision-text">Vercel functions time out at 10 seconds with no persistent file system; the pipeline takes 15–20 seconds and needs to persist OAuth tokens. Tokens moved to Supabase, the pipeline moved to Render&apos;s persistent process — each service doing what it&apos;s actually built for.</p>
                </div>
              </div>
            </div>

            {/* Tradeoffs */}
            <div id="tradeoffs" className="block">
              <p className="block-title">Tradeoffs</p>
              <div className="decision-list">
                <div className="decision">
                  <div className="decision-tag">Supabase over Firebase</div>
                  <p className="decision-text">Basket pricing is genuinely relational — joining prices across items, stores, and confidence scores. Firebase&apos;s document model would&apos;ve meant denormalizing everything or multiple round trips. Cost: more upfront schema design.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">OAuth tokens: disk → Supabase</div>
                  <p className="decision-text">Render&apos;s ephemeral file system wiped tokens.json on every deploy. Moving tokens to a Supabase table also surfaced a timezone bug — Supabase&apos;s TIMESTAMP type strips the Z on round-trip, shifting expiry by 5–6 hours in Central time. Fixed by re-appending Z on read.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">bundleChecker.js: cancelled</div>
                  <p className="decision-text">Tested across 20 products (cereal, soup, Coca-Cola, Tillamook, and more) — Kroger&apos;s public API returns zero fields for bundle deals. Puppeteer against kroger.com was blocked by Akamai before reaching login. No legitimate path to the data, so the feature was cut rather than built on scraping.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">Walmart: search link, not cart link</div>
                  <p className="decision-text">A true add-to-cart deep link needs Walmart&apos;s internal product IDs, which Google Shopping results don&apos;t reliably include. Shipped a working search-link fallback over a broken full solution; extracting IDs from result URLs is the phase 2 fix.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">The basket total mismatch bug</div>
                  <p className="decision-text">Displayed item prices sometimes didn&apos;t sum to the shown basket total. The optimizer picked the cheapest match; the display code picked the first match. Fixed by sorting before display so both paths agree.</p>
                </div>
                <div className="decision">
                  <div className="decision-tag">Render cold starts: deferred</div>
                  <p className="decision-text">Free-tier Render sleeps after 15 minutes idle, so the first request of the week takes 50+ seconds. Acceptable for a weekly personal-use app; UptimeRobot pinging (or the AWS Lambda pre-fetch) is the fix if this becomes multi-user.</p>
                </div>
              </div>
            </div>

            {/* Learned */}
            <div id="learned" className="block">
              <p className="block-title">What I Learned</p>
              <p className="narrative">
                The most valuable Claude API decisions were about what <b>not</b> to ask Claude. Most of the pipeline is pure math and SQL — Claude only handles the parts that genuinely benefit from language understanding: interpreting a vague item name, normalizing product names across retailers, generating sensible size options. Knowing when AI adds value versus when it adds cost and latency is a core product skill.
              </p>
              <p className="narrative">
                Official APIs are always the right starting point. What Kroger&apos;s API exposes versus what I assumed it exposed turned out to be very different — and understanding that gap before designing dependent features saved a lot of wasted build time.
              </p>
              <p className="narrative">
                Five free-tier services, intelligently routed, produced better coverage and more resilience than one paid service would have. What started as a way to dodge a $50/month bill became a more sophisticated system than the original design — the redundancy became a verification feature.
              </p>
            </div>

            {/* Next */}
            <div id="next" className="block">
              <p className="block-title">What&apos;s Next</p>
              <div className="next-list">
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Scheduled price refresh via AWS Lambda.</b> Pre-fetch prices into Supabase every Wednesday night so the Render server skips live API calls — dropping response time from ~15s to 2–3s.</p>
                </div>
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Multi-user support.</b> Supabase Auth plus a user ID column on every table — the schema already anticipates this pattern.</p>
                </div>
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>HEB integration</b> via texas-grocery-mcp, an open source project that&apos;s already reverse-engineered HEB&apos;s GraphQL API.</p>
                </div>
                <div className="next-item">
                  <span className="next-dot" />
                  <p className="next-text"><b>Text-based interface.</b> A Telegram or WhatsApp trigger so the experience becomes: text your list, get your optimized plan back — same backend, different surface.</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
