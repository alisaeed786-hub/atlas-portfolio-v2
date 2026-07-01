'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem Statement' },
  { id: 'architecture', label: 'System Architecture' },
  { id: 'agents', label: 'Agent Design' },
  { id: 'guardrails', label: 'Guardrails' },
  { id: 'datamodel', label: 'Data Model' },
  { id: 'readiness', label: 'Readiness Model' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'prd', label: 'PRD' },
  { id: 'releases', label: 'Release Notes' },
]

export default function ProductProofDocs() {
  const [active, setActive] = useState('overview')

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0D0F14; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .layout { display: flex; min-height: 100vh; padding-top: 64px; }

        .sidebar {
          width: 260px; flex-shrink: 0; position: fixed;
          top: 64px; left: 0; height: calc(100vh - 64px);
          padding: 32px 24px; display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
          overflow-y: auto;
        }
        .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6E7480; text-decoration: none; margin-bottom: 24px; transition: color 160ms ease; }
        .sb-back:hover { color: #C9C3B6; }
        .sb-product { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 4px; }
        .sb-title { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 24px; }
        .sb-nav { display: flex; flex-direction: column; gap: 1px; }
        .sb-link { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; font-size: 13px; color: #6E7480; cursor: pointer; background: none; border: none; text-align: left; font-family: inherit; transition: color 160ms ease, background 160ms ease; }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-link.active { color: #F2EEE7; background: rgba(139,158,255,0.1); }
        .sb-dot { width: 4px; height: 4px; border-radius: 50%; background: #383C46; flex-shrink: 0; transition: background 160ms ease; }
        .sb-link.active .sb-dot { background: #8B9EFF; }
        .sb-footer { margin-top: auto; padding-top: 20px; display: flex; flex-direction: column; gap: 8px; }
        .sb-cta { font-size: 12px; font-weight: 600; text-align: center; padding: 9px; border-radius: 7px; text-decoration: none; background: #8B9EFF; color: #0D0F14; }
        .sb-cta-ghost { font-size: 12px; text-align: center; padding: 9px; border-radius: 7px; text-decoration: none; border: 1px solid rgba(255,255,255,0.12); color: #C9C3B6; }

        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 760px; margin: 0 auto; padding: 48px 52px 80px; }

        .doc-block { padding: 52px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .doc-block:first-child { padding-top: 0; }
        .doc-block:last-child { border-bottom: none; }

        .section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 16px; }
        .section-title { font-size: 24px; font-weight: 600; letter-spacing: -0.025em; color: #F2EEE7; margin-bottom: 20px; line-height: 1.2; }
        .prose { font-size: 16px; color: #C9C3B6; line-height: 1.8; letter-spacing: -0.005em; margin-bottom: 16px; }
        .prose:last-child { margin-bottom: 0; }
        .prose b { color: #F2EEE7; font-weight: 500; }

        .code-block { background: #13161C; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px 24px; margin: 20px 0; font-family: ui-monospace, 'SF Mono', monospace; font-size: 13px; color: #AAB4C0; line-height: 1.7; overflow-x: auto; }
        .code-block .key { color: #8B9EFF; }
        .code-block .val { color: #6FD6A8; }
        .code-block .comment { color: #565B65; }
        .code-block .type { color: #F2B66D; }

        .doc-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
        .doc-table th { text-align: left; padding: 10px 14px; background: #13161C; color: #8B9EFF; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .doc-table td { padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #C9C3B6; vertical-align: top; }
        .doc-table tr:last-child td { border-bottom: none; }
        .doc-table td:first-child { color: #F2EEE7; font-weight: 500; white-space: nowrap; }

        .agent-card { background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 20px 22px; margin-bottom: 10px; }
        .agent-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px; }
        .agent-num { font-family: ui-monospace, 'SF Mono', monospace; font-size: 11px; color: #565B65; }
        .agent-name { font-size: 16px; font-weight: 600; color: #F2EEE7; letter-spacing: -0.01em; }
        .agent-row { display: grid; grid-template-columns: 70px 1fr; gap: 8px; margin-bottom: 6px; font-size: 13.5px; }
        .agent-row:last-child { margin-bottom: 0; }
        .agent-row-label { color: #565B65; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding-top: 2px; }
        .agent-row-val { color: #AAB4C0; line-height: 1.55; }

        .guardrail { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); align-items: flex-start; }
        .guardrail:last-child { border-bottom: none; }
        .guardrail-num { font-family: ui-monospace, 'SF Mono', monospace; font-size: 11px; color: #565B65; width: 20px; flex-shrink: 0; padding-top: 2px; }
        .guardrail-name { font-size: 14px; font-weight: 600; color: #F2EEE7; margin-bottom: 3px; }
        .guardrail-desc { font-size: 13px; color: #6E7480; line-height: 1.5; }

        .verdict-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px; }
        .verdict-card { border-radius: 8px; padding: 16px; border: 1px solid rgba(255,255,255,0.07); }
        .verdict-ready { background: rgba(111,214,168,0.06); border-color: rgba(111,214,168,0.2); }
        .verdict-caution { background: rgba(242,182,109,0.06); border-color: rgba(242,182,109,0.2); }
        .verdict-blocked { background: rgba(232,155,111,0.06); border-color: rgba(232,155,111,0.2); }
        .verdict-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
        .verdict-ready .verdict-badge { color: #6FD6A8; }
        .verdict-caution .verdict-badge { color: #F2B66D; }
        .verdict-blocked .verdict-badge { color: #E89B6F; }
        .verdict-range { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 4px; }
        .verdict-desc { font-size: 12px; color: #AAB4C0; line-height: 1.5; }

        .rice-table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0; }
        .rice-table th { text-align: left; padding: 8px 12px; background: #13161C; color: #565B65; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .rice-table td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #C9C3B6; font-size: 13px; }
        .rice-table tr:last-child td { border-bottom: none; }
        .rice-table .feature-name { color: #F2EEE7; font-weight: 500; }
        .rice-table .score-high { color: #6FD6A8; font-weight: 600; }
        .rice-table .priority-1 { color: #6FD6A8; }
        .rice-table .priority-2 { color: #F2B66D; }
        .rice-table .priority-3 { color: #AAB4C0; }

        .incident { background: rgba(232,155,111,0.06); border: 1px solid rgba(232,155,111,0.2); border-radius: 8px; padding: 16px 18px; margin: 16px 0; }
        .incident-title { font-size: 12px; font-weight: 600; color: #E89B6F; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 6px; }
        .incident-text { font-size: 13.5px; color: #AAB4C0; line-height: 1.6; }

        .stack-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 16px; }
        .stack-item { background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 14px 16px; }
        .stack-layer { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #565B65; margin-bottom: 4px; }
        .stack-val { font-size: 14px; color: #C9C3B6; }

        .mode-card { background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 18px 20px; margin-bottom: 10px; }
        .mode-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .mode-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; background: rgba(139,158,255,0.1); color: #8B9EFF; }
        .mode-name { font-size: 15px; font-weight: 600; color: #F2EEE7; }
        .mode-row { display: flex; gap: 12px; font-size: 13px; margin-bottom: 4px; }
        .mode-key { color: #565B65; width: 80px; flex-shrink: 0; }
        .mode-val { color: #AAB4C0; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 40px 20px 60px; }
          .verdict-row { grid-template-columns: 1fr; }
          .stack-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/projects">← Projects</Link>
          <div className="sb-product">ProductProof</div>
          <div className="sb-title">Technical Docs</div>
          <nav className="sb-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className={`sb-link ${active === s.id ? 'active' : ''}`} onClick={() => scrollTo(s.id)}>
                <span className="sb-dot" />{s.label}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <a className="sb-cta" href="https://productproof-demo.vercel.app" target="_blank" rel="noopener noreferrer">Try the demo</a>
            <a className="sb-cta-ghost" href="https://github.com/alisaeed786-hub/healthy-humans" target="_blank" rel="noopener noreferrer">View source</a>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">

            <div id="overview" className="doc-block">
              <p className="section-label">ProductProof</p>
              <h1 className="section-title">Technical Documentation</h1>
              <p className="prose">
                ProductProof is an AI-powered verification system for product tickets. It reads a Jira ticket, searches a team&apos;s Confluence documentation, and returns a clear verdict — Ready, Needs Review, or Not Ready — with every claim labeled as verified or assumed.
              </p>
              <p className="prose">
                This document covers the system architecture, agent design, guardrails, data model, readiness model, and the product decisions that shaped each. It also includes the original PRD and the CAB RICE scoring used to prioritize the initial feature set.
              </p>
              <div className="code-block">
                <span className="comment">// Quick reference</span>{'\n'}
                <span className="key">Version</span>{'    '}<span className="val">1.0 — Production</span>{'\n'}
                <span className="key">Author</span>{'     '}<span className="val">Ali Saeed</span>{'\n'}
                <span className="key">Live URL</span>{'   '}<span className="val">healthy-humans.vercel.app</span>{'\n'}
                <span className="key">Demo URL</span>{'   '}<span className="val">productproof-demo.vercel.app</span>{'\n'}
                <span className="key">Repo</span>{'       '}<span className="val">github.com/alisaeed786-hub/healthy-humans</span>{'\n'}
                <span className="key">Board</span>{'      '}<span className="val">healthyhumans.atlassian.net/jira/software/projects/SCRUM</span>
              </div>
            </div>

            <div id="problem" className="doc-block">
              <p className="section-label">Problem Statement</p>
              <h2 className="section-title">The Real Problem</h2>
              <p className="prose">
                Jira tickets are the contract between product and engineering. When that contract is vague, ambiguous, or built on unverified assumptions, it creates compounding downstream cost — sprint spillover, rework cycles, misaligned builds, and endless clarification threads.
              </p>
              <p className="prose">
                A PM has one hour, ten to twenty stories to write, requirements just landed in Slack, and needs to walk into sprint planning with work that makes sense to engineers and stakeholders — without missing anything critical. The problem is not writing tickets faster. It is verifying them before they enter a sprint.
              </p>

              <p className="prose" style={{ marginTop: 24, marginBottom: 12, color: '#F2EEE7', fontWeight: 500 }}>Real-world incidents that informed this product:</p>

              <div className="incident">
                <div className="incident-title">Quest Diagnostics / Weill Cornell — May 2025</div>
                <div className="incident-text">Lab results returned to Epic were delayed with no automated provider notification. The backlog took until the following day to clear. A ticket specifying result delivery with no definition of delay handling or provider alerting contributed to this gap.</div>
              </div>

              <div className="incident">
                <div className="incident-title">University of Iowa / Epic — June 2024</div>
                <div className="incident-text">A system update caused microbiology results to stop appearing in the Micro tab, routing instead to Results Review. No regression test was specified in the ticket. No rollback plan was defined.</div>
              </div>

              <div className="incident">
                <div className="incident-title">Newfoundland &amp; Labrador EMR — 2017–2018</div>
                <div className="incident-text">615 patients did not receive timely medical results due to a silent failure in the distribution layer. No delivery confirmation was built into the integration. No alert was triggered on failure.</div>
              </div>
            </div>

            <div id="architecture" className="doc-block">
              <p className="section-label">System Architecture</p>
              <h2 className="section-title">Data Flow</h2>
              <p className="prose">The system runs four agents in sequence. Each agent has one job and one clear definition of done. No single model is asked to read the ticket, search the documentation, verify the claims, and rewrite the output simultaneously.</p>

              <div className="code-block">
                <span className="comment">// Request lifecycle</span>{'\n\n'}
                <span className="val">1.</span> User selects a ticket from the Jira sidebar{'\n'}
                <span className="val">2.</span> App fetches full ticket via Jira REST API v3{'\n'}
                <span className="val">3.</span> <span className="key">Agent 00</span> — generates CQL search terms from ticket language{'\n'}
                <span className="val">4.</span> App queries Confluence via CQL, retrieves top 3 pages{'\n'}
                <span className="val">5.</span> <span className="key">Agent 01</span> — structural check (format, AC, scope){'\n'}
                <span className="val">6.</span> <span className="key">Agent 02</span> — verifies every claim against corpus{'\n'}
                <span className="val">7.</span> <span className="key">Agent 03</span> — rewrites using verified claims only{'\n'}
                <span className="val">8.</span> UI renders: verdict, verified list, assumed list, diff{'\n'}
                <span className="val">9.</span> PM optionally pushes refined ticket to Jira
              </div>

              <h2 className="section-title" style={{ marginTop: 32 }}>Product Modes</h2>
              <p className="prose">Three modes cover different PM needs at different points in the workflow.</p>

              <div className="mode-card">
                <div className="mode-header"><span className="mode-badge">Mode 1</span><span className="mode-name">Quick Check</span></div>
                <div className="mode-row"><span className="mode-key">Target</span><span className="mode-val">Under 10 seconds</span></div>
                <div className="mode-row"><span className="mode-key">Agents</span><span className="mode-val">1 structural call</span></div>
                <div className="mode-row"><span className="mode-key">Output</span><span className="mode-val">Ready / Caution / Not Ready + reason list</span></div>
                <div className="mode-row"><span className="mode-key">Use case</span><span className="mode-val">Pre-meeting sanity check</span></div>
              </div>

              <div className="mode-card">
                <div className="mode-header"><span className="mode-badge">Mode 2</span><span className="mode-name">Full Refine</span></div>
                <div className="mode-row"><span className="mode-key">Target</span><span className="mode-val">Under 30 seconds</span></div>
                <div className="mode-row"><span className="mode-key">Agents</span><span className="mode-val">3 agents sequential</span></div>
                <div className="mode-row"><span className="mode-key">Output</span><span className="mode-val">Rewritten ticket + verified/assumed breakdown + diff + Confluence links</span></div>
                <div className="mode-row"><span className="mode-key">Use case</span><span className="mode-val">Full refinement session prep</span></div>
              </div>

              <div className="mode-card">
                <div className="mode-header"><span className="mode-badge">Mode 3</span><span className="mode-name">Story Builder</span></div>
                <div className="mode-row"><span className="mode-key">Target</span><span className="mode-val">Under 25 seconds</span></div>
                <div className="mode-row"><span className="mode-key">Agents</span><span className="mode-val">2 agents</span></div>
                <div className="mode-row"><span className="mode-key">Input</span><span className="mode-val">Raw text — Slack messages, bullet points, voice notes</span></div>
                <div className="mode-row"><span className="mode-key">Output</span><span className="mode-val">Full user story with AC, out of scope, assumptions, links</span></div>
                <div className="mode-row"><span className="mode-key">Use case</span><span className="mode-val">Build a ticket from scratch from raw requirements</span></div>
              </div>
            </div>

            <div id="agents" className="doc-block">
              <p className="section-label">Agent Design</p>
              <h2 className="section-title">Four Agents, Four Jobs</h2>
              <p className="prose">Each agent receives a specific input, does one job, and produces a structured output that feeds the next step. Agent 03 never receives the assumed list — only what was verified.</p>

              <div className="agent-card">
                <div className="agent-header"><span className="agent-num">AGENT 00</span><span className="agent-name">Keyword Extraction</span></div>
                <div className="agent-row"><span className="agent-row-label">Input</span><span className="agent-row-val">Raw ticket summary and description</span></div>
                <div className="agent-row"><span className="agent-row-label">Job</span><span className="agent-row-val">Translate PM language to search vocabulary the Confluence corpus can match. Bridges the semantic gap between how PMs write tickets and how engineers write documentation.</span></div>
                <div className="agent-row"><span className="agent-row-label">Output</span><span className="agent-row-val">Array of CQL-ready search terms</span></div>
                <div className="agent-row"><span className="agent-row-label">Tokens</span><span className="agent-row-val">~60</span></div>
              </div>

              <div className="agent-card">
                <div className="agent-header"><span className="agent-num">AGENT 01</span><span className="agent-name">Structural Analyst</span></div>
                <div className="agent-row"><span className="agent-row-label">Input</span><span className="agent-row-val">Raw ticket only — no Confluence context</span></div>
                <div className="agent-row"><span className="agent-row-label">Job</span><span className="agent-row-val">Check the ticket against itself. Is this a real user story? Are the acceptance criteria testable? Is scope defined? Is there technical prescription? Are assumptions documented?</span></div>
                <div className="agent-row"><span className="agent-row-label">Output</span><span className="agent-row-val">Structural issues list, fast verdict</span></div>
                <div className="agent-row"><span className="agent-row-label">Tokens</span><span className="agent-row-val">~1,000</span></div>
              </div>

              <div className="agent-card">
                <div className="agent-header"><span className="agent-num">AGENT 02</span><span className="agent-name">Contextual Verifier</span></div>
                <div className="agent-row"><span className="agent-row-label">Input</span><span className="agent-row-val">Ticket + Agent 01 findings + Confluence corpus (top 3 pages, 1,500 chars each)</span></div>
                <div className="agent-row"><span className="agent-row-label">Job</span><span className="agent-row-val">Check every significant claim against the corpus. A claim is verified only if a specific passage in the documentation can be directly cited as supporting it. Everything else is assumed.</span></div>
                <div className="agent-row"><span className="agent-row-label">Output</span><span className="agent-row-val">Verified items with citations, assumed items with PM action required, Confluence page links</span></div>
                <div className="agent-row"><span className="agent-row-label">Tokens</span><span className="agent-row-val">~2,000</span></div>
              </div>

              <div className="agent-card">
                <div className="agent-header"><span className="agent-num">AGENT 03</span><span className="agent-name">Story Writer</span></div>
                <div className="agent-row"><span className="agent-row-label">Input</span><span className="agent-row-val">Original ticket + Agent 01 findings + verified list only (assumed list withheld)</span></div>
                <div className="agent-row"><span className="agent-row-label">Job</span><span className="agent-row-val">Rewrite the ticket using only verified facts. Never invents context. Preserves PM voice and intent. Produces diff-ready output.</span></div>
                <div className="agent-row"><span className="agent-row-label">Output</span><span className="agent-row-val">Refined ticket, diff vs original</span></div>
                <div className="agent-row"><span className="agent-row-label">Tokens</span><span className="agent-row-val">~4,000</span></div>
              </div>

              <div className="code-block" style={{ marginTop: 20 }}>
                <span className="comment">// Why Agent 03 never sees the assumed list</span>{'\n\n'}
                <span className="comment">// First attempt: passed both lists to Agent 03</span>{'\n'}
                <span className="comment">// Result: assumed claims appeared in rewritten ticket</span>{'\n'}
                <span className="comment">//         rephrased as constraints or edge cases</span>{'\n\n'}
                <span className="comment">// Root cause: transformer attention weights all context</span>{'\n'}
                <span className="comment">// &quot;Do not use this&quot; competes with the data itself</span>{'\n'}
                <span className="comment">// The data usually wins</span>{'\n\n'}
                <span className="comment">// Fix: remove assumed list from context entirely</span>{'\n'}
                <span className="comment">// Agent 03 cannot hallucinate what it cannot see</span>
              </div>
            </div>

            <div id="guardrails" className="doc-block">
              <p className="section-label">Guardrails</p>
              <h2 className="section-title">Nine Non-Negotiables</h2>
              <p className="prose">These apply to every agent call across all three product modes. They were defined before the first agent was built and have not changed.</p>

              <div style={{ marginTop: 16 }}>
                {[
                  { num: '01', name: 'No scope creep', desc: 'Never change the core intent of the ticket. The agent rewrites, it does not redesign.' },
                  { num: '02', name: 'No blind scoring', desc: 'Replaced by verified vs assumed ratio. A number tells a PM nothing actionable.' },
                  { num: '03', name: 'No compliance hallucination', desc: 'Never add compliance requirements not found in the Confluence corpus.' },
                  { num: '04', name: 'AC limit', desc: 'Never exceed 7 acceptance criteria. Bloated AC signals unclear scope, not thoroughness.' },
                  { num: '05', name: 'No technical prescription', desc: 'Never tell engineers how to build. Only what to build.' },
                  { num: '06', name: 'Surface all assumptions', desc: 'Always surface assumptions front and center. Never hide uncertainty behind confident language.' },
                  { num: '07', name: 'Original ticket pinned', desc: 'The original ticket is pinned at the top of every agent prompt to prevent context drift.' },
                  { num: '08', name: 'Always show diff', desc: 'The PM sees exactly what changed. Their voice and intent are preserved.' },
                  { num: '09', name: 'No patient data in prompts', desc: 'Patient identifiable data never enters any agent prompt under any circumstance.' },
                ].map(g => (
                  <div key={g.num} className="guardrail">
                    <span className="guardrail-num">{g.num}</span>
                    <div>
                      <div className="guardrail-name">{g.name}</div>
                      <div className="guardrail-desc">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="datamodel" className="doc-block">
              <p className="section-label">Data Model</p>
              <h2 className="section-title">TicketAnalysisResult</h2>
              <p className="prose">Every agent response conforms to this shape. The status field is derived from the assumed item count against the readiness thresholds.</p>
              <div className="code-block">{`type TicketAnalysisResult = {
  status: 'ready' | 'caution' | 'not_ready'
  verified: VerifiedItem[]
  assumed:  AssumedItem[]
  refinedTicket: {
    summary:            string
    description:        string
    acceptanceCriteria: string[]
    outOfScope:         string[]
    assumptions:        string[]
    pmNotes:            string
  }
  diff:             DiffResult
  confluenceLinks:  string[]
  structuralIssues: string[]
}

type VerifiedItem = {
  claim:      string
  source:     string  // Confluence page title
  citation:   string  // exact passage cited
}

type AssumedItem = {
  claim:      string
  reason:     string  // why it could not be verified
  pmAction:   string  // what PM needs to do
}`}
              </div>
            </div>

            <div id="readiness" className="doc-block">
              <p className="section-label">Readiness Model</p>
              <h2 className="section-title">Verdict, Not Score</h2>
              <p className="prose">The output is not a quality score. A number does not tell a PM what to fix, which stakeholder to ask, or how urgent it is. Every ticket gets a plain verdict based on how many claims could not be verified against the corpus.</p>

              <div className="verdict-row">
                <div className="verdict-card verdict-ready">
                  <div className="verdict-badge">Ready</div>
                  <div className="verdict-range">0 – 3</div>
                  <div className="verdict-desc">Unverified claims. Safe to bring into planning as written.</div>
                </div>
                <div className="verdict-card verdict-caution">
                  <div className="verdict-badge">Needs Review</div>
                  <div className="verdict-range">4 – 6</div>
                  <div className="verdict-desc">Unverified claims. Address gaps before sprint commitment.</div>
                </div>
                <div className="verdict-card verdict-blocked">
                  <div className="verdict-badge">Not Ready</div>
                  <div className="verdict-range">7+</div>
                  <div className="verdict-desc">Unverified claims. Should not enter sprint as written.</div>
                </div>
              </div>

              <p className="prose" style={{ marginTop: 20 }}>
                Thresholds were calibrated empirically — running the same tickets at different cutoff values and comparing the system verdict against manual PM review across six test tickets spanning all three verdict tiers. The thresholds are treated as a starting point. The right calibration shifts based on team documentation maturity and risk tolerance.
              </p>
            </div>

            <div id="stack" className="doc-block">
              <p className="section-label">Tech Stack</p>
              <h2 className="section-title">Architecture</h2>
              <div className="stack-grid">
                <div className="stack-item"><div className="stack-layer">Frontend</div><div className="stack-val">Next.js 14, TypeScript, React</div></div>
                <div className="stack-item"><div className="stack-layer">Backend</div><div className="stack-val">Next.js API Routes (serverless)</div></div>
                <div className="stack-item"><div className="stack-layer">AI Engine</div><div className="stack-val">Anthropic Claude claude-sonnet-4-6 via REST API</div></div>
                <div className="stack-item"><div className="stack-layer">Ticket Source</div><div className="stack-val">Jira REST API v3</div></div>
                <div className="stack-item"><div className="stack-layer">RAG Corpus</div><div className="stack-val">Confluence REST API — CQL search, top 3 pages</div></div>
                <div className="stack-item"><div className="stack-layer">Auth</div><div className="stack-val">Atlassian Basic Auth — email + API token</div></div>
                <div className="stack-item"><div className="stack-layer">Deployment</div><div className="stack-val">Vercel — auto-deploy from GitHub main</div></div>
                <div className="stack-item"><div className="stack-layer">Demo Cache</div><div className="stack-val">Static JSON in public/demo-cache/ — 6 pre-run tickets</div></div>
              </div>
            </div>

            <div id="prd" className="doc-block">
              <p className="section-label">PRD — v1.0</p>
              <h2 className="section-title">Product Requirements Document</h2>
              <p className="prose"><b>Product:</b> Healthy Humans — AI-Powered Jira Ticket Pressure Tester</p>
              <p className="prose"><b>Author:</b> Ali Saeed &nbsp;|&nbsp; <b>Date:</b> June 20, 2026 &nbsp;|&nbsp; <b>Status:</b> Shipped</p>

              <p className="prose" style={{ marginTop: 24, marginBottom: 16, color: '#F2EEE7', fontWeight: 500 }}>Executive Summary</p>
              <p className="prose">An AI-powered product management tool that pressure tests Jira user stories against real-world healthcare system context. It identifies missing requirements, edge cases, ambiguous acceptance criteria, and compliance gaps — then automatically refines the story into a production-ready ticket. Built on a real Jira board and Confluence knowledge base, populated with user stories grounded in documented incidents from Oracle Health, Epic, and Quest Diagnostics.</p>

              <p className="prose" style={{ marginTop: 24, marginBottom: 16, color: '#F2EEE7', fontWeight: 500 }}>Product Vision</p>
              <p className="prose">Every user story that enters a sprint at Healthy Humans has been pressure tested against institutional knowledge, compliance constraints, and documented incident history — before a single line of code is written.</p>

              <p className="prose" style={{ marginTop: 24, marginBottom: 16, color: '#F2EEE7', fontWeight: 500 }}>File Structure</p>
              <div className="code-block">{`healthy-humans/
├── app/
│   ├── page.tsx              // Main UI — sidebar, tabs, verdict, diff
│   ├── layout.tsx            // App shell and metadata
│   ├── globals.css
│   ├── dashboard/page.tsx    // Full Jira board view
│   ├── analyze/page.tsx      // Full analysis page
│   ├── demo/page.tsx         // 6-ticket curated demo picker
│   ├── demo/[key]/page.tsx   // Individual demo result
│   └── api/
│       ├── tickets/route.ts  // GET — lists SCRUM tickets from Jira
│       ├── analyze/route.ts  // POST — full agent pipeline
│       ├── analyze-demo/     // POST — returns cached result
│       └── push-ticket/      // POST — push refined ticket to Jira
├── lib/
│   ├── agents.ts             // All 4 agent functions + data model
│   ├── jira.ts               // Jira API client
│   ├── confluence.ts         // Confluence CQL search + context builder
│   └── dashboard/            // Dashboard types, selectors, constants
├── components/
│   ├── dashboard/            // Board, Sidebar, TicketCard, DrawerUI
│   └── StatusBadge.tsx
└── public/
    └── demo-cache/           // Pre-run results for 6 demo tickets`}
              </div>
            </div>

            <div id="releases" className="doc-block">
              <p className="section-label">Release Notes</p>
              <h2 className="section-title">What shipped</h2>

              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 12, color: '#8B9EFF', background: 'rgba(139,158,255,0.1)', padding: '3px 10px', borderRadius: 5 }}>v1.1</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#F2EEE7', letterSpacing: '-0.015em' }}>Rebrand</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 10, background: 'rgba(111,214,168,0.1)', color: '#6FD6A8', marginLeft: 'auto' }}>Live</span>
                </div>
                {[
                  'Rebrand from Healthy Humans to ProductProof across codebase and Vercel',
                  'Update GitHub repo name to productproof',
                  'Register productproof.ai domain',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
                    <span style={{ color: '#6FD6A8', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#C9C3B6', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 12, color: '#8B9EFF', background: 'rgba(139,158,255,0.1)', padding: '3px 10px', borderRadius: 5 }}>v1.0</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#F2EEE7', letterSpacing: '-0.015em' }}>Initial Release</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 10, background: 'rgba(111,214,168,0.1)', color: '#6FD6A8', marginLeft: 'auto' }}>Live</span>
                </div>

                {[
                  {
                    name: 'Agent Architecture',
                    items: [
                      'Four-agent pipeline — keyword extraction, structural check, verification, rewrite',
                      'Agent 0 and Agent 1 run in parallel to reduce latency',
                      'Agent 3 prompt size capped to reduce response time',
                      'Assumed list withheld from Agent 3 context entirely',
                    ],
                  },
                  {
                    name: 'Verification',
                    items: [
                      'Confluence OR search — pages loading for all tickets',
                      'Agent 0 keyword extraction — smart search queries from ticket language',
                      'Confluence corpus visible in the UI',
                      'Empty states — explains when Confluence returns nothing',
                    ],
                  },
                  {
                    name: 'Jira Integration',
                    items: [
                      'Six custom fields for analysis metadata',
                      'Approve and edit refined ticket before pushing to Jira',
                      'Push approved refined ticket to Jira — all fields',
                      'Ticket key visible in the result panel',
                    ],
                  },
                  {
                    name: 'Demo',
                    items: [
                      'HIGH-ASSUMPTION-TEST tickets working as demo proof points',
                      'Sample ticket walkthrough — guided not ready to ready',
                      'Copy refined ticket to clipboard',
                      'Metrics panel — tickets analyzed, avg assumption count',
                    ],
                  },
                  {
                    name: 'UX',
                    items: [
                      'Loading states — shows which agent is running',
                      'Story Builder — paste raw requirements, get a full ticket',
                    ],
                  },
                ].map(section => (
                  <div key={section.name} style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#565B65', marginBottom: 10 }}>{section.name}</p>
                    {section.items.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 12, padding: '9px 0', borderTop: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
                        <span style={{ color: '#6FD6A8', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 14, color: '#C9C3B6', lineHeight: 1.55 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}

                <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#565B65', marginBottom: 10 }}>Upcoming</p>
                  {[
                    'Batch ticket selection and analysis — select multiple, run sequentially',
                    'Background pre-analysis — analyze all tickets on app load',
                    'Analysis result caching — serve repeat analyses instantly',
                    'Claim verification cache — reuse verified claims without re-running Agent 2',
                    'Keyword pattern caching — Agent 0 skips Claude call for known ticket types',
                    'CAB meeting presentation generator — auto-build decks from ticket data',
                    'Live meeting assistant — real time ticket creation from voice',
                    'Parallel map-reduce agent pattern — split Agent 2 across Confluence pages',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', gap: 12, padding: '9px 0', borderTop: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
                      <span style={{ color: '#383C46', fontSize: 13, flexShrink: 0, marginTop: 1 }}>○</span>
                      <span style={{ fontSize: 14, color: '#565B65', lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
