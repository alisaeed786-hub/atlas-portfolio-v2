'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Landing() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0D0F14;
          color: #F2EEE7;
          font-family: system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 400px;
          align-items: center;
          gap: 64px;
          padding: 96px 48px 64px;
          max-width: 1160px;
          margin: 0 auto;
        }
        .hero-text { display: flex; flex-direction: column; }
        .hero-big-line {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.02;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #F2EEE7 40%, #8B9EFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-name {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #F2EEE7;
          margin-bottom: 4px;
        }
        .hero-role {
          font-size: clamp(14px, 1.6vw, 17px);
          color: #8B9EFF;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 24px;
        }
        .hero-body {
          font-size: clamp(15px, 1.5vw, 17px);
          color: #AAB4C0;
          line-height: 1.75;
          letter-spacing: -0.005em;
          max-width: 500px;
          margin-bottom: 28px;
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .hero-btn-primary {
          font-size: 14px; font-weight: 600; padding: 12px 22px;
          background: #8B9EFF; color: #0D0F14;
          border-radius: 8px; text-decoration: none;
          transition: background 160ms ease, transform 160ms ease;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .hero-btn-primary:hover { background: #A4B3FF; transform: translateY(-1px); }
        .hero-btn-ghost {
          font-size: 14px; font-weight: 500; padding: 12px 22px;
          background: transparent; color: #C9C3B6;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; text-decoration: none;
          transition: border-color 160ms ease, color 160ms ease;
        }
        .hero-btn-ghost:hover { border-color: rgba(255,255,255,0.28); color: #F2EEE7; }
        .hero-availability {
          font-size: 13px; color: #565B65; letter-spacing: 0.01em;
          margin-bottom: 24px; display: flex; align-items: center; gap: 8px;
        }
        .availability-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6FD6A8; flex-shrink: 0;
        }
        .hero-socials { display: flex; gap: 18px; }
        .hero-social {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: #565B65; text-decoration: none;
          transition: color 160ms ease;
        }
        .hero-social:hover { color: #C9C3B6; }

        /* Hero photo */
        .hero-photo { position: relative; display: flex; align-items: center; justify-content: center; }
        .hero-photo-inner {
          width: 100%; max-width: 380px;
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .hero-photo-inner img { width: 100%; height: auto; display: block; }

        /* Sections */
        .section {
          padding: 64px 48px;
          max-width: 1160px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .section-title {
          font-size: 13px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #8B9EFF;
          margin-bottom: 32px;
        }

        /* Experience */
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .exp-card {
          background: #13161C; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 28px 24px;
          text-decoration: none; display: block; position: relative; overflow: hidden;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }
        .exp-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #8B9EFF, #F2B66D);
          opacity: 0; transition: opacity 220ms ease;
        }
        .exp-card:hover { border-color: rgba(139,158,255,0.25); transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,0.4); }
        .exp-card:hover::after { opacity: 1; }
        .exp-company { font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 4px; }
        .exp-role { font-size: 13px; color: #8B9EFF; margin-bottom: 12px; }
        .exp-body { font-size: 14px; color: #AAB4C0; line-height: 1.7; }
        .exp-dates { font-size: 12px; color: #565B65; margin-top: 12px; }

        /* Project */
        .project-card {
          background: #13161C; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 32px 28px;
          text-decoration: none; display: block; position: relative; overflow: hidden;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
          margin-bottom: 20px;
        }
        .project-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #8B9EFF, #F2B66D);
          opacity: 0; transition: opacity 220ms ease;
        }
        .project-card:hover { border-color: rgba(139,158,255,0.25); transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,0.4); }
        .project-card:hover::after { opacity: 1; }
        .project-status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6FD6A8; margin-bottom: 14px; }
        .project-dot { width: 5px; height: 5px; border-radius: 50%; background: #6FD6A8; }
        .project-title { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 8px; }
        .project-tagline { font-size: 14px; color: #8B9EFF; margin-bottom: 14px; }
        .project-desc { font-size: 15px; color: #AAB4C0; line-height: 1.7; max-width: 580px; margin-bottom: 18px; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag { font-size: 11px; padding: 4px 10px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8A8C92; }

        /* Credentials */
        .creds-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .cred {
          font-size: 13px; padding: 8px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #AAB4C0; letter-spacing: -0.005em;
        }

        /* About preview */
        .about-preview { max-width: 620px; margin-bottom: 24px; }
        .about-p { font-size: 17px; color: #AAB4C0; line-height: 1.8; letter-spacing: -0.005em; margin-bottom: 14px; }
        .about-p:last-child { margin-bottom: 0; }

        /* More link */
        .more-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; color: #8B9EFF; text-decoration: none;
          transition: gap 160ms ease;
        }
        .more-link:hover { gap: 12px; }

        /* Contact */
        .contact-list { display: flex; flex-direction: column; max-width: 520px; }
        .contact-row {
          display: flex; align-items: center; gap: 16px; padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,0.06); text-decoration: none;
        }
        .contact-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .contact-icon { color: #565B65; flex-shrink: 0; transition: color 160ms ease; }
        .contact-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #565B65; width: 80px; flex-shrink: 0; }
        .contact-value { font-size: 16px; color: #C9C3B6; letter-spacing: -0.01em; transition: color 160ms ease; }
        .contact-row:hover .contact-value { color: #8B9EFF; }
        .contact-row:hover .contact-icon { color: #8B9EFF; }

        /* Responsive */
        @media (max-width: 960px) {
          .hero { grid-template-columns: 1fr; padding: 100px 32px 56px; gap: 40px; }
          .hero-photo { order: -1; }
          .hero-photo-inner { max-width: 260px; margin: 0 auto; }
          .hero-big-line { font-size: clamp(36px, 7vw, 52px); }
          .exp-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .hero { padding: 88px 20px 48px; gap: 32px; }
          .hero-photo-inner { max-width: 220px; }
          .hero-big-line { font-size: 34px; margin-bottom: 18px; }
          .hero-actions { flex-direction: column; }
          .hero-btn-primary, .hero-btn-ghost { text-align: center; justify-content: center; }
          .section { padding: 48px 20px; }
          .creds-row { gap: 8px; }
          .cred { font-size: 12px; padding: 7px 12px; }
          .contact-value { font-size: 14px; }
          .about-p { font-size: 16px; }
        }
      `}</style>

      <Navbar />

      <main>
        {/* Hero */}
        <div className="hero">
          <div className="hero-text">
            <h1 className="hero-big-line">Vision is the strategy.<br />Verification is the discipline.</h1>
            <div className="hero-name">Ali Saeed</div>
            <div className="hero-role">AI Product Manager</div>
            <p className="hero-body">
              Product managers are asked to carry other people&apos;s ideas across the finish line. The hard part is not the execution — it is knowing which ideas are worth carrying. I read conviction. I can tell the difference between a feature that solves a real problem and one that exists because someone had air time in a meeting. I back that instinct with customer research and impact data. Then I decide what gets built, and I build it to last.
            </p>
            <div className="hero-actions">
              <a className="hero-btn-primary" href="https://productproof-demo.vercel.app" target="_blank" rel="noopener noreferrer">
                See ProductProof live →
              </a>
              <Link className="hero-btn-ghost" href="/about">More about me</Link>
            </div>
            <div className="hero-availability">
              <span className="availability-dot" />
              Open to forward deployed and AI product roles · Based in Dallas · Available now
            </div>
            <div className="hero-socials">
              <a className="hero-social" href="https://www.linkedin.com/in/ali-saeed1/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LinkedIn</span>
              </a>
              <a className="hero-social" href="https://github.com/alisaeed786-hub" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <span>GitHub</span>
              </a>
              <a className="hero-social" href="mailto:alisaeed786@gmail.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>Email</span>
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-inner">
              <img src="/ali.png" alt="Ali Saeed" />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="section">
          <p className="section-title">Experience</p>
          <div className="exp-grid">
            <Link className="exp-card" href="/experience">
              <div className="exp-company">10x Health System</div>
              <div className="exp-role">Product Manager, Platform and API Operations</div>
              <p className="exp-body">Built the operational infrastructure from scratch across a six-product healthtech operation. No playbook, live system, real patients.</p>
              <p className="exp-dates">Jan 2023 — Present</p>
            </Link>
            <Link className="exp-card" href="/experience">
              <div className="exp-company">HNTB / WMATA</div>
              <div className="exp-role">Product Manager, Transit Technology</div>
              <p className="exp-body">Managed technology programs across a 200-person PMO at one of the largest transit agencies in the country. Secured C-suite approval for the agency's first Agile adoption.</p>
              <p className="exp-dates">Aug 2020 — Jan 2023</p>
            </Link>
          </div>
          <Link className="more-link" href="/experience">Read the full story →</Link>
        </div>

        {/* Credentials */}
        <div className="section">
          <p className="section-title">Credentials</p>
          <div className="creds-row">
            <span className="cred">SAFe 6 POPM</span>
            <span className="cred">Salesforce Certified Admin</span>
            <span className="cred">Google AI Essentials</span>
            <span className="cred">Anthropic Claude Skill Badges</span>
            <span className="cred">B.S. Information Technology & Systems — UT Dallas</span>
          </div>
        </div>

        {/* Projects */}
        <div className="section">
          <p className="section-title">Projects</p>
          <Link className="project-card" href="/projects">
            <div className="project-status"><span className="project-dot" />Live Product</div>
            <div className="project-title">ProductProof</div>
            <div className="project-tagline">Prove every ticket before you build it</div>
            <p className="project-desc">An AI verification system for product tickets. Three specialized agents check every claim against a team's own documentation, separating what is confirmed from what is assumed before sprint planning.</p>
            <div className="project-tags">
              <span className="tag">Multi-agent systems</span>
              <span className="tag">RAG</span>
              <span className="tag">Jira API</span>
              <span className="tag">TypeScript</span>
            </div>
          </Link>
          <Link className="more-link" href="/projects">See all projects →</Link>
        </div>

        {/* About */}
        <div className="section">
          <p className="section-title">About</p>
          <div className="about-preview">
            <p className="about-p">I got into product management because I enjoy the conversations and finding the missing piece of the puzzle. It is a thrill that no other role really gets.</p>
            <p className="about-p">Five years in transit and healthtech, mostly in environments where the infrastructure I needed did not exist yet. Based in Dallas. Open to forward deployed and remote AI product roles.</p>
          </div>
          <Link className="more-link" href="/about">More about me →</Link>
        </div>

        {/* Contact */}
        <div className="section" id="contact">
          <p className="section-title">Contact</p>
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
