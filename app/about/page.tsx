'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const SECTIONS = [
  { id: 'who', label: 'Who I am' },
  { id: 'how', label: 'How I think' },
  { id: 'outside', label: 'Outside work' },
]

export default function About() {
  const [active, setActive] = useState('who')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
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

        .sidebar {
          width: 260px; flex-shrink: 0; position: fixed;
          top: 64px; left: 0; height: calc(100vh - 64px);
          padding: 40px 28px; display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sb-section-title {
          font-size: 24px; font-weight: 700; letter-spacing: -0.03em;
          color: #F2EEE7; margin-bottom: 40px; line-height: 1.1;
        }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; }
        .sb-link {
          display: flex; align-items: center; gap: 10px; padding: 9px 10px;
          border-radius: 7px; font-size: 13.5px; color: #6E7480; cursor: pointer;
          background: none; border: none; text-align: left; font-family: inherit;
          transition: color 160ms ease, background 160ms ease;
        }
        .sb-link:hover { color: #C9C3B6; background: rgba(255,255,255,0.03); }
        .sb-link.active { color: #F2EEE7; background: rgba(139,158,255,0.1); }
        .sb-dot { width: 5px; height: 5px; border-radius: 50%; background: #383C46; flex-shrink: 0; transition: background 160ms ease, box-shadow 160ms ease; }
        .sb-link.active .sb-dot { background: #8B9EFF; box-shadow: 0 0 8px rgba(139,158,255,0.65); }
        .sb-footer { margin-top: auto; }
        .sb-name { font-size: 13px; color: #565B65; }

        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 680px; margin: 0 auto; padding: 0 52px; }

        .block { padding: 72px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .block:last-child { border-bottom: none; }

        .block-title {
          font-size: 13px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #8B9EFF; margin-bottom: 28px;
        }
        .narrative { font-size: 17px; color: #C9C3B6; line-height: 1.85; letter-spacing: -0.005em; margin-bottom: 24px; max-width: 600px; }
        .narrative:last-child { margin-bottom: 0; }
        .narrative b { color: #F2EEE7; font-weight: 500; }

        .photo-block {
          margin: 36px 0;
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
        }
        .photo-block img { width: 100%; height: auto; display: block; }
        .photo-caption {
          font-size: 12px; color: #565B65; letter-spacing: 0.04em;
          padding: 12px 0 0; text-align: center;
        }

        .contact-cta { margin-top: 40px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.06); }
        .contact-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #565B65; margin-bottom: 16px; }
        .contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .contact-link { font-size: 14px; font-weight: 500; padding: 10px 18px; border-radius: 7px; text-decoration: none; transition: all 160ms ease; }
        .contact-link-primary { background: #8B9EFF; color: #0D0F14; }
        .contact-link-primary:hover { background: #A4B3FF; }
        .contact-link-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #C9C3B6; }
        .contact-link-ghost:hover { border-color: rgba(255,255,255,0.28); color: #F2EEE7; }

        @media (max-width: 860px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 0 20px; }
          .block { padding: 52px 0; }
          .narrative { font-size: 16px; }
        }
      `}</style>

      <Navbar />

      <div className="layout">
        <aside className="sidebar">
          <div className="sb-section-title">About</div>
          <nav className="sb-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className={`sb-link ${active === s.id ? 'active' : ''}`} onClick={() => scrollTo(s.id)}>
                <span className="sb-dot" />{s.label}
              </button>
            ))}
          </nav>
          <div className="sb-footer"><div className="sb-name">Ali Saeed</div></div>
        </aside>

        <main className="main">
          <div className="wrap">

            <div id="who" className="block">
              <p className="block-title">Who I am</p>
              <p className="narrative">
                I studied Information Technology and Systems at UT Dallas, which gave me just enough technical grounding to be dangerous in a product role. I understood how systems were built, which meant I could sit with engineers and work through the details rather than hand over a document and hope for the best.
              </p>
              <p className="narrative">
                I spent two and a half years working on transit technology programs in Washington before moving into healthtech, where I have spent the last two years building operational infrastructure at a startup that did not have any. Both environments taught me the same thing in different ways — the person who understands the most about what is actually happening is usually the most useful person in the room.
              </p>
              <div className="photo-block">
                <img src="/ali-vietnam.png" alt="Ali in Vietnam" />
              </div>
              <p className="photo-caption">Ninh Binh, Vietnam</p>
            </div>

            <div id="how" className="block">
              <p className="block-title">How I think</p>
              <p className="narrative">
                You know that moment in a song when something is slightly off and you can feel it before you can name it? That is most of product management. You are sitting in a room full of people who are all playing their part and your job is to hear the whole thing at once and figure out where it is drifting before it falls apart.
              </p>
              <p className="narrative">
                I have been that person for five years. The most useful thing I have learned is that the answer is almost never in the room. It is in the data nobody pulled yet, the customer call nobody listened back to, the support ticket from six months ago that everyone forgot about. I go find it instead of debating what it probably is.
              </p>
              <p className="narrative">
                I also believe you have to build the thing to really understand it. Reading about a problem is useful. Writing the requirements for a solution is better. Watching it break in production and figuring out why is the most useful of all.
              </p>
              <div className="photo-block">
                <img src="/ali-wife.png" alt="Ali and his wife" />
              </div>
              <p className="photo-caption">Dallas, Texas</p>
            </div>

            <div id="outside" className="block">
              <p className="block-title">Outside work</p>
              <p className="narrative">
                Outside of work I travel as much as I can, usually with my wife who has better taste in restaurants than I do — though I hold my own in the kitchen.
              </p>
              <p className="narrative">
                I am genuinely curious about how things work — not just software, but cities, systems, cultures. Most of my best trips have been to places where I had to figure things out without a plan. That instinct follows me into product work too.
              </p>
              <div className="photo-block">
                <img src="/ali-edinburgh.png" alt="Ali in Edinburgh" />
              </div>
              <p className="photo-caption">Edinburgh, Scotland</p>
            </div>


          </div>
        </main>
      </div>
    </>
  )
}
