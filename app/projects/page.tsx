'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Projects() {
  return (
    <>
      <Navbar />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #15171D; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; }
        .layout { display: flex; min-height: 100vh; }

        .sidebar {
          width: 268px; flex-shrink: 0; position: fixed; top: 0; left: 0;
          height: 100vh; padding: 44px 32px; display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6E7480; text-decoration: none; margin-bottom: 32px; transition: color 160ms ease; }
        .sb-back:hover { color: #C9C3B6; }
        .sb-section-title { font-size: 28px; font-weight: 600; letter-spacing: -0.03em; color: #F2EEE7; margin-bottom: 16px; line-height: 1.1; }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; }
        .sb-nav-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #565B65; padding: 0 10px; margin-bottom: 4px; margin-top: 32px; }
        .sb-link { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 7px; font-size: 13.5px; color: #6E7480; text-decoration: none; transition: color 160ms ease, background 160ms ease; }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-dot { width: 5px; height: 5px; border-radius: 50%; background: #383C46; flex-shrink: 0; }
        .sb-footer { margin-top: auto; }
        .sb-name { font-size: 13px; color: #565B65; }

        .main { margin-left: 268px; flex: 1; min-width: 0; }
        .wrap { max-width: 720px; margin: 0 auto; padding: 80px 60px; }

        .eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9C3B6; opacity: 0.45; margin-bottom: 48px; }

        .project-card {
          background: #1C1F27; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 36px 32px; margin-bottom: 20px;
          position: relative; overflow: hidden;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }
        .project-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #8B9EFF, #F2B66D); opacity: 0; transition: opacity 220ms ease; }
        .project-card:hover { transform: translateY(-3px); border-color: rgba(139,158,255,0.28); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        .project-card:hover::after { opacity: 1; }

        .project-status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6FD6A8; margin-bottom: 16px; }
        .project-dot { width: 5px; height: 5px; border-radius: 50%; background: #6FD6A8; }
        .project-title { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 8px; }
        .project-tagline { font-size: 14px; color: #8B9EFF; margin-bottom: 16px; }
        .project-desc { font-size: 15.5px; color: #AAB4C0; line-height: 1.75; margin-bottom: 24px; max-width: 560px; }

        .project-meta { display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); }
        .meta-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #565B65; margin-bottom: 5px; }
        .meta-value { font-size: 13.5px; color: #C9C3B6; }

        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .tag { font-size: 11px; padding: 4px 10px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8A8C92; }

        .project-links { display: flex; gap: 10px; flex-wrap: wrap; }
        .project-link { font-size: 13.5px; font-weight: 500; padding: 10px 18px; border-radius: 7px; text-decoration: none; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
        .project-link-primary { background: #8B9EFF; color: #15171D; }
        .project-link-primary:hover { background: #A4B3FF; }
        .project-link-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6; }
        .project-link-secondary:hover { border-color: rgba(255,255,255,0.28); color: #F2EEE7; }

        .coming-soon { border: 1px dashed rgba(255,255,255,0.12); border-radius: 12px; padding: 40px 32px; text-align: center; }
        .cs-title { font-size: 16px; color: #6E7480; margin-bottom: 8px; }
        .cs-sub { font-size: 14px; color: #3A4A5A; line-height: 1.65; max-width: 400px; margin: 0 auto; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 60px 24px; }
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/">&larr; Back</Link>
          <div className="sb-section-title">Projects</div>
          <div className="sb-nav-label">ProductProof</div>
          <nav className="sb-nav">
            <Link className="sb-link" href="/work/productproof">
              <span className="sb-dot" />Overview
            </Link>
            <Link className="sb-link" href="/work/productproof/docs">
              <span className="sb-dot" />Technical Docs
            </Link>
          </nav>
          <div className="sb-nav-label">SmartKartAI</div>
          <nav className="sb-nav">
            <Link className="sb-link" href="/work/smartkartai">
              <span className="sb-dot" />Overview
            </Link>
          </nav>
          <div className="sb-footer">
            <div className="sb-name">Ali Saeed</div>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">
            <p className="eyebrow">Selected work</p>

            <div className="project-card">
              <div className="project-status"><span className="project-dot" />Live Product</div>
              <div className="project-title">ProductProof</div>
              <div className="project-tagline">Prove every ticket before you build it</div>
              <p className="project-desc">
                An AI verification system for product tickets. Three specialized agents check every claim in a Jira ticket against a team's own documentation, separating what is confirmed from what is assumed before a ticket reaches sprint planning. Built end to end, deployed, and running on real tickets.
              </p>
              <div className="project-meta">
                <div>
                  <div className="meta-label">Problem</div>
                  <div className="meta-value">Assumptions reaching engineering disguised as requirements</div>
                </div>
                <div>
                  <div className="meta-label">Approach</div>
                  <div className="meta-value">Multi-agent verification, not generation</div>
                </div>
                <div>
                  <div className="meta-label">Stack</div>
                  <div className="meta-value">Next.js, Claude, Jira and Confluence APIs</div>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Multi-agent systems</span>
                <span className="tag">RAG</span>
                <span className="tag">Jira API</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Vercel</span>
              </div>
              <div className="project-links">
                <Link className="project-link project-link-primary" href="/work/productproof">View project</Link>
                <a className="project-link project-link-secondary" href="https://healthy-humans.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo</a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-status"><span className="project-dot" />Live Product</div>
              <div className="project-title">SmartKartAI</div>
              <div className="project-tagline">The cheapest grocery run, planned for you</div>
              <p className="project-desc">
                An AI-powered shopping list optimizer that learns your preferences and finds the cheapest store for your personalized grocery list. It turns a static list into a living plan, comparing prices across stores and adapting recommendations as your habits change, so every trip costs less without extra effort.
              </p>
              <div className="project-meta">
                <div>
                  <div className="meta-label">Problem</div>
                  <div className="meta-value">Grocery lists are static and ignore where prices are actually lowest</div>
                </div>
                <div>
                  <div className="meta-label">Approach</div>
                  <div className="meta-value">Preference learning plus cross-store price comparison</div>
                </div>
                <div>
                  <div className="meta-label">Stack</div>
                  <div className="meta-value">Next.js, AI-powered recommendations, Vercel</div>
                </div>
              </div>
              <div className="tags">
                <span className="tag">AI recommendations</span>
                <span className="tag">Personalization</span>
                <span className="tag">Price comparison</span>
                <span className="tag">Next.js</span>
                <span className="tag">Vercel</span>
              </div>
              <div className="project-links">
                <Link className="project-link project-link-primary" href="/work/smartkartai">View project</Link>
                <a className="project-link project-link-secondary" href="https://smartkartai-six.vercel.app" target="_blank" rel="noopener noreferrer">Try the live demo</a>
              </div>
            </div>

            <div className="coming-soon">
              <div className="cs-title">More coming</div>
              <p className="cs-sub">Additional case studies in progress. Each one takes time to document properly.</p>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
