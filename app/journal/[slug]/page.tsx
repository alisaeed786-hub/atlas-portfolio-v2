import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getEntryBySlug, getAdjacentEntries, getAllEntries } from '@/lib/journal'
import Navbar from '@/components/Navbar'

export async function generateStaticParams() {
  const entries = getAllEntries()
  return entries.map(e => ({ slug: e.slug }))
}

export default async function JournalEntry({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getEntryBySlug(slug)
  if (!entry) notFound()
  const { prev, next } = getAdjacentEntries(slug)

  const catStyle = entry.category === 'Out of Scope'
    ? { background: 'rgba(139,158,255,0.1)', color: '#8B9EFF' }
    : entry.category === 'Under the Hood'
    ? { background: 'rgba(111,214,168,0.1)', color: '#6FD6A8' }
    : { background: 'rgba(242,182,109,0.1)', color: '#F2B66D' }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F14; color: #F2EEE7; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .layout { display: flex; min-height: 100vh; padding-top: 64px; }
        .sidebar { width: 260px; flex-shrink: 0; position: fixed; top: 64px; left: 0; height: calc(100vh - 64px); padding: 40px 28px; display: flex; flex-direction: column; border-right: 1px solid rgba(255,255,255,0.07); }
        .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6E7480; text-decoration: none; margin-bottom: 32px; transition: color 160ms ease; }
        .sb-back:hover { color: #C9C3B6; }
        .sb-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8B9EFF; margin-bottom: 8px; }
        .sb-title { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #F2EEE7; line-height: 1.25; margin-bottom: 14px; }
        .sb-date { font-size: 12px; color: #565B65; margin-bottom: 10px; }
        .sb-cat { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 9px; border-radius: 4px; }
        .sb-footer { margin-top: auto; }
        .sb-name { font-size: 13px; color: #565B65; }
        .main { margin-left: 260px; flex: 1; min-width: 0; }
        .wrap { max-width: 680px; margin: 0 auto; padding: 56px 52px 80px; }
        .prose p { font-size: 17px; color: #C9C3B6; line-height: 1.85; letter-spacing: -0.005em; margin-bottom: 24px; }
        .prose p:last-child { margin-bottom: 0; }
        .prose b, .prose strong { color: #F2EEE7; font-weight: 500; }
        .prose em, .prose i { color: #AAB4C0; font-style: italic; }
        .prose h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; color: #F2EEE7; margin: 44px 0 16px; }
        .prose h3 { font-size: 19px; font-weight: 600; letter-spacing: -0.015em; color: #F2EEE7; margin: 32px 0 12px; }
        .prose ul, .prose ol { padding-left: 24px; margin-bottom: 24px; }
        .prose li { font-size: 16px; color: #C9C3B6; line-height: 1.75; margin-bottom: 8px; }
        .prose blockquote { border-left: 3px solid #8B9EFF; padding: 14px 20px; margin: 32px 0; background: rgba(139,158,255,0.05); border-radius: 0 8px 8px 0; }
        .prose blockquote p { font-size: 16px; color: #AAB4C0; font-style: italic; margin: 0; }
        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 52px 0; }
        .nav-row { display: flex; justify-content: space-between; gap: 16px; }
        .nav-link { font-size: 14px; color: #6E7480; text-decoration: none; display: flex; flex-direction: column; gap: 4px; transition: color 160ms ease; max-width: 45%; }
        .nav-link:hover { color: #C9C3B6; }
        .nav-link-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #565B65; }
        .nav-link-title { font-size: 14px; color: #C9C3B6; transition: color 160ms ease; }
        .nav-link.right { text-align: right; margin-left: auto; }
        @media (max-width: 860px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .wrap { padding: 40px 20px 60px; }
        }
      `}</style>

      <Navbar />
      <div className="layout">
        <aside className="sidebar">
          <Link className="sb-back" href="/journal">← AI Journal</Link>
          <div className="sb-label">AI Journal</div>
          <div className="sb-title">{entry.title}</div>
          <div className="sb-date">
            {new Date(entry.date).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </div>
          <span className="sb-cat" style={catStyle}>{entry.category}</span>
          <div className="sb-footer">
            <div className="sb-name">Ali Saeed</div>
          </div>
        </aside>

        <main className="main">
          <div className="wrap">
            <div className="prose">
              <MDXRemote source={entry.content} />
            </div>
            <div className="divider" />
            <div className="nav-row">
              {prev && (
                <Link className="nav-link" href={`/journal/${prev.slug}`}>
                  <span className="nav-link-label">← Previous</span>
                  <span className="nav-link-title">{prev.title}</span>
                </Link>
              )}
              {next && (
                <Link className="nav-link right" href={`/journal/${next.slug}`}>
                  <span className="nav-link-label">Next →</span>
                  <span className="nav-link-title">{next.title}</span>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
