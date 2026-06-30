'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'who', label: 'Who I am' },
  { id: 'why', label: 'Why this work' },
  { id: 'how', label: 'How I think' },
  { id: 'looking', label: 'What I want' },
]

export default function About() {
  const [active, setActive] = useState('who')

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

        .eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9C3B6; opacity: 0.45; margin-bottom: 36px; }
        .narrative { font-size: 18px; color: #C9C3B6; line-height: 1.85; letter-spacing: -0.005em; margin-bottom: 26px; max-width: 620px; }
        .narrative:last-child { margin-bottom: 0; }
        .narrative b { color: #F2EEE7; font-weight: 500; }

        .contact-cta { margin-top: 48px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.06); }
        .contact-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #565B65; margin-bottom: 20px; }
        .contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .contact-link { font-size: 14px; font-weight: 500; padding: 10px 18px; border-radius: 7px; text-decoration: none; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
        .contact-link-primary { background: #8B9EFF; color: #15171D; }
        .contact-link-primary:hover { background: #A4B3FF; }
        .contact-link-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6; }
        .contact-link-ghost:hover { border-color: rgba(255,255,255,0.28); color: #F2EEE7; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 24px; }
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/">&larr; Back</Link>
          <div className="sb-section-title">About</div>
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

            <div id="who" className="block">
              <p className="eyebrow">Who I am</p>
              <p className="narrative">
                I grew up in Dallas and studied Information Technology and Systems at UT Dallas. I wanted to understand how things were built, not just how they worked on the surface. That instinct has followed me into every role I have had since.
              </p>
              <p className="narrative">
                I am a daily user of Claude, ChatGPT, and GitHub Copilot. Not because it is expected but because these tools have genuinely changed how I work and I am curious about where they are headed. ProductProof is the most direct expression of that curiosity. I built it because I wanted to know whether a problem I kept running into was actually solvable, and building it turned out to be the only way to find out.
              </p>
              <p className="narrative">
                Outside of work I am interested in how complex systems fail, why some organizations move fast and others do not, and what separates the products people actually keep using from the ones that seem good on paper. I read a lot. I ask a lot of questions. I am told this is occasionally annoying and usually useful.
              </p>
            </div>

            <div id="why" className="block">
              <p className="eyebrow">Why this work</p>
              <p className="narrative">
                I got into product management because I enjoy the conversations and finding the missing piece of the puzzle. It is a thrill that no other role really gets.
              </p>
              <p className="narrative">
                Every room has a missing piece. Something nobody has named yet that changes the whole picture once you find it. In a planning meeting it might be the assumption everyone is making that nobody has checked. In a customer call it might be the thing they keep describing in different ways because they do not have a word for it yet. In a system failure it might be the edge case that was never documented because nobody thought it would matter.
              </p>
              <p className="narrative">
                Finding that piece and doing something useful with it is what I actually want to spend my time on. Product management is the role that makes that the job.
              </p>
              <p className="narrative">
                What drew me specifically toward AI product work is that the missing piece problem gets harder and more interesting when the system you are building can generate its own confident-sounding output. You cannot just check whether the feature shipped. You have to define what correct looks like and build the systems to catch when it is not. I find that genuinely exciting in a way that I did not expect.
              </p>
            </div>

            <div id="how" className="block">
              <p className="eyebrow">How I think</p>
              <p className="narrative">
                Product management is less about the product than most people think. It is about the room, the conversation, and the thing nobody has said yet that changes everything once it is named.
              </p>
              <p className="narrative">
                You know that moment in a song when something is slightly off and you can feel it before you can name it? That is most of product management. You are sitting in a room full of people who are all playing their part and your job is to hear the whole thing at once and figure out where it is drifting before it falls apart.
              </p>
              <p className="narrative">
                I have been that person for five years. The most useful thing I have learned is that the answer is almost never in the room. It is in the data nobody pulled yet, the customer call nobody listened back to, the support ticket from six months ago that everyone forgot about. I go find it instead of debating what it probably is.
              </p>
              <p className="narrative">
                I also believe you have to build the thing to really understand it. Reading about a problem is useful. Writing the requirements for a solution is better. Watching it break in production and figuring out why is the most useful thing of all.
              </p>
            </div>

            <div id="looking" className="block">
              <p className="eyebrow">What I want</p>
              <p className="narrative">
                I am looking for AI product roles where the work is genuinely hard and the environment does not have all the answers yet. Forward deployed roles interest me specifically because they put you directly inside a customer's environment, which is where the real problems live.
              </p>
              <p className="narrative">
                I do some of my best work when there is no playbook. Not because I enjoy chaos but because I am good at building structure in environments that do not have it yet. That is what I did at 10x Health, at HNTB, and with ProductProof. I would like to keep doing it at a company where AI is the core product, not an add-on.
              </p>
              <p className="narrative">
                I am based in Dallas and open to travel and relocation for the right role. If something I have written or built sounds relevant to what you are working on, I would genuinely like to talk.
              </p>

              <div className="contact-cta">
                <p className="contact-label">Get in touch</p>
                <div className="contact-links">
                  <a className="contact-link contact-link-primary" href="mailto:alisaeed786@gmail.com">Send me an email</a>
                  <a className="contact-link contact-link-ghost" href="https://www.linkedin.com/in/ali-saeed1/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
