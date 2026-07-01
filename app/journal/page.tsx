import Navbar from '@/components/Navbar'
import { getAllEntries } from '@/lib/journal'
import JournalTabs from './JournalTabs'

export default function JournalIndex() {
  const entries = getAllEntries()

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F14; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .wrap { max-width: 760px; margin: 0 auto; padding: 96px 48px 80px; }
        .page-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 12px; }
        .page-title { font-size: clamp(32px, 4vw, 52px); font-weight: 700; letter-spacing: -0.035em; color: #F2EEE7; margin-bottom: 12px; line-height: 1.1; }
        .page-sub { font-size: 17px; color: #6E7480; line-height: 1.7; max-width: 520px; margin-bottom: 32px; }
        @media (max-width: 640px) { .wrap { padding: 80px 20px 60px; } }
      `}</style>

      <Navbar />
      <div className="wrap">
        <p className="page-label">Ali Saeed</p>
        <h1 className="page-title">AI Journal</h1>
        <p className="page-sub">
          Personal narratives, analytical deep dives, and general
          thoughts on building AI systems. Written as I go, not
          after the fact.
        </p>
        <JournalTabs entries={entries} />
      </div>
    </>
  )
}
