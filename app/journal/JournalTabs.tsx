'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { JournalEntry } from '@/lib/journal'

type Tab = 'All' | 'Out of Scope' | 'Under the Hood' | 'PM in AI'
const TABS: Tab[] = ['All', 'Out of Scope', 'Under the Hood', 'PM in AI']

function getCatStyle(category: JournalEntry['category']) {
  if (category === 'Out of Scope') return { background: 'rgba(139,158,255,0.1)', color: '#8B9EFF' }
  if (category === 'Under the Hood') return { background: 'rgba(111,214,168,0.1)', color: '#6FD6A8' }
  return { background: 'rgba(242,182,109,0.1)', color: '#F2B66D' }
}

export default function JournalTabs({ entries }: { entries: JournalEntry[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const filtered = activeTab === 'All'
    ? entries
    : entries.filter(e => e.category === activeTab)

  return (
    <>
      <style>{`
        .tab-bar { display: flex; gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 40px; }
        .tab-btn { font-size: 14px; padding: 10px 20px; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: inherit; color: #6E7480; transition: color 160ms ease, border-color 160ms ease; margin-bottom: -1px; }
        .tab-btn.active { color: #F2EEE7; border-bottom-color: #8B9EFF; }
        .entry-list { display: flex; flex-direction: column; gap: 12px; }
        .entry-card { display: block; text-decoration: none; padding: 28px 24px; background: #13161C; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; transition: border-color 200ms ease, transform 200ms ease; }
        .entry-card:hover { border-color: rgba(139,158,255,0.25); transform: translateX(4px); }
        .entry-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .entry-category { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 9px; border-radius: 4px; }
        .entry-date { font-size: 12px; color: #565B65; letter-spacing: 0.02em; }
        .entry-title { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin-bottom: 8px; line-height: 1.3; }
        .entry-desc { font-size: 14px; color: #6E7480; line-height: 1.6; }
        .empty { text-align: center; padding: 80px 0; color: #565B65; font-size: 15px; }
        @media (max-width: 640px) { .tab-btn { padding: 10px 12px; font-size: 13px; } }
      `}</style>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">Nothing here yet. Check back soon.</div>
      ) : (
        <div className="entry-list">
          {filtered.map(entry => (
            <Link key={entry.slug} className="entry-card" href={`/journal/${entry.slug}`}>
              <div className="entry-meta">
                <span className="entry-category" style={getCatStyle(entry.category)}>
                  {entry.category}
                </span>
                <span className="entry-date">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
              <div className="entry-title">{entry.title}</div>
              <div className="entry-desc">{entry.description}</div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
