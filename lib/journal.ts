import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type JournalEntry = {
  title: string
  slug: string
  category: 'Off the Clock' | 'Build Notes' | 'PM in AI'
  date: string
  description: string
  content: string
}

const JOURNAL_DIR = path.join(process.cwd(), 'content/journal')

export function getAllEntries(): JournalEntry[] {
  if (!fs.existsSync(JOURNAL_DIR)) return []
  const files = fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(JOURNAL_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        title: data.title,
        slug: data.slug,
        category: data.category,
        date: data.date,
        description: data.description,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEntryBySlug(slug: string): JournalEntry | null {
  const entries = getAllEntries()
  return entries.find(e => e.slug === slug) ?? null
}

export function getAdjacentEntries(slug: string): {
  prev: JournalEntry | null
  next: JournalEntry | null
} {
  const entries = getAllEntries()
  const index = entries.findIndex(e => e.slug === slug)
  return {
    prev: entries[index - 1] ?? null,
    next: entries[index + 1] ?? null,
  }
}
